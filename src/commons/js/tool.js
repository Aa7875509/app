import Vue from 'vue';
import $ from 'jquery';

/*dev ajax方式获取token*/

function enryptData(params) {

    // TODO：请改成您的app_key
    const OKAYAPI_APP_KEY = "2611A767FD539EF888C86E2059067872";
    // TODO：请改成您的app_secrect，请勿对外暴露！！
    const OKAYAPI_APP_SECRECT = "lDqrWkBV0evuFPB1tsVlYPIYPgRcxd6FpGEets7rFI9tM85UfVZLxJrMr6CKm7bdnp";

    params['app_key'] = OKAYAPI_APP_KEY;

    var sdic = Object.keys(params).sort();
    var paramsStrExceptSign  = "";
    for(var ki in sdic){                     
       paramsStrExceptSign  += params[sdic[ki]];
    }

    var sign = md5(paramsStrExceptSign + OKAYAPI_APP_SECRECT).toUpperCase();
    params['sign'] = sign;

    return params;
}
Vue.prototype.$api = function (options) {
    if(!window.navigator.onLine){
        this.$alert('您的网络已经断开', '提示', {
            confirmButtonText: '确定',
          });
          return
    }
    return $.ajax({
        url:options.url, //--dev-context--
        xhrFields: {
            withCredentials: true
        },
        traditional: true,
        //url: localStorage.getItem("url") + "/" + options.url,//--test-context--
        type: options.type,
        traditional: true,
        dataType: 'json',
        data: options.data,
        success: options.success,
        error: options.error,
      })
}
Vue.prototype.$wsk = function (options) {
    if(!window.navigator.onLine){
        this.$alert('您的网络已经断开', '提示', {
            confirmButtonText: '确定',
          });
          return
    }
           var v=this;
            var ws = new WebSocket(options.url);
            ws.addEventListener('open', function (event) {
            
                ws.send(JSON.stringify(options));
            });
            ws.onopen = function(evt){
            };
            ws.onmessage =options.success;
            ws.onclose = function(evt) {
            
            };
}
Vue.prototype.$ajax = function (params) {
    if(!window.navigator.onLine){
        this.$alert('您的网络已经断开', '提示', {
            confirmButtonText: '确定',
          });
          return
    }
 $.ajax({
     url: 'http://hn2.api.okayapi.com/',
     dataType: 'jsonp',
     jsonpCallback: params.data.callback,
     cache: true,
     data: enryptData(params.data)
 }).done(params.done);
 
 /**
  * TODO: 客户端的JS回调函数
  */
  
  function onCallback(r){
   
  }
};


