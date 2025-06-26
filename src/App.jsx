import { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import ProtectedRoute from "./components/ui/ProtectedRoute";

const HomePage = lazy(() => import("./pages/public/HomePage"));
const Login = lazy(() => import("./pages/public/Login"));

const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Accounts = lazy(() => import("./pages/admin/Accounts"));
const Content = lazy(() => import("./pages/admin/Content"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const Artikelberita = lazy(() => import("./pages/admin/Artikelberita"));
const ProdukPopulerContent = lazy(() =>
  import("./pages/admin/ProdukPopulerContent")
);

const ProtectedAdminRoutes = () => {
  return (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
};

const App = () => (
  <Router>
    <main className="relative selection:bg-primary-kalia selection:text-white">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <p className="text-lg font-semibold">Memuat Halaman...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route element={<ProtectedAdminRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/content" element={<Content />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/artikelberita" element={<Artikelberita />} />
            <Route
              path="/produkpopulercontent"
              element={<ProdukPopulerContent />}
            />
          </Route>
        </Routes>
      </Suspense>
    </main>
  </Router>
);

export default App;
