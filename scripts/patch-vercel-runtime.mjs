import fs from 'node:fs/promises';
import path from 'node:path';

const TARGET_RUNTIME = 'nodejs20.x';
const BAD_RUNTIMES = new Set(['nodejs18.x', 'nodejs18']);

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findVcConfigFiles(dirPath) {
  const results = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findVcConfigFiles(fullPath)));
    } else if (entry.isFile() && entry.name === '.vc-config.json') {
      results.push(fullPath);
    }
  }
  return results;
}

async function patchVcConfig(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  let json;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Failed to parse JSON: ${filePath}: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (!json || typeof json !== 'object') return { changed: false };

  const currentRuntime = json.runtime;
  const shouldPatch = typeof currentRuntime === 'string' && BAD_RUNTIMES.has(currentRuntime);

  if (!shouldPatch) return { changed: false, currentRuntime };

  json.runtime = TARGET_RUNTIME;
  await fs.writeFile(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  return { changed: true, previousRuntime: currentRuntime, newRuntime: TARGET_RUNTIME };
}

async function main() {
  const vercelFunctionsDir = path.join(process.cwd(), '.vercel', 'output', 'functions');

  if (!(await fileExists(vercelFunctionsDir))) {
    console.log(`[patch-vercel-runtime] No Vercel build output found at: ${vercelFunctionsDir}`);
    console.log('[patch-vercel-runtime] Nothing to patch.');
    return;
  }

  const vcConfigFiles = await findVcConfigFiles(vercelFunctionsDir);
  if (vcConfigFiles.length === 0) {
    console.log(`[patch-vercel-runtime] No .vc-config.json files found under: ${vercelFunctionsDir}`);
    return;
  }

  let changedCount = 0;
  for (const vcConfigPath of vcConfigFiles) {
    const result = await patchVcConfig(vcConfigPath);
    if (result.changed) {
      changedCount++;
      console.log(`[patch-vercel-runtime] Patched runtime in ${path.relative(process.cwd(), vcConfigPath)}: ${result.previousRuntime} -> ${result.newRuntime}`);
    }
  }

  if (changedCount === 0) {
    console.log(`[patch-vercel-runtime] No runtimes needed patching. (${vcConfigFiles.length} files checked)`);
  } else {
    console.log(`[patch-vercel-runtime] Done. Patched ${changedCount}/${vcConfigFiles.length} .vc-config.json file(s).`);
  }
}

main().catch((err) => {
  console.error('[patch-vercel-runtime] Failed:', err);
  process.exit(1);
});
