<script setup lang="ts">
import { EmojiType } from '../../enums/EmojiType'
import BaseEmoji from '../Base/BaseEmoji.vue'
import { computed, ref } from 'vue'
import ITodoListItem from '../../interfaces/ITodoListItem'
import { TodoType } from '../../enums/TodoType'
import TodoItemDetail from './TodoItemDetail.vue'
import { useTodoStore } from '../../store/item'
import TodoItem from './TodoItem.vue'

const props = defineProps<{ groupId: number }>()
const emit = defineEmits(['onUpdated'])


// 新增输入内容
const addInputValue = ref('')

// 当前分组数据
// const data: ITodoListItem[] = []
// const todoList = ref(data)

// 选中项
const selectedTodoItem = ref<ITodoListItem>()

const isShowDoneList = ref(false)

const store = useTodoStore()

const todoList = computed(() => {
  return store.getTodoList(props.groupId)
})

const doneCount = computed(() => {
  return todoList.value.filter((item) => item.isDone).length
})

const addTask = () => {
  const content = addInputValue.value
  if (content) {
    addInputValue.value = ''
    const item: ITodoListItem = {
      id: Math.floor(Math.random() * 1000),
      cid: props.groupId,
      content: content,
      isDone: false,
      time: new Date().getTime(),
    }
    store.addTodoItem(item)
  }
}

const updateItem = (id) => {
  id
  emit('onUpdated')
}

const onDetailChanged = () => {
  selectedTodoItem.value!.time = new Date().getTime()
}

const onDelete = (item) => {
  store.delTodoItem(item)
  selectedTodoItem.value = undefined
}
</script>

<template>
  <div class="todo-container">
    <div class="todo-list">
      <div class="title">
        <div class="icon"></div>
        <h1>今天</h1>
      </div>

      <div class="list">
        <div class="normal-list">
          <TodoItem
            :data="item"
            v-for="item in todoList"
            @click="selectedTodoItem = item"
            :key="item.id"
            :type="TodoType.Normal"
            @updated="updateItem(item.id)"></TodoItem>
        </div>
        <div class="btn" v-if="doneCount > 0">
          <button @click="isShowDoneList = !isShowDoneList">
            <div :class="{ icon: true, expand: isShowDoneList, unexpand: !isShowDoneList }">👉</div>
            已完成<span class="count">{{ doneCount }}</span>
          </button>
        </div>
        <div class="done-list" v-if="isShowDoneList">
          <TodoItem
            :data="item"
            v-for="item in todoList"
            @click="selectedTodoItem = item"
            :key="item.id"
            :type="TodoType.Done"
            @updated="updateItem(item.id)"></TodoItem>
        </div>
      </div>

      <div class="add-task">
        <BaseEmoji :emoji="EmojiType.Add" />
        <input autofocus type="text" v-model="addInputValue" placeholder="添加任务" @keyup.enter="addTask()" />
      </div>
    </div>
    <div class="detail" v-if="selectedTodoItem">
      <div class="header">
        <div class="close" @click="selectedTodoItem = undefined">✖</div>
      </div>
      <TodoItemDetail :data="selectedTodoItem" @edit-changed="onDetailChanged()" @on-delete="onDelete"></TodoItemDetail>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes expand {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(90deg);
  }
}

@keyframes unexpand {
  0% {
    transform: rotate(90deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
.todo-container {
  position: relative;
  display: flex;
  flex: 1;
  .todo-list {
    display: flex;
    flex: 3;
    flex-direction: column;
    padding: 1em;

    .list {
      flex: 1;
      margin-top: 1.5em;

      .btn {
        .expand {
          animation: expand 0.5s forwards;
        }
        .unexpand {
          animation: unexpand 0.5s forwards;
        }
        button {
          border: none;
          padding: 0.6em;
          border-radius: 0.4em;
          background: rgba($color: #fff, $alpha: 0.6);
          margin: 0.5em 0;
          display: flex;
          align-items: center;
        }
        button:hover {
          background: rgba($color: #fff, $alpha: 1);
        }

        .icon {
          margin-right: 0.5em;
        }

        .count {
          margin: 0 0.5em;
        }
      }
    }
    .add-task {
      display: flex;
      align-items: center;
      border-radius: 0.4em;
      padding-left: 1em;
      background: rgba($color: #fff, $alpha: 0.7);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      input {
        flex: 1;
        border: none;
        outline: none;
        background: none;
        padding: 1em 0.5em;
      }
    }
    .add-task:hover {
      background: rgba($color: #fff, $alpha: 1);
    }
  }

  .detail {
    flex: 1;
    padding: 1em;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #ccc;
    .header {
      display: flex;
      justify-content: flex-end;
      .close {
        width: 3em;
        height: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5em;
      }
      .close:hover {
        background-color: #f5f6fc;
      }
    }
  }
}
</style>
