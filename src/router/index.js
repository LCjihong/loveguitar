import { createRouter,createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// 登陆注册
import User from '../views/User/User.vue'
import Login from '../components/User/Login.vue'
import Register from '../components/User/Register.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    children: [
      {path:'/',redirect:'/login'},
      {path:'login',name:'login',component:Login},
      {path:'Register',name:'Register',component:Register}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router