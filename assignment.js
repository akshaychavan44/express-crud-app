const express = require("express");
const app = express();

// Middleware 
app.use(express.json());

//Data Stores in Array Memory
const users = [
  { id: 1, name: "Amit", email: "amit@test.com" },
  { id: 2, name: "Riya", email: "riya@test.com" }
];

const notes = [
  { id: 1, title: "java principale", content: "inheritance, abstraction, encapsulation, polymorphism", userId: 1 },
  { id: 2, title: "Note 2", content: "Content 2", userId: 2 }
];

app.get("/users", (req, res) => {
  const allUsers = users;
  res.send(allUsers);
});

// Get single user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find(u => u.id ===Number(id));
  res.send(user);
});

function getUserById(id) {
  return users.find(u => u.id === id);
}

app.get("/notes/count", (req, res) => {
  const total = notes.length;
  res.send({ total });
});

async function fetchExternalData() {
   return { message: "mock data" };
 }

app.get("/external-data", async (req, res) => {
  try{
  const data =await fetchExternalData();
  res.send(data);
  }catch (error){
  res.status(500).send({message:"server error"})
  }
});

app.get("/notes", (req, res) => {
  if (notes.length=== 0) {
    console.log("No notes found");
  }
  res.send(notes);
});

//Generate uniqu id each time
function generateNoteId() {
  return Date.now();
}

app.post("/notes", (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content) {
   
    return res.status(400).send({
    message: "Title and content are required"});
  }

  const newNote = {
    id: generateNoteId(),
    title: title,
    content: content,
    userId: userId
  };

  notes.push(newNote);
  res.send(newNote);
});

//Create new note
app.post("/users", (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const newUser = { id, name, email };

  users.push(newUser);

  res.status(201).send(newUser);
});

//Delete nots by id
app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const noteIndex = notes.findIndex(n => n.id ===Number (id));

  if (noteIndex === -1) {
    return res.status(404).send({ message: "Note not found" });
  }

  notes.splice(noteIndex, 1);
  res.send({ message: "Note deleted" });
});

// Update user by ID
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { name,email } = req.body;

  const user = users.find(u => u.id == id);

   if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  
  user.name = name;
  user.email=email;

  res.send(user);
});


app.get("/user-notes/:userId", (req, res) => {
  const userId = req.params.userId;
  const userNotes = notes.filter(n => n.userId ===Number (userId));
  res.send(userNotes);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "123456") {
    res.send({ message: "Login successful" });
  } else {
    res.send({ message: "Invalid credentials" });
  }
});

// Get user profile by ID
app.get("/profile/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

   if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  const total = Number(a) + Number(b);
  res.send({ total });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});