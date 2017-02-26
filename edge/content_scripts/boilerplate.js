/**
 * Created by carl on 2/24/2017.
 */
var browser = (typeof(browser) == 'undefined') ? chrome : browser;

try {
    browser.runtime.onMessage.addListener(function (messageObj, sender, sendResponse) {
        console.log(messageObj.message);

        var messageDiv = document.getElementById('messageDiv');

        if (!messageDiv) {
            console.log('messageDiv does not exist');
            messageDiv = document.createElement('div');

            messageDiv.style.position = 'fixed';
            messageDiv.style.bottom = '0';
            messageDiv.style.left = '0';
            messageDiv.style.color = 'black';
            messageDiv.style.background = 'white';
            messageDiv.style.fontSize = '16px';
            messageDiv.style.fontFamily = 'monospace';
            messageDiv.setAttribute('id', 'messageDiv');

            document.body.appendChild(messageDiv);

        }

        messageDiv = document.getElementById('messageDiv');
        messageDiv.innerText = messageObj.message;

    });

} catch (error) {
    console.error(`runtime listener failure: ${error}`);
}

