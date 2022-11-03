const handler = require('./handler');
const routes = [
	{
		method: 'POST',
		path: '/notes',
		handler: handler.addNote,
	},
	{
		method: 'GET',
		path: '/notes',
		handler: handler.getAllNotes,
	},
	{
		method: 'GET',
		path: '/notes/{id}',
		handler: handler.getNoteById,
	},
	{
		method: 'PUT',
		path: '/notes/{id}',
		handler: handler.editNoteById,
	},
	{
		method: 'DELETE',
		path: '/notes/{id}',
		handler: handler.deleteNoteById,
	},
];
module.exports = routes;
