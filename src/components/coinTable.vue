<template>
  <main id="content">
    <table class="table">
      <thead class="table-row-borderless">
        <tr class="table-row-borderless">
          <td v-for="(columnHeading, index) in columnHeadings" :key="`${columnHeading}-${index}`"
            @click="changeSortType(columnHeading.sortType)"
            :id="`header-${columnHeading.sortType}`"
            class="header" :class="{'loading': isLoading}"
            :colspan="columnHeading.colspan"
          >
            {{columnHeading.content}}
            <sortIconWithLoader :isLoading="isLoading" :isSortFocus="currentSort === columnHeading.sortType" :isFacingUp="currentSortDir === 'asc'"/>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, index) in sortedCoins" :key="`coin-${index}`">
          <td class="rank">{{coin.rank}}</td>
          <td class="short">{{coin.symbol}}</td>
          <td class="short-hidden"></td>
          <td><img class="coin-image" :src="getCoinImage(coin.symbol)"></td>
          <td class="long">{{coin.name}}</td>
          <td class="marketcap align-right">{{coin.marketCapUsd | numeralFormat('($0.00 a)')}}</td>
          <td v-if="coin.priceUsd < 0.020" class="price align-right">{{coin.priceUsd | numeralFormat('$0,0.0000')}}</td>
          <td v-if="coin.priceUsd < 0.500 && coin.priceUsd >= 0.020" class="price align-right">{{coin.priceUsd | numeralFormat('$0,0.000')}}</td>
          <td v-if="coin.priceUsd >= 0.500" class="price align-right">{{coin.priceUsd | numeralFormat('$0,0.00')}}</td>
          <td class="chart">
            <price-hist-chart :coin="coin" :index="index" :chartDrawHandler="chartDrawHandler"/>
          </td>
          <td class="coinHist align-right" :class="getPriceHistClass(coin)">{{coin.coinHist | numeralFormat('+0.00')}}%</td>
        </tr>
      </tbody>
    </table>
    <div v-if="showErrorMessage" id="error-message">One of the API calls has failed - please try refreshing and/or let me know!</div>
  </main>
</template>

<script>
import sortIconWithLoader from '@/components/sortIconWithLoader.vue';
import priceHistChart from '@/components/priceHistChart.vue';
import Vue from 'vue';
import axios from 'axios';

let COINCAP_API_URI = 'https://api.coincap.io/v2';
let CRYPTOCOMPARE_API_URI = 'https://min-api.cryptocompare.com/data';
let CRYPTOCOMPARE_IMG_URI = 'https://www.cryptocompare.com';

export default {
  name: 'coinTable',
  components: {
    sortIconWithLoader: sortIconWithLoader,
    priceHistChart: priceHistChart,
  },
  data() {
    return {
      coins: [],
      coinData: {},
      currentSort: 'rank',
      currentSortDir: 'desc',
      columnHeadings: [
        { sortType: 'rank', content: 'Cryptocurrency', colspan: '4' },
        { sortType: 'marketCapUsd', content: 'Market Cap (USD)', colspan: '1' },
        { sortType: 'priceUsd', content: 'Price (USD)', colspan: '1' },
        { sortType: 'coinHist', content: '7-Day Change', colspan: '2' },
      ],
      chartDrawHandler: false,
      isLoading: true,
      showErrorMessage: false,
    };
  },
  created() {
    this.getAndStoreMiscCoinData()
      .then(() => this.getAndStoreListOfTopCoins())
      .catch(error => this.abort(error))
      .then(() => this.getAndStoreAllCoinHistories())
      .then(() => this.finalisePageContent());
  },
  computed: {
    sortedCoins() {
      return this.coins.slice().sort((a, b) => {
        let direction = 1;
        if (this.currentSortDir === 'desc') direction = -1;
        if (this.currentSort === 'rank') direction = -1 * direction;
        if (parseFloat(a[this.currentSort]) < parseFloat(b[this.currentSort])) return -1 * direction;
        if (parseFloat(a[this.currentSort]) > parseFloat(b[this.currentSort])) return 1 * direction;
        return 0;
      });
    },
  },
  methods: {
    changeSortType(newSortType) {
      if (newSortType === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = newSortType;
      this.drawChart();
    },
    getAndStoreMiscCoinData() {
      return axios.get(`${CRYPTOCOMPARE_API_URI}/all/coinlist`)
        .then(response => {
          this.coinData = response.data.Data;
        });
    },
    getAndStoreListOfTopCoins() {
      return axios.get(`${COINCAP_API_URI}/assets`)
        .then(response => {
          this.coins = response.data.data.slice(0, 20);
        });
    },
    getAndStoreAllCoinHistories() {
      return Promise.all(this.coins.map(coin => this.getAndStoreCoinHistory(coin.id)));
    },
    getAndStoreCoinHistory(coinId) {
      return axios.get(`${COINCAP_API_URI}/assets/${coinId}/history?interval=h1`)
        .then(response => {
          let data = response.data.data;
          let coinIndex = this.coins.findIndex(coin => coin.id === coinId);
          let len = data.length;
          let priceChange = (data[len - 1].priceUsd / data[len - 169].priceUsd) - 1;
          Vue.set(this.coins[coinIndex], 'coinHist', priceChange * 100);
          Vue.set(this.coins[coinIndex], 'fullPriceHist', data);
          Vue.set(this.coins[coinIndex], 'color', priceChange < 0 ? 'red' : 'green');
        });
    },
    finalisePageContent() {
      this.enableUserControls();
      this.drawChart();
    },
    enableUserControls() {
      this.isLoading = false;
    },
    drawChart() {
      this.chartDrawHandler = true;
      this.$nextTick(() => {
        this.chartDrawHandler = false;
      });
    },
    getCoinImage(symbol) {
      try {
        return CRYPTOCOMPARE_IMG_URI + this.coinData[symbol].ImageUrl;
      } catch (error) {
        console.error(error);
      }
    },
    getPriceHistClass(coin) {
      if (coin.hasOwnProperty('coinHist')) {
        return coin.coinHist < 0 ? 'down' : 'up';
      } else {
        return '';
      }
    },
    abort(error) {
      this.showErrorMessage = true;
      this.isLoading = false;
      console.error(error);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
#content {
  margin: 0 auto;
  width: 900px;
  @media (max-width: $breakpoint-large) {
    width: 100%;
  }
}
.table {
  width: 100%;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.2);
}
.table-row-borderless {
  border: none;
}
.header {
  font-family: 'Exo 2', sans-serif;
  font-size: 0.8rem;
  color: rgba(33,33,33,0.7);
  background-color: $accent;
  padding: 10px 0 10px 0;
  position: relative;
  user-select: none;
  cursor: pointer;
  position: sticky;
  top: 0px;
  z-index: 5;
  &.loading {
    pointer-events: none;
    cursor: wait;
  }
}
.table-row-header {
  border: none;
}
#header-rank {
  width: 45%;
  padding-left: 80px;
}
#header-marketCapUsd {
  width: 20%;
  text-align: right;
  padding-right: 20px;
}
#header-priceUsd {
  width: 10%;
  text-align: right;
  padding-right: 20px;
}
#header-coinHist {
  width: 25%;
  text-align: center;
}
#error-message {
  text-align: center;
  margin-top: 25px;
}tr {
 border-bottom: 1px solid $accent;
}

td {
  font-size: 1rem;
}

td {
  &.rank {
    width: 50px;
    text-align: center;
  }
  img.coin-image {
    width: 30px;
    min-width: 30px;
  }
  &.short {
    width: 40px;
  }
  &.short-hidden {
    display: none;
  }
  &.long {
    padding-left: 3px;
  }
  &.marketcap {
    padding-right: 20px;
  }
  &.price {
    padding-right: 20px;
  }
  &.chart {
    padding-left: 17px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  &.coinHist {
    padding-right: 10px;
    &.up {
      color: green;
    }
    &.down {
      color: red;
    }
  }
}
@media (max-width: $breakpoint-med) {
  #header-Cryptocurrency {
    text-align: center;
    padding-left: 0px;
  }
  #header-Marketcap {
    display: none;
  }
  #header-Price {
    padding-right: 15px;
    width: 20%;
  }
  #header-Change {
    width: 35%;
  }
  td.rank {
    width: 40px;
  }
  td img.coin-image {
    margin: 0 5px 0 0;
    width: 30px;
    min-width: 20px;
  }
  td.short {
    display: none;
  }
  td.short-hidden {
    display: table-cell;
  }
  td.price {
    padding-right: 15px;
  }
  td.marketcap {
    display: none;
  }
  td.chart {
    padding-left: 0px;
  }
  td.coinHist {
    padding-right: 3px;
    text-align: center;
  }
}
@media (max-width: $breakpoint-small) {
  td .img.coin-image {
    width: 20px;
  }
}
</style>
