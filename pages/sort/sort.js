// pages/sort/sort.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      zuo:0,
        mainActiveIndex: 0,
        activeId: null,
        items:[
          {
            // 导航名称
            text: '女装',         
          // 是否在导航名称右上角显示小红点，
            dot: false,
            // 禁用选项
            disabled: false,
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '长裙',
                // id，作为匹配选中状态的标识
                id: 1,              
              },
              {
                text: '女士牛仔裤',
                id: 2,
              },
              {
                text: '女士休闲裤',
                id: 3,
              },
              {
                text: '女士衬衫',
                id: 4,
              },
              {
                text: '女士毛衣',
                id: 5,
              },
              {
                text: '女士外套',
                id: 6,
              },
              {
                text: '女士T恤',
                id: 7,
              },
            ],
          },
          {
            // 导航名称
            text: '男装',
            // 是否在导航名称右上角显示小红点，
            dot: false,
            // 禁用选项
            disabled: false,
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '男士卫衣',
                // id，作为匹配选中状态的标识
                id: 8,
                // 禁用选项
                disabled: false,
              },
              {
                text: '风衣',
                id: 9,
              },
              {
                text: '牛仔裤',
                id: 10,
              },
              {
                text: '休闲裤',
                id: 11,
              },
              {
                text: '长袖T恤',
                id: 12,
              },
              {
                text: '长裤',
                id: 13,
              },
              {
                text: '薄羽绒',
                id: 14,
              },
              {
                text: '短袖',
                id: 15,
              },
            ],
          },        
          {
            // 导航名称
            text: '背包',
            // 导航名称右上角徽标，
            // 是否在导航名称右上角显示小红点，
            dot: false,
            // 禁用选项
            disabled: false,
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '手提包',
                // id，作为匹配选中状态的标识
                id: 16,
                // 禁用选项
                disabled: false,
              },
              {
                text: '单肩包',
                id: 17,
              },
              {
                text: '斜挎包',
                id: 18,
              },
              {
                text: '手拿包',
                id: 19,
              },
            ],
          },
          {
            // 导航名称
            text: '帽子',         
          // 是否在导航名称右上角显示小红点，
            dot: false,
            // 禁用选项
            disabled: false,
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '棒球帽',
                // id，作为匹配选中状态的标识
                id: 20,              
              },
              {
                text: '鸭舌帽',
                id: 21,
              },
              {
                text: '遮阳帽',
                id: 22,
              },
              {
                text: '平顶帽',
                id: 23,
              },
            ],
          },
          {
            // 导航名称
            text: '鞋子',         
          // 是否在导航名称右上角显示小红点，
            dot: false,
            // 禁用选项
            disabled: false,
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '运动鞋',
                // id，作为匹配选中状态的标识
                id: 24,              
              },
              {
                text: '男鞋',
                id: 25,
              },
              {
                text: '女鞋',
                id: 26,
              },
              {
                text: '单鞋',
                id: 27,
              },
            ],
          },
          {
            // 导航名称
            text: '电子产品',         
          // 是否在导航名称右上角显示小红点，
            dot: false,
            // 禁用选项
            disabled: false,
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '手机',
                // id，作为匹配选中状态的标识
                id: 28,              
              },
              {
                text: '电子手表',
                id: 29,
              }, 
              {
                text: '耳机',
                id: 30,
              },
              {
                text: '平板',
                id: 31,
              },
            ],
          },
          {
            // 导航名称
            text: '书籍',         
          // 是否在导航名称右上角显示小红点，
            dot: false,
            // 禁用选项
            disabled: false,
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '心理学',
                // id，作为匹配选中状态的标识
                id: 32,              
              },
              {
                text: '青春小说',
                id: 33,
              },
              {
                text: '励志',
                id: 34,
              },
              {
                text: '数学',
                id: 35,
              },
              {
                text: '专业课',
                id: 36,
              },
              {
                text: '英语',
                id: 37,
              },
              {
                text: '政治',
                id: 38,
              },
            ],
          },
          
        ]

      },
    
      onClickNav({ detail = {} }) {
        this.setData({
          mainActiveIndex: detail.index || 0,
        });
        this.setData({
        zuo:detail.index
        })
      },
      onClickItem({ detail = {} }) {
        var cid =detail.id
        const activeId = this.data.activeId === detail.id ? null : detail.id;
        this.setData({ activeId });
        wx.navigateTo({
          url: '/pages/goods/goods?cid='+cid
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