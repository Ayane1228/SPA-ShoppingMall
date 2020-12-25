<template>
    <div id="index">
        <!-- cube-ui制作轮播图 -->
        <cube-slide ref="slide" :data="items" >
            <cube-slide-item v-for="(item, index) in items" :key="index" >
                <a :href="item.url">
                    <img id='banner' :src="item.image">
                </a>
            </cube-slide-item>
        </cube-slide>
        <!-- 滚动分类 -->
        <div id="list">
            <cube-slide ref="slidelists" :auto-play="false" :showDots="false" :data="lists" >
            <!-- 第一层循环 循环lists中的2个数组 -->
                <cube-slide-item v-for="(list, index) in lists" :key="index" >
                    <ul class="listul">
                        <!-- 第二层循环 循环输出数组中的内容 -->
                        <li v-for="(item,index1) in list" :key="index1" class="listli">
                            <a :href="item.url">
                                <img :src="item.image" alt="" srcset="">
                                <p>{{item.label}}</p>
                            </a>
                        </li>
                    </ul>
                </cube-slide-item>
        </cube-slide> 
        </div>
       
    </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      lists: []
    }
  },
//   生命周期函数 获取轮播图接口数据 获取滚动分类数据
    async created() {
       try{
        //获取轮播图接口数据
        const items = await this.$http.get('/api/banner')
        this.items = items.data
        //获取滚动分类数据
        const lists = await this.$http.get('/api/rollinglists') 
        this.lists = lists.data
       }catch(err){
           console.log(err)}
    }
}
</script>
<style>
    #banner{
        width: 100%;
        height: 175px;
    }
    #list{
        margin: 20px 20px;
    }
    .listul{
        display: flex;
        flex-wrap: wrap;
    }
    .listli{
        justify-content: center;
        width: 25%;
    }
    .listli img{
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
    .listli p{
        font-size: 15px;
    }
</style>