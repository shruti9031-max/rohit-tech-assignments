import { Routes, Route, Link } from "react-router-dom";

import Users from "../Pages/Users";
import AddUser from "../Pages/AddUser";


function App() {
  return (
    <>
      <div className="main-page">

        <h1>User Management System</h1>

        <p>Manage users using CRUD operations</p>

        <div className="button-container">

          <Link to="/users" className="main-button">
            View Users
          </Link>

          <Link to="/add-user" className="main-button">
            Add User
          </Link>

        </div>

      </div>


      <Routes>

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/add-user"
          element={<AddUser />}
        />

      </Routes>


      <style>{`

        .main-page {
          text-align: center;
          padding-top: 100px;
        }

        .main-page h1 {
          font-size: 45px;
          margin-bottom: 15px;
        }

        .main-page p {
          font-size: 20px;
          color: #777;
          margin-bottom: 35px;
        }

        .button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
        }

        .main-button {
          display: inline-block;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 7px;
          font-size: 16px;
          font-weight: bold;
          transition: 0.2s;
        }

        .main-button:hover {
          background-color: #1d4ed8;
        }

      `}</style>

    </>
  );
}

export default App;