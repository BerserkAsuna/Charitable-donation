// pages/login/login.js
const db = wx.cloud.database()
const _ = db.command
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      name:null,
      password:null,
      array : [
      ]
    },
    /* 注册 */
    register : function () {
        wx.navigateTo({
          url: '/pages/register/register',
        })
    },
    /*找回密码*/
    password1 : function () {
      wx.navigateTo({
        url: '/pages/password/password',
      })
    },
    /*登陆判断*/
    click : function (){
        //正则匹配
        var reg= /^(1[3|4|5|6|7|8|9])\d{9}$/;
         if((!reg.test(this.data.name))){
          wx.showToast({
            title: '手机号格式错误',
            icon:"none",
          })
          return;
        }
      //手机号长度判断
        if(this.data.name.length != 11){
          wx.showToast({
            title: '手机号长度错误',
            icon:"none",
          })
          return;
        }
        //数据库中查找用户
        this.denglu()
    },
    name : function(event){
       this.setData({name:event.detail})
    },
    password : function(event){
      this.setData({password:event.detail})
   },
   denglu :function (e) {
     var that = this;
      db.collection('user').where(
       {
         name : that.data.name 
       }
     ).get( ).then(res=>{
        that.setData({array: res.data}) 
        if(res.data.length!=0)
        {
        if(that.data.password===that.data.array[0].password){
          wx.showToast({
            title: '登录成功',
            icon:"none"
          })
          setTimeout(function() {
            wx.switchTab({
              url: '../../pages/my/my',
            })
         }, 1000);
          app.gloabalData.phone=that.data.array[0].name
          
            }else{
             wx.showToast({
               title: '密码输入错误',
               icon:"none",
          })
        }    
      } else{
        wx.showToast({
          title: '不存在该用户',
          icon:"none",
        })
      }
      }
     )
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


})