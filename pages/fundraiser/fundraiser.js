// pages/fundraiser/fundraiser.js
const db=wx.cloud.database()
var app=getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        message:null,
        semester: [[ '长裙', '女士牛仔裤','女士休闲裤','女士衬衫','女士毛衣','女士外套','女士T恤','男士卫衣','风衣','牛仔裤','休闲裤','长袖T恤','长裤','手机','薄羽绒' ,'手提包','单肩包','斜挎包','手拿包','棒球帽','鸭舌帽','遮阳帽','平顶帽','运动鞋','男鞋','女鞋','单鞋','平顶帽','心理学','青春小说','励志','数学','专业课','英语','政治'],['1','2','3','4','5']],
        index:[0,0]
      },
      /**
       * 
       */
      bindSemesterChange:function(e){
        this.setData({
          index: e.detail.value
        })
      },
      //列改变时触发的函数
      bindColumnChange:function(e){
      },
      uu:function(e){
       this.setData({
        message:e.detail
       })
      },
      click:function(){
        var time = util.formatTime(new Date());
        var b=0;
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        this.setData({
          time: time
        });  
        db.collection("stay").where({
          user:app.gloabalData.phone
        }).get().then(res=>{
          //判断是否有未被审核的请求或未取走的物品 
          for(let a=0;a<res.data.length;a++){
            if((!res.data[a].status)||(!res.data[a].away)){
              wx.showToast({
                title: '还有募捐请求未完成',
                icon:"none"
              })
             }else{ 
               b++
             }
          }
          if(b==res.data.length){
          db.collection("stay").add({
            data:{
                user:app.gloabalData.phone,
                name:this.data.semester[0][this.data.index[0]],
                quantuty:this.data.semester[1][this.data.index[1]],
                message:this.data.message,
                time:time,
                status:false,
                away:false
            }
        })
        wx.showToast({
          title: '请求发送成功等待有关人员处理',
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