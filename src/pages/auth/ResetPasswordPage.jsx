import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Sprout, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageTransition } from '../../components/common/PageTransition';

export const ResetPasswordPage = () => {
  const { updatePassword, role } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await updatePassword(password);
      if (error) {
        setErrorMessage(error.message || 'Failed to update password.');
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          if (role === 'donor') navigate('/donor/dashboard');
          else if (role === 'organization') navigate('/organization/dashboard');
          else if (role === 'admin') navigate('/admin/dashboard');
          else navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-md w-full space-y-6 bg-[#FDFAF5] p-8 sm:p-10 rounded-3xl border border-[#E8EEE6] shadow-2xl">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#174D38] flex items-center justify-center text-[#C7E78B] mx-auto shadow-md">
              <Sprout className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
              Set New Password
            </h2>
            <p className="text-xs text-[#202720]/70">
              Please enter your new secure password below.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 space-y-2 text-xs text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              <p className="font-bold text-sm text-[#174D38]">Password Updated Successfully!</p>
              <p className="text-[#202720]/75">
                Redirecting you to your workspace dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#202720]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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

              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#202720]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Updating Password...' : 'Save New Password'}
              </motion.button>
            </form>
          )}

        </div>
      </div>
    </PageTransition>
  );
};
