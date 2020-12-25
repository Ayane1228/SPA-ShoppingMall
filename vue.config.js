module.exports = {
  // mock接口
    configureWebpack:{
      devServer:{
        before(app){
        // 模拟用户池
        let userpoor=[
            {username:'stw',password:'123'},
            {username:'tim',password:'123456'}
        ]
        // 模拟注册接口
        app.get('/api/register',(req,res)=>{
                      // 获取请求的参数，解构赋值
                      const {username,password}=req.query
                      // filter():返回符合条件的元素组成的新数组,不对原数组进行操作
                      const userlength = userpoor.filter(v=>v.username==username).length
                      if(userlength > 0){
                        // res.json([body]) 发送一个json的响应。这个方法和将一个对象或者一个数组作为参数传递给res.send()方法的效果相同。
                        res.json({
                          success:false,
                          message:'用户已存在'
                        })
                      }else{
                        res.json({
                          success:true,
                          message:'注册成功'
                        })
                      }
                    })
        // 模拟登录接口
        let tokenkey = 'xdclass'
        app.get('/api/login',(req,res)=>{
                      const {username,password}=req.query
                      if(username =='stw'&& password =='123' || username=='tim' && password=='123456'){
                        res.json({
                          code:0,
                          message:'登陆成功',
                          token:tokenkey+'-'+username+'-'+(new Date().getTime()+3600)
                        })
                      }else{
                        res.json({
                          code:1,
                          message:'登陆失败'
                        })
                      }
                    })
          // 首页轮播图api
          app.get('/api/banner',(req,res)=>{
            res.json({
                      data:[ {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png'
                        },{
                        url: 'https://m.xdclass.net' ,
                        image: 'https://file.xdclass.net/video/2020-12%20%E5%AE%98%E7%BD%91%E8%B6%85100k%E4%B8%BB%E5%9B%BE%E6%9B%B4%E6%96%B0/lbt/nginx.jpg'
                        },{
                          url:'https://m.xdclass.net',
                          image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png'
                        }]
                      })
                    })
          // 首页滑动组件接口
          app.get('/api/rollinglists',(req,res)=>{
            res.json({
              data:[
                [
                  {
                  url:"https://app.jd.com/",
                  image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2938533,2608441563&fm=11&gp=0.jpg ',
                  label: '分类'
                  },                  {
                    url:"https://app.jd.com/",
                    image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2938533,2608441563&fm=11&gp=0.jpg',
                    label: '分类'
                    },                  {
                      url:"https://app.jd.com/",
                      image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2938533,2608441563&fm=11&gp=0.jpg',
                      label: '分类'
                      },                  {
                        url:"https://app.jd.com/",
                        image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2938533,2608441563&fm=11&gp=0.jpg',
                        label: '分类'
                        }
                ],                
                [
                  {
                  url:"https://app.jd.com/",
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png ',
                  label: '分类'
                  },                  
                  {
                    url:"https://app.jd.com/",
                    image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png ',
                    label: '分类'
                    },                  {
                      url:"https://app.jd.com/",
                      image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png ',
                      label: '分类'
                      },                  {
                        url:"https://app.jd.com/",
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png ',
                        label: '分类'
                        }
                ]
              ]
            })
          })
          // 模拟分类页面接口
          app.get('/api/classify',(req,res)=>{
            switch(req.query.type){
              case'0':
                res.json({
                  data:[{
                      image:'//img14.360buyimg.com/focus/jfs/t1/65808/20/10365/12462/5d7f4c08E26316a78/adc41aecf0bb6472.png',
                      label:"手机支架"
                    },{
                      image:'//img11.360buyimg.com/focus/jfs/t1/127792/24/2055/22569/5ec2d293E74797bab/324c2bcdd690fdf7.png',
                      label:"遮阳伞"
                    },{
                      image:'//img11.360buyimg.com/focus/jfs/t1/65538/14/10417/15112/5d7f4740E99f2f357/7d1ed8cbf177ceb4.png',
                      label:"加湿器"
                    },  
                    {
                      image:'//img13.360buyimg.com/n1/jfs/t1/110443/33/16384/16016/5eb2c723E942dca78/92ce2448dfbcef1e.png.webp',
                      label:"手机"
                    },                 
                    {
                      image:'//img14.360buyimg.com/n1/jfs/t1/63624/28/10351/16986/5d7f6c63E2bd8a305/6160c9ab46a8f83d.png.webp',
                      label:"音响"
                    },                  
                    {
                      image:'//img10.360buyimg.com/n1/jfs/t1/120433/27/231/36373/5eb3c667Ef8f6f385/46d1e271fdcbf611.png.webp',
                      label:"摄像机"
                    }]
                });
                break;
            case'1':
              res.json({
                data:[{
                  image:'//img14.360buyimg.com/focus/jfs/t1/65808/20/10365/12462/5d7f4c08E26316a78/adc41aecf0bb6472.png',
                  label:"手机支架"                  
                },
                {
                  image:'//img14.360buyimg.com/focus/jfs/t1/65808/20/10365/12462/5d7f4c08E26316a78/adc41aecf0bb6472.png',
                  label:"手机支架"                  
                }]
              });
              break;
              case'2':
              res.json({
                data:[{
                  image:'//img10.360buyimg.com/n1/jfs/t1/120433/27/231/36373/5eb3c667Ef8f6f385/46d1e271fdcbf611.png.webp',
                  label:"摄像机"
                },{
                  image:'//img10.360buyimg.com/n1/jfs/t1/120433/27/231/36373/5eb3c667Ef8f6f385/46d1e271fdcbf611.png.webp',
                  label:"摄像机"
                }]
              });
              break;
              case'3':
              res.json({
                data:[{
                  image:'//img13.360buyimg.com/n1/jfs/t1/110443/33/16384/16016/5eb2c723E942dca78/92ce2448dfbcef1e.png.webp',
                  label:"手机"
                },{
                  image:'//img13.360buyimg.com/n1/jfs/t1/110443/33/16384/16016/5eb2c723E942dca78/92ce2448dfbcef1e.png.webp',
                  label:"手机"
                }]
              })                
            }
          })
        }
      }
      },
// ul框架部分
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}