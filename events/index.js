const { EventEmitter } = require("events");
const a = (name) => console.log(`Halo ${name}`);
const b = (age) => console.log(`age ${age}`);

const birthdayEventListener = (name, age) => {
	a(name);
	b(age);
};

const myEventEmitter = new EventEmitter();
myEventEmitter.on("birthday", birthdayEventListener);
myEventEmitter.emit("birthday", "oets", 12);
