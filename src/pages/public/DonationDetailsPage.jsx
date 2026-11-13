import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Users,
  Utensils,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Calendar,
  Thermometer,
  Check
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { DonationCard } from '../../components/donations/DonationCard';
import { PageTransition } from '../../components/common/PageTransition';

export const DonationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { donations, submitRequest, currentRole, switchRole } = useApp();

  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestedQuantity, setRequestedQuantity] = useState('');
  const [requestNotes, setRequestNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const donation = donations.find((d) => d.id === id);

  if (!donation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-display text-[#174D38]">Donation Listing Not Found</h2>
        <p className="text-xs sm:text-sm text-[#202720]/70">This item may have expired or already been distributed.</p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#174D38] text-[#F8F6EF] rounded-2xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Catalog</span>
        </Link>
      </div>
    );
  }

  const relatedDonations = donations
    .filter((d) => d.id !== donation.id && (d.type === donation.type || d.donorId === donation.donorId))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmRequest = (e) => {
    e.preventDefault();
    if (currentRole !== 'organization') {
      switchRole('organization');
    }
    submitRequest(donation.id, {
      requestedQuantity: requestedQuantity || `${donation.quantity} ${donation.unit}`,
      notes: requestNotes
    });
    setRequestModalOpen(false);
    navigate('/org/requests');
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
        
        {/* Back & Breadcrumb with micro-interactions */}
        <div className="flex items-center justify-between">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#174D38] hover:text-[#0f3426] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Explore Donations</span>
          </Link>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FDFAF5] border border-[#E8EEE6] rounded-xl text-xs font-bold text-[#174D38] hover:bg-[#E8EEE6] transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-800" />
                <span className="text-emerald-800">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Listing</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visuals & Safety Specs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Main Photo with Status Overlay */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8EEE6] aspect-[16/10] bg-[#E8EEE6] group">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7 }}
                src={donation.imageUrl}
                alt={donation.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <Badge variant="forest" size="md" className="font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                  {donation.type}
                </Badge>
                <Badge variant={donation.status} size="md" className="capitalize shadow-md font-bold">
                  {donation.status}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174D38]/90 text-[#F8F6EF] text-xs font-bold backdrop-blur-md shadow-md">
                <Clock className="w-3.5 h-3.5 text-[#C7E78B]" />
                <span>Expiry: {donation.expiryTime}</span>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-[#FDFAF5] p-6 sm:p-8 rounded-3xl border border-[#E8EEE6] space-y-4 shadow-sm">
              <h3 className="text-xl font-bold font-display text-[#174D38]">Item Details & Provenance</h3>
              <p className="text-xs sm:text-sm text-[#202720]/80 leading-relaxed">
                {donation.description}
              </p>

              {/* Storage Instructions */}
              {donation.storageInstructions && (
                <div className="p-4 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6] flex items-start gap-3 mt-4">
                  <Thermometer className="w-5 h-5 text-[#174D38] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#174D38] uppercase tracking-wider">
                      Storage & Temperature Guidelines
                    </h4>
                    <p className="text-xs text-[#202720]/80 mt-1">
                      {donation.storageInstructions}
                    </p>
                  </div>
                </div>
              )}

              {/* Dietary Tags */}
              {donation.dietary?.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-[#174D38] uppercase tracking-wider mb-2">
                    Dietary Classifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {donation.dietary.map((tag) => (
                      <Badge key={tag} variant="lime" size="sm" className="font-semibold shadow-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Food Safety & Enterprise Compliance Guarantee */}
            <div className="bg-[#E8EEE6] p-6 rounded-3xl border border-[#d2ddd0] space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#174D38]">
                <ShieldCheck className="w-5 h-5 text-[#174D38]" />
                <span>Good Samaritan Act & Food Hygiene Standard</span>
              </div>
              <p className="text-xs text-[#202720]/75 leading-relaxed">
                This surplus lot is certified prepared under local health department sanitary regulations.
                The donor warrants it has been chilled or maintained at food-safe temperatures with proper chain-of-custody documentation.
              </p>
            </div>

          </div>

          {/* Right Column: Key Details, Donor Card, Action CTA */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Main Action Card */}
            <div className="bg-[#FDFAF5] p-6 sm:p-8 rounded-3xl border border-[#E8EEE6] shadow-md space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#174D38]">
                  Redistribution Allocation
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38] mt-1">
                  {donation.title}
                </h1>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6]">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#202720]/60">Total Volume</p>
                  <p className="text-lg font-extrabold text-[#174D38] mt-0.5">
                    {donation.quantity} <span className="text-xs font-semibold">{donation.unit}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#202720]/60">Servings Estimate</p>
                  <p className="text-lg font-extrabold text-[#174D38] mt-0.5">
                    ~{donation.estimatedServings} <span className="text-xs font-semibold">people</span>
                  </p>
                </div>
              </div>

              {/* Pickup Details */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#174D38] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#174D38] block">Pickup Location</span>
                    <span className="text-[#202720]/80">{donation.pickupAddress}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#174D38] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#174D38] block">Availability Window</span>
                    <span className="text-[#202720]/80">Available now until {donation.expiryTime}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-[#E8EEE6]">
                {donation.status === 'available' ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setRequestedQuantity(`${donation.quantity} ${donation.unit}`);
                      setRequestModalOpen(true);
                    }}
                    className="w-full py-4 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Utensils className="w-4 h-4 text-[#C7E78B]" />
                    <span>Request This Food for Community</span>
                  </motion.button>
                ) : (
                  <div className="p-4 bg-[#E8EEE6] rounded-2xl text-center text-xs font-bold text-[#202720]/60">
                    This donation is currently {donation.status.toUpperCase()}
                  </div>
                )}
                <p className="text-[11px] text-[#202720]/60 text-center mt-2.5">
                  Reserved exclusively for verified charities and welfare non-profits.
                </p>
              </div>
            </div>

            {/* Donor Kitchen Card */}
            <div className="bg-[#FDFAF5] p-6 rounded-3xl border border-[#E8EEE6] space-y-4 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#174D38]">
                Donating Kitchen & Provider
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={donation.donorAvatar}
                  alt={donation.donorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C7E78B]"
                />
                <div>
                  <p className="font-bold text-sm text-[#174D38]">{donation.donorName}</p>
                  <p className="text-xs text-[#202720]/60">{donation.city} • Verified Commercial Donor</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Certified Good Samaritan Food Donor Partner</span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Surplus Section */}
        {relatedDonations.length > 0 && (
          <div className="pt-12 border-t border-[#E8EEE6] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold font-display text-[#174D38]">
                Other Surplus You May Collect
              </h3>
              <Link to="/explore" className="text-xs font-bold text-[#174D38] hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDonations.map((rel) => (
                <DonationCard key={rel.id} donation={rel} />
              ))}
            </div>
          </div>
        )}

        {/* Request Food Modal */}
        <Modal
          isOpen={requestModalOpen}
          onClose={() => setRequestModalOpen(false)}
          title="Request Food Donation"
          subtitle={`Booking from ${donation.donorName}`}
        >
          <form onSubmit={handleConfirmRequest} className="space-y-4">
            <div className="p-3 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6] text-xs">
              <p className="font-bold text-[#174D38]">{donation.title}</p>
              <p className="text-[#202720]/70 mt-0.5">
                Available lot: {donation.quantity} {donation.unit} (~{donation.estimatedServings} servings)
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Quantity Requested
              </label>
              <input
                type="text"
                required
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Logistics & Distribution Plan
              </label>
              <textarea
                rows="3"
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
                placeholder="e.g., Collecting with temperature-controlled van at 5:00 PM for community soup kitchen service..."
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8EEE6]">
              <button
                type="button"
                onClick={() => setRequestModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-[#202720]/70 hover:text-[#202720]"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2.5 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-md"
              >
                Confirm & Submit Request
              </motion.button>
            </div>
          </form>
        </Modal>

      </div>
    </PageTransition>
  );
};
