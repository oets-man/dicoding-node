const fs = require("fs");
const { resolve } = require("path");

const fileReadCallback = (error, data) => {
	if (error) {
		throw error;
	}
	console.log(data);
};

fs.readFile(
	resolve(__dirname, "todo.txt"),
	{ encoding: "UTF-8" },
	fileReadCallback
);

/* 
stream
 */

const readableStream = fs.createReadStream(resolve(__dirname, "article.txt"), {
	highWaterMark: 10,
});

readableStream.on("readable", () => {
	try {
		process.stdout.write(`[${readableStream.read()}]`);
	} catch (error) {
		throw error;
	}
});

readableStream.on("end", () => {
	console.log("Done");
});
