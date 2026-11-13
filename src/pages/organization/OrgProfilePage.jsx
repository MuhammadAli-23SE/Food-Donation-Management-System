import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, ShieldCheck, CheckCircle2, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const OrgProfilePage = () => {
  const { currentUser, updateProfile } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Elena Rostova',
    organizationName: currentUser?.organizationName || 'Hope Community Kitchen & Shelter',
    email: currentUser?.email || 'elena@hopecommunity.org',
    phone: currentUser?.phone || '+1 (555) 892-4412',
    address: currentUser?.address || '1205 4th Ave, South District',
    city: currentUser?.city || 'Seattle, WA',
    registrationNumber: currentUser?.registrationNumber || 'NGO-WA-2021-9874',
    bio: currentUser?.bio || 'Providing 400+ warm, nutritious meals daily to unhoused families, veterans, and youth in greater Seattle.'
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
          Organization Accreditation & Profile
        </h1>
        <p className="text-xs text-[#202720]/70 mt-1">
          Review charity registration details, audit status, and representative contact information.
        </p>
      </div>

      <div className="bg-[#FDFAF5] p-6 sm:p-8 rounded-3xl border border-[#E8EEE6] shadow-sm space-y-8">
        
        {/* Header with Verification Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#E8EEE6]">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C7E78B]"
            />
            <div>
              <h2 className="text-xl font-bold font-display text-[#174D38]">
                {currentUser?.organizationName}
              </h2>
              <p className="text-xs text-[#202720]/70">
                Reg: <span className="font-semibold">{formData.registrationNumber}</span> • {currentUser?.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <div>
              <p>Accredited Welfare Partner</p>
              <p className="text-[10px] font-normal text-emerald-800">Approved by Systems Administrator</p>
            </div>
          </div>
        </div>

        {/* Certificate Inspection Mock */}
        <div className="p-4 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#174D38] text-[#C7E78B] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#174D38]">
                Charity Verification Certificate Document
              </p>
              <p className="text-[11px] text-[#202720]/60">
                Document on file: <span className="font-semibold">501c3_accreditation_seattle.pdf</span> (Audited 2026)
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
            Active
          </span>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Organization Name
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
                Email
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
                Phone
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
                Distribution Hall / Kitchen Address
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
              Community Mission
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
              Update Organization Credentials
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
