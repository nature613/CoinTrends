let COINCAP_API_URI = "https://coincap.io";
let CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com/data";
let CRYPTOCOMPARE_IMG_URI = "https://www.cryptocompare.com";
let UPDATE_INTERVAL = 60 * 1000; //60ms * 1000 = 60s

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
              var len = response.data.price.length
              return resolve((response.data.price[len-1][1] / response.data.price[0][1]) - 1);
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
            await callback(array[index], index, array)
          }
        }
        //function to run the iterated axios.get
        const start = async() => {
          console.log(this.coins)
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
              console.log(this.coins.coinHist);
              //this.coins[]
              //[BTC,]*/
              // I have coin.short
              // I need to know position of coin.short in coinshorts
              var ind = "";
              ind = coinShorts.indexOf(coin.short);
              this.coins[ind].coinHist = price;
              //Vue.set(this.coins, ind, price);
              console.log(this.coins[1].coinHist);
              //this.coins[0].shapeshift = ind;
              //I have short name
              
              
              //just have to figure out how to get the coinhist into the .data here sequentially
            })
          })
          console.log('Done')
          console.log(this.coins[5].coinHist)
          this.coins[0].shapeshift = "temp";
          ////can also push all coins here if needs be, with use of a temporary array/object?
        }
        start();
          
          
        })
        .catch((err) => {
          console.error(err);
        });
      //defining function to get 7day coin History

      
      /*
          var mainObject = {},
              promises = [];
          var myUrl;
          for(var k in resp.data) {
            console.log(k, resp.data[k]);
            console.log(k, resp.data[k].short);
            myUrl = COINCAP_API_URI + "/history/7day/" + resp.data[k].short;
            promises.push(axios.get(myUrl));
            //resp.data[k].coinHist = (coinHist(resp.data[k].short));
          }*/
          /*axios.all(promises).then(function(results) {
            results.forEach(function(response) {
              mainObject[response.identifier] = response.value;
            });
          });
          function coinHist(short) {
            return axios.get(COINCAP_API_URI + "/history/7day/" + short)
              .then((respo) => {
                //console.log(resp.data.price)
                var len = respo.data.price.length;
                console.log(len);
                console.log(short);
                console.log(respo.data.price[len-1][1]);
                console.log((respo.data.price[len-1][1] / respo.data.price[0][1] ) - 1);
                return (respo.data.price[len-1][1] / respo.data.price[0][1]) - 1;
                console.log(this.coins[1].coinHist["'[[PromiseValue]]'"])
              })
              .catch((err) => {
                console.error(err);
              });
          }
          console.log(this.coins)
          
        */
    },
    
    getCoinImage: function(short) {
      //VeChain workaround while there's token swap confusion
      short = (short === "VEN" ? "VET" : short);
      try {
        return CRYPTOCOMPARE_IMG_URI + this.coinData[short].ImageUrl;
      } catch(err) {
        console.log(err);
      }
    },
    
    /*getCoinHist: function(short) {
      function coinHist(short) {
        return axios.get(COINCAP_API_URI + "/history/7day/" + short)
          .then((resp) => {
            //console.log(resp.data.price)
            var len = resp.data.price.length;
            console.log(len);
            console.log(short);
            console.log(resp.data.price[len-1][1]);
            console.log((resp.data.price[len-1][1] / resp.data.price[0][1] ) - 1);
            resp = (resp.data.price[len-1][1] / resp.data.price[0][1]) - 1;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }*/
    
  },
  created: function() {
    this.getCoinData();
    //this.getCoinHist();
  }
});