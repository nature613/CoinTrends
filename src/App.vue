<template>
  <div id="app">
    <heading/>
  </div>
</template>

<script>
import heading from '@/components/heading.vue'

export default {
  name: 'app',
  components: {
    heading: heading
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
  font-size: 16px;
  box-sizing: border-box;
  color: $textColor;
  @media (max-width: $breakpoint-med) {
    font-size: 14px;
  }
  @media (max-width: $breakpoint-small) {
    font-size: 12px;
  }
}
*, *:before, *:after {
  box-sizing: inherit;
}
</style>
