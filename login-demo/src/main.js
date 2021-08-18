import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import login from './index'

Vue.use(login);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
})
