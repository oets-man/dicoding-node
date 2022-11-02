const routes = [
	{
		path: "/",
		method: "GET",
		handler: (request, h) => {
			console.log(request);
			return "Homepage";
		},
	},
	{
		method: "*",
		path: "/",
		handler: (request, h) => {
			return "Halaman tidak dapat diakses dengan method tersebut";
		},
	},
	{
		path: "/about",
		method: "GET",
		handler: (request, h) => {
			return "About Page";
		},
	},
	{
		method: "*",
		path: "/{any*}",
		handler: (request, h) => {
			return "Halaman tidak ditemukan";
		},
	},
	{
		// path parameter
		method: "GET",
		path: "/users/{username}/{dashboard?}",
		handler: (request, h) => {
			const { username } = request.params;
			const { dashboard = "my dashboard" } = request.params;
			return `Hello, ${username}, ${dashboard}!`;
		},
	},
	{
		// Query parameter
		method: "GET",
		path: "/hello",
		handler: (request, h) => {
			const { name, group } = request.query;
			return `Hello, ${name}, ${group}!`;
		},
	},
	{
		// Body/Payload Request
		method: "POST",
		path: "/login",
		handler: (request, h) => {
			if (!request.payload) {
				return h.response(`tentukan username dan password`).code(400);
			}
			const { username, password } = request.payload;
			if (!username || !password) {
				return h.response(`username dan/atau password diminta`).code(404);
			}
			return `Welcome ${username}!`;
		},
	},
];
module.exports = routes;
