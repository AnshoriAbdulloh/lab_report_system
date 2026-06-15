/**
 * FilterTabs.tsx
 * Horizontal tab bar to filter reports by status (Semua, Menunggu, etc.).
 * Responsive: scrollable on mobile with hidden scrollbar.
 */

import type React from "react";
import type { Report } from "../../types";

interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  reports: Report[];
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeTab,
  setActiveTab,
  reports,
}) => {
  const tabs = ["Menunggu", "Disetujui", "Progres", "Selesai", "Semua"];

  // count data that get filter
  const getCount = (status: string) => {
    if (status === "Semua") return reports.length;
    return reports.filter((r) => r.status === status).length;
  };

  return (
    <div
      className='flex bg-white dark:bg-zinc-900 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-x-auto w-full md:w-fit shadow-sm transition-colors duration-300'
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`
        .filter-tabs-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* make a butten filter by looping */}
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 sm:px-5 py-1.5 sm:py-2 whitespace-nowrap rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
            activeTab === tab
              ? "bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg shadow-gray-200 dark:shadow-zinc-950/20"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
          }`}
        >
          <span>{tab}</span>
          <span
            className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === tab
                ? "bg-white/20 dark:bg-zinc-950/20 text-white dark:text-zinc-900"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400"
            }`}
          >
            {getCount(tab)}
          </span>
        </button>
      ))}
    </div>
  );
};
