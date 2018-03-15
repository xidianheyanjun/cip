<template>
  <div>
    <div v-if="box.isShow" class="mask"></div>
    <div v-if="box.isShow" class="box-message">
      <div class="body">
        <div class="text">{{box.msg}}</div>
      </div>
      <div @click="hideBox" class="btn-box-ok hand">确定</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
  import env from '@/config/env';
  import string from '@/util/string';
  import common from "@/util/common";
  export default {
    components: {},
    computed: mapGetters([
      "box"
    ]),
    data(){
      return {};
    },
    mounted() {
    },
    methods: {
      hideBox(){
        this.$store.dispatch('box', {isHide: true, msg: ""});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000000;
    opacity: 0.45;
    z-index: 3;
  }

  .box-message {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 200px;
    margin: -100px 0 0 -200px;
    background-color: #ffffff;
    border-radius: 3px;
    text-align: center;
    z-index: 3;
  }

  .box-message .body {
    margin: 60px 80px 0;
  }

  .box-message .body .text {
    display: inline-block;
    text-align: left;
    max-width: 200px;
    line-height: 22px;
    font-size: 14px;
    color: #515151;
    vertical-align: middle;
  }

  .box-message .btn-box-ok {
    display: inline-block;
    width: 90px;
    height: 32px;
    line-height: 32px;
    margin-top: 40px;
    font-size: 16px;
    color: #ffffff;
    background-color: #52a2ff;
    border-radius: 2px;
  }
</style>
