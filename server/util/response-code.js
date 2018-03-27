let obj = {
    success: {
        code: 0,
        msg: "成功"
    },
    failure: {
        code: 1,
        msg: "服务器繁忙"
    },
    login: {
        code: 1001,
        msg: "账号不存在或密码错误"
    },
    auth: {
        code: 403,
        msg: "尚未登录"
    },
    path: {
        code: 404,
        msg: "接口不存在"
    },
    paramError: {
        code: 601,
        msg: "参数错误"
    }
};
module.exports = obj;