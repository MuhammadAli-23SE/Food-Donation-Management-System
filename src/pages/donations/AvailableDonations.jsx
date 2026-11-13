import React, { useState } from 'react';
import { UtensilsCrossed, CheckCircle2, ShieldCheck } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DonationFilters from '../../components/donations/DonationFilters';
import DonationCard from '../../components/donations/DonationCard';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { MOCK_DONATIONS } from '../../data/mockData';

export default function AvailableDonations({ isStandalone = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestData, setRequestData] = useState({
    beneficiaries: '',
    notes: '',
  });

  const filteredDonations = MOCK_DONATIONS.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || d.category === selectedCategory;

    const matchesCity = selectedCity === 'all' || d.city === selectedCity;

    return matchesSearch && matchesCategory && matchesCity;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCity('all');
  };

  const handleOpenRequest = (donation) => {
    setSelectedDonation(donation);
    setRequestSuccess(false);
  };

  const handleConfirmRequest = (e) => {
    e.preventDefault();
    setRequestSuccess(true);
    setTimeout(() => {
      setSelectedDonation(null);
      setRequestSuccess(false);
    }, 1800);
  };

  const content = (
    <div className="space-y-6">
      <PageHeader
        title="Surplus Food Marketplace"
        subtitle="Browse all edible food donations available for immediate collection by certified NGOs and welfare kitchens."
      />

      {/* Filter Component */}
      <DonationFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        onReset={handleResetFilters}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Showing {filteredDonations.length} available food listings</span>
      </div>

      {/* Grid of Food Listings */}
      {filteredDonations.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <UtensilsCrossed className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No Food Listings Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={handleResetFilters}>
            Reset All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onRequest={handleOpenRequest}
            />
          ))}
        </div>
      )}

      {/* Request Modal */}
      <Modal
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        title="Submit Food Collection Request"
        subtitle={selectedDonation ? `${selectedDonation.title} (${selectedDonation.quantity} ${selectedDonation.unit})` : ''}
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
              <Button variant="ghost" size="sm" onClick={() => setSelectedDonation(null)}>
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

  // If viewed from public navbar (standalone layout)
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
