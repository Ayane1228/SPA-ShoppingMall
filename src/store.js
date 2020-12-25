import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  // 保存到vuex中的数据
  state: {
    token:'',
    // 从本地存储中获取购物车数据,如果没有就设置为空 
    cartarry:JSON.parse(localStorage.getItem('cartarry')) || [],
  },
  //同步方法，更新state中的数据 
  mutations: {
  // 设置token,第一个参数都是state
  settoken(state,token){
    state.token = token
  },
  // 添加商品到购物车
  tocart(state,tag){
    // 比较cartarry中的数据是否已经存在
    let goods = state.cartarry.find(v=>v.title==tag.label)
    // 如果存在，使得数据加1
    if(goods){
      goods.cartCount += 1
    }else{
      // 不存在，将数据保存到cartarry中
      state.cartarry.push({title:tag.label,cartCount:1})
    }
  },
  // 购物车商品加一
  cartadd(state,index){
    state.cartarry[index].cartCount++
  },
  // 购物车商品减一
  cartremove(state,index){
      if(state.cartarry[index].cartCount>1){
        state.cartarry[index].cartCount--
      }else{
        if(window.confirm('确定要移除商品吗')){
          state.cartarry.splice(index,1)
        }
      }
  },
  // 清空购物车
  clearcart(state){
    state.cartarry=[]
  }
},
  //使用异步方法到state中 
  actions: {

  },
  // 计算属性
  getters:{
    // 计算当前购物车的总数,cartCount:购物车数组
    countsum:state=>{
      let num = 0
      state.cartarry.forEach(v=>{
        num+=v.cartCount
      })
      return num
    }
  }
})

/* 每次调用mutation的时候都会回调这个方法,在这里将数据保存本地的localStorage
 * subscribe是vuex的一个实例方法，它通过订阅store的mutation，接收一个函数作为参数，会在每个 mutation 完成后调用，
 * 如果我们vuex有十个数据变量，相应的肯定有十个mutation也就是方法去操作改变保存这十个数据，
 * 当我们执行一次mutation就会调用一次，适合数据量大的情况，可以批量处理，并对某些操作作出处理
 */
store.subscribe((mutation,state)=>{
  // JSON.stringify(state.cartarry):通过 JSON.stringify():把 JavaScript对象 转换为 字符串。
  localStorage.setItem('cartarry',JSON.stringify(state.cartarry))
})

// 导出store
export default store