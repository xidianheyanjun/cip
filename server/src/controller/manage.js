"use strict"
let Controller = require("../../di/web/annotation/Controller");
let RequestMapping = require("../../di/web/annotation/RequestMapping");
let Autowired = require("../../di/web/annotation/Autowired");
let sqlObj = require("../sql/manage");
let responseCode = require("../../util/response-code");
let kv = require("../../util/kv");
@Controller({
    name: "Manage",
    basePath: "/manage"
})
class Manage {
    constructor(option) {
    }

    @Autowired
    cip() {
    }

    @RequestMapping({
        path: "/list",
        method: "post"
    })
    list(req, res) {
        let self = this;
        let body = req["body"];
        let id = parseInt(body["id"]) || "";
        let platform = body["platform"] || "";
        let validPlatformFlag = self.validPlatform(platform);
        if (!validPlatformFlag) {
            res.json({
                code: responseCode["paramError"]["code"],
                msg: responseCode["paramError"]["msg"]
            });
            return false;
        }
        let minVersion = parseInt(body["minVersion"]) || 1;
        let maxVersion = parseInt(body["maxVersion"]) || 9999999;
        let code = body["code"] || "";
        let name = body["name"] || "";
        self.cip().prepareQuery({
            sql: sqlObj["list"],
            params: [("%" + id + "%"), ("%" + platform + "%"), ("%" + code + "%"), ("%" + name + "%"), minVersion, maxVersion]
        }).then(function (results) {
            console.log(results);
            res.json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"],
                data: results
            });
        }, function (err) {
            console.log(err);
            res.json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }

    @RequestMapping({
        path: "/remove",
        method: "post"
    })
    remove(req, res) {
        let self = this;
        let body = req["body"];
        let id = parseInt(body["id"]);
        self.cip().prepareQuery({
            sql: sqlObj["remove"],
            params: [id]
        }).then(function (results) {
            console.log(results);
            res.json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"]
            });
        }, function (err) {
            console.log(err);
            res.json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }

    @RequestMapping({
        path: "/load",
        method: "post"
    })
    load(req, res) {
        let self = this;
        let body = req["body"];
        let id = parseInt(body["id"]);
        self.cip().prepareQuery({
            sql: sqlObj["load"],
            params: [id]
        }).then(function (results) {
            console.log(results);
            res.json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"],
                data: results[0]
            });
        }, function (err) {
            console.log(err);
            res.json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }

    @RequestMapping({
        path: "/save",
        method: "post"
    })
    save(req, res) {
        let self = this;
        let body = req["body"];
        let id = parseInt(body["id"]);
        let platform = body["platform"] || "";
        let validPlatformFlag = self.validPlatform(platform);
        let minVersion = parseInt(body["minVersion"]);
        let maxVersion = parseInt(body["maxVersion"]);
        let code = body["code"];
        let name = body["name"];
        let js = body["js"];
        if (!validPlatformFlag || !minVersion || !maxVersion || !code || !name || !js) {
            res.json({
                code: responseCode["paramError"]["code"],
                msg: responseCode["paramError"]["msg"]
            });
            return false;
        }
        let sql = null;
        let params = null;
        if (id) {
            sql = sqlObj["update"];
            params = [code, name, platform, minVersion, maxVersion, js, id];
        } else {
            sql = sqlObj["insert"];
            params = [code, name, platform, minVersion, maxVersion, js];
        }
        self.cip().prepareQuery({
            sql: sql,
            params: params
        }).then(function (results) {
            console.log(results);
            res.json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"],
                data: {
                    id: results["insertId"]
                }
            });
        }, function (err) {
            console.log(err);
            res.json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }

    validPlatform(platform) {
        for (let m = 0; m < kv["platform"].length; ++m) {
            if (platform == kv["platform"][m]["value"]) {
                return true;
            }
        }
        return false;
    }
}
module.exports = Manage;