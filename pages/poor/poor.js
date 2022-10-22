// pages/poor/poor.js
const db=wx.cloud.database();
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
       message:null,
       upload: true,
    fileList: [
      ], 
    }, 
    //保存输入的原因
   uu:function(e){
     this.setData({
         message:e.detail 
     })
   }, 
   //删除图片
   qq:function(event){
       var a=this.data.fileList[event.detail.index]
    this.data.fileList.splice(event.detail.index,1)
       this.setData({ 
           fileList:this.data.fileList
       })  
       wx.cloud.deleteFile({ 
        fileList:[a.url],
       })
   },
   click:function(){
       db.collection("quest").where({
        user:app.gloabalData.phone
       }).get().then(res=>{
          if(res.data.length){
           wx.showToast({
             title: '还有请求未完成',
             icon:"none"
           })
          }else{
            db.collection("quest").add({
                data:{
                    user:app.gloabalData.phone,
                    message:this.data.message,
                    code:this.data.fileList,
                    status:false
                }
            })
            wx.showToast({
              title: '请求发送成功',
              icon:"none"
            })
            setTimeout(function() {
                wx.switchTab({
                  url: '../../pages/my/my',
                })
             }, 1000);
          }
       })
     
   },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    afterRead(event) {
        var that=this
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        var s=Math.random().toString(36).substring(2)+".png"
        wx.cloud.uploadFile({
            //正则表达式返回文件的扩展名
            cloudPath: s,
            filePath: event.detail.file.url,
            success(res) {
            //上传成功后会返回永久地址
             var na=[{
                 url:res.fileID
             }]
             that.data.fileList=that.data.fileList.concat(na)
             that.setData({
                 fileList:that.data.fileList
             })
            }
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