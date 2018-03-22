let RequestMapping = (option)=> {
    console.log("\tinject RequestMapping[" + option["path"] + "]");
    return (target, name, descriptor)=> {
        target["_requestMapping"] = target["_requestMapping"] || [];
        option["descriptor"] = descriptor;
        target["_requestMapping"].push(option);
        return descriptor;
    };
};
module.exports = RequestMapping;