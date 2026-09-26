import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, PlusCircle, LogOut,
  Menu, X, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Properties', href: '/admin/properties', icon: Building2 },
  { label: 'Add Property', href: '/admin/properties/new', icon: PlusCircle },
];

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-stone-950 text-stone-300">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-stone-800">
        <Link to="/admin/dashboard" className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-display font-bold text-white text-xl shadow-glow">
            V
          </div>
          <div>
            <div className="font-display font-bold text-white text-xl tracking-widest">VILSTAY</div>
            <div className="text-brand-400 text-xs font-semibold uppercase tracking-wider">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4">
        <p className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-4 px-4">Management</p>
        <ul className="space-y-2">
          {sidebarLinks.map(({ label, href, icon: Icon }) => {
            const isActive = location.pathname === href ||
              (href !== '/admin/dashboard' && location.pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  to={href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group',
                    isActive
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-stone-400 hover:bg-stone-900 hover:text-white'
                  )}
                >
                  <Icon size={20} className={isActive ? 'text-white' : 'text-stone-500 group-hover:text-brand-400'} />
                  {label}
                  {isActive && <ChevronRight size={16} className="ml-auto opacity-70" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / Logout */}
      <div className="px-4 py-6 border-t border-stone-800">
        <Link
          to="/"
          className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-stone-400 hover:bg-stone-900 hover:text-white mb-2 transition-all duration-300 group"
        >
          <Building2 size={20} className="text-stone-500 group-hover:text-stone-300" />
          View Live Site
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full transition-all duration-300 group"
        >
          <LogOut size={20} className="text-red-500 group-hover:text-red-400" />
          Secure Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-stone-950 fixed inset-y-0 left-0 z-30 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-stone-950 z-50 lg:hidden shadow-2xl"
            >
              <div className="absolute top-6 right-6">
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-lg font-bold text-stone-900">Admin Portal</h2>
              <p className="text-stone-500 text-xs font-medium uppercase tracking-wider">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-stone-900">System Admin</div>
              <div className="text-xs text-stone-500 font-medium">admin@vilstay.com</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white text-sm font-bold shadow-md">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
