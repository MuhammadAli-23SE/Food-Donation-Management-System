import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Sprout, Menu, X, ArrowRight, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Navbar = () => {
  const { currentUser: appUser, currentRole: appRole, logout: appLogout, realtimeConnected } = useApp();
  const { user: authUser, profile: authProfile, role: authRole, signOut: authSignOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeUser = authUser
    ? {
        name: authProfile?.full_name || authProfile?.organization_name || authUser?.email,
        email: authUser?.email,
        avatar: authProfile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        organizationName: authProfile?.organization_name,
      }
    : appUser;

  const activeRole = authRole || appRole;

  const handleLogout = async () => {
    if (authSignOut) await authSignOut();
    appLogout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (activeRole === 'donor') return '/donor/dashboard';
    if (activeRole === 'organization') return '/organization/dashboard';
    if (activeRole === 'admin') return '/admin/dashboard';
    return '/explore';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Donations', path: '/explore' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'About Mission', path: '/#mission' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F8F6EF]/85 backdrop-blur-md border-b border-[#E8EEE6]/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-11 h-11 rounded-2xl bg-[#174D38] flex items-center justify-center text-[#C7E78B] shadow-md"
            >
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </motion.div>
            <div className="text-left">
              <span className="text-2xl font-extrabold tracking-tight text-[#174D38] font-display">
                Nourish<span className="text-[#174D38]/80 font-normal">Bridge</span>
              </span>
              <span className="hidden sm:block text-[9px] tracking-widest uppercase font-bold text-[#174D38]/60">
                Surplus Food Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Animated Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FDFAF5] p-1.5 rounded-full border border-[#E8EEE6]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    isActive ? 'text-[#F8F6EF]' : 'text-[#202720]/75 hover:text-[#174D38]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbarActivePill"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-[#174D38] rounded-full -z-10 shadow-sm"
                    />
                  )}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            <div
              title={realtimeConnected ? "Connected to Supabase Realtime WebSocket" : "Simulated Local Realtime"}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#174D38]/10 text-[#174D38] text-[10px] font-bold border border-[#174D38]/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Live Network</span>
            </div>

            {activeUser ? (
              <div className="flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-2xl text-xs font-bold shadow-md transition-all group"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#C7E78B]" />
                    <span className="capitalize">{activeRole === 'admin' ? 'Admin Panel' : 'My Dashboard'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C7E78B] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <div className="flex items-center gap-2 pl-2 border-l border-[#E8EEE6]">
                  <img
                    src={activeUser.avatar}
                    alt={activeUser.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#C7E78B] shadow-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 text-[#202720]/60 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-xs font-bold text-[#174D38] hover:text-[#0f3426] transition-colors"
                >
                  Log In
                </Link>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-sm hover:shadow-md transition-all group"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C7E78B] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#174D38] hover:bg-[#E8EEE6] rounded-2xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#E8EEE6] bg-[#FDFAF5] px-4 pt-4 pb-6 space-y-3 overflow-hidden text-left"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 text-sm font-bold text-[#202720] hover:text-[#174D38] rounded-2xl hover:bg-[#E8EEE6] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#E8EEE6]">
              {activeUser ? (
                <div className="space-y-2">
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#174D38] text-[#F8F6EF] rounded-2xl text-xs font-bold"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#C7E78B]" />
                    <span>Go to Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 text-rose-700 text-xs font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center text-xs font-bold text-[#174D38] border border-[#174D38] rounded-2xl"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center text-xs font-bold text-[#F8F6EF] bg-[#174D38] rounded-2xl"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
