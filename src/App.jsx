import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const languages = [
  {
    code: "fr",
    name: "Français",
    flag: "/flags/fr.svg"
  },
  {
    code: "en",
    name: "English",
    flag: "/flags/gb.svg"
  },
  {
    code: "ar",
    name: "عربي",
    flag: "/flags/sa.svg",
    dir: "rtl"
  },
  {
    code: "da",
    name: "Dansk",
    flag: "/flags/dk.svg"
  },
  {
    code: "es",
    name: "Español",
    flag: "/flags/es.svg"
  },
  {
    code: "hi",
    name: "हिन्दी",
    flag: "/flags/in.svg",
    dir: "ltr"
  }
];

const FlagIcon = ({ src, alt, size = 20, opacity = 1 }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size * 0.75}
    style={{ opacity }}
    className="me-2"
  />
);

const GlobeIcon = ({ width = 24, height = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="currentColor"
    className="bi bi-globe"
    viewBox="0 0 16 16"
  >
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
  </svg>
);

function App() {
  const [userText, setUserText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { t, i18n } = useTranslation();

  // IMPORTANT: read the active language from i18next's reactive state, NOT from
  // the cookie. Reading the cookie during render can return a stale value in the
  // same render cycle as a language switch (i18next updates its internal state
  // and notifies React before the browser-language-detector writes the cookie),
  // which previously left the translator stuck on the old language.
  const currentLanguageCode = i18n.language || "en";
  const currentLanguage =
    languages.find((lang) => lang.code === currentLanguageCode) ||
    languages.find((lang) => lang.code === "en");

  const releaseDate = new Date("2021-03-07");
  const timedifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timedifference / (1000 * 60 * 60 * 24));

  // Used to cancel stale translation requests (race-condition protection) and
  // to debounce typing so we don't fire one API call per keystroke.
  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);

  const translateText = useCallback(async (text, targetLang) => {
    // Cancel any request still in flight for older text/language.
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`,
        { signal: controller.signal }
      );
      const data = await response.json();
      if (data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
        setError("");
      } else {
        setTranslatedText("");
        setError(data.responseDetails || "No translation received.");
      }
    } catch (err) {
      // Ignore aborted requests — a newer text/language superseded this one.
      if (err.name === "AbortError") return;
      console.error("Translation error:", err);
      setError("Translation failed. Please try again.");
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setLoading(false);
      }
    }
  }, []);

  // Single source of truth for translation:
  //  - typing new text  -> re-translates in the current language
  //  - switching language via the globe -> re-translates existing text
  useEffect(() => {
    const trimmed = userText.trim();

    // Invalidate any in-flight request for previous text/language.
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    if (!trimmed) {
      setTranslatedText("");
      setError("");
      setLoading(false);
      return;
    }

    // English is the source language of the translator — just echo the input.
    if (currentLanguageCode === "en") {
      setTranslatedText(trimmed);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    debounceRef.current = setTimeout(
      () => translateText(trimmed, currentLanguageCode),
      350
    );

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [userText, currentLanguageCode, translateText]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-end align-items-center mb-4">
        <div className="me-3">
          <small className="text-muted">Current Language:</small>
          <p className="mb-0">
            <FlagIcon src={currentLanguage.flag} alt={currentLanguage.name} />
            <strong>{currentLanguage.name}</strong>
          </p>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-link dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title="Change Language"
          >
            <GlobeIcon />
          </button>
          <ul className="dropdown-menu">
            <li>
              <span className="dropdown-item-text">{t("language")}</span>
            </li>
            {languages.map(({ code, name, flag }) => (
              <li key={code}>
                <button
                  className="dropdown-item"
                  onClick={() => i18next.changeLanguage(code)}
                  disabled={code === currentLanguageCode}
                >
                  <FlagIcon
                    src={flag}
                    alt={name}
                    opacity={code === currentLanguageCode ? 0.5 : 1}
                  />
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column align-items-start">
        <h1 className="font-weight-normal mb-3">{t("welcome_message")}</h1>
        <p>{t("days_since_release", { number_of_days })}</p>

        <div className="mt-5 w-100">
          <h2 className="mb-3">Text Translator</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter text to translate..."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
            />
          </div>

          {loading && <p className="text-muted">Translating...</p>}
          {error && <p className="text-danger">{error}</p>}

          <div className="mt-3 p-3 border rounded bg-light">
            <h3>Translated text</h3>
            {translatedText ? (
              <p className="mb-0">{translatedText}</p>
            ) : <p className="mb-0">Please type a text to translate...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;