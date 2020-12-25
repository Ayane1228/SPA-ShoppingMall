<template>
    <div>
        <div class="goods" v-for="(item,index) in cartar" :key=index>
            {{item.title}}
            <div class="goodsright">
                <i class="cubeic-remove" @click="removeCart(index)"></i>
                <span>{{item.cartCount}}</span>
                <i class="cubeic-add" @click="addCart(index)"></i>
            </div>
        </div>
        <cube-button class="submitBtn">提交</cube-button>
        <cube-button @click="clearcart">清空</cube-button>
    </div>
</template>
<script>
// mapState:Vuex的辅助函数，当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。
// 为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性
import {mapState} from 'vuex' //导入mapState
export default {
    computed:{
        ...mapState({
            cartar:state=>state.cartarry
        })
    },
    methods:{
        // 购物车数量减一
        removeCart(index){
            this.$store.commit('cartremove',index)
        },
        // 购物车加一
        addCart(index){
            this.$store.commit('cartadd',index)
        },
        // 清空购物车
        clearcart(){
            this.$store.commit('clearcart')
        }
    }
}
</script>
<style>
    .goods{
        padding: 10px;
        text-align: left;
    }
    .goodsright{
        float:right
    }
    .submitBtn{
        margin-bottom:8px ;
    }
    .cubeic-remove{
        font-size: 18px;
    }
    .cubeic-add{
        font-size: 18px;
    }
</style>