import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: nxE2EPreset(__dirname),
  env: {
    username: process.env.NFLOW_USERNAME,
    password: process.env.NFLOW_PASSWORD,
  },
});
