// import _ from "lodash";
// const myOddEvenArray = _.partition([1, 2, 3, 4, 5, 6], (n) => n % 2);
// console.log(myOddEvenArray);

import { EventEmitter } from "events";
const myEventEmitter = new EventEmitter();

const makeCoffee = ({ name }) => {
	console.log(`Kopi ${name} telah dibuat!`);
};
const makeBill = ({ price }) => {
	console.log(`Bill sebesar ${price} telah dibuat!`);
};

// myEventEmitter.on("coffee-order", makeCoffee);
// myEventEmitter.on("coffee-order", makeBill);

//undefined ??
const onCoffeeOrderedListener = ({ name, price }) => {
	makeCoffee({ name });
	makeBill({ price });
};
myEventEmitter.on("coffee-order", onCoffeeOrderedListener);

myEventEmitter.emit("coffee-order", { name: "Tubruk", price: 15000 });
