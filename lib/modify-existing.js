
module.exports = async (client, helpers) => {
    
    const setOptionTo = require('./set-option')(client, helpers);

    // Click on "show all alerts" if it's visible
    await helpers.clickOn('.show_all_alerts').catch(() => {}); 
    await helpers.delay(1000);

    // :4 is "best results", :5 is "all"
    await setOptionTo('#create-alert-options tr:nth-child(5) > td:nth-child(2) > div', '[id=":4"] div');
};
