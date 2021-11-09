import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
var dayjs = require('dayjs')

window.dayjs = dayjs;

window.axios = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/v1',
})

createApp(App)
.use(router)
.mount('#app')
