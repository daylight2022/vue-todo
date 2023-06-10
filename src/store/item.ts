import { defineStore } from 'pinia'
import ITodoListItem from '../interfaces/ITodoListItem'

export const useTodoStore = defineStore({
  id: 'app-todo',
  state: () => ({
    TodoList: [] as ITodoListItem[],
  }),
  getters: {
    getTodoList(state) {
      return (cid?: number): ITodoListItem[] => state.TodoList.filter((item) => item.cid === cid)
    },
    getAllTodoList(state) {
      return state.TodoList
    },
  },
  actions: {
    updateTodoItem(item: ITodoListItem) {
      if (item) {
        this.TodoList.map((x) => {
          if (x.id === item.id) {
            x = item
          }
        })
      }
    },
    addTodoItem(item: ITodoListItem) {
      if (item) {
        this.TodoList.push(item)
      }
    },
    delTodoItem(item:ITodoListItem) {
      if(item) {
        const index = this.TodoList.findIndex(item => item.id === item.id)
        if (index != -1) {
          this.TodoList.splice(index, 1)
        }
      }
    }
  },
  // pinia 数据持久化
  persist: [
    {
      key: 'todo',
      storage: localStorage,
      paths: ['TodoList'],
    },
  ],
})
