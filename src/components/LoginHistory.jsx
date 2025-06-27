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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">История входов</h2>
      
      {/* Загрузка или ошибка */}
      {loading && <p className="text-gray-500">Загрузка...</p>}
      {error && <p className="text-red-600">{error}</p>}
      
      {/* Если нет данных */}
      {logins.length === 0 && !loading && !error && (
        <p className="text-gray-500">Нет данных о входах.</p>
      )}

      <ul className="space-y-4">
        {logins.map((login, index) => (
          <li
            key={index}
            className="p-4 border border-gray-200 rounded bg-gray-50 hover:bg-gray-100 transition"
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
