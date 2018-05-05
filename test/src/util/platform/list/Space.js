"use strict";
class Space {
    constructor(option) {
        this.platformName = "com.vivo.space";
    }

    isMatch(req) {
        let cookies = req["cookies"] || {};
        let packageName = cookies["vvc_pn"] || cookies["pn"] || "";
        if (packageName == this.platformName) {
            return true;
        }
        return false;
    }

    getPlatformName() {
        return this.platformName;
    }

    getVersion(req) {
        let cookies = req["cookies"];
        return parseInt(cookies["vvc_app_version"] || cookies["app_version"]) || 1;
    }
}
module.exports = Space;