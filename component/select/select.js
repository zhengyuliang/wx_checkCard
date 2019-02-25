
Component({
    properties: {
      // 这里定义了innerText属性，属性值可以在组件使用时指定
      propArray: {
        type: Array,
      },
      innerText: {
        type: String,
        value: 'default value',
      },
      countTime: {
        type: String,
        value: '统计时间'
      }
    },
    data: {
      // 这里是一些组件内部数据
      selectShow: false,//初始option不显示
      nowText: "请选择",//初始内容
      animationData: {}//右边箭头的动画
    },
    methods: {
      // 这里是一个自定义方法
      selectToggle: function () {
        var nowShow = this.data.selectShow;//获取当前option显示的状态
        //创建动画
        var animation = wx.createAnimation({
          timingFunction: "ease"
        })
        this.animation = animation;
        if (nowShow) {
          animation.rotate(0).step();
          this.setData({
            animationData: animation.export()
          })
        } else {
          animation.rotate(180).step();
          this.setData({
            animationData: animation.export()
          })
        }
        this.setData({
          selectShow: !nowShow
        })
      },
      //设置内容
      setText: function (e) {
        var nowData = this.properties.propArray;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
        var nowIdx = e.target.dataset.index;//当前点击的索引
        var nowText = nowData[nowIdx].text;//当前点击的内容
        //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
        this.animation.rotate(0).step();
        this.setData({
          selectShow: false,
          nowText: nowText,
          animationData: this.animation.export()
        })
        // 触发子组件的事件
        var nowDate = {
          id: nowIdx,
          text: nowText
        }
        // myget是子定义的事件的名称，now是往父组件传递的值
        this.triggerEvent('myget', nowDate)
      }
    }
})