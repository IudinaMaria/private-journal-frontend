import { useState } from "react";
import axios from "axios";

export default function AuthForm({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Заполните все поля");
      return;
    }

    const endpoint = isRegister ? "/api/register" : "/api/login";

    try {
      const res = await axios.post(
        `http://private-journal-backend-env.eba-kam8nf3e.eu-north-1.elasticbeanstalk.com${endpoint}`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

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
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full border px-4 py-2 rounded"
            autocomplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
          <span
            className="text-indigo-600 cursor-pointer"
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
