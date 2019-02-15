process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    reporters: ['progress', 'karma-typescript'],
    frameworks: ['mocha', 'karma-typescript'],
    singleRun: true,

    files: [
      {
        pattern: 'src/**.ts',
        watched: false,
      },
      {
        pattern: 'test/**.ts',
        watched: false,
      },
    ],

    plugins: ['karma-typescript', 'karma-chrome-launcher', 'karma-mocha'],

    preprocessors: { '**/*.ts': ['karma-typescript'] },

    karmaTypescriptConfig: {
      compilerOptions: {
        lib: ['esnext', 'dom'],
        tsconfig: "./tsconfig.json"
      },
    },
  })
}
