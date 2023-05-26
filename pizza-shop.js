const EventEmitter = require("node:events")
class pizzashop extends EventEmitter{
    constructor() {
        super();  //Inheritance
        this.orderNumber = 0;
    }

    order(sizee, topping) {
        this.orderNumber++;
        this.emit("order", sizee, topping);
    }

    displayordernum() {
        console.log(`Current order number : ${this.orderNumber}`);
    }
}

module.exports = pizzashop;