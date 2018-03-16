"use strict"

let http = require("http");
let session = require("express-session");

let FileUtils = require("./lib/FileUtils");
let envPath = "./env.json";// 配置文件地址
FileUtils.loadFileData(envPath).then(function (env) {
    let express = require('express');
    let path = require('path');
    let favicon = require('serve-favicon');
    let logger = require('morgan');
    let cookieParser = require('cookie-parser');
    let bodyParser = require('body-parser');
    let app = express();
    let Dispatcher = require("./lib/Dispatcher");

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    /*app.use(session({
     secret: 'keyboard cat',
     resave: false,
     saveUninitialized: true
     }));*/
    app.use(express.static(path.join(__dirname, 'public')));

    // 初始化分发器
    let dispatcher = new Dispatcher(env);
    app.all("/:src/:controller/:method", dispatcher);
    http.createServer(app).listen(env["init"]["port"], function () {
        console.log("Express server listening on port " + env["init"]["port"]);
    });
}, function (err) {
});