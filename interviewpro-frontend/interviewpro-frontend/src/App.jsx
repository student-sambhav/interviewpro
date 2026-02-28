import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Practice from "./pages/Practice";
import Solve from "./pages/Solve.jsx";
import History from "./pages/History";
import AiAnalyzer from "./components/AiAnalyzer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Practice */}
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/:id" element={<Solve />} />
        <Route path="/history" element={<History />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ✅ AI Analyzer */}
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AiAnalyzer />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}