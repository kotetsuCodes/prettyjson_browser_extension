/**
 * Created by carl on 2/25/2017.
 */

try {
    var browser = (typeof(browser) == 'undefined') ? chrome : browser;

    browser.tabs.onUpdated.addListener(function (tabId, info) {
        if (info.status == "complete") {
            var randomNumber = Math.floor((Math.random() * 999999) + 1);
            browser.tabs.sendMessage(tabId, {message: 'Message from the background script! ' + randomNumber}, function (response) {
            });
        }
    });
} catch (error) {
    console.error(error);
}


