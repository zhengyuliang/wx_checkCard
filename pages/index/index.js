//index.js
//获取应用实例
import { formatTime } from '../../utils/util';
import { json } from '../../utils/data';
const app = getApp()

Page({
  data: {
    recordList:[],
    fiveRecord: [], //5条显示最新的5条信息
    isGood:'', //查询到的内容
    maskType: "hide", //"show", "hide" show为显示，默认为hide mask层的显示及隐藏
    showType:"hide", //"show","hide" show为显示，默认为hide
    infoType: "hide", // "show","hide" show为显示，默认为hide 弹出窗口提示
    infoText:"优惠券不存在", //弹出窗提示内容
    isOK: false, //成功内容
    isCancel:false //取消按键
  },
 
  onLoad: function () {
    this.getStorageDataRecord();
  },

  /**
   * 存储内容等
   */
  getStorageDataRecord: function(e){
    var _this = this;
    wx.getStorage({
      key: 'record',
      success: function(res) {
        console.log("存储信息",res);
        if(res){
          let data = res.data;
         
          if(data.length < 5){
            _this.setData({
              fiveRecord: data
            })
          }else{
            debugger;
            _this.setData({
              fiveRecord: _this.fiveRecordData(data,5)
            })
          }
          _this.setData({
            recordList: data
          })
        }
      },
    })
  },
  fiveRecordData:function(e,num){
    let a = [];
    for(let i=0;i<mun;i++){
      a.push[e[i]];
    }
    return a;
  },

  /**
   * 扫码内容
   */
  getscanCodeData: function (e) {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log("扫到的码信息",res);
        let num = res.result;
        let list = json.filter(item => {
          return item.code === num;
        })
       
        if(list.length > 0){
          let searchList = that.data.recordList.some(item => {
            return item.code === list[0].code;
          });
          if (!searchList) {
            list[0]['time'] = formatTime(new Date());
            console.log("time>>>>>>", list[0]);
            that.setData({
              isGood: list[0],
              maskType: 'show',
              showType: 'show'
            });
          }else{
            that.setData({
              infoText: '优惠券己使用',
              maskType: 'show',
              infoType: 'show'
            })
          }
        }else{
          that.setData({
            infoText: '优惠券不存在',
            maskType: 'show',
            infoType: 'show'
          })
        }
      }
    })
  },
  /**
   * 存储内容记录
   */
  getStorageData: function(e){
    console.log("传入内容>>>>",e);
    var _this = this;
    wx.getStorage({
      key: 'record',
      success: function(res) {
        let data = res.data || [];
        data.unshift(e);
        wx.setStorage({
          key: 'record',
          data: data,
          success:function(msg){
            _this.getStorageDataRecord();
          }
        })
      },
      fail:function(err){
        let data = [];
        data.push(e);
        wx.setStorage({
          key: 'record',
          data: data,
          success: function (msg) {
            _this.getStorageDataRecord();
          }
        })
      }
    })
  },
  cancelShowType: function(e) {
    var _this = this;
    _this.setData({
      maskType: 'hide',
      showType: 'hide'
    });
  },
  okShowType: function(e){
    var that = this;
    that.setData({
      maskType:'hide',
      showType: 'hide'
    })
    wx.showToast({
      title: '核销成功',
      icon: 'success',
      duration: 2000
    })
    that.getStorageData(that.data.isGood);
  },
  cancelinfoType:function(e){
    var _this = this;
    _this.setData({
      maskType: 'hide',
      infoType: 'hide'
    });
  },
  okinfoType:function(e){
    var _this = this;
    _this.setData({
      showType: 'show',
      infoType: 'hide'
    });
  },
  getRecord:function(e){
    wx.navigateTo({
      url: '/pages/record/record'
    })
  },
  /**
   * 获取时间格式
   */
})
