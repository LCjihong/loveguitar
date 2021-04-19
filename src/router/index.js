import { createRouter,createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// 登陆注册
import Login from '../views/User/Login.vue'
import Register from '../views/User/Register.vue'

/**
 * 业务主体
 */
// 首页框架


const routes = [{
    path: '/',
  },
  {
    path:'/home',
    name:'Home',
    component:Home
  },
  // 登陆注册
  {path: '/login',name: 'login',component: Login},
  {path: '/register',name: 'register',component: Register}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router