import fs from 'node:fs';
import path from 'node:path';

// Copy dist/client contents to dist root and .vercel/output/static
const distClient = path.resolve('dist', 'client');
const distRoot = path.resolve('dist');
const vercelOutputStatic = path.resolve('.vercel', 'output', 'static');
const vercelOutputConfig = path.resolve('.vercel', 'output', 'config.json');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'server' || entry.name === 'client') continue;
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(distClient)) {
  console.log('[postbuild] Copying dist/client to dist root...');
  copyDirRecursive(distClient, distRoot);

  console.log('[postbuild] Creating .vercel/output/static...');
  copyDirRecursive(distClient, vercelOutputStatic);

  // Also create root-level .html aliases for prerendered subpages (calendar.html, etc.)
  const routes = ['calendar', 'photobooth', 'polaroid', 'digicam'];
  for (const route of routes) {
    const subIndex = path.join(distRoot, route, 'index.html');
    if (fs.existsSync(subIndex)) {
      fs.copyFileSync(subIndex, path.join(distRoot, `${route}.html`));
      fs.copyFileSync(subIndex, path.join(vercelOutputStatic, `${route}.html`));
    }
  }

  fs.mkdirSync(path.dirname(vercelOutputConfig), { recursive: true });
  fs.writeFileSync(vercelOutputConfig, JSON.stringify({ version: 3 }, null, 2));

  console.log('[postbuild] Build outputs synchronized successfully with route aliases.');
}
