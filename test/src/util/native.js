/**
 * Created by Administrator on 2017/3/24.
 */
/**
 * 调用客户端接口的总入口方法
 * @param  {Function} funName  客户端方法函数名
 * @param  {Object} info       与客户端函数相关的参数信息，将转换成json格式
 */
function invokeLocal(funName, info) {
  if (!window.AppWebClient || !window.AppWebClient.invokeLocal) {
    return;
  }
  if (typeof info == "object") {
    if (!info["webErrorCatch"]) {
      info.webErrorCatch = "callback";
    }
    if (!info["localErrorCatch"]) {
      info.localErrorCatch = "true";
    }
    info = JSON.stringify(info);
  }
  return window.AppWebClient.invokeLocal(funName, info);
}

/**
 * 客户端toast弹窗信息
 * @param  {string} text   弹窗文本信息
 */
function webToastShow(text) {
  var info = {
    info: {
      toast: text
    }
  };
  invokeLocal("webToastShow", info);
}

/**
 * 调用客户端登录接口
 * @param  {Object} info 可以为空
 */
function login() {
  invokeLocal("login", {
    info: {}
  });
}

/*
 客户端登陆回调
 */
var isRefresh = false;// 游戏中心登陆成功会调用2次
window.onAccountsUpdate = function () {
  if (isRefresh) {
    return false;
  }
  isRefresh = true;
  webToastShow("登录成功");
  location.reload();
};

/**
 * 调用客户端复制接口
 * @param  {String} text 可以为空
 */
function copyText(text) {
  var info = {
    "info": {
      "copyText": text
    },
    "callback": "copyTextCallback"
  };

  invokeLocal("copyText", info)
}

window.copyTextCallback = function () {
  webToastShow('复制成功');
};

/**
 * 客户端查看应用详情接口
 * @param  {Object} appObj    应用object,例如:
 * {"id":9973,"pkgName":"cc.thedream.qinsmoon.vivo"}
 * @param  {int} dataTag      数据埋点标识，例如:10009
 */
function goPackageDetailGamecenter(appObj, dataTag) {
  var appInfo = {
    info: {
      appInfo: appObj,
      //数据埋点json格式
      //数据埋点json格式
      statistic: {trace: dataTag}
    }
  };
  invokeLocal("goPackageDetail", appInfo);
}

function queryAppInstallStatus(packageName) {
  var info = {
    "info": {
      "packageName": packageName
    },
    "callback": "syncInstallStatus"
  };

  invokeLocal("queryAppInstallStatus", info);
}

function diamondRecharge() {
  var info = {
    "info": {},
    "callback": "onH5PayCallback"
  };

  invokeLocal("diamondRecharge", info);
}

export default {
  webToastShow: webToastShow,
  login: login,
  copyText: copyText,
  goPackageDetailGamecenter: goPackageDetailGamecenter,
  queryAppInstallStatus: queryAppInstallStatus,
  diamondRecharge: diamondRecharge
};
