var fs = require("fs");
var archiver = require("archiver");
var crypto = require("crypto");
var sourceFolder = process.argv[2];// 源目录
var targetFolder = process.argv[3];// 目标目录
var tmpZipName = "tmp.zip";// 临时zip包名称
var tmpZipPath = targetFolder + "/" + tmpZipName;//临时zip包路径
var sourceZipName = "dist.zip";
var createDir = function (path) {
  if (fs.existsSync(path)) {
    return false;
  }
  console.log("path is not exists", path);
  fs.mkdirSync(path);
};
var removeFile = function (path) {
  if (!fs.existsSync(path)) {
    return false;
  }
  console.log("file path is exists", path);
  fs.unlinkSync(path);
};
var formatDateProperty = function (value) {
  return (value < 10 ? "0" : "") + value;
};
var getCurrentTimestamp = function () {
  var date = new Date();
  var year = date.getFullYear();
  var month = formatDateProperty(date.getMonth() + 1);
  var day = formatDateProperty(date.getDate());
  var hour = formatDateProperty(date.getHours());
  var min = formatDateProperty(date.getMinutes());
  var sec = formatDateProperty(date.getSeconds());
  return "" + year + month + day + hour + min + sec;
};
var buildZip = function (files, output) {
  var archive = archiver("zip");
  archive.on("error", function (err) {
    throw err;
  });
  archive.pipe(output);
  console.log("start zip", files);
  archive.directory(sourceFolder, false);
  archive.finalize();
};
createDir(sourceFolder);
createDir(targetFolder);
removeFile(tmpZipPath);
console.log("start source folder", sourceFolder, "-->  target folder", targetFolder);
var output = fs.createWriteStream(targetFolder + "/" + tmpZipName);
buildZip(sourceFolder + "/*", output);
var outputDist = fs.createWriteStream(targetFolder + "/" + sourceZipName);
buildZip(sourceFolder + "/*", outputDist);
var currentTimestamp = getCurrentTimestamp();
console.log("currentTimestamp", currentTimestamp);
console.log("start compute zip md5");
var tmpZipData = fs.readFileSync(tmpZipPath);
var tmpZipDataMd5 = crypto.createHash("md5").update(tmpZipData, "utf-8").digest("hex");
console.log("end   compute zip md5", tmpZipDataMd5);
var targetZipName = currentTimestamp + "-" + tmpZipDataMd5 + ".zip";// 目标zip包名称
var targetZipPath = targetFolder + "/" + targetZipName;// 目标zip包路径
fs.renameSync(tmpZipPath, targetZipPath);
console.log("end   source folder", sourceFolder, "-->  target folder", targetFolder);
