// pages/state2/state2.js
const db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active:0,
        steps: [
          {
            text: '步骤一',
            desc: '募捐请求相关人员等待处理',
          },
          {
            text: '步骤二',
            desc: '请求已同意请尽快取走物品',
          },
          {
            text: '步骤三',
            desc: '已取走物品',
          },
          {
            text: '步骤四',
            desc: '等待打分中~~',
          },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       db.collection('stay').where({
         _id:options.id
       }).get().then(res=>{
          if(res.data[0].status){
            this.setData({
              active:1
            })
            if(res.data[0].away){
              this.setData({
                active:2
              })
            }
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