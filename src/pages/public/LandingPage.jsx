import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Clock,
  Heart,
  Truck,
  CheckCircle2,
  Utensils,
  Sparkles,
  MapPin,
  TrendingUp,
  Leaf
} from 'lucide-react';
import { DonationCard } from '../../components/donations/DonationCard';
import { Badge } from '../../components/common/Badge';
import { PageTransition } from '../../components/common/PageTransition';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { AnimatedCounter } from '../../components/common/AnimatedCounter';
import { staggerContainer, staggerItem, springs } from '../../utils/motion';

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
    <PageTransition>
      <div className="space-y-28 pb-24 overflow-hidden text-left">
        
        {/* 1. HERO SECTION */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Expressive Copy & CTAs */}
              <motion.div
                variants={staggerContainer(0.08, 0.1)}
                initial="initial"
                animate="animate"
                className="lg:col-span-7 space-y-8"
              >
                
                {/* Sustainable Trust Badge */}
                <motion.div variants={staggerItem} className="inline-block">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8EEE6] border border-[#d2ddd0] text-[#174D38] text-xs font-bold tracking-wide shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#174D38] animate-ping" />
                    <span>Next-Gen Surplus Food Redistribution</span>
                    <span className="bg-[#174D38] text-[#C7E78B] text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold">
                      Zero Waste
                    </span>
                  </div>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  variants={staggerItem}
                  className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#174D38] font-display leading-[1.07]"
                >
                  Good Food Deserves a{' '}
                  <span className="relative inline-block text-[#174D38]">
                    Second Chance
                    <motion.svg
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 300 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 14C50 4 150 18 297 8"
                        stroke="#C7E78B"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </span>.
                </motion.h1>

                {/* Supporting Subhead */}
                <motion.p
                  variants={staggerItem}
                  className="text-base sm:text-lg text-[#202720]/80 leading-relaxed max-w-2xl font-normal"
                >
                  Connecting surplus food with the people and communities who need it most.
                  We bridge commercial kitchens, artisanal bakeries, and food producers with certified welfare organizations in real time.
                </motion.p>

                {/* Primary Actions */}
                <motion.div
                  variants={staggerItem}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/explore"
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-2xl text-sm font-bold shadow-xl hover:shadow-2xl transition-all group"
                    >
                      <span>Explore Donations</span>
                      <ArrowRight className="w-4 h-4 text-[#C7E78B] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBecomeDonor}
                    className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#FDFAF5] text-[#174D38] hover:bg-[#E8EEE6] border-2 border-[#174D38] rounded-2xl text-sm font-bold transition-all shadow-sm"
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Become a Food Donor</span>
                  </motion.button>
                </motion.div>

                {/* Social Proof Line */}
                <motion.div
                  variants={staggerItem}
                  className="pt-6 flex flex-wrap items-center gap-6 text-xs text-[#202720]/75 border-t border-[#E8EEE6]"
                >
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
                </motion.div>
              </motion.div>

              {/* Right Column: Visual Showcase (Asymmetric Food Layout with Floating Micro Cards) */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Main Hero Photo Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FDFAF5] aspect-[4/5] group"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
                      alt="Freshly prepared nutritious meals"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#174D38]/85 via-[#174D38]/20 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 text-[#F8F6EF]">
                      <Badge variant="lime" size="sm" className="mb-2 font-bold uppercase shadow-sm">
                        Live Community Match
                      </Badge>
                      <h3 className="font-display font-bold text-xl leading-tight">
                        L'Étoile Brasserie matched with St. Vincent Youth Center
                      </h3>
                      <p className="text-xs text-[#E8EEE6]/90 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C7E78B]" />
                        50 warm meals collected 24 minutes ago
                      </p>
                    </div>
                  </motion.div>

                  {/* Floating Micro Card 1: Artisanal Bread (Gentle Ambient Float) */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                    className="absolute -top-6 -left-6 sm:-left-8 bg-[#FDFAF5] p-3.5 rounded-2xl shadow-xl border border-[#E8EEE6] flex items-center gap-3 backdrop-blur-md"
                  >
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
                  </motion.div>

                  {/* Floating Micro Card 2: Impact Metric (Gentle Ambient Float) */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#174D38] text-[#F8F6EF] p-4 rounded-2xl shadow-xl border border-[#216248] flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C7E78B] flex items-center justify-center text-[#174D38] font-bold">
                      <Heart className="w-5 h-5 fill-[#174D38]" />
                    </div>
                    <div>
                      <p className="text-xl font-extrabold font-display text-[#C7E78B]">
                        <AnimatedCounter value={14200} suffix="+" />
                      </p>
                      <p className="text-[11px] text-[#E8EEE6]/80 font-medium">Meals Delivered This Month</p>
                    </div>
                  </motion.div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. IMPACT NUMBERS (Animated Live Counters on Scroll) */}
        <section id="impact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-[#174D38] rounded-3xl p-8 sm:p-12 text-[#F8F6EF] shadow-2xl relative overflow-hidden">
              
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

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 text-left">
                <div className="space-y-1">
                  <span className="text-3xl sm:text-5xl font-extrabold text-[#C7E78B] font-display">
                    <AnimatedCounter value={14280} />
                  </span>
                  <p className="text-sm font-bold text-[#F8F6EF]">Meals Rescued</p>
                  <p className="text-xs text-[#E8EEE6]/70">Diverted from waste to tables</p>
                </div>

                <div className="space-y-1">
                  <span className="text-3xl sm:text-5xl font-extrabold text-[#C7E78B] font-display">
                    <AnimatedCounter value={8.4} suffix=" Tons" />
                  </span>
                  <p className="text-sm font-bold text-[#F8F6EF]">CO₂ Emissions Saved</p>
                  <p className="text-xs text-[#E8EEE6]/70">Landfill methane avoidance</p>
                </div>

                <div className="space-y-1">
                  <span className="text-3xl sm:text-5xl font-extrabold text-[#C7E78B] font-display">
                    <AnimatedCounter value={42} />
                  </span>
                  <p className="text-sm font-bold text-[#F8F6EF]">Accredited NGOs</p>
                  <p className="text-xs text-[#E8EEE6]/70">Shelters, youth banks, pantries</p>
                </div>

                <div className="space-y-1">
                  <span className="text-3xl sm:text-5xl font-extrabold text-[#C7E78B] font-display">
                    <AnimatedCounter value={98.2} suffix="%" />
                  </span>
                  <p className="text-sm font-bold text-[#F8F6EF]">Fulfillment Rate</p>
                  <p className="text-xs text-[#E8EEE6]/70">Average pickup within 90 mins</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. HOW IT WORKS (Three Steps with Staggered ScrollReveal) */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
              <Badge variant="lime" size="sm" className="font-bold uppercase tracking-wider">
                Seamless Workflow
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#174D38] font-display">
                How NourishBridge Works
              </h2>
              <p className="text-sm sm:text-base text-[#202720]/75">
                A reliable 3-step logistics chain connecting surplus food to certified community dining halls in under two hours.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Step 1 */}
            <ScrollReveal delay={0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-[#FDFAF5] p-8 rounded-3xl border border-[#E8EEE6] shadow-sm hover:shadow-xl hover:border-[#174D38] transition-all h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E8EEE6] text-[#174D38] flex items-center justify-center font-extrabold text-xl mb-6 shadow-inner">
                    01
                  </div>
                  <h3 className="text-xl font-bold text-[#174D38] font-display mb-2">
                    Donors Post Surplus Food
                  </h3>
                  <p className="text-xs sm:text-sm text-[#202720]/75 leading-relaxed">
                    Restaurants, caterers, or bakeries upload food photos, declare quantities, dietary categories, and specify the pickup window.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8EEE6] flex items-center gap-2 text-xs font-bold text-[#174D38]">
                  <Utensils className="w-4 h-4 text-[#174D38]" />
                  <span>Takes under 90 seconds</span>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delay={0.2}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-[#FDFAF5] p-8 rounded-3xl border border-[#E8EEE6] shadow-sm hover:shadow-xl hover:border-[#174D38] transition-all h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#C7E78B] text-[#174D38] flex items-center justify-center font-extrabold text-xl mb-6 shadow-sm">
                    02
                  </div>
                  <h3 className="text-xl font-bold text-[#174D38] font-display mb-2">
                    Verified NGOs Reserve
                  </h3>
                  <p className="text-xs sm:text-sm text-[#202720]/75 leading-relaxed">
                    Vetted non-profit organizations browse listings, submit requests with logistics notes, and receive instant approval from food donors.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8EEE6] flex items-center gap-2 text-xs font-bold text-[#174D38]">
                  <ShieldCheck className="w-4 h-4 text-[#174D38]" />
                  <span>Admin-audited credentials</span>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delay={0.3}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-[#FDFAF5] p-8 rounded-3xl border border-[#E8EEE6] shadow-sm hover:shadow-xl hover:border-[#174D38] transition-all h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#174D38] text-[#C7E78B] flex items-center justify-center font-extrabold text-xl mb-6 shadow-md">
                    03
                  </div>
                  <h3 className="text-xl font-bold text-[#174D38] font-display mb-2">
                    Pickup & Impact Tracking
                  </h3>
                  <p className="text-xs sm:text-sm text-[#202720]/75 leading-relaxed">
                    Volunteers collect the food safely and log photographic proof of distribution alongside the exact count of people served.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8EEE6] flex items-center gap-2 text-xs font-bold text-[#174D38]">
                  <Truck className="w-4 h-4 text-[#174D38]" />
                  <span>Full lifecycle audit trail</span>
                </div>
              </motion.div>
            </ScrollReveal>

          </div>
        </section>

        {/* 4. FEATURED DONATIONS CARDS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <Badge variant="forest" size="sm" className="mb-2">
                  Live Opportunities
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174D38] font-display">
                  Featured Surplus Available Right Now
                </h2>
                <p className="text-xs sm:text-sm text-[#202720]/70 mt-1">
                  Freshly prepared meals, bakery items, and fresh produce waiting for collection.
                </p>
              </div>

              <Link
                to="/explore"
                className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#174D38] hover:text-[#0f3426] group"
              >
                <span>View All Active Listings</span>
                <ArrowRight className="w-4 h-4 text-[#174D38] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDonations.map((donation, idx) => (
              <ScrollReveal key={donation.id} delay={idx * 0.1}>
                <DonationCard donation={donation} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 5. MISSION & EDITORIAL STORYTELLING */}
        <section id="mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-[#E8EEE6] rounded-3xl p-8 sm:p-14 border border-[#d2ddd0]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                <div className="space-y-6">
                  <Badge variant="lime" size="sm" className="font-bold uppercase tracking-wider">
                    Our Core Mission
                  </Badge>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-[#174D38] font-display leading-tight">
                    No Good Meal Should Ever Go To Waste While Families Go Hungry.
                  </h2>
                  <p className="text-sm sm:text-base text-[#202720]/80 leading-relaxed">
                    Over one-third of all food produced globally is discarded, while millions experience food insecurity.
                    The breakdown is not supply—it is logistics, certification, and trust.
                  </p>
                  <p className="text-sm sm:text-base text-[#202720]/80 leading-relaxed">
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
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80"
                      alt="Community volunteering and food distribution"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 6. FINAL CALL TO ACTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-[#174D38] rounded-3xl p-10 sm:p-16 text-center text-[#F8F6EF] relative overflow-hidden shadow-2xl">
              <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C7E78B]">
                  Ready to Make an Impact?
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
                  Join the Redistribution Movement Today
                </h2>
                <p className="text-xs sm:text-base text-[#E8EEE6]/80 leading-relaxed">
                  Whether you are an executive chef with surplus banquet trays or a community shelter seeking daily nutrition, NourishBridge provides the technology infrastructure you need.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/register"
                      className="inline-block w-full sm:w-auto px-8 py-4 bg-[#C7E78B] text-[#174D38] hover:bg-[#b1d86d] rounded-2xl text-sm font-bold shadow-xl transition-all"
                    >
                      Register Your Kitchen or NGO
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/explore"
                      className="inline-block w-full sm:w-auto px-8 py-4 bg-transparent text-[#F8F6EF] hover:bg-[#216248] border border-[#216248] rounded-2xl text-sm font-bold transition-all"
                    >
                      Browse Current Listings
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </PageTransition>
  );
};
