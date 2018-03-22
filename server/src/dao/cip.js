"use strict";
let BaseDao = require("../../di/web/dao/BaseDao");
let Dao = require("../../di/web/annotation/Dao");
@Dao({
    name: "cip",
    configKey: "cip"
})
class Cip extends BaseDao {
}
module.exports = Cip;