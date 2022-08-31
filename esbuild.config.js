import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['src/index.js'],
    bundle: true,
    external: ['styled-components/macro', 'styled-system'],
    minify: true,
    outdir: 'build',
    platform: 'node',
    sourcemap: true,
  })
  .catch(() => process.exit(1));
