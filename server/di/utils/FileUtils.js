"use strict"
let fs = require("fs");
let Promise = require("promise");
let FileUtils = {};
FileUtils.listFilePath = function (path, pathRegular) {
    let filePaths = [];
    if (!fs.existsSync(path)) {
        return filePaths;
    }
    let stat = fs.lstatSync(path);
    if (stat.isDirectory()) {
        // 如果是目录则获取文件列表继续递归
        let files = fs.readdirSync(path);
        files.forEach(function (file) {
            let controllerPaths = FileUtils.listFilePath(path + "/" + file, pathRegular);
            filePaths = filePaths.concat(controllerPaths);
        });
    } else {
        if (pathRegular) {
            if (pathRegular.test(path)) {
                filePaths.push(path);
            }
        } else {
            filePaths.push(path);
        }
    }
    return filePaths;
};
FileUtils.loadFileData = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, "utf-8", function (err, data) {
            if (err) {
                reject(err);
                return false;
            }
            let parseData = JSON.parse(data);
            resolve(parseData);
        });
    });
};
module.exports = FileUtils;