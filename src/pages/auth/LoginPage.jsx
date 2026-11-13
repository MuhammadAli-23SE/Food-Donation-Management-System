import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Sprout, ArrowRight, Utensils, Building2, Shield, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { PageTransition } from '../../components/common/PageTransition';

export const LoginPage = () => {
  const { signIn, signInAsPersona } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDemoLogins, setShowDemoLogins] = useState(true);

  // Determine redirection after login
  const handleRedirect = (role, verificationStatus) => {
    // Check if user came from a protected route
    const from = location.state?.from?.pathname;
    if (from && !from.includes('/login') && !from.includes('/register')) {
      navigate(from, { replace: true });
      return;
    }

    if (role === 'donor') {
      navigate('/donor/dashboard', { replace: true });
    } else if (role === 'organization') {
      if (verificationStatus === 'pending') {
        navigate('/organization/pending', { replace: true });
      } else {
        navigate('/organization/dashboard', { replace: true });
      }
    } else if (role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const { data, profile, error } = await signIn({ email, password });
      if (error) {
        setErrorMessage(
          error.message === 'Invalid login credentials'
            ? 'Invalid email or password. Please check your credentials.'
            : error.message || 'Login failed. Please try again.'
        );
        setIsSubmitting(false);
        return;
      }

      const userRole = profile?.role || data?.user?.user_metadata?.role || 'donor';
      const userStatus = profile?.verification_status || (userRole === 'organization' ? 'pending' : 'verified');
      handleRedirect(userRole, userStatus);
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoLogin = (role) => {
    const profile = signInAsPersona(role);
    handleRedirect(role, profile?.verification_status || 'verified');
  };

  return (
    <PageTransition>
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-md w-full space-y-6 bg-[#FDFAF5] p-8 sm:p-10 rounded-3xl border border-[#E8EEE6] shadow-2xl">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.05 }}
              className="w-12 h-12 rounded-2xl bg-[#174D38] flex items-center justify-center text-[#C7E78B] mx-auto shadow-md"
            >
              <Sprout className="w-7 h-7 stroke-[2.5]" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
              Welcome Back
            </h2>
            <p className="text-xs text-[#202720]/70">
              Sign in to your RePlate authenticated workspace
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Traditional Credentials Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#202720]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-bold text-[#174D38] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#202720]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#202720]/40 hover:text-[#202720]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#F8F6EF] border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Account</span>
              )}
            </motion.button>
          </form>

          {/* 1-Click Persona Logins (Academic Viva / Evaluation) */}
          <div className="pt-2 border-t border-[#E8EEE6] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#174D38]">
                Viva Evaluator Quick-Access
              </span>
              <button
                type="button"
                onClick={() => setShowDemoLogins(!showDemoLogins)}
                className="text-[10px] text-[#202720]/60 hover:text-[#174D38] font-semibold underline"
              >
                {showDemoLogins ? 'Hide' : 'Show'}
              </button>
            </div>

            {showDemoLogins && (
              <div className="grid grid-cols-1 gap-2 pt-1">
                <motion.button
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleQuickDemoLogin('donor')}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F8F6EF] hover:bg-[#E8EEE6] border border-[#E8EEE6] text-xs font-semibold text-[#174D38] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#174D38] text-[#C7E78B] flex items-center justify-center">
                      <Utensils className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-xs">Enter as Food Donor</p>
                      <p className="text-[10px] text-[#202720]/60">Golden Crust Artisan Bakery</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#174D38] group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleQuickDemoLogin('organization')}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F8F6EF] hover:bg-[#E8EEE6] border border-[#E8EEE6] text-xs font-semibold text-[#174D38] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#C7E78B] text-[#174D38] flex items-center justify-center">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-xs">Enter as Welfare Organization</p>
                      <p className="text-[10px] text-[#202720]/60">Hope Community Kitchen & Shelter</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#174D38] group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin')}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[#F8F6EF] hover:bg-[#E8EEE6] border border-[#E8EEE6] text-xs font-semibold text-[#174D38] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#202720] text-[#F8F6EF] flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-[#C7E78B]" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-xs">Enter as Administrator</p>
                      <p className="text-[10px] text-[#202720]/60">Dr. Alistair Chen (Operations)</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#174D38] group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Footer Link */}
          <p className="text-center text-xs text-[#202720]/70 pt-2 border-t border-[#E8EEE6]">
            New to RePlate?{' '}
            <Link to="/register" className="font-bold text-[#174D38] hover:underline">
              Register your kitchen or charity
            </Link>
          </p>

        </div>
      </div>
    </PageTransition>
  );
};
