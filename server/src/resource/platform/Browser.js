"use strict";
class Browser {
    constructor(option) {
        this.platformName = "browser";
    }

    isMatch(req) {
        return true;
    }

    getPlatformName() {
        return this.platformName;
    }

    getVersion(req) {
        return 1;
    }
}
module.exports = Browser;