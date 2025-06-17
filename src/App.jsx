import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import PrivateJournal from "./PrivateJournal";
import Header from "./components/Header";
import LoginHistory from "./components/LoginHistory";
import EntryList from "./components/EntryList";
import EntryView from "./components/EntryView";
import CreateEntry from "./components/CreateEntry";
import EntryDetail from "./components/EntryDetail";
import About from "./components/About";
import { useState } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated && <Header onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/about" /> : <AuthForm onAuthSuccess={handleAuthSuccess} />}
        />
        <Route
          path="/entries"
          element={isAuthenticated ? <EntryList /> : <Navigate to="/" />}
        />
        <Route
          path="/create"
          element={isAuthenticated ? <CreateEntry /> : <Navigate to="/" />}
        />
        <Route
          path="/logins"
          element={isAuthenticated ? <LoginHistory /> : <Navigate to="/" />}
        />
        <Route
          path="/about"
          element={isAuthenticated ? <About /> : <Navigate to="/" />}
        />
        <Route path="/entries/:id" 
        element={<EntryView />} 
        />
         <Route path="/entries/:id" element={<EntryDetail />} />

      </Routes>
    </Router>
  );
}
