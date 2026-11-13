import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  FileCheck,
  Users,
  Layers,
  Inbox,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Activity
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminDashboard = () => {
  const { organizations, donations, requests, activities, verifyOrganization } = useApp();

  const pendingOrgs = organizations.filter((o) => o.verificationStatus === 'pending');
  const verifiedOrgsCount = organizations.filter((o) => o.verificationStatus === 'verified').length;

  return (
    <div className="space-y-8 text-left">
      
      {/* Admin Executive Header */}
      <div className="bg-[#202720] text-[#F8F6EF] rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c352c] text-[#C7E78B] text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-[#C7E78B]" />
              <span>Platform Trust & Compliance Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
              System Control & Operations
            </h1>
            <p className="text-sm text-[#E8EEE6]/80 max-w-xl">
              Auditing surplus food rescue compliance, inspecting non-profit certifications, and monitoring citywide fulfillment metrics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/verifications"
              className="flex items-center gap-2 px-5 py-3 bg-[#C7E78B] text-[#174D38] hover:bg-[#b1d86d] rounded-2xl text-xs font-bold shadow-md transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>Review Pending NGOs ({pendingOrgs.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
            <span>Pending Verifications</span>
            <FileCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-display text-amber-800">
            {pendingOrgs.length}
          </p>
          <p className="text-[11px] text-[#202720]/60 font-medium mt-1">Non-profits awaiting audit</p>
        </div>

        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
            <span>Accredited Charities</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            {verifiedOrgsCount}
          </p>
          <p className="text-[11px] text-emerald-800 font-medium mt-1">Verified 501(c)(3) entities</p>
        </div>

        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
            <span>Active Surplus Listings</span>
            <Layers className="w-4 h-4 text-[#174D38]" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            {donations.length}
          </p>
          <p className="text-[11px] text-[#202720]/60 font-medium mt-1">Across 5 food categories</p>
        </div>

        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
            <span>Total Requests</span>
            <Inbox className="w-4 h-4 text-[#174D38]" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            {requests.length}
          </p>
          <p className="text-[11px] text-[#202720]/60 font-medium mt-1">Fulfillment chain tracked</p>
        </div>
      </div>

      {/* Pending NGO Verification Spotlight */}
      {pendingOrgs.length > 0 && (
        <div className="bg-[#FDFAF5] rounded-3xl border-2 border-amber-300 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <AlertCircle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-base text-[#174D38] font-display">
                  Urgent NGO Accreditation Audits ({pendingOrgs.length})
                </h3>
                <p className="text-xs text-[#202720]/70">
                  Charities awaiting documentation approval before they can request food donations.
                </p>
              </div>
            </div>
            <Link to="/admin/verifications" className="text-xs font-bold text-[#174D38] hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {pendingOrgs.map((org) => (
              <div
                key={org.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6]"
              >
                <div>
                  <h4 className="font-bold text-sm text-[#174D38]">{org.name}</h4>
                  <p className="text-xs text-[#202720]/70">
                    Reg: <span className="font-semibold">{org.regNumber}</span> • Applied: {org.appliedDate}
                  </p>
                  <p className="text-[11px] text-[#202720]/60 italic mt-0.5">
                    "{org.mission}"
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => verifyOrganization(org.id, 'rejected')}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => verifyOrganization(org.id, 'verified')}
                    className="px-4 py-1.5 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7E78B]" />
                    <span>Approve Non-Profit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* System Activity Audit Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#174D38]" />
            <h3 className="text-xl font-bold font-display text-[#174D38]">
              Live System Activity & Audit Trail
            </h3>
          </div>
          <span className="text-xs text-[#202720]/60">Auto-logged</span>
        </div>

        <div className="bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] overflow-hidden shadow-sm divide-y divide-[#E8EEE6]">
          {activities.map((act) => (
            <div key={act.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#F8F6EF]/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8EEE6] flex items-center justify-center text-[#174D38] font-bold text-xs">
                  {act.actorRole[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#174D38]">{act.action}</span>
                    <Badge variant="lime" size="sm" className="text-[10px] py-0 px-2 font-bold">
                      {act.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#202720]/75 mt-0.5">
                    <strong>{act.actor}</strong> ({act.actorRole}): {act.target}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-[#202720]/50 shrink-0 font-medium">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
