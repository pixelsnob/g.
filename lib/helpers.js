
module.exports = client => {

    const { DOM, Input, Runtime } = client;
    const helpers = {};

    const log = require('./logger')('helpers');

    // Send some text to the browser using keyDown/keyUp events
    helpers.sendText = async function (str) {
        log('sendText', str);
        str.split('').map(async letter => {
            let code = letter.charCodeAt(0);
            code = (letter == '.' ? 190 : code);
            await Input.dispatchKeyEvent({
                type: 'rawKeyDown',
                text: letter,
                windowsVirtualKeyCode: code,
                nativeVirtualKeyCode: code
            });
            await Input.dispatchKeyEvent({
                type: 'char',
                text: letter,
                unmodifiedText: letter
            });
            await Input.dispatchKeyEvent({
                type: 'keyUp',
                nativeVirtualKeyCode: code,
                windowsVirtualKeyCode: code
            });
        });
    };
    
    // Click on an element defined by x and y coords `clickCount` times
    helpers.sendLeftClick = async function (x, y, clickCount = 1, button = 'left') {
        log('sendLeftClick', ...arguments);
        await Input.dispatchMouseEvent({
            type: 'mousePressed',
            button,
            x,
            y,
            clickCount
        });
        await Input.dispatchMouseEvent({
            type: 'mouseReleased',
            button,
            x,
            y,
            clickCount
        });
    };
    
    // Send an arrow down command
    helpers.arrowDown = async function () {
        log('arrowDown');
        let code = 40;
        await Input.dispatchKeyEvent({
            type: 'rawKeyDown',
            code: 'Arrow Down',
            key: 'Arrow Down',
            windowsVirtualKeyCode: code,
            nativeVirtualKeyCode: code
        });
        await Input.dispatchKeyEvent({
            type: 'keyUp',
            windowsVirtualKeyCode: code,
            nativeVirtualKeyCode: code
        });
    };

    // Send an arrow up command
    helpers.arrowUp = async function () {
        log('arrowUp');
        let code = 38;
        await Input.dispatchKeyEvent({
            type: 'rawKeyDown',
            code: 'Arrow Up',
            key: 'Arrow Up',
            windowsVirtualKeyCode: code,
            nativeVirtualKeyCode: code
        });
        await Input.dispatchKeyEvent({
            type: 'keyUp',
            windowsVirtualKeyCode: code,
            nativeVirtualKeyCode: code
        });
    };
    
    // Send return
    helpers.sendReturnKey = async function () {
        log('sendReturnKey');
        await Input.dispatchKeyEvent({
            type: 'rawKeyDown',
            text: "\r",
            unmodifiedText: "\r",
            windowsVirtualKeyCode: 13,
            nativeVirtualKeyCode: 13
        });
        await Input.dispatchKeyEvent({
            type: 'char',
            text: "\r",
            unmodifiedText: "\r"
        });
        await Input.dispatchKeyEvent({
            type: 'keyUp',
            windowsVirtualKeyCode: 13,
            nativeVirtualKeyCode: 13
        });
    };

    // Delay exec of next promise by `delayAmount` ms
    helpers.delay = async function (delayAmount = 500) {
        log('delay', delayAmount);
        return new Promise(resolve => {
            setTimeout(resolve, delayAmount);
        });
    };
    
    // querySelector that uses the document root.nodeId as the starting node
    // Returns a single element if it exists
    helpers.querySelector = async function (selector) {
        log('querySelector', selector);
        const document = await DOM.getDocument();
        return await DOM.querySelector({ selector, nodeId: document.root.nodeId });
    };

    // querySelectorAll that uses the document root.nodeId as the starting node
    // Returns an array of elements if any exist
    helpers.querySelectorAll = async function (selector) {
        log('querySelectorAll', selector);
        const document = await DOM.getDocument();
        return await DOM.querySelectorAll({ selector, nodeId: document.root.nodeId });
    };

    // Find something by selector and click on it
    helpers.clickOn = async function (selector, delayAmount = 800) {
        log('clickOn', ...arguments);
        const browserCode = sel => window.document.querySelector(sel).click();
        await client.Runtime.evaluate({
            expression: `(${browserCode})(${JSON.stringify(selector)})`,
            returnByValue: false,
            awaitPromise: false
        });
        return await helpers.delay(delayAmount);
    };

    // todo: combine clickOn() and clickOnVisible() 
    helpers.clickOnVisible = async function (selector, delayAmount = 800) {
        log('clickOnVisible', ...arguments);
        const el = await helpers.querySelector(selector);
        const box = await DOM.getBoxModel({ nodeId: el.nodeId });
        await helpers.sendLeftClick(box.model.content[0], box.model.content[1]);
        return await helpers.delay(delayAmount);
    };

    // Find something by selector, click on it (to focus it), and send some text
    helpers.clickOnAndType = async function (selector, text, delayAmount = 800) {
        log('clickOnAndType', ...arguments);
        await helpers.clickOn(selector, delayAmount);
        await helpers.sendText(text);
        return await helpers.delay(delayAmount);
    };

    helpers.setInputValue = async function (selector, value, delayAmount = 800) {
        log('setInputValue', ...arguments);
        const browserCode = (sel, value) => {
            window.document.querySelector(sel).value = value + "";
        };
        await client.Runtime.evaluate({
            expression: `(${browserCode})(${JSON.stringify(selector)}, ${JSON.stringify(value)})`,
            returnByValue: false,
            awaitPromise: false
        });
        return await helpers.delay(delayAmount);
    };

    return helpers;
};


