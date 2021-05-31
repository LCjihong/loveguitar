import { createRouter,createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// 登陆注册
import Login from '../views/User/Login.vue'
import Register from '../views/User/Register.vue'
// 乐谱详情
import MusicDetail from '../views/MusicDetails'
// 大世界
import BigWorld from '../views/BigWorld'
// 仅限查看的乐谱详情
import LookMD from '../views/LookMD'
/**
 * 业务主体
 */
// 首页框架


const routes = [{
    path: '/',
    redirect: '/home',
  
  },
  {
    path:'/home',
    name:'Home',
    component: Home,
  },
  // 登陆注册
  {path: '/login',name: 'Login',component: Login},
  {path: '/register',name: 'Register',component: Register},
  // 乐谱详情
  {
    path: '/musicdetail/:musicId',
    name: 'musicdetail',
    component: MusicDetail
  },
  {
    path: '/lookmd/:musicId',
    name: 'lookmd',
    component: LookMD
  },
  {
    path: '/bigworld',
    name: 'bigworld',
    component: BigWorld
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == 'Login') {
    if (localStorage.getItem('username')) {
      next({path:'/home'});
    }
  }else{
    if (!localStorage.getItem('username')) {
      next({path:'/login'});
    }
  }
  next();
})

export default router