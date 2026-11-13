import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCheck, CheckCircle2, XCircle, FileText, ExternalLink, ShieldCheck, Search } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const VerifyOrgsPage = () => {
  const { organizations, verifyOrganization } = useApp();
  const [filter, setFilter] = useState('all');
  const [inspectModalOrg, setInspectModalOrg] = useState(null);

  const filtered = organizations.filter((org) => {
    if (filter === 'all') return true;
    return org.verificationStatus === filter;
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
          Organization Accreditation & Verification
        </h1>
        <p className="text-xs text-[#202720]/70 mt-1">
          Inspect 501(c)(3) registration certificates and approve non-profit welfare credentials.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 pb-2 border-b border-[#E8EEE6]">
        {['all', 'pending', 'verified', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              filter === tab
                ? 'bg-[#174D38] text-[#F8F6EF]'
                : 'bg-[#FDFAF5] text-[#202720]/70 hover:bg-[#E8EEE6] border border-[#E8EEE6]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] overflow-hidden shadow-sm">
        <div className="divide-y divide-[#E8EEE6]">
          {filtered.map((org) => (
            <div
              key={org.id}
              className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-[#F8F6EF]/50 transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-[#174D38] font-display">
                    {org.name}
                  </h3>
                  <Badge variant={org.verificationStatus} size="sm" className="capitalize font-bold">
                    {org.verificationStatus}
                  </Badge>
                </div>

                <p className="text-xs text-[#202720]/75">
                  Reg #: <strong className="text-[#174D38]">{org.regNumber}</strong> • Representative: {org.repName} ({org.email})
                </p>

                <p className="text-xs text-[#202720]/70 leading-relaxed italic">
                  "{org.mission}"
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#202720]/60 pt-1">
                  <span>Location: {org.address}, {org.city}</span>
                  <span>•</span>
                  <span>Applied: {org.appliedDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0">
                <button
                  onClick={() => setInspectModalOrg(org)}
                  className="px-3.5 py-2 bg-[#F8F6EF] hover:bg-[#E8EEE6] border border-[#E8EEE6] text-[#174D38] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect Cert</span>
                </button>

                {org.verificationStatus !== 'verified' && (
                  <button
                    onClick={() => verifyOrganization(org.id, 'verified')}
                    className="px-4 py-2 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7E78B]" />
                    <span>Approve</span>
                  </button>
                )}

                {org.verificationStatus !== 'rejected' && (
                  <button
                    onClick={() => verifyOrganization(org.id, 'rejected')}
                    className="px-3 py-2 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspect Certificate Modal */}
      <Modal
        isOpen={!!inspectModalOrg}
        onClose={() => setInspectModalOrg(null)}
        title="Accreditation Certificate Audit"
        subtitle={inspectModalOrg ? `Verifying 501(c)(3) submission for ${inspectModalOrg.name}` : ''}
      >
        {inspectModalOrg && (
          <div className="space-y-4">
            <div className="p-4 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#202720]/60">Registration Identifier:</span>
                <span className="font-bold text-[#174D38]">{inspectModalOrg.regNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#202720]/60">Representative:</span>
                <span className="font-semibold text-[#174D38]">{inspectModalOrg.repName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#202720]/60">Official Email:</span>
                <span className="font-semibold">{inspectModalOrg.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#202720]/60">Application Date:</span>
                <span className="font-semibold">{inspectModalOrg.appliedDate}</span>
              </div>
            </div>

            {/* Simulated certificate viewer */}
            <div className="p-6 bg-[#FDFAF5] rounded-2xl border-2 border-dashed border-[#174D38]/30 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#174D38] mx-auto" />
              <p className="text-xs font-bold text-[#174D38]">
                Certificate_Accreditation_Proof.pdf
              </p>
              <p className="text-[11px] text-[#202720]/60 max-w-sm mx-auto">
                Digitally signed certification issued by Washington State Charities Commission.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8EEE6]">
              <button
                type="button"
                onClick={() => setInspectModalOrg(null)}
                className="px-4 py-2 text-xs font-bold text-[#202720]/70 hover:text-[#202720]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  verifyOrganization(inspectModalOrg.id, 'verified');
                  setInspectModalOrg(null);
                }}
                className="px-5 py-2 bg-[#174D38] text-[#F8F6EF] rounded-xl text-xs font-bold"
              >
                Approve Accreditation
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
