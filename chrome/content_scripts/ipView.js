/**
 * Created by carl on 2/24/2017.
 */
var browser = (typeof(browser) == 'undefined') ? chrome : browser;

//browser.runtime.sendMessage({initializeListener: true}, function(response) {});

browser.extension.onMessage.addListener(function (message, sender, sendResponse) {
    if (!document.getElementById('ipDiv')) {
        console.log('ipDiv does not exist')
        if (message.requestDetails && message.requestDetails.ip) {
            console.log('request details and IP address found');
            var ip = message.requestDetails.ip;


            var ipDiv = document.createElement('div');

            ipDiv.innerText = ip;

            ipDiv.style.position = 'fixed';
            ipDiv.style.bottom = '0';
            ipDiv.style.left = '0';
            ipDiv.style.color = 'black';
            ipDiv.style.background = 'white';
            ipDiv.style.fontSize = '16px';
            ipDiv.style.fontFamily = 'monospace';
            ipDiv.setAttribute('id', 'ipDiv');

            document.body.appendChild(ipDiv);
        } else {
            console.error('request details or IP NOT FOUND');
        }
    } else {
        console.log('ipDiv already exists.');
    }


    // try{
    //     if(details.url) {
    //         console.log(details.url);
    //     } else {
    //         console.log('no url present');
    //     }
    //
    //     if (details.ip) {
    //         console.log(details.ip);
    //     } else {
    //         console.log('no ip address present');
    //     }
    // } catch(error) {
    //     console.log(error);
    // }

});