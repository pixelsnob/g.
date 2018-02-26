
const config         = require('../config');
const getAll = require('../lib/get');
const runner = require('../lib/runner');

runner(getAll, config);
