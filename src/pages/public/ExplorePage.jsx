import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, SlidersHorizontal, MapPin, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DonationCard } from '../../components/donations/DonationCard';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { useNavigate } from 'react-router-dom';

export const ExplorePage = () => {
  const { donations, currentUser, currentRole, submitRequest, switchRole } = useApp();
  const navigate = useNavigate();

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedDietary, setSelectedDietary] = useState([]);

  // Modal state for requesting food
  const [requestModalDonation, setRequestModalDonation] = useState(null);
  const [requestedQuantity, setRequestedQuantity] = useState('');
  const [requestNotes, setRequestNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'all', label: 'All Foods' },
    { id: 'cooked', label: 'Cooked Meals' },
    { id: 'bakery', label: 'Bakery & Bread' },
    { id: 'produce', label: 'Fresh Produce' },
    { id: 'dairy', label: 'Dairy & Chilled' }
  ];

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'High Protein'];

  // Filtered donations
  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.type !== selectedCategory) {
        return false;
      }
      // Status filter
      if (availableOnly && item.status !== 'available') {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesDonor = item.donorName.toLowerCase().includes(query);
        const matchesLocation = (item.pickupAddress || item.city || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesDonor && !matchesLocation) {
          return false;
        }
      }
      // Dietary filter
      if (selectedDietary.length > 0) {
        const hasAllDietary = selectedDietary.every((d) => item.dietary?.includes(d));
        if (!hasAllDietary) return false;
      }
      return true;
    });
  }, [donations, selectedCategory, availableOnly, searchTerm, selectedDietary]);

  const toggleDietary = (tag) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleOpenRequest = (donation) => {
    setRequestModalDonation(donation);
    setRequestedQuantity(`${donation.quantity} ${donation.unit}`);
    setRequestNotes('');
  };

  const handleConfirmRequest = (e) => {
    e.preventDefault();
    if (!requestModalDonation) return;

    // If not logged in as organization, switch to org demo
    if (currentRole !== 'organization') {
      switchRole('organization');
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitRequest(requestModalDonation.id, {
        requestedQuantity,
        notes: requestNotes
      });
      setIsSubmitting(false);
      setRequestModalDonation(null);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <Badge variant="lime" size="sm" className="font-bold uppercase tracking-wider">
          Surplus Redistribution Catalog
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#174D38] font-display">
          Explore Available Food Donations
        </h1>
        <p className="text-base text-[#202720]/75 max-w-2xl">
          Browse verified commercial kitchens, restaurants, and bakeries offering fresh surplus food for certified community pickup.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-[#FDFAF5] p-5 sm:p-6 rounded-3xl border border-[#E8EEE6] shadow-sm space-y-4">
        
        {/* Top Search Input & Quick Toggle */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#202720]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by meal, bakery, donor kitchen, or pickup neighborhood..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38] text-[#202720]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#202720]/40 hover:text-[#202720]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-semibold text-[#174D38] cursor-pointer hover:bg-[#E8EEE6] transition-colors">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 accent-[#174D38] rounded"
              />
              <span>Available Only</span>
            </label>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8EEE6]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#174D38] text-[#F8F6EF] shadow-sm'
                  : 'bg-[#F8F6EF] text-[#202720]/75 hover:bg-[#E8EEE6] hover:text-[#174D38] border border-[#E8EEE6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-[#202720]/60 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Dietary:
          </span>
          {dietaryOptions.map((tag) => {
            const isSelected = selectedDietary.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleDietary(tag)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#C7E78B] text-[#174D38] font-bold border border-[#b1d86d]'
                    : 'bg-[#F8F6EF] text-[#202720]/65 hover:bg-[#E8EEE6] border border-[#E8EEE6]'
                }`}
              >
                {isSelected ? `✓ ${tag}` : `+ ${tag}`}
              </button>
            );
          })}
          {selectedDietary.length > 0 && (
            <button
              onClick={() => setSelectedDietary([])}
              className="text-xs text-rose-600 hover:underline font-semibold ml-2"
            >
              Clear dietary
            </button>
          )}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#202720]/70 font-semibold px-1">
        <span>
          Showing <span className="text-[#174D38] font-bold">{filteredDonations.length}</span> food listings
        </span>
        {currentRole === 'organization' ? (
          <span className="text-emerald-800 flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Vetted Organization Mode Active
          </span>
        ) : (
          <span className="text-[#202720]/60">
            Click 'Request Food' to test organization booking
          </span>
        )}
      </div>

      {/* Donation Grid */}
      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onAction={handleOpenRequest}
              actionLabel="Request Food"
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#E8EEE6] flex items-center justify-center text-[#174D38] mx-auto">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-display text-[#174D38]">No Matching Food Found</h3>
          <p className="text-sm text-[#202720]/70">
            Try adjusting your search keywords, clear category filters, or uncheck dietary restrictions.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setAvailableOnly(false);
              setSelectedDietary([]);
            }}
            className="px-6 py-2.5 bg-[#174D38] text-[#F8F6EF] rounded-2xl text-xs font-bold hover:bg-[#0f3426] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Request Food Modal */}
      <Modal
        isOpen={!!requestModalDonation}
        onClose={() => setRequestModalDonation(null)}
        title="Request Food Donation"
        subtitle={requestModalDonation ? `Booking from ${requestModalDonation.donorName}` : ''}
        maxWidth="max-w-xl"
      >
        {requestModalDonation && (
          <form onSubmit={handleConfirmRequest} className="space-y-5">
            
            {/* Quick summary card */}
            <div className="flex gap-4 p-3.5 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6]">
              <img
                src={requestModalDonation.imageUrl}
                alt={requestModalDonation.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div>
                <h4 className="font-bold text-sm text-[#174D38] line-clamp-1">
                  {requestModalDonation.title}
                </h4>
                <p className="text-xs text-[#202720]/70 mt-0.5">
                  Available: {requestModalDonation.quantity} {requestModalDonation.unit} (~{requestModalDonation.estimatedServings} servings)
                </p>
                <div className="flex items-center gap-1 text-[11px] text-[#202720]/60 mt-1">
                  <MapPin className="w-3 h-3 text-[#174D38]" />
                  <span>{requestModalDonation.pickupAddress}</span>
                </div>
              </div>
            </div>

            {/* Persona Switch Notice if not org */}
            {currentRole !== 'organization' && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                <span>
                  <strong>Interactive Demo:</strong> Submitting this request will automatically simulate the action under <strong>Hope Community Kitchen (Verified NGO)</strong> so you can experience the complete lifecycle.
                </span>
              </div>
            )}

            {/* Quantity Input */}
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                Requested Quantity
              </label>
              <input
                type="text"
                required
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(e.target.value)}
                placeholder="e.g. 50 servings or full lot"
                className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            {/* Logistics Notes */}
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                Pickup Logistics & Community Target
              </label>
              <textarea
                rows="3"
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
                placeholder="Specify your pickup window, van type, or the community group being served (e.g., Evening dinner for 40 unhoused individuals at our downtown shelter)..."
                className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8EEE6]">
              <button
                type="button"
                onClick={() => setRequestModalDonation(null)}
                className="px-5 py-2.5 text-xs font-bold text-[#202720]/70 hover:text-[#202720] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                {isSubmitting ? 'Transmitting Request...' : 'Send Request to Donor'}
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};
