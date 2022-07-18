const {
  addNoteHandlers,
  getAllNotesHandlers,
  getNotesById,
  editNotesHandlers,
  deleteNotesByIdHandlers,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandlers,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandlers,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotesById,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNotesHandlers,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotesByIdHandlers,
  },
];

module.exports = routes;
