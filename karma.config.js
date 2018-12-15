const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const path = require("path");

process.env.CHROME_BIN = require('puppeteer').executablePath()

const pattern = path.join(__dirname, './tests/*.js')

module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha'],
    singleRun: true,

    files: [
      {
        pattern,
        watched: false,
      },
    ],

    plugins: ['karma-chrome-launcher', 'karma-mocha', 'karma-rollup-preprocessor'],

    preprocessors: {[pattern]: ['rollup']},
    rollupPreprocessor: {
      plugins: [
        resolve({browser: true}),
        commonjs({include: 'node_modules/**', namedExports: { 'chai': ['expect'] },}),
        babel(),
      ],
      output: {
        format: 'iife',
        name: 'imageFns',
        sourcemap: false,
      },
    },
  })
}
