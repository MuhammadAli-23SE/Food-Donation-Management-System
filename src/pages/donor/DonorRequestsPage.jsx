import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Inbox, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { PageTransition } from '../../components/common/PageTransition';

export const DonorRequestsPage = () => {
  const { requests, updateRequestStatus, currentUser } = useApp();

  const myRequests = requests.filter(
    (r) => r.donorId === currentUser?.id || r.donorName.includes('Golden Crust')
  );

  return (
    <PageTransition>
      <div className="space-y-6 text-left">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
            Food Booking Requests
          </h1>
          <p className="text-xs text-[#202720]/70 mt-1">
            Review requests submitted by registered welfare organizations for your surplus food items.
          </p>
        </div>

        {myRequests.length > 0 ? (
          <div className="bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] overflow-hidden shadow-sm">
            <div className="divide-y divide-[#E8EEE6]">
              {myRequests.map((req) => (
                <motion.div
                  key={req.id}
                  layout
                  className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-[#F8F6EF]/50 transition-colors"
                >
                  {/* Organization & Food Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={req.orgAvatar}
                      alt={req.organizationName}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-[#C7E78B] shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-[#174D38] font-display">
                          {req.organizationName}
                        </h3>
                        <Badge variant={req.status} size="sm" className="capitalize font-bold">
                          {req.status}
                        </Badge>
                      </div>

                      <p className="text-xs text-[#202720]/80">
                        Requested: <strong className="text-[#174D38]">{req.requestedQuantity}</strong> of <span className="font-semibold">"{req.donationTitle}"</span>
                      </p>

                      <div className="p-3 bg-[#F8F6EF] rounded-xl border border-[#E8EEE6] text-xs text-[#202720]/80 mt-2">
                        <span className="font-semibold text-[#174D38]">Logistics Note: </span>
                        "{req.notes}"
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#202720]/50 pt-1">
                        <Clock className="w-3 h-3" />
                        <span>Submitted: {new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                    {req.status === 'pending' ? (
                      <>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateRequestStatus(req.id, 'rejected')}
                          className="px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Decline</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateRequestStatus(req.id, 'approved')}
                          className="px-5 py-2.5 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#C7E78B]" />
                          <span>Approve & Reserve</span>
                        </motion.button>
                      </>
                    ) : (
                      <div className="text-xs font-bold text-[#174D38] flex items-center gap-1.5 bg-[#E8EEE6] px-3.5 py-1.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                        <span className="capitalize">{req.status}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#FDFAF5] p-12 rounded-3xl border border-[#E8EEE6] text-center space-y-3">
            <Inbox className="w-10 h-10 text-[#174D38]/50 mx-auto" />
            <h3 className="font-bold text-base text-[#174D38]">No requests received yet</h3>
            <p className="text-xs text-[#202720]/60">When accredited charities request your listings, they will appear here.</p>
          </div>
        )}

      </div>
    </PageTransition>
  );
};
