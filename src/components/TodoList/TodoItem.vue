<script setup lang="ts">
import ITodoListItem from '../../interfaces/ITodoListItem'
import { TodoType } from '../../enums/TodoType'

const props = defineProps<{ data: ITodoListItem; type: TodoType }>()
const emit = defineEmits(['updated'])

const mark = () => {
  props.data.isDone = !props.data.isDone
  emit('updated')
}
</script>

<template>
  <div class="item" v-if="(type == TodoType.Normal && !data.isDone) || (type == TodoType.Done && data.isDone)">
    <div class="mark" @click="mark()">
      <div class="status" v-if="!data.isDone"></div>
      <div class="status done" v-if="data.isDone">√</div>
    </div>
    <div class="text">{{ data.content }}</div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0.4em;
  background: #fff;
  margin: 0 0 0.6em 0;
  padding: 0.6em;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  .mark {
    margin-right: 0.5em;
    cursor: pointer;

    .status {
      width: 1.2em;
      height: 1.2em;
      border-radius: 1.6em;
      border: 0.15em solid #646060;
      font-size: 0.8em;
    }
    .status:hover {
      border-color: #db4c3f;
    }

    .done {
      border-color: #db4c3f;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
