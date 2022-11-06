const { nanoid } = require('nanoid');
const _ = require('lodash');
const books = require('./books');

const addBook = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;
	const id = nanoid(16);
	const finished = pageCount === readPage;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;
	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt,
	};

	if (typeof name === 'undefined') {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}

	if (pageCount < readPage) {
		const response = h.response({
			status: 'fail',
			message:
				'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
		});
		response.code(400);
		return response;
	}

	books.push(newBook);
	const isSuccess = books.filter((book) => book.id === id).length > 0;
	if (isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		});
		response.code(201);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Buku gagal ditambahkan',
	});
	response.code(500);
	return response;
};

const getAllBooks = (request, h) => {
	const isQuery = !_.isEmpty(request.query);

	// tanpa query paramater
	if (!isQuery) {
		const response = h.response({
			status: 'success',
			data: {
				books: books.map((book) => {
					const container = {};
					container.id = book.id;
					container.name = book.name;
					container.publisher = book.publisher;
					return container;
				}),
			},
		});
		return response;
	}

	// query = reading
	let { reading } = request.query;
	if (typeof reading !== 'undefined') {
		reading = reading === '1';
		const response = h.response({
			status: 'success',
			data: {
				books: books
					.filter((book) => book.reading === reading)
					.map((book) => {
						const container = {};
						container.id = book.id;
						container.name = book.name;
						container.publisher = book.publisher;
						return container;
					}),
			},
		});
		return response;
	}

	// query = finished
	let { finished } = request.query;
	if (typeof finished !== 'undefined') {
		finished = finished === '1';
		const response = h.response({
			status: 'success',
			data: {
				books: books
					.filter((book) => book.finished === finished)
					.map((book) => {
						const container = {};
						container.id = book.id;
						container.name = book.name;
						container.publisher = book.publisher;
						return container;
					}),
			},
		});
		return response;
	}

	// query = name
	const { name } = request.query;
	if (typeof name !== 'undefined') {
		const response = h.response({
			status: 'success',
			data: {
				books: books
					.filter((v) => v.name.toLowerCase().indexOf(name.toLowerCase()) >= 0)
					.map((book) => {
						const container = {};
						container.id = book.id;
						container.name = book.name;
						container.publisher = book.publisher;
						return container;
					}),
			},
		});
		return response;
	}

	// query tidak dikenal
	return h
		.response({
			status: 'fail',
			message: 'Query parameter tidak dikenal!',
		})
		.code(404);
};

const getBookById = (request, h) => {
	const { id } = request.params;
	const book = books.filter((n) => n.id === id)[0];

	if (book !== undefined) {
		return {
			status: 'success',
			data: {
				book,
			},
		};
	}
	const response = h.response({
		status: 'fail',
		message: 'Buku tidak ditemukan',
	});
	response.code(404);
	return response;
};

const editBookById = (request, h) => {
	const { id } = request.params;
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	if (typeof name === 'undefined') {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}
	if (pageCount < readPage) {
		const response = h.response({
			status: 'fail',
			message:
				'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
		});
		response.code(400);
		return response;
	}
	const updatedAt = new Date().toISOString();
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			updatedAt,
		};
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
		});
		response.code(200);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};
const deleteBookById = (request, h) => {
	const { id } = request.params;
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil dihapus',
		});
		response.code(200);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Buku gagal dihapus. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

const handler = {
	addBook,
	getAllBooks,
	getBookById,
	editBookById,
	deleteBookById,
};
module.exports = handler;
