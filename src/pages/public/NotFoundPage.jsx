import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-[#E8EEE6] flex items-center justify-center text-[#174D38]">
        <Sprout className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold font-display text-[#174D38]">404 - Page Not Found</h1>
      <p className="text-sm text-[#202720]/70 max-w-md">
        The destination you are looking for does not exist or may have been relocated.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#174D38] text-[#F8F6EF] rounded-2xl text-xs font-bold hover:bg-[#0f3426] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};
