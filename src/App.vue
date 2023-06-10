<script setup lang="ts">
import TodoList from './components/TodoList/TodoList.vue'
import NavList from './components/Nav/NavList.vue'

let navData = [
  {
    icon: 'Today',
    name: '今天',
  },
  {
    isSelected: true,
    icon: 'Bookmark',
    name: '重要',
    count: 5,
  },
  {
    icon: 'Mission',
    name: '任务',
    count: 5,
  },
]

// test
let cid: number = 101

</script>

<template>
  <div class="container">
    <div class="topBar"></div>
    <div class="content">
      <div class="nav">
        <NavList :data="navData"></NavList>
      </div>
      <div class="todos">
        <TodoList :group-id="cid"></TodoList>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.topBar {
  width: 100%;
  height: 3em;
  background: #db4c3f;
}
.content {
  width: 100%;
  flex: 1;
  display: flex;
}

.nav {
  width: 20em;
  display: flex;
  padding: 1em;
  background: #fff;
}

.todos {
  flex: 1;
  background: #faf9f8;
  display: flex;
  flex-direction: column;
  padding: 2em;
}
</style>
