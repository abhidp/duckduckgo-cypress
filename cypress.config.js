const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/tests/*.spec.ts',
    testIsolation: false,
    supportFile: false
  },
  viewportWidth: 1024,
  viewportHeight: 768,
  watchForFileChanges: false
})
