import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Heart, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#174D38] text-[#F8F6EF] pt-16 pb-12 border-t border-[#216248]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#216248]">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C7E78B] flex items-center justify-center text-[#174D38] shadow">
                <Sprout className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-[#F8F6EF] font-display">
                Nourish<span className="text-[#C7E78B]">Bridge</span>
              </span>
            </div>
            <p className="text-sm text-[#E8EEE6]/80 leading-relaxed max-w-sm">
              Connecting commercial kitchens, bakeries, and food producers with accredited welfare organizations to eliminate food waste and nourish communities.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C7E78B] bg-[#0f3426] px-3.5 py-2 rounded-xl inline-flex border border-[#216248]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Accredited Safety & Certified NGO Verification System</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#C7E78B] mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-[#E8EEE6]/80">
              <li>
                <Link to="/explore" className="hover:text-[#C7E78B] transition-colors">
                  Explore Donations
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-[#C7E78B] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#impact" className="hover:text-[#C7E78B] transition-colors">
                  Impact Metrics
                </a>
              </li>
              <li>
                <a href="/#mission" className="hover:text-[#C7E78B] transition-colors">
                  Our Mission
                </a>
              </li>
            </ul>
          </div>

          {/* Role Portals */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#C7E78B] mb-4">Portals</h4>
            <ul className="space-y-2.5 text-sm text-[#E8EEE6]/80">
              <li>
                <Link to="/donor/dashboard" className="hover:text-[#C7E78B] flex items-center gap-1 transition-colors">
                  Donor Portal <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/org/dashboard" className="hover:text-[#C7E78B] flex items-center gap-1 transition-colors">
                  Organization Portal <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-[#C7E78B] flex items-center gap-1 transition-colors">
                  Admin Verification <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#C7E78B] transition-colors">
                  Register Organization
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Viva Note */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#C7E78B] mb-4">Academic Project</h4>
            <p className="text-xs text-[#E8EEE6]/70 leading-relaxed mb-3">
              Designed as an Enterprise Application Development Capstone. Role-Based Access Control, Real-Time State Management & BaaS Ready.
            </p>
            <div className="p-3 rounded-2xl bg-[#0f3426] border border-[#216248] text-[11px] text-[#E8EEE6]/90">
              <span className="font-semibold text-[#C7E78B]">Viva Demonstration:</span> Use the bottom-right floating badge to switch roles dynamically.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8EEE6]/60 gap-4">
          <p>© 2026 NourishBridge System. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C7E78B] fill-[#C7E78B]" />
            <span>for zero hunger & food sustainability</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
