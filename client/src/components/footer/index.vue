<template>
  <div class="container">
    <div class="copyright">
      <span>COPYRIGHT &copy; 2018 hyj RIGHTS RESERVED. </span>
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
      return {};
    },
    mounted() {
      let self = this;
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #323232;
  }

  .copyright {
    text-align: center;
    font-size: 13px;
    color: #999999;
    padding: 20px 0;
  }

  .copyright a, .copyright a:visited {
    text-decoration: none;
    font-size: 13px;
    color: #999999;
  }

  .copyright a:hover {
    text-decoration: underline;
  }
</style>
