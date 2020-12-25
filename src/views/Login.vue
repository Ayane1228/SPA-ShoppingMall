<template>
    <div>
        <img class='headimg' src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F19%2F03%2F18%2Fdc4b8cb03809f6c3678186e8c59d0269.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611467897&t=4b88fd7efcdb85711f48ed3e84ae6777" alt="" srcset="">
        <cube-form
  :model="model" 
  :schema="schema"
  @submit="submitHandler"
        ></cube-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
          username:'',
          password:''
      },
    //   cube-ui设置：schema 概要
      schema: {
        //   使用 fields 定义表单字段
          fields:[
              {
                type: 'input', //字段类型
                modelKey: 'username', //对应的model的键值
                label: '用户名', //字段的标签值
                // type 对应的组件或者自定义组件 component 所需要的 props
                props:{
                    placeholder: '请输入用户名'
                },
                // 校验规则
                rules: {
                    // 不能为空
                  required: true,
                  type: 'string',
                  min: 3,
                  max: 15
                },
                // 如果设置为 'blur' 那么则会在离焦后校验
                trigger: 'blur',
                // 字段的校验消息
                message:{
                    required: "用户名不能为空",
                    min: '用户名不能大于三个字符',
                    max: "用户名不能大于十五个字符"
                },
              },
              {
                type: 'input', //字段类型
                modelKey: 'password', //对应的model的键值
                label: '密码', //字段的标签值
                // type 对应的组件或者自定义组件 component 所需要的 props
                props:{
                    placeholder: '请输入密码',
                    type:'password',
                    eye:{
                      open: false
                    }
                },
                // 校验规则
                rules: {
                    // 不能为空
                  required: true,
                },
                // 如果设置为 'blur' 那么则会在离焦后校验
                trigger: 'blur'
              },
                            {
                type: 'submit', //字段类型
                label: '登录' //字段的标签值
              }
          ]
      } 
    }
  },
  methods:{
    //   async await promise的一种语法糖的写法
      async submitHandler(e){
          e.preventDefault()
          try{  
              const result = await this.$http.get('./api/login',{params:this.model})
                if(result.code == '0'){
                    // 提交到vuex中
                    this.$store.commit('settoken', result.token)
                    // 保存到localStorage
                    window.localStorage.setItem('token',result.token)
                    // 路由守卫：判断路由是否有携带参数，带参就跳转到对应的页面。没有就跳转到首页
                    if(this.$route.query.redirect){
                      this.$router.replace({path:this.$route.query.redirect})
                    }else{
                      this.$router.replace({path:'/botnav/index'})
                    }
              }else{
                alert(result.message)
              }
          }catch(err){
              console.log(err)
          }
      }
  }  
}
</script>
<style>
.headimg{
  width: 100%;
  height:150px
}
</style>
