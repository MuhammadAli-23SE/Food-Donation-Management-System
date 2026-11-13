import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Utensils, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { DonationCard } from '../../components/donations/DonationCard';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const BrowseDonationsPage = () => {
  const { donations, submitRequest } = useApp();

  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalDonation, setActiveModalDonation] = useState(null);
  const [requestedQuantity, setRequestedQuantity] = useState('');
  const [notes, setNotes] = useState('');

  const filtered = donations.filter((item) => {
    if (category !== 'all' && item.type !== category) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.donorName.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRequestClick = (item) => {
    setActiveModalDonation(item);
    setRequestedQuantity(`${item.quantity} ${item.unit}`);
    setNotes('');
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    if (!activeModalDonation) return;
    submitRequest(activeModalDonation.id, {
      requestedQuantity,
      notes
    });
    setActiveModalDonation(null);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
          Surplus Food Redistribution Catalog
        </h1>
        <p className="text-xs text-[#202720]/70 mt-1">
          Reserve fresh surplus food for your community shelter or distribution kitchen.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#202720]/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by food name, bakery, or kitchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'cooked', 'bakery', 'produce', 'dairy'].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                category === c
                  ? 'bg-[#174D38] text-[#F8F6EF]'
                  : 'bg-[#F8F6EF] text-[#202720]/70 hover:bg-[#E8EEE6] border border-[#E8EEE6]'
              }`}
            >
              {c === 'all' ? 'All Surplus' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <DonationCard
            key={item.id}
            donation={item}
            onAction={handleRequestClick}
            actionLabel="Request Lot"
          />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!activeModalDonation}
        onClose={() => setActiveModalDonation(null)}
        title="Reserve Surplus Food"
        subtitle={activeModalDonation ? `Booking from ${activeModalDonation.donorName}` : ''}
      >
        {activeModalDonation && (
          <form onSubmit={handleConfirmSubmit} className="space-y-4">
            <div className="p-3 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6] text-xs">
              <p className="font-bold text-[#174D38]">{activeModalDonation.title}</p>
              <p className="text-[#202720]/70 mt-0.5">
                Available: {activeModalDonation.quantity} {activeModalDonation.unit}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Requested Quantity
              </label>
              <input
                type="text"
                required
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Pickup Notes & Scheduled Window
              </label>
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention expected volunteer arrival time or beneficiary notes..."
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8EEE6]">
              <button
                type="button"
                onClick={() => setActiveModalDonation(null)}
                className="px-4 py-2 text-xs font-bold text-[#202720]/70 hover:text-[#202720]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-md"
              >
                Send Request
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};
