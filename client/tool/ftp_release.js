var Connection = require("./Connection");
var config = require("./ftp_release_config");
console.log(config);
var connection = new Connection(config);
connection.executeShell(connection.replace(config.clean, {
  rootPath: config.rootPath,
  projectName: config.projectName
})).then(function () {
  return connection.pushFile(config.sourcePath, config.rootPath + "/" + config.projectName + "/dist.zip");
}, function (err) {
}).then(function () {
  return connection.executeShell(connection.replace(config.unzip, {
    rootPath: config.rootPath,
    projectName: config.projectName,
    zipPath: "dist.zip"
  }));
}, function (err) {
});
