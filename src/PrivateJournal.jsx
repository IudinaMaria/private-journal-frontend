import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";

export default function PrivateJournal() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [decryptedEntry, setDecryptedEntry] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://private-journal-backend-env.eba-kam8nf3e.eu-north-1.elasticbeanstalk.com/api/entries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке записей", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      });
  }, []);

  const deriveKeyFromPassword = (password) => {
    const salt = CryptoJS.enc.Hex.parse("a1b2c3d4e5f6");
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 1000,
    });
    return key.toString();
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const derivedKey = deriveKeyFromPassword(pwd);
    setEncryptionKey(derivedKey);
  };

  const handleSave = async () => {
    if (!encryptionKey) return alert("Введите пароль для генерации ключа");

    const token = localStorage.getItem("token");
    if (!token) return alert("Вы не авторизованы");

    const encryptedTitle = CryptoJS.AES.encrypt(title, encryptionKey).toString();
    const encryptedContent = CryptoJS.AES.encrypt(content, encryptionKey).toString();

    try {
      const response = await axios.post(
        "http://private-journal-backend-env.eba-kam8nf3e.eu-north-1.elasticbeanstalk.com/api/entries",
        { title: encryptedTitle, content: encryptedContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEntries([response.data, ...entries]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Ошибка при сохранении", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  };

  const handleView = (entry) => {
    if (!encryptionKey) return alert("Введите пароль для расшифровки");

    try {
      const decryptedTitle = CryptoJS.AES.decrypt(entry.title, encryptionKey).toString(CryptoJS.enc.Utf8);
      const decryptedContent = CryptoJS.AES.decrypt(entry.content, encryptionKey).toString(CryptoJS.enc.Utf8);

      setDecryptedEntry({ title: decryptedTitle, content: decryptedContent });
    } catch (err) {
      alert("Неверный ключ или повреждённые данные");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">🔐 Приватный дневник</h1>
          <div className="space-x-2">
            <button onClick={() => setShowAbout(true)} className="hover:underline">О приложении</button>
            <button onClick={handleLogout} className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100">
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6 flex-grow">
        <div className="mb-6">
          <input
            type="password"
            placeholder="Введите пароль для генерации ключа"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow space-y-4 mb-8">
          <input
            type="text"
            placeholder="Заголовок записи"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Текст записи..."
            rows={6}
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded transition"
          >
            Сохранить (зашифруется)
          </button>
        </div>

        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 p-4 rounded cursor-pointer transition"
              onClick={() => handleView(entry)}
            >
              📒 Зашифрованная запись #{entry._id.slice(-4)}
            </div>
          ))}
        </div>

        {decryptedEntry && (
          <div className="mt-8 border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Просмотр записи</h2>
            <p className="text-lg font-bold">{decryptedEntry.title}</p>
            <p className="whitespace-pre-line mt-2 text-gray-700">{decryptedEntry.content}</p>
          </div>
        )}
      </main>

      <footer className="text-center text-sm text-gray-500 py-4">
        © 2025 Private Journal | Разработано для курсовой работы
      </footer>

      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-2">О приложении</h2>
            <p className="text-sm text-gray-700">
              Это веб-приложение реализует принципы Zero Trust: все записи шифруются на клиенте перед загрузкой в облако.
              Сервер никогда не видит содержимое данных. Используются: AES, PBKDF2, JWT, MongoDB, React, TailwindCSS и Docker.
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowAbout(false)}
                className="text-indigo-600 hover:underline"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
