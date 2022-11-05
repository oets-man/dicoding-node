const { nanoid } = require('nanoid');
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
	const finished = pageCount === readPage ? true : false;
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

	if (typeof name == 'undefined') {
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

const getAllBooks = () => ({
	status: 'success',
	data: {
		books: books.map((item) => {
			const container = {};
			container.id = item.id;
			container.name = item.name;
			container.publisher = item.publisher;
			return container;
		}),
	},
});

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
	const { title, tags, body } = request.payload;
	const updatedAt = new Date().toISOString();
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books[index] = {
			...books[index],
			title,
			tags,
			body,
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
