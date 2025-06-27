import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms"; // Импорт AWS SDK

// Инициализация клиента KMS
const client = new KMSClient({ region: "us-east-1" });

const EntryDetail = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [key, setKey] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntry = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/entries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntry(res.data);
      } catch (err) {
        setError("Ошибка при загрузке записи");
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
      // Зашифрованный контент, получаем с сервера
      const encryptedContent = entry.content;

      // Расшифровка с использованием KMS
      const decryptedContent = await decryptData(encryptedContent);
      if (!decryptedContent) {
        setError("Неверный код доверия.");
      } else {
        setDecrypted(decryptedContent);
        setError("");
      }
    } catch (err) {
      setError("Ошибка при расшифровке записи.");
    }
  };

  if (!entry) return <p>Загрузка...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px", color: "#4F46E5" }}>{entry.title}</h2>
      <textarea
        placeholder="Введите ключ доверия"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px", width: "100%", marginBottom: "12px", height: "50px" }}
      />
      <button
        onClick={handleDecrypt}
        style={{
          padding: "12px",
          backgroundColor: "#4F46E5",
          color: "white",
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "6px",
          width: "100%",
          cursor: "pointer",
        }}
      >
        Расшифровать
      </button>
      {error && <p style={{ color: "#e53e3e", fontSize: "14px", marginTop: "10px", textAlign: "center" }}>{error}</p>}
      {decrypted && <p style={{ color: "#4F46E5", fontSize: "16px", marginTop: "20px", whiteSpace: "pre-wrap" }}>{decrypted}</p>}
    </div>
  );
};

export default EntryDetail;
