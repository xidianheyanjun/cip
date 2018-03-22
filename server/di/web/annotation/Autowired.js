let Autowired = (target, name, descriptor)=> {
    target["_autowired"] = target["_autowired"] || [];
    target["_autowired"].push({
        name: name,
        descriptor: descriptor
    });
    return descriptor;
};
module.exports = Autowired;