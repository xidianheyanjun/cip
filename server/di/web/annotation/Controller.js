let Controller = (option)=> {
    console.log("inject Controller[" + option["name"] + "] start");
    return (target)=> {
        target.prototype._controller = option;
        console.log("inject Controller[" + option["name"] + "] end");
    };
};
module.exports = Controller;