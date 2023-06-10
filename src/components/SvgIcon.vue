<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  // 图标名称
  iconClass: {
    type: String,
    require: true,
  },
  // 自定义样式名称
  className: {
    type: String,
  },
})
const iconName = computed(() => {
  return `#icon-${props.iconClass}`
})
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  } else {
    return 'svg-icon'
  }
})
</script>

<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
