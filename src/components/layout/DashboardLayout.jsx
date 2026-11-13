import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  LayoutDashboard,
  PlusCircle,
  Package,
  Inbox,
  Clock,
  User,
  LogOut,
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertCircle,
  Shield,
  FileCheck,
  Users,
  Layers,
  Menu,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DashboardLayout = ({ role }) => {
  const { currentUser, currentRole, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      { name: 'Dashboard', path: '/org/dashboard', icon: LayoutDashboard },
      { name: 'Browse Donations', path: '/org/browse', icon: Search },
      { name: 'My Requests', path: '/org/requests', icon: Inbox },
      { name: 'Track Deliveries', path: '/org/tracking', icon: Clock },
      { name: 'Organization Profile', path: '/org/profile', icon: User },
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
      <div className="md:hidden flex items-center justify-between p-4 bg-[#174D38] text-[#F8F6EF] border-b border-[#216248]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#C7E78B] flex items-center justify-center text-[#174D38]">
            <Sprout className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-bold text-lg tracking-tight font-display">NourishBridge</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#C7E78B] hover:bg-[#216248] rounded-xl"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#174D38] text-[#F8F6EF] p-6 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-[#216248] shadow-xl md:shadow-none`}
      >
        <div className="space-y-6">
          {/* Top Logo & Public Link */}
          <div className="flex items-center justify-between pb-4 border-b border-[#216248]">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#C7E78B] flex items-center justify-center text-[#174D38] shadow group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5 stroke-[2.5]" />
              </div>
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
          <div className="bg-[#0f3426] p-4 rounded-2xl border border-[#216248] text-left">
            <div className="flex items-center gap-3">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={currentUser?.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#C7E78B]"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#F8F6EF] truncate">
                  {currentUser?.organizationName || currentUser?.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Badge variant="lime" size="sm" className="text-[10px] uppercase font-bold py-0 px-2">
                    {role}
                  </Badge>
                  {role === 'organization' && (
                    <span className="text-[10px] text-[#C7E78B] flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#C7E78B]" /> Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-left">
            <div className="text-[11px] uppercase tracking-wider font-bold text-[#C7E78B]/70 px-3 py-1">
              Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#C7E78B] text-[#174D38] shadow-sm font-bold'
                        : item.highlight
                        ? 'bg-[#216248] text-[#C7E78B] hover:bg-[#287456]'
                        : 'text-[#E8EEE6]/80 hover:bg-[#216248] hover:text-[#F8F6EF]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#216248] space-y-3">
          <div className="bg-[#0f3426]/60 p-3 rounded-2xl text-[11px] text-[#E8EEE6]/75">
            <p className="font-semibold text-[#C7E78B]">💡 Viva Tip</p>
            <p className="mt-0.5">Use the floating badge to switch roles anytime during evaluation.</p>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-sm font-medium text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-[#FDFAF5] border-b border-[#E8EEE6] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-[#174D38] font-display capitalize">
              {role} Workspace
            </h2>
            <span className="hidden sm:inline-block text-xs bg-[#E8EEE6] text-[#202720]/80 px-2.5 py-1 rounded-full font-medium">
              NourishBridge Network
            </span>
          </div>

          {/* Quick Action in Header */}
          <div className="flex items-center gap-4">
            {role === 'donor' && (
              <Link
                to="/donor/create"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4 text-[#C7E78B]" />
                <span>Post Food</span>
              </Link>
            )}
            {role === 'organization' && (
              <Link
                to="/org/browse"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                <Search className="w-4 h-4 text-[#C7E78B]" />
                <span>Browse Available</span>
              </Link>
            )}
            {role === 'admin' && (
              <Link
                to="/admin/verifications"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                <FileCheck className="w-4 h-4 text-[#C7E78B]" />
                <span>Pending Reviews</span>
              </Link>
            )}

            <div className="flex items-center gap-2 pl-3 border-l border-[#E8EEE6]">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover border border-[#C7E78B]"
              />
              <span className="hidden md:inline-block text-xs font-semibold text-[#174D38]">
                {currentUser?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
