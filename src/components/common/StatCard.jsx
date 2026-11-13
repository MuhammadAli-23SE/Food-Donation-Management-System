import React from 'react';

/**
 * Reusable StatCard for Dashboards and KPI Displays
 */
export default function StatCard({
  title,
  value,
  change,
  trend = 'neutral', // 'up', 'down', 'neutral'
  icon: Icon,
  description,
  className = '',
}) {
  const trendColor = {
    up: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    down: 'text-rose-700 bg-rose-50 border-rose-200',
    neutral: 'text-slate-600 bg-slate-50 border-slate-200',
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </h3>
        {change && (
          <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${trendColor[trend] || trendColor.neutral}`}>
            {trend === 'up' && '↑ '}
            {trend === 'down' && '↓ '}
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-slate-500 font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
