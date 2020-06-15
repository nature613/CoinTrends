<template>
  <header id="heading">
    <div class="brand">
      <div class="brand-image"><img src="@/assets/images/cointrends.svg" alt="CoinTrends logo"></div>
    </div>
    <div class="brand-title">CoinTrends</div>
  </header>
</template>

<script>
export default {
  name: 'heading'
}
</script>

<style lang="scss" scoped>
#heading {
  display: flex;
  justify-content: center;
  align-items: center;
}
#heading {
  .brand {
    display: flex;
    justify-content: flex-start;
  }
  .brand-image {
    img {
      display: block;
      height: 2rem;
      margin: auto;
    }
  }
  .brand-title {
    padding-left: 0.35rem;
    font-family: 'Changa', sans-serif;
    font-weight: 200;
    font-size: 2.5rem;
  }
}
</style>
