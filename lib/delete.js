
const login = require('./login');
const log = require('./logger')('delete');

module.exports = async function (client, helpers, config) {
    
    const deleteAlert = async (i = 1) => {
        const selector = `#manage-alerts-div .alert_instance:nth-child(${i++}) .delete_button`;
        if (await helpers.elementExists(selector)) {
            await helpers.clickOnVisible(selector, 250);
            await deleteAlert(i);
        } else {
            log('No alerts to delete');
        }
    };

    await login(...arguments);

    // Click on "show all alerts" if it's visible
    await helpers.clickOn('.show_all_alerts').catch(() => {}); 
    await helpers.delay(1000);
    
    await deleteAlert();

};
