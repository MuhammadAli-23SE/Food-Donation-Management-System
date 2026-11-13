import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Inbox, Clock, ArrowRight, Truck } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { PageTransition } from '../../components/common/PageTransition';

export const MyRequestsPage = () => {
  const { requests, currentUser, updateRequestStatus } = useApp();

  const myRequests = requests.filter(
    (r) => r.organizationId === currentUser?.id || r.organizationName.includes('Hope Community')
  );

  return (
    <PageTransition>
      <div className="space-y-6 text-left">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
              My Food Requests
            </h1>
            <p className="text-xs text-[#202720]/70 mt-1">
              Status of surplus food requested by your welfare kitchen or pantry.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/org/browse"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#174D38] text-[#F8F6EF] rounded-2xl text-xs font-bold shadow-md hover:bg-[#0f3426] transition-all self-start sm:self-auto"
            >
              <span>Request More Food</span>
              <ArrowRight className="w-4 h-4 text-[#C7E78B]" />
            </Link>
          </motion.div>
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
                  {/* Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={req.donationImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                      alt={req.donationTitle}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-[#174D38] font-display">
                          {req.donationTitle}
                        </h3>
                        <Badge variant={req.status} size="sm" className="capitalize font-bold">
                          {req.status}
                        </Badge>
                      </div>

                      <p className="text-xs text-[#202720]/80">
                        Donor: <strong className="text-[#174D38]">{req.donorName}</strong> • Requested: <span className="font-semibold">{req.requestedQuantity}</span>
                      </p>

                      <p className="text-xs text-[#202720]/60 italic">
                        "{req.notes}"
                      </p>

                      <div className="flex items-center gap-2 text-[11px] text-[#202720]/50 pt-1">
                        <Clock className="w-3 h-3" />
                        <span>Requested: {new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                    {req.status === 'approved' && (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          to="/org/tracking"
                          className="px-4 py-2 bg-[#174D38] hover:bg-[#0f3426] text-[#F8F6EF] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          <Truck className="w-4 h-4 text-[#C7E78B]" />
                          <span>Track Pickup & Delivery</span>
                        </Link>
                      </motion.div>
                    )}

                    {req.status === 'pending' && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateRequestStatus(req.id, 'cancelled')}
                        className="px-3.5 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
                      >
                        Cancel Request
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#FDFAF5] p-12 rounded-3xl border border-[#E8EEE6] text-center space-y-3">
            <Inbox className="w-10 h-10 text-[#174D38]/50 mx-auto" />
            <h3 className="font-bold text-base text-[#174D38]">No active requests</h3>
            <p className="text-xs text-[#202720]/60">You have not submitted requests for surplus food yet.</p>
          </div>
        )}

      </div>
    </PageTransition>
  );
};
