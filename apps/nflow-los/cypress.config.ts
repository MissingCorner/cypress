import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: nxE2EPreset(__dirname),
  env: {
    username: process.env.NFLOW_USERNAME,
    password: process.env.NFLOW_PASSWORD,
    idtype:process.env.NFLOW_IDTYPE
  },
});
