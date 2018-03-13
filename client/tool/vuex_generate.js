/**
 * Created by Administrator on 2017/6/5.
 */
let fs = require("fs");
let path = require("path");
let sourceDir = path.join(path.dirname(__dirname), process.argv[2]);
let targetFile = path.join(path.dirname(__dirname), process.argv[3]);
console.log("sourceDir   -->" + sourceDir);
console.log("targetFile  -->" + targetFile);

// 模块化vuex
if (!fs.existsSync(sourceDir)) {
  console.log("[" + sourceDir + "] is not existed");
  return false;
}

if (!fs.lstatSync(sourceDir).isDirectory()) {
  console.log("[" + sourceDir + "] is not directory");
  return false;
}

let moduleDirs = fs.readdirSync(sourceDir);
moduleDirs.forEach(function (moduleDir) {
  console.log("=================================================================");
  if (moduleDir == "store.js" || moduleDir.indexOf('.') >= 0) {
    console.log("[" + moduleDir + "] skip");
    console.log("=================================================================");
    console.log("");
    return false;
  }

  // 遍历模块---生成每一个模块的引用
  let moduleDirPath = path.join(sourceDir, moduleDir);
  let stat = fs.lstatSync(moduleDirPath);
  if (!stat.isDirectory()) {
    console.log("[" + moduleDirPath + "] is not directory");
    console.log("=================================================================");
    console.log("");
    return false;
  }

  console.log("[" + moduleDir + "]");
  let files = fs.readdirSync(moduleDirPath);
  console.log(files);

  let moduleFilePath = path.join(moduleDirPath, "index.js");
  let importData = [];
  let initData = [];
  files.forEach(function (file) {
    let fileName = path.basename(file, '.js');
    if (fileName == "index") {
      return false;
    }
    importData.push(`import ${fileName} from "./${fileName}";`);
    initData.push(`${fileName}: ${fileName}`);
  });
  fs.writeFileSync(moduleFilePath, importData.join("") + "export default {" + initData.join(",") + "};");
  console.log("=================================================================");
  console.log("");
});

// 生成全量store
let moduleImport = [];
let moduleInit = [];
moduleImport.push('import Vue from "vue";import Vuex from "vuex";Vue.use(Vuex);');
console.log("=================================================================");
console.log("[" + targetFile + "]");
moduleDirs.forEach(function (moduleDir) {
  if (moduleDir == "store.js" || moduleDir.indexOf('.') >= 0) {
    console.log("[" + moduleDir + "] skip");
    return false;
  }

  moduleImport.push(`import ${moduleDir} from "./${moduleDir}";`);
  moduleInit.push(`${moduleDir}: ${moduleDir}`);
});
fs.writeFileSync(targetFile, moduleImport.join("") + "export default new Vuex.Store({modules: {" + moduleInit.join(",") + "}});");
console.log("=================================================================");
