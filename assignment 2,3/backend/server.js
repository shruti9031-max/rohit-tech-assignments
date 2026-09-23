import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use (cors());
app.use (express.json());

let users = [
    {
id:1,
name: "shruti singh",
email:"shruti@gmail.com"
    },

    {
        id:2,
        name:"suhana srivastava",
        email:"suhana@gmail.com"

    },

    {
        id:3,
        name:"shreya rani",
        email:"shreya@gmail.com"
    }
];

app.get('/api/users',(req,res) =>{
    res.json(users);
});

app.get('/api/users/:id',(req,res) =>{
    const user = users.find(u => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).json ({message:"user not found"});
 res.json(user)
});

app.post('/api/users',(re,res)=>{3
    const newUser ={
       id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    email: req.body.email
    };
    users.push(newUser);
    res.json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
});

app.delete('/api/users',(req,res)=>{
    users = users.filter (u=> u.id === parseInt(req.params.id));
    res.json({message:"user deleted successfully"});
});

app.listen (PORT,()=>{
    console.log(`server running on http://localhost${PORT}`);
});