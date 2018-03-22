"use strict";
require("babel-register")({
    plugins: ["transform-decorators-legacy"]
});
require("babel-polyfill");
let http = require("http");
let FileUtils = require("./di/utils/FileUtils");
let envPath = "./env.json";// 配置文件地址
FileUtils.loadFileData(envPath).then(function (env) {
    let express = require('express');
    let path = require('path');
    let favicon = require('serve-favicon');
    let logger = require('morgan');
    let cookieParser = require('cookie-parser');
    let bodyParser = require('body-parser');
    let app = express();
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    let Context = require("./di/web/Context");
    let context = new Context(app, env);
    http.createServer(app).listen(env["port"], function () {
        console.log("\nExpress server listening on port " + env["port"]);
    });
}, function (err) {
});