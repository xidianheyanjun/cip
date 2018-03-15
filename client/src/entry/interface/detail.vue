<template>
  <div class="body">
    <table class="table">
      <tr>
        <td class="label">接口代码</td>
        <td class="param">
          <input type="text" v-model="param.interfaceCode" placeholder="接口调用的代码"/>
        </td>
        <td class="label">接口名称</td>
        <td class="param">
          <input type="text" v-model="param.interfaceName" placeholder="接口的名称"/>
        </td>
      </tr>
      <tr>
        <td class="label">平台</td>
        <td class="param">
          <select v-model="param.platform">
            <option v-for="item in options" :value="item.value">{{item.name}}</option>
          </select>
        </td>
        <td class="label">版本</td>
        <td class="param">
          <input type="text" v-model="param.minVersion" placeholder="应用的最小版本号"/>
          <input type="text" v-model="param.maxVersion" placeholder="应用的最大版本号"/>
        </td>
      </tr>
    </table>

    <div class="ide">
      <textarea ref="ide"></textarea>
    </div>

    <div class="btn-pane">
      <div @click="save" class="btn hand">保存</div>
      <div @click="cancel" class="btn hand">取消</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex';
  import env from '@/config/env';
  import string from '@/util/string';
  import common from "@/util/common";
  import kv from "@/util/kv";
  import "codemirror/lib/codemirror.css";
  import CodeMirror from "codemirror";
  import "codemirror/mode/javascript/javascript";
  export default {
    components: {},
    data(){
      return {
        options: kv.platform,
        param: {
          id: 0,
          interfaceCode: "",
          interfaceName: "",
          platform: kv.platform[0].value,
          minVersion: "",
          maxVersion: "",
          js: ""
        },
        editor: null
      };
    },
    mounted() {
      let self = this;
      self.param.id = self.$route.query.id;
      self.param.id ? self.loadDetail(self.param.id) : self.init();
    },
    methods: {
      loadDetail(id){
        let self = this;
        self.$sendRequest({
          url: env.resource.loadInterface,
          params: {
            id: id
          }
        }).then((data)=> {
          common.extend(self.param, data.data);
          self.init();
        }, (err)=> {
          self.$store.dispatch('box', {msg: "网络异常，请稍后再试"});
        });
      },
      init(){
        let self = this;
        self.editor = CodeMirror.fromTextArea(self.$refs.ide, {
          mode: "text/javascript",
          lineNumbers: true,
          tabSize: 2
        });
        self.editor.setValue(self.param.js);
      },
      save(){
        let self = this;
        if (!self.param.interfaceCode) {
          self.$store.dispatch('box', {msg: "接口代码不能为空"});
          return false;
        }
        if (!self.editor.getValue()) {
          self.$store.dispatch('box', {msg: "接口内容不能为空"});
          return false;
        }
        self.$sendRequest({
          url: env.resource.saveInterface,
          params: {
            id: self.param.id,
            interfaceCode: self.param.interfaceCode,
            interfaceName: self.param.interfaceName,
            platform: self.param.platform,
            minVersion: self.param.minVersion,
            maxVersion: self.param.maxVersion,
            js: self.editor.getValue()
          }
        }).then((data)=> {
          if (data.code != 0) {
            self.$store.dispatch('box', {msg: data.msg});
            return false;
          }
          self.$store.dispatch('box', {msg: "保存成功"});
        }, (err)=> {
          self.$store.dispatch('box', {msg: "网络异常，请稍后再试"});
        });
      },
      cancel(){
        this.$router.push({
          path: "/interface/index"
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
    border: 1px solid #aaaaaa;
  }

  .table tr {
  }

  .table tr td {
    padding: 10px 0;
    border: 1px solid #aaaaaa;
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

  .ide {
    margin-top: 40px;
    border: 1px solid #cccccc;
  }

  .btn-pane {
    margin-top: 20px;
    text-align: center;
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
