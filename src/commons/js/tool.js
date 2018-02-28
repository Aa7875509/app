import Vue from 'vue'


import $ from 'jquery';
 var devUrl = 'http://app.wapvi.cn/'; //内侧地址
//  var devUrl = 'https://app-gao.yorktom123.com/'; //高总轻松还
//  var devUrl = 'https://app.yorktom123.com/'; //他她地址
//  var devUrl = 'https://app-he.yorktom123.com/'; //何总卡任还



//测试代码，先写死一部手机的UUID,调试时跳过登录
// var data = {
//   deviceUUID: ''
// }
// data.deviceUUID = '40c4366c017d0ea4501d1a767980b6076d7a3521'
// console.log(data.deviceUUID)
// $.ajax({
//   type: "post",
//   url: devUrl + "openapi/v1/loading",
//   async: true,
//   data: data,
//   success: function (res) {
//     console.log(res.code)
//     console.log(JSON.stringify(res))
//     if (res.code == '0000') {
//       localStorage.setItem('token', res.token)
//       localStorage.setItem('openId', res.openId)
//     }
//   }
// });

Vue.prototype.$ajax = function (options) {
  var dt = Object.assign({}, options.data, {
    'token': localStorage.getItem("token"),
    'openId': localStorage.getItem("openId"),
  });


  return $.ajax({
    url: devUrl + options.url, //--dev-context--
    //url: localStorage.getItem("url") + "/" + options.url,//--test-context--
    type: 'POST',
    traditional: true,
    dataType: 'json',
    data: dt,
    success: options.success,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
    },
  })
};



