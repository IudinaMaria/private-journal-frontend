import React from "react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-8">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">О приложении</h1>
      <p className="text-lg text-gray-700 mb-6">
        <strong>Private Journal</strong> — это защищённое облачное приложение для хранения личных дневниковых записей.
        Все записи шифруются <strong>на клиенте</strong> перед отправкой на сервер, что обеспечивает максимальную конфиденциальность.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Приложение использует концепцию <strong>Zero Trust</strong>, что означает: данные не хранятся в открытом виде,
        сервер не имеет доступа к содержимому записей, а пользователи проходят проверку при каждом входе с помощью
        аутентификации через <strong>AWS Cognito</strong>.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Среди ключевых функций:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
        <li>Шифрование данных на клиенте перед отправкой на сервер</li>
        <li>Хранение записей в MongoDB с использованием облачной инфраструктуры</li>
        <li>JWT-аутентификация с использованием AWS Cognito</li>
        <li>Интуитивно понятный и адаптивный интерфейс</li>
        <li>Полная контейнеризация с использованием Docker для упрощения развертывания</li>
      </ul>
      <p className="text-lg text-gray-700">
        Это приложение было разработано в рамках курсового проекта по теме <em>«Современные методы обеспечения конфиденциальности данных в облачных вычислениях»</em>.
      </p>
      <div className="mt-10 p-6 bg-indigo-100 border-t-4 border-indigo-600 rounded-xl">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Безопасность и конфиденциальность</h2>
        <p className="text-lg text-gray-700">
          Все данные, включая ваши записи, проходят надежное шифрование перед тем, как они покидают ваше устройство. Таким образом,
          мы гарантируем, что только вы сможете получить доступ к вашему контенту, а сервер не хранит данные в открытом виде.
        </p>
      </div>
    </div>
  );
}
