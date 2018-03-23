export default {
  mode: "dev",
  homePagePath: "/home/index",
  menuList: [{
    name: "首页",
    path: "/home/index"
  }, {
    name: "接口管理",
    path: "/interface/index"
  }, {
    name: "脚本生成",
    path: "/build/index"
  }],
  resource: {
    homeInfo: "http://localhost:2020/home/info",
    interfaceList: "http://localhost:2020/manage/list",
    removeInterface: "http://localhost:2020/manage/remove",
    loadInterface: "http://localhost:2020/manage/load",
    saveInterface: "http://localhost:2020/manage/save"
  }
};
