<template>
  <div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import env from '@/config/env';
import string from '@/util/string';
import native from '@/util/native';
import common from "@/util/common";
export default {
  components: {},
  computed: mapGetters([]),
  data(){
    return {};
  },
  mounted() {
    let self = this;
    window.webToastShow(111);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
