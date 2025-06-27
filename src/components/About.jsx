import React from "react";

export default function About() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", marginTop: "20px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "600", color: "#4F46E5", marginBottom: "20px" }}>О приложении</h1>
      <p style={{ fontSize: "18px", color: "#4A5568", marginBottom: "20px" }}>
        <strong>Private Journal</strong> — это защищённое облачное приложение для хранения личных дневниковых записей.
        Все записи шифруются <strong>на клиенте</strong> перед отправкой на сервер, что обеспечивает максимальную конфиденциальность.
      </p>
      <p style={{ fontSize: "18px", color: "#4A5568", marginBottom: "20px" }}>
        Приложение использует концепцию <strong>Zero Trust</strong>, что означает: данные не хранятся в открытом виде,
        сервер не имеет доступа к содержимому записей, а пользователи проходят проверку при каждом входе с помощью
        аутентификации через <strong>AWS Cognito</strong>.
      </p>
      <p style={{ fontSize: "18px", color: "#4A5568", marginBottom: "20px" }}>
        Среди ключевых функций:
      </p>
      <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginBottom: "20px", color: "#4A5568" }}>
        <li>Шифрование данных на клиенте перед отправкой на сервер</li>
        <li>Хранение записей в MongoDB с использованием облачной инфраструктуры</li>
        <li>JWT-аутентификация с использованием AWS Cognito</li>
        <li>Интуитивно понятный и адаптивный интерфейс</li>
        <li>Полная контейнеризация с использованием Docker для упрощения развертывания</li>
      </ul>
      <p style={{ fontSize: "18px", color: "#4A5568" }}>
        Это приложение было разработано в рамках курсового проекта по теме <em>«Современные методы обеспечения конфиденциальности данных в облачных вычислениях»</em>.
      </p>
      <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#E0E7FF", borderTop: "2px solid #4F46E5", borderRadius: "10px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "600", color: "#4F46E5", marginBottom: "20px" }}>Безопасность и конфиденциальность</h2>
        <p style={{ fontSize: "18px", color: "#4A5568" }}>
          Все данные, включая ваши записи, проходят надежное шифрование перед тем, как они покидают ваше устройство. Таким образом,
          мы гарантируем, что только вы сможете получить доступ к вашему контенту, а сервер не хранит данные в открытом виде.
        </p>
      </div>
    </div>
  );
}
