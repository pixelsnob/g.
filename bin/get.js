
const config         = require('../config'),
      { promisify }  = require('util'),
      fs             = require('fs'),
      readFileAsync  = promisify(fs.readFile);

const getAll = require('../lib/get');
const runner = require('../lib/runner');

(async function () {
    const res = await runner(getAll, config);
    //console.log(res);
    // save to csv
})();

