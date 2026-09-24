import express from "express";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});




let users = [
  {
    id: 1,
    name: "shruti",
    email: "shruti@gmail.com",
    age: 22
  },
  {
    id: 2,
    name: "suhana",
    email: "suhana@gmail.com",
    age: 21
  },
  {
    id: 3,
    name: "shreya",
    email: "shreya@gmail.com",
    age: 23
  }
];



const validateUser = (req, res, next) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      message: "Name, email and age are required"
    });
  }

  next();
};




app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});



app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json(user);
});



app.post("/api/users", validateUser, (req, res) => {
  const { name, email, age } = req.body;

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    age: Number(age)
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});




app.put("/api/users/:id", validateUser, (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  user.name = req.body.name;
  user.email = req.body.email;
  user.age = Number(req.body.age);

  res.status(200).json({
    message: "User updated successfully",
    user
  });
});




app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userExists = users.some((user) => user.id === id);

  if (!userExists) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users = users.filter((user) => user.id !== id);

  res.status(200).json({
    message: "User deleted successfully"
  });
});




app.get("/", (req, res) => {
  res.send("User Management API is running");
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});