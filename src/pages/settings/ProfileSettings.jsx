import React, { useState } from 'react';
import {
  Building2,
  Bell,
  CheckCircle2,
  Save,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

export default function ProfileSettings() {
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Royal Spice Banquet & Catering',
    contactPerson: 'Manager Tariq',
    email: 'tariq@royalspice.com',
    phone: '+1 555-0192',
    address: '42 Commercial Boulevard, Block 4',
    city: 'Metro City',
    emailAlerts: true,
    smsAlerts: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Account & Profile Settings"
        subtitle="Manage your establishment contact details, pickup location, and real-time alert preferences."
      />

      <Card className="p-6">
        {saved && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span className="font-semibold">Your settings have been saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              Organization Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Organization / Business Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
              <Input
                label="Primary Contact Person"
                value={profile.contactPerson}
                onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
                required
              />
              <Input
                label="Official Contact Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
              <Input
                label="Official Phone Number"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
              />
              <div className="sm:col-span-2">
                <Input
                  label="Registered Address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-700" />
              Dispatch & Request Alerts
            </h3>
            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-3 text-slate-700">
                <input
                  type="checkbox"
                  checked={profile.emailAlerts}
                  onChange={(e) => setProfile({ ...profile, emailAlerts: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-700 w-4 h-4"
                />
                <span>Email me immediately when an NGO requests a food donation</span>
              </label>
              <label className="flex items-center gap-3 text-slate-700">
                <input
                  type="checkbox"
                  checked={profile.smsAlerts}
                  onChange={(e) => setProfile({ ...profile, smsAlerts: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-700 w-4 h-4"
                />
                <span>SMS reminder 1 hour prior to food expiry time</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button type="submit" variant="primary" icon={Save}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
