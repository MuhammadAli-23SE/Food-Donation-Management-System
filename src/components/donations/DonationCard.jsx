import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, Utensils, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

export const DonationCard = ({ donation, onAction, actionLabel, showDonor = true }) => {
  const {
    id,
    title,
    description,
    type,
    quantity,
    unit,
    estimatedServings,
    expiryTime,
    expiryHoursLeft,
    pickupAddress,
    city,
    status,
    imageUrl,
    donorName,
    donorAvatar,
    dietary = []
  } = donation;

  return (
    <div className="group bg-[#FDFAF5] rounded-3xl border border-[#E8EEE6] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C7E78B] transition-all duration-300 flex flex-col text-left">
      {/* Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#E8EEE6]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="forest" size="sm" className="font-semibold uppercase tracking-wider backdrop-blur-sm">
            {type}
          </Badge>
          <Badge
            variant={status}
            size="sm"
            className="capitalize shadow-sm font-bold"
          >
            {status}
          </Badge>
        </div>

        {/* Expiry Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174D38]/90 text-[#F8F6EF] text-xs font-semibold backdrop-blur-md">
          <Clock className="w-3.5 h-3.5 text-[#C7E78B]" />
          <span>{expiryHoursLeft ? `${expiryHoursLeft}h left` : expiryTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Donor info */}
          {showDonor && (
            <div className="flex items-center gap-2 mb-2">
              <img
                src={donorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={donorName}
                className="w-5 h-5 rounded-full object-cover border border-[#C7E78B]"
              />
              <span className="text-xs font-semibold text-[#174D38] truncate">{donorName}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-display font-bold text-lg text-[#174D38] group-hover:text-[#0f3426] line-clamp-1">
            {title}
          </h3>

          <p className="text-xs text-[#202720]/70 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Key Metrics Chips */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#E8EEE6]">
            <div className="flex items-center gap-2 text-xs text-[#202720]/80">
              <Utensils className="w-3.5 h-3.5 text-[#174D38]" />
              <span className="font-semibold text-[#174D38]">{quantity}</span>
              <span className="text-[11px] text-[#202720]/60">{unit}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#202720]/80">
              <Users className="w-3.5 h-3.5 text-[#174D38]" />
              <span>Feeds ~{estimatedServings}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#202720]/60 mt-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#174D38]/70 shrink-0" />
            <span className="truncate">{pickupAddress || city}</span>
          </div>

          {/* Dietary tags */}
          {dietary.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {dietary.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-lg bg-[#E8EEE6] text-[#202720]/75 text-[10px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-5 pt-3 border-t border-[#E8EEE6] flex items-center justify-between gap-2">
          <Link
            to={`/donations/${id}`}
            className="text-xs font-semibold text-[#174D38] hover:text-[#0f3426] flex items-center gap-1 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {onAction ? (
            <button
              onClick={() => onAction(donation)}
              disabled={status !== 'available'}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                status === 'available'
                  ? 'bg-[#174D38] text-[#F8F6EF] hover:bg-[#0f3426]'
                  : 'bg-[#E8EEE6] text-[#202720]/40 cursor-not-allowed'
              }`}
            >
              {actionLabel || 'Request Food'}
            </button>
          ) : (
            <Link
              to={`/donations/${id}`}
              className="px-3.5 py-1.5 bg-[#C7E78B] text-[#174D38] hover:bg-[#b1d86d] rounded-xl text-xs font-bold transition-colors"
            >
              Explore
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
