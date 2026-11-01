const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { spawnSync } = require('child_process');

// 1. Transpile tests/chat-fixtures.test.ts to tests/.chat-fixtures.runner.cjs
const testTsPath = path.resolve(__dirname, '../tests/chat-fixtures.test.ts');
const runnerPath = path.resolve(__dirname, '../tests/.chat-fixtures.runner.cjs');

console.log('[CI Chat Check] Transpiling deterministic fixture tests...');
const tsContent = fs.readFileSync(testTsPath, 'utf8');
const transpiled = ts.transpileModule(tsContent, {
    compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        esModuleInterop: true,
        target: ts.ScriptTarget.ES2022,
    },
});

fs.writeFileSync(runnerPath, transpiled.outputText);

try {
    console.log('[CI Chat Check] Running deterministic mock provider fixtures against local test server...');
    const result = spawnSync(process.execPath, ['--test', runnerPath], {
        stdio: 'inherit',
        env: {
            ...process.env,
            NODE_ENV: 'test',
        },
    });

    if (result.status !== 0) {
        console.error(`[CI Chat Check] Fixture tests failed with exit code ${result.status}`);
        process.exit(result.status || 1);
    }

    console.log('[CI Chat Check] All deterministic chat route fixtures passed successfully!');
} finally {
    if (fs.existsSync(runnerPath)) {
        try {
            fs.unlinkSync(runnerPath);
        } catch {}
    }
}

