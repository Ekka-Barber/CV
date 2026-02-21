import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { LandingPage } from "@/pages/LandingPage";
import { SignInPage } from "@/pages/auth/SignInPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { WizardPage } from "@/pages/WizardPage";
import { EditorPage } from "@/pages/EditorPage";
import { AtsPage } from "@/pages/AtsPage";
import { ExportPage } from "@/pages/ExportPage";

function App() {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  useEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar" : "en";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage locale={locale} onLocaleChange={setLocale} />}
        />
        <Route
          path="/auth/sign-in"
          element={<SignInPage locale={locale} onLocaleChange={setLocale} />}
        />
        <Route
          path="/auth/sign-up"
          element={<SignUpPage locale={locale} onLocaleChange={setLocale} />}
        />
        <Route
          path="/app"
          element={<DashboardPage locale={locale} onLocaleChange={setLocale} />}
        />
        <Route
          path="/app/resume/:id/wizard"
          element={<WizardPage locale={locale} onLocaleChange={setLocale} />}
        />
        <Route
          path="/app/resume/:id/editor"
          element={<EditorPage locale={locale} onLocaleChange={setLocale} />}
        />
        <Route
          path="/app/resume/:id/ats"
          element={<AtsPage locale={locale} onLocaleChange={setLocale} />}
        />
        <Route
          path="/app/resume/:id/export"
          element={<ExportPage locale={locale} onLocaleChange={setLocale} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
