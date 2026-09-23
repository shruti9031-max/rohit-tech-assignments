

function App() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <div>
      <h1>Student Details</h1>
      {students.map((student) => (
        <p key={student.id}>
          {student.name} - {student.age} years old - {student.major}
        </p>
      ))}
    </div>
  );
}

export default App;