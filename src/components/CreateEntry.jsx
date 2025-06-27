import React, { useState } from "react";
import axios from "axios";
import { KMSClient, EncryptCommand } from "@aws-sdk/client-kms"; // Импортируем AWS SDK

const CreateEntry = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [trustCode, setTrustCode] = useState("");
  const [message, setMessage] = useState("");

  // Инициализация клиента KMS
  const client = new KMSClient({ region: "us-east-1" }); // Укажите свой регион

  // Функция для шифрования данных через KMS
  const encryptData = async (plaintextData) => {
    const params = {
      KeyId: "arn:aws:kms:eu-north-1:102051096426:key/0d35e7fa-3f26-4ca1-a312-69c8488b9b68",
      Plaintext: new TextEncoder().encode(plaintextData),
    };

    try {
      const data = await client.send(new EncryptCommand(params));
      console.log("Зашифрованные данные:", data.CiphertextBlob);
      return data.CiphertextBlob;
    } catch (err) {
      console.error("Ошибка шифрования:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trustCode) {
      setMessage("Введите код доверия для шифрования записи.");
      return;
    }

    // Шифруем content с использованием AWS KMS
    const encryptedContent = await encryptData(content);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/entries`,
        { title, content: encryptedContent },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 201) {
        setMessage("Запись успешно создана!");
        setTitle("");
        setContent("");
        setTrustCode("");
      }
    } catch (err) {
      if (err.response) {
        setMessage(`Ошибка при создании записи: ${err.response.data.error}`);
      } else {
        setMessage("Ошибка при создании записи.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px", color: "#4F46E5" }}>Создать запись</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
          required
        />

        <textarea
          placeholder="Содержимое"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px", height: "200px" }}
          required
        />

        <input
          type="password"
          placeholder="Код доверия (используется для шифрования)"
          value={trustCode}
          onChange={(e) => setTrustCode(e.target.value)}
          style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
          required
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#4F46E5",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Сохранить
        </button>

        {message && <p style={{ color: "#e53e3e", fontSize: "14px", marginTop: "10px", textAlign: "center" }}>{message}</p>}
      </form>
    </div>
  );
};

export default CreateEntry;
