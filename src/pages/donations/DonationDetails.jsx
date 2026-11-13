import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Utensils,
  ShieldCheck,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { MOCK_DONATIONS } from '../../data/mockData';

export default function DonationDetails({ isStandalone = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const donation =
    MOCK_DONATIONS.find((d) => d.id === id) || MOCK_DONATIONS[0];

  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestData, setRequestData] = useState({
    beneficiaries: '',
    notes: '',
  });

  const handleConfirmRequest = (e) => {
    e.preventDefault();
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestModalOpen(false);
      setRequestSuccess(false);
    }, 1800);
  };

  const content = (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </button>
      </div>

      {/* Main Grid: Details & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Photo & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="relative h-80 w-full bg-slate-100">
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant={donation.status} size="lg" dot>
                  {donation.status.toUpperCase()}
                </Badge>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-900/90 text-white backdrop-blur-xs">
                  {donation.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-black text-slate-900">
                {donation.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Utensils className="w-4 h-4 text-emerald-700" />
                  Available: {donation.quantity} {donation.unit}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  Expires: {donation.expiryTime}
                </span>
                <span>•</span>
                <span>Prepared: {donation.preparedTime}</span>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Food Description & Safe Preparation
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {donation.description}
                </p>
              </div>

              {/* Safety & Storage Specification Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Storage Guidelines
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {donation.storageCondition}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Dietary & Allergens
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {donation.dietary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Donor Profile & Pickup Action */}
        <div className="space-y-6">
          {/* Action Box */}
          <Card className="p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
              Donation Collection
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Available Quantity:</span>
                <span className="font-bold text-slate-800">{donation.quantity} {donation.unit}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Remaining Shelf Life:</span>
                <span className="font-bold text-emerald-800">{donation.expiryTime}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Redistribution Cost:</span>
                <span className="font-bold text-emerald-700">100% Free (Charity)</span>
              </div>
            </div>

            {donation.status === 'available' ? (
              <Button
                variant="primary"
                size="lg"
                className="w-full font-semibold"
                onClick={() => setRequestModalOpen(true)}
              >
                Request This Food Donation
              </Button>
            ) : (
              <div className="p-3 bg-slate-100 rounded-lg text-center text-xs font-semibold text-slate-500">
                This listing is currently {donation.status}.
              </div>
            )}
          </Card>

          {/* Donor Establishment Card */}
          <Card className="p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Donor Information
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={donation.donorAvatar}
                alt={donation.donorName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {donation.donorName}
                </h4>
                <p className="text-xs text-slate-500">{donation.donorType}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{donation.pickupAddress}, {donation.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{donation.contactPerson}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-emerald-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Certified Food Safety Partner</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Request Modal */}
      <Modal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        title="Submit Food Collection Request"
        subtitle={`${donation.title} (${donation.quantity} ${donation.unit})`}
      >
        {requestSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Request Sent to Donor!</h4>
            <p className="text-xs text-slate-500">
              The establishment manager will review your application. Check your NGO portal for scheduled pickup confirmation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmRequest} className="space-y-4">
            <Input
              label="Intended Beneficiary Group"
              placeholder="e.g. 60 residents at Hope Haven Children Shelter"
              required
              value={requestData.beneficiaries}
              onChange={(e) => setRequestData({ ...requestData, beneficiaries: e.target.value })}
            />
            <Textarea
              label="Transportation & ETA Details"
              placeholder="e.g. Our insulated van will arrive within 40 minutes. Driver: Brother Michael."
              rows={3}
              required
              value={requestData.notes}
              onChange={(e) => setRequestData({ ...requestData, notes: e.target.value })}
            />
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                By submitting this request, your organization agrees to collect within the designated expiry window and adhere to food safety protocols.
              </span>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setRequestModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Confirm & Send Request
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );

  if (isStandalone) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {content}
        </main>
        <Footer />
      </div>
    );
  }

  return content;
}
