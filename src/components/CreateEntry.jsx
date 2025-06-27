const handleSubmit = async (e) => {
  e.preventDefault();

  if (!trustCode) {
    setMessage("Введите код доверия для шифрования записи.");
    return;
  }

  // Шифруем content
  const encryptedContent = CryptoJS.AES.encrypt(content, trustCode).toString();

  try {
    console.log("Sending request to API...");
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/entries`,
      { title, content: encryptedContent },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log("Response: ", response); // Логируем ответ
    if (response.status === 201) {
      setMessage("Запись успешно создана!");
      setTitle("");
      setContent("");
      setTrustCode("");
    }
  } catch (err) {
    console.error("Error:", err); // Логируем ошибку
    if (err.response) {
      setMessage(`Ошибка при создании записи: ${err.response.data.error}`);
    } else {
      setMessage("Ошибка при создании записи.");
    }
  }
};
