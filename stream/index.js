const fs = require("fs");
const { resolve } = require("path");
const readableStream = fs.createReadStream(resolve(__dirname, "input.txt"), {
	highWaterMark: 10,
});
const writeableStream = fs.WriteStream(resolve(__dirname, "output.txt"));
readableStream.on("readable", () => {
	try {
		// process.stdout.write(`${readableStream.read()}\n`);
		writeableStream.write(`${readableStream.read()}\n`);
	} catch (error) {
		throw error;
	}
});
