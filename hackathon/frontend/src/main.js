import 'solana-wallets-vue/styles.css'
import './styles/styles.scss'

import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

import router from './router'
import store from './store'


//
createApp(App).use(router)
    .use(store)    
    .use(router)
    .use(MotionPlugin)
    .mount('#app')
