/**
 * Created by Administrator on 2017/1/19.
 */
"use strict"
let path = require("path");
let fileUtils = require("./FileUtils");
let Resolver = require("./Resolver");
let Log = require("./Log");
let Dao = require("./Dao");
let responseCode = require("../util/response-code");
class Dispatcher {
    constructor(env) {
        let self = this;
        self["env"] = env;
        self["cacheController"] = {};
        // 获取controller文件路径
        let controllerModulePath = path.join(path.dirname(__dirname), self["env"]["init"]["modulePath"]);
        let controllerPathRegular = new RegExp(self["env"]["init"]["controllerPathRegular"]);
        let controllerPaths = fileUtils.listFilePath(controllerModulePath, controllerPathRegular);
        // 缓存controller
        controllerPaths.forEach(function (controllerPath) {
            let pathDivision = controllerPath.split(/[\/\.]/);
            let length = pathDivision.length;
            let moduleName = pathDivision[length - 4];
            let controllerName = pathDivision[length - 2];
            self["cacheController"][moduleName] = self["cacheController"][moduleName] || {};
            self["cacheController"][moduleName][controllerName] = require(controllerPath);
        });
        // 分发请求
        return function (req, res) {
            console.log(req.headers);
            res.header('Access-Control-Allow-Origin', req.headers.origin || req.headers.referer);
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("X-Powered-By", '3.2.1');
            res.header("Content-Type", "text/javascript;charset=utf-8");
            let log = new Log();
            let resolver = new Resolver({
                req: req,
                res: res,
                log: log
            });
            let urlPlaceHolder = self["env"]["urlPlaceHolder"];
            let moduleName = req["params"][urlPlaceHolder["moduleName"]];
            let controllerName = req["params"][urlPlaceHolder["controllerName"]];
            let methodName = req["params"][urlPlaceHolder["methodName"]];
            log.info("params", moduleName, controllerName, methodName);
            console.log(self["cacheController"]);
            if (!self["cacheController"][moduleName] || !self["cacheController"][moduleName][controllerName] || methodName.indexOf("_") == 0) {
                // 路径不存在
                log.info(["the path is not existed---/", moduleName, "/", controllerName].join(""));
                resolver.json({
                    code: responseCode["path"]["code"],
                    msg: responseCode["path"]["msg"]
                });
                return false;
            }
            let action = new self["cacheController"][moduleName][controllerName]();
            if (!action[methodName] || methodName == "constructor") {
                // 路径不存在
                log.info(["the path is not existed---/", moduleName, "/", controllerName, "/", methodName].join(""));
                resolver.json({
                    code: responseCode["path"]["code"],
                    msg: responseCode["path"]["msg"]
                });
                return false;
            }
            let dao = new Dao({
                log: log,
                page: env["page"],
                cfg: env["mysql"]
            });
            action["resolver"] = resolver;
            action["log"] = log;
            action["dao"] = dao;
            action["env"] = env;
            action["req"] = req;
            action["res"] = res;
            action[methodName]();
        };
    }
}
module.exports = Dispatcher;