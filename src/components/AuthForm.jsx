import { useState } from "react";
import { useAuth } from "react-oidc-context";

export default function AuthForm({ onAuthSuccess }) {
  const [error, setError] = useState("");
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Инициализация аутентификации через Cognito
      await auth.signinRedirect(); // Перенаправление на страницу входа Cognito
    } catch (err) {
      setError("Ошибка при авторизации");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Вход
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
