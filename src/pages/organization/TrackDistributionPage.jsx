import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Heart
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { StatusStepper } from '../../components/tracking/StatusStepper';
import { Modal } from '../../components/common/Modal';
import { PageTransition } from '../../components/common/PageTransition';

export const TrackDistributionPage = () => {
  const { trackingList, updateTrackingStatus } = useApp();

  const [activeModalItem, setActiveModalItem] = useState(null);
  const [actualBeneficiaries, setActualBeneficiaries] = useState(50);
  const [distributionNotes, setDistributionNotes] = useState('');
  const [proofImage, setProofImage] = useState(
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
  );

  const handleOpenProofModal = (item) => {
    setActiveModalItem(item);
    setActualBeneficiaries(item.beneficiaryTarget || 50);
    setDistributionNotes(`Distributed hot to unhoused families at ${item.organizationName}. Zero food discarded.`);
  };

  const handleConfirmDistribution = (e) => {
    e.preventDefault();
    if (!activeModalItem) return;

    updateTrackingStatus(activeModalItem.id, 'distributed', {
      actualBeneficiaries: Number(actualBeneficiaries) || 50,
      distributionNotes,
      proofImage
    });
    setActiveModalItem(null);
  };

  return (
    <PageTransition>
      <div className="space-y-6 text-left">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            Food Pickup & Distribution Tracking
          </h1>
          <p className="text-xs text-[#202720]/70 mt-1">
            Complete the chain of custody: verify volunteer pickup, update transit status, and submit proof of community distribution.
          </p>
        </div>

        {/* Tracking Cards */}
        <div className="space-y-6">
          {trackingList.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="bg-[#FDFAF5] p-6 sm:p-8 rounded-3xl border border-[#E8EEE6] shadow-sm space-y-6"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8EEE6]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#174D38]">
                    Consignment #{item.id.toUpperCase()}
                  </span>
                  <h3 className="font-bold text-lg text-[#174D38] font-display mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#202720]/70">
                    Donor: <strong className="text-[#174D38]">{item.donorName}</strong> • Recipient: <span className="font-semibold">{item.organizationName}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Badge variant={item.status} size="md" className="capitalize font-bold">
                    {item.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              {/* Stepper with animated progression */}
              <StatusStepper currentStatus={item.status} />

              {/* Logistics & Driver Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6] text-xs">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#202720]/60">Pickup Location</p>
                  <p className="font-semibold text-[#174D38] mt-0.5 flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#174D38] shrink-0" />
                    <span className="truncate">{item.pickupAddress}</span>
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-[#202720]/60">Pickup Window & Driver</p>
                  <p className="font-semibold text-[#174D38] mt-0.5 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#174D38] shrink-0" />
                    <span>{item.driverName || 'Volunteer Driver'}</span>
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-[#202720]/60">Beneficiary Target</p>
                  <p className="font-semibold text-[#174D38] mt-0.5 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>
                      {item.status === 'distributed'
                        ? `${item.actualBeneficiaries} People Nourished`
                        : `~${item.beneficiaryTarget} Estimated Meals`}
                    </span>
                  </p>
                </div>
              </div>

              {/* Distribution Proof Display (If completed) */}
              {item.status === 'distributed' && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {item.proofImage && (
                      <img
                        src={item.proofImage}
                        alt="Distribution Proof"
                        className="w-16 h-16 rounded-xl object-cover border border-emerald-300"
                      />
                    )}
                    <div>
                      <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        Verified Distribution Proof Uploaded
                      </span>
                      <p className="text-xs text-emerald-800/80 mt-1">
                        "{item.distributionNotes}"
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-emerald-300 shrink-0 shadow-sm">
                    {item.actualBeneficiaries} Meals Served
                  </span>
                </div>
              )}

              {/* Step Advancement Action Buttons */}
              {item.status !== 'distributed' && (
                <div className="flex items-center justify-end gap-3 pt-2">
                  {item.status === 'scheduled' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateTrackingStatus(item.id, 'picked_up')}
                      className="px-5 py-2.5 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Truck className="w-4 h-4 text-[#C7E78B]" />
                      <span>Confirm Volunteer Picked Up Food</span>
                    </motion.button>
                  )}

                  {item.status === 'picked_up' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOpenProofModal(item)}
                      className="px-6 py-2.5 bg-[#C7E78B] hover:bg-[#b1d86d] text-[#174D38] rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#174D38]" />
                      <span>Submit Proof & Complete Distribution</span>
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Distribution Proof Modal */}
        <Modal
          isOpen={!!activeModalItem}
          onClose={() => setActiveModalItem(null)}
          title="Confirm Community Distribution"
          subtitle={activeModalItem ? `Closing chain of custody for ${activeModalItem.title}` : ''}
        >
          {activeModalItem && (
            <form onSubmit={handleConfirmDistribution} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                  Actual People / Beneficiaries Nourished
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={actualBeneficiaries}
                  onChange={(e) => setActualBeneficiaries(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                  Community Distribution Notes
                </label>
                <textarea
                  rows="3"
                  required
                  value={distributionNotes}
                  onChange={(e) => setDistributionNotes(e.target.value)}
                  placeholder="Describe how the meals were handed out to families or shelter residents..."
                  className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                />
              </div>

              {/* Proof photo simulated preview */}
              <div className="p-3 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6] space-y-2">
                <label className="block text-[11px] font-bold text-[#174D38] uppercase">
                  Distribution Photographic Proof
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={proofImage}
                    alt="Proof preview"
                    className="w-14 h-14 rounded-xl object-cover border border-[#C7E78B]"
                  />
                  <span className="text-[11px] text-[#202720]/70">
                    Pre-attached simulated verification photo: <span className="font-semibold">shelter_meal_service.jpg</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8EEE6]">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
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
                  Submit Proof & Complete
                </motion.button>
              </div>
            </form>
          )}
        </Modal>

      </div>
    </PageTransition>
  );
};
