import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Inbox, CheckCircle2, Clock, XCircle, Search, Building2, Utensils } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const RequestLogsAdminPage = () => {
  const { requests } = useApp();
  const [filter, setFilter] = useState('all');

  const filtered = requests.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  return (
    <div className="space-y-6 text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
          Food Redistribution Request Audit Logs
        </h1>
        <p className="text-xs text-[#202720]/70 mt-1">
          Complete ledger of food booking requests between verified welfare organizations and donor kitchens.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 pb-2 border-b border-[#E8EEE6]">
        {['all', 'pending', 'approved', 'rejected', 'cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              filter === s
                ? 'bg-[#174D38] text-[#F8F6EF]'
                : 'bg-[#FDFAF5] text-[#202720]/70 hover:bg-[#E8EEE6] border border-[#E8EEE6]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] overflow-hidden shadow-sm divide-y divide-[#E8EEE6]">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-[#F8F6EF]/50 transition-colors"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-[#202720]/50">
                  #{req.id.toUpperCase()}
                </span>
                <h3 className="font-bold text-base text-[#174D38] font-display">
                  {req.donationTitle}
                </h3>
                <Badge variant={req.status} size="sm" className="capitalize font-bold">
                  {req.status}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#202720]/80">
                <span className="flex items-center gap-1 font-semibold text-[#174D38]">
                  <Building2 className="w-3.5 h-3.5 text-[#174D38]" /> {req.organizationName}
                </span>
                <span>$\rightarrow$</span>
                <span className="flex items-center gap-1 font-semibold text-[#174D38]">
                  <Utensils className="w-3.5 h-3.5 text-[#174D38]" /> {req.donorName}
                </span>
                <span className="bg-[#E8EEE6] px-2 py-0.5 rounded-md font-semibold text-[#174D38]">
                  {req.requestedQuantity}
                </span>
              </div>

              <p className="text-xs text-[#202720]/65 italic">
                "{req.notes}"
              </p>

              <div className="flex items-center gap-2 text-[11px] text-[#202720]/40 pt-1">
                <Clock className="w-3 h-3" />
                <span>Timestamp: {new Date(req.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end lg:self-center">
              <span className="text-xs font-bold text-[#174D38] bg-[#E8EEE6] px-3.5 py-1.5 rounded-xl capitalize">
                Status: {req.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
