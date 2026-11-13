import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sprout, ArrowRight, Utensils, Building2, Shield, Lock, Mail } from 'lucide-react';
import { DEMO_USERS } from '../../data/mockData';

export const LoginPage = () => {
  const { loginAs } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('donor');

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    loginAs(selectedRole);
    if (selectedRole === 'donor') navigate('/donor/dashboard');
    else if (selectedRole === 'organization') navigate('/org/dashboard');
    else navigate('/admin/dashboard');
  };

  const handleQuickDemoLogin = (role) => {
    loginAs(role);
    if (role === 'donor') navigate('/donor/dashboard');
    else if (role === 'organization') navigate('/org/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-md w-full space-y-8 bg-[#FDFAF5] p-8 sm:p-10 rounded-3xl border border-[#E8EEE6] shadow-xl">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#174D38] flex items-center justify-center text-[#C7E78B] mx-auto shadow-md">
            <Sprout className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            Welcome Back
          </h2>
          <p className="text-xs text-[#202720]/70">
            Sign in to access your redistribution dashboard
          </p>
        </div>

        {/* 1-Click Persona Logins (Perfect for Academic Viva Demonstration) */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center gap-2">
            <div className="h-px bg-[#E8EEE6] flex-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#174D38] px-2 bg-[#E8EEE6] rounded-full py-0.5">
              1-Click Viva Demo Logins
            </span>
            <div className="h-px bg-[#E8EEE6] flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              onClick={() => handleQuickDemoLogin('donor')}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F6EF] hover:bg-[#E8EEE6] border border-[#E8EEE6] text-xs font-semibold text-[#174D38] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#174D38] text-[#C7E78B] flex items-center justify-center">
                  <Utensils className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Enter as Donor</p>
                  <p className="text-[10px] text-[#202720]/60">Golden Crust Artisan Bakery</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#174D38] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleQuickDemoLogin('organization')}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F6EF] hover:bg-[#E8EEE6] border border-[#E8EEE6] text-xs font-semibold text-[#174D38] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#C7E78B] text-[#174D38] flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Enter as Organization</p>
                  <p className="text-[10px] text-[#202720]/60">Hope Community Kitchen & Shelter</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#174D38] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F6EF] hover:bg-[#E8EEE6] border border-[#E8EEE6] text-xs font-semibold text-[#174D38] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#202720] text-[#F8F6EF] flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Enter as Administrator</p>
                  <p className="text-[10px] text-[#202720]/60">Dr. Alistair Chen (Operations)</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#174D38] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Traditional Form Option */}
        <form onSubmit={handleCustomSubmit} className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="h-px bg-[#E8EEE6] flex-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#202720]/40">
              Or Sign In With Credentials
            </span>
            <div className="h-px bg-[#E8EEE6] flex-1" />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
              Select Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#174D38]"
            >
              <option value="donor">Food Donor (Restaurant / Commercial Kitchen)</option>
              <option value="organization">Welfare Organization (NGO / Shelter)</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

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
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#202720]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
          >
            Sign In to Account
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#202720]/70 pt-2">
          New to NourishBridge?{' '}
          <Link to="/register" className="font-bold text-[#174D38] hover:underline">
            Register your kitchen or charity
          </Link>
        </p>

      </div>
    </div>
  );
};
