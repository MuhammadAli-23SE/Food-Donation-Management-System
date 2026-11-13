import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Search,
  Inbox,
  Clock,
  ShieldCheck,
  TrendingUp,
  Truck,
  AlertTriangle,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { MOCK_DONATIONS, MOCK_REQUESTS } from '../../data/mockData';

export default function OrganizationDashboard() {
  const [requests] = useState(MOCK_REQUESTS);
  const urgentListings = MOCK_DONATIONS.filter((d) => d.status === 'available').slice(0, 2);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Welfare Organization Portal"
        subtitle="Discover nearby surplus food donations, coordinate volunteer pickups, and submit distribution proof."
        actions={
          <Link to="/donations">
            <Button variant="primary" icon={Search}>
              Browse Food Catalog
            </Button>
          </Link>
        }
      />

      {/* Verification Notice Banner */}
      <div className="bg-emerald-50 border border-emerald-200/90 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-emerald-950">
              Verified Non-Profit Organization (License: NGO-8821-2023)
            </h3>
            <p className="text-xs text-emerald-800">
              Your credentials are valid. You are authorized to place immediate requests on all food categories.
            </p>
          </div>
        </div>
        <Badge variant="verified" size="md">
          Status: ACTIVE
        </Badge>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Meals Rescued & Served"
          value="6,450"
          change="+24% this month"
          trend="up"
          icon={Building2}
          description="Distributed to registered shelters"
        />
        <StatCard
          title="Active Requests"
          value="3"
          icon={Inbox}
          description="1 pending approval, 2 scheduled"
        />
        <StatCard
          title="Scheduled Pickups"
          value="2"
          change="Today"
          trend="neutral"
          icon={Truck}
          description="Drivers dispatched for collection"
        />
        <StatCard
          title="Distribution Score"
          value="100%"
          change="Audit Passed"
          trend="up"
          icon={TrendingUp}
          description="All proofs verified by admin"
        />
      </div>

      {/* Urgent Surplus Alert (Short Expiry) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Urgent Priority Food (Expiring Soon)
              </h2>
              <p className="text-xs text-slate-500">
                High-volume prepared meals needing collection within 4 hours
              </p>
            </div>
          </div>
          <Link to="/donations">
            <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
              View All Available
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {urgentListings.map((item) => (
            <div
              key={item.id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Expires {item.expiryTime}
                    </span>
                  </div>
                  <h3 className="mt-1 text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="font-bold text-slate-800">
                      Quantity: {item.quantity} {item.unit}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.donorName} ({item.city})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <Link to={`/donations/${item.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <Link to={`/donations/${item.id}`}>
                  <Button variant="primary" size="sm">
                    Request Pickup
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Requests Tracking */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Our Active Requests & Collection Pipeline
            </h2>
            <p className="text-xs text-slate-500">
              Track donor responses and scheduled pickup dispatches
            </p>
          </div>
          <Link to="/org/my-requests">
            <Button variant="outline" size="sm">
              View Request History
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.slice(0, 2).map((req) => (
            <Card key={req.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={req.status} dot>
                    {req.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">
                    {req.requestedAt}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {req.donationTitle}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Beneficiaries: <span className="font-semibold text-slate-700">{req.targetBeneficiaries}</span>
                </p>
                <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                  <span className="font-semibold text-slate-700">Driver Notes:</span> {req.notes}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900">
                  {req.requestedQuantity} {req.unit} Requested
                </span>
                <Link to="/org/my-requests" className="text-emerald-800 font-bold hover:underline">
                  Manage Delivery →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
