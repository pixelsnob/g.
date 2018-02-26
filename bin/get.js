
const config         = require('../config'),
      { promisify }  = require('util'),
      fs             = require('fs'),
      writeFileAsync = promisify(fs.writeFile);

const getAll = require('../lib/get');
const runner = require('../lib/runner');

const filename = './data/alerts-exported.csv';

(async function () {
    const res = await runner(getAll, config);
    if (Array.isArray(res) && res.length) {
        console.log(res.length + ' alerts found');
        await writeFileAsync(filename, res.join("\n"));
        console.log(`File ${filename} written successfully`);
    }
})();

