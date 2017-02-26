/**
 * Created by carl on 2/25/2017.
 */
console.log('background page loaded...');

var browser = (typeof(browser) == 'undefined') ? chrome : browser;

function completedRequestCallback(details) {
    console.log('completed request callback running...');
    browser.tabs.sendMessage(details.tabId, {requestDetails: details}, function (response) {
    });

}

browser.webRequest.onCompleted.addListener(completedRequestCallback, {urls: ['<all_urls>']});

browser.tabs.onUpdated.addListener(function (tabId, info) {
    console.log(tabId);
    if (info.status == "complete") {
        // your code ...

        console.log(browser.webRequest.onCompleted.hasListener(completedRequestCallback));
    }
});


// try {
//     browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//         console.log(request);
//     });
// } catch (error) {
//     console.log(error);
// }

