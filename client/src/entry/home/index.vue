<template>
  <div class="body">
    <div class="title">首页</div>
    <div class="board">
      <div class="item bg-green">
        <div class="img interface"></div>
        <div class="number">{{interfaceNumber}}</div>
        <div class="name">接口数</div>
      </div>
      <div class="item bg-orange">
        <div class="img platform"></div>
        <div class="number">{{platformNumber}}</div>
        <div class="name">适配平台数</div>
      </div>
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
  data(){
    return {
      interfaceNumber: 0,
      platformNumber: 0
    };
  },
  mounted() {
    let self = this;
    self.init();
  },
  methods: {
    init(){
      let self = this;
      self.$sendRequest({
        url: env.resource.homeInfo,
        params: {}
      }).then((data)=> {
        if (data.code != 0) {
          console.log("/home/info response error");
          return false;
        }
        self.interfaceNumber = data.data.interfaceNumber;
        self.platformNumber = data.data.platformNumber;
      }, (err)=> {
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .body {
    width: 90%;
    margin: 0 auto;
  }

  .title {
    padding-bottom: 20px;
    margin: 40px 0 20px;
    border-bottom: 1px solid #eeeeee;
    font-size: 36px;
  }

  .board {
  }

  .board .item {
    position: relative;
    display: inline-block;
    width: 300px;
    height: 120px;
    margin: 0 15px 20px 15px;
    border-radius: 3px;
  }

  .bg-blue {
    background-color: #337ab7;
  }

  .bg-green {
    background-color: #5cb85c;
  }

  .bg-orange {
    background-color: #f0ad4e;
  }

  .bg-red {
    background-color: #d9534f;
  }

  .board .item .img {
    position: absolute;
    top: 20px;
    left: 15px;
    display: inline-block;
    width: 64px;
    height: 64px;
  }

  .board .item .img.interface {
    background: url("../../assets/image/interface.png") center center no-repeat;
    background-size: 100% 100%;
  }

  .board .item .img.platform {
    background: url("../../assets/image/platform.png") center center no-repeat;
    background-size: 100% 100%;
  }

  .board .item .number {
    position: absolute;
    top: 20px;
    right: 15px;
    display: inline-block;
    font-size: 40px;
    color: #ffffff;
  }

  .board .item .name {
    position: absolute;
    top: 80px;
    right: 15px;
    display: inline-block;
    font-size: 14px;
    color: #ffffff;
  }
</style>
