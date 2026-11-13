import React, { useState } from 'react';
import {
  Inbox,
  Check,
  X,
  Phone,
  Clock,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import { MOCK_REQUESTS } from '../../data/mockData';

export default function DonorRequests() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [filter, setFilter] = useState('all');

  const handleAction = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filteredRequests = requests.filter((r) =>
    filter === 'all' ? true : r.status === filter
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Donation Request Management"
        subtitle="Review, approve, or decline food collection applications submitted by verified welfare organizations."
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold w-fit">
        {[
          { id: 'all', label: 'All Requests' },
          { id: 'pending', label: 'Pending Approval' },
          { id: 'approved', label: 'Approved (Scheduled)' },
          { id: 'rejected', label: 'Declined' },
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

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card className="p-12 text-center text-slate-400">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No requests in this category.</p>
          </Card>
        ) : (
          filteredRequests.map((req) => (
            <Card key={req.id} className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <img
                    src={req.orgAvatar}
                    alt={req.organizationName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {req.organizationName}
                      </h3>
                      <Badge variant="verified" size="sm">
                        Verified Non-Profit
                      </Badge>
                      <span className="text-xs font-mono text-slate-400">
                        {req.orgRegNumber}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-700">
                      <p>
                        Applying for:{' '}
                        <span className="font-bold text-emerald-900">
                          {req.requestedQuantity} {req.unit}
                        </span>{' '}
                        of <strong>{req.donationTitle}</strong>
                      </p>
                    </div>

                    {/* Logistics Notes Box */}
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-600 flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-800">NGO Statement: </span>
                        <span>"{req.notes}"</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Submitted: {req.requestedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {req.contactPhone}
                      </span>
                      <span>•</span>
                      <span>Beneficiary Group: {req.targetBeneficiaries}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <Badge variant={req.status} dot size="md">
                    {req.status.toUpperCase()}
                  </Badge>

                  {req.status === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        icon={X}
                        onClick={() => handleAction(req.id, 'rejected')}
                      >
                        Decline
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Check}
                        onClick={() => handleAction(req.id, 'approved')}
                      >
                        Approve Request
                      </Button>
                    </div>
                  ) : req.status === 'approved' ? (
                    <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Collection Handover Scheduled</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
