<script setup lang="ts">
import SvgIcon from '../SvgIcon.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

props
</script>

<template>
  <div class="nav-item" :class="{ active: item.isSelected }">
    <a class="name-wrapper" href="">
      <SvgIcon :icon-class="item.icon" />
      <span class="name">{{ item.name }}</span>
    </a>

    <div class="count" v-if="item.count">
      <span>{{ item.count }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.6em;
  border-radius: 0.4em;
  // border: 0.2em solid rgba(0, 0, 0, 0.08);
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .name-wrapper {
    flex: 1;
    display: flex;
    text-decoration: none;
  }
  .name {
    margin-left: 0.2em;
    text-align: center;
  }

  .count {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
  .count span {
    font-size: 12px;
    color: #aaa;
  }
}

.active {
  background: rgba(0, 0, 0, 0.04);
}
</style>
