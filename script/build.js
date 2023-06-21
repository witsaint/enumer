const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
esbuild
  .build({
    entryPoints: [path.resolve(__dirname, '../src/index.ts')],
    outdir: path.resolve(__dirname, '../dist'),
    bundle: true,
    sourcemap: true,
    minify: true,
    splitting: true,
    format: 'esm',
    target: ['esnext'],
  })
  .then((msg) => {
    if (msg.length) throw new Error('compile error');
    console.log('compile success');
  });
