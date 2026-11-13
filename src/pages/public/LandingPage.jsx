import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Clock,
  Heart,
  TrendingUp,
  Truck,
  CheckCircle2,
  Utensils,
  Building2,
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { DonationCard } from '../../components/donations/DonationCard';
import { Badge } from '../../components/common/Badge';

export const LandingPage = () => {
  const { donations, switchRole } = useApp();
  const navigate = useNavigate();

  // Featured available donations
  const featuredDonations = donations.slice(0, 3);

  const handleBecomeDonor = () => {
    switchRole('donor');
    navigate('/donor/create');
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden text-left">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Expressive Copy & CTAs */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Sustainable Trust Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8EEE6] border border-[#d2ddd0] text-[#174D38] text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#174D38] animate-ping" />
                <span>Next-Gen Surplus Food Redistribution</span>
                <span className="bg-[#174D38] text-[#C7E78B] text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">
                  Zero Waste
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#174D38] font-display leading-[1.08]">
                Good Food Deserves a <span className="underline decoration-[#C7E78B] decoration-wavy decoration-2">Second Chance</span>.
              </h1>

              {/* Supporting Subhead */}
              <p className="text-lg sm:text-xl text-[#202720]/80 leading-relaxed max-w-2xl font-normal">
                Connecting surplus food with the people and communities who need it most.
                We bridge commercial kitchens, artisanal bakeries, and food producers with certified welfare organizations in real time.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/explore"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-2xl text-base font-bold shadow-lg hover:shadow-xl transition-all group"
                >
                  <span>Explore Donations</span>
                  <ArrowRight className="w-5 h-5 text-[#C7E78B] group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={handleBecomeDonor}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-[#FDFAF5] text-[#174D38] hover:bg-[#E8EEE6] border-2 border-[#174D38] rounded-2xl text-base font-bold transition-all"
                >
                  <Utensils className="w-5 h-5" />
                  <span>Become a Food Donor</span>
                </button>
              </div>

              {/* Social Proof Line */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-[#202720]/70 border-t border-[#E8EEE6]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#174D38]" />
                  <span>100% Accredited Welfare NGOs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#174D38]" />
                  <span>Sub-2 Hour Direct Pickup Match</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#174D38]" />
                  <span>Zero Commercial Waste</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase (Asymmetric Food Layout) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Photo */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FDFAF5] aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
                    alt="Freshly prepared nutritious meals"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#174D38]/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-[#F8F6EF]">
                    <Badge variant="lime" size="sm" className="mb-2 font-bold uppercase">
                      Live Community Match
                    </Badge>
                    <h3 className="font-display font-bold text-xl leading-tight">
                      L'Étoile Brasserie matched with St. Vincent Youth Center
                    </h3>
                    <p className="text-xs text-[#E8EEE6]/90 mt-1">
                      50 warm meals collected 24 minutes ago
                    </p>
                  </div>
                </div>

                {/* Floating Micro Card 1: Artisanal Bread */}
                <div className="absolute -top-6 -left-6 sm:-left-8 bg-[#FDFAF5] p-3.5 rounded-2xl shadow-xl border border-[#E8EEE6] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80"
                    alt="Bakery bread"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#174D38] uppercase tracking-wider block">
                      Bakery Surplus
                    </span>
                    <p className="text-xs font-bold text-[#202720]">35 Sourdough Loaves</p>
                    <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
                      Available Downtown
                    </span>
                  </div>
                </div>

                {/* Floating Micro Card 2: Impact Metric */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#174D38] text-[#F8F6EF] p-4 rounded-2xl shadow-xl border border-[#216248] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C7E78B] flex items-center justify-center text-[#174D38] font-bold">
                    <Heart className="w-5 h-5 fill-[#174D38]" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold font-display text-[#C7E78B]">14,200+</p>
                    <p className="text-[11px] text-[#E8EEE6]/80 font-medium">Meals Delivered This Month</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. IMPACT NUMBERS (Clearly Labeled Demo Figures) */}
      <section id="impact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#174D38] rounded-3xl p-8 sm:p-12 text-[#F8F6EF] shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#216248]">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#C7E78B]">
                Real-Time Impact Metrics (Simulated Network)
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8F6EF] font-display mt-1">
                Measurable Change in Every Community
              </h2>
            </div>
            <p className="text-xs text-[#E8EEE6]/75 max-w-sm">
              Audited figures tracking certified distribution, food rescue volume, and environmental savings across metropolitan hubs.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#C7E78B] font-display">
                14,280
              </span>
              <p className="text-sm font-semibold text-[#F8F6EF]">Meals Rescued</p>
              <p className="text-xs text-[#E8EEE6]/70">Diverted from waste to tables</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#C7E78B] font-display">
                8.4 Tons
              </span>
              <p className="text-sm font-semibold text-[#F8F6EF]">CO₂ Emissions Saved</p>
              <p className="text-xs text-[#E8EEE6]/70">Landfill methane avoidance</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#C7E78B] font-display">
                42
              </span>
              <p className="text-sm font-semibold text-[#F8F6EF]">Accredited NGOs</p>
              <p className="text-xs text-[#E8EEE6]/70">Shelters, youth banks, pantries</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#C7E78B] font-display">
                98.2%
              </span>
              <p className="text-sm font-semibold text-[#F8F6EF]">Fulfillment Rate</p>
              <p className="text-xs text-[#E8EEE6]/70">Average pickup within 90 mins</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (Three Steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <Badge variant="lime" size="sm" className="font-bold uppercase tracking-wider">
            Seamless Workflow
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#174D38] font-display">
            How NourishBridge Works
          </h2>
          <p className="text-base text-[#202720]/75">
            A reliable 3-step logistics chain connecting surplus food to certified community dining halls in under two hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-[#FDFAF5] p-8 rounded-3xl border border-[#E8EEE6] shadow-sm hover:border-[#174D38] transition-all relative">
            <div className="w-14 h-14 rounded-2xl bg-[#E8EEE6] text-[#174D38] flex items-center justify-center font-bold text-xl mb-6">
              01
            </div>
            <h3 className="text-xl font-bold text-[#174D38] font-display mb-2">
              Donors Post Surplus Food
            </h3>
            <p className="text-sm text-[#202720]/75 leading-relaxed">
              Restaurants, caterers, or groceries upload food photos, declare quantities, dietary categories, and specify the pickup window.
            </p>
            <div className="mt-6 pt-4 border-t border-[#E8EEE6] flex items-center gap-2 text-xs font-semibold text-[#174D38]">
              <Utensils className="w-4 h-4 text-[#174D38]" />
              <span>Takes under 90 seconds</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FDFAF5] p-8 rounded-3xl border border-[#E8EEE6] shadow-sm hover:border-[#174D38] transition-all relative">
            <div className="w-14 h-14 rounded-2xl bg-[#C7E78B] text-[#174D38] flex items-center justify-center font-bold text-xl mb-6">
              02
            </div>
            <h3 className="text-xl font-bold text-[#174D38] font-display mb-2">
              Verified NGOs Reserve
            </h3>
            <p className="text-sm text-[#202720]/75 leading-relaxed">
              Vetted organizations browse listings, submit requests with logistics notes, and receive instant approval from food donors.
            </p>
            <div className="mt-6 pt-4 border-t border-[#E8EEE6] flex items-center gap-2 text-xs font-semibold text-[#174D38]">
              <ShieldCheck className="w-4 h-4 text-[#174D38]" />
              <span>Admin-audited credentials</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FDFAF5] p-8 rounded-3xl border border-[#E8EEE6] shadow-sm hover:border-[#174D38] transition-all relative">
            <div className="w-14 h-14 rounded-2xl bg-[#174D38] text-[#C7E78B] flex items-center justify-center font-bold text-xl mb-6">
              03
            </div>
            <h3 className="text-xl font-bold text-[#174D38] font-display mb-2">
              Pickup & Impact Tracking
            </h3>
            <p className="text-sm text-[#202720]/75 leading-relaxed">
              Volunteers collect the food safely and log photographic proof of distribution alongside the exact count of people served.
            </p>
            <div className="mt-6 pt-4 border-t border-[#E8EEE6] flex items-center gap-2 text-xs font-semibold text-[#174D38]">
              <Truck className="w-4 h-4 text-[#174D38]" />
              <span>Full lifecycle audit trail</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURED DONATIONS CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="forest" size="sm" className="mb-2">
              Live Opportunities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174D38] font-display">
              Featured Surplus Available Right Now
            </h2>
            <p className="text-sm text-[#202720]/70 mt-1">
              Freshly prepared meals, bakery items, and fresh produce waiting for collection.
            </p>
          </div>

          <Link
            to="/explore"
            className="flex items-center gap-2 text-sm font-bold text-[#174D38] hover:text-[#0f3426] group"
          >
            <span>View All Active Listings</span>
            <ArrowRight className="w-4 h-4 text-[#174D38] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      </section>

      {/* 5. MISSION & EDITORIAL STORYTELLING */}
      <section id="mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E8EEE6] rounded-3xl p-8 sm:p-14 border border-[#d2ddd0]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <Badge variant="lime" size="sm" className="font-bold uppercase tracking-wider">
                Our Core Mission
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#174D38] font-display leading-tight">
                No Good Meal Should Ever Go To Waste While Families Go Hungry.
              </h2>
              <p className="text-base text-[#202720]/80 leading-relaxed">
                Over one-third of all food produced globally is discarded, while millions experience food insecurity.
                The breakdown is not supply—it is logistics, certification, and trust.
              </p>
              <p className="text-base text-[#202720]/80 leading-relaxed">
                NourishBridge solves this with an enterprise-ready pipeline: real-time availability matching, authenticated donor-recipient verification, and end-to-end transparent delivery tracking.
              </p>

              <div className="pt-2 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-bold font-display text-[#174D38]">100% Free</p>
                  <p className="text-xs text-[#202720]/70">For all verified non-profits</p>
                </div>
                <div className="h-8 w-px bg-[#d2ddd0]" />
                <div>
                  <p className="text-2xl font-bold font-display text-[#174D38]">Safe Harbor</p>
                  <p className="text-xs text-[#202720]/70">Bill Emerson Good Samaritan compliant</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80"
                  alt="Community volunteering and food distribution"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#174D38] rounded-3xl p-10 sm:p-16 text-center text-[#F8F6EF] relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C7E78B]">
              Ready to Make an Impact?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Join the Redistribution Movement Today
            </h2>
            <p className="text-sm sm:text-base text-[#E8EEE6]/80 leading-relaxed">
              Whether you are an executive chef with surplus banquet trays or a community shelter seeking daily nutrition, NourishBridge provides the technology infrastructure you need.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-[#C7E78B] text-[#174D38] hover:bg-[#b1d86d] rounded-2xl text-base font-bold shadow-lg transition-all"
              >
                Register Your Kitchen or NGO
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#F8F6EF] hover:bg-[#216248] border border-[#216248] rounded-2xl text-base font-bold transition-all"
              >
                Browse Current Listings
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
