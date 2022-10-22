// pages/record/record.js
const db=wx.cloud.database();
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    //number存用户捐赠的物品 array存物品
    data: {
      q:[],
      number:[],
      array1:[],
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    //展示物品二维码确定此物品是否被捐赠
    click1:function(event){
       wx.navigateTo({
        url: '../../pages/QRcode/QRcode?jiaoyanCode='+this.data.q[event.currentTarget.dataset.name].name 
      })
      db.collection('monad').where({
        user:app.gloabalData.phone,
        name:this.data.q[event.currentTarget.dataset.name].name,
        state:false
      }).update({
        data:{
          state:true
        }
      })
    },
    //查看物品是否送到
    click2:function(event){
     wx.navigateTo({
        url: '../../pages/state1/state1?time='+this.data.q[event.currentTarget.dataset.name1].time+"&name="+this.data.q[event.currentTarget.dataset.name1].name
      })
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
     db.collection("monad").where({
      user:app.gloabalData.phone
    }).get().then(
      res=>{
       this.setData({
         q:res.data
       })
         for(let a=0 ;a<res.data.length;a++){
        db.collection("type").where({
          name:this.data.q[a].name
        }).get().then(rq=>{
           this.setData({ 
             [`number[${a}]`]:rq.data[0].number
           })
        }) 
        
      }           
       }
    )

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