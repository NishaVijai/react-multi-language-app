import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import "bootstrap/dist/js/bootstrap.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "flag-icon-css/css/flag-icons.min.css";

import App from "./App";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    load: "languageOnly",
    supportedLngs: ["en", "fr", "ar", "ur"],
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    fallbackLng: "en",
    detection: {
      order: ["path", "cookie", "localStorage", "htmlTag", "subdomain"],
      caches: ["cookie"]
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json"
    }
  });

const loadingMessage = (
  <div className="py-4 text-center">
    <h2>App Loading...</h2>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={loadingMessage}>
      <App />
    </Suspense>
  </React.StrictMode>
);
