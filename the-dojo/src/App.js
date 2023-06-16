import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Create } from "./pages/Create";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Project } from "./pages/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { AuthContextProvider } from "./context/AuthContext";
import OnlineUsers from "./components/OnlineUsers";
function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<Create />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/projects/:id" element={<Project />} />
            </Routes>
          </div>
          <OnlineUsers />
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;
