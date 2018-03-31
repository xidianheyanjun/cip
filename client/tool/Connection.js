var Promise = require("es6-promise").Promise;
var Client = require('ssh2').Client;
var Connection = function (config) {
  this.config = config;
};
Connection.prototype.connect = function () {
  var self = this;
  console.log("connect server");
  return new Promise(function (resolve, reject) {
    var conn = new Client();
    conn.on("ready", function () {
      resolve(conn);
    }).connect(self.config.server);
  });
};
Connection.prototype.executeShell = function (command) {
  var self = this;
  console.log("execute command", command);
  return self.connect().then(function (conn) {
    return new Promise(function (resolve, reject) {
      var message = "";
      conn.shell(function (err, stream) {
        if (err) {
          console.error("executeShell err", err);
          conn.end();
          return false;
        }
        stream.on("close", function () {
          console.log("message", message);
          conn.end();
          resolve();
        }).on("data", function (data) {
          message += data;
        }).stderr.on("data", function (data) {
          console.log("data", data);
        });
        console.log("start execute");
        stream.end(command);
      });
    })
  }, function () {
  });
};
Connection.prototype.pushFile = function (sourcePath, targetPath) {
  var self = this;
  console.log("start push file", sourcePath, targetPath);
  return self.connect().then(function (conn) {
    return new Promise(function (resolve, reject) {
      conn.sftp(function (err, sftp) {
        if (err) {
          console.error("pushFile err", err);
          conn.end();
          return false;
        }
        sftp.fastPut(sourcePath, targetPath, function (errPush, result) {
          console.log("end  push file", result);
          if (errPush) {
            console.error("pushFile errPush", errPush);
            conn.end();
            return false;
          }
          conn.end();
          resolve(result);
        });
      });
    })
  }, function () {
  });
};
Connection.prototype.replace = function (strTpl, obj) {
  if (!strTpl || !obj) {
    return "";
  }
  var result = strTpl;
  for (var key in obj) {
    result = result.replace(new RegExp("({" + key + "})", "g"), obj[key]);
  }
  return result;
};
module.exports = Connection;
