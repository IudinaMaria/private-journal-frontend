import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// Конфигурация AWS Amplify
Amplify.configure(awsExports);

// Рендер приложения
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
