
const config   = require('../config');

const deleteAll = require('../lib/delete');
const runner = require('../lib/runner');

runner(deleteAll, config);

