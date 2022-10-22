// pages/integral/integral.js
const db=wx.cloud.database();
var app=getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
       fraction:0,
       array:[],
       a:0,
       fen:0
    },
    take:function(event){
        //手机1500积分、手表1000积分、耳机800积分、平板1200积分
        db.collection('type').where({
            number:event.currentTarget.dataset.name
        }).get().then(res=>{
            this.setData({
                fen:res.data[0].quantity+500
            })
            if(this.data.fraction<(res.data[0].quantity+500)) {
                wx.showToast({
                  title: '积分不够',
                  icon:"none"
                }) 
            } else{
                db.collection('monad').where({
                    name:res.data[0].name,
                    state:true
                }).get().then(res=>{
                    if(res.data.length==0){
                        wx.showToast({
                            title: '无货',
                            icon:"none"
                          })
                    }
                    for(let a=0;a<res.data.length;a++){
                        if(res.data[a].sum==0){
                            if(a==(res.data.length-1)){
                                wx.showToast({
                                    title: '无货',
                                    icon:"none"
                                  })
                            }
                        }else{
                            var time = util.formatTime(new Date());
                            db.collection('stay').add({
                                data:{
                                    user:app.gloabalData.phone,
                                    name: res.data[0].name,
                                    quantuty:1,
                                    time:time,
                                    status:true,
                                    away:false
                                }
                            })
                            db.collection('monad').where({
                                user:res.data[a].user,
                                name:res.data[a].name,
                                time:res.data[a].time
                            }).update({
                                data:{
                                    sum:db.command.inc(-1)
                                }
                            })
                            db.collection('point').where({
                                user:app.gloabalData.phone
                            }).update({
                                data:{
                                fraction:db.command.inc(-this.data.fen)
                                }
                            })
                            db.collection('interact').add({
                                data:{
                                    user1:res.data[a].user,
                                    user2:app.gloabalData.phone,
                                    name:res.data[a].name,
                                    sum:1,
                                    away:false,
                                    point:0
                                }
                            })
                            wx.showToast({
                                title: '兑换成功',
                                icon:"none"
                              })
                              setTimeout(function() {
                                wx.switchTab({
                                  url: '../../pages/my/my',
                                })
                             }, 1000);
                              break;                         
                        }
                    }
                })

            }
        })
    },
    //兑换学时
    click1:function(){
        //换学时减少积分
        if(this.data.fraction>0){
         db.collection('point').where({
           user:app.gloabalData.phone
         }).update({
             data:{
                hours:db.command.inc(1),
                fraction:db.command.inc(-20)
             }
         })
        }else{
            wx.showToast({
              title: '积分不够',
              icon:"none"
            })
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
        db.collection("point").where({
            user:app.gloabalData.phone
        }).get().then(res=>{
            this.setData({
                fraction:res.data[0].fraction,
                a:res.data[0].hours
            })
        }) 
    },
    click:function(){
         wx.navigateTo({
           url: '../../pages/poor/poor',
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