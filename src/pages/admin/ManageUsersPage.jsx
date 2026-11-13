import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Search, Shield, Utensils, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { PageTransition } from '../../components/common/PageTransition';

export const ManageUsersPage = () => {
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');

  const allUsers = [
    {
      id: 'usr_donor_01',
      name: 'Marcus Vance',
      org: 'Golden Crust Artisan Bakery',
      email: 'marcus@artisanbakery.com',
      role: 'donor',
      phone: '+1 (555) 234-8901',
      city: 'Seattle, WA',
      status: 'active',
      joined: 'Jan 2024'
    },
    {
      id: 'usr_donor_02',
      name: 'Chef Antoine Laurent',
      org: "L'Étoile Mediterranean Brasserie",
      email: 'antoine@letoile.com',
      role: 'donor',
      phone: '+1 (555) 881-2291',
      city: 'Seattle, WA',
      status: 'active',
      joined: 'Mar 2024'
    },
    {
      id: 'usr_org_01',
      name: 'Elena Rostova',
      org: 'Hope Community Kitchen & Shelter',
      email: 'elena@hopecommunity.org',
      role: 'organization',
      phone: '+1 (555) 892-4412',
      city: 'Seattle, WA',
      status: 'verified',
      joined: 'Oct 2026'
    },
    {
      id: 'usr_org_02',
      name: 'Father Marcus Hall',
      org: 'St. Vincent Youth Food Bank',
      email: 'marcus@stvincentyouth.org',
      role: 'organization',
      phone: '+1 (555) 431-9002',
      city: 'Seattle, WA',
      status: 'verified',
      joined: 'Nov 2026'
    },
    {
      id: 'usr_org_03',
      name: 'Amina Jama',
      org: 'Rainier Valley Food Relief',
      email: 'amina@rainierrelief.org',
      role: 'organization',
      phone: '+1 (555) 772-1920',
      city: 'Rainier Beach, WA',
      status: 'pending',
      joined: 'Nov 2026'
    },
    {
      id: 'usr_admin_01',
      name: 'Dr. Alistair Chen',
      org: 'NourishBridge Operations Trust',
      email: 'admin@nourishbridge.org',
      role: 'admin',
      phone: '+1 (555) 100-2020',
      city: 'Seattle, WA',
      status: 'active',
      joined: '2023'
    }
  ];

  const filtered = allUsers.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.org.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <PageTransition>
      <div className="space-y-6 text-left">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            User & Partner Management
          </h1>
          <p className="text-xs text-[#202720]/70 mt-1">
            Directory of registered commercial kitchens, non-profit organizations, and platform administrators.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#202720]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, organization, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'donor', 'organization', 'admin'].map((r) => {
              const isActive = roleFilter === r;
              return (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                    isActive ? 'text-[#F8F6EF]' : 'text-[#202720]/70 hover:bg-[#E8EEE6] bg-[#F8F6EF] border border-[#E8EEE6]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="userRoleTabPill"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-[#174D38] rounded-xl shadow-sm -z-0"
                    />
                  )}
                  <span className="relative z-10">{r === 'all' ? 'All Roles' : r}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Table */}
        <div className="bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] overflow-hidden shadow-sm">
          <div className="divide-y divide-[#E8EEE6]">
            {filtered.map((user) => (
              <motion.div
                key={user.id}
                layout
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8F6EF]/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8EEE6] text-[#174D38] flex items-center justify-center font-bold text-sm shrink-0">
                    {user.role === 'donor' && <Utensils className="w-5 h-5" />}
                    {user.role === 'organization' && <Building2 className="w-5 h-5" />}
                    {user.role === 'admin' && <Shield className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#174D38] font-display">
                        {user.name}
                      </h3>
                      <Badge variant="lime" size="sm" className="capitalize text-[10px] font-bold">
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#202720]/80 font-medium">
                      {user.org}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#202720]/60 pt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#174D38]" /> {user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#174D38]" /> {user.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#174D38]" /> {user.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 capitalize">
                    {user.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
};
