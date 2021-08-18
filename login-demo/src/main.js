import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import MyLogin from './index'

Vue.use(MyLogin);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
})
