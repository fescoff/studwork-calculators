import Vue from 'vue';
import './style/global.styl';
import './components/global';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
