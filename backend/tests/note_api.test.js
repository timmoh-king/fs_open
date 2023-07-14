const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);

  expect(contents).toContain("async/await simplifies making async calls");
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  expect(response.body[0].content).toBe(
    "FrontEnd and BackEnd Software Development"
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});
