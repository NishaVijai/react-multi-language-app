# React Multi-Language App

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![i18next](https://img.shields.io/badge/i18next-internationalization-success)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Description

**React Multi-Language App** is a **React application** demonstrating **multi-language support, dynamic language switching, and a live text translator**. The UI internationalization is powered by **i18next**, and the translator uses the free **MyMemory Translation API** to translate English text into the selected language in real time.

> 💡 **How the translator works**: type (or paste) **English text** in the input field, then pick a language from the **globe icon** in the top-right corner — the translated text appears instantly below the input.

This project is ideal as a **starter template for multilingual React apps**, useful for learning internationalization (i18n) with JSON language resources, React hooks, and a modern Vite build setup.

---

## Table of Contents

* [Preview](#preview)
* [Screenshot](#screenshot)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Deployment](#deployment)
* [License](#license)

---

## Preview

**Live Demo:**  
🔗 https://multi-lang-translator.netlify.app/

---

## Screenshot

<img width="3840" height="1960" alt="Titre" src="https://github.com/user-attachments/assets/248aeeb2-dd99-4689-8f4c-690eccf2674e" />

---

## Features

* 🌐 **Multi-Language Support** – 6 languages: English, French, Arabic, Danish, Spanish, and Hindi.
* 🔁 **Real-Time Language Change** – Switch languages without reloading the page; the whole UI (including the browser tab title) updates instantly.
* 🧠 **i18next Integration** – Uses the industry-standard internationalization library for React with automatic language detection (cookie-based persistence).
* 💬 **Text Translator** – Type **English** text, then select a target language from the globe dropdown to see the translation (powered by the free MyMemory API).
* 🔄 **Re-translation on Switch** – Any text already in the input is automatically re-translated when you change the language.
* 📦 **JSON Translation Files** – Easy to extend with additional languages.
* 🚀 **Vite Build** – Fast dev server with HMR (hot module replacement) and optimized production builds.

---

## Technologies Used

* **React 18** – Frontend library for building UI components.
* **i18next + react-i18next** – Internationalization framework for managing translations.
* **Vite** – Modern build tool and dev server (replaces Create React App).
* **MyMemory Translation API** – Free REST API used for the text translator.
* **Bootstrap 5** – UI styling.
* **Inline SVG flags** – Only the 6 needed country flags are bundled (no heavy flag library).
* **js-cookie** – Persists the selected language in a browser cookie.
* **JavaScript / JSX** – Language used throughout the app.

---

## Installation

Requirements: **Node.js 18+** (Node 20 LTS recommended).

To run this project locally:

1. **Clone the repository**

```bash
git clone <repository-url>
cd react-multi-language-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

4. **Open in browser**

The Vite dev server runs on:

```
http://localhost:3000
```

> If port 3000 is already in use, Vite automatically tries the next available port (e.g. 3001) and prints the URL in the terminal.

---

## Usage

### UI Language Switching

* The app loads in the language saved in your browser (first visit defaults to **English**).
* Click the **globe icon** in the top-right corner to open the language dropdown.
* Pick any language — the UI text (title, welcome message, day counter, language label) updates **instantly**, no reload required.
* **Arabic** automatically switches the entire page to **right-to-left (RTL)** layout.

### Text Translator

1. Type **English text** into the *Text Translator* input field (e.g. `Hello, how are you?`).
2. Select your target language from the **globe dropdown** (e.g. French 🏴, Spanish 🇪🇸, Danish 🇩🇰, Arabic 🇸🇦, Hindi 🇮🇳).
3. The **Translated text** box shows the translation in the selected language shortly after you make your choice.
4. Type new English text or switch to another language — the translation updates automatically.

> **Note:** The translator translates **from English** into the selected language. If English is selected, the input text is echoed as-is (no translation needed). The MyMemory API is a free public service; uncommon words or long phrases may translate less accurately.

---

## Project Structure

```
react-multi-language-app/
│
├── index.html              # Vite entry point (HTML shell)
├── vite.config.js          # Vite configuration (dev port 3000, build → build/)
├── public/                 # Static assets copied as-is into the build
│   ├── _redirects          # Netlify SPA rewrite rule
│   ├── manifest.json       # Web app manifest
│   ├── flags/              # Country flag SVGs (one per supported language)
│   └── assets/locales/     # JSON translation files ({en,fr,ar,da,es,hi}/translation.json)
├── src/
│   ├── App.jsx             # Main component (language switcher + text translator)
│   ├── index.jsx           # Entry point + i18next configuration
│   └── styles.css          # Base styling
│
├── package.json            # Dependencies & scripts
└── README.md               # This documentation
```

---

## Deployment

This project is deployed using **Netlify with GitHub continuous deployment**.

### How it works

1. The repository is connected to **Netlify**
2. On every push to the `main` branch:

   * Netlify runs `npm install`
   * Netlify runs `npm run build` (Vite → produces `build/`)
   * Netlify publishes the app from the `build/` directory

### Netlify Build Settings

| Setting               | Value           |
| --------------------- | --------------- |
| **Build Command**     | `npm run build` |
| **Publish Directory** | `build`         |

### Deploying Updates

```bash
git add .
git commit -m "Update app"
git push origin main
```

✅ Netlify will **automatically build and redeploy** the latest version from the GitHub repository.

---

## License

This project is **open-source** and free to use for personal or educational purposes.