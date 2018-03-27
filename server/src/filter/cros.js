"use strict";
let Filter = require("../../di/web/annotation/Filter");
@Filter({
    name: "Cros"
})
class Cros {
    filter(req, res, resolve) {
        res.header('Access-Control-Allow-Origin', req.headers.origin || req.headers.referer);
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("X-Powered-By", '3.2.1');
        resolve(true);
    }
}
module.exports = Cros;