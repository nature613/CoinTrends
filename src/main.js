import Vue from 'vue';
import App from './App.vue';
import numeral from 'numeral';
import customNumeralLocale from '@/assets/js/customNumeralLocale.js';

numeral.register('locale', 'us-custom', customNumeralLocale);
numeral.locale('us-custom');
Vue.filter('numeralFormat', (value, format = '0,0') => numeral(value).format(format));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
