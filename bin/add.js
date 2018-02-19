
const config         = require('../config'),
      { promisify }  = require('util'),
      fs             = require('fs'),
      readFileAsync  = promisify(fs.readFile);

const addFromArray = require('../lib/add');
const runner = require('../lib/runner');

readFileAsync('data/alerts.json', 'utf-8').then(async data => {
    let parsed = JSON.parse(data);
    let startIndex = 1;
    if (process.argv[2] == '-i' && +process.argv[3] !== NaN) {
        startIndex = +process.argv[3];
        parsed = parsed.slice(startIndex);
    }

    console.log(`Attempting to add ${parsed.length} alerts`);
    await runner(addFromArray(parsed, startIndex), config);
    console.log(`Added ${parsed.length} alerts!`);
    
}).catch(console.error);

