import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sprout, Menu, X, ArrowRight, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Navbar = () => {
  const { currentUser, currentRole, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getDashboardLink = () => {
    if (currentRole === 'donor') return '/donor/dashboard';
    if (currentRole === 'organization') return '/org/dashboard';
    if (currentRole === 'admin') return '/admin/dashboard';
    return '/explore';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Donations', path: '/explore' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'About Mission', path: '/#mission' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F8F6EF]/90 backdrop-blur-md border-b border-[#E8EEE6] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#174D38] flex items-center justify-center text-[#C7E78B] shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-[#174D38] font-display">
                Nourish<span className="text-[#174D38]/80 font-normal">Bridge</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest uppercase font-semibold text-[#174D38]/60">
                Food Redistribution Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#174D38] font-bold'
                    : 'text-[#202720]/75 hover:text-[#174D38]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-2xl text-sm font-semibold shadow-md transition-all group"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#C7E78B]" />
                  <span>{currentRole === 'admin' ? 'Admin Panel' : 'My Dashboard'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <div className="flex items-center gap-2 pl-2 border-l border-[#E8EEE6]">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#C7E78B]"
                  />
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-2 text-[#202720]/60 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-sm font-semibold text-[#174D38] hover:text-[#0f3426] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-sm font-semibold shadow-sm hover:shadow-md transition-all group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-[#C7E78B] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#174D38] hover:bg-[#E8EEE6] rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8EEE6] bg-[#F8F6EF] px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-[#202720] hover:text-[#174D38] rounded-xl hover:bg-[#E8EEE6]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#E8EEE6]">
            {currentUser ? (
              <div className="space-y-2">
                <Link
                  to={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#174D38] text-[#F8F6EF] rounded-2xl text-sm font-semibold"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#C7E78B]" />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-rose-700 text-sm font-semibold"
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
                  className="py-2.5 text-center text-sm font-semibold text-[#174D38] border border-[#174D38] rounded-2xl"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-sm font-semibold text-[#F8F6EF] bg-[#174D38] rounded-2xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
