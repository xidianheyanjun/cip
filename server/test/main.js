"use strict";
require("babel-register")({
    plugins: ["transform-decorators-legacy"]
});
require("babel-polyfill");
let obj = require("./test");