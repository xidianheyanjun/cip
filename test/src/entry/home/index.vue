<template>
  <div>
    <div @click="showCookie">showCookie</div>
    <hr>
    <div>cookies:{{cookies}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import env from '@/config/env';
import string from '@/util/string';
import native from '@/util/native';
import common from "@/util/common";
import chain from "@/util/platform/Chain";
let platform = chain.getCurrentPlatform();
export default {
  components: {},
  computed: mapGetters([]),
  data(){
    return {
      cookies: ""
    };
  },
  mounted() {
    let self = this;
    // window.webToastShow(111);
    console.log(`current platform:${platform.getPlatformName()}`);
  },
  methods: {
    showCookie() {
      this.cookies = document.cookie;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
