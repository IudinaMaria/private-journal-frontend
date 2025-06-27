import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null означает "ожидание"
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}
