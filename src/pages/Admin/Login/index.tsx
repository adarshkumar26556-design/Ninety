import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { authApi } from '../../../services/authApi';
import { useAuth } from '../../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      if (response.data?.token) {
        login(response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      // For demo mode, allow admin@vilstay.com / admin123
      if (email === 'admin@vilstay.com' && password === 'admin123') {
        login('demo-token-vilstay-admin-2024');
        navigate('/admin/dashboard');
        return;
      }
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center font-display font-bold text-3xl text-white mx-auto mb-6 shadow-glow">
            V
          </div>
          <h2 className="mt-6 text-center font-display text-4xl font-bold text-white tracking-wide">
            VILSTAY <span className="text-brand-400">Admin</span>
          </h2>
          <p className="mt-3 text-center text-sm text-stone-400 font-medium uppercase tracking-widest">
            Secure Access Portal
          </p>
        </motion.div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white px-8 py-10 shadow-2xl sm:rounded-3xl border border-stone-100 mx-4 sm:mx-0"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl p-4 mb-8 text-sm font-medium"
            >
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              {error}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm font-medium"
                  placeholder="admin@vilstay.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-sm font-medium"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-70 transition-all hover:shadow-glow hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 pt-8 border-t border-stone-100 text-center">
            <p className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Demo Access</p>
            <div className="inline-flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-lg text-stone-600 text-xs font-mono font-medium">
              admin@vilstay.com <span className="text-stone-300">|</span> admin123
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
