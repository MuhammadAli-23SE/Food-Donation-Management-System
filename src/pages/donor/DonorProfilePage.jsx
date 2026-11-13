import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Building2, Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const DonorProfilePage = () => {
  const { currentUser, updateProfile } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Marcus Vance',
    organizationName: currentUser?.organizationName || 'Golden Crust Artisan Bakery',
    email: currentUser?.email || 'marcus@artisanbakery.com',
    phone: currentUser?.phone || '+1 (555) 234-8901',
    address: currentUser?.address || '842 Pine Street, Downtown',
    city: currentUser?.city || 'Seattle, WA',
    bio: currentUser?.bio || 'Passionate artisanal baker dedicated to zero bakery surplus.'
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
          Kitchen & Profile Settings
        </h1>
        <p className="text-xs text-[#202720]/70 mt-1">
          Update your commercial kitchen address, representative contacts, and food safety credentials.
        </p>
      </div>

      <div className="bg-[#FDFAF5] p-6 sm:p-8 rounded-3xl border border-[#E8EEE6] shadow-sm space-y-8">
        
        {/* User Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-[#E8EEE6]">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-20 h-20 rounded-3xl object-cover border-4 border-[#C7E78B] shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-display text-[#174D38]">
                {currentUser?.organizationName}
              </h2>
              <Badge variant="lime" size="sm" className="font-bold uppercase text-[10px]">
                Food Donor
              </Badge>
            </div>
            <p className="text-xs text-[#202720]/70">
              Representative: <span className="font-semibold">{currentUser?.name}</span> • {currentUser?.city}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Good Samaritan Certified Kitchen Donor</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Kitchen / Business Name
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Representative Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Contact Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Pickup Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                City / Region
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
              About Kitchen & Donation Commitment
            </label>
            <textarea
              rows="3"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#174D38]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-md transition-all"
            >
              Save Profile Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
