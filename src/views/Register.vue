<template>
    <div>
      <img class='headimg' src="https://file.xdclass.net/video/2020-12%20%E5%AE%98%E7%BD%91%E8%B6%85100k%E4%B8%BB%E5%9B%BE%E6%9B%B4%E6%96%B0/lbt/sjms.jpg" alt="" srcset="">
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
    //   schema 概要
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
                label: '注册' //字段的标签值
              }
          ]
      } 
    }
  },
  methods:{
        submitHandler(e){
          e.preventDefault();
          // 调用接口 axios#get(url[, config]) params是即将与请求一起发送的 URL 参数,
          // then(res =>{},Ajax请求成功的回调函数 res：请求消息 req：响应消息
          // catch()错误请求之后的回调函数
          this.$http.get('/api/register',{params:this.model}).then(res=>{
              alert(res.message)
          }).catch(err=>{
            alert(err.message)
          })
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
