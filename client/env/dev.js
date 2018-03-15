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
    interfaceList: "static/json/interfaceList.json",
    removeInterface: "static/json/removeInterface.json",
    loadInterface: "static/json/loadInterface.json",
    saveInterface: "static/json/saveInterface.json"
  }
};
