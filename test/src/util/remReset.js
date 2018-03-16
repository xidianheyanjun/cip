/**
 * Created by Administrator on 2017/11/3.
 */
function remReset() {
  var docEl = document.documentElement,
    metaEl = document.querySelector('meta[name="viewport"]'),
    designWidth = 1080,
    isSet = false,
    timer = window.setInterval(function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth || isSet) {
        window.clearInterval(timer);
        return false;
      }
      var dpr = (window.innerWidth == 320 && window.innerHeight == 240) ? 1 : window.devicePixelRatio || 1;
      var scale = 1 / dpr;
      metaEl.setAttribute('content', 'width=' + dpr * clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale+ ',user-scalable=no');
      docEl.style.fontSize = 100 * (clientWidth * dpr / designWidth) + 'px';
      isSet = true;
    }, 200);
}

export default remReset;
