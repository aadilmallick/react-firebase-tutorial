import { NavLink } from "react-router-dom";

// styles & images
import "./Sidebar.css";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Sidebar() {
  const { user, authLoading } = useAuthContext();
  if (!user) {
    return null;
  }
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {!authLoading && user && (
          <div className="user">
            <Avatar src={user.photoURL} />
            <p>Hey {user.displayName}</p>
          </div>
        )}

        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={""} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={""} />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
