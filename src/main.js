import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/src/index.scss';
import titleMixin from './titleMixin';

Vue.mixin(titleMixin);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
