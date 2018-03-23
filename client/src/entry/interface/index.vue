<template>
  <div class="body">
    <table class="table">
      <tr>
        <td class="label">标识</td>
        <td class="param">
          <input type="text" v-model="param.id" placeholder="接口的标识"/>
        </td>
        <td class="label">接口代码</td>
        <td class="param">
          <input type="text" v-model="param.code" placeholder="接口调用的代码"/>
        </td>
        <td class="label">接口名称</td>
        <td class="param">
          <input type="text" v-model="param.name" placeholder="接口的名称"/>
        </td>
        <td class="label">平台</td>
        <td class="param">
          <select v-model="param.platform">
            <option v-for="item in options" :value="item.value">{{item.name}}</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="label">版本</td>
        <td colspan="7" class="param">
          <input type="text" v-model="param.minVersion" placeholder="应用的最小版本号"/>
          <input type="text" v-model="param.maxVersion" placeholder="应用的最大版本号"/>
        </td>
      </tr>
    </table>
    <div class="btn-pane">
      <div @click="doQuery" class="btn hand">查询</div>
      <div @click="create" class="btn hand">创建</div>
    </div>
    <table class="table">
      <tr>
        <td v-for="item in colModel" class="head">{{item.title}}</td>
      </tr>
      <tr v-for="(row, index) in list">
        <template v-for="col in colModel">
          <td v-if="col['code']=='platform'" :class="['data', index%2==1?'even':'odd']">
            {{row[col["code"]] | matchPlatformName}}
          </td>
          <td v-if="col['code']=='operate'" :class="['data', index%2==1?'even':'odd']">
            <span @click="modify(row)" class="btn hand">修改</span>
            <span @click="remove(row)" class="btn hand">删除</span>
          </td>
          <td v-if="col['code']!='operate' && col['code']!='platform'" :class="['data', index%2==1?'even':'odd']">
            {{row[col["code"]]}}
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import env from '@/config/env';
import string from '@/util/string';
import common from "@/util/common";
import kv from "@/util/kv";
export default {
  components: {},
  filters: {
    matchPlatformName(value){
      for (let m = 0; m < kv.platform.length; ++m) {
        if (value == kv["platform"][m]["value"]) {
          return kv["platform"][m]["name"];
        }
      }
    }
  },
  data(){
    return {
      options: kv.platform,
      param: {
        id: "",
        platform: kv.platform[0].value,
        minVersion: "",
        maxVersion: "",
        code: "",
        name: ""
      },
      colModel: [{
        code: "id",
        title: "标识"
      }, {
        code: "code",
        title: "接口代码"
      }, {
        code: "name",
        title: "接口名称"
      }, {
        code: "platform",
        title: "平台"
      }, {
        code: "minVersion",
        title: "最小版本"
      }, {
        code: "maxVersion",
        title: "最大版本"
      }, {
        code: "createTime",
        title: "创建时间"
      }, {
        code: "operate",
        title: "操作"
      }],
      list: [],
      isRemoving: false
    };
  },
  mounted() {
    let self = this;
    self.doQuery();
  },
  methods: {
    doQuery(){
      let self = this;
      self.$sendRequest({
        url: env.resource.interfaceList,
        params: self.param
      }).then((data)=> {
        self.list = data.data || [];
      }, (err)=> {
      });
    },
    create(){
      this.$router.push({
        path: "/interface/detail",
        query: {}
      });
    },
    modify(row){
      this.$router.push({
        path: "/interface/detail",
        query: {
          id: row.id
        }
      });
    },
    remove(row){
      let self = this;
      if (self.isRemoving) {
        console.log("self.isRemoving", self.isRemoving);
        return false;
      }
      self.isRemoving = true;
      self.$sendRequest({
        url: env.resource.removeInterface,
        params: {
          id: row.id
        }
      }).then((data)=> {
        if (data.code != 0) {
          self.$store.dispatch('box', {msg: data.msg || "服务异常，请稍后再试"});
          return false;
        }
        self.$store.dispatch('box', {msg: "删除成功"});
        self.doQuery();
        self.isRemoving = false;
      }, (err)=> {
        self.$store.dispatch('box', {msg: "网络异常，请稍后再试"});
        self.isRemoving = false;
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

  .table {
    width: 100%;
    margin: 20px auto 0;
    border-collapse: collapse;
    border: 1px solid #d5d5d5;
  }

  .table tr {
  }

  .table tr td {
    padding: 10px 0;
    border: 1px solid #d5d5d5;
  }

  .table tr td.head {
    text-align: center;
    color: #333333;
    background-color: #eceff6;
  }

  .table tr td.data {
    text-align: center;
  }

  .table tr td.data.even {
    background-color: #eeeeee;
  }

  .table tr td.data.odd {
  }

  .table tr td .btn {
    margin: 0 10px;
  }

  .table tr td.label {
    width: 80px;
    text-align: center;
    background-color: #f5f5f5;
  }

  .table tr td.param {
    padding-left: 20px;
    text-align: left;
  }

  .table input, .table select {
    display: inline-block;
    width: 160px;
    height: 32px;
    padding: 0 10px;
    color: #999999;
    font-size: 14px;
    line-height: 32px;
    border: 1px solid #cccccc;
  }

  .btn-pane {
    margin-top: 20px;
  }

  .btn-pane .btn {
    display: inline-block;
    text-align: center;
    width: 90px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    color: #ffffff;
    background-color: #52a2ff;
    border-radius: 2px;
  }
</style>
