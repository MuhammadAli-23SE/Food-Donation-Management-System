import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { uploadFoodImage } from '../../services/storageService';
import {
  Utensils,
  Clock,
  MapPin,
  Users,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { PageTransition } from '../../components/common/PageTransition';

export const CreateDonationPage = () => {
  const { addDonation, currentUser: appUser } = useApp();
  const { user: authUser, profile: authProfile } = useAuth();
  const navigate = useNavigate();

  const activeUser = authProfile || appUser;

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
    pickupAddress: activeUser?.address ? `${activeUser.address}, ${activeUser.city || 'Seattle, WA'}` : '842 Pine Street, Seattle, WA',
    city: activeUser?.city || 'Seattle, WA',
    storageInstructions: 'Refrigerate under 40°F immediately upon collection.',
    imageUrl: curatedPhotos[1].url,
    dietary: ['Halal', 'High Protein']
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const { publicUrl, error } = await uploadFoodImage(file, 'donations');
      if (error) {
        setUploadError(error);
      } else if (publicUrl) {
        setFormData((prev) => ({ ...prev, imageUrl: publicUrl }));
        setUploadSuccess(true);
      }
    } catch (err) {
      setUploadError(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);

    try {
      await addDonation({
        ...formData,
        quantity: Number(formData.quantity) || 1,
        estimatedServings: Number(formData.estimatedServings) || 1
      });
      navigate('/donor/donations');
    } catch (err) {
      console.error('[CreateDonation] error:', err);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <PageTransition>
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
                  className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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
                    className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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
                    className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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
                    className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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
                    className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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
                    className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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
                  className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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
                  className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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
                  className="w-full px-4 py-3 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#174D38]"
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
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        key={item}
                        onClick={() => toggleDietary(item)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          active
                            ? 'bg-[#C7E78B] text-[#174D38] border border-[#b1d86d] shadow-sm'
                            : 'bg-[#F8F6EF] text-[#202720]/70 border border-[#E8EEE6] hover:bg-[#E8EEE6]'
                        }`}
                      >
                        {active ? `✓ ${item}` : `+ ${item}`}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Upload & Presets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#174D38] uppercase tracking-wider">
                    Food Photo (Custom Upload or Curated Template)
                  </label>
                  <span className="text-[10px] text-[#202720]/60">Max 5MB • Supabase Storage</span>
                </div>

                {/* Upload File Input */}
                <div className="p-4 bg-[#F8F6EF] border-2 border-dashed border-[#174D38]/30 hover:border-[#174D38] rounded-2xl text-center transition-all">
                  <label className="cursor-pointer block space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#174D38] text-[#C7E78B] flex items-center justify-center mx-auto shadow-sm">
                      {isUploading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <UploadCloud className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#174D38] hover:underline">
                        {isUploading ? 'Uploading to Supabase Storage...' : 'Click to upload your dish photo'}
                      </span>
                      <p className="text-[10px] text-[#202720]/60 mt-0.5">PNG, JPG, or WEBP from kitchen camera or files</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Photo successfully uploaded and attached to listing!</span>
                  </div>
                )}

                {/* Curated Quick Templates */}
                <div>
                  <span className="text-[11px] font-bold text-[#174D38]/80 block mb-1.5">
                    Or select a curated photography template:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {curatedPhotos.map((photo) => (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        key={photo.label}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, imageUrl: photo.url }));
                          setUploadSuccess(false);
                        }}
                        className={`p-2 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                          formData.imageUrl === photo.url
                            ? 'border-[#174D38] bg-[#E8EEE6] ring-2 ring-[#174D38]/30 font-bold shadow-sm'
                            : 'border-[#E8EEE6] bg-[#F8F6EF] hover:border-[#174D38]'
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.label}
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                        <span className="text-[11px] text-[#174D38] truncate">{photo.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E8EEE6]">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isPublishing || isUploading}
                  className="w-full py-4 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isPublishing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C7E78B]" />
                      <span>Saving to PostgreSQL Database...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#C7E78B]" />
                      <span>Publish Food Listing to Network</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Live Preview Card (Right Column) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#174D38]">
                Live Feed Preview
              </span>
              <span className="text-[10px] text-[#202720]/60">How welfare NGOs see your post</span>
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
                    src={activeUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt="avatar"
                    className="w-5 h-5 rounded-full object-cover border border-[#C7E78B]"
                  />
                  <span className="text-xs font-bold text-[#174D38]">
                    {activeUser?.organizationName || activeUser?.restaurant_name || activeUser?.name || 'Your Kitchen Name'}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#174D38] line-clamp-1">
                  {formData.title || 'Untitled Donation'}
                </h3>
                <p className="text-xs text-[#202720]/70 line-clamp-2 leading-relaxed">
                  {formData.description || 'No description entered yet.'}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8EEE6] text-xs text-[#202720]/80">
                  <div className="flex items-center gap-1.5 font-bold text-[#174D38]">
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
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
};
