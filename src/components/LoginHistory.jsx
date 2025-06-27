import { useEffect, useState } from "react";
import axios from "axios";

export default function LoginHistory() {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogins = async () => {
      try {
        setLoading(true); // Начало загрузки
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/security/logins`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogins(res.data);
      } catch (err) {
        setError("Ошибка загрузки истории входов. Пожалуйста, попробуйте позже.");
        console.error("Ошибка загрузки истории входов:", err);
      } finally {
        setLoading(false); // Завершение загрузки
      }
    };

    fetchLogins();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">История входов</h2>

      {/* Загрузка или ошибка */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin border-4 border-indigo-600 border-t-transparent w-8 h-8 rounded-full"></div>
        </div>
      )}

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Если нет данных */}
      {logins.length === 0 && !loading && !error && (
        <p className="text-gray-500">Нет данных о входах.</p>
      )}

      <ul className="space-y-4">
        {logins.map((login) => (
          <li
            key={login._id || login.timestamp} // Используем _id или timestamp как уникальный ключ
            className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <p className="text-sm text-gray-800">
              <span className="font-semibold">IP:</span> {login.ip}
            </p>
            <p className="text-sm text-gray-800">
              <span className="font-semibold">Устройство:</span> {login.userAgent}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Дата:</span>{" "}
              {new Date(login.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
