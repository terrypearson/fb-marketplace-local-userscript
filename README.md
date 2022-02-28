# fb-marketplace-local-userscript

<figure>
    <p align="center">
    <img src="https://user-images.githubusercontent.com/65370643/156020610-7b417f71-e099-459e-8e70-31dfae8f442a.png" style="margin: center" width="800"/>
    <figcaption>
        <p align="center">Marketplace search example</p>
    </figcaption>
    </p>
</figure>

<figure>
    <p align="center">
    <img src="https://user-images.githubusercontent.com/65370643/156020471-b95a4dde-ab17-4347-9ca4-0b1be18daf3b.png" style="margin: center" width="300"/>
    <figcaption>
        <p align="center">Userscript keeps 'local pickup' toggled by default</p>
    </figcaption>
    </p>
</figure>

<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

- A userscript to exclude items that ship to you in Facebook Marketplace

### Usage

1) Install TamperMonkey in Chrome or Firefox: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
2) Navigate to TamperMonkey Dashboard > Utilities > Import From URL > Paste: https://github.com/jordanfromcanada/fb-marketplace-local-userscript/blob/main/MarketplaceDeliveryOnly.user.js
3) Navigate to a Facebook Marketplace link and refresh the page, e.g. https://www.facebook.com/marketplace/atlanta/search/?query=honda
4) The URL should redirect to https://www.facebook.com/marketplace/atlanta/search/?deliveryMethod=local_pick_up&query=honda&exact=false
