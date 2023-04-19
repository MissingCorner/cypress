import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

import * as dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
  e2e: nxE2EPreset(__dirname),
  env: {
    username: process.env.BCG_USERNAME,
    password: process.env.BCG_PASSWORD,
  },
  watchForFileChanges: false,
});
