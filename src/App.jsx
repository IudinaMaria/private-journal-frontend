import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import LoginHistory from "./components/LoginHistory";
import EntryList from "./components/EntryList";
import EntryView from "./components/EntryView";
import CreateEntry from "./components/CreateEntry";
import About from "./components/About";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

import './index.css';
import './App.css';

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Ошибка выхода:", err);
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <Router>
      {isAuthenticated && <Header onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/about" /> : <AuthForm />}
        />
        <Route
          path="/entries"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><EntryList /></ProtectedRoute>}
        />
        <Route
          path="/create"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><CreateEntry /></ProtectedRoute>}
        />
        <Route
          path="/logins"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><LoginHistory /></ProtectedRoute>}
        />
        <Route
          path="/about"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><About /></ProtectedRoute>}
        />
        <Route
          path="/entries/:id"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}><EntryView /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}
