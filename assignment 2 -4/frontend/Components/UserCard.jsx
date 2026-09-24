function UserCard({ user, onDelete, onEdit }) {
  return (
    <div className="user-card">

      <div className="avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <h2>{user.name}</h2>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Age:</strong> {user.age}
      </p>

      <div className="card-buttons">

        <button
          className="edit-btn"
          onClick={() => onEdit(user)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default UserCard;