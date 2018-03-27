"use strict";
let Promise = require("promise");
let path = require("path");
let fileUtils = require("../utils/FileUtils");
class Context {
    constructor(app, env) {
        let self = this;
        self["resourceType"] = ["_controller", "_resource", "_dao", "_filter", "_interceptor"];
        self["env"] = env;
        self["_class"] = self.cacheClass();
        self["_bean"] = self.initResource();
        // 创建全局过滤器和拦截器
        self.createGlobalOperate(["beforeRequest", "afterRequest"], ["Filter", "Interceptor"]);
        console.log(self["beforeRequestFilter"]);
        let routeObj = self.generateRoute();
        self.listenRequest({
            app: app,
            _route: routeObj["_route"],
            _defaultRoute: routeObj["_defaultRoute"]
        });
    }

    cacheClass() {
        let self = this;
        let env = self["env"] || {};
        let rootPath = path.join(path.dirname(__dirname), "../" + env["scanRootPath"]);
        let pathRegular = new RegExp(env["pathRegular"]);
        let filePathList = fileUtils.listFilePath(rootPath, pathRegular);
        console.log("initResource-filePathList", filePathList);
        let cacheClass = {};
        for (let m = 0; m < filePathList.length; ++m) {
            let filePath = filePathList[m];
            let Bean = require(filePath);
            if (!(Bean instanceof Function)) {
                console.log(filePath + " is not Function");
                continue;
            }
            let name = self.getBeanName(Bean);
            if (!name) {
                console.error("Bean name is null:" + filePath);
                continue;
            }
            if (cacheClass[name]) {
                console.error("Bean[" + name + "] is repeat");
                return false;
            }
            console.log("cache class[" + name + "]");
            console.log(Bean["prototype"]);
            cacheClass[name] = Bean;
        }
        return cacheClass;
    }

    getBeanName(Bean) {
        let self = this;
        for (let m = 0; m < self["resourceType"].length; ++m) {
            let type = self["resourceType"][m];
            if (Bean["prototype"][type] && Bean["prototype"][type]["name"]) {
                return Bean["prototype"][type]["name"];
            }
        }
        return null;
    }

    // 初始化bean
    getBean(beanName) {
        let self = this;
        let env = self["env"] || {};
        let _class = self["_class"] || {};
        if (!_class[beanName]) {
            console.error("class not found", beanName);
            return null;
        }
        if (_class[beanName]["prototype"]["_dao"]) {
            let configKey = _class[beanName]["prototype"]["_dao"]["configKey"];
            return new _class[beanName](env[configKey]);
        }
        return new _class[beanName];
    }

    // 初始化资源
    initResource() {
        let self = this;
        let _class = self["_class"] || {};
        let _bean = {};
        for (let key in _class) {
            let Bean = _class[key];
            let _autowired = Bean["prototype"]["_autowired"];
            console.log(_autowired);
            if (_autowired) {
                for (let m = 0; m < _autowired.length; ++m) {
                    let autowiredName = _autowired[m]["descriptor"]["value"]["name"];
                    if (!_class[autowiredName]) {
                        console.error("bean[" + autowiredName + "] is needed");
                        return false;
                    }
                    Bean["prototype"][autowiredName] = ()=> {
                        return self.getBean(autowiredName);
                    };
                }
            }
            _bean[key] = self.getBean(key);
        }
        return _bean;
    }

    createGlobalOperate(executeType, operateType) {
        let self = this;
        let env = self["env"] || {};
        let _bean = self["_bean"] || {};
        for (let m = 0; m < executeType.length; ++m) {
            for (let n = 0; n < operateType.length; ++n) {
                let chainName = executeType[m] + operateType[n];
                if (!env[chainName]) {
                    console.log("chain is null", chainName);
                    continue;
                }
                self[chainName] = self[chainName] || [];
                for (let index = 0; index < env[chainName].length; ++index) {
                    let name = env[chainName][index]["name"];
                    let bean = self.getBean(name);
                    if (!bean) {
                        continue;
                    }
                    self[chainName].push({
                        name: name,
                        path: env[chainName][index]["path"],
                        bean: bean
                    });
                }
            }
        }
    }

    // 生成路由
    generateRoute() {
        let self = this;
        let _bean = self["_bean"] || {};
        let obj = {
            _defaultRoute: {},
            _route: []
        };
        for (let key in _bean) {
            let bean = _bean[key];
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
                    obj["_defaultRoute"] = route;
                    continue;
                }
                obj["_route"].push(route);
            }
        }
        return obj;
    }

    // 监听请求
    listenRequest(option) {
        let self = this;
        let app = option["app"] || {};
        let _route = option["_route"] || [];
        let _defaultRoute = option["_defaultRoute"] || {};
        app.all("*", (req, res)=> {
            let requestPath = req.url;
            let requestMethod = req.method.toLowerCase();
            console.log("request", requestPath, requestMethod);
            // 支持异步过滤器 todo
            for (let m = 0; m < self["beforeRequestFilter"].length; ++m) {
                let filter = self["beforeRequestFilter"][m]["bean"]["filter"];
                if (filter) {
                    let flag = filter(req, res);
                    if (!flag) {
                        console.log("request is filtered by beforeRequestFilter", self["beforeRequestFilter"][m]["name"]);
                        return false;
                    }
                }
            }
            let isMatch = false;
            for (let index = 0; index < _route.length; ++index) {
                let route = _route[index];
                if (route["regular"].test(requestPath) && route["method"] == requestMethod) {
                    isMatch = true;
                    route["dispach"](req, res);
                    break;
                }
            }
            if (!isMatch) {
                if (_defaultRoute["dispach"]) {
                    _defaultRoute["dispach"](req, res);
                } else {
                    res.send("page not found");
                }
            }
        });
    }
}
module.exports = Context;