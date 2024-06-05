import { defineConfig } from 'cypress'
import cypressSplit from 'cypress-split'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    setupNodeEvents(on, config) {
      cypressSplit(on, config)
      // IMPORTANT: return the config object
      return config
    },
    defaultCommandTimeout: 10000, // Tiempo de espera aumentado a 10 segundos
  },
  env: {
    API_URL: 'http://localhost:3000/',
  },
})
