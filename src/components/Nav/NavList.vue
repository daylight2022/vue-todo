<script setup lang="ts">
import NavItem from './NavItem.vue'

const props = defineProps<{ data: object }>()

props
</script>

<template>
  <div class="nav-list">
    <NavItem v-for="(item, index) in data" :item="item" :key="index"></NavItem>
  </div>
</template>

<style lang="scss" scoped>
.nav-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
