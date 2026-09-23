import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

let students = [
  { id: 1, name: 'shruti', age: 20, major: 'Computer Science' },
  { id: 2, name: 'shruti', age: 22, major: 'flat' },
  { id: 3, name: 'shruti', age: 21, major: 'dbms' },
  { id: 4, name: 'shruti', age: 23, major: 'technical' }
];


app.get('/students', (req, res) => {
  res.json(students);
});


app.post('/students', (req, res) => {
  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name: req.body.name,
    age: req.body.age,
    major: req.body.major
  };
  students.push(newStudent);
  res.status(201).json({ message: 'Student added successfully', student: newStudent });
});


app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students[index] = {
    ...students[index],
    name: req.body.name || students[index].name,
    age: req.body.age || students[index].age,
    major: req.body.major || students[index].major
  };

  res.json({ message: 'Student updated successfully', student: students[index] });
});


app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const deletedStudent = students.splice(index, 1);
  res.json({ message: 'Student deleted successfully', student: deletedStudent[0] });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});