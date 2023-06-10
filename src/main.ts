import { createApp } from 'vue'
import './style.css'
import './assets/iconfont/iconfont.js'
import App from './App.vue'
import store from './store'

const app = createApp(App)

app.use(store)

app.mount('#app')
