import { useState } from "react";
import { Auth } from "aws-amplify";

export default function AuthForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      // Перенаправляет пользователя на Cognito Hosted UI
      await Auth.federatedSignIn();
    } catch (err) {
      console.error("Ошибка входа:", err);
      setError("Ошибка при авторизации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f7fafc",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: "600",
          textAlign: "center",
          color: "#4F46E5",
          marginBottom: "20px"
        }}>
          Вход
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {error && <p style={{ color: "#e53e3e", fontSize: "14px", textAlign: "center" }}>{error}</p>}
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
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Войти через Cognito"}
          </button>
        </form>
      </div>
    </div>
  );
}
