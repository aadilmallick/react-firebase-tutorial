import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";

// components
import Avatar from "./Avatar";

// styles
import "./OnlineUsers.css";

export default function OnlineUsers() {
  const { documents, error, loading } = useCollection("users");
  const { user: authUser } = useAuthContext();

  if (!authUser) {
    return null;
  }

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {loading && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
