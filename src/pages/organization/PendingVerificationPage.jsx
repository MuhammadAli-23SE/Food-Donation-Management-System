import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Clock, CheckCircle2, Search, RefreshCw, LogOut, FileText, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { PageTransition } from '../../components/common/PageTransition';

export const PendingVerificationPage = () => {
  const { profile, user, refreshProfile, signOut, isVerified } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshProfile();
    setTimeout(() => {
      setIsRefreshing(false);
      if (isVerified) {
        navigate('/organization/dashboard');
      }
    }, 700);
  };

  return (
    <PageTransition>
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-xl w-full bg-[#FDFAF5] p-8 sm:p-12 rounded-3xl border border-[#E8EEE6] shadow-2xl space-y-6">
          
          {/* Header Icon & Status */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner"
            >
              <Clock className="w-8 h-8" />
            </motion.div>
            
            <div className="space-y-1">
              <Badge variant="pending" size="md" className="uppercase font-bold tracking-wider">
                Accreditation Pending Review
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
                Application Under Audit
              </h1>
            </div>
            
            <p className="text-xs sm:text-sm text-[#202720]/75 leading-relaxed max-w-md mx-auto">
              Welcome, <strong className="text-[#174D38]">{profile?.organization_name || 'Organization'}</strong>. Your non-profit credentials and 501(c)(3) registration are currently being audited by a platform administrator.
            </p>
          </div>

          {/* Details Card */}
          <div className="p-5 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6] space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8EEE6]">
              <span className="text-[#202720]/60 font-semibold">Contact Representative:</span>
              <span className="font-bold text-[#174D38]">{profile?.contact_person || profile?.full_name}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#E8EEE6]">
              <span className="text-[#202720]/60 font-semibold">Account Email:</span>
              <span className="font-medium text-[#202720]">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#E8EEE6]">
              <span className="text-[#202720]/60 font-semibold">Regional City:</span>
              <span className="font-medium text-[#202720]">{profile?.city || 'Seattle, WA'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#202720]/60 font-semibold">Food Hygiene Compliance:</span>
              <span className="font-bold text-amber-800">Pending Safe Harbor Certification</span>
            </div>
          </div>

          {/* Access Policy Summary */}
          <div className="space-y-2 text-xs">
            <p className="font-bold text-[#174D38] uppercase tracking-wider text-[11px]">
              Access Permissions During Review:
            </p>
            <div className="grid grid-cols-1 gap-1.5 text-[11px] text-[#202720]/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>You can browse the public surplus food catalog in read-only mode.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Food reservation requests and delivery logistics are restricted until verified.</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-3 border-t border-[#E8EEE6]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/explore"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-2xl text-xs font-bold shadow-md transition-all"
              >
                <Search className="w-4 h-4 text-[#C7E78B]" />
                <span>Browse Surplus Food</span>
              </Link>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#FDFAF5] text-[#174D38] hover:bg-[#E8EEE6] border border-[#174D38] rounded-2xl text-xs font-bold transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Checking...' : 'Check Status'}</span>
              </button>
            </div>

            <button
              onClick={signOut}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-700 hover:text-rose-900 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Account</span>
            </button>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
