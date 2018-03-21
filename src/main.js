// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import store from '../src/store/store';

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import { faEnvelope, faHome, faGraduationCap, faList, faSpinner, faShoppingCart, faThList, faCreditCard, faSignOutAlt } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(
  faEnvelope, faHome, faGraduationCap, faList, faSpinner, faShoppingCart, faThList, faCreditCard, faSignOutAlt
)

Vue.component('icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
