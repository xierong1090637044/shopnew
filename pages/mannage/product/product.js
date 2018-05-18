// pages/all_goods/all_goods.js
var Bmob = require('../../../utils/bmob.js');
Page({

  data: {
    array: ['袜子', '鞋子', '箱包', '衣服'],
    wazi: '',
    leftstyle: '',
    input: '',
    display: 'block',
    img_display: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var item = this.data.array
    that.setData({
      leftstyle: item[0]
    })

    var Wazi = Bmob.Object.extend("wazi");
    var query = new Bmob.Query(Wazi);
    query.find({
      success: function (results) {
        console.log(results)
        wx.setStorageSync('wazi-length', results.length)
        that.setData({
          wazi: results
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

  getGoods: function (e) {
    var that = this;
    var item = this.data.array
    console.log(e.currentTarget.dataset.type)
    that.setData({
      leftstyle: e.currentTarget.dataset.type
    });

    switch (e.currentTarget.dataset.type) {
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
  },

  set_rec:function(e){
    var that = this;
    var id = e.currentTarget.dataset.object
    switch (that.data.leftstyle){
      case '袜子':
        var Diary = Bmob.Object.extend("wazi");
        var query = new Bmob.Query(Diary);
        query.equalTo("objectId", id);
        query.find({
          success: function (results) {
            var object = results[0];
            console.log(object.get('price'));
            var array = object.get('yangshi');
            var Diary = Bmob.Object.extend("recommend");
            var diary = new Diary();
            diary.set("type", object.get('type'));
            diary.set("redu", object.get('redu'));
            diary.set("price", object.get('price'));
            diary.set("images", object.get('images').url);
            diary.set("bannerImg1", object.get('bannerImg1').url);
            diary.set("bannerImg2", object.get('bannerImg2').url);
            diary.set("bannerImg3", object.get('bannerImg3').url);
            diary.set("yangshi", array);
            diary.save()
          },
        });
        break;
      case '鞋子':
        break;
      case '箱包':
        var Post = Bmob.Object.extend("xiangbao");
        var Comment = Bmob.Object.extend("recommend");
        var myComment = new Comment();
        var post = new Post();
        post.id = e.currentTarget.dataset.object;
        myComment.set("parsent2", post);
        myComment.save();
        break;
      case '衣服':
        var Post = Bmob.Object.extend("yifu");
        var Comment = Bmob.Object.extend("recommend");
        var myComment = new Comment();
        var post = new Post();
        post.id = e.currentTarget.dataset.object;
        myComment.set("parsent3", post);
        myComment.save();
        break;
    }
  }

})