<template>
  <footer class="footer-inner">
    <div class="footer-inner-left">
      <a id="portfolio" href="https://oliverdavies.me/" title="Oliver Davies Portfolio" target="_blank">oliverdavies.me</a>
      <div>&copy; Oliver Davies 2020</div>
    </div>
    <div class="footer-inner-right">
      <h5 class="footer-resources-title">Resources</h5>
      <div class="footer-resources">
        <div>
          <a href="https://canvasjs.com/" title="Beautiful HTML5 JavaScript Charts | CanvasJS" target="_blank"><img class="footer-resources-img" src="@/assets/images/canvasjs-logo.svg"/><span class="footer-resources-text">CanvasJS</span></a>
        </div>
        <div>
          <a href="https://github.com/CoinCapDev/CoinCap.io" title="CoinCapDev/CoinCap.io: API tools and documentation" target="_blank"><img class="footer-resources-img" src="@/assets/images/coincap.png"/><span class="footer-resources-text">CoinCap API v1</span></a>
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
  name: 'bottom'
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.footer-inner {
  background-color: #f1f1f1;
  color: #4a4a4a;
  width: 100%;
  padding-bottom: 5px;
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
  width: 200px;
  margin: 0 auto;
}
.footer-resources-title {
  font-size: 1.25rem;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
}
.footer-resources {
  display: grid;
  width: 200px;
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
    width: 150px;
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
