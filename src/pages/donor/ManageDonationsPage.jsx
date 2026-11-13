import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  PlusCircle,
  Trash2,
  CheckCircle,
  Clock,
  MapPin,
  Eye
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { PageTransition } from '../../components/common/PageTransition';

export const ManageDonationsPage = () => {
  const { donations, deleteDonation, updateDonation, currentUser } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');

  const myDonations = donations.filter(
    (d) => d.donorId === currentUser?.id || d.donorName.includes('Golden Crust')
  );

  const filtered = myDonations.filter((d) => {
    if (statusFilter === 'all') return true;
    return d.status === statusFilter;
  });

  return (
    <PageTransition>
      <div className="space-y-6 text-left">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
              Manage Food Listings
            </h1>
            <p className="text-xs text-[#202720]/70 mt-1">
              Track status, update availability, or mark donations as completed upon pickup.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/donor/create"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426] rounded-2xl text-xs font-bold shadow-md transition-all self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4 text-[#C7E78B]" />
              <span>Post New Surplus Food</span>
            </Link>
          </motion.div>
        </div>

        {/* Filter Tabs with animated sliding pill */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#E8EEE6]">
          {['all', 'available', 'requested', 'reserved', 'completed'].map((tab) => {
            const isActive = statusFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                  isActive ? 'text-[#F8F6EF]' : 'text-[#202720]/70 hover:bg-[#E8EEE6] bg-[#FDFAF5] border border-[#E8EEE6]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="manageDonationsTab"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-[#174D38] rounded-xl shadow-sm -z-0"
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Listings Table / Cards */}
        {filtered.length > 0 ? (
          <div className="bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] overflow-hidden shadow-sm">
            <div className="divide-y divide-[#E8EEE6]">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8F6EF]/60 transition-colors"
                >
                  {/* Left Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={item.status} size="sm" className="capitalize font-bold">
                          {item.status}
                        </Badge>
                        <Badge variant="forest" size="sm" className="uppercase font-semibold text-[10px]">
                          {item.type}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-base text-[#174D38] font-display">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#202720]/70">
                        Volume: <span className="font-semibold text-[#174D38]">{item.quantity} {item.unit}</span> (~{item.estimatedServings} servings)
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-[#202720]/60 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#174D38]" /> {item.expiryTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#174D38]" /> {item.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link
                      to={`/donations/${item.id}`}
                      className="p-2 text-[#174D38] hover:bg-[#E8EEE6] rounded-xl transition-colors"
                      title="View Public Page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {item.status === 'reserved' && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateDonation(item.id, { status: 'completed' })}
                        className="px-3.5 py-2 bg-emerald-100 text-emerald-900 hover:bg-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Mark Picked Up</span>
                      </motion.button>
                    )}

                    {item.status === 'available' && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateDonation(item.id, { status: 'cancelled' })}
                        className="px-3.5 py-2 bg-stone-100 text-stone-700 hover:bg-stone-200 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Cancel Listing
                      </motion.button>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteDonation(item.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Delete permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#FDFAF5] p-12 rounded-3xl border border-[#E8EEE6] text-center space-y-3">
            <Package className="w-10 h-10 text-[#174D38]/50 mx-auto" />
            <h3 className="font-bold text-base text-[#174D38]">No listings found</h3>
            <p className="text-xs text-[#202720]/60">There are no donations matching the selected filter.</p>
          </div>
        )}

      </div>
    </PageTransition>
  );
};
