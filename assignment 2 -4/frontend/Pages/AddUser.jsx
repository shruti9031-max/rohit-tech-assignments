import { useNavigate } from "react-router-dom";
import UserForm from "../Components/UserForm";

function AddUser() {

  const navigate = useNavigate();

  const addUser = async (user) => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(user)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("User added successfully");

      navigate("/users");

    } catch (error) {

      console.log(error);
      alert("Something went wrong");

    }
  };


  return (
    <div className="page">

      <h1>Add New User</h1>

      <UserForm onSubmit={addUser} />

    </div>
  );
}

export default AddUser;