import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EntryDetail() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [key, setKey] = useState("");
  const [decrypted, setDecrypted] = useState("");

  useEffect(() => {
    const fetchEntry = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://private-journal-backend-env.eba-kam8nf3e.eu-north-1.elasticbeanstalk.com/api/entries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntry(res.data);
    };
    fetchEntry();
  }, [id]);

  const handleDecrypt = () => {
    // дешифровка по key
  };

  if (!entry) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>{entry.title}</h2>
      <textarea
        placeholder="Ключ доверия"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleDecrypt}>Расшифровать</button>
      {decrypted && <p>{decrypted}</p>}
    </div>
  );
}

export default EntryDetail;
