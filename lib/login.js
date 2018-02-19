
const log = require('./logger')('login');

module.exports = async (client, helpers, config) => {

    log('Start login');

    await helpers.delay(2000);
    await helpers.clickOn('.gb_Fa', 700);
    await helpers.clickOnAndType('#identifierId', config.email, 700);
    await helpers.clickOn('#next', 700);
    await helpers.clickOnAndType('input[name=password]', config.password);
    await helpers.clickOn('#signIn', 700);

    log('Login complete');
};
