"use strict";
let Promise = require("promise");
let mysql = require("mysql");
class BaseDao {
    constructor(config) {
        console.log(config);
        let setting = Object.assign({
            connectionLimit: 100,
            multipleStatements: true
        }, config);
        this.pool = mysql.createPool(setting);
    }

    prepareQuery(option) {
        let self = this;
        return new Promise(function (resolve, reject) {
            let sql = option["sql"] || "";
            let params = option["params"] || [];
            self.pool.query(sql, params, (error, results, fields)=> {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(results);
            });
        });
    }
}
module.exports = BaseDao;