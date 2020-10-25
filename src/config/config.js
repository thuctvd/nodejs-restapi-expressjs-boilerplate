const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const defaultConfig = require('../../env/default.config');

const Env = require('get-env')({
  dev: ['development', 'dev', 'DEV', 'DEVELOPMENT'],
  prod: ['production', 'prod', 'PROD', 'PRODUCTION'],
  staging: ['staging', 'stag', 'STAG', 'STAGING'],
  test: ['test', 'TEST']
});


let mergerConfig = (obj, folder, filename) => {
  let config;
  const desiredPath = path.resolve(folder, `../../env/${Env}.config.js`);
  const relativePath = path.relative(__dirname, folder);
  if (fs.existsSync(desiredPath)) {
    const configEnv = require(`${relativePath}/env/${Env}`);
    config = _.merge(obj, configEnv);
  } else {
    config = obj;
  }
  if (require.cache[filename] && _.isUndefined(require.cache[filename].exports) === false) {
    require.cache[filename].exports = config;
  }
  return config;
};

let cachedConfig;
const configs = (() => {
  const scriptName = path.basename(__filename);
  if (!cachedConfig) {
    cachedConfig = mergerConfig(defaultConfig, __dirname, scriptName);
  }
  return cachedConfig;
})();

module.exports = configs || defaultConfig;
