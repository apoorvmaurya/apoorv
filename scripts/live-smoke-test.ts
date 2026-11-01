import { NextRequest } from 'next/server';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import ts from 'typescript';

// Load .env.local if present
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

function loadTsModule(filePath: string): any {
    const fullPath = path.resolve(filePath);
    const code = fs.readFileSync(fullPath, 'utf8');
    const transpiled = ts.transpileModule(code, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    });
    const mod: { exports: any } = { exports: {} };
    const customRequire = (id: string) => {
        if (id.startsWith('@/')) {
            const rel = id.replace('@/', '');
            return loadTsModule(path.resolve(rel + '.ts'));
        }
        return require(id);
    };
    const fn = new Function('require', 'module', 'exports', '__dirname', '__filename', transpiled.outputText);
    fn(customRequire, mod, mod.exports, path.dirname(fullPath), fullPath);
    return mod.exports;
}

async function runLiveSmokeTest() {
    console.log('--- Manual Live Smoke Test (Groq API) ---');
    if (!process.env.GROQ_API_KEY) {
        console.error('GROQ_API_KEY is not set. Cannot run live smoke test.');
        process.exit(1);
    }

    const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
    console.log(`Testing model: ${model}`);

    const chatRoute = loadTsModule('./app/api/chat/route.ts');
    const req = new NextRequest('http://localhost:3000/api/chat?strict=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: 'In 2 sentences, what did Apoorv build for RetentIQ?',
        }),
    });

    const res = await chatRoute.POST(req);
    console.log(`HTTP Status: ${res.status}`);
    const data = await res.json();
    console.log('Response JSON:', JSON.stringify(data, null, 2));

    if (res.status === 200 && data.success && data.data?.source === 'provider') {
        console.log('SUCCESS: Live Groq provider returned an authentic reply.');
    } else {
        console.error('FAILURE: Unexpected response from live provider.');
        process.exit(1);
    }
}

runLiveSmokeTest().catch((err) => {
    console.error('Live smoke test error:', err);
    process.exit(1);
});

