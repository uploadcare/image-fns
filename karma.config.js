const typescript = require('rollup-plugin-typescript2')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const path = require('path')

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha'],
    singleRun: true,

    files: [{ pattern: 'tests/**.js' }],

    plugins: [
      'karma-rollup-preprocessor',
      'karma-chrome-launcher',
      'karma-mocha',
    ],

    preprocessors: {
      'tests/**.js': ['rollup'],
    },

    rollupPreprocessor: {
      plugins: [
        resolve({ browser: true }),
        commonjs({
          include: 'node_modules/**',
          namedExports: { chai: ['expect'] },
        }),
        typescript(),
      ],
      output: {
        format: 'iife',
        name: 'imageFns',
        sourcemap: false,
      },
    },
  })
}
