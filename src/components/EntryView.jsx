import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms"; // Импорт AWS SDK

// Инициализация клиента KMS
const client = new KMSClient({ region: "eu-north-1" });

export default function EntryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [decryptedContent, setDecryptedContent] = useState("");
  const [key, setKey] = useState(""); // Код доверия
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/entries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntry(res.data);
        setEditTitle(res.data.title);
      } catch (err) {
        setError("Ошибка при загрузке записи");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  // Функция для расшифровки данных через AWS KMS
  const decryptData = async (cipherText) => {
    const params = {
      CiphertextBlob: cipherText,
    };

    try {
      const data = await client.send(new DecryptCommand(params));
      const plaintext = new TextDecoder().decode(data.Plaintext);
      return plaintext;
    } catch (err) {
      console.error("Ошибка расшифровки:", err);
      setError("Ошибка при расшифровке записи.");
    }
  };

  const handleDecrypt = async () => {
    if (!key) {
      setError("Введите код доверия для расшифровки.");
      return;
    }

    try {
      // Получаем зашифрованный контент
      const encryptedContent = entry.content;

      // Расшифровываем данные с использованием KMS
      const decryptedContent = await decryptData(encryptedContent);
      if (!decryptedContent) {
        setError("Неверный код доверия.");
      } else {
        setDecryptedContent(decryptedContent);
        setError("");
      }
    } catch (err) {
      setError("Ошибка при расшифровке записи.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить запись?")) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/entries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Запись удалена!");
      navigate("/entries");
    } catch (err) {
      alert("Ошибка удаления: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!key || !editContent || !editTitle) {
      setError("Пожалуйста, заполните все поля перед редактированием.");
      return;
    }
    setLoading(true);
    try {
      // Шифруем контент перед отправкой на сервер
      const encryptedContent = CryptoJS.AES.encrypt(editContent, key).toString();
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/entries/${id}`,
        { title: editTitle, content: encryptedContent, trustCode: key },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Запись обновлена");
      setDecryptedContent(editContent);
      setIsEditing(false);
    } catch (err) {
      alert("Ошибка при обновлении: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-gray-600">Загрузка...</div>;

  if (!entry) return <div className="p-4 text-gray-600">Запись не найдена</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
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
          <div className="bg-gray-50 p-3 border rounded text-gray-800 mb-4">{decryptedContent}</div>
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
