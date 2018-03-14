// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.console = window.console || function () {
  };
import Vue from 'vue';
import App from './App';
import router from './router';
import 'babel-polyfill';

import 'es6-promise/auto';
import VueResouse from 'vue-resource';

import store from './vuex/store';
import env from './config/env';
import request from '@/util/request';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: {App}
});
