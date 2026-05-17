/**
 * FilterTabs.tsx
 * Horizontal tab bar to filter reports by status (Semua, Menunggu, etc.).
 * Responsive: scrollable on mobile with hidden scrollbar.
 */

import React from "react";
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
  const tabs = ["Semua", "Menunggu", "Disetujui", "Progres", "Selesai"];

  const getCount = (status: string) => {
    if (status === "Semua") return reports.length;
    return reports.filter((r) => r.status === status).length;
  };

  return (
    <div
      className='flex bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-gray-100 overflow-x-auto w-full md:w-fit shadow-sm'
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`
        .filter-tabs-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 sm:px-5 py-1.5 sm:py-2 whitespace-nowrap rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 sm:gap-2 ${
            activeTab === tab
              ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span>{tab}</span>
          <span
            className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === tab
                ? "bg-white/20 text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {getCount(tab)}
          </span>
        </button>
      ))}
    </div>
  );
};
