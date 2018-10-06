# [CoinTrends](cointrends.site "cointrends.site")
> A Cryptocurrency ranking website with 7-day price histories

A Front-End Web Development Project built with Vue.js, Sass, CoinCap/CryptoCompare APIs, and with 
a Gulp build process. It shows live cryptocurrency prices in a table which is sortable thanks to Vue's 
[computed properties](https://github.com/oliver-0/CoinTrends#key-features "Key Features | CoinTrends Readme on GitHub").

## Getting started

Clone the project from github and with the [Node Package Manager (npm)](https://docs.npmjs.com/ "npm Documentation") installed, 
install the project's dependencies:

```shell
git clone https://github.com/oliver-0/CoinTrends.git
cd CoinTrends/
npm install
``` 

This will create a /node_modules/ folder in the project directory containing all of the dependencies 
needed to work on the project.

## Developing

The development files are stored in /dev/, and there is a development Gulp command:

```shell
gulp watch
```

This command will initiate a browser-sync instance, which is a live-reloading preview of the website.  
Gulp watch also watches .scss/.css/.js/.html files, and will compile watched .scss files on save, and refresh 
the browser-sync window on saving the compiled .css files or any other watched files.

### Building

There is a command to build a deployable version with changes:

```shell
gulp build
```

This command will delete the contents of /public/, and copy .html and image files from the /dev/ directory 
into the /public/ directory. It will then compile .scss files, concatenate and minify .js and .css files, 
and copy the minified versions into the /public/ directory, ready for deployment.

### Deploying

The site is hosted on Firebase.
Use the [Firebase CLI](https://firebase.google.com/docs/cli/ "Firebase CLI Reference") to update the site.  
If logged in with the correct credentials, you can use the following to deploy your changes:

```shell
firebase deploy
```

## Features

The website is a table of the top 20 Cryptocurrencies listed by Market Cap (total $ amount in circulation), 
generated by the [CoinCap API v1](https://github.com/CoinCapDev/CoinCap.io "CoinCap API v1 - GitHub"). 

### How it works
1. The [CoinCap API](https://github.com/CoinCapDev/CoinCap.io "CoinCap API v1 - GitHub") is called and all of the 
CoinCap data on each of the top 20 coins is saved in the Vue data object.
2. Vue generates a table and fills it with each coin's Rank, Short Name, Long Name, Market Cap (in USD) and Price 
(in USD). 
3. An image is added for each coin, sourced from image links generated by the 
[CryptoCompare API](https://www.cryptocompare.com/api/ "CryptoCompare API docs"). 
4. The site calls the CoinCap API 20 more times to generate a 
[7-day Price History](https://github.com/CoinCapDev/CoinCap.io#history7daycoin "CoinCap API - history 7day") 
for each coin. 
5. The price histories are stored in the Vue data object, and printed into graphs using 
[CanvasJS](https://canvasjs.com/ "Beautiful HTML5 JavaScript Charts | CanvasJS.com"). 
6. The price history data is then used to calculate a 7-day price increase/decrease, which is added to the table. 
7. Now the site is fully loaded, and sorting the table by each column (ascending or descending) becomes available.

### Key features
* Uses a Vue [computed property](https://vuejs.org/v2/guide/computed.html "Computed Properties and Watchers | Vue.js") 
for sorting the table.
  * Instead of listing coins in the order they appear in the data, the computed property 'sortedCoins' 
  sorts the coins based on two parameters passed to it - the name of the column to sort by, and 'ascending' or
  'descending'.
  * When you click a column heading, it passes new parameters to sortedCoins, and Vue then repopulates the table in that 
  new order, and the graphs are redrawn to match.
* Price history and graphs are requested and added asynchronously.
  * The benefit of this is that the website does not become unresponsive while waiting for these to load.
   

## Links

- The project's live site: https://cointrends.site/
- Project Repository: https://github.com/oliver-0/CoinTrends/
- My Portfolio: [oliverdavies.me](https://oliverdavies.me)
- Resources: 
  - CanvasJS: https://canvasjs.com
  - CoinCap API v1: https://github.com/CoinCapDev/CoinCap.io
  - CryptoCompare API: https://www.cryptocompare.com/api/


## Licensing

The code in this project is licensed under the terms of the [MIT license](https://github.com/oliver-0/CoinTrends/blob/master/LICENSE).
