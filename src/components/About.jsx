import React from "react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl mt-12">
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-8 tracking-tight">О приложении</h1>
      <p className="text-xl text-gray-700 mb-6 leading-relaxed">
        <strong>Private Journal</strong> — это защищённое облачное приложение для хранения личных дневниковых записей.
        Все записи шифруются <strong>на клиенте</strong> перед отправкой на сервер, что обеспечивает максимальную конфиденциальность.
      </p>
      <p className="text-xl text-gray-700 mb-6 leading-relaxed">
        Приложение построено по принципам <strong>Zero Trust</strong>, где каждый запрос проверяется, а данные никогда не хранятся в открытом виде.
        Аутентификация пользователей реализована через <strong>AWS Cognito</strong>, а для шифрования используется <strong>AWS KMS</strong>.
      </p>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Технологический стек:</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
          <li><strong>Frontend:</strong> React-приложение размещено через <strong>Amazon S3 + CloudFront</strong></li>
          <li><strong>Backend:</strong> Node.js сервер работает на <strong>Elastic Beanstalk</strong></li>
          <li><strong>База данных:</strong> <strong>MongoDB Atlas</strong> как облачное хранилище</li>
          <li><strong>Авторизация:</strong> <strong>AWS Cognito</strong> для безопасного входа</li>
          <li><strong>Шифрование данных:</strong> Client-side Encryption + <strong>AWS KMS</strong></li>
          <li><strong>Журналирование:</strong> <strong>AWS CloudWatch</strong> и <strong>CloudTrail</strong></li>
          <li><strong>CI/CD:</strong> Автоматизация деплоя через <strong>GitHub Actions</strong></li>
        </ul>
      </div>
      <p className="text-xl text-gray-700 mb-6">
        Это приложение было разработано в рамках курсового проекта по теме:
        <em> «Современные методы обеспечения конфиденциальности данных в облачных вычислениях»</em>.
      </p>
      <div className="mt-12 p-8 bg-indigo-100 border-l-4 border-indigo-600 rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Безопасность и конфиденциальность</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Все данные, включая ваши записи, проходят надёжное шифрование перед тем, как они покидают ваше устройство. Мы гарантируем,
          что только вы имеете доступ к содержимому, а сервер и база данных не знают, что именно вы храните.
        </p>
      </div>
    </div>
  );
}