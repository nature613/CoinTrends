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
}
#heading {
  .brand {
    display: flex;
    justify-content: flex-start;
  }
  .brand-image {
    padding: 1rem 1rem;
    height: 4rem;
    font-size: 2rem;
    padding-right: 0;
    img {
      display: block;
      height: 2rem;
      margin: auto;
    }
  }
  .brand-title {
    padding: 0.5rem 0.5rem;
    padding-left: 0.35rem;
    font-size: 2rem;
  }
}
</style>
