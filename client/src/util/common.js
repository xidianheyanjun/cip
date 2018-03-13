/**
 * Created by Administrator on 2017/3/24.
 */
import $cookie from './cookie';

import string from './string';

// 判断客户端是否登陆
let isLogin = () => {
  $cookie.cookie.raw = true;
  let flag = $cookie.cookie("vvc_status") == 1 || $cookie.cookie("status") == 1;
  $cookie.cookie.raw = false;
  return flag;
};

// 根据名称获取cookie
let getCookie = (name)=> {
  $cookie.cookie.raw = true;
  let val = $cookie.cookie(name);
  $cookie.cookie.raw = false;
  return val;
};

// 获取所有cookie
let getAllCookie = () => {
  $cookie.cookie.raw = true;
  let cookies = $cookie.cookie();
  $cookie.cookie.raw = false;
  let obj = {};
  for (let name in cookies) {
    obj[name] = getCookie(name);
  }
  return obj;
};

// 获取所有后端需要校验的cookie
let getAllValidCookie = ()=> {
  $cookie.cookie.raw = true;
  let cookies = $cookie.cookie();
  $cookie.cookie.raw = false;
  let obj = {};
  for (let name in cookies) {
    obj["cookie[" + name + "]"] = getCookie(name);
  }
  return obj;
};

let parseParam = ()=> {
  let search = location.search || "";
  let paramString = search.substring(1);
  let paramArr = paramString.split("&");
  let paramObj = {};
  for (let i = 0; i < paramArr.length; i++) {
    let paramItem = paramArr[i].split("=");
    paramObj[string.trim(paramItem[0])] = string.trim(paramItem[1]);
  }
  return paramObj;
};

// 数据上报
let sendStatistics = (url, param)=> {
  let query = [];

  let searchParam = parseParam();
  for (let key in searchParam) {
    if (key) {
      query.push(key + "=" + searchParam[key]);
    }
  }

  if (param) {
    for (let key in param) {
      if (key) {
        query.push(key + "=" + param[key]);
      }
    }
  }

  let cookies = getAllCookie();
  for (let name in cookies) {
    if (name) {
      query.push(name + "=" + cookies[name]);
    }
  }
  url = url + (url.indexOf("?") == -1 ? "?" : "&") + query.join("&");
  let script = document.createElement("script");
  script.setAttribute("src", url);
  document.head.appendChild(script);
};

// 合并对象
let extend = (target, source)=> {
  if (!source) {
    return target;
  }
  target = target || {};
  for (let key in source) {
    target[key] = source[key];
  }
  return target;
};

// 判断是否应用商店
let isAppstore = ()=> {
  let pkgName = getCookie("vvc_pn");
  return Boolean((pkgName && pkgName.indexOf('appstore') > -1) || getCookie("an"));
};

// 判断是否游戏中心
let isGameCenter = ()=> {
  let pkgName = getCookie("vvc_pn");
  return Boolean((pkgName && pkgName.indexOf('game') > -1) || getCookie("adrVerName"));
};

// 判断是否官网app
let isSpace = ()=> {
  let pkgName = getCookie("vvc_pn");
  return Boolean(pkgName && pkgName.indexOf('space') > -1);
};

let whereIsHere = ()=> {
  return isAppstore() ? "appstore" : isGameCenter() ? "gamecenter" : isSpace() ? "space" : "browser";
};

let setLocalStorage = (key, obj)=> {
  window.localStorage.setItem(key, JSON.stringify(obj));
};

let getLocalStorage = (key)=> {
  let string = window.localStorage.getItem(key);
  return string ? JSON.parse(string) : null;
};

export default {
  isLogin,
  getCookie,
  getAllCookie,
  getAllValidCookie,
  sendStatistics,
  extend,
  parseParam,
  isAppstore,
  isGameCenter,
  whereIsHere,
  setLocalStorage,
  getLocalStorage
};
