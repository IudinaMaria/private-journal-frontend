import { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function CreateEntry() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [trustCode, setTrustCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trustCode) {
      setMessage("Введите код доверия для шифрования записи.");
      return;
    }

    // Шифруем content
    const encryptedContent = CryptoJS.AES.encrypt(content, trustCode).toString();

    // Получаем токен из localStorage (для Cognito)
    const clientId = "21tgfqv26mks41gscps8g1fi7b"; // 🔁 ЗАМЕНИ на свой реальный Cognito App Client ID
    const lastAuthUser = localStorage.getItem(`CognitoIdentityServiceProvider.${clientId}.LastAuthUser`);
    const accessTokenKey = `CognitoIdentityServiceProvider.${clientId}.${lastAuthUser}.accessToken`;
    const accessToken = localStorage.getItem(accessTokenKey);

    try {
      await axios.post(
        "https://private-journal-backend.onrender.com/api/entries",
        { title, content: encryptedContent },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      setMessage("Запись успешно создана!");
      setTitle("");
      setContent("");
      setTrustCode("");
    } catch (err) {
      setMessage("Ошибка при создании записи.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Создать запись</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-4 py-2"
          required
        />

        <textarea
          placeholder="Содержимое"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-4 py-2 h-40"
          required
        />

        <input
          type="password"
          placeholder="Код доверия (используется для шифрования)"
          value={trustCode}
          onChange={(e) => setTrustCode(e.target.value)}
          className="w-full border rounded px-4 py-2"
          required
        />

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
          Сохранить
        </button>

        {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
      </form>
    </div>
  );
}
