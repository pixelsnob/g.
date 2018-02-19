
// Function that finds an alert option by its selector and sets its value to optionValueSelector
// ** Recursive **

const log = require('./logger')('set-option');

module.exports = (client, helpers) => {

    let alertIndex = 1;

    const toggleAlertOptionTo = async (optionSelector, optionValueSelector) => {
        
        log('Start set option for alert #' + alertIndex);

        // Construct selector that will find an alert edit button based on alert index
        const editButtonSelector = '#manage-alerts-div .alert_instance:nth-child(' + alertIndex +
                                   ') span.edit_button.alert_button';
        
        await helpers.clickOn(editButtonSelector);
        await helpers.clickOn(optionSelector, 600);
        await helpers.clickOn(optionValueSelector, 600);

        // If the "save" button is disabled, click on the "close" link
        const disabledSaveOptionsButton = await helpers.querySelector('#save_alert.jfk-button-disabled');
        if (disabledSaveOptionsButton.nodeId) {
            await helpers.clickOn('#query_div .close_icon');
        } else {
            // Save changes
            await helpers.clickOn('#save_alert');
        }

        log('Modified alert #' + alertIndex);

        await helpers.delay(1200);
        
        // Next alert
        alertIndex++;
        return await toggleAlertOptionTo(optionSelector, optionValueSelector);

    }

    return toggleAlertOptionTo;
};

