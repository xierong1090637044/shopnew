var app = getApp()
var bmap = require('../../utils/bmap-wx.min.js'); 
var Bmob = require('../../utils/bmob.js'); 
Page({
  data: {
    userInfo: {},
    weatherData: '' ,
    display:'none',
  },
  onLoad: function () {
    var that = this
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'jyr2sMczbQ4wFZVRfWjBv68EHkqpfAnE'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      weatherData = '城市：' + weatherData.currentCity + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData,
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    }); 
    
    //调用应用实例的方法获取全局数据
   /* app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
      })
    });    */

    setInterval(function(){
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                  wx.setStorageSync('userdata', res.userInfo);
                  that.setData({
                    userInfo: res.userInfo,
                  })
              }
            })
          }
        }
      })
      setTimeout(function(){
        var userdata = wx.getStorageSync('userdata');
        if (userdata == '') {
          that.setData({
            display: 'block'
          })
        }
        else {
          that.setData({
            display: 'none'
          })
        }
      },500)
    },500)
  },

// Do something when show.
  onShow: function (options) {
    //查询lover表和_User表,进行对比
    setTimeout(function () {
      var currentUser = Bmob.User.current();
      var id = currentUser.id;
      var Diary = Bmob.Object.extend("User_infor");
      var query = new Bmob.Query(Diary);
      query.equalTo("parsent_id", id);
      // 查询所有数据
      query.find({
        success: function (results) {
          console.log("共查询到 " + results.length + " 条记录");
          if (results.length == 0) {
            var userdata = wx.getStorageSync('userdata');
            var nickname = userdata.nickName;
            console.log(userdata)
            var Post = Bmob.Object.extend("_User");
            var Comment = Bmob.Object.extend("User_infor");
            var myComment = new Comment();
            var post = new Post();
            post.id = id;
            myComment.set("parsent", post);
            myComment.set("parsent_id", id);
            myComment.set('nickname', nickname);
            myComment.save();
          }
          else {
            return
          }
        },
      });
    }, 5000)
  },

  contact_us:function()
  {
    wx.navigateTo({
      url: '../../pages/contact_us/contact_us',
    })
  },

  about_us:function()
  {
    wx.navigateTo({
      url: '../../pages/about_us/about_us',
    })
  },

  refuse:function()
  {
    wx.setStorageSync('userdata', 'none')
    this.setData({
      display:'none'
    })
  }

})
