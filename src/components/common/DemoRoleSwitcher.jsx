import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Users, Shield, Building2, Utensils, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoRoleSwitcher = () => {
  const { currentRole, switchRole } = useApp();
  const { role: authRole, signInAsPersona, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const activeRole = authRole || currentRole;

  const handleSelectRole = (role, targetRoute) => {
    if (role === 'visitor') {
      signOut();
      switchRole('visitor');
    } else {
      signInAsPersona(role);
      switchRole(role);
    }
    if (targetRoute) {
      navigate(targetRoute);
    }
  };

  const personas = [
    {
      role: 'donor',
      route: '/donor/dashboard',
      label: 'Donor Persona',
      sub: 'Golden Crust Artisan Bakery',
      icon: Utensils
    },
    {
      role: 'organization',
      route: '/org/dashboard',
      label: 'Welfare NGO Persona',
      sub: 'Hope Community Kitchen',
      icon: Building2
    },
    {
      role: 'admin',
      route: '/admin/dashboard',
      label: 'Admin Persona',
      sub: 'Dr. Alistair Chen (Operations)',
      icon: Shield
    },
    {
      role: 'visitor',
      route: '/',
      label: 'Public Visitor',
      sub: 'Logged-out landing view',
      icon: Users
    }
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="absolute bottom-full right-0 mb-3 w-72 bg-[#174D38] text-[#F8F6EF] rounded-3xl shadow-2xl border border-[#216248] p-3 text-left backdrop-blur-xl"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#216248] px-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C7E78B]">
                  Viva Demo Role Switcher
                </span>
                <span className="text-[9px] text-[#E8EEE6]/60">1-Click Live Switch</span>
              </div>

              <div className="space-y-1">
                {personas.map((p) => {
                  const Icon = p.icon;
                  const isActive = activeRole === p.role;

                  return (
                    <motion.button
                      key={p.role}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectRole(p.role, p.route)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs text-left transition-all ${
                        isActive
                          ? 'bg-[#C7E78B] text-[#174D38] font-bold shadow-sm'
                          : 'text-[#F8F6EF] hover:bg-[#216248]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive ? 'bg-[#174D38] text-[#C7E78B]' : 'bg-[#0f3426] text-[#C7E78B]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="leading-tight font-bold">{p.label}</p>
                          <p className={`text-[10px] ${isActive ? 'text-[#174D38]/80' : 'text-[#E8EEE6]/65'}`}>
                            {p.sub}
                          </p>
                        </div>
                      </div>

                      {isActive && <Check className="w-4 h-4 text-[#174D38] stroke-[3]" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Pill */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-[#174D38] text-[#F8F6EF] rounded-2xl shadow-xl border border-[#216248] text-xs font-semibold tracking-wide backdrop-blur-md hover:bg-[#0f3426] transition-colors"
          title="Toggle Viva Persona Menu"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7E78B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7E78B]"></span>
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#E8EEE6]/80 font-medium">Demo:</span>
          <span className="text-[#C7E78B] font-extrabold uppercase text-xs">
            {activeRole}
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 ml-0.5" /> : <ChevronUp className="w-3.5 h-3.5 ml-0.5" />}
        </motion.button>
      </div>
    </div>
  );
};
