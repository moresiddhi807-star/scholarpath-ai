import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { ExplorePage } from "./pages/ExplorePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ScholarshipsPage } from "./pages/ScholarshipsPage";
import { ScholarshipDetailPage } from "./pages/ScholarshipDetailPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { RoadmapPage } from "./pages/RoadmapPage";
import { ProfilePage } from "./pages/ProfilePage";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { ProtectedRoute, AdminRoute } from "./components/layout/RouteGuards";

// Lazy-load heavier, less-frequently-visited routes (charts + admin CRUD)
// to keep the initial bundle smaller.
const ReadinessPage = lazy(() => import("./pages/ReadinessPage").then((m) => ({ default: m.ReadinessPage })));
const AdminScholarshipsPage = lazy(() =>
  import("./pages/admin/AdminScholarshipsPage").then((m) => ({ default: m.AdminScholarshipsPage }))
);
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage").then((m) => ({ default: m.AdminUsersPage })));

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-ink-200 border-t-teal-500 animate-spin" />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/explore" element={<ExplorePage />} />

        {/* Onboarding requires auth but has its own full-screen layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>

        {/* Dashboard (protected) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/scholarships" element={<ScholarshipsPage />} />
            <Route path="/dashboard/scholarships/:id" element={<ScholarshipDetailPage />} />
            <Route path="/dashboard/readiness" element={<ReadinessPage />} />
            <Route path="/dashboard/documents" element={<DocumentsPage />} />
            <Route path="/dashboard/roadmap" element={<RoadmapPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Admin (protected + admin role) */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminScholarshipsPage />} />
            <Route path="/admin/scholarships" element={<AdminScholarshipsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
