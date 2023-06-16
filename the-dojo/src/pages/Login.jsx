import { useState } from "react";
import { useSignIn } from "../hooks/useSignIn";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

// styles
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, login, isError } = useSignIn(email, password);
  const { login: authLogin } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const user = await login();
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, { online: true });
    console.log("success logging in");
    authLogin(user);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button className="btn">Log in</button>
      {isError}
    </form>
  );
}
