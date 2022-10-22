// pages/goods/goods.js
const db = wx.cloud.database();
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
       order:1,
       public:"",
       array:[],
       message:null
    },
    onClickIcon:function () {
        wx.switchTab({
          url: '/pages/buycar/buycar',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { 
      this.setData({
        order:options.cid
      })
      if(options.cid<=15){
        this.setData({
          message:"S码：80-90斤\n M码：90-100斤\n L码：100-110斤 \n XL码：111-121斤 \n 2XL码：122-132斤 \n 3XL码：133-145 "
        })
      }else if(options.cid<=19){
        this.setData({
          message:"浅灰色浅灰色\n 雅致蓝雅致蓝 \n酒红色酒红色 \n米白色米白色\n 黑色黑色 "
        })
      }else if(options.cid<=23){
        this.setData({
          message:"黑色 灰色\n   军绿 藏青\n卡其"
        })
      }else if(options.cid<=27){
        this.setData({
          message:" 40(250mm)  41/42(260mm) \n 43(270mm)44(280mm)\n 45(290mm) 46/47(300mm)"
        })
      }else if(options.cid<=31){
        this.setData({
          message:" 九程新\n 八成新\n七成新"
        })
      }else{
        this.setData({
          message:" 安徽大学出版社"
        })
      }
      
      db.collection("type").where({
        number:parseInt(this.data.order)
      }).get().then(
        res=>{
          this.setData({array:res.data})
          this.setData({public:res.data[0].information})
        }
      )
    },
    //加入捐赠车请求
    onClickButton:function(){
      app.gloabalData.number=app.gloabalData.number.concat(this.data.order) 

    },
    //立刻捐赠请求 
    onClickButton1:function(){
      if(app.gloabalData.phone){
      wx.navigateTo({
        url: '../../pages/nume/nume?cid='+this.data.order,
      })}else{
           wx.showToast({
             title: '请先登录',
             icon:"none"
           })
      }
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