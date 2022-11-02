const http = require("http");

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */
const requestListener = (request, response) => {
	const { method, url } = request;
	// response.setHeader("Content-Type", "text/html");
	response.setHeader("Content-Type", "application/json");
	response.setHeader("X-Powered-By", "NodeJS");

	response.statusCode = 200;
	if (method == "GET" && url === "/") {
		response.end(`<h1>Halo HTTP ${method}</h1>`);
	}
	if (method === "POST") {
		let body = [];

		request.on("data", (chunk) => {
			body.push(chunk);
		});

		request.on("end", () => {
			body = Buffer.concat(body).toString();
			const { name } = JSON.parse(body);
			response.end(`<h1>Hai, ${name}!</h1>`);
		});
	}

	//else all
	response.statusCode = 404;
	// response.write("<html>");
	// response.write("<body>");
	// response.write("<h1>Halaman tidak ditemukan!</h1>");
	// response.write("</body>");
	// response.write("</html>");
	// response.end();
	response.end(
		JSON.stringify({
			message: "Halaman tidak ditemukan!",
		})
	);
};

const server = http.createServer(requestListener);

// Method listen() dapat menerima 4 parameter, berikut detailnya:

// port (number) : jalur yang digunakan untuk mengakses HTTP server.
// hostname (string) : nama domain yang digunakan oleh HTTP server.
// backlog (number) : maksimal koneksi yang dapat ditunda (pending) pada HTTP server.
// listeningListener (function) : callback yang akan terpanggil ketika HTTP server sedang bekerja (listening).

const port = 5500;
const host = "localhost";
server.listen(port, host, () => {
	console.log(`Server berjalan pada http://${host}:${port}`);
});
// server.listen(5500);
