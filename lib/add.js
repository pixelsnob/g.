
const log = require('./logger')('add');
const login = require('./login');

module.exports = (data, i = 1) => {

    return async function (client, helpers, config) {

        await login(...arguments);

        log(`Adding ${data.length} alerts`);

        await helpers.delay(200);

        for (let row of data) {

            log(`Add alert #${i} ******************************************************`);

            await helpers.setInputValue('#query_div input', row.join(' '), 300); 
            await helpers.sendText("\r");
            await helpers.clickOn('.show_options', 100);

            // Set to "all results"
            await helpers.clickOnVisible('#create-alert-options tr:nth-child(5) > td:nth-child(2) > div', 100);
            await helpers.clickOnVisible("[id=':5'] div");
            await helpers.clickOnVisible('#create_alert', 300);

            log(`End add alert #${i++}`);
        }
    };
};
