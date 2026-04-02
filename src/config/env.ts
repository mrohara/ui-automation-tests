import { prodEnv } from './environments/prod.env';
import { prodData } from './test-data/prod.data';

const currentEnv = process.env.ENV || 'prod';

const environments = {
  prod: prodEnv
};

const testDataByEnv = {
  prod: prodData
};

if (!(currentEnv in environments)) {
  throw new Error(
    `Invalid ENV: ${currentEnv}. Allowed values: ${Object.keys(environments).join(', ')}`
  );
}

export const env = environments[currentEnv as keyof typeof environments];
export const testData = testDataByEnv[currentEnv as keyof typeof testDataByEnv];

export function getBaseUrl(service: keyof typeof env.services): string {
  return env.services[service].baseUrl;
}