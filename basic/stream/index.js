const fs = require("fs");
const { resolve } = require("path");

const writableStream = fs.createWriteStream(resolve(__dirname, "output.txt"));
const readableStream = fs.createReadStream(resolve(__dirname, "input.txt"), {
	highWaterMark: 10,
});

readableStream.on("readable", () => {
	try {
		writableStream.write(`${readableStream.read()}\n`);
	} catch (error) {
		throw error;
	}
});

readableStream.on("end", () => {
	console.log("Done");
});
