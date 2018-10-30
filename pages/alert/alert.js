// pages/alert/alert.js
Component({
  properties:{
    alertArr:{
      type:Array
    }
  },
  data: {
    flag: false
  },
  pageLifetimes: {
  },
  methods: {
    sureorcancel () {
      this.triggerEvent('cancelInfo')
    }
  }
})