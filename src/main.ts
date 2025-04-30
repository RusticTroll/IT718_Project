import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueVirtualScroller from 'vue-virtual-scroller'

import App from './App.vue'
import router from './router'

import awsconfig from '../amplify_outputs.json'
import { Amplify } from 'aws-amplify'
Amplify.configure(awsconfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueVirtualScroller)

app.mount('#app')
