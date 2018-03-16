(function (win, doc) {
  var docEl = doc.documentElement,
    maxwidth = 540,
    dpr = devicePixelRatio == 4 ? 1 : devicePixelRatio,
    scale = 1 / dpr,
    tid
  docEl.dataset.dpr = dpr

  var metaEl = doc.createElement('meta')
  metaEl.name = 'viewport'
  metaEl.content = setScale(scale)

  docEl.firstElementChild.appendChild(metaEl)
  var design_scale = (docEl.dataset.width || 1080) / 100

  var h = document.getElementsByTagName('head')[0],
    d = document.createElement('div')
  d.style.width = '1rem'
  d.style.display = 'none'
  h.appendChild(d)
  var rootfs = parseFloat(getComputedStyle(d, null).getPropertyValue('width'))

  var refreshRem = function () {
    var width = document.documentElement.clientWidth
    if (width / dpr > maxwidth) {
      width = maxwidth * 1
    }
    // docEl.style.fontSize = width / design_scale + 'px';
    docEl.style.fontSize = width / design_scale / rootfs * 100 + '%'
  }

  refreshRem()
  win.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)

  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  }, false)

  win.addEventListener('DOMContentLoaded', function (e) {
    var body = document.getElementsByTagName('body')[0]
    body.style.maxWidth = design_scale + 'rem'
    body.style.margin = '0 auto'
  }, false)

  function setScale(scale) {
    return 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ",user-scalable=no";
  }
})(window, document)
