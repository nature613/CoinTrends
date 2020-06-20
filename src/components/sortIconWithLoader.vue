<template>
  <div class="sort-icon" :class="{loading: isLoading, rotated: isFacingUp}">
    <img v-show="isLoading" src="@/assets/images/loader.svg" type="image/svg+xml"/>
    <img v-show="!isLoading && !isSortFocus" src="@/assets/images/caret.svg" type="image/svg+xml"/>
    <img v-show="!isLoading && isSortFocus" src="@/assets/images/caret-fill.svg" type="image/svg+xml"/>
  </div>
</template>

<script>
export default {
  name: 'sortIconWithLoader',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    isSortFocus: {
      type: Boolean,
      required: true,
    },
    isFacingUp: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.sort-icon {
  display: inline-block;
  position: absolute;
  bottom: calc(50% - 10px);
  margin-left: 5px;
  height: 14px;
  width: 14px;
  cursor: pointer;
  &.loading {
    bottom: calc(50% - 8px);
    margin-left: 5px;
    height: 16px;
    width: 16px;
    cursor: default;
  }
  &.rotated {
    transform: rotate(180deg);
  }
}
@media (max-width: $breakpoint-med) {
  .sort-icon:not(.loading) {
    margin-left: 2px;
  }
}
</style>
