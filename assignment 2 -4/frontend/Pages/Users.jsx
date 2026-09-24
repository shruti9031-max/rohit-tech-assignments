import { useEffect, useState } from "react";
import UserCard from "../Components/UserCard";
import UserForm from "../Components/UserForm";



function fuzzyMatch(text, search) {

  text = text.toLowerCase();
  search = search.toLowerCase();

  let searchIndex = 0;

  for (let char of text) {

    if (char === search[searchIndex]) {
      searchIndex++;
    }

    if (searchIndex === search.length) {
      return true;
    }
  }

  return false;
}


function Users() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [editingUser, setEditingUser] = useState(null);




  const fetchUsers = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/users"
      );

      const data = await response.json();

      setUsers(data);

    } catch (error) {

      console.log(error);

    }
  };



  useEffect(() => {

    fetchUsers();

  }, []);



  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(search);

    }, 500);

    return () => clearTimeout(timer);

  }, [search]);




  const deleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);
        return;

      }

      alert("User deleted successfully");

      fetchUsers();

    } catch (error) {

      console.log(error);

    }
  };


 

  const updateUser = async (updatedUser) => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/users/${editingUser.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(updatedUser)
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);
        return;

      }

      alert("User updated successfully");

      setEditingUser(null);

      fetchUsers();

    } catch (error) {

      console.log(error);

    }
  };


  

  const filteredUsers = users.filter((user) => {

    if (!debouncedSearch) {
      return true;
    }

    return (
      fuzzyMatch(user.name, debouncedSearch) ||
      fuzzyMatch(user.email, debouncedSearch)
    );

  });


  return (
    <div className="page">

      <h1>Users</h1>


     

      <input
        className="search"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


   

      {editingUser && (

        <div className="edit-section">

          <h2>Edit User</h2>

          <UserForm
            initialUser={editingUser}
            onSubmit={updateUser}
          />

          <button
            className="cancel-btn"
            onClick={() => setEditingUser(null)}
          >
            Cancel
          </button>

        </div>

      )}


     

      <div className="users-container">

        {filteredUsers.length === 0 ? (

          <p>No users found.</p>

        ) : (

          filteredUsers.map((user) => (

            <UserCard
              key={user.id}
              user={user}
              onDelete={deleteUser}
              onEdit={setEditingUser}
            />

          ))

        )}

      </div>

    </div>
  );
}

export default Users;