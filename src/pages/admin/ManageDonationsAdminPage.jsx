import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Trash2, Eye, Search } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { PageTransition } from '../../components/common/PageTransition';

export const ManageDonationsAdminPage = () => {
  const { donations, deleteDonation } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = donations.filter((d) => {
    if (filter !== 'all' && d.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.donorName.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <PageTransition>
      <div className="space-y-6 text-left">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            Food Donation Moderation & Oversight
          </h1>
          <p className="text-xs text-[#202720]/70 mt-1">
            Review all surplus listings posted across commercial kitchens, monitor safety compliance, and manage items.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#202720]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, kitchen donor, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#F8F6EF] border border-[#E8EEE6] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#174D38]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'available', 'requested', 'reserved', 'completed'].map((s) => {
              const isActive = filter === s;
              return (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                    isActive ? 'text-[#F8F6EF]' : 'text-[#202720]/70 hover:bg-[#E8EEE6] bg-[#F8F6EF] border border-[#E8EEE6]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="adminDonationsTabPill"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-[#174D38] rounded-xl shadow-sm -z-0"
                    />
                  )}
                  <span className="relative z-10">{s}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Moderation List */}
        <div className="bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] overflow-hidden shadow-sm divide-y divide-[#E8EEE6]">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8F6EF]/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#174D38] font-display">
                      {item.title}
                    </h3>
                    <Badge variant={item.status} size="sm" className="capitalize font-bold">
                      {item.status}
                    </Badge>
                    <Badge variant="forest" size="sm" className="uppercase text-[10px]">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#202720]/75">
                    Donor: <strong className="text-[#174D38]">{item.donorName}</strong> • Volume: {item.quantity} {item.unit} (~{item.estimatedServings} servings)
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-[#202720]/50 pt-1">
                    <span>Location: {item.pickupAddress}</span>
                    <span>•</span>
                    <span>Expiry: {item.expiryTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link
                  to={`/donations/${item.id}`}
                  className="p-2 text-[#174D38] hover:bg-[#E8EEE6] rounded-xl transition-colors"
                  title="View listing page"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteDonation(item.id)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Remove donation listing"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </PageTransition>
  );
};
