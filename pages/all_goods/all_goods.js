// pages/all_goods/all_goods.js
var Bmob = require('../../utils/bmob.js');
Page({

  data: {
    array:['袜子','鞋子','箱包','衣服'],
    wazi:'',
    leftstyle:'',
    input:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
   var item = this.data.array
   that.setData({
     leftstyle:item[0]
   })

   var Wazi = Bmob.Object.extend("wazi");
   var query = new Bmob.Query(Wazi);
   query.find({
     success: function (results) {
       console.log(results)
       that.setData({
         wazi:results
       })
     },
     error: function (error) {
       console.log("查询失败: " + error.code + " " + error.message);
     }
   });

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


  //搜索功能
  input:function(e)
  {
    var that = this;
    that.setData({
      input: e.detail.value
    })
  },
  suosou:function(e)
  {
    var that = this;
    console.log(that.data.input)
    var inputdata = that.data.input

    var Diary = Bmob.Object.extend("wazi");
    var query = new Bmob.Query(Diary);
    query.equalTo("type", { "$regex": "" + inputdata + ".*" });
    // 查询所有数据
    query.find({
      success: function (results) {
        that.setData({
          wazi: results
        })
      },
    });

    var Diary1 = Bmob.Object.extend("xiezi");
    var query = new Bmob.Query(Diary1);
    query.equalTo("type", { "$regex": "" + inputdata + ".*" });
    // 查询所有数据
    query.find({
      success: function (results) {
        var arr = []
        for (var i = 0; i < that.data.wazi.length;i++)
        {
          arr[i] = that.data.wazi[i]
          if (i == (that.data.wazi.length-1) )
          {
            for (var x = (that.data.wazi.length); x < (results.length + that.data.wazi.length); x++)
            {
              var y =  x - (that.data.wazi.length)
              arr[x] = results[y]
            }
          }
        }
        that.setData({
          wazi:arr
        })
      },
    });

    var Diary2 = Bmob.Object.extend("xiangbao");
    var query = new Bmob.Query(Diary2);
    query.equalTo("type", { "$regex": "" + inputdata + ".*" });
    // 查询所有数据
    query.find({
      success: function (results) {
        var arr = []
        for (var i = 0; i < that.data.wazi.length; i++) {
          arr[i] = that.data.wazi[i]
          if (i == (that.data.wazi.length - 1)) {
            for (var x = (that.data.wazi.length); x < (results.length + that.data.wazi.length); x++) {
              var y = x - (that.data.wazi.length)
              arr[x] = results[y]
            }
          }
        }
        that.setData({
          wazi: arr
        })
      },
    });

    var Diary3 = Bmob.Object.extend("yifu");
    var query = new Bmob.Query(Diary3);
    query.equalTo("type", { "$regex": "" + inputdata + ".*" });
    // 查询所有数据
    query.find({
      success: function (results) {
        var arr = []
        for (var i = 0; i < that.data.wazi.length; i++) {
          arr[i] = that.data.wazi[i]
          if (i == (that.data.wazi.length - 1)) {
            for (var x = (that.data.wazi.length); x < (results.length + that.data.wazi.length); x++) {
              var y = x - (that.data.wazi.length)
              arr[x] = results[y]
            }
          }
        }
        that.setData({
          wazi: arr
        })
      },
    });
  },

  getGoods: function(e)
  {
    var that = this;
    var item = this.data.array
    console.log(e.currentTarget.dataset.type)
    that.setData({
      leftstyle: e.currentTarget.dataset.type
    });

    switch (e.currentTarget.dataset.type){
    case item[0]:
        var Wazi = Bmob.Object.extend("wazi");
        var query = new Bmob.Query(Wazi);
        query.find({
          success: function (results) {
            console.log(results)
            that.setData({
              wazi: results
            })
          },
          error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });
        break;
    case item[1]:
        var Wazi = Bmob.Object.extend("xiezi");
        var query = new Bmob.Query(Wazi);
        query.find({
          success: function (results) {
            console.log(results)
            that.setData({
              wazi: results
            })
          },
          error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });
        break;
    case item[2]:
        var Wazi = Bmob.Object.extend("xiangbao");
        var query = new Bmob.Query(Wazi);
        query.find({
          success: function (results) {
            console.log(results)
            that.setData({
              wazi: results
            })
          },
          error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });
      break;
    case item[3]:
        var Wazi = Bmob.Object.extend("yifu");
        var query = new Bmob.Query(Wazi);
        query.find({
          success: function (results) {
            console.log(results)
            that.setData({
              wazi: results
            })
          },
          error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });
      break;
    }
  }

})