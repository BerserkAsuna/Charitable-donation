// pages/password/password.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        radio: '0',
        p:"1",
        box:"",
        phone:"",
        xinxi:"",
        array:[],
        yanzheng:"1",
        mima:"",
        message2:""
      },
      //判断是邮箱还是手机
      onChange(event) {
        this.setData({
          radio: event.detail,
        });
        if(this.data.radio==0)
        { this.setData({p:"1"})
        this.setData({xinxi:""})
      }
        else{this.setData({p:""})}
        this.setData({xinxi:""})
      },
     //获得输入框数据
     change:function(a){
       this.setData({box:a.detail})
     },
     change1:function(b){
      this.setData({phone:b.detail})
     },
     change2:function(c){
      this.setData({yanzheng:c.detail})
    },
    change3:function(d){
      if(d.detail.length>=6){
        this.setData({password2:d.detail})
        this.setData({message2:null})
      }
        else{
         this.setData({message2:"请输入6位及以上的密码"})
        }
      this.setData({mima:d.detail})
    },

     //储存验证码
     message:function(){
       var i=Math.floor(Math.random()*8999+1000)
       this.setData({xinxi:i})
       if(this.data.box||this.data.phone){
       console.log(this.data.xinxi)}
       else{
         wx.showToast({
           title: '请先输入邮箱或手机号',
           icon:"none"
         })
       }
     },
     click:function(){
      //判断邮箱是否注册过
       if(this.data.p==1){
        db.collection("yonghu").where({
             box:this.data.box
        }).get({
          success:res=>{
            this.setData({array: res.data}) 
            if(res.data.length!=0){
            if(this.data.box===this.data.array[0].box){
              if(!(this.data.yanzheng==this.data.xinxi)){
                wx.showToast({
                  title: '验证码输入错误',
                     icon:"none"
                })
              }else{
                  if(this.data.mima){
                    //更新该邮箱密码
                   db.collection("yonghu").where({
                     box:this.data.box
                   }).update({
                     data:{
                       password:this.data.mima
                     }
                   })
                   //更新另一个表内的密码
                   db.collection("user").where({
                    name:this.data.array[0].phone
                  }).update({
                    data:{
                      password:this.data.mima
                    }
                  })
                  //窗口跳转
                  wx.navigateTo({
                    url: '../../pages/login/login',
                  })
                  }else{
                    wx.showToast({
                      title: '请输入密码',
                      icon:"none"
                    })
                  }
              }
            }
          }else{
            wx.showToast({
              title: '该邮箱没有注册过',
              icon:"none",
            })
          }
          }
        }
        )
      }
      //判断手机号是否注册过
      if(!this.data.p){
        db.collection("yonghu").where({
          phone:this.data.phone
     }).get({
       success:res=>{
         this.setData({array: res.data}) 
         if(res.data.length!=0){
         if(this.data.phone===this.data.array[0].phone){
           if(!(this.data.yanzheng==this.data.xinxi)){
             wx.showToast({
               title: '验证码输入错误',
                  icon:"none"
             })
           }else{
               if(this.data.mima){
                 //更新该手机密码
                db.collection("yonghu").where({
                  phone:this.data.phone
                }).update({
                  data:{
                    password:this.data.mima
                  }
                })
                //更新另一个表内的密码
                db.collection("user").where({
                 name:this.data.array[0].phone
               }).update({
                 data:{
                   password:this.data.mima
                 }
               })
               //窗口跳转
               wx.navigateTo({
                url: '../../pages/login/login',
              })
               }else{
                 wx.showToast({
                   title: '请输入密码',
                   icon:"none"
                 })
               }
           }
         }
       }else{
         wx.showToast({
           title: '该手机没有注册过',
           icon:"none",
         })
       }
       }
     }
     )
      }
     },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})