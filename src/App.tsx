import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LandingPage = lazy(() =>
  import("@/pages/LandingPage").then((m) => ({ default: m.LandingPage }))
);
const SignInPage = lazy(() =>
  import("@/pages/auth/SignInPage").then((m) => ({ default: m.SignInPage }))
);
const SignUpPage = lazy(() =>
  import("@/pages/auth/SignUpPage").then((m) => ({ default: m.SignUpPage }))
);
const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((m) => ({ default: m.DashboardPage }))
);
const WizardPage = lazy(() =>
  import("@/pages/WizardPage").then((m) => ({ default: m.WizardPage }))
);
const EditorPage = lazy(() =>
  import("@/pages/EditorPage").then((m) => ({ default: m.EditorPage }))
);
const AtsPage = lazy(() =>
  import("@/pages/AtsPage").then((m) => ({ default: m.AtsPage }))
);
const ExportPage = lazy(() =>
  import("@/pages/ExportPage").then((m) => ({ default: m.ExportPage }))
);

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/app" element={<DashboardPage />} />
          <Route path="/app/resume/:id/wizard" element={<WizardPage />} />
          <Route path="/app/resume/:id/editor" element={<EditorPage />} />
          <Route path="/app/resume/:id/ats" element={<AtsPage />} />
          <Route path="/app/resume/:id/export" element={<ExportPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
