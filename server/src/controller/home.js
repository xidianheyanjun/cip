"use strict"
let Controller = require("../../di/web/annotation/Controller");
let RequestMapping = require("../../di/web/annotation/RequestMapping");
let Autowired = require("../../di/web/annotation/Autowired");
let sqlObj = require("../sql/home");
let responseCode = require("../../util/response-code");
@Controller({
    name: "Home",
    basePath: "/home"
})
class Home {
    constructor(option) {
    }

    @Autowired
    cip() {
    }

    @RequestMapping({
        path: "/info",
        method: "post"
    })
    list(req, res) {
        let self = this;
        self.cip().prepareQuery({
            sql: sqlObj["info"],
            params: []
        }).then(function (results) {
            console.log(results);
            res.json({
                code: responseCode["success"]["code"],
                msg: responseCode["success"]["msg"],
                data: {
                    interfaceNumber: results[0][0]["interfaceNumber"],
                    platformNumber: results[1][0]["platformNumber"]
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
}
module.exports = Home;