import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // 重定向
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/index.vue')
    },
      {
        // botnav一级路由
        path: '/botnav',
        // 重定向
        redirect:'/botnav/index',
        component: () => import('./views/Botnav.vue'),
        // 配置嵌套路由，嵌套路由会拼接到一级路由后面,二级路由path不要加 / 
        children:[
          {
            path:'index',
            name:'index',
            component:() => import('./views/index.vue')
          },
          {
            path:'list',
            name:'list',
            component:() => import('./views/List.vue')
          },
          {
            path:'cart',
            name:'cart',
            // 定义一个meta属性
            meta:{
              // 当有这个字段的时候，我们就认为他这个路由页面是要有登陆权限的，路由守卫在main.js中定义
              requireAuth:true
            },
            component:() => import('./views/cart.vue')
          },{
            path:'mine',
            name:'mine',
            // 定义一个meta属性
            meta:{
              // 当有这个字段的时候，我们就认为他这个路由页面是要有登陆权限的
              requireAuth:true
            },
            component:() => import('./views/mine.vue')
          }
        ]
      }
  ]
})