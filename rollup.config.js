import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
    { file: `dist/${pkg.name}.umd.js`, format: 'umd', name: 'imageFns' },
  ],
  plugins: [typescript()],
}
