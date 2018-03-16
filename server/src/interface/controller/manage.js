"use strict"

let Promise = require("promise");

let sqlObj = require("../sql/data");
let responseCode = require("../../../util/response-code");

class Manage {
    constructor(option) {
    }

    list() {
        let self = this;
        let body = self["req"]["body"];
        let id = parseInt(body["id"]);
        let platform = body["platform"];
        let minVersion = parseInt(body["minVersion"]);
        let maxVersion = parseInt(body["maxVersion"]);
        let code = body["code"];
        let name = body["name"];
        self.dao.prepareQuery({
            sql: sqlObj["list"],
            params: [id, platform]
        }).then(function (results) {
            console.log(results);
            self["resolver"].json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"],
                data: results
            });
        }, function (err) {
            console.log(err);
            self["resolver"].json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }

    remove() {
        let self = this;
        let body = self["req"]["body"];
        let id = parseInt(body["id"]);
        self.dao.prepareQuery({
            sql: sqlObj["remove"],
            params: [id]
        }).then(function (results) {
            console.log(results);
            self["resolver"].json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"]
            });
        }, function (err) {
            console.log(err);
            self["resolver"].json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }

    load() {
        let self = this;
        let body = self["req"]["body"];
        let id = parseInt(body["id"]);
        self.dao.prepareQuery({
            sql: sqlObj["load"],
            params: [id]
        }).then(function (results) {
            console.log(results);
            self["resolver"].json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"],
                data: results[0]
            });
        }, function (err) {
            console.log(err);
            self["resolver"].json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }

    save() {
        let self = this;
        let body = self["req"]["body"];
        let id = parseInt(body["id"]);
        let platform = body["platform"];
        let minVersion = parseInt(body["minVersion"]);
        let maxVersion = parseInt(body["maxVersion"]);
        let code = body["code"];
        let name = body["name"];
        let js = body["js"];
        let sql = null;
        let params = null;
        if (id) {
            sql = sqlObj["update"];
            params = [code, name, platform, minVersion, maxVersion, js, id];
        } else {
            sql = sqlObj["insert"];
            params = [code, name, platform, minVersion, maxVersion, js];
        }
        self.dao.prepareQuery({
            sql: sql,
            params: params
        }).then(function (results) {
            console.log(results);
            self["resolver"].json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"],
                data: {
                    id: results["insertId"]
                }
            });
        }, function (err) {
            console.log(err);
            self["resolver"].json({
                code: responseCode["failure"]["code"],
                msg: responseCode["failure"]["msg"]
            });
        });
    }
}

module.exports = Manage;