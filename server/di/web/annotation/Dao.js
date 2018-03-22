let Dao = (option)=> {
    console.log("inject Dao[" + option["name"] + "] start");
    return (target)=> {
        target.prototype._dao = option;
        console.log("inject Dao[" + option["name"] + "] end");
    };
};
module.exports = Dao;