// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './commons/js/tool'
import Mint from 'mint-ui';
Vue.use(Mint);


Vue.config.productionTip = false




//手机端代码

// if (window.plus) {
// 	plusReady();
// } else {
//   	document.addEventListener('plusready', plusReady, false);
// }

// function plusReady() {
//   new Vue({
//     el: '#app',
//     router,
//     template: '<App/>',
//     components: { App }
//   })
// }



//浏览器调试

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
