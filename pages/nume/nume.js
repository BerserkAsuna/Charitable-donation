// pages/nume/nume.js
const db = wx.cloud.database();
var app=getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        number:0,
        array: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        b:[],
        objectArray: [
            {
              id: 0,
              name: '1'
            },
            {
              id: 1,
              name: '2'
            },
            {
              id: 2,
              name: '3'
            },
            {
              id: 3,
              name: '4'
            },
            {
                id: 4,
                name: '5'
              },
              {
                id: 5,
                name: '6'
              },
              {
                id: 6,
                name: '7'
              },
              {
                id: 7,
                name: '8'
              },
              {
                id: 8,
                name: '9'
              },
          ],
          index: 0,
    },
    bindPickerChange: function(e) {
        this.setData({
          index: e.detail.value
        })
      },
      //确认捐赠
      add:function( ){
          var that=this
          var time = util.formatTime(new Date());
          // 再通过setData更改Page()里面的data，动态更新页面的数据
          this.setData({
            time: time
          });      
        wx.showModal({

            title: '温馨提示',
            
            content: '确定要捐赠吗?',
            
            success: function(res) {
            
            if (res.confirm) {
            
                db.collection("type").where(
                    {
                        number:parseInt(that.data.number)
                    }
                ).get().then(
                    res=>{
                      that.setData({
                          b:res.data
                      })
                     db.collection("monad").add({
                         data:{ 
                            user:app.gloabalData.phone,
                            name:that.data.b[0].name,
                            sum:parseInt(that.data.array[that.data.index]),
                            time:time,
                            state:false,
                            take:false,
                            frequency:0
                         },  
                     })
                     
      
                    }
                )
              //捐赠成功后返回
              wx.navigateBack({
                delta: 1,
             })
             setTimeout(function() {
                wx.showToast({
                  title: '捐赠成功',
                  icon:"none"
                })
             }, 1000);
            } else if (res.cancel) {
                      
            }
            
            }
            
            })
          
      },
      //取消捐赠
      click:function(){
       wx.navigateBack({
            delta: 1,
         })
         
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.setData({
           number:options.cid})
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