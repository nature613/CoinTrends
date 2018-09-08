let COINCAP_API_URI = "https://coincap.io";
let CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com/data";
let CRYPTOCOMPARE_IMG_URI = "https://www.cryptocompare.com";
//let UPDATE_INTERVAL = 60 * 1000; //60ms * 1000 = 60s
//Vue.use(VueNumerals);

let app = new Vue({
  el: "#app",
  data: {
    coins: {},
    coinData: {}
  },
  methods: {
    
    getCoinData: function() {
      let self = this;
      axios.get(CRYPTOCOMPARE_API_URI + "/all/coinlist")
        .then((resp) => {
          this.coinData = resp.data.Data;
          this.getCoins();
          //console.log(this.coins);
          //Object.keys(this.$data).forEach(key => this.$data[key] = null);
        })
        .catch((err) => {
          this.getCoins();
          console.error(err);
        });
    },
    
    getCoins: function(){
      let self = this;
      axios.get(COINCAP_API_URI + "/front")
        .then((resp) => {
          resp.data.length = 20;
          this.coins = resp.data; //at this point app.coins is populated with the top 20 coins
          var coinShorts = []
          for(var i in resp.data) {
            coinShorts.push(resp.data[i].short)
          }
          console.log(coinShorts);
          console.log(this.coins);
          //
        const getCoinHist = (short) => {
          return new Promise((resolve, reject) => {
            axios.get(`https://coincap.io/history/7day/${short}`)
            .then(response => {
              //////var len = response.data.price.length
              //////return resolve((response.data.price[len-1][1] / response.data.price[0][1]) - 1);
              return resolve(response.data.price)
              //console.log(response.data.price)
              //return resolve(response.data.price)
            })
            .catch(error => {
              return reject(error.message)
            })
          })
        }
        //an async version of forEach function for iterating axios.get
        async function asyncForEach(array, callback) {
          for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
          }
        }
        //function to run the iterated axios.get
        const start = async() => {
          console.log(this.coins);
          await asyncForEach(this.coins, async (coin) => {
            await getCoinHist(coin.short).then((price) => {
              /*console.log(`7day: ${coin.short}: ${price}`)
              console.log(coin)
              console.log(price)
              console.log(`${coin.short}`)
              console.log(this.coins)
              //var ind = this.coins.indexOf(`${coin.short}`);
              //console.log(this.coins.short.indexOf(`${coin.short}`))
              console.log(ind)
              console.log(this.coins[ind]);
              //this.coins[ind]["coinHist"] = price;
              //console.log(this.coins)
              console.log(this.coins.coinHist);*/
              // Array of position of coin.short in coinshorts
              var ind = "";
              ind = coinShorts.indexOf(coin.short);
              var len = price.length;
              var priceChange = (price[len-1][1] / price[0][1]) - 1; ///checkcheckCHECKCHECK
              this.coins[ind].coinHist = priceChange;
              if (priceChange < 0) {
                this.coins[ind].color = 'red';
              } else {
                this.coins[ind].color = 'green';
              }
              //Vue.set(this.coins, ind, price);
              //console.log(this.coins[1].coinHist);
              makeChart(price, ind); /*global makeChart*/
              //console.log("Price: "+price+", ind: "+ind);
              this.coins[0].shapeshift = ind;
              //I have short name
              
              
              //just have to figure out how to get the coinhist into the .data here sequentially
            })
          })
          console.log('Done');
          console.log(this.coins[5].coinHist);
          this.coins[0].shapeshift = "temp";
          ////can also push all coins here if needs be, with use of a temporary array/object?
        }
        start();
          
          
        })
        .catch((err) => {
          console.error(err);
        });
    },
    
    getCoinImage: function(short) {
      short = (short === "VEN" ? "VET" : short); //VeChain logo workaround while there's confusion about the new VeChain fork
      try {
        return CRYPTOCOMPARE_IMG_URI + this.coinData[short].ImageUrl;
      } catch(err) {
        console.log(err);
      }
    },
    
  },
  created: function() {
    //on pageload, begin with an initial run of getCoinData
    this.getCoinData();
  }
});