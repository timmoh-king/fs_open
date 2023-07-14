const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  try {
    const notes = await Note.find({})
    response.status(200).json(notes)
  } catch (error) {
    next(error)
  }
});

notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    response.status(200).json(note)
  } catch (error) {
    next(error)
  }

});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  try {
    const newNote = await note.save()
    response.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
});

notesRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  try {
    const updateNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.status(200).json(updateNote)
  } catch (error) {
    next(error)
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = notesRouter;
