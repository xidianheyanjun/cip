<template>
  <div class="bg">
    <div class="bar">
      <img @click="go2home" :src="logoUrl" class="logo hand"/>
      <div @click="go2home" class="brand-text hand">客户端接口平台</div>
      <div class="menu">
        <div v-for="item in menuList" @click="redirect(item)" class="nav">{{item.name}}</div>
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
        menuList: env.menuList,
        logoUrl: "static/resource/img/bridge.png"
      };
    },
    mounted() {
      let self = this;
    },
    methods: {
      go2home(){
        this.$router.push({
          path: env.homePagePath
        });
      },
      redirect(item){
        this.$router.push({
          path: item.path
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    width: 100%;
    height: 50px;
    background-color: #2f343f;
  }

  .bar {
    position: relative;
    margin: 0 auto;
    width: 1200px;
    height: 50px;
    line-height: 50px;
    color: #d0d8ed;
  }

  .logo {
    height: 48px;
    vertical-align: middle;
  }

  .brand-text {
    display: inline-block;
    font-size: 22px;
    color: #d0d8ed;
    vertical-align: middle;
  }

  .menu {
    display: inline-block;
    margin-left: 80px;
  }

  .menu div.nav {
    display: inline-block;
    cursor: pointer;
    margin-right: 37px;
    font-size: 14px;
    color: #d0d8ed;
  }

  .menu div.nav:hover {
    color: #a2aabf;
  }
</style>
