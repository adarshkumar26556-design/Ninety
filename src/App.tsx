import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { HomePage } from './pages/Home';
import { PropertiesPage } from './pages/Properties';
import { PropertyDetailsPage } from './pages/PropertyDetails';
import { AdminLoginPage } from './pages/Admin/Login';
import { AdminDashboardPage } from './pages/Admin/Dashboard';
import { AdminPropertiesPage } from './pages/Admin/Properties';
import { AddPropertyPage } from './pages/Admin/AddProperty';
import { EditPropertyPage } from './pages/Admin/EditProperty';
import { useLenis } from './hooks/useLenis';

// Simple settings placeholder page
const AdminSettingsPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-stone-900 mb-6">Settings</h1>
    <div className="admin-card">
      <h2 className="font-semibold text-stone-900 mb-4">Account Settings</h2>
      <p className="text-stone-500 text-sm">Settings panel coming soon.</p>
    </div>
  </div>
);

// 404 page
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-stone-50">
    <div className="text-center">
      <div className="font-display text-9xl font-bold text-stone-200 mb-4">404</div>
      <h1 className="text-2xl font-semibold text-stone-800 mb-2">Page Not Found</h1>
      <p className="text-stone-500 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary">Return Home</a>
    </div>
  </div>
);

function AppContent() {
  useLenis();

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/stays" element={<PropertiesPage />} />
        <Route path="/stays/:slug" element={<PropertyDetailsPage />} />
        <Route path="/privacy-policy" element={<div className="min-h-screen pt-24 section-container section-padding"><h1 className="section-title">Privacy Policy</h1><p className="section-subtitle mt-4">Contact vilstaygo@gmail.com for privacy inquiries.</p></div>} />
        <Route path="/terms" element={<div className="min-h-screen pt-24 section-container section-padding"><h1 className="section-title">Terms & Conditions</h1><p className="section-subtitle mt-4">Contact vilstaygo@gmail.com for terms inquiries.</p></div>} />
        <Route path="/cancellation-policy" element={<div className="min-h-screen pt-24 section-container section-padding"><h1 className="section-title">Cancellation Policy</h1><p className="section-subtitle mt-4">Contact vilstaygo@gmail.com for cancellation inquiries.</p></div>} />
      </Route>

      {/* Admin Auth */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Protected Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="properties" element={<AdminPropertiesPage />} />
        <Route path="properties/new" element={<AddPropertyPage />} />
        <Route path="properties/:id/edit" element={<EditPropertyPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#2d8f5f', secondary: '#fff' },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
