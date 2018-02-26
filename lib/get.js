
const login = require('./login');
const log = require('./logger')('get');

module.exports = async function (client, helpers, config) {

    await login(...arguments);
    await helpers.delay(1000);

    const browserCode = () => {
        const els = window.document.querySelectorAll('.alert_instance .query_div span');
        return Array.from(els).map(el => el.innerText);
    };
    const res = await client.Runtime.evaluate({
        expression: `(${browserCode})()`,
        returnByValue: true,
        awaitPromise: false
    });
    if (res && res.result && res.result.type == 'object' && res.result.value) {
        log(`${res.result.value.length} alerts found`);
        if (res.result.value.length > 0) {
            log('Start alerts output **************************************');
            res.result.value.forEach(row => console.log(row));
            log('End alerts output ****************************************');
        }
    }
};
