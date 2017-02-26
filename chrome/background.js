/**
 * Created by carl on 2/25/2017.
 */

var browser = (typeof(browser) == 'undefined') ? chrome : browser;

var tabQueue = [{}];

function requestCompletedCallback(responseDetails) {
    console.log(responseDetails);
    var contentTypeIndex = responseDetails.responseHeaders.findIndex(function (x) {
        return x.name === 'Content-Type' && x.value.indexOf('application/json') > -1;
    });

    if (contentTypeIndex > -1) {
        console.log(contentTypeIndex);
        browser.tabs.get(responseDetails.tabId, function (tabInfo) {
            console.log(tabInfo);

            if (responseDetails.url === tabInfo.url) {
                console.log('responseDetails.url === tabInfo.url');

                var tabIndex = tabQueue.findIndex(function (x) {
                    return x.tabId === tabInfo.id;
                });
                if (tabIndex > -1) {
                    tabQueue[tabIndex]['responseDetails'] = responseDetails;
                } else {
                    tabQueue.push({tabId: responseDetails.tabId, responseDetails: responseDetails});
                }
            }
        });
    }
}


try {
    browser.webRequest.onCompleted.addListener(requestCompletedCallback, {urls: ['<all_urls>']}, ['responseHeaders']);
} catch (error) {
    console.error(error);
}

browser.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status == "complete") {
        var tabIndex = tabQueue.findIndex(function (x) {
            return x.tabId === tabId;
        });
        if (tabIndex > -1) {
            browser.tabs.sendMessage(tabId, {response: tabQueue[tabIndex].responseDetails});
        }
    }
})

// browser.tabs.onUpdated.addListener(function(tabId , info) {
//     if (info.status == "complete") {
//         // your code ...
//     }
// });
