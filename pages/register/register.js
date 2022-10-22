// pages/register/register.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user:null,
        password:null,
        password2:null,
        nam :null,
        sex:null,
        phone:null,
        box:null,
        studentID:null,
        class:null,
        school:null,
        message:null,
        message2:null,
        message3:null,
        message4:null,
        message5:null,
    },
    onchange1:function(e){
         this.setData({user:e.detail})
    },
    onchange2:function(e){
      if(e.detail.length>=6){
      this.setData({password:e.detail})
      this.setData({message:null})
    }
      else{
       this.setData({message:"请输入6位以上的密码"})
      }
   },
   onchange3:function(e){
    if(e.detail.length>=6){
      this.setData({password2:e.detail})
      this.setData({message2:null})
    }
      else{
       this.setData({message2:"请输入6位及以上的密码"})
      }
   },
   onchange4:function(e){
    this.setData({nam:e.detail})
   }, 
   onchange5:function(e){
    var re=/^([男|女])$/
    if(re.test(e.detail)){
      this.setData({sex:e.detail})
      this.setData({message3:null})
    }
      else{
       this.setData({message3:"只能输入男或女"})
      }
   },
   onchange6:function(e){
    var reg= /^(1[3|4|5|6|7|8|9])\d{9}$/;
    if((reg.test(e.detail))&&(e.detail.length == 11)){
      this.setData({phone:e.detail})
      this.setData({message4:null})
    }
      else{
       this.setData({message4:"手机号错误"})
      }
 }, 
 onchange7:function(e){
  if((/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(e.detail))){
    this.setData({box:e.detail})
    this.setData({message5:null})
  }
    else{
     this.setData({message5:"邮箱错误"})
    }
 }, 
 onchange8:function(e){
  this.setData({studentID:e.detail})
},
onchange9:function(e){
  this.setData({class:e.detail})
},
onchange10:function(e){
  this.setData({school:e.detail})
},
 click:function(){
   wx.navigateTo({
     url: '../../pages/login/login',
   })
 },
 adduser:function(e){
   wx.cloud.callFunction({
     name:'getuseid',   
     complete:res=>{
    db.collection("yonghu").where({
      user:this.data.phone
    }).get( ).then(res=>{
      if(res.data.length==0){ 
        if(this.data.password==this.data.password2){
           db.collection("yonghu").add({
               data:{
                user:this.data.user,
                password:this.data.password,
                name:this.data.nam,
                sex:this.data.sex,
                phone:this.data.phone,
                box:this.data.box,
                studenID:this.data.studentID,
                class:this.data.class,
                school:this.data.school
               },
           })
           db.collection('point').add({
             data:{
               user:this.data.phone,
               fraction:0
             }
           })
           wx.showToast({
             title: '注册成功',
             icon:"none",
           })
           db.collection("user").add({
             data:{
                name:this.data.phone,
                password:this.data.password2,
                yonghu:this.data.nam,
             },
           })
           setTimeout(function(){
            wx.navigateBack({
              delta: 1,
           })
           }, 1000)
        }else{
          console.log(res.result.openid)
            wx.showToast({
              title: '两次密码输入不同',
              icon:"none",
            })
        }
      } 
      else{
        wx.showToast({
          title: '已存在该用户请检查输入的信息',
          icon:"none",
        })
      }
    }
    )
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