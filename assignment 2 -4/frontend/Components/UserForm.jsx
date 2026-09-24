import { useState } from "react";

function UserForm({ onSubmit, initialUser }) {

  const [name, setName] = useState(initialUser?.name || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [age, setAge] = useState(initialUser?.age || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      age
    };

    onSubmit(user);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>

      <label>Name</label>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />


      <label>Email</label>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      <label>Age</label>

      <input
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />


      <button type="submit">
        {initialUser ? "Update User" : "Add User"}
      </button>

    </form>
  );
}

export default UserForm;