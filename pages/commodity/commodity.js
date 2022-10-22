// pages/commodity/commodity.js
const db=wx.cloud.database()
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        photos:null,
        array1:[],
        q:[],
        number:[],
        d:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    //拿走物品后给捐赠的用户加积分
   click1:function(options){
       if(app.gloabalData.status){
         db.collection('interact').where({
           user2:app.gloabalData.phone,
           away:false 
         }).get().then(res=>{
           console.log(res.data)
           var q=res.data[0].user1
           var s=res.data[0].sum
           db.collection('monad').where({
            user:q,
            take:false
           }).get().then(res=>{ 
             this.setData({
               d:1-(res.data[0].frequency/5)
             })
             console.log(this.data.d)
           })
            //加分
           db.collection('type').where({
             name:res.data[0].name
           }).get().then(res=>{
             db.collection('point').where({
               user:q
             }).update({
               data:{
                fraction:db.command.inc((res.data[0].quantity)*s*(this.data.d))
               }
             })
           })
         })
         db.collection('interact').where({
          user2:app.gloabalData.phone,
          away:false
        }).update({
          data:{
            away:true
          }
        })
        db.collection('stay').where({
          user:app.gloabalData.phone,
          away:false,
        }).update({
          data:{
            away:true
          }
        })
       db.collection('monad').where({
         sum:0
       }).update({
         data:{
           take:true
         }
       })
         wx.showToast({
          title: '取货成功',
          icon:"none"
        })
        setTimeout(function() {
          wx.switchTab({
              url: '../../pages/my/my',
            })
       }, 1000);
       }else{
         wx.showToast({
           title: '请先出示个人二维码',
           icon:"none"
         })
       }

   },
   //查看物品处理的进度
   click2:function(options){
    wx.navigateTo({
      url: '../../pages/state2/state2?id='+options.currentTarget.dataset.name2
    })
},
//用户打分后可在原有基础积分上给捐赠用户额外加分，也可取消捐赠商品，商品取消次数超过五次则需要管理员处理
click3:function(options){
  wx.navigateTo({
    url: '../../pages/fen/fen?id='+options.currentTarget.dataset.name3
  })
},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        db.collection("type").get().then(res=>{
            this.setData({
              array1:res.data
            })        
         })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        db.collection("stay").where({
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