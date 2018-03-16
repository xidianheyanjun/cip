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
    interfaceList: "http://localhost:2020/interface/manage/list",
    removeInterface: "http://localhost:2020/interface/manage/remove",
    loadInterface: "http://localhost:2020/interface/manage/load",
    saveInterface: "http://localhost:2020/interface/manage/save"
  }
};
