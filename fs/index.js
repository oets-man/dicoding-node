const fs = require("fs");
const { resolve } = require("path");
/**
 * @read
 */

// const fileReadCallback = (error, data) => {
// 	if (error) {
// 		throw error;
// 	}
// 	console.log(data);
// };

// fs.readFile(
// 	resolve(__dirname, "todo.txt"),
// 	{ encoding: "UTF-8" },
// 	fileReadCallback
// );

/**
 * @read
 * @stream
 */

// const readableStream = fs.createReadStream(resolve(__dirname, "article.txt"), {
// 	highWaterMark: 10,
// });

// readableStream.on("readable", () => {
// 	try {
// 		process.stdout.write(`[${readableStream.read()}]`);
// 	} catch (error) {
// 		throw error;
// 	}
// });

// readableStream.on("end", () => {
// 	console.log("Done");
// });

/**
 * @stream
 * @write
 */

const writeableStream = fs.WriteStream(resolve(__dirname, "output.txt"));
writeableStream.write("Ini merupakan teks baris pertama!\n");
writeableStream.write("Ini merupakan teks baris kedua!\n");
writeableStream.write("Ini merupakan teks baris ketiga!\n");
writeableStream.end("Akhir dari writable stream!");
