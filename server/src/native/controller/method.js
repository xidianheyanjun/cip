"use strict"

let Promise = require("promise");

let sqlObj = require("../sql/data");
let responseCode = require("../../../util/response-code");

class Method {
    constructor(option) {
    }

    pull() {
        let self = this;
        let query = self["req"]["query"];
        let cookies = self["req"]["cookies"];
        console.log(self["req"]["cookies"]);
        self["resolver"].output("console.log(1111);");
    }
}

module.exports = Method;