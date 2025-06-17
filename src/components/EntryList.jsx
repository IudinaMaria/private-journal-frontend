import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EntryList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/entries", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setEntries(res.data);
      } catch (err) {
        console.error("Ошибка загрузки записей:", err);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Мои записи</h1>
      {entries.length === 0 ? (
        <p className="text-gray-600">Записей пока нет.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li key={entry._id} className="border-b pb-2">
              <h3 className="text-lg font-semibold">{entry.title}</h3>
              <p className="text-sm text-gray-500">{new Date(entry.createdAt).toLocaleString()}</p>
              <Link
                to={`/entries/${entry._id}`}
                className="text-indigo-600 hover:underline text-sm"
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
