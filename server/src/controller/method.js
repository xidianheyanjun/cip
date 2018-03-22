"use strict";
let UglifyJS = require('uglify-js');
let Controller = require("../../di/web/annotation/Controller");
let RequestMapping = require("../../di/web/annotation/RequestMapping");
let Autowired = require("../../di/web/annotation/Autowired");
let sqlObj = require("../sql/method");
let kv = require("../../util/kv");
@Controller({
    name: "Method",
    basePath: "/native/method"
})
class Method {
    constructor(option) {
    }

    @Autowired
    cip() {
    }

    _matchPackage(platform) {
        for (let m = 0; m < kv["platform"].length; ++m) {
            if (platform == kv["platform"][m]["value"]) {
                return kv["platform"][m]["value"];
            }
        }
        return null;
    }

    _joinCode(arr) {
        let str = "";
        for (let m = 0; m < arr.length; ++m) {
            if (m > 0) {
                str += ",";
            }
            str += arr[m];
        }
        return str;
    }

    @RequestMapping({
        path: "/pull",
        method: "get"
    })
    pull(req, res) {
        /*
         var toast = function(text){
         var info = {
         info:{
         toast: text
         },
         webErrorCatch: "callback",
         localErrorCatch: "true"
         };
         return window.AppWebClient.invokeLocal("webToastShow", JSON.stringify(info));
         };
         */
        let self = this;
        let query = req["query"];
        let cookies = req["cookies"];
        let platform = cookies["vvc_pn"] || cookies["pn"];
        let appVersion = parseInt(cookies["vvc_app_version"] || cookies["app_version"]) || 1;
        let include = query["include"] || "";
        console.log("pull-entry", platform, appVersion, include);
        platform = self._matchPackage(platform);
        if (!platform) {
            res.send("");
            return false;
        }
        if (appVersion < 1 || appVersion > 9999999) {
            res.send("");
            return false;
        }
        if (!include) {
            res.send("");
            return false;
        }
        // 多个接口通过竖线分隔
        let includeArr = include.split("|");
        let codeStr = self._joinCode(includeArr);
        self.cip().prepareQuery({
            sql: sqlObj["load"],
            params: [codeStr, platform, appVersion, appVersion]
        }).then(function (results) {
            console.log("native method matched count", results.length);
            if (!results) {
                res.send("");
                return false;
            }
            let js = "";
            for (let m = 0; m < results.length; ++m) {
                let result = UglifyJS.minify(results[m]["js"] + ";", {mangle: true});
                js += result.code;
            }
            res.send(js);
        }, function (err) {
            console.log(err);
            res.send("");
        });
    }
}
module.exports = Method;