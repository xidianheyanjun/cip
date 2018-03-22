"use strict";
let path = require("path");
let fileUtils = require("../utils/FileUtils");
class Context {
    constructor(app, env) {
        let self = this;
        self["env"] = env;
        self["_bean"] = {};
        self["_route"] = [];
        self["_defaultRoute"] = {};
        let rootPath = path.join(path.dirname(__dirname), "../" + self["env"]["scanRootPath"]);
        let pathRegular = new RegExp(self["env"]["pathRegular"]);
        let filePathList = fileUtils.listFilePath(rootPath, pathRegular);
        console.log("filePathList", filePathList);
        // 初始化资源
        for (let m = 0; m < filePathList.length; ++m) {
            let filePath = filePathList[m];
            let Bean = require(filePath);
            if (!(Bean instanceof Function)) {
                console.log(filePath + " is not Function");
                continue;
            }
            let configKey = "";
            if (Bean["prototype"]["_dao"]) {
                configKey = Bean["prototype"]["_dao"]["configKey"];
            }
            let bean = configKey ? new Bean(self["env"][configKey]) : new Bean();
            if (!bean["_controller"] && !bean["_resource"] && !bean["_dao"]) {
                console.log(filePath + " is not annotation");
                continue;
            }
            let name = (bean["_controller"] && bean["_controller"]["name"]) || (bean["_resource"] && bean["_resource"]["name"]) || (bean["_dao"] && bean["_dao"]["name"]);
            if (self["_bean"][name]) {
                console.error("bean[" + name + "] is repeat");
                return false;
            }
            self["_bean"][name] = bean;
        }
        // 将依赖依次注入
        for (let key in self["_bean"]) {
            let bean = self["_bean"][key];
            if (!bean["_autowired"]) {
                continue;
            }
            for (let m = 0; m < bean["_autowired"].length; ++m) {
                let autowiredName = bean["_autowired"][m]["descriptor"]["value"]["name"];
                if (!self["_bean"][autowiredName]) {
                    console.error("bean[" + autowiredName + "] is needed");
                    return false;
                }
                console.log("autowiredName", self["_bean"][autowiredName]);
                bean[autowiredName] = ()=> {
                    return self["_bean"][autowiredName];
                };
            }
        }
        // 生成路由
        for (let key in self["_bean"]) {
            let bean = self["_bean"][key];
            if (!bean["_controller"]) {
                continue;
            }
            if (!bean["_requestMapping"] || bean["_requestMapping"].length == 0) {
                continue;
            }
            let basePath = bean["_controller"]["basePath"] || "";
            for (let m = 0; m < bean["_requestMapping"].length; ++m) {
                let url = basePath + bean["_requestMapping"][m]["path"];
                let method = bean["_requestMapping"][m]["method"] || "all";
                console.log("listen", method, url);
                let route = {
                    regular: new RegExp(url),
                    method: bean["_requestMapping"][m]["method"],
                    dispach: bean["_requestMapping"][m]["descriptor"]["value"].bind(bean)
                };
                if (url == "*" || url == "/*") {
                    self["_defaultRoute"] = route;
                    continue;
                }
                self["_route"].push(route);
            }
        }
        app.all("*", (req, res)=> {
            let requestPath = req.url;
            let requestMethod = req.method.toLowerCase();
            res.header('Access-Control-Allow-Origin', req.headers.origin || req.headers.referer);
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("X-Powered-By", '3.2.1');
            console.log("request", requestPath, requestMethod);
            let isMatch = false;
            for (let index = 0; index < self["_route"].length; ++index) {
                let route = self["_route"][index];
                if (route["regular"].test(requestPath) && route["method"] == requestMethod) {
                    isMatch = true;
                    route["dispach"](req, res);
                    break;
                }
            }
            if (!isMatch) {
                if (self["_defaultRoute"]["dispach"]) {
                    self["_defaultRoute"]["dispach"](req, res);
                } else {
                    res.send("page not found");
                }
            }
        });
    }
}
module.exports = Context;