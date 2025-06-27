import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context"; // Хук для работы с авторизацией
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import LoginHistory from "./components/LoginHistory";
import EntryList from "./components/EntryList";
import EntryView from "./components/EntryView";
import CreateEntry from "./components/CreateEntry";
import About from "./components/About";
import { useState } from "react";

// Защищенный маршрут, который проверяет, авторизован ли пользователь
function ProtectedRoute({ children }) {
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/" />; // Если пользователь не авторизован, перенаправляем на страницу входа
  }
  return children; // Если авторизован, показываем защищенную страницу
}

export default function App() {
  const auth = useAuth();

  const handleLogout = () => {
    auth.removeUser(); // Удаляем пользователя при выходе
  };

  if (auth.isLoading) {
    return <div>Загрузка...</div>; // Можно улучшить, добавив анимацию или спиннер
  }

  if (auth.error) {
    return <div>Ошибка: {auth.error.message}</div>;
  }

  return (
    <Router>
      {/* Заголовок будет отображаться только если пользователь авторизован */}
      {auth.isAuthenticated && <Header onLogout={handleLogout} />}
      <Routes>
        {/* Страница входа */}
        <Route
          path="/"
          element={auth.isAuthenticated ? <Navigate to="/about" /> : <AuthForm />}
        />
        {/* Защищенные маршруты */}
        <Route
          path="/entries"
          element={<ProtectedRoute><EntryList /></ProtectedRoute>}
        />
        <Route
          path="/create"
          element={<ProtectedRoute><CreateEntry /></ProtectedRoute>}
        />
        <Route
          path="/logins"
          element={<ProtectedRoute><LoginHistory /></ProtectedRoute>}
        />
        <Route
          path="/about"
          element={<ProtectedRoute><About /></ProtectedRoute>}
        />
        {/* Используем один маршрут для EntryView */}
        <Route
          path="/entries/:id"
          element={<ProtectedRoute><EntryView /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}
