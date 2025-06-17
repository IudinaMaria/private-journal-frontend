import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-6">
      <h1 className="text-3xl font-semibold mb-4 text-indigo-700">О приложении</h1>
      <p className="text-gray-700 mb-4">
        <strong>Private Journal</strong> — это защищённое облачное приложение для хранения личных дневниковых записей.
        Все записи шифруются **на клиенте** перед отправкой на сервер, что обеспечивает максимальную конфиденциальность.
      </p>
      <p className="text-gray-700 mb-4">
        Приложение реализует подход <strong>Zero Trust</strong>: данные не хранятся в открытом виде, сервер не имеет доступа к содержимому записей,
        а пользователи проходят проверку при каждом входе.
      </p>
      <p className="text-gray-700 mb-4">
        Среди ключевых функций:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Шифрование данных перед загрузкой</li>
        <li>Хранение записей в MongoDB</li>
        <li>JWT-аутентификация и история входов</li>
        <li>Интуитивно понятный интерфейс</li>
        <li>Контейнеризация через Docker</li>
      </ul>
      <p className="text-gray-700">
        Разработано в рамках курсового проекта по теме <em>«Современные методы обеспечения конфиденциальности данных в облачных вычислениях»</em>.
      </p>
    </div>
  );
}
