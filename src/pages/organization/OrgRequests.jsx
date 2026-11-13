import React, { useState } from 'react';
import {
  Clock,
  Truck,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import { MOCK_REQUESTS } from '../../data/mockData';

export default function OrgRequests() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [proofSubmitted, setProofSubmitted] = useState(false);

  const [proofData, setProofData] = useState({
    beneficiaryCount: '120',
    distributionLocation: 'Downtown Shelter Dining Hall',
    notes: 'Meals served hot to residents and families in need.',
  });

  const handleOpenProofModal = (req) => {
    setSelectedRequest(req);
    setProofSubmitted(false);
    setProofModalOpen(true);
  };

  const handleConfirmProof = (e) => {
    e.preventDefault();
    setProofSubmitted(true);
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest?.id ? { ...r, status: 'completed' } : r
        )
      );
      setProofModalOpen(false);
      setProofSubmitted(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Our Food Requests & Fulfillment"
        subtitle="Track requested donations, schedule volunteer vehicle arrivals, and submit distribution proof for audit compliance."
      />

      <div className="space-y-4">
        {requests.map((req) => (
          <Card key={req.id} className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant={req.status} dot size="md">
                    {req.status === 'approved' ? 'SCHEDULED FOR PICKUP' : req.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    Application ID: {req.id}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {req.donationTitle}
                </h3>

                <div className="mt-2 text-xs text-slate-600 space-y-1">
                  <p>
                    Requested Volume:{' '}
                    <span className="font-bold text-emerald-900">
                      {req.requestedQuantity} {req.unit}
                    </span>
                  </p>
                  <p>Target Community: {req.targetBeneficiaries}</p>
                  <p className="italic text-slate-500">Logistics Note: "{req.notes}"</p>
                </div>
              </div>

              {/* Status Stepper / Action Area */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                {req.status === 'pending' && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <Clock className="w-4 h-4 text-amber-700 animate-spin" />
                    <span>Awaiting Donor Approval</span>
                  </div>
                )}

                {req.status === 'approved' && (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                      <Truck className="w-4 h-4 text-emerald-700" />
                      <span>Ready for Pickup</span>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Upload}
                      onClick={() => handleOpenProofModal(req)}
                    >
                      Submit Distribution Proof
                    </Button>
                  </div>
                )}

                {req.status === 'completed' && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-2 rounded-lg border border-teal-200">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    <span>Distribution Verified & Closed</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Distribution Proof Modal */}
      <Modal
        isOpen={proofModalOpen}
        onClose={() => setProofModalOpen(false)}
        title="Submit Food Distribution Proof"
        subtitle={selectedRequest ? `Closing Request: ${selectedRequest.donationTitle}` : ''}
      >
        {proofSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">Proof Recorded!</h4>
            <p className="text-xs text-slate-500">
              Audit log updated. Thank you for ensuring transparent food redistribution.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmProof} className="space-y-4">
            <Input
              label="Actual Beneficiaries Fed"
              type="number"
              placeholder="e.g. 80"
              required
              value={proofData.beneficiaryCount}
              onChange={(e) => setProofData({ ...proofData, beneficiaryCount: e.target.value })}
            />

            <Input
              label="Distribution Location"
              required
              value={proofData.distributionLocation}
              onChange={(e) => setProofData({ ...proofData, distributionLocation: e.target.value })}
            />

            <Textarea
              label="Field Notes / Feedback"
              rows={3}
              required
              value={proofData.notes}
              onChange={(e) => setProofData({ ...proofData, notes: e.target.value })}
            />

            <div className="border border-dashed border-slate-300 rounded-lg p-5 text-center bg-slate-50">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-slate-700">
                Attach Distribution Photo / Receipt
              </p>
              <p className="text-[11px] text-slate-400">
                Mock photo uploader (Persisted via Supabase Storage in Phase 2)
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setProofModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Confirm & Complete
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
