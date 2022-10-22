// app.js
App({
  onLaunch() {
   //云开发环境初始化 
    wx.cloud.init({
      env:"cloud1-9gxzbwd3f4a93650"
    }

    )
     
  },
  //phone存登录用户的电话号，number存商品界面点击加入捐赠车的物品,queen存购物车内物品,queen1存物品初始数值
  gloabalData:{
    phone:"13812344321",
    number:[], 
    queen:[],
    queen1:[],
    //用户个人二维码状态
    status:false
  }
})
