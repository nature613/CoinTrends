<template>
  <footer class="footer-inner">
    <div class="footer-inner-left">
      <a id="portfolio" href="https://oliverdavies.me/" title="Oliver Davies Portfolio" target="_blank">oliverdavies.me</a>
      <div>&copy; Oliver Davies 2020</div>
    </div>
    <div class="footer-inner-right">
      <h5 class="footer-resources-title">Made with
        <a href="https://canvasjs.com/" title="Vue.js - The Progressive JavaScript Framework" target="_blank">
          <img id="vue-logo" src="@/assets/images/vue-logo.png"/>Vue.js</a>, using:</h5>
      <div class="footer-resources">
        <div>
          <a href="https://canvasjs.com/" title="Beautiful HTML5 JavaScript Charts | CanvasJS" target="_blank"><img class="footer-resources-img" src="@/assets/images/canvasjs-logo.svg"/><span class="footer-resources-text">CanvasJS</span></a>
        </div>
        <div>
          <a href="https://docs.coincap.io/" title="CoinCap.io | Reliable Cryptocurrency Prices and Market Capitalizations" target="_blank"><img class="footer-resources-img" src="@/assets/images/coincap-logo.png"/><span class="footer-resources-text">CoinCap API 2.0</span></a>
        </div>
        <div>
          <a href="https://www.cryptocompare.com/api/" title="CryptoCompare API - The only free cryptocurrency data API for over 90 exchanges and 1800 coins" target="_blank"><img class="footer-resources-img" src="@/assets/images/cryptocompare.png"/><span class="footer-resources-text">CryptoCompare API</span></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'bottom',
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.footer-inner {
  background-color: #f1f1f1;
  color: #4a4a4a;
  width: 100%;
  padding-bottom: 5px;
  margin-top: 10px;
}
.footer-inner-left {
  width: 25%;
  float: left;
  padding-top: 65px;
  text-align: center;
}
#portfolio {
  font-weight: 600;
}
.footer-inner-right {
  width: 250px;
  margin: 0 auto;
}
.footer-resources-title {
  font-size: 1rem;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  #vue-logo {
    height: 0.9rem;
    vertical-align: baseline;
  }
}
.footer-resources {
  display: grid;
  width: 200px;
  margin: 0 auto;
}
.footer-resources div {
  padding-bottom: 10px;
}
.footer-resources div a {
  display: flex;
  align-items: center;
}
.footer-resources-img {
  height: 2rem;
}
.footer-resources-text {
  vertical-align: middle;
  padding-left: 10px;
  padding-bottom: 5px;
}
@media (max-width: $breakpoint-med) {
  .footer-outer {
    padding-top: 259px;
  }
  .footer-inner {
    display: grid;
  }
  .footer-inner-left {
    order: 2;
    padding: 15px 0;
    margin: 0 auto;
    width: 200px;
    border-top: 1px solid #b2b2b2;
  }
  .footer-inner-right {
    order: 1;
  }
  .footer-resources {
    width: 150px;
  }
}
@media (max-width: $breakpoint-small) {
  .footer-outer {
    padding-top: 225px;
  }
}
</style>
