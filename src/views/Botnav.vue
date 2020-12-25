<template>
    <div>
     <!-- 路由容器 -->
     <router-view class="Router"></router-view>
        <cube-tab-bar
            id="tabbar"
            v-model="selectedLabelDefault"
            :data="tabs"
            @change="changeHandler">
        </cube-tab-bar>
        <span class="countsum">{{countsum}}</span>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return { 
      // 初始化变量
      transitionName:'slide-right',
        // 默认选中的label
      selectedLabelDefault: '主页',
      tabs: [{
        label: '主页',
        icon: 'cubeic-home'
      },
      {
        label: '分类',
        icon: 'cubeic-tag'          
      }, {
        label: '购物车',
        icon: 'cubeic-mall'
      }, {
        label: '我的',
        icon: 'cubeic-person'
      }]
    }
  },
  methods: {
    // 点击与当前不同的函数，跳转去到不同的路由
    changeHandler (label) {
    //使用switch语句
    // 语法
    /**
     * switch(e){
     *      case'e=0':
     *      ...
     *      return;
     *      case'e=1':
     *      ...
     *      return;
     *      ......
     * }
     * 
     */
        switch(label){
            case '主页':
            this.$router.push({path:"/botnav/index"});
            return;
            case '分类':
            this.$router.push({path:"/botnav/list"});
            return;
            case '购物车':
            this.$router.push({path:"/botnav/cart"});
            return;
            case '我的':
            this.$router.push({path:"/botnav/mine"});
            return;                                    
        }   
    }
  },
  computed:{
    // 从vuex中的getter中获取countsum
    ...mapGetters({
      countsum:'countsum'
    })
  },
  // 修改点击了之后下面botnav颜色不对的情况 
  created(){
    switch(this.$route.path){
      case'/botnav/index':
      this.selectedLabelDefault='主页';
      break;
      case'/botnav/list':
      this.selectedLabelDefault='分类';
      break;      
      case'/botnav/cart':
      this.selectedLabelDefault='购物车';
      break;      
      case'/botnav/mine':
      this.selectedLabelDefault='我的';
      break;         
    }
  }
}
</script>
<style>
    #tabbar{
        position:fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index:999;
        background: #ffffff;
    }
    #tabbar div{
        font-size: 16px;
        padding-top:3px;
    }
    #tabbar i{
        font-size:20px
    }
    .countsum{
      position: fixed;
      bottom: 5%;
      right:30%;
      z-index: 999;
      width: 18px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      border-radius: 50%;
      font-size:15px;
      background: red;
      color:#ffffff;
    }
</style>