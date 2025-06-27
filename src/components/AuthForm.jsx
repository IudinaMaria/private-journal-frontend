import { useState } from "react";
import { useAuth } from "react-oidc-context";

export default function AuthForm({ onAuthSuccess }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Сбрасываем ошибку при новой попытке
    setIsLoading(true); // Включаем индикатор загрузки

    try {
      await auth.signinRedirect(); // Перенаправление на страницу входа Cognito
    } catch (err) {
      setError("Ошибка при авторизации");
    } finally {
      setIsLoading(false); // Выключаем индикатор загрузки
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f7fafc", padding: "20px" }}>
      <div style={{ maxWidth: "400px", width: "100%", backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "600", textAlign: "center", color: "#4F46E5", marginBottom: "20px" }}>
          Вход
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {error && <p style={{ color: "#e53e3e", fontSize: "14px", textAlign: "center" }}>{error}</p>} {/* Ошибка, если есть */}
          <button
            type="submit"
            style={{
              backgroundColor: "#4F46E5", 
              color: "white", 
              padding: "12px", 
              borderRadius: "6px", 
              fontSize: "16px", 
              fontWeight: "500",
              cursor: "pointer"
            }}
            disabled={isLoading} // Блокировка кнопки при загрузке
          >
            {isLoading ? "Загрузка..." : "Войти"} {/* Изменение текста на кнопке */}
          </button>
        </form>
      </div>
    </div>
  );
}
