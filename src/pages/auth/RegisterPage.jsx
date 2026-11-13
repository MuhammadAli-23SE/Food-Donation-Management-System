import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sprout, Utensils, Building2, UploadCloud, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const RegisterPage = () => {
  const { loginAs } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState('donor'); // 'donor' | 'organization'
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    email: '',
    phone: '',
    city: 'Seattle, WA',
    address: '',
    registrationNumber: '',
    mission: '',
    foodTypes: 'Cooked Meals & Pastries',
    certificateDoc: 'Certificate_Proof_2026.pdf'
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `usr_${Date.now()}`,
      name: formData.name || (role === 'donor' ? 'New Donor Rep' : 'New Org Rep'),
      email: formData.email || 'partner@nourishbridge.org',
      role,
      organizationName: formData.organizationName || (role === 'donor' ? 'Fresh Table Bistro' : 'City Food Relief'),
      avatar: role === 'donor'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      phone: formData.phone || '+1 (555) 492-0192',
      city: formData.city,
      address: formData.address || '100 Main Street',
      bio: formData.mission || 'Dedicated partner reducing waste and feeding families.',
      verificationStatus: role === 'organization' ? 'pending' : 'verified',
      registrationNumber: formData.registrationNumber || 'NGO-PENDING-2026'
    };

    loginAs(role, newUser);
    if (role === 'donor') navigate('/donor/dashboard');
    else navigate('/org/dashboard');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-2xl w-full bg-[#FDFAF5] p-8 sm:p-12 rounded-3xl border border-[#E8EEE6] shadow-xl space-y-8">
        
        {/* Brand & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#174D38] flex items-center justify-center text-[#C7E78B] mx-auto shadow-md">
            <Sprout className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            Join NourishBridge Network
          </h2>
          <p className="text-xs text-[#202720]/70 max-w-md mx-auto">
            Choose your organization type below to participate in audited surplus food redistribution.
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6]">
          <button
            type="button"
            onClick={() => setRole('donor')}
            className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              role === 'donor'
                ? 'bg-[#174D38] text-[#F8F6EF] shadow-sm'
                : 'text-[#202720]/70 hover:text-[#174D38]'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Food Donor (Kitchen/Bakery)</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('organization')}
            className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              role === 'organization'
                ? 'bg-[#174D38] text-[#F8F6EF] shadow-sm'
                : 'text-[#202720]/70 hover:text-[#174D38]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Welfare Organization (NGO)</span>
          </button>
        </div>

        {/* Dynamic Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                {role === 'donor' ? 'Kitchen / Business Name' : 'Non-Profit / Charity Name'}
              </label>
              <input
                type="text"
                required
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder={role === 'donor' ? 'e.g. Savor Mediterranean Bistro' : 'e.g. Community Bread Basket'}
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Representative Full Name
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@entity.org"
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Physical Pickup / Distribution Address
              </label>
              <input
                type="text"
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address & suite"
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                City / Metropolitan Region
              </label>
              <input
                type="text"
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Seattle, WA"
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>
          </div>

          {/* Role specific inputs */}
          {role === 'organization' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                  501(c)(3) or Government Charity Registration #
                </label>
                <input
                  type="text"
                  required
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g. 501(c)(3) #84-291829 or NGO-WA-2026"
                  className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                  Community Mission & Target Beneficiaries
                </label>
                <textarea
                  rows="2"
                  name="mission"
                  value={formData.mission}
                  onChange={handleChange}
                  placeholder="Briefly describe the vulnerable communities or families your pantry serves..."
                  className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                />
              </div>

              {/* Certificate Upload Simulation */}
              <div className="p-4 bg-[#F8F6EF] rounded-2xl border-2 border-dashed border-[#d2ddd0] text-center space-y-1">
                <UploadCloud className="w-6 h-6 text-[#174D38] mx-auto" />
                <p className="text-xs font-bold text-[#174D38]">
                  Verification Certificate Document
                </p>
                <p className="text-[11px] text-[#202720]/60">
                  Pre-attached demo file: <span className="font-semibold">{formData.certificateDoc}</span> (PDF, PNG under 10MB)
                </p>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                Typical Surplus Food Categories
              </label>
              <input
                type="text"
                name="foodTypes"
                value={formData.foodTypes}
                onChange={handleChange}
                placeholder="e.g. Fresh bread, caterer buffet trays, salads, daily produce"
                className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-lg transition-all"
            >
              Complete Registration & Access Workspace
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-[#202720]/70 pt-2 border-t border-[#E8EEE6]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#174D38] hover:underline">
            Sign In here
          </Link>
        </p>

      </div>
    </div>
  );
};
