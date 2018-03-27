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
        self.createGlobalChain(["beforeRequest", "afterRequest"], ["Filter", "Interceptor"]);
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
            console.log("_autowired of " + key, _autowired);
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

    createGlobalChain(executeType, operateType) {
        let self = this;
        let env = self["env"] || {};
        let _bean = self["_bean"] || {};
        for (let m = 0; m < executeType.length; ++m) {
            for (let n = 0; n < operateType.length; ++n) {
                let chainName = executeType[m] + "Chain";
                let envChainKey = executeType[m] + operateType[n];
                if (!env[envChainKey]) {
                    console.log("chain is null", envChainKey);
                    continue;
                }
                self[chainName] = self[chainName] || [];
                for (let index = 0; index < env[envChainKey].length; ++index) {
                    let name = env[envChainKey][index]["name"];
                    let bean = self.getBean(name);
                    if (!bean) {
                        continue;
                    }
                    let srcPath = env[envChainKey][index]["path"];
                    let path = srcPath.replace(/\*/g, ".*");
                    self[chainName].push({
                        name: name,
                        operateType: operateType[n],
                        path: new RegExp(path),
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

    executeChain(req, res, methodList, index) {
        if (index == methodList.length) {
            return new Promise((subResolve)=> {
                subResolve(true);
            });
            return false;
        }
        let self = this;
        let item = methodList[index];
        let requestPath = req.url;
        let path = item["path"];
        if (!path.test(requestPath)) {
            return self.executeChain(req, res, methodList, ++index);
        }
        let operateType = item["operateType"].toLowerCase();
        return new Promise((resolve)=> {
            console.log("start execute chain", operateType, item["name"]);
            item["bean"][operateType](req, res, resolve);
        }).then((result)=> {
            console.log("end   execute chain", operateType, item["name"], result);
            if (!result) {
                return new Promise((subResolve)=> {
                    subResolve(result);
                });
            }
            return self.executeChain(req, res, methodList, ++index);
        });
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
            // 请求前|过滤器拦截器链条|支持异步|true:通过,false:不通过
            self.executeChain(req, res, self["beforeRequestChain"], 0).then((result)=> {
                console.log("result", result);
                if (!result) {
                    return false;
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
        });
    }
}
module.exports = Context;