let Filter = (option)=> {
    console.log("inject Filter[" + option["name"] + "] start");
    return (target)=> {
        target.prototype._filter = option;
        console.log("inject Filter[" + option["name"] + "] end");
    };
};
module.exports = Filter;