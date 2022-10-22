// pages/state1/steate1.js
const db=wx.cloud.database();
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active:0,
        steps: [
          {
            text: '步骤一',
            desc: '未送达到指定地点，请尽快送到学校内的收纳站',
          },
          {
            text: '步骤二',
            desc: '已送到指定地点',
          },
          {
            text: '步骤三',
            desc: '已被取走',
          },
          {
            text: '步骤四',
            desc: '取走后对您的分数为：',
          },
        ],
        name:null,
        time:null,
        array:[]
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //用户捐赠的物品的时间与名字
       this.setData({
          name: options.name
        })
        this.setData({
            time: options.time
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
             name:this.data.name,
             time:this.data.time,
             user:app.gloabalData.phone
         }).get().then(res=>{
            this.setData({
                array:res.data
            })
              if(this.data.array[0].state){
                  this.setData({
                      active:1
                  })
                  if(this.data.array[0].take){
                    this.setData({
                        active:2
                    })
                  }
              }
         })
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