import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function EntryView() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [decryptedContent, setDecryptedContent] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://private-journal-backend-env.eba-kam8nf3e.eu-north-1.elasticbeanstalk.com/api/entries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntry(res.data);
        setEditTitle(res.data.title);
      } catch (err) {
        setError("Ошибка при загрузке записи");
      }
    };

    fetchEntry();
  }, [id]);

  const handleDecrypt = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(entry.content, key);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (!originalText) throw new Error();
      setDecryptedContent(originalText);
      setEditContent(originalText);
      setError("");
    } catch {
      setError("Неверный ключ или ошибка при расшифровке");
      setDecryptedContent("");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить запись?")) return;
    try {
      await axios.delete(`https://private-journal-backend-env.eba-kam8nf3e.eu-north-1.elasticbeanstalk.com/api/entries/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        data: { trustCode: key },
      });
      window.location.href = "/entries";
    } catch (err) {
      alert("Ошибка удаления: " + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = async () => {
    try {
      const encryptedContent = CryptoJS.AES.encrypt(editContent, key).toString();
      await axios.put(
        `https://private-journal-backend-env.eba-kam8nf3e.eu-north-1.elasticbeanstalk.com/api/entries/${id}`,
        { title: editTitle, content: encryptedContent, trustCode: key },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      alert("Запись обновлена");
      setDecryptedContent(editContent);
      setIsEditing(false);
    } catch (err) {
      alert("Ошибка при обновлении: " + (err.response?.data?.error || err.message));
    }
  };

  if (!entry) return <div className="p-4 text-gray-600">Загрузка...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{entry.title}</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Ключ для расшифровки:</label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full border px-3 py-2 rounded border-gray-300"
        />
        <button
          onClick={handleDecrypt}
          className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Расшифровать
        </button>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      </div>

      {decryptedContent && !isEditing && (
        <>
          <div className="bg-gray-50 p-3 border rounded text-gray-800 mb-4">
            {decryptedContent}
          </div>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
          >
            Удалить
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Редактировать
          </button>
        </>
      )}

      {isEditing && (
        <div className="mt-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full mb-2 border px-3 py-2 rounded"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full mb-2 border px-3 py-2 rounded"
          />
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Сохранить изменения
          </button>
        </div>
      )}
    </div>
  );
}
