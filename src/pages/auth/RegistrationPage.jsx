import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartHandshake,
  UtensilsCrossed,
  Building2,
  ShieldCheck,
  ArrowRight,
  Upload,
  CheckCircle2,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Card from '../../components/common/Card';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('donor'); // 'donor' | 'organization'
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: 'Metro City',
    businessType: 'Restaurant',
    regNumber: '',
    focusArea: 'Community Kitchen',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (role === 'donor') navigate('/donor/dashboard');
      else navigate('/org/dashboard');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-md">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Nourish<span className="text-emerald-700">Bridge</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          Create Your Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Join the certified enterprise network for sustainable food redistribution
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <Card className="shadow-sm border-slate-200">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Account Initialized!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {role === 'organization'
                  ? 'Your NGO registration has been submitted for admin verification. Redirecting to your dashboard preview...'
                  : 'Welcome to NourishBridge! Redirecting to your donor dashboard...'}
              </p>
            </div>
          ) : (
            <div>
              {/* Role Selection Tabs */}
              <div className="mb-6 p-1 bg-slate-100 rounded-xl grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setRole('donor')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    role === 'donor'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UtensilsCrossed className="w-4 h-4 text-emerald-700" />
                  <span>Food Donor (Hospitality)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('organization')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    role === 'organization'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  <span>Welfare Organization (NGO)</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={role === 'donor' ? 'Organization / Restaurant Name' : 'NGO / Foundation Name'}
                    placeholder={role === 'donor' ? 'e.g. Royal Spice Banquet' : 'e.g. Hope Haven Relief'}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  {role === 'donor' ? (
                    <Select
                      label="Establishment Type"
                      options={[
                        { value: 'Restaurant', label: 'Restaurant / Dine-in' },
                        { value: 'Hotel', label: 'Hotel & Hospitality' },
                        { value: 'Bakery', label: 'Artisan Bakery / Cafe' },
                        { value: 'Supermarket', label: 'Supermarket / Grocery' },
                        { value: 'Catering', label: 'Catering & Events' },
                      ]}
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    />
                  ) : (
                    <Input
                      label="Official NGO Registration No."
                      placeholder="e.g. NGO-REG-88212"
                      required
                      value={formData.regNumber}
                      onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Official Email"
                    type="email"
                    placeholder="contact@domain.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+1 555-0199"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Account Password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <Select
                    label="Operating City / Region"
                    options={[
                      { value: 'Metro City', label: 'Metro City Central' },
                      { value: 'West Suburb', label: 'West Suburb' },
                      { value: 'Harbor District', label: 'Harbor District' },
                      { value: 'Tech District', label: 'Tech District' },
                    ]}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <Input
                  label="Physical Address / Pickup Facility"
                  placeholder="Street name, suite or building number"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />

                {role === 'organization' && (
                  <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50/60">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-xs font-semibold text-slate-700">
                      Upload NGO Certificate / Tax Exemption Proof
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      PDF or JPG up to 5MB (Will be reviewed by admin before full clearance)
                    </p>
                  </div>
                )}

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    I confirm that our food storage and handling practices comply with municipal public health and food safety standards.
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-semibold"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Complete Registration as {role === 'donor' ? 'Food Donor' : 'Welfare NGO'}
                </Button>
              </form>
            </div>
          )}
        </Card>

        <p className="mt-6 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-emerald-800 hover:underline">
            Sign In to your existing account
          </Link>
        </p>
      </div>
    </div>
  );
}
