<template>
  <div class="bg">
    <div class="bar">
      <svg @click="go2home" viewBox="0 0 73 73" class="vivo-brand-logo-large hand">
        <svg id="vivo-allbrand-logo" viewBox="0 0 218.3 88.4" width="100%" height="100%">
          <g>
            <path d="M196.5,15.5h-23c-12.1,0-21.8,9.8-21.8,21.9v1.1c0,12.1,9.7,21.9,21.8,21.9h23c12.1,0,21.8-9.8,21.8-21.9v-1.1
                            C218.3,25.3,208.5,15.5,196.5,15.5z M209.7,38.5c0,7.3-5.9,13.3-13.2,13.3h-23c-7.3-0.1-13.2-6-13.2-13.3v-1.1
                            c0-7.3,5.9-13.3,13.2-13.4h23c7.3,0.1,13.2,6,13.2,13.4L209.7,38.5z"></path>
            <path d="M33,60.6h0.1c4.5,0,8.1-2,11.4-6.7l20.8-30.5c1.4-2.1,0.9-4.9-1.2-6.4c-2.1-1.4-4.9-0.9-6.3,1.1c0,0,0,0,0,0L37,48.7
                            c-1.3,1.9-2.7,2.7-4,2.7l0,0c-1.6,0-2.7-0.9-4-2.7L8.3,18.2C6.9,16.1,4.1,15.6,2,17c0,0,0,0,0,0c-2.1,1.4-2.6,4.3-1.2,6.4
                            l20.8,30.5C24.4,58.1,28.6,60.6,33,60.6L33,60.6z"></path>
            <path d="M151.9,20.8c0-1.5-0.7-2.9-1.9-3.8c-2.1-1.4-4.9-0.9-6.3,1.1c0,0,0,0,0,0l-20.8,30.5c-1.3,1.9-2.7,2.7-4,2.7l0,0
                            c-1.6,0-2.7-0.9-4-2.7L94.1,18.2c-1.4-2.1-4.2-2.6-6.3-1.2c0,0,0,0,0,0c-2.1,1.4-2.6,4.3-1.2,6.4l20.7,30.5
                            c2.9,4.2,7.1,6.7,11.5,6.7h0.1c4.5,0,8.1-2,11.4-6.7l20.8-30.5C151.7,22.6,151.9,21.7,151.9,20.8z"></path>
            <path d="M74.7,12.8c0.3,0.3,0.8,0.5,1.3,0.5c0.5,0,1-0.2,1.3-0.5l4.8-4.8c0.7-0.7,0.7-1.9,0-2.6l-4.8-4.8C76.9,0.2,76.5,0,76,0
                            h-0.1c-0.5,0-0.9,0.2-1.3,0.5l-4.8,4.8c-0.7,0.7-0.7,1.9,0,2.6L74.7,12.8z"></path>
            <path d="M80.5,56.1V20.7c0-2.5-2-4.5-4.5-4.5l0,0c-2.5,0-4.6,2-4.6,4.5c0,0,0,0,0,0v35.4c0.1,2.5,2.3,4.5,4.8,4.4
                            C78.6,60.3,80.5,58.5,80.5,56.1L80.5,56.1z"></path>
            <path d="M32.9,85.9c-3.2,0-5.4-2.4-5.4-5.8c-0.2-3,2.1-5.6,5.1-5.8c0.1,0,0.2,0,0.4,0c1.4,0,2.7,0.6,3.6,1.6l2.1-1.7
                            c-1.5-1.6-3.6-2.5-5.7-2.4c-4.9,0-8.6,3.2-8.6,8.2c-0.2,4.4,3.2,8.1,7.6,8.3c0.3,0,0.5,0,0.8,0c2.4,0.1,4.6-0.9,6.1-2.8L36.7,84
                            C35.8,85.2,34.4,85.9,32.9,85.9z"></path>
            <path d="M46.1,77.3c-1.7,0-3.3,0.6-4.5,1.7l1.4,1.6c0.8-0.8,1.8-1.2,2.9-1.2c1.3,0,2.4,0.6,2.4,1.9v0.3C45,81.6,41,82,41,85.2
                            c0,2.5,2.3,3.3,4,3.3c1.3,0.1,2.6-0.5,3.3-1.6h0.1v1.3h2.5v-6.5C50.8,79.6,49.9,77.3,46.1,77.3z M48.3,83.7
                            c0.1,1.4-0.9,2.6-2.3,2.7c-0.2,0-0.3,0-0.5,0c-0.9,0-1.9-0.3-1.9-1.3c0-1.6,2.4-1.8,4-1.8h0.6L48.3,83.7z"></path>
            <path d="M99.3,77.3c-1.7,0-3.3,0.6-4.5,1.7l1.4,1.6c0.8-0.8,1.8-1.2,2.8-1.2c1.3,0,2.4,0.6,2.4,1.9v0.3c-3.3,0-7.3,0.4-7.3,3.6
                            c0,2.5,2.3,3.3,4,3.3c1.3,0.1,2.6-0.5,3.3-1.6h0.1v1.3h2.5v-6.5C104,79.6,103.1,77.3,99.3,77.3z M101.5,83.7
                            c0.1,1.4-0.9,2.6-2.3,2.7c-0.2,0-0.3,0-0.5,0c-0.9,0-1.9-0.3-1.9-1.3c0-1.6,2.4-1.8,4-1.8h0.6L101.5,83.7z"></path>
            <path d="M66.6,77.3c-1.5-0.1-2.8,0.7-3.5,2c-1-1.9-3.2-2.6-5.1-1.6c-0.7,0.4-1.3,0.9-1.6,1.6l0,0v-1.7h-2.6v10.8h2.7v-5.9
                            c0-1.4,0.7-2.9,2.4-2.9c1.4,0,2,1,2,2.3v6.5h2.7v-5.9c0-1.4,0.7-3,2.4-3s2,1.6,2,2.9v6h2.7v-6.7C70.6,79.5,69.4,77.3,66.6,77.3z"></path>
            <path d="M78.4,77.3c-3-0.1-5.4,2.2-5.6,5.1c0,0.2,0,0.3,0,0.5c0.1,3.2,2.8,5.6,6,5.5c1.6-0.1,3.1-0.8,4.2-2.1l-1.8-1.4
                            c-0.6,0.9-1.7,1.4-2.8,1.4c-1.5,0.1-2.8-1.1-3-2.6h8c0-0.2,0-0.5,0-0.7C83.5,79.2,81.3,77.3,78.4,77.3z M75.5,81.8
                            c0.1-1.5,1.4-2.6,2.9-2.5c1.3-0.1,2.4,0.9,2.5,2.2c0,0.1,0,0.2,0,0.4H75.5z"></path>
            <path d="M88.4,79.4L88.4,79.4v-1.8h-2.6v10.8h2.7v-5.8c-0.1-1.6,1.2-2.8,2.7-2.9c0.1,0,0.1,0,0.2,0c0.3,0,0.6,0,0.8,0.1v-2.5
                            c-0.2,0-0.4-0.1-0.7-0.1C90.1,77.3,88.9,78.2,88.4,79.4z"></path>
            <path d="M127.2,79.7h-3.1l-1.8,2.9l-2.6-2.7c1.8-0.8,3.2-2.2,3.2-4.2c0-2.6-2.1-3.8-4.4-3.8s-4.5,1.2-4.5,3.9
                            c0.1,1.4,0.7,2.7,1.7,3.6c-1.8,0.8-3.4,2.2-3.4,4.5c0,3,2.5,4.6,5.3,4.6c1.8,0.1,3.6-0.7,4.8-2.1l1.8,1.8h3.6l-3.7-3.8L127.2,79.7z
                            M118.6,74c1,0,1.8,0.7,1.8,1.7c0,0,0,0,0,0.1c0,1.2-1.1,2-2.3,2.5c-0.8-0.6-1.3-1.5-1.4-2.5C116.8,74.8,117.6,74,118.6,74
                            C118.6,74,118.6,74,118.6,74z M117.7,86.2c-1.4,0-2.6-1.1-2.6-2.5c0-1.3,0.9-2.4,2.2-2.7l3.4,3.5C120.1,85.5,118.9,86.2,117.7,86.2
                            z"></path>
            <polygon points="144.4,83.7 144.4,83.7 140.1,72.1 135.6,72.1 135.6,88.4 138.4,88.4 138.4,75.3 138.4,75.3 143.3,88.4 145.3,88.4
                            150.3,75.3 150.3,75.3 150.3,88.4 153.2,88.4 153.2,72.1 148.6,72.1 	"></polygon>
            <path d="M163.3,83.2c0.2,1.4-0.9,2.7-2.3,2.9c-0.1,0-0.1,0-0.2,0c-1.7,0-2-1.6-2-2.9v-6h-2.7V84c0,2.2,1.2,4.3,4,4.3
                            c1.4,0,2.7-0.7,3.3-2l0,0v1.7h2.6V77.3h-2.7L163.3,83.2z"></path>
            <path d="M172.9,79.3c0.9,0,1.7,0.4,2.3,1.1l1.7-1.5c-1-1.1-2.5-1.7-4-1.6c-2.1,0-4.2,1-4.2,3.3c0,2,1.6,2.6,3.1,3s2.4,0.6,2.4,1.5
                            s-0.9,1.2-1.7,1.2c-1,0-2-0.5-2.7-1.3l-1.7,1.6c1.1,1.1,2.7,1.8,4.3,1.7c2.3,0,4.4-0.9,4.4-3.5c0-2.1-1.8-2.8-3.4-3.1
                            s-2.3-0.6-2.3-1.4S172.1,79.3,172.9,79.3z"></path>
            <rect x="179.2" y="77.3" width="2.7" height="11.1"></rect>
            <path d="M189.9,79.5c0.8,0,1.6,0.4,2.2,1l1.8-1.6c-1-1.1-2.5-1.7-4-1.6c-3.1,0-5.5,2.5-5.5,5.6c0,3.1,2.5,5.5,5.6,5.5
                            c1.4,0.1,2.8-0.5,3.9-1.5l-1.6-1.7c-0.6,0.6-1.4,1-2.2,0.9c-1.7,0-3.1-1.5-3-3.2c0-0.1,0-0.1,0-0.2C187,81.2,187.9,79.5,189.9,79.5
                            z"></path>
            <circle cx="180.6" cy="73.5" r="1.7"></circle>
          </g>
        </svg>
      </svg>
      <div @click="go2home" class="brand-text hand">开发者云测平台</div>
      <div class="menu">
        <div v-for="item in menu" @click="redirect(item)" class="nav">{{item.name}}</div>
      </div>
      <div class="user">
        <div v-if="needLogin" @click="login" class="user-body">
          <span>登陆</span>
        </div>
        <div v-if="!needLogin" class="user-body">
          <span>{{userName}}</span>
          <span class="icon-open"></span>
        </div>
        <div v-if="!needLogin" class="link-list">
          <div v-for="item in linkList" @click="redirectLink(item, $event)" class="link-item">{{item.name}}</div>
        </div>
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
    watch: {
      "$route": "queryUserInfo"
    },
    data(){
      return {
        needLogin: false,
        menu: env.menu,
        userName: "",
        linkList: env.linkList,
        versionListKey: "versionList",
        phoneListKey: "phoneList",
        machineObject: "machineObject"
      };
    },
    mounted() {
      let self = this;
      self.queryUserInfo();
      document.addEventListener("click", (e) => {
        self.isShow = false;
      });
    },
    methods: {
      queryUserInfo(){
        let self = this;
        self.$sendRequest({
          url: env.resource.getAccountInfo,
          method: "post",
          params: {}
        }).then((data)=> {
          self.needLogin = data.code == -1;
          let user = data.data || {};
          let userName = user.name || user.email || "我";
          self.userName = userName.length <= 5 ? userName : (userName.substr(0, 4) + "...");
        }, (err)=> {
        });
      },
      login(){
        window.location.href = string.format(env.resource.auth, {
          callbackUrl: window.encodeURIComponent(window.location.href)
        });
        return false;
      },
      go2home(){
        this.$router.push({
          path: env.homePagePath
        });
      },
      redirect(item){
        let self = this;
        if (item.code == "test") {
          common.setLocalStorage(self.versionListKey, []);
          common.setLocalStorage(self.phoneListKey, []);
        }
        if (item.code == "machine") {
          common.setLocalStorage(self.machineObject, {isVisited: false});
        }
        if (item.code != "doc") {
          self.$router.push({
            path: item.path
          });
          return false;
        }
        window.open(item.path);
      },
      redirectLink(item, e){
        e.stopPropagation();
        let self = this;
        if (item.code == "logout") {
          self.$sendRequest({
            url: env.resource.logout,
            method: "jsonp",
            params: {}
          }).then((data)=> {
            if (data.code != 1) {
              return false;
            }
            self.needLogin = true;
            self.go2home();
          }, (err)=> {
          });
          return false;
        }
        window.location.href = item.url;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    background-color: #2f343f;
    width: 100%;
    height: 50px;
  }

  .bar {
    position: relative;
    margin: 0 auto;
    width: 1200px;
    height: 50px;
    line-height: 50px;
    color: #d0d8ed;
  }

  .vivo-brand-logo-large {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px;
    width: 83px;
    height: 83px;
    fill: #fff;
    background-color: #008cd6;
    z-index: 2;
  }

  .brand-text {
    display: inline-block;
    margin-left: 124px;
    font-size: 22px;
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

  .user {
    position: absolute;
    display: inline-block;
    right: 0;
    top: 0;
    width: 133px;
    background-color: #1c212c;
  }

  .user .user-body {
    text-align: center;
  }

  .user .user-body:hover {
    cursor: pointer;
  }

  .user .user-body .icon-open {
    display: inline-block;
    width: 10px;
    height: 19px;
    margin-left: 6px;
    background: url("../../assets/image/bread/arrow_down.png") center center no-repeat;
    background-size: 10px 6px;
    vertical-align: middle;
  }

  .user .link-list {
    position: absolute;
    display: none;
    width: 133px;
    right: 0;
    top: 50px;
    background-color: #ededed;
    z-index: 2;
  }

  .user:hover .link-list {
    display: inline-block;
  }

  .user .link-list .link-item {
    text-align: center;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333333;
  }

  .user .link-list .link-item:hover {
    color: #333333;
    background-color: #cccccc;
    cursor: pointer;
  }
</style>
