import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ApplicantDashboard } from './pages/ApplicantDashboard';
import { OfficerDashboard } from './pages/OfficerDashboard';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { RulesManagementPage } from './pages/RulesManagementPage';
import { AuditLogsPage } from './pages/AuditLogsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-xs font-mono bg-[#070D1E]">
        Verifying cryptographic session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#070D1E] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Applicant Route */}
          <Route
            path="/applicant"
            element={
              <ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}>
                <ApplicantDashboard />
              </ProtectedRoute>
            }
          />

          {/* Officer Queue */}
          <Route
            path="/officer"
            element={
              <ProtectedRoute allowedRoles={['OFFICER', 'ADMIN']}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Application Detail Dossier (All roles can access with their scope) */}
          <Route
            path="/applications/:id"
            element={
              <ProtectedRoute>
                <ApplicationDetailPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rules"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <RulesManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/audit"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AuditLogsPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Regulatory Footer */}
      <Footer />
    </div>
  );
};
