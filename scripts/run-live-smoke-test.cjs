const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { spawnSync } = require('child_process');

const scriptTsPath = path.resolve(__dirname, 'live-smoke-test.ts');
const runnerPath = path.resolve(__dirname, '.live-smoke-test.runner.cjs');

console.log('[Live Smoke Test] Transpiling live smoke test script...');
const tsContent = fs.readFileSync(scriptTsPath, 'utf8');
const transpiled = ts.transpileModule(tsContent, {
    compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        esModuleInterop: true,
        target: ts.ScriptTarget.ES2022,
    },
});

fs.writeFileSync(runnerPath, transpiled.outputText);

try {
    const result = spawnSync(process.execPath, [runnerPath], {
        stdio: 'inherit',
        env: process.env,
    });

    if (result.status !== 0) {
        process.exit(result.status || 1);
    }
} finally {
    if (fs.existsSync(runnerPath)) {
        try {
            fs.unlinkSync(runnerPath);
        } catch {}
    }
}

