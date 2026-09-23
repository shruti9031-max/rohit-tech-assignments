import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email };

    if (editId) {
    
      fetch(`http://localhost:5000/api/users/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(() => {
        setEditId(null);
        setName('');
        setEmail('');
        fetchUsers();
      });
    } else {
         fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(() => {
        setName('');
        setEmail('');
        fetchUsers();
      });
    }
  };

 
  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

 
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE'
    }).then(() => fetchUsers());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Simple User Management</h2>

    
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Enter Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          style={{ marginLeft: '10px' }}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>
          {editId ? 'Update' : 'Add'} User
        </button>
      </form>

      <h3>User List</h3>
      <div>
        {users.map(user => (
          <div key={user.id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0', width: '250px' }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;