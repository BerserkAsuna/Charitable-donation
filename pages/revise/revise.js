// pages/revise/revise.js
const db = wx.cloud.database()
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      user:null,
      nam:null,
      msessage:null,
      sex:null,
      },
      onchange1:function(e){
        this.setData({user:e.detail})
   },
   onchange2:function(e){
    this.setData({nam:e.detail})
   }, 
   onchange3:function(e){
    var re=/^([男|女])$/
    if(re.test(e.detail)){
      this.setData({sex:e.detail})
      this.setData({message:null})
    }
      else{
       this.setData({message:"只能输入男或女"})
      } 
   },
   //保存修改
   click:function(){
    if(this.data.user){
       db.collection("yonghu").where({
          phone:app.gloabalData.phone
       }).update(  
        {
          data:{user:this.data.user}        
        }
       )
    }
    if(this.data.nam){
      db.collection("yonghu").where({
         phone:app.gloabalData.phone
      }).update({
        data:{
         name:this.data.nam
       }
      }
      )
   }
   if(this.data.user){
    db.collection("yonghu").where({
       phone:app.gloabalData.phone
    }).update(
     {
       data:{sex:this.data.sex}
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