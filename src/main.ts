import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { userStore } from '@/modules/user'

userStore.init()

createApp(App)
    .use(router)
    .mount('#app')
