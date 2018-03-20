"use strict"
let Promise = require("promise");
let UglifyJS = require('uglify-js');
let sqlObj = require("../sql/data");
let responseCode = require("../../../util/response-code");
let kv = require("../../../util/kv");
class Method {
    constructor(option) {
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

    pull() {
        let self = this;
        let query = self["req"]["query"];
        let cookies = self["req"]["cookies"];
        let platform = cookies["vvc_pn"] || cookies["pn"];
        let appVersion = parseInt(cookies["vvc_app_version"] || cookies["app_version"] || self.env["interface"]["minAppVersion"]);
        let include = query["include"] || "";
        console.log("pull-entry", platform, appVersion, include);
        platform = self._matchPackage(platform);
        if (!platform) {
            self["resolver"].output("");
            return false;
        }
        if (appVersion < self.env["interface"]["minAppVersion"] || appVersion > self.env["interface"]["maxAppVersion"]) {
            self["resolver"].output("");
            return false;
        }
        if (!include) {
            self["resolver"].output("");
            return false;
        }
        // 多个接口通过竖线分隔
        let includeArr = include.split("|");
        let codeStr = self._joinCode(includeArr);
        console.log("codeStr", codeStr);
        self.dao.prepareQuery({
            sql: sqlObj["load"],
            params: [codeStr, platform, appVersion, appVersion]
        }).then(function (results) {
            console.log(results.length);
            if (!results) {
                self["resolver"].output("");
                return false;
            }
            let js = "";
            for (let m = 0; m < results.length; ++m) {
                let result = UglifyJS.minify(results[m]["js"] + ";", {mangle: true});
                js += result.code;
            }
            self["resolver"].output(js);
        }, function (err) {
            console.log(err);
            self["resolver"].output("");
        });
    }
}
module.exports = Method;