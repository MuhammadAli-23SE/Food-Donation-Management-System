import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Shield, Building2, Utensils, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoRoleSwitcher = () => {
  const { currentRole, switchRole, currentUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectRole = (role, targetRoute) => {
    switchRole(role);
    if (targetRoute) {
      navigate(targetRoute);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans">
      <div className="bg-[#174D38] text-[#F8F6EF] rounded-2xl shadow-2xl border border-[#216248] p-1.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Main quick toggle pill */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 px-3 py-2 bg-[#216248]/60 hover:bg-[#216248] rounded-xl text-xs font-semibold tracking-wide uppercase transition-all"
            title="Switch demo persona for viva / presentation"
          >
            <div className="w-2 h-2 rounded-full bg-[#C7E78B] animate-pulse"></div>
            <span>Demo Mode:</span>
            <span className="text-[#C7E78B] font-bold">
              {currentRole.toUpperCase()}
            </span>
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-2 pt-2 border-t border-[#216248]/80 flex flex-col gap-1 w-64 text-left p-1">
            <div className="text-[10px] uppercase font-bold text-[#C7E78B] tracking-wider px-2 py-0.5">
              Instant Persona Switcher (For Viva)
            </div>

            <button
              onClick={() => handleSelectRole('donor', '/donor/dashboard')}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-left transition-colors ${
                currentRole === 'donor'
                  ? 'bg-[#C7E78B] text-[#174D38] font-bold'
                  : 'text-[#F8F6EF] hover:bg-[#216248]'
              }`}
            >
              <Utensils className="w-4 h-4 shrink-0" />
              <div>
                <p className="leading-tight font-semibold">Donor Persona</p>
                <p className="text-[10px] opacity-75">Golden Crust Bakery</p>
              </div>
            </button>

            <button
              onClick={() => handleSelectRole('organization', '/org/dashboard')}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-left transition-colors ${
                currentRole === 'organization'
                  ? 'bg-[#C7E78B] text-[#174D38] font-bold'
                  : 'text-[#F8F6EF] hover:bg-[#216248]'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <div>
                <p className="leading-tight font-semibold">Organization Persona</p>
                <p className="text-[10px] opacity-75">Hope Community Kitchen</p>
              </div>
            </button>

            <button
              onClick={() => handleSelectRole('admin', '/admin/dashboard')}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-left transition-colors ${
                currentRole === 'admin'
                  ? 'bg-[#C7E78B] text-[#174D38] font-bold'
                  : 'text-[#F8F6EF] hover:bg-[#216248]'
              }`}
            >
              <Shield className="w-4 h-4 shrink-0" />
              <div>
                <p className="leading-tight font-semibold">Admin Persona</p>
                <p className="text-[10px] opacity-75">Dr. Alistair Chen (Ops)</p>
              </div>
            </button>

            <button
              onClick={() => handleSelectRole('visitor', '/')}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-left transition-colors ${
                currentRole === 'visitor'
                  ? 'bg-[#C7E78B] text-[#174D38] font-bold'
                  : 'text-[#F8F6EF] hover:bg-[#216248]'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <div>
                <p className="leading-tight font-semibold">Public Visitor</p>
                <p className="text-[10px] opacity-75">Logged out view</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
