<template>
    <div class="panelbox">
        <cube-scroll class="leftpanel">
            <ul>
                <!-- 动态绑定类名 :class="list.active?'active':''"  点击的时候修改active的布尔值-->
                <li v-for="(list,index) in tabellist" @click="selectlist(index)" :class="list.active? 'active' : 'noactive' " :key="index">
                    {{list.label}}
                </li>
            </ul> 
        </cube-scroll>
        <cube-scroll class="rightpanel">
            <ul>
                <li v-for="(tag,index) in tags" :key="index">
                    <img :src="tag.image" alt="">
                    <p>
                        {{tag.label}}
                        <!-- $event是指当前触发的事件 -->
                    <i class="cubeic-add" @click="addtoCart($event,tag)"></i>
                    </p>
                </li>
            </ul>
         </cube-scroll>   
    </div>
</template>
<script>
export default {
    data() {
        return {
            tags:"",
            // 这里采用模拟数据，真实情况一般是从后台返回一个接口，接口中提供一个数组类型的数据，
            tabellist:[
                {
                    label:'热门推荐',
                    // 第一个默认为true
                    active:true
                },{
                    label:'手机数码',
                    active:false
                }, {
                    label:'家用电器',
                    active:false
                },{
                    label:'电脑产品',
                    active:false
                },{
                    label:'美妆护肤',
                    active:false
                },{
                    label:'口红',
                    active:false
                },{
                    label:'冬装推荐',
                    active:false
                },{
                    label:'春装推荐',
                    active:false
                },{
                    label:'夏装推荐',
                    active:false
                },{
                    label:'秋装推荐',
                    active:'false'
                },{
                    label:'秋装推荐',
                    active:false
                },{
                    label:'秋装推荐',
                    active:false
                },{
                    label:'秋装推荐',
                    active:false
                },{
                    label:'秋装推荐',
                    active:false
                },{
                    label:'秋装推荐',
                    active:false
                },{
                    label:'秋装推荐',
                    active:false
                },
            ]
        }
    },
    methods:{
        // 左侧分类
        selectlist(index){
            // 循环遍历数组修改类名,获取数组中的值和索引
            this.tabellist.forEach((val,ind)=>{
                // 如果当前点击的索引（index）和数组中某个值的索引（ind）相同,就修改这个索引下的active属性
                if(index==ind){
                    val.active=true
                }else{
                    val.active=false
                }
                })
            // 修改右边的数据
            this.getclasify(index)
       },
        //请求接口，赋值给data中定义的空数据
        async getclasify(index){
            // params参数，ger请求params传递参数
            const result = await this.$http.get('/api/classify',{params:{type:index}})
            this.tags=result.data
        },
        // 添加商品到购物车时间,添加到vuex中
        addtoCart(e,tag){
            // 提交到vuex中的方法,提交之后在cart中获取数据并渲染
            this.$store.commit('tocart', tag)
        }
    },
    // 生命周期函数
    created() {
        // 通过调用getclasify（）函数来获取默认数据
        this.getclasify()
    },
    // 生命周期函数 DOM元素渲染完成之后回调的生命周期函数
    mounted(){
        // 设置滚动盒子的高度：可视窗口的高度减去底部botnav的高度，不同设备的可视高度也不同，因此要使用生命周期函数
        // cubeUI如果盒子的高度小于所有DOM元素加起来的高度则可以滚动
        // 分别获取左右盒子的高度
        const leftpanel = document.querySelector('.leftpanel')
        const rightpanel = document.querySelector('.rightpanel')
        const cubetabbar = document.querySelector('.cube-tab-bar') 
        // 获取视口高度
        // document:每个载入浏览器的 HTML 文档都会成为 Document 对象。
        // documentElement 属性以一个元素对象返回一个文档的文档元素
        // clientHeight、clientWidth→元素宽高（height+padding，不包含边框），可以理解为元素可视区域高度  
        // offsetHeight、offectWidth包含边框高度 
        const bodyheight = document.documentElement.clientHeight
        //定义高度
        leftpanel.style.height = bodyheight - cubetabbar.style.height+'px'
        rightpanel.style.height = bodyheight - cubetabbar.style.height+'px'
    }
}
</script>
<style>
    .panelbox{
        display: flex;
    }
    .leftpanel{
        width: 30%;
    }
    .leftpanel ul li{
        font-size: 14px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-bottom:1px solid #fff;
    }
    .leftpanel ul .noactive{
        color: #333;
        background: #f8f8ff;
    }
    .leftpanel ul .active{
        background: #ffffff;
        color: #e93b3d;
    }
    .rightpanel{
        margin-left:10%;
        width: 60%
    }
    .rightpanel ul{
        display: flex;
        flex-wrap:wrap;
    }
    .rightpanel ul li{
        width:50%;
        font-size: 15px;
        /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。 */
        justify-content: center;
        /* align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
        align-items: center;
    }
    .rightpanel ul li img{
        width: 80px;
        height: 80px;
    }
    .cubeic-add{
        font-size: 18px;
    }
</style>