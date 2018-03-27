let descratorClass = (target)=> {
    console.log("descrator class start");
    target.prototype.say = (message)=> {
        console.log(message);
    };
};
let descratorMethod = (target, name, descriptor)=> {
    console.log("descrator method start");
    descriptor.value = (food)=> {
        console.log(`I like ${food}`);
    };
};
@descratorClass
class User {
    constructor(name) {
        this.name = name;
    }

    @descratorMethod
    eat(food) {
        console.log(`I'm eating ${food}`);
    }
}
let user = new User();
user.say("hello world!");
user.eat("apple");
module.exports = {};