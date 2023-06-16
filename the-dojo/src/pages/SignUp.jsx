import React from "react";
import { useState } from "react";
import "./SignUp.css";
import { useSignUp } from "../hooks/useSignUp";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUpload } from "../hooks/useUpload";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const { signup, isLoading, updateUserProfile } = useSignUp(
    email,
    password,
    displayName
  );
  const { login: authLogin } = useAuthContext();
  const { uploadFile } = useUpload("thumbnails");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await signup();
      const url = await uploadFile(thumbnail);
      await updateUserProfile(null, url);
      authLogin(user);
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        online: true,
        displayName,
        photoURL: url,
      });
      console.log("successfully signed up");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>sign up</h2>
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
      <label>
        <span>display name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input
          required
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setThumbnail(file);
          }}
        />
      </label>
      <button className="btn">Sign up</button>
    </form>
  );
};
