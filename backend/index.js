const Note = require("./models/note");
const express = require("express");
const cors = require("cors");
const note = require("./models/note");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.put("/api/notes/:id", (request, response) => {
  if (request.params.id === null) {
    return response.status(400).json({ error: "Id missing" });
  }
  const id = request.params.id
  const body = request.body;
  Note.findByIdAndUpdate(id, {body})
});

app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id).then((note) => {
    response.json(note);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
