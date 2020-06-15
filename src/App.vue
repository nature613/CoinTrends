<template>
  <div id="app">
    <heading class="heading-component"/>
    <div class="content-component"></div>
    <bottom class="bottom-component"/>
  </div>
</template>

<script>
import heading from '@/components/heading.vue'
import bottom from '@/components/bottom.vue'

export default {
  name: 'app',
  components: {
    heading: heading,
    bottom: bottom
  }
}
</script>

<style lang="scss">
@import "assets/css/minireset.css";
@import "assets/css/variables.scss";
@import "assets/css/global.scss";
#app {
  font-family: 'rawline', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
  font-size: 16px;
  box-sizing: border-box;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  @media (max-width: $breakpoint-med) {
    font-size: 14px;
  }
  @media (max-width: $breakpoint-small) {
    font-size: 12px;
  }
  .content-component {
    flex: 1 0 auto;
  }
}
</style>
