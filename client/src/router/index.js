"use strict"
import Vue from 'vue';
import Router from 'vue-router';
import env from '@/config/env';
import routeConfig from '@/config/route';


// 添加默认路径
routeConfig.push({
  path: "*",
  redirect: {
    name: env.homePagePath
  }
});

Vue.use(Router);

export default new Router({
  routes: routeConfig
});
