/**
 * Created by Administrator on 2017/3/23.
 */
let fs = require("fs");
console.log("read source file[", process.argv[2], "]");
let source = fs.readFileSync(process.argv[2]);
fs.writeFileSync(process.argv[3], source);
console.log("copy to target file[", process.argv[3], "]:success");
