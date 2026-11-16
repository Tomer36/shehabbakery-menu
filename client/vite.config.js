import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'

// Which commit this build came from, so you can tell what's live:
// open the site and View Page Source — the <meta name="build"> line shows the commit and build time.
function buildStamp() {
  let commit = process.env.GITHUB_SHA?.slice(0, 7);
  try {
    commit ??= execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    commit ??= 'unknown';
  }
  const time = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
  return {
    name: 'build-stamp',
    apply: 'build',
    transformIndexHtml: () => [
      { tag: 'meta', attrs: { name: 'build', content: `${commit} ${time}` }, injectTo: 'head' },
    ],
  };
}

export default defineConfig({
  plugins: [react(), buildStamp()],
  publicDir: '../img',
})
