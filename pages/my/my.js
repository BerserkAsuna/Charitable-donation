// pages/my/my.js
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      phone:app.gloabalData.phone,
    },
   tiao:function(){
     if(app.gloabalData.phone){
    wx.navigateTo({
      url: '../../pages/QRcode/QRcode?jiaoyanCode='+this.data.phone
    })
    app.gloabalData.status=true
  }else{
    wx.showToast({
      title: '请先登录',
      icon:"none"
    })
  }
   },
   tiao1:function(){
    if(app.gloabalData.phone){
   wx.navigateTo({
     url: '../../pages/integral/integral'
   })
 }else{
   wx.showToast({
     title: '请先登录',
     icon:"none"
   })
 }
  },
  tiao2:function(){
    if(app.gloabalData.phone){
   wx.navigateTo({
     url: '../../pages/password/password'
   })
 }else{
   wx.showToast({
     title: '请先登录',
     icon:"none"
   })
 }
  },
  tiao3:function(){
    if(app.gloabalData.phone){
   wx.navigateTo({
     url: '../../pages/fundraiser/fundraiser'
   })
 }else{
   wx.showToast({
     title: '请先登录',
     icon:"none"
   })
 }
  },
  tiao4:function(){
    if(app.gloabalData.phone){
   wx.navigateTo({
     url: '../../pages/revise/revise'
   })
 }else{
   wx.showToast({
     title: '请先登录', 
     icon:"none"
   })
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
        this.setData({
          phone:app.gloabalData.phone
        })
    },
    back:function(){
      var that=this
      setTimeout(function() {
        wx.showToast({
          title: '退出成功',
          icon:"none"
        })
        that.setData({
          phone:null
       })
       app.gloabalData.phone=null
       app.gloabalData.queen=[]
       app.gloabalData.queen1=[]
       app.gloabalData.status=false
     }, 1000);
        
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