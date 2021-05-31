import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus';
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://renjihong.zone/LGuitar'


createApp(App).use(store).use(router).use(VueAxios, axios).use(ElementPlus).mount('#app')
