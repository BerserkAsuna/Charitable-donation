// pages/fen/fen.js
const db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: 0,
        gradientColor: {
          '0%': '#ffd01e',
          '100%': '#ee0a24',
        },
        array:[],
        _id:null,
      },
     increase:function(){
         if(this.data.value<100){
            this.setData({
                value:this.data.value+10
            })         
         }  
     },
    reduce:function(){
        if(this.data.value>0){
            this.setData({
                value:this.data.value-10
            })
         }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            _id:options.id
        })
      db.collection('stay').where({
          _id:options.id
      }).get().then(res=>{
         
              this.setData({
                  array:res.data
              })
          
      })
    },
    //额外评分
    submit:function(){
              if(this.data.value!=0){
                db.collection('interact').where({
                    user2:this.data.array[0].user,
                    sum:this.data.array[0].quantuty,
                    name:this.data.array[0].name
                }).update({
                    data:{
                     point:(this.data.value/100)*5
                    }
                })
                db.collection('interact').where({
                   user2:this.data.array[0].user,
                   sum:this.data.array[0].quantuty,
                   name:this.data.array[0].name
               }).get().then(res=>{
                  db.collection('point').where({
                      user:res.data[0].user1
                  }).update({
                      data:{
                          fraction:db.command.inc((this.data.value/100)*5)
                      }
                  })
               })
               wx.showToast({
                 title: '评分成功',
                 icon:"none"
               })
            }else{
                wx.showToast({
                  title: '请先打分',
                  icon:"none"
                })
            }
            wx.showToast({
              title: '打分成功',
              icon:"no ne"
            })
            setTimeout(function() {
                wx.switchTab({
                  url: '../../pages/my/my',
                })
             }, 1000);
    },
    angry:function(){
        db.collection('interact').where({
            user2:this.data.array[0].user,
            sum:this.data.array[0].quantuty,
            name:this.data.array[0].name
        }).get().then(res=>{
            var a=this.data.array[0].quantuty
            db.collection('monad').where({
                user:res.data[0].user1,
                name:res.data[0].nanme,
                take:false
            }).update({
                data:{
                    sum:db.command.inc(a),
                    fequency:db.command.inc(1)
                }
            })
        })
        db.collection('interact').where({
            user2:this.data.array[0].user,
            sum:this.data.array[0].quantuty,
            name:this.data.array[0].name
        }).remove()
        db.collection('stay').where({
            _id:options.id
        }).remove()  
        wx.showToast({
            title: '退货成功',
            icon:"none"
          })
        setTimeout(function() {
            wx.switchTab({
              url: '../../pages/my/my',
            })
         }, 1000);
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