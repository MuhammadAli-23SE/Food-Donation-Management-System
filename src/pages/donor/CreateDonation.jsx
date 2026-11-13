import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Upload,
  Clock,
  ShieldAlert,
  CheckCircle2,
  MapPin,
  UtensilsCrossed,
  ArrowLeft,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Card from '../../components/common/Card';

export default function CreateDonation() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Cooked Meals',
    foodType: 'cooked',
    quantity: '',
    unit: 'servings',
    expiryHours: '4',
    storageCondition: 'Hot Insulated Box',
    dietaryNotes: 'Halal, Vegetarian available',
    pickupAddress: '42 Commercial Boulevard, Block 4, Downtown',
    city: 'Metro City',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate('/donor/donations');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      </div>

      <PageHeader
        title="Post Surplus Food Donation"
        subtitle="List excess edible food with precise storage guidelines and expiry schedules for rapid pickup."
      />

      <Card className="shadow-xs border-slate-200">
        {success ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Donation Listed Successfully!</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your surplus food is now published on the active network. Nearby verified NGOs will be notified immediately.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 text-emerald-900 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-emerald-700" />
                Food Item Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Food Title / Description Summary"
                    placeholder="e.g. 50 Portions of Cooked Rice & Chicken Stew"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <Select
                  label="Food Category"
                  options={[
                    { value: 'Cooked Meals', label: 'Cooked Meals (Ready to Eat)' },
                    { value: 'Baked Goods', label: 'Baked Goods & Breads' },
                    { value: 'Raw Ingredients', label: 'Raw Produce / Vegetables' },
                    { value: 'Packaged Goods', label: 'Packaged & Canned Goods' },
                    { value: 'Dairy', label: 'Dairy & Refrigerated Items' },
                  ]}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Quantity"
                    type="number"
                    min="1"
                    placeholder="e.g. 40"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                  <Select
                    label="Unit"
                    options={[
                      { value: 'servings', label: 'Servings / Meals' },
                      { value: 'kg', label: 'Kilograms (kg)' },
                      { value: 'boxes', label: 'Boxes' },
                      { value: 'packets', label: 'Packets' },
                    ]}
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Shelf-Life & Safety */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 text-emerald-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                Shelf-Life & Storage Handling
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Safe Consumption Window (Expiry)"
                  options={[
                    { value: '2', label: 'Within 2 Hours (Urgent Hot Food)' },
                    { value: '4', label: 'Within 4 Hours (Cooked Catering)' },
                    { value: '8', label: 'Within 8 Hours (Same-Day Bakery)' },
                    { value: '24', label: 'Within 24 Hours (Refrigerated)' },
                    { value: '72', label: 'Within 3 Days (Fresh Produce)' },
                  ]}
                  value={formData.expiryHours}
                  onChange={(e) => setFormData({ ...formData, expiryHours: e.target.value })}
                />

                <Select
                  label="Current Storage Condition"
                  options={[
                    { value: 'Hot Insulated Box', label: 'Hot Insulated Box (>60°C)' },
                    { value: 'Refrigerated 4°C', label: 'Refrigerated (2°C - 4°C)' },
                    { value: 'Room Temperature', label: 'Ambient Room Temperature' },
                    { value: 'Frozen', label: 'Deep Freezer (<-18°C)' },
                  ]}
                  value={formData.storageCondition}
                  onChange={(e) => setFormData({ ...formData, storageCondition: e.target.value })}
                />

                <div className="sm:col-span-2">
                  <Input
                    label="Dietary & Allergen Information"
                    placeholder="e.g. Halal certified, contains nuts, 100% vegetarian"
                    value={formData.dietaryNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Location & Instructions */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 text-emerald-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                Pickup Location & Logistics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Collection Address"
                    required
                    value={formData.pickupAddress}
                    onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  />
                </div>
                <Select
                  label="City / District"
                  options={[
                    { value: 'Metro City', label: 'Metro City' },
                    { value: 'West Suburb', label: 'West Suburb' },
                    { value: 'Harbor District', label: 'Harbor District' },
                    { value: 'Tech District', label: 'Tech District' },
                  ]}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />

                <div className="sm:col-span-3">
                  <Textarea
                    label="Preparation & Handling Notes"
                    placeholder="Provide details on how the food was packed, recommended reheated steps, or gate entry instructions for the pickup driver..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Photo Mock Upload */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Food Quality Photo (Recommended)
              </label>
              <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50 hover:bg-slate-100/60 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">
                  Click or drag photo here to upload
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supports PNG, JPG up to 10MB (Supabase Storage integration in Phase 2)
                </p>
              </div>
            </div>

            {/* Food Safety Guarantee Check */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
              <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Food Quality Affirmation:</strong> I certify that this food was prepared under sanitary conditions, stored at safe temperatures, and is wholesome for human consumption.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" icon={PlusCircle}>
                Publish Food Listing
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
