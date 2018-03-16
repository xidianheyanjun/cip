/**
 * Created by Administrator on 2017/1/19.
 */
"use strict"

class Resolver {
    constructor(option) {
        this["req"] = option["req"];
        this["res"] = option["res"];
        this["log"] = option["log"];
    }

    output(data) {
        this["log"].info("output ---", data);
        this.res.send(data);
    }

    json(data) {
        this["log"].info("output json---", data);
        this.res.json(data);
    }

    ejs(viewName, viewData) {
        this["log"].info("output json---", viewName, viewData);
        this.res.render(viewName, viewData);
    }
}

module.exports = Resolver;