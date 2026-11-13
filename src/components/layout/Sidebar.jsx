import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  HeartHandshake,
  LayoutDashboard,
  PlusCircle,
  PackageOpen,
  Inbox,
  Search,
  ShieldCheck,
  Settings,
  LogOut,
  Layers,
} from 'lucide-react';

export default function Sidebar({
  role = 'donor', // 'donor' | 'organization' | 'admin'
  onRoleChange,
  isMobileOpen = false,
  onCloseMobile,
}) {
  const navigate = useNavigate();

  const roleConfig = {
    donor: {
      name: 'Food Donor',
      badge: 'Donor Portal',
      avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&auto=format&fit=crop&q=80',
      entityName: 'Royal Spice Banquet',
      navItems: [
        { label: 'Dashboard Overview', path: '/donor/dashboard', icon: LayoutDashboard },
        { label: 'Post New Donation', path: '/donor/create', icon: PlusCircle, highlight: true },
        { label: 'My Managed Donations', path: '/donor/donations', icon: PackageOpen },
        { label: 'Incoming Requests', path: '/donor/requests', icon: Inbox, count: 2 },
      ],
    },
    organization: {
      name: 'Welfare Organization',
      badge: 'Verified NGO',
      avatar: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&auto=format&fit=crop&q=80',
      entityName: 'Hope Haven Kitchen',
      navItems: [
        { label: 'Dashboard Overview', path: '/org/dashboard', icon: LayoutDashboard },
        { label: 'Browse Food Catalog', path: '/donations', icon: Search },
        { label: 'Our Active Requests', path: '/org/my-requests', icon: Inbox, count: 1 },
      ],
    },
    admin: {
      name: 'System Administrator',
      badge: 'Admin Console',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      entityName: 'Central Admin Team',
      navItems: [
        { label: 'System Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Verify Organizations', path: '/admin/verify-orgs', icon: ShieldCheck, count: 2 },
        { label: 'Browse Food Catalog', path: '/donations', icon: Search },
      ],
    },
  };

  const currentConfig = roleConfig[role] || roleConfig.donor;

  const handleRoleSwitch = (newRole) => {
    if (onRoleChange) {
      onRoleChange(newRole);
    }
    if (newRole === 'donor') navigate('/donor/dashboard');
    if (newRole === 'organization') navigate('/org/dashboard');
    if (newRole === 'admin') navigate('/admin/dashboard');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-slate-900 leading-none">
              Nourish<span className="text-emerald-700">Bridge</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              Enterprise Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Role Switcher Pill (Crucial for Viva Demonstrations) */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
            <Layers className="w-3 h-3 text-emerald-700" />
            Switch Active Role:
          </span>
          <span className="text-[10px] text-emerald-800 font-medium">Demo Mode</span>
        </div>
        <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleRoleSwitch('donor')}
            className={`py-1 rounded text-center transition-all ${
              role === 'donor'
                ? 'bg-white text-emerald-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Donor
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch('organization')}
            className={`py-1 rounded text-center transition-all ${
              role === 'organization'
                ? 'bg-white text-emerald-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            NGO
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch('admin')}
            className={`py-1 rounded text-center transition-all ${
              role === 'admin'
                ? 'bg-white text-emerald-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {currentConfig.badge}
        </div>

        {currentConfig.navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 font-semibold border-l-4 border-emerald-800'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                <span>{item.label}</span>
              </div>
              {item.count && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-5 mt-5 border-t border-slate-100 px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          General
        </div>

        <NavLink
          to="/donations"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-emerald-50 text-emerald-900 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`
          }
        >
          <Search className="w-4 h-4 shrink-0 text-slate-500" />
          <span>Public Food Listings</span>
        </NavLink>

        <NavLink
          to="/settings"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-emerald-50 text-emerald-900 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`
          }
        >
          <Settings className="w-4 h-4 shrink-0 text-slate-500" />
          <span>Profile Settings</span>
        </NavLink>
      </div>

      {/* Current User Footnote */}
      <div className="p-3 border-t border-slate-200/90 bg-slate-50/70">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200/70 shadow-2xs">
          <img
            src={currentConfig.avatar}
            alt={currentConfig.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">
              {currentConfig.entityName}
            </p>
            <p className="text-[11px] text-slate-500 truncate capitalize">
              {currentConfig.name}
            </p>
          </div>
          <Link
            to="/login"
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
