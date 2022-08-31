import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['src/index.js'],
    bundle: true,
    external: ['styled-components', 'styled-system'],
    format: 'esm',
    loader: { '.js': 'js', '.jsx': 'jsx' },
    target: 'es2015',
    minify: true,
    outdir: 'build',
    sourcemap: true,
  })
  .catch(() => process.exit(1));
