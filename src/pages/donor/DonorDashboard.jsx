import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Utensils,
  PlusCircle,
  Inbox,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Heart,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { DonationCard } from '../../components/donations/DonationCard';

export const DonorDashboard = () => {
  const { currentUser, donations, requests, updateRequestStatus } = useApp();

  // Filter donor's own donations
  const myDonations = donations.filter((d) => d.donorId === currentUser?.id || d.donorName.includes('Golden Crust'));
  
  // Pending requests for this donor
  const pendingRequests = requests.filter(
    (r) => r.status === 'pending' && (r.donorId === currentUser?.id || r.donorName.includes('Golden Crust'))
  );

  const activeCount = myDonations.filter((d) => d.status === 'available').length;
  const reservedCount = myDonations.filter((d) => d.status === 'reserved' || d.status === 'requested').length;
  const completedCount = myDonations.filter((d) => d.status === 'completed').length;

  return (
    <div className="space-y-8 text-left">
      
      {/* Personalized Welcome Banner */}
      <div className="bg-[#174D38] text-[#F8F6EF] rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#216248] text-[#C7E78B] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#C7E78B] animate-pulse" />
              <span>Certified Donor Kitchen</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
              Welcome, {currentUser?.organizationName || currentUser?.name}!
            </h1>
            <p className="text-sm text-[#E8EEE6]/80 max-w-xl">
              You have provided an estimated <strong className="text-[#C7E78B]">1,420 nutritious meals</strong> to community shelters. Your evening surplus directly prevents food waste in Seattle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/donor/create"
              className="flex items-center gap-2 px-5 py-3 bg-[#C7E78B] text-[#174D38] hover:bg-[#b1d86d] rounded-2xl text-xs font-bold shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Surplus Food</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Contextual Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
            <span>Available Listings</span>
            <Package className="w-4 h-4 text-[#174D38]" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            {activeCount}
          </p>
          <p className="text-[11px] text-emerald-800 font-medium mt-1">Ready for NGO booking</p>
        </div>

        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
            <span>Pending Requests</span>
            <Inbox className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-display text-amber-800">
            {pendingRequests.length}
          </p>
          <p className="text-[11px] text-[#202720]/60 font-medium mt-1">Awaiting your approval</p>
        </div>

        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
            <span>In Distribution</span>
            <Clock className="w-4 h-4 text-[#174D38]" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            {reservedCount}
          </p>
          <p className="text-[11px] text-[#202720]/60 font-medium mt-1">Scheduled for pickup</p>
        </div>

        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
            <span>Meals Diverted</span>
            <Heart className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            1,420
          </p>
          <p className="text-[11px] text-[#202720]/60 font-medium mt-1">Cumulative impact</p>
        </div>
      </div>

      {/* Pending Requests Alert & Approval Panel */}
      {pendingRequests.length > 0 && (
        <div className="bg-[#FDFAF5] rounded-3xl border-2 border-amber-300 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <AlertCircle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-base text-[#174D38] font-display">
                  Incoming Food Booking Requests ({pendingRequests.length})
                </h3>
                <p className="text-xs text-[#202720]/70">
                  Accredited shelters have requested your available surplus. Review and approve to schedule pickup.
                </p>
              </div>
            </div>
            <Link to="/donor/requests" className="text-xs font-bold text-[#174D38] hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#F8F6EF] rounded-2xl border border-[#E8EEE6]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={req.orgAvatar}
                    alt={req.organizationName}
                    className="w-10 h-10 rounded-full object-cover border border-[#C7E78B]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#174D38]">{req.organizationName}</h4>
                    <p className="text-xs text-[#202720]/70">
                      Requested: <span className="font-semibold text-[#174D38]">{req.requestedQuantity}</span> of "{req.donationTitle}"
                    </p>
                    <p className="text-[11px] text-[#202720]/60 italic mt-0.5">
                      "{req.notes}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => updateRequestStatus(req.id, 'rejected')}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Decline</span>
                  </button>
                  <button
                    onClick={() => updateRequestStatus(req.id, 'approved')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C7E78B]" />
                    <span>Approve Pickup</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-display text-[#174D38]">
              Your Current Surplus Listings
            </h3>
            <p className="text-xs text-[#202720]/70">
              Manage items posted by your kitchen or bistro
            </p>
          </div>
          <Link
            to="/donor/donations"
            className="text-xs font-bold text-[#174D38] hover:text-[#0f3426] flex items-center gap-1"
          >
            <span>Manage All Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {myDonations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myDonations.slice(0, 3).map((item) => (
              <DonationCard key={item.id} donation={item} showDonor={false} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FDFAF5] p-8 rounded-3xl border border-[#E8EEE6] text-center space-y-3">
            <Utensils className="w-10 h-10 text-[#174D38]/50 mx-auto" />
            <h4 className="font-bold text-sm text-[#174D38]">No active listings posted yet</h4>
            <p className="text-xs text-[#202720]/60 max-w-sm mx-auto">
              Post fresh surplus bakery goods, prepared buffet trays, or produce in under two minutes.
            </p>
            <Link
              to="/donor/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#174D38] text-[#F8F6EF] rounded-xl text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4 text-[#C7E78B]" />
              <span>Post First Donation</span>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};
