
const login = require('./login');

module.exports = async function (client, helpers, config) {
    
    const deleteAlert = async (i = 1) => {
        const selector = `#manage-alerts-div .alert_instance:nth-child(${i++}) .delete_button`;
        try {
            await helpers.clickOnVisible(selector, 250);
            await deleteAlert(i);
        } catch (err) {
            console.error(err);
        }
    };

    await login(...arguments);

    // Click on "show all alerts" if it's visible
    await helpers.clickOn('.show_all_alerts').catch(() => {}); 
    await helpers.delay(1000);
    
    await deleteAlert();

};
