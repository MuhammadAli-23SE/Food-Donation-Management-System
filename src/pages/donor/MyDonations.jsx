import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Clock,
  Eye,
  CheckCircle2,
  Trash2,
  Search,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { MOCK_DONATIONS } from '../../data/mockData';

export default function MyDonations() {
  const [donations, setDonations] = useState(MOCK_DONATIONS);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonations = donations.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCancel = (id) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'cancelled' } : d))
    );
  };

  const handleMarkCompleted = (id) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'completed' } : d))
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Food Donations"
        subtitle="Track, update, or close active listings and view historical donation records."
        actions={
          <Link to="/donor/create">
            <Button variant="primary" icon={PlusCircle}>
              Post New Donation
            </Button>
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'available', label: 'Available' },
            { id: 'requested', label: 'Requested' },
            { id: 'reserved', label: 'Reserved' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Food Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Expiry Window</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No donations found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                          <p className="text-[11px] text-slate-400">{item.pickupAddress}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {item.expiryTime}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={item.status} dot>
                        {item.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/donations/${item.id}`}>
                          <Button variant="ghost" size="sm" title="View Public Listing">
                            <Eye className="w-4 h-4 text-slate-500" />
                          </Button>
                        </Link>
                        {item.status === 'available' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Cancel Listing"
                            onClick={() => handleCancel(item.id)}
                          >
                            <Trash2 className="w-4 h-4 text-rose-500" />
                          </Button>
                        )}
                        {item.status === 'reserved' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            title="Confirm Handover Complete"
                            onClick={() => handleMarkCompleted(item.id)}
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
