const { nanoid } = require('nanoid');
const _ = require('lodash');
const books = require('./books');

const addBook = (request, h) => {
	const {
		name, year, author, summary, publisher, pageCount, readPage, reading,
	} = request.payload;
	const id = nanoid(16);
	const finished = pageCount === readPage;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;
	const newBook = {
		id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
	};

	// validate name
	if (typeof name === 'undefined') {
		return h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		}).code(400);
	}

	// validate page
	if (pageCount < readPage) {
		return h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
		}).code(400);
	}

	// valid => push
	books.push(newBook);
	const isSuccess = books.filter((book) => book.id === id).length > 0;
	if (isSuccess) {
		return h.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		}).code(201);
	}

	// fail
	return h.response({
		status: 'fail',
		message: 'Buku gagal ditambahkan',
	}).code(500);
};

const getAllBooks = (request, h) => {
	const isQuery = !_.isEmpty(request.query);

	// tanpa query paramater
	if (!isQuery) {
		return h.response({
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
		}).code(200);
	}

	// query = reading
	let { reading } = request.query;
	if (typeof reading !== 'undefined') {
		reading = reading === '1';
		return h.response({
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
		}).code(200);
	}

	// query = finished
	let { finished } = request.query;
	if (typeof finished !== 'undefined') {
		finished = finished === '1';
		return h.response({
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
		}).code(200);
	}

	// query = name
	const { name } = request.query;
	if (typeof name !== 'undefined') {
		return h.response({
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
		}).code(200);
	}

	// query tidak dikenal
	return h.response({
		status: 'fail',
		message: 'Query parameter tidak dikenal!',
	}).code(404);
};

const getBookById = (request, h) => {
	const { id } = request.params;
	const book = books.filter((n) => n.id === id)[0];
	if (book !== undefined) {
		return h.response({
			status: 'success',
			data: {
				book,
			},
		}).code(200);
	}

	// not found
	return h.response({
		status: 'fail',
		message: 'Buku tidak ditemukan',
	}).code(404);
};

const editBookById = (request, h) => {
	const { id } = request.params;
	const {
		name, year, author, summary, publisher, pageCount, readPage, reading,
	} = request.payload;

	if (typeof name === 'undefined') {
		return h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		}).code(400);
	}

	if (pageCount < readPage) {
		return h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
		}).code(400);
	}

	const updatedAt = new Date().toISOString();
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books[index] = {
			...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
		};
		return h.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
		}).code(200);
	}

	// not found
	return h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Id tidak ditemukan',
	}).code(404);
};

const deleteBookById = (request, h) => {
	const { id } = request.params;
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books.splice(index, 1);
		return h.response({
			status: 'success',
			message: 'Buku berhasil dihapus',
		}).code(200);
	}

	// not found
	return h.response({
		status: 'fail',
		message: 'Buku gagal dihapus. Id tidak ditemukan',
	}).code(404);
};

const handler = {
	addBook,
	getAllBooks,
	getBookById,
	editBookById,
	deleteBookById,
};
module.exports = handler;
