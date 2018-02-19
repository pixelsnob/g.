
const { promisify } = require('util');

const csv = require('csv');
const fs = require('fs');
  
const csvParseAsync = promisify(csv.parse);
const csvStringifyAsync = promisify(csv.stringify);
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const parser_opts  = {
    from: 2,
    trim: true,
    skip_empty_lines: true,
    skip_lines_with_empty_values: true
};

const input_filename       = 'data/alerts.csv';
const clean_csv_filename   = 'data/alerts-clean.csv';
const alerts_filename      = 'data/alerts.json';
const duplicates_filename  = 'data/duplicates.json';

module.exports.saveAsJSON = () => {
  
  let unique     = [],
      duplicates = [];

    return readFileAsync(input_filename, 'utf8')
        .then(data => csvParseAsync(data, parser_opts))
        .then(data => {
            // Trim, replace multiple spaces with single space
            let temp_rows  = [];
            unique = data.map(cols => cols.map(col => col.trim()))
                .map(cols => cols.map(col => col.replace(/\s{2,}/g, ' ')))
                .filter(row => {
                    let line = row.join(' ').trim(),
                        exists = (temp_rows.indexOf(line) > -1);
                    if (exists) {
                        duplicates.push(line);
                    } else {
                        temp_rows.push(line);
                    }
                    return !exists;
                })
                // First search term should be quoted if it isn't already
                .map(cols => {
                    let temp_cols = cols.slice();
                    if (!/^\".*\"$/.test(temp_cols[0])) {
                        temp_cols[0] = `"${temp_cols[0]}"`;
                    }
                    return temp_cols;
                });
        })
        .then(() => {
            let writeCleanCSV = data => writeFileAsync(clean_csv_filename, data);
            return csvStringifyAsync(unique).then(writeCleanCSV);
        })
        .then(() => writeFileAsync(alerts_filename, JSON.stringify(unique)))
        .then(() => writeFileAsync(duplicates_filename, JSON.stringify(duplicates)))
        .then(() => ({ unique, duplicates }));
};


