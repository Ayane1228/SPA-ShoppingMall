<template>
    <div>
        <img class="heading" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F19%2F03%2F18%2Fdc4b8cb03809f6c3678186e8c59d0269.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611467897&t=4b88fd7efcdb85711f48ed3e84ae6777" alt="" srcset="">
        <ul>
            <li v-for="item in minearry" @click="itemclick(item)" :key='item.label' class="mineitem">
                <span class="minetitle">{{item.label}}</span>
                <i class="cubeic-arrow"></i>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            minearry:[
                {label:'商品收藏'},
                {label:'我的足迹'},
                {label:'品牌收藏'},
                {label:'我的订单'},
                {label:'退出',type:'exit'}
            ]
        }
    },
    methods: {
        // 点击退出，清除token，本地存储，回到登陆界面
        itemclick(item){
            if(item.type == 'exit'){
                // 清空roken
                this.$store.commit('settoken','')
                // 跳转到login
                this.$router.push({path:'/login'})
                // 清除本地存储的token
                localStorage.removeItem('token')
                localStorage.removeItem('cartarry')
            }
        }
    },
}
</script>
<style>
    .heading{
        height: 150px;
        width:100%;
    }
    .mineitem{
        font-size: 14px;
        text-align: left;
        height:50px;
        line-height:50px;
        padding-left:5%;
        border-bottom:1px solid #eee
    }
    .minetitle{
        width: 90%;
        display: inline-block;
    }
</style>