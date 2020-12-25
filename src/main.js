import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import axios from 'axios'
// 引入拦截器
import setaxios from './setaxios'
// 执行拦截器
setaxios()
Vue.config.productionTip = false
// 挂载到vue原型上，使用的时候 this.$http
Vue.prototype.$http=axios

// 路由守卫
router.beforeEach((to, from, next) => {
  // 无论是刷新还是跳转路由，第一个进入的就是这个路由前置钩子函数 ，如果没有登陆，点击购物车和我的就会重定向到首页
  // 如果刷新 vuex中的数据会丢失，所以先将本地的token提交到vuex中
  store.commit('settoken', localStorage.getItem('token'))
  // 判断是否存在这个meta.requireAuth属性，如果存在则需要先登录在判断
  if(to.meta.requireAuth){
      // 再判断是否存在token
      if(store.state.token){
        // 跳转到对应页面
        next()
      }else{
        // 没有token则跳转到登陆页面
        next({
            path:'/login',
            // 路由上携带重定向的参数，把要跳转的地址作为参数传到下一步，
            query:{redirect: to.fullPath}
            // 然后跳转login.vue中           
        })
      } 
  }else{
      next()
  }
   
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
