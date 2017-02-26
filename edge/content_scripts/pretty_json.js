var browser = (typeof(browser) == 'undefined') ? chrome : browser;

try {
    browser.runtime.onMessage.addListener(function (messageObj, sender, sendResponse) {
        //store DOM content then clear it
        var bodyContent = document.body.innerHTML;
        document.body.innerHTML = '';

        var newBodyContent = '';

        //add stylesheet for prettifer
        newBodyContent += `<style type="text/css" media="screen">
    /*! Color themes for Google Code Prettify | MIT License | github.com/jmblog/color-themes-for-google-code-prettify */
/*.prettyprint{background:#1d1f21;font-family:Menlo,Bitstream Vera Sans Mono,DejaVu Sans Mono,Monaco,Consolas,monospace;border:0!important}.pln{color:#c5c8c6}ol.linenums{margin-top:0;margin-bottom:0;color:#969896}li.L0,li.L1,li.L2,li.L3,li.L4,li.L5,li.L6,li.L7,li.L8,li.L9{padding-left:1em;background-color:#1d1f21;list-style-type:decimal}@media screen{.str{color:#b5bd68}.kwd{color:#b294bb}.com{color:#969896}.typ{color:#81a2be}.lit{color:#de935f}.pun{color:#c5c8c6}.opn{color:#c5c8c6}.clo{color:#c5c8c6}.tag{color:#c66}.atn{color:#de935f}.atv{color:#8abeb7}.dec{color:#de935f}.var{color:#c66}.fun{color:#81a2be}}
*/
/*! Color themes for Google Code Prettify | MIT License | github.com/jmblog/color-themes-for-google-code-prettify */
.prettyprint{background:#171c19;font-family:Menlo,Bitstream Vera Sans Mono,DejaVu Sans Mono,Monaco,Consolas,monospace;border:0!important}.pln{color:#ecf4ee}ol.linenums{margin-top:0;margin-bottom:0;color:#5f6d64}li.L0,li.L1,li.L2,li.L3,li.L4,li.L5,li.L6,li.L7,li.L8,li.L9{padding-left:1em;background-color:#171c19;list-style-type:decimal}@media screen{.str{color:#489963}.kwd{color:#55859b}.com{color:#5f6d64}.typ{color:#478c90}.lit{color:#9f713c}.pun{color:#ecf4ee}.opn{color:#ecf4ee}.clo{color:#ecf4ee}.tag{color:#b16139}.atn{color:#9f713c}.atv{color:#1c9aa0}.dec{color:#9f713c}.var{color:#b16139}.fun{color:#478c90}}

</style>`;

        //add pre tag for prettifer
        newBodyContent += `<pre id="editor" class="prettyprint linenums">`;
        newBodyContent += bodyContent;
        newBodyContent += `</pre>`;

        //set body to modified
        document.body.innerHTML = newBodyContent;

        console.log(browser.extension.getURL('prettify.js'));

        //add script tags for prettifer dependencies
        [
            "prettify.js",
            //"runPrettify.js"
        ].forEach(function (item) {
            console.log(browser.extension.getURL(item));
            var s = document.createElement('script');
            s.src = browser.extension.getURL(item);
            document.body.appendChild(s);
        });

        var timeoutScript = document.createElement('script');
        timeoutScript.text = `
        setTimeout(function() {
            PR.prettyPrint();
        }, 500);`;

        document.body.appendChild(timeoutScript);

    });
} catch (error) {
    console.error(error);
}
