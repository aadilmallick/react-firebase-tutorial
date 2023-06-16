import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from "../hooks/useSignOut.js";
// styles & images
import "./Navbar.css";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export default function Navbar() {
  const { logout, isLoading } = useSignOut();
  const { user, logout: authLogout, authLoading } = useAuthContext();
  const navigate = useNavigate();
  const onLogout = async () => {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, { online: false });
    await logout();
    authLogout();
    console.log("successfully logged out");
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src="#" alt="dojo logo" />
          <span>The Dojo</span>
        </li>
        {authLoading && <h1>Loading</h1>}
        {!user && !authLoading && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && !authLoading && (
          <li>
            <button className="btn" onClick={onLogout}>
              {isLoading ? "Loading..." : "Logout"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
