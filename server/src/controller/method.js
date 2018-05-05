"use strict";
let UglifyJS = require('uglify-js');
let Controller = require("../../di/web/annotation/Controller");
let RequestMapping = require("../../di/web/annotation/RequestMapping");
let Autowired = require("../../di/web/annotation/Autowired");
let sqlObj = require("../sql/method");
let platformFilePathList = [
    "../resource/platform/Appstore",
    "../resource/platform/Gamecenter",
    "../resource/platform/Space",
    "../resource/platform/Browser"
];
@Controller({
    name: "Method",
    basePath: "/method"
})
class Method {
    constructor(option) {
        // 生成平台链条
        this.platformList = [];
        for (let index = 0; index < platformFilePathList.length; ++index) {
            let Platform = require(platformFilePathList[index]);
            this.platformList.push(new Platform());
        }
    }

    @Autowired
    cip() {
    }

    @RequestMapping({
        path: "/test",
        method: "get"
    })
    test(req, res, name) {
        res.send(`param-${name}`);
    }

    @RequestMapping({
        path: "/pull",
        method: "get"
    })
    pull(req, res) {
        let self = this;
        let query = req["query"];
        let platform = self._matchPlatform(req);
        let platformName = platform.getPlatformName();
        let appVersion = platform.getVersion(req);
        let include = query["include"] || "";
        console.log("pull-entry", platformName, appVersion, include);
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
            params: [codeStr, platformName, appVersion, appVersion]
        }).then(function (results) {
            console.log("native method matched count", results.length);
            if (!results || results.length == 0) {
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

    _matchPlatform(req) {
        let self = this;
        for (let index = 0; index < self.platformList.length; ++index) {
            let platform = self.platformList[index];
            if (platform.isMatch(req)) {
                return platform;
            }
        }
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
}
module.exports = Method;