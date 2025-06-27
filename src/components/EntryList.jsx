import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function EntryList() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Если нет токена, перенаправляем пользователя на страницу входа
        setError("Вы не авторизованы. Пожалуйста, войдите.");
        navigate("/login"); // Предполагается, что у вас есть маршрут для входа
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/entries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEntries(res.data);
      } catch (err) {
        console.error("Ошибка загрузки записей:", err);
        setError("Не удалось загрузить записи. Попробуйте снова.");
      }
    };
    fetchEntries();
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Мои записи</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {entries.length === 0 ? (
        <p className="text-gray-600">Записей пока нет.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li key={entry._id} className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
              <p className="text-sm text-gray-500">{new Date(entry.createdAt).toLocaleString()}</p>
              <Link
                to={`/entries/${entry._id}`}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Просмотреть
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
