let Resource = (option)=> {
    console.log("inject Resource[" + option["name"] + "] start");
    return (target)=> {
        target.prototype._resource = option;
        console.log("inject Resource[" + option["name"] + "] end");
    };
};
module.exports = Resource;