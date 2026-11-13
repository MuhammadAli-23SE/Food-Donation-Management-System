import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Sprout, Utensils, Building2, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { PageTransition } from '../../components/common/PageTransition';

export const RegisterPage = () => {
  const { signUpDonor, signUpOrganization } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('donor'); // 'donor' | 'organization' ONLY
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);

  // Donor form fields
  const [donorData, setDonorData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    donorType: 'restaurant', // 'restaurant' | 'individual'
    restaurantName: '',
    address: '',
    city: 'Seattle, WA',
  });

  // Organization form fields
  const [orgData, setOrgData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: 'Seattle, WA',
    description: '',
  });

  const handleDonorChange = (e) => {
    setDonorData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrgChange = (e) => {
    setOrgData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (role === 'donor') {
      // Validate donor fields
      if (!donorData.fullName || !donorData.email || !donorData.password || !donorData.phone || !donorData.address) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }
      if (donorData.donorType === 'restaurant' && !donorData.restaurantName.trim()) {
        setErrorMessage('Please enter your restaurant or business name.');
        return;
      }
      if (donorData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }
      if (donorData.password !== donorData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      setIsSubmitting(true);
      try {
        const { data, error } = await signUpDonor({
          email: donorData.email,
          password: donorData.password,
          fullName: donorData.fullName,
          phone: donorData.phone,
          address: donorData.address,
          city: donorData.city,
          donorType: donorData.donorType,
          restaurantName: donorData.restaurantName,
        });

        if (error) {
          setErrorMessage(error.message === 'User already registered' ? 'An account with this email already exists. Please sign in instead.' : error.message);
          setIsSubmitting(false);
          return;
        }

        setSuccessInfo({
          title: 'Donor Account Created!',
          message: 'Welcome to RePlate! Redirecting to your donor kitchen workspace...',
        });

        setTimeout(() => {
          navigate('/donor/dashboard', { replace: true });
        }, 1500);
      } catch (err) {
        setErrorMessage(err.message || 'Registration failed.');
        setIsSubmitting(false);
      }
    } else {
      // Validate organization fields
      if (!orgData.organizationName || !orgData.contactPerson || !orgData.email || !orgData.password || !orgData.phone || !orgData.address) {
        setErrorMessage('Please fill in all required organization fields.');
        return;
      }
      if (orgData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }
      if (orgData.password !== orgData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      setIsSubmitting(true);
      try {
        const { data, error } = await signUpOrganization({
          email: orgData.email,
          password: orgData.password,
          organizationName: orgData.organizationName,
          contactPerson: orgData.contactPerson,
          phone: orgData.phone,
          address: orgData.address,
          city: orgData.city,
          description: orgData.description,
        });

        if (error) {
          setErrorMessage(error.message === 'User already registered' ? 'An account with this email already exists. Please sign in instead.' : error.message);
          setIsSubmitting(false);
          return;
        }

        setSuccessInfo({
          title: 'Organization Registered (Pending Audit)',
          message: 'Your account was created with PENDING verification status. Directing to your status screen...',
        });

        setTimeout(() => {
          navigate('/organization/pending', { replace: true });
        }, 1800);
      } catch (err) {
        setErrorMessage(err.message || 'Registration failed.');
        setIsSubmitting(false);
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-2xl w-full bg-[#FDFAF5] p-8 sm:p-12 rounded-3xl border border-[#E8EEE6] shadow-2xl space-y-7">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.05 }}
              className="w-12 h-12 rounded-2xl bg-[#174D38] flex items-center justify-center text-[#C7E78B] mx-auto shadow-md"
            >
              <Sprout className="w-7 h-7 stroke-[2.5]" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
              Join the RePlate Network
            </h2>
            <p className="text-xs text-[#202720]/70 max-w-md mx-auto">
              Register as a Food Donor or certified Welfare Non-Profit. (Public Admin accounts are prohibited).
            </p>
          </div>

          {/* Role Toggle Selector (Donor vs Organization only) */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6] relative">
            <button
              type="button"
              onClick={() => {
                setRole('donor');
                setErrorMessage('');
              }}
              className={`relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-colors ${
                role === 'donor' ? 'text-[#F8F6EF]' : 'text-[#202720]/70 hover:text-[#174D38]'
              }`}
            >
              {role === 'donor' && (
                <motion.div
                  layoutId="registerRoleTab"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-[#174D38] rounded-xl shadow-sm -z-0"
                />
              )}
              <Utensils className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Food Donor</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('organization');
                setErrorMessage('');
              }}
              className={`relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-colors ${
                role === 'organization' ? 'text-[#F8F6EF]' : 'text-[#202720]/70 hover:text-[#174D38]'
              }`}
            >
              {role === 'organization' && (
                <motion.div
                  layoutId="registerRoleTab"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-[#174D38] rounded-xl shadow-sm -z-0"
                />
              )}
              <Building2 className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Welfare NGO</span>
            </button>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Success Info */}
          {successInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs space-y-1 text-center"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto" />
              <p className="font-bold text-sm text-[#174D38]">{successInfo.title}</p>
              <p className="text-[#202720]/75">{successInfo.message}</p>
            </motion.div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {role === 'donor' ? (
              /* ================== DONOR FIELDS ================== */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={donorData.fullName}
                      onChange={handleDonorChange}
                      placeholder="e.g. Marcus Vance"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={donorData.email}
                      onChange={handleDonorChange}
                      placeholder="name@bakery.com"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>
                </div>

                {/* Donor Type Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Donor Type *
                    </label>
                    <select
                      name="donorType"
                      value={donorData.donorType}
                      onChange={handleDonorChange}
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    >
                      <option value="restaurant">Restaurant / Commercial Kitchen</option>
                      <option value="individual">Individual Food Donor</option>
                    </select>
                  </div>

                  {donorData.donorType === 'restaurant' ? (
                    <div>
                      <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                        Restaurant / Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        name="restaurantName"
                        value={donorData.restaurantName}
                        onChange={handleDonorChange}
                        placeholder="e.g. Golden Crust Bakery & Bistro"
                        className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={donorData.phone}
                        onChange={handleDonorChange}
                        placeholder="+1 (555) 234-8901"
                        className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                      />
                    </div>
                  )}
                </div>

                {donorData.donorType === 'restaurant' && (
                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={donorData.phone}
                      onChange={handleDonorChange}
                      placeholder="+1 (555) 234-8901"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Pickup Address *
                    </label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={donorData.address}
                      onChange={handleDonorChange}
                      placeholder="Street address for food collection"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={donorData.city}
                      onChange={handleDonorChange}
                      placeholder="e.g. Seattle, WA"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Password (min 6 chars) *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        name="password"
                        value={donorData.password}
                        onChange={handleDonorChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#202720]/40 hover:text-[#202720]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      name="confirmPassword"
                      value={donorData.confirmPassword}
                      onChange={handleDonorChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* ================== ORGANIZATION FIELDS ================== */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="organizationName"
                      value={orgData.organizationName}
                      onChange={handleOrgChange}
                      placeholder="e.g. Hope Community Kitchen"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      name="contactPerson"
                      value={orgData.contactPerson}
                      onChange={handleOrgChange}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={orgData.email}
                      onChange={handleOrgChange}
                      placeholder="contact@hopekitchen.org"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={orgData.phone}
                      onChange={handleOrgChange}
                      placeholder="+1 (555) 892-4412"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Distribution Address *
                    </label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={orgData.address}
                      onChange={handleOrgChange}
                      placeholder="e.g. 1205 4th Ave, South District"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={orgData.city}
                      onChange={handleOrgChange}
                      placeholder="e.g. Seattle, WA"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                    Community Mission & Description *
                  </label>
                  <textarea
                    rows="2"
                    required
                    name="description"
                    value={orgData.description}
                    onChange={handleOrgChange}
                    placeholder="Briefly describe the vulnerable communities or families your pantry serves..."
                    className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                  />
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Password (min 6 chars) *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        name="password"
                        value={orgData.password}
                        onChange={handleOrgChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#202720]/40 hover:text-[#202720]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      name="confirmPassword"
                      value={orgData.confirmPassword}
                      onChange={handleOrgChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Verification Policy:</strong> New welfare organizations start with <strong>PENDING</strong> accreditation and are audited by administrators before donation booking permissions are activated.
                  </span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-[#F8F6EF] border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Register {role === 'donor' ? 'Food Donor' : 'Welfare Organization'}</span>
                )}
              </motion.button>
            </div>
          </form>

          {/* Footer Link */}
          <p className="text-center text-xs text-[#202720]/70 pt-2 border-t border-[#E8EEE6]">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#174D38] hover:underline">
              Sign In here
            </Link>
          </p>

        </div>
      </div>
    </PageTransition>
  );
};
