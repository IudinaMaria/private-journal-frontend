import { useState } from "react";
import axios from "axios";

export default function AuthForm({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/api/register" : "/api/login";

    try {
      const res = await axios.post(`http://localhost:3001${endpoint}`, {
        email,
        password,
      });

      if (!isRegister && res.data.token) {
        localStorage.setItem("token", res.data.token);
        onAuthSuccess();
      }

      if (isRegister) {
        alert("Регистрация успешна! Теперь войдите.");
        setIsRegister(false);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка при авторизации");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          {isRegister ? "Регистрация" : "Вход"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
          >
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}
          <span
            className="text-indigo-600 cursor-pointer ml-1 hover:underline"
            onClick={() => {
              setError("");
              setIsRegister(!isRegister);
            }}
          >
            {isRegister ? "Войти" : "Зарегистрироваться"}
          </span>
        </p>
      </div>
    </div>
  );
}
