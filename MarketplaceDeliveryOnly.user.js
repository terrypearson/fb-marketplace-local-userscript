// ==UserScript==
// @name         MarketplaceLocalListingsOnly
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Set Facebook marketplace to load local listings only (No Deliveries)!
// @author       Terry Pearson
// @include      https://www.facebook.com/marketplace/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// ==/UserScript==

console.log('MarketplaceDeliveryOnly userscript running...');

// modify url to filter listings by local pick up only (ie no listings that will ship to you)
// e.g.      https://www.facebook.com/marketplace/atlanta/search/?query=honda
// becomes   https://www.facebook.com/marketplace/atlanta/search/?deliveryMethod=local_pick_up&query=honda&exact=false
function localListingsOnly() {

    var current_url = window.location.href;
    // regex to match query e.g. 'honda'
    //var search = location.search.substring(1);
    //let params = new URLSearchParams(search);
    //console.log("query: ",params.get("query")); // "foo"

    insertParam("deliveryMethod","local_pick_up");
    return;

}

function insertParam(key, value) {

    var search = location.search.substring(1);
    let searchParams = new URLSearchParams(search);
    // "foo"

    let theKey = searchParams.get(key);
    if(theKey != null){
        //The key already exists, do not replace
        return;
    }

    console.log("Adding key of: ",key,"=",value);


    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    // kvp looks like ['key1=value1', 'key2=value2', ...]
    var kvp = document.location.search.substr(1).split('&');
    let i=0;

    for(; i<kvp.length; i++){
        if (kvp[i].startsWith(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }

    if(i >= kvp.length){
        kvp[kvp.length] = [key,value].join('=');
    }

    // can return this or...
    let params = kvp.join('&');

    // reload page with new params
    document.location.search = params;
}
// detect DOM changes made by AJAX when the page doesn't reload (e.g. searching for something new in Marketplace)
function mutationHandler (mutationRecords) {
    mutationRecords.forEach(function (mutation) {
        if (mutation.type=="childList" && typeof mutation.addedNodes=="object" && mutation.addedNodes.length) {
            for (let i=0; i<mutation.addedNodes.length; ++i) {
                //console.log('new node detected!');
                if (mutation.addedNodes[i].nodeType===1) {
                    //elementMutationHandler(mutation.addedNodes[i]);
                    //test();
                    localListingsOnly();
                }
            }
        }
        else if (mutation.type == "attributes" && mutation.target.nodeType===1) {
            // elementMutationHandler(mutation.target);
            localListingsOnly();
        }
    });
}

// start MutationObserver
let MutationObserver = window.MutationObserver;
let myObserver       = new MutationObserver(mutationHandler);
let obsConfig        = { childList: true, attributes: true, subtree: true,   attributeFilter: ['href'] };
myObserver.observe (document, obsConfig);


// reload the page after 10 minutes of inactivity
setTimeout((function() {
    myObserver.disconnect();
    window.location.reload();
}), 600000);
