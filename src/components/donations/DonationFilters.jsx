import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

export default function DonationFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCity,
  onCityChange,
  onReset,
}) {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Cooked Meals', label: 'Cooked Meals' },
    { value: 'Baked Goods', label: 'Baked Goods' },
    { value: 'Raw Ingredients', label: 'Raw Ingredients / Produce' },
    { value: 'Packaged Goods', label: 'Packaged & Dairy' },
  ];

  const cities = [
    { value: 'all', label: 'All Cities / Areas' },
    { value: 'Metro City', label: 'Metro City' },
    { value: 'West Suburb', label: 'West Suburb' },
    { value: 'Harbor District', label: 'Harbor District' },
    { value: 'Tech District', label: 'Tech District' },
  ];

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all' || selectedCity !== 'all';

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
        {/* Search Bar */}
        <div className="md:col-span-5">
          <Input
            placeholder="Search by food name, donor restaurant, or description..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={Search}
          />
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-3">
          <Select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={categories}
          />
        </div>

        {/* City Dropdown */}
        <div className="md:col-span-3">
          <Select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            options={cities}
          />
        </div>

        {/* Reset Filter Button */}
        <div className="md:col-span-1 flex justify-end">
          {hasActiveFilters ? (
            <Button
              variant="ghost"
              size="md"
              onClick={onReset}
              className="w-full text-slate-500 hover:text-slate-800"
              title="Reset Filters"
            >
              <X className="w-4 h-4" />
            </Button>
          ) : (
            <div className="h-10 flex items-center justify-center text-slate-400">
              <Filter className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
