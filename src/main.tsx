// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import i18next from "./i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "./contexts/Auth/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { QuizProvider } from "./contexts/QuizContext/QuizContext";
import { AnnouncementProvider } from "./contexts/AnnouncementContext/AnnouncementContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <AnnouncementProvider>
          <QuizProvider>
            <I18nextProvider i18n={i18next}>
              <App />
            </I18nextProvider>
          </QuizProvider>
        </AnnouncementProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
