import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_vcXKxrYk5", // Адрес вашего Cognito пула
  client_id: "21tgfqv26mks41gscps8g1fi7b", // Ваш Client ID из Cognito
  redirect_uri: "https://d1bdaso729tx0i.cloudfront.net/", // Убедитесь, что это совпадает с вашим Callback URL
  response_type: "code",
  scope: "phone openid email", // Убедитесь, что это нужные вам scope
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);