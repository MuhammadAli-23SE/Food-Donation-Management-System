import React, { useState } from 'react';
import {
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import { MOCK_ORGANIZATIONS_VERIFICATION } from '../../data/mockData';

export default function VerifyOrganizations() {
  const [orgs, setOrgs] = useState(MOCK_ORGANIZATIONS_VERIFICATION);
  const [filter, setFilter] = useState('all');

  const handleStatusChange = (id, newStatus) => {
    setOrgs((prev) =>
      prev.map((org) => (org.id === id ? { ...org, status: newStatus } : org))
    );
  };

  const filteredOrgs = orgs.filter((org) =>
    filter === 'all' ? true : org.status === filter
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="NGO Accreditation & Verification Console"
        subtitle="Review government registration documents and legal welfare status before authorizing organizations to collect donated food."
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold w-fit">
        {[
          { id: 'all', label: 'All Organizations' },
          { id: 'pending', label: 'Pending Review' },
          { id: 'verified', label: 'Verified Partners' },
          { id: 'rejected', label: 'Rejected' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              filter === tab.id
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Organization Cards List */}
      <div className="space-y-4">
        {filteredOrgs.map((org) => (
          <Card key={org.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base font-bold text-slate-900">
                    {org.name}
                  </h3>
                  <Badge variant={org.status} dot size="md">
                    {org.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    License: {org.regNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Representative: <strong>{org.representative}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{org.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{org.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{org.address}, {org.city}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs space-y-1">
                  <p className="text-slate-700">
                    <strong>Welfare Focus:</strong> {org.focusArea}
                  </p>
                  <p className="text-emerald-900 font-medium">
                    <strong>Monthly Community Reach:</strong> {org.estimatedMonthlyBeneficiaries}
                  </p>
                </div>
              </div>

              {/* Document Check & Decision Buttons */}
              <div className="flex flex-col items-start lg:items-end justify-between gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>Submitted: {org.submittedDate}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {org.status !== 'verified' && (
                    <Button
                      variant="primary"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={() => handleStatusChange(org.id, 'verified')}
                    >
                      Approve Accreditation
                    </Button>
                  )}
                  {org.status !== 'rejected' && (
                    <Button
                      variant="danger"
                      size="sm"
                      icon={XCircle}
                      onClick={() => handleStatusChange(org.id, 'rejected')}
                    >
                      Decline Application
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
