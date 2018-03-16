/**
 * rem自适应方案
 */
import common from "@/util/common";
function flexible(options) {
  let defaultOptions = {
    isScale: true,
    designWidth: 1080
  }
  let setting = Object.assign(defaultOptions, options || {})


  var docEl = document.documentElement,
    metaEl = document.querySelector('meta[name="viewport"]'),
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    dpr = window.devicePixelRatio || 1,
    scale = 1 / dpr,
    clientWidth = docEl.clientWidth,
    reCalc = function () {
      if (!clientWidth) return;

      if (!setting.isScale) {
        dpr = 1;
      }

      if (window.innerWidth == 320 && window.innerHeight == 240) {
        dpr = 1;
      }

      docEl.style.fontSize = 100 * (clientWidth * dpr / setting.designWidth) + 'px';//设计图是720宽度
      window.fontSize = 100 * (clientWidth * dpr / setting.designWidth);
    };

  if (setting.isScale) {
    metaEl.setAttribute('content', 'width=' + dpr * clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
  }

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, reCalc, false);

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(reCalc, 300);
    }
  }, false);

  document.addEventListener('DOMContentLoaded', reCalc, false);

  if (document.readyState === 'complete') {
    reCalc();
  } else {
    document.addEventListener('DOMContentLoaded', function (e) {
      reCalc();
    }, false);
  }

  // reCalc();
}

export default flexible;
