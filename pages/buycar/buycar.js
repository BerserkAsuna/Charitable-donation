// pages/buycar/buycar.js
const db=wx.cloud.database();
var app=getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    //number存储照物品序号
    data: {
        checked: false,
        number:[],
        quantity:[],
        array:[],
        d:[],
        sum:0,
      },
      //删除按钮
      onClose:function(event){  
        this.data.number.splice(event.currentTarget.dataset.name, 1)
        this.data.quantity.splice(event.currentTarget.dataset.name, 1)
        this.setData({ 
          number:this.data.number,
          quantity:this.data.quantity
        })  
      },
      //全选功能
      onChange(event) {
        var sm=0;
        this.setData({
          checked: event.detail,
        });
        for(var a=0;a<this.data.quantity.length;a++){
          sm=sm+this.data.quantity[a]
        }
        sm=sm*100
        if(this.data.checked){
        this.setData({
          sum:sm
        })}else{
          this.setData({
            sum:0
          })
        }
        
      },
      //点击增加和减少时同步更新数组
      onChange1(event) {
        var sm=0;
        this.setData({
         [`quantity[${event.currentTarget.dataset.name}]`]:event.detail
        }) 
        for(var a=0;a<this.data.quantity.length;a++){
          sm=sm+this.data.quantity[a]
        }
        sm=sm*100
        if(this.data.checked){
        this.setData({
          sum:sm
        })}else{
          this.setData({ 
            sum:0
          })
        }
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       db.collection("type").get().then(res=>{
          this.setData({
            array:res.data
          })         
       })
      
    },
    //提交事件
    onClickButton:function(){
      var app=getApp();
      var that=this;
      var time = util.formatTime(new Date());
      this.setData({
        time: time
      })
      if(app.gloabalData.phone){
        if(this.data.sum==0){
            wx.showToast({
              title: '请检查是否没选择物品',
              icon:"none" 
            }) 
        }else{
          //点击了全选并且登录了
          wx.showModal({
            title: '温馨提示',            
            content: '确认要全部捐赠吗?',           
            success: function(res) {            
            if (res.confirm) {           
              for(var a=0;a<that.data.number.length;a++){
                db.collection("monad").add({
                 data:{ 
                   user:app.gloabalData.phone,
                   name:that.data.array[that.data.number[a]-1].name,
                   sum:that.data.quantity[a],
                   time:time,
                   state:false,
                   take:false,
                   frequency:0
                },  
                })
               }
               setTimeout(function() {
                 wx.showToast({
                   title: '捐赠成功',
                   icon:"none"
                 })
                 that.setData({
                   number:[],
                   quantity:[],
                   sum:0
                 }) 
              }, 1000);
               that.setData({
                 checked:false
               })         
            }        
            }     
            })
        
      }
        }else{
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
      this.setData({
        number:app.gloabalData.queen
     })  
     this.setData({
      quantity:app.gloabalData.queen1
   })  
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var n=app.gloabalData.number
      var c=false
      var that=this
      for(var a=0;a<n.length;a++){
         c=false 
         for(var b=0;b<this.data.number.length;b++){
           if(this.data.number[b]==n[a]){
              this.setData({
                [`quantity[${b}]`]:this.data.quantity[b]+1
              }
                )
              c=true
           }
         }
         if(c==false){
          this.setData({
            number:this.data.number.concat(n[a])
          }) 
          this.setData({
            quantity:that.data.quantity.concat(1)
          }) 
         }
        
      }
      app.gloabalData.number=[]
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