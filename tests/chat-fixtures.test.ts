import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import ts from 'typescript';
import { NextRequest } from 'next/server';

// Helper to transpile and load TS modules dynamically
const loadedModules = new Map<string, any>();

function loadTsModule(filePath: string): any {
    const fullPath = path.resolve(filePath);
    if (loadedModules.has(fullPath)) {
        return loadedModules.get(fullPath);
    }

    const code = fs.readFileSync(fullPath, 'utf8');
    const transpiled = ts.transpileModule(code, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            esModuleInterop: true,
            target: ts.ScriptTarget.ES2022,
        },
    });

    const mod: { exports: any } = { exports: {} };
    loadedModules.set(fullPath, mod.exports);

    const customRequire = (id: string) => {
        if (id.startsWith('@/')) {
            const rel = id.replace('@/', '');
            const candidates = [
                path.resolve(rel + '.ts'),
                path.resolve(rel + '.tsx'),
                path.resolve(rel + '/index.ts'),
                path.resolve(rel),
            ];
            for (const c of candidates) {
                if (fs.existsSync(c)) {
                    return loadTsModule(c);
                }
            }
        }
        return require(id);
    };

    const fn = new Function('require', 'module', 'exports', '__dirname', '__filename', transpiled.outputText);
    fn(customRequire, mod, mod.exports, path.dirname(fullPath), fullPath);
    loadedModules.set(fullPath, mod.exports);
    return mod.exports;
}

describe('Chat API Route Deterministic Fixtures (CI Check)', () => {
    let mockServer: http.Server;
    let mockPort: number;
    let mockMode: 'success' | 'rate-limited' | 'malformed' | 'unavailable' = 'success';
    let chatRoute: any;

    before(async () => {
        // Start a mock Groq provider server
        await new Promise<void>((resolve) => {
            mockServer = http.createServer((req, res) => {
                if (mockMode === 'success') {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(
                        JSON.stringify({
                            id: 'chatcmpl-mock-success',
                            choices: [
                                {
                                    index: 0,
                                    message: {
                                        role: 'assistant',
                                        content:
                                            "Apoorv is a Full-Stack AI Engineer who built RetentIQ and Planora. You can check his projects (NAVIGATE:projects) right now.",
                                    },
                                    finish_reason: 'stop',
                                },
                            ],
                        })
                    );
                } else if (mockMode === 'rate-limited') {
                    res.writeHead(429, { 'Content-Type': 'application/json' });
                    res.end(
                        JSON.stringify({
                            error: {
                                message: 'Rate limit reached for model openai/gpt-oss-20b: Limit 30 RPM',
                                type: 'tokens',
                                code: 'rate_limit_exceeded',
                            },
                        })
                    );
                } else if (mockMode === 'malformed') {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end('{"invalid_json": corrupt_payload');
                } else if (mockMode === 'unavailable') {
                    res.writeHead(503, { 'Content-Type': 'application/json' });
                    res.end(
                        JSON.stringify({
                            error: {
                                message: 'The Groq service is currently overloaded or undergoing maintenance.',
                                type: 'service_unavailable',
                            },
                        })
                    );
                }
            });

            mockServer.listen(0, '127.0.0.1', () => {
                const addr = mockServer.address();
                if (typeof addr === 'object' && addr !== null) {
                    mockPort = addr.port;
                }
                resolve();
            });
        });

        // Configure environment to point to the local mock Groq server
        process.env.GROQ_API_KEY = 'mock_ci_test_key';
        process.env.GROQ_API_BASE_URL = `http://127.0.0.1:${mockPort}/chat/completions`;
        process.env.GROQ_MODEL = 'openai/gpt-oss-20b';

        // Load route module
        chatRoute = loadTsModule('./app/api/chat/route.ts');
    });

    after(async () => {
        if (mockServer) {
            await new Promise<void>((resolve) => mockServer.close(() => resolve()));
        }
    });

    test('1. Success Fixture: returns provider-backed reply and parsed action', async () => {
        mockMode = 'success';
        const req = new NextRequest('http://localhost:3000/api/chat?strict=true', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Tell me about Apoorv' }),
        });

        const res = await chatRoute.POST(req);
        assert.equal(res.status, 200);

        const data = await res.json();
        assert.equal(data.success, true);
        assert.equal(data.data.source, 'provider');
        assert.ok(data.data.message.includes('Apoorv is a Full-Stack AI Engineer'));
        assert.deepEqual(data.data.action, { type: 'navigate', payload: 'projects' });
    });

    test('2. Rate-Limited Fixture: returns specific 429 status code in strict mode', async () => {
        mockMode = 'rate-limited';
        const req = new NextRequest('http://localhost:3000/api/chat?strict=true', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'What is his experience?' }),
        });

        const res = await chatRoute.POST(req);
        assert.equal(res.status, 429);

        const data = await res.json();
        assert.equal(data.success, false);
        assert.ok(data.error.includes('rate limit') || data.error.includes('Rate limit'));
    });

    test('3. Malformed Output Fixture: maps to specific 502 Bad Gateway in strict mode', async () => {
        mockMode = 'malformed';
        const req = new NextRequest('http://localhost:3000/api/chat?strict=true', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'What projects did he build?' }),
        });

        const res = await chatRoute.POST(req);
        assert.equal(res.status, 502);

        const data = await res.json();
        assert.equal(data.success, false);
        assert.ok(data.error.includes('malformed') || data.error.includes('response'));
    });

    test('4. Provider Unavailable Fixture: maps to specific 503 Service Unavailable in strict mode', async () => {
        mockMode = 'unavailable';
        const req = new NextRequest('http://localhost:3000/api/chat?strict=true', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'How do I contact Apoorv?' }),
        });

        const res = await chatRoute.POST(req);
        assert.equal(res.status, 503);

        const data = await res.json();
        assert.equal(data.success, false);
        assert.ok(data.error.includes('unavailable') || data.error.includes('overloaded'));
    });

    test('5. Rule-Based Fallback: answers experience question accurately when provider is down', async () => {
        mockMode = 'unavailable'; // provider down, non-strict mode
        const req = new NextRequest('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Where did Apoorv work previously?' }),
        });

        const res = await chatRoute.POST(req);
        assert.equal(res.status, 200);

        const data = await res.json();
        assert.equal(data.success, true);
        assert.equal(data.data.source, 'fallback');
        assert.ok(data.data.message.includes('DevX Days'));
        assert.ok(data.data.message.includes('Pixelwand'));
        assert.deepEqual(data.data.action, { type: 'navigate', payload: 'experience' });
    });

    test('6. Rule-Based Fallback: answers project question with verified projects and action', async () => {
        mockMode = 'unavailable';
        const req = new NextRequest('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Tell me about your projects' }),
        });

        const res = await chatRoute.POST(req);
        assert.equal(res.status, 200);

        const data = await res.json();
        assert.equal(data.success, true);
        assert.equal(data.data.source, 'fallback');
        assert.ok(data.data.message.includes('RetentIQ'));
        assert.ok(data.data.message.includes('Planora'));
        assert.deepEqual(data.data.action, { type: 'navigate', payload: 'projects' });
    });

    test('7. Rule-Based Fallback: provides contact & availability with contact action', async () => {
        mockMode = 'unavailable';
        const req = new NextRequest('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'How can I hire or contact Apoorv?' }),
        });

        const res = await chatRoute.POST(req);
        assert.equal(res.status, 200);

        const data = await res.json();
        assert.equal(data.success, true);
        assert.equal(data.data.source, 'fallback');
        assert.ok(data.data.message.includes('Full-Stack AI Engineer'));
        assert.deepEqual(data.data.action, { type: 'contact', payload: 'open' });
    });

    test('8. Rule-Based Fallback: provides direct resume download action', async () => {
        mockMode = 'unavailable';
        const req = new NextRequest('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Can I download your resume PDF?' }),
        });

        const res = await chatRoute.POST(req);
        assert.equal(res.status, 200);

        const data = await res.json();
        assert.equal(data.success, true);
        assert.equal(data.data.source, 'fallback');
        assert.deepEqual(data.data.action, { type: 'download', payload: 'resume' });
    });

    test('9. GET /api/chat: reports configured model and status', async () => {
        const res = await chatRoute.GET();
        assert.equal(res.status, 200);

        const data = await res.json();
        assert.equal(data.success, true);
        assert.equal(data.data.model, 'openai/gpt-oss-20b');
        assert.equal(data.data.configured, true);
    });
});
