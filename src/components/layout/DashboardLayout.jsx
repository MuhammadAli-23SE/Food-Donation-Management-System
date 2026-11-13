import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Sprout,
  LayoutDashboard,
  PlusCircle,
  Package,
  Inbox,
  Clock,
  User,
  LogOut,
  Search,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Users,
  Layers,
  Menu,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DashboardLayout = ({ role }) => {
  const { currentUser: appUser, logout: appLogout, realtimeConnected } = useApp();
  const { user: authUser, profile: authProfile, signOut: authSignOut, isVerified, isPending } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeUser = authUser
    ? {
        name: authProfile?.organization_name || authProfile?.full_name || authUser?.email,
        email: authUser?.email,
        avatar: authProfile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        organizationName: authProfile?.organization_name || authProfile?.restaurant_name,
      }
    : appUser;

  const handleSignOut = async () => {
    if (authSignOut) await authSignOut();
    appLogout();
    navigate('/');
  };

  // Determine whether current path uses /org or /organization
  const isOrgPrefix = location.pathname.startsWith('/org') && !location.pathname.startsWith('/organization');
  const orgBase = isOrgPrefix ? '/org' : '/organization';

  // Navigation definition based on role
  const navConfigs = {
    donor: [
      { name: 'Dashboard', path: '/donor/dashboard', icon: LayoutDashboard },
      { name: 'Post Donation', path: '/donor/create', icon: PlusCircle, highlight: true },
      { name: 'My Listings', path: '/donor/donations', icon: Package },
      { name: 'Incoming Requests', path: '/donor/requests', icon: Inbox },
      { name: 'Kitchen Profile', path: '/donor/profile', icon: User },
    ],
    organization: [
      { name: 'Dashboard', path: `${orgBase}/dashboard`, icon: LayoutDashboard },
      { name: 'Browse Donations', path: `${orgBase}/browse`, icon: Search },
      { name: 'My Requests', path: `${orgBase}/requests`, icon: Inbox },
      { name: 'Track Deliveries', path: `${orgBase}/tracking`, icon: Clock },
      { name: 'Organization Profile', path: `${orgBase}/profile`, icon: User },
    ],
    admin: [
      { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Verify Organizations', path: '/admin/verifications', icon: FileCheck },
      { name: 'Manage Users', path: '/admin/users', icon: Users },
      { name: 'Manage Donations', path: '/admin/donations', icon: Layers },
      { name: 'Request Logs', path: '/admin/requests', icon: Inbox },
    ]
  };

  const navItems = navConfigs[role] || [];

  return (
    <div className="min-h-screen bg-[#F8F6EF] flex flex-col md:flex-row text-[#202720]">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#174D38] text-[#F8F6EF] border-b border-[#216248] sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#C7E78B] flex items-center justify-center text-[#174D38]">
            <Sprout className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-lg tracking-tight font-display">NourishBridge</span>
        </Link>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#C7E78B] hover:bg-[#216248] rounded-xl"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-[#202720]/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#174D38] text-[#F8F6EF] p-6 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-[#216248] shadow-2xl md:shadow-none`}
      >
        <div className="space-y-6">
          {/* Top Logo & Public Link */}
          <div className="flex items-center justify-between pb-4 border-b border-[#216248]">
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="w-9 h-9 rounded-xl bg-[#C7E78B] flex items-center justify-center text-[#174D38] shadow"
              >
                <Sprout className="w-5 h-5 stroke-[2.5]" />
              </motion.div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-[#F8F6EF] font-display">
                  Nourish<span className="text-[#C7E78B]">Bridge</span>
                </span>
              </div>
            </Link>
            <Link
              to="/"
              title="Return to public site"
              className="text-xs text-[#E8EEE6]/70 hover:text-[#C7E78B] p-1.5 rounded-lg hover:bg-[#216248] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Active User Card */}
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-[#0f3426] p-4 rounded-2xl border border-[#216248] text-left shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={activeUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={activeUser?.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#C7E78B] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#F8F6EF] truncate">
                  {activeUser?.organizationName || activeUser?.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Badge variant="lime" size="sm" className="text-[9px] uppercase font-bold py-0 px-2">
                    {role}
                  </Badge>
                  {role === 'organization' && (
                    isPending ? (
                      <span className="text-[10px] text-amber-300 flex items-center gap-0.5 font-semibold">
                        <AlertCircle className="w-3 h-3 text-amber-300" /> Pending
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#C7E78B] flex items-center gap-0.5 font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-[#C7E78B]" /> Verified
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links with layoutId active pill */}
          <nav className="space-y-1.5 text-left">
            <div className="text-[10px] uppercase tracking-widest font-bold text-[#C7E78B]/70 px-3 py-1">
              Workspace Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`relative flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'text-[#174D38]'
                      : item.highlight
                      ? 'bg-[#216248] text-[#C7E78B] hover:bg-[#287456]'
                      : 'text-[#E8EEE6]/80 hover:bg-[#216248] hover:text-[#F8F6EF]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-[#C7E78B] rounded-2xl shadow-sm -z-0"
                    />
                  )}
                  <Icon className="w-4 h-4 shrink-0 relative z-10" />
                  <span className="relative z-10">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#216248] space-y-3">
          <div className="bg-[#0f3426]/70 p-3 rounded-2xl text-[11px] text-[#E8EEE6]/75 border border-[#216248]">
            <p className="font-bold text-[#C7E78B]">💡 Viva Presentation</p>
            <p className="mt-0.5 text-[10px]">Use the floating pill in the bottom corner to switch personas in 1-click.</p>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-[#FDFAF5] border-b border-[#E8EEE6] px-6 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs text-[#202720]/60">
            <span className="font-semibold text-[#174D38] capitalize">{role}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#202720]/40" />
            <h2 className="text-sm font-bold text-[#174D38] font-display capitalize">
              {location.pathname.split('/').pop().replace('-', ' ')}
            </h2>
          </div>

          {/* Quick Action in Header */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              title={realtimeConnected ? "Connected to Supabase Realtime WebSocket" : "Simulated Local Realtime"}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#174D38]/10 text-[#174D38] text-[10px] font-bold border border-[#174D38]/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="hidden sm:inline">Realtime Live</span>
              <span className="sm:hidden">Live</span>
            </div>
            {role === 'donor' && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/donor/create"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#C7E78B]" />
                  <span>Post Surplus</span>
                </Link>
              </motion.div>
            )}
            {role === 'organization' && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/org/browse"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  <Search className="w-3.5 h-3.5 text-[#C7E78B]" />
                  <span>Browse Surplus</span>
                </Link>
              </motion.div>
            )}
            {role === 'admin' && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/admin/verifications"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  <FileCheck className="w-3.5 h-3.5 text-[#C7E78B]" />
                  <span>Review NGOs</span>
                </Link>
              </motion.div>
            )}

            <div className="flex items-center gap-2 pl-3 border-l border-[#E8EEE6]">
              <img
                src={activeUser?.avatar}
                alt={activeUser?.name}
                className="w-8 h-8 rounded-full object-cover border border-[#C7E78B]"
              />
              <span className="hidden md:inline-block text-xs font-bold text-[#174D38]">
                {activeUser?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
