// pages/detail/detail.js
var bmap = require('../../utils/bmap-wx.min.js');
var Bmob = require('../../utils/bmob.js'); 
var that = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    bannerImgs:[],
    payContent:[],
    length:6,
    display: 'none',
    mdz:'show',
    dz: 'none',
    radioCheckVal: '',
    secaddr: [],
    dzshow: '',
    addrshow: 'none',
    value: 1,
    payfor: '',
    redu:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.title)
    that =this;
     var Diary = Bmob.Object.extend("recommend");
     var query = new Bmob.Query(Diary);
     var id = options.title;
     wx.setStorageSync('good_id', id)
     query.get(options.title, {
       success: function (result) {
         var bannerImg1 = result.get("bannerImg1");
         var bannerImg2 = result.get("bannerImg2");
         var bannerImg3 = result.get("bannerImg3");

         that.setData({
           payContent:result,
           bannerImgs: [bannerImg1.url, bannerImg2.url, bannerImg3.url]
         })
       },
     });
     var Diary1 = Bmob.Object.extend("goods");
     var query = new Bmob.Query(Diary1);
     query.get(options.title, {
       success: function (result) {
         console.log(result)
         var bannerImg1 = result.get("bannerImg1");
         var bannerImg2 = result.get("bannerImg2");
         var bannerImg3 = result.get("bannerImg3");

         that.setData({
           payContent: result,
           bannerImgs: [bannerImg1.url, bannerImg2.url, bannerImg3.url]
         })
       },
     });

     var Diary2 = Bmob.Object.extend("wazi");
     var query = new Bmob.Query(Diary2);
     query.get(options.title, {
       success: function (result) {
         console.log(result)
         var bannerImg1 = result.get("bannerImg1");
         var bannerImg2 = result.get("bannerImg2");
         var bannerImg3 = result.get("bannerImg3");

         that.setData({
           payContent: result,
           bannerImgs: [bannerImg1.url, bannerImg2.url, bannerImg3.url]
         })
       },
     });

     var Diary3 = Bmob.Object.extend("xiezi");
     var query = new Bmob.Query(Diary3);
     query.get(options.title, {
       success: function (result) {
         console.log(result)
         var bannerImg1 = result.get("bannerImg1");
         var bannerImg2 = result.get("bannerImg2");
         var bannerImg3 = result.get("bannerImg3");

         that.setData({
           payContent: result,
           bannerImgs: [bannerImg1.url, bannerImg2.url, bannerImg3.url]
         })
       },
     });

     var Diary4 = Bmob.Object.extend("xiangbao");
     var query = new Bmob.Query(Diary4);
     query.get(options.title, {
       success: function (result) {
         console.log(result)
         var bannerImg1 = result.get("bannerImg1");
         var bannerImg2 = result.get("bannerImg2");
         var bannerImg3 = result.get("bannerImg3");

         that.setData({
           payContent: result,
           bannerImgs: [bannerImg1.url, bannerImg2.url, bannerImg3.url]
         })
       },
     });

     var Diary5 = Bmob.Object.extend("yifu");
     var query = new Bmob.Query(Diary5);
     query.get(options.title, {
       success: function (result) {
         console.log(result)
         var bannerImg1 = result.get("bannerImg1");
         var bannerImg2 = result.get("bannerImg2");
         var bannerImg3 = result.get("bannerImg3");

         that.setData({
           payContent: result,
           bannerImgs: [bannerImg1.url, bannerImg2.url, bannerImg3.url]
         })
       },
     });

     //查询点赞状态
     setInterval(function(){
       var Diary = Bmob.Object.extend("dianzan");
       var query = new Bmob.Query(Diary);
       var state1 = '';
       query.equalTo("good_id", id);
       // 查询所有数据
       query.find({
         success: function (results) {
           var redu = results.length;
           wx.setStorageSync('redu', redu);
           var currentUser = Bmob.User.current();
           var id = currentUser.id;
           // 循环处理查询到的数据
           for (var i = 0; i < results.length; i++) {
             var object = results[i];
             if (object.get('parsent_id') == id) {
               state1 = 'true'
             } else { state1 = 'false' }
           }
           if (state1 == 'true') {
             that.setData({
               dz: 'show',
               mdz: 'none',
             })
           }
         },
       });

       var Diary = Bmob.Object.extend("recommend");
       var query = new Bmob.Query(Diary);
       var redu = wx.getStorageSync('redu')
       query.get(id, {
         success: function (result) {
           result.set('redu', redu);
           result.save();
         },
       });

       var Diary1 = Bmob.Object.extend("goods");
       var query = new Bmob.Query(Diary1);
       query.get(id, {
         success: function (result) {
           result.set('redu', redu);
           result.save();
         },
       });

       var redu = wx.getStorageSync('redu');
       console.log(redu)
       that.setData({
         redu: redu
       })
     },1000)
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
    //选中地址后显示出来
    var secAddr = wx.getStorageSync('selectedaddr');
    var result = secAddr.split(',');
    var address = [];
    for (var i = 0; i < result.length; i++) {
      address[i] = result[i]
    }
    console.log(address)

    if (secAddr != '') {
      that.setData({
        secaddr: address,
        dzshow: 'none',
        addrshow: 'block',
      })
    }
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
  onShareAppMessage: function (res) {
    var id = wx.getStorageSync('good_id')
    return {
      title: '买袜子，就找我',
      path: '/pages/detail/detail?title=' + id,
    }
  },

  //点赞
  dianzan: function (e){
    var goodid = wx.getStorageSync('good_id');
    var currentUser = Bmob.User.current();
    console.log(currentUser)
    var id = currentUser.id;
    var state ='';

    var Dianzan = Bmob.Object.extend("dianzan");
    var query = new Bmob.Query(Dianzan);
    query.equalTo('good_id', goodid);
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        if(results.length == 0)
        {
          that.setData({ dz: 'show', mdz: 'none' });
          var Post = Bmob.Object.extend("_User");
          var Comment = Bmob.Object.extend("dianzan");
          var myComment = new Comment();
          var post = new Post();
          post.id = id;
          myComment.set("parsent", post);
          myComment.set("parsent_id", id);
          myComment.set('good_id', goodid);
          myComment.save();
        }
        else{
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            console.log(object.id + ' - ' + object.get('parsent_id'));
            if (object.get('parsent_id') == id) {
              state = 'true'
            } else { state = 'false' }
          }
          if(state =='true'){
            console.log('你已经点赞过了');
            that.setData({dz: 'show',mdz: 'none'});
          }else{
            that.setData({ dz: 'show',mdz:'none' });
            var Post = Bmob.Object.extend("_User");
            var Comment = Bmob.Object.extend("dianzan");
            var myComment = new Comment();
            var post = new Post();
            post.id = id;
            myComment.set("parsent", post);
            myComment.set("parsent_id", id);
            myComment.set('good_id', goodid);
            myComment.save();
          }
        }
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  //发送通知功能
  payout: function (e) {
    that = this;
    that.setData({
      radioCheckVal: '',
      payContent: '',
      display: "block",
    });

    var id = wx.getStorageSync('good_id');//使用event.currentTarget.dataset.XX获取内容  

    var Diary = Bmob.Object.extend("recommend");
    var query = new Bmob.Query(Diary);
    query.get(id, {
      success: function (result) {
        console.log(result)
        var price = result.get("price")
        wx.setStorageSync('type', result)
        that.setData({
          payContent: result,
          payfor: price
        })
      },
    });
    var Diary = Bmob.Object.extend("goods");
    var query = new Bmob.Query(Diary);
    query.get(id, {
      success: function (result) {
        console.log(result)
        var price = result.get("price")
        wx.setStorageSync('type', result)
        that.setData({
          payContent: result,
          payfor: price
        })
      },
    });

    var Diary1 = Bmob.Object.extend("wazi");
    var query = new Bmob.Query(Diary1);
    query.get(id, {
      success: function (result) {
        console.log(result)
        var price = result.get("price")
        wx.setStorageSync('type', result)
        that.setData({
          payContent: result,
          payfor: price
        })
      },
    });

    var Diary2 = Bmob.Object.extend("xiezi");
    var query = new Bmob.Query(Diary2);
    query.get(id, {
      success: function (result) {
        console.log(result)
        var price = result.get("price")
        wx.setStorageSync('type', result)
        that.setData({
          payContent: result,
          payfor: price
        })
      },
    });

    var Diary3 = Bmob.Object.extend("xiangbao");
    var query = new Bmob.Query(Diary3);
    query.get(id, {
      success: function (result) {
        console.log(result)
        var price = result.get("price")
        wx.setStorageSync('type', result)
        that.setData({
          payContent: result,
          payfor: price
        })
      },
    });

    var Diary4 = Bmob.Object.extend("yifu");
    var query = new Bmob.Query(Diary4);
    query.get(id, {
      success: function (result) {
        console.log(result)
        var price = result.get("price")
        wx.setStorageSync('type', result)
        that.setData({
          payContent: result,
          payfor: price
        })
      },
    });
  },

  //选好了
  formSubmit: function (e) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var time = (Y + '-' + M + '-' + D + ' ' + h + ":" + m + ":" + s);

    var value = e.detail.value;
    var good_detail = wx.getStorageSync('type');
    var type1 = good_detail.type;
    console.log(type1)
    var yanse = value.yanse;
    var xm = value.xm;
    var dh = value.dh;
    var address = value.address;
    var number1 = value.number;
    var payfor = value.payfor;
    var currentUser = Bmob.User.current();
    var sessiontoken = currentUser._sessionToken;

    if (yanse == '' || xm == '' || dh == '' || address == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择正确的信息',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    else {
      var openid = wx.getStorageSync('openid')
      var temp = {
        "touser": "oUxY3w-fAaosEuc21uGeAJX66Nfs",
        "template_id": "K9-6_Ayj4MLC2yvwY60-cq18tngJHAlqDfsOvv3D7a8",
        "url": "https://www.bmob.cn/",
        "data": {
          "first": {
            "value": "您好，有人下单了！",
          },
          "tradeDateTime": {
            "value": time
          },
          "orderType": {
            "value": type1 + '  ' + '颜色：' + yanse + ' ' + number1 + '双'
          },
          "customerInfo": {
            "value": xm+'  '+dh
          },
          "orderItemName": {
            "value": '地址'
          },
          "orderItemData": {
            "value": address
          },
          "remark": {
            "value": '应付金额：' + '                              ' + payfor,
            "color": "#cc3333"
          }
        }
      }
      console.log(temp);
      Bmob.sendMasterMessage(temp).then(function (obj) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        })
      },
        this.setData({
          display: "none"
        }),
        function (err) {
          console.log(err)
        });
    }
  },

  //加1减1
  add: function (e) {
    var good_detail = wx.getStorageSync('type');
    var price = good_detail.price;
    this.setData({
      value: this.data.value + 1,
      payfor: (this.data.value + 1) * price
    })
  },

  reduce: function () {
    var good_detail = wx.getStorageSync('type');
    var price = good_detail.price;
    if (this.data.value >= 2) {
      this.setData({
        value: this.data.value - 1,
        payfor: (this.data.value - 1) * price
      })
    }
  },

  //mask隐藏或消失
  hideview: function () {
    this.setData({
      display: "none"
    })
  },

  //选取袜子颜色功能
  radioChange: function (e) {
    var radioCheckVal = e.detail.value
    this.setData({
      radioCheckVal: radioCheckVal
    })
  }
})