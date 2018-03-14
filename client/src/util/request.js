import Vue from 'vue';
import VueResouse from 'vue-resource';
import { Promise } from 'es6-promise';
import env from '@/config/env';
import string from '@/util/string';
import common from "@/util/common";
Vue.use(VueResouse);
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;

// 扩展交互请求
// option.url:请求的地址
// option.params:上送的参数
// option.success:成功回调
// option.error:失败回调
Vue.prototype.$sendRequest = (option) => {
  let method = option["method"] || "get";
  option.params = option.params || {};
  let searchParam = common.parseParam();
  for (let key in searchParam) {
    if (!key) {
      continue;
    }
    option.params[key] = searchParam[key];
  }

  let cookies = common.getAllCookie();
  for (let key in cookies) {
    if (!key) {
      continue;
    }
    option.params[key] = cookies[key];
  }
  let params = method != "post" ? {params: option.params} : option.params;
  if (method == "jsonp") {
    params["jsonp"] = option["callback"] || "callback";
    params["jsonpCallback"] = option["callback"] || "callback";
  }
  return new Promise((resolve, reject)=> {
    Vue.http[method](option.url, params).then(function (data) {
      console.log(data);
      resolve(data.body);
    }, function (err) {
      console.log(err);
      reject(err);
    }).catch(function (err) {
      console.log(err);
      reject(err);
    });
  });
};
Vue.config.productionTip = false;

export default {};
