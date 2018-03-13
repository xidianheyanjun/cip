<template>
  <div id="app" class="root-body">
    <cmp-header></cmp-header>
    <router-view></router-view>
    <cmp-footer></cmp-footer>
    <cmp-box></cmp-box>
  </div>
</template>

<script>
  import cmpHeader from "@/components/header";
  import cmpFooter from "@/components/footer";
  import cmpBox from "@/components/box";
  export default {
    components: {
      cmpHeader,
      cmpFooter,
      cmpBox
    },
    data(){
      return {};
    },
    mounted(){
    }
  }
</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
   */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;

    -webkit-user-select: none;
  }

  span {
    vertical-align: top;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input, button, select, textarea {
    outline: none
  }

  /* 项目规则 */
  .root-body {
    position: relative;
  }

  .bg-color {
    background-color: #e1e5ed;
    height: 86px;
  }

  .container-body {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
  }

  .h-line {
    margin-top: 20px;
    height: 1px;
    width: 100%;
    background-color: #cccccc;
  }

  /* 悬浮手势 */
  .hand {
  }

  .hand:hover {
    cursor: pointer;
  }
</style>
