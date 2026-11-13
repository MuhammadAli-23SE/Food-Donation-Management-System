import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Utensils,
  Camera,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const CreateDonationPage = () => {
  const { addDonation, currentUser } = useApp();
  const navigate = useNavigate();

  const curatedPhotos = [
    {
      label: 'Artisanal Bakery & Loaves',
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80'
    },
    {
      label: 'Cooked Mediterranean Dishes',
      url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      label: 'Fresh Harvest Produce',
      url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80'
    },
    {
      label: 'Aromatic Curry & Rice',
      url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80'
    },
    {
      label: 'Fresh Dairy & Yogurts',
      url: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const [formData, setFormData] = useState({
    title: 'Warm Herb Roasted Chicken & Garlic Focaccia',
    description: 'Surplus executive lunch banquet portions. Vacuum sealed hot in commercial stainless pans. Includes house-baked garlic rosemary focaccia bread.',
    type: 'cooked',
    quantity: 40,
    unit: 'servings',
    estimatedServings: 40,
    expiryTime: 'Today at 10:00 PM',
    expiryHoursLeft: 5,
    pickupAddress: currentUser?.address ? `${currentUser.address}, ${currentUser.city}` : '842 Pine Street, Seattle, WA',
    city: currentUser?.city || 'Seattle',
    storageInstructions: 'Refrigerate under 40°F immediately upon collection.',
    imageUrl: curatedPhotos[1].url,
    dietary: ['Halal', 'High Protein']
  });

  const dietaryChoices = ['Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'High Protein', 'Nut-Free'];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleDietary = (item) => {
    setFormData((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(item)
        ? prev.dietary.filter((d) => d !== item)
        : [...prev.dietary, item]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDonation({
      ...formData,
      quantity: Number(formData.quantity) || 1,
      estimatedServings: Number(formData.estimatedServings) || 1
    });
    navigate('/donor/donations');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-left">
      
      {/* Page Header */}
      <div>
        <Badge variant="lime" size="sm" className="font-bold uppercase tracking-wider mb-2">
          New Listing Wizard
        </Badge>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-[#174D38]">
          Post Surplus Food for Community Pickup
        </h1>
        <p className="text-xs sm:text-sm text-[#202720]/70 mt-1">
          Provide accurate portions, dietary tags, and handling guidelines to facilitate swift non-profit collection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs (Left Column) */}
        <div className="lg:col-span-7 bg-[#FDFAF5] p-6 sm:p-8 rounded-3xl border border-[#E8EEE6] shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                Donation Title
              </label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Sourdough Loaves & Croissant Assortment"
                className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            {/* Category & Units */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                >
                  <option value="cooked">Cooked Meals</option>
                  <option value="bakery">Bakery & Bread</option>
                  <option value="produce">Fresh Produce</option>
                  <option value="dairy">Dairy & Chilled</option>
                  <option value="packaged">Packaged Goods</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                  Unit Measurement
                </label>
                <input
                  type="text"
                  required
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="e.g. servings, kg, boxes"
                  className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                />
              </div>
            </div>

            {/* Servings & Expiry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                  Estimated People Fed
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  name="estimatedServings"
                  value={formData.estimatedServings}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                  Expiry / Pickup Deadline
                </label>
                <input
                  type="text"
                  required
                  name="expiryTime"
                  value={formData.expiryTime}
                  onChange={handleChange}
                  placeholder="e.g. Today at 9:00 PM"
                  className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                Food Description & Packaging
              </label>
              <textarea
                rows="3"
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mention packaging type, freshness condition, allergen cautions..."
                className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            {/* Pickup Address */}
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                Pickup Address / Kitchen Location
              </label>
              <input
                type="text"
                required
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            {/* Storage Instructions */}
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-1.5">
                Storage & Handling Instructions
              </label>
              <input
                type="text"
                name="storageInstructions"
                value={formData.storageInstructions}
                onChange={handleChange}
                placeholder="e.g. Keep chilled under 40°F, or room temperature dry shelf"
                className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
              />
            </div>

            {/* Dietary Tags */}
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-2">
                Dietary & Allergen Declarations
              </label>
              <div className="flex flex-wrap gap-2">
                {dietaryChoices.map((item) => {
                  const active = formData.dietary.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleDietary(item)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-[#C7E78B] text-[#174D38] border border-[#b1d86d] font-bold'
                          : 'bg-[#F8F6EF] text-[#202720]/70 border border-[#E8EEE6] hover:bg-[#E8EEE6]'
                      }`}
                    >
                      {active ? `✓ ${item}` : `+ ${item}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo Selection Presets */}
            <div>
              <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider mb-2">
                Select Food Photography Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {curatedPhotos.map((photo) => (
                  <button
                    type="button"
                    key={photo.label}
                    onClick={() => setFormData((prev) => ({ ...prev, imageUrl: photo.url }))}
                    className={`p-2 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                      formData.imageUrl === photo.url
                        ? 'border-[#174D38] bg-[#E8EEE6] ring-2 ring-[#174D38]/30 font-bold'
                        : 'border-[#E8EEE6] bg-[#F8F6EF] hover:border-[#174D38]'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.label}
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <span className="text-[11px] text-[#174D38] truncate">{photo.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-[#E8EEE6]">
              <button
                type="submit"
                className="w-full py-4 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C7E78B]" />
                <span>Publish Food Listing to Network</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Card (Right Column) */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#174D38]">
              Live Feed Preview
            </span>
            <span className="text-[11px] text-[#202720]/60">How welfare NGOs see your post</span>
          </div>

          <div className="bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] overflow-hidden shadow-md">
            <div className="relative aspect-[16/10] bg-[#E8EEE6]">
              <img
                src={formData.imageUrl}
                alt={formData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="forest" size="sm" className="font-bold uppercase">
                  {formData.type}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="available" size="sm" className="font-bold">
                  Available
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174D38]/90 text-[#F8F6EF] text-xs font-semibold backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-[#C7E78B]" />
                <span>{formData.expiryTime}</span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt="avatar"
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-[#174D38]">
                  {currentUser?.organizationName || 'Your Kitchen Name'}
                </span>
              </div>

              <h3 className="font-bold text-base text-[#174D38] line-clamp-1">
                {formData.title || 'Untitled Donation'}
              </h3>
              <p className="text-xs text-[#202720]/70 line-clamp-2 leading-relaxed">
                {formData.description || 'No description entered yet.'}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8EEE6] text-xs text-[#202720]/80">
                <div className="flex items-center gap-1.5 font-semibold text-[#174D38]">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{formData.quantity} {formData.unit}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#174D38]" />
                  <span>Feeds ~{formData.estimatedServings}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#202720]/60 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#174D38]" />
                <span className="truncate">{formData.pickupAddress}</span>
              </div>

              {formData.dietary.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formData.dietary.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-lg bg-[#E8EEE6] text-[#202720]/75 text-[10px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
