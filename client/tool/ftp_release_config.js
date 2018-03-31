module.exports = {
  server: {
    host: "192.168.129.130",
    port: "22",
    username: "stfdvp",
    password: "stfdvp"
  },
  sourcePath: "./release/dist.zip",
  rootPath: "/home/stfdvp/dist",
  projectName: "cip",
  clean: `
    if [ ! -d {rootPath}/{projectName} ];then
      mkdir {rootPath}/{projectName}
    fi
    cd {rootPath}/{projectName}
    rm -rvf *\nexit\n
  `,
  unzip: `
    cd {rootPath}/{projectName}
    unzip {zipPath}\nexit\n
  `
};
