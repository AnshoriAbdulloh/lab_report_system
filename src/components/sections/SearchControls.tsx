/**
 * SearchControls.tsx
 * Search input and list/grid view toggle controls.
 * Responsive: search takes full width on mobile, toggle sits beside it.
 */

import React from "react";
import { Search, List as ListIcon, LayoutGrid } from "lucide-react";
import type { ViewMode } from "../../types";

interface SearchControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const SearchControls: React.FC<SearchControlsProps> = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className='flex items-center gap-3 sm:gap-4'>
      <div className='relative group flex-1 sm:flex-none sm:w-96'>
        <Search
          className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors'
          size={16}
        />
        <input
          type='text'
          placeholder='Cari ID atau kata kunci...'
          className='pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs w-full focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='flex bg-gray-100 p-1 rounded-xl shrink-0'>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}
          title='List View'
        >
          <ListIcon size={18} />
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}
          title='Grid View'
        >
          <LayoutGrid size={18} />
        </button>
      </div>
    </div>
  );
};
