const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandlers = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNotes = {
    title, tags, body, id, createdAt, updateAt,
  };

  notes.push(newNotes);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'sussess',
      message: 'notes berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'note gagal ditambahkan',
  });
  response.status(500);
  return response;
};

const getAllNotesHandlers = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNotesById = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNotesHandlers = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updateAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Notes berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Notes tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNotesByIdHandlers = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Notes berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Notes tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandlers,
  getAllNotesHandlers,
  getNotesById,
  editNotesHandlers,
  deleteNotesByIdHandlers,
};
