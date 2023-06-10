<script setup lang="ts">
import ITodoListItem from '../../interfaces/ITodoListItem'
import { timeStampToString } from '../../utils/time'

const props = defineProps<{ data: ITodoListItem }>()
const emit = defineEmits(['editChanged', 'onDelete'])

const mark = () => {
  props.data.isDone = !props.data.isDone
  emit('editChanged')
}

const onDelete = () => {
  emit('onDelete', props.data)
}
</script>

<template>
  <div class="todo-detail">
    <div class="content">
      <div class="input-wrapper">
        <div class="mark" @click="mark()">
          <div class="done" v-if="data.isDone">√</div>
        </div>
        <div class="edit">
          <textarea
            placeholder="做点什么..."
            @blur="$emit('editChanged')"
            style="font-size: 1.5em"
            v-model="data.content">
          </textarea>
        </div>
      </div>
      <div class="input-wrapper">
        <div class="edit">
          <textarea @blur="$emit('editChanged')" placeholder="添加备注" v-model="data.remark"></textarea>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="date" v-if="data.time">
        {{ timeStampToString(data.time, (data.isDone ? '完成于' : '更新于') + ' y年m月d日 h时i分') }}
      </div>
      <div class="del" @click="onDelete()">🗑</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-detail {
  display: flex;
  flex: 1;
  flex-direction: column;
  .content {
    flex: 1;
    .input-wrapper {
      border: 1px solid #ececec;
      border-radius: 0.4em;
      padding: 1em;
      display: flex;
      background: #fdfdfd;
      margin-top: 1em;
      .mark {
        width: 1.6em;
        height: 1.6em;
        background: #ececec;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 1.6em;
        margin-right: 0.5em;
        .done {
          width: 1.6em;
          height: 1.6em;
          display: flex;

          align-items: center;
          justify-content: center;
          border-radius: 1.6em;
          font-size: 0.8em;
          color: #fff;
          background: #4da864;
        }
      }
      .mark:hover {
        background: #4da864;
      }
      .edit {
        display: flex;
        flex: 1;
        textarea {
          outline: none;
          border: none;
          resize: none;
          background: none;
        }
      }
    }
  }

  .footer {
    position: relative;
    border-top: 1px solid #ececec;
    padding-top: 1em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .date {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
    }
    .del {
      width: 2.5em;
      height: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
      border-radius: 0.4em;
    }
    .del:hover {
      background: #e2305c;
      color: #ececec;
    }
  }
}
</style>
