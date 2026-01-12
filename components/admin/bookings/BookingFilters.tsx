import React from 'react';
import { BookingStatus } from '../../../types';
import { Search, Calendar } from 'lucide-react';

interface BookingFiltersProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({ 
  currentTab, 
  onTabChange, 
  searchQuery, 
  onSearchChange 
}) => {
  const tabs = ['All', ...Object.values(BookingStatus)];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by customer name or phone..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Date Filter (Mock) */}
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                <Calendar size={16} />
                <span>This Month</span>
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors relative ${
              currentTab === tab 
                ? 'text-indigo-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
            {currentTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};