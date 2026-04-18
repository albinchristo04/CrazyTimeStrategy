// Patches dist/server/wrangler.json after astro build to add pages_build_output_dir,
// which is required for Cloudflare Pages to recognise and deploy the Worker.
import { readFileSync, writeFileSync } from 'fs';

const path = 'dist/server/wrangler.json';

let config;
try {
  config = JSON.parse(readFileSync(path, 'utf8'));
} catch {
  console.error('cf-pages-fix: could not read', path);
  process.exit(1);
}

// Point Pages to the static client assets directory
config.pages_build_output_dir = '../client';

writeFileSync(path, JSON.stringify(config, null, 2));
console.log('cf-pages-fix: patched pages_build_output_dir → ../client');
