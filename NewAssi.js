const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

/* -------------------- MONGODB CONNECTION -------------------- */
mongoose.connect("mongodb://127.0.0.1:27017/notesDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

/* -------------------- MODELS -------------------- */

// USER MODEL
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);

// NOTE MODEL
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String
});

const Note = mongoose.model("Note", noteSchema);

/* -------------------- USER ROUTES -------------------- */

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send({ message: "User not found" });

  res.send(user);
});

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!user) return res.status(404).send({ message: "User not found" });

  res.send(user);
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: "User deleted" });
});

/* -------------------- NOTE ROUTES -------------------- */

app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.send(notes);
});

app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).send(note);
});

app.get("/user-notes/:userId", async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId });
  res.send(notes);
});

app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.send({ message: "Note deleted" });
});

/* -------------------- EXTRA -------------------- */

app.get("/notes/count", async (req, res) => {
  const count = await Note.countDocuments();
  res.send({ total: count });
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  res.send({ total: Number(a) + Number(b) });
});

/* -------------------- SERVER -------------------- */

app.listen(3000, () => {
  console.log("Server running on port 4000");
});