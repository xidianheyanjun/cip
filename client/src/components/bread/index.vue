<template>
  <div>
    <div class="bread-crumb">
      <div v-for="(item, index) in list" :key="item.name">
        <div @click="redirect2url(item)" class="bread-crumb-item">{{item.name}}</div>
        <div v-if="index!=list.length-1" class="bread-crumb-separated"></div>
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
    props: {
      list: {
        type: Array,
        required: true
      }
    },
    data(){
      return {};
    },
    mounted() {
      let self = this;
    },
    methods: {
      redirect2url(item){
        this.$router.push({
          path: item.url
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 面包屑 */
  .bread-crumb {
  }

  .bread-crumb div {
    display: inline-block;
    margin-right: 7px;
  }

  .bread-crumb .bread-crumb-item {
    font-size: 16px;
    color: #333333;
  }

  .bread-crumb .bread-crumb-item:hover {
    cursor: pointer;
  }

  .bread-crumb .bread-crumb-separated {
    display: inline-block;
    width: 5px;
    height: 11px;
    background: url("../../assets/image/bread/separated.png") center center no-repeat;
    background-size: 100% 100%;
  }
</style>
