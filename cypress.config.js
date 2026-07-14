const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      return config;
    },
  },
  screenshotsFolder: 'cypress/evidencias',
  video: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  retries: {
    runMode: 1,
    openMode: 0
  },
  viewportWidth: 1440,
  viewportHeight: 900
});
