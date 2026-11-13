import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Inbox,
  Clock,
  Heart,
  CheckCircle2,
  ArrowRight,
  Truck
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { StatusStepper } from '../../components/tracking/StatusStepper';
import { PageTransition } from '../../components/common/PageTransition';
import { AnimatedCounter } from '../../components/common/AnimatedCounter';

export const OrgDashboard = () => {
  const { currentUser, requests, trackingList } = useApp();

  const myRequests = requests.filter(
    (r) => r.organizationId === currentUser?.id || r.organizationName.includes('Hope Community')
  );

  const pendingCount = myRequests.filter((r) => r.status === 'pending').length;
  const approvedCount = myRequests.filter((r) => r.status === 'approved').length;
  const activeDeliveries = trackingList.filter((t) => t.status !== 'distributed');

  return (
    <PageTransition>
      <div className="space-y-8 text-left">
        
        {/* Welcome Banner */}
        <div className="bg-[#174D38] text-[#F8F6EF] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#216248] text-[#C7E78B] text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accredited Welfare Partner #501(c)(3)</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
                Welcome, {currentUser?.organizationName || currentUser?.name}!
              </h1>
              <p className="text-xs sm:text-sm text-[#E8EEE6]/80 max-w-xl">
                Your organization has delivered over <strong className="text-[#C7E78B]">3,850 hot meals</strong> to unhoused families and youth in King County this quarter.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/org/browse"
                  className="flex items-center gap-2 px-5 py-3 bg-[#C7E78B] text-[#174D38] hover:bg-[#b1d86d] rounded-2xl text-xs font-bold shadow-md transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Browse Available Surplus</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Metric Cards with micro-interaction hover */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
              <span>Pending Requests</span>
              <Inbox className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-display text-amber-800">
              <AnimatedCounter value={pendingCount} />
            </p>
            <p className="text-[11px] text-[#202720]/60 font-medium mt-1">Awaiting confirmation</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
              <span>Active Deliveries</span>
              <Truck className="w-4 h-4 text-[#174D38]" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
              <AnimatedCounter value={activeDeliveries.length} />
            </p>
            <p className="text-[11px] text-[#202720]/60 font-medium mt-1">Pickups in transit</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
              <span>Approved Lots</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
              <AnimatedCounter value={approvedCount} />
            </p>
            <p className="text-[11px] text-emerald-800 font-medium mt-1">Ready for pickup</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="bg-[#FDFAF5] p-5 rounded-3xl border border-[#E8EEE6] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between text-xs text-[#202720]/60 font-semibold mb-2">
              <span>People Nourished</span>
              <Heart className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-display text-[#174D38]">
              <AnimatedCounter value={3850} suffix="+" />
            </p>
            <p className="text-[11px] text-[#202720]/60 font-medium mt-1">Total beneficiaries</p>
          </motion.div>
        </div>

        {/* Live Delivery / Tracking Spotlight */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-display text-[#174D38]">
                Active Food Collection & Delivery Status
              </h3>
              <p className="text-xs text-[#202720]/70">
                Real-time progression from donor reservation to community distribution
              </p>
            </div>
            <Link
              to="/org/tracking"
              className="text-xs font-bold text-[#174D38] hover:text-[#0f3426] flex items-center gap-1 group"
            >
              <span>Full Tracking Workspace</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {activeDeliveries.length > 0 ? (
            <div className="space-y-4">
              {activeDeliveries.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FDFAF5] p-6 rounded-3xl border border-[#E8EEE6] shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8EEE6] pb-3">
                    <div>
                      <h4 className="font-bold text-base text-[#174D38] font-display">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#202720]/70">
                        Donor: <span className="font-semibold text-[#174D38]">{item.donorName}</span> • Pickup: {item.pickupAddress}
                      </p>
                    </div>
                    <Badge variant="forest" size="sm" className="self-start sm:self-auto capitalize">
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  {/* Progress Stepper */}
                  <StatusStepper currentStatus={item.status} />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-[#202720]/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#174D38]" />
                      <span>Scheduled Window: <strong className="text-[#174D38]">{item.scheduledTime}</strong></span>
                    </div>
                    <motion.div whileTap={{ scale: 0.96 }}>
                      <Link
                        to="/org/tracking"
                        className="px-4 py-2 bg-[#174D38] text-[#F8F6EF] rounded-xl text-xs font-bold hover:bg-[#0f3426] transition-colors inline-block"
                      >
                        Update Delivery Step
                      </Link>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#FDFAF5] p-8 rounded-3xl border border-[#E8EEE6] text-center space-y-3">
              <Truck className="w-10 h-10 text-[#174D38]/50 mx-auto" />
              <h4 className="font-bold text-sm text-[#174D38]">No pickups currently in transit</h4>
              <p className="text-xs text-[#202720]/60 max-w-sm mx-auto">
                Browse current listings to reserve surplus food for your community shelter.
              </p>
              <Link
                to="/org/browse"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#174D38] text-[#F8F6EF] rounded-xl text-xs font-bold shadow-sm"
              >
                <Search className="w-4 h-4 text-[#C7E78B]" />
                <span>Browse Catalog</span>
              </Link>
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
};
