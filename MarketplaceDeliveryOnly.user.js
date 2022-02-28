// ==UserScript==
// @name         MarketplaceDeliveryOnly
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
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
        const regex_to_get_query = /(?<=https\:\/\/www\.facebook\.com\/marketplace\/.+?\/search\/\?query=).*/;
        // regex to match beginning portion of url e.g. 'https://www.facebook.com/marketplace/atlanta/search/'
        const partial_url = current_url.match(/https\:\/\/www\.facebook\.com\/marketplace\/.+?\//);
        const users_url_query = current_url.match(regex_to_get_query); // e.g. 'honda'

        console.log(current_url, users_url_query);

        // if the user is in marketplace and makes a search
        if (users_url_query.length == 1) {
            const url_final = String(partial_url[0]) +
                  'search/?deliveryMethod=local_pick_up&query=' +
                  String(users_url_query[0]) + '&exact=false';

            //console.log('query was: ', users_url_query);
            //console.log('partial url is: ', partial_url[0]);
            //console.log('modified URL is: ', url_final);

            // change the address bar URL to `url_final` and navigate to that page
            // e.g. https://www.facebook.com/marketplace/atlanta/search/?deliveryMethod=local_pick_up&query=honda&exact=false
            location.replace(url_final);
        }
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