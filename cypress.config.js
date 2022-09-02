const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});
