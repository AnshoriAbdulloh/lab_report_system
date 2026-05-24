/**
 * ReportList.tsx
 * Renders the report collection in either list or grid layout.
 * Shows an empty state when no reports match the current filters.
 */

import type React from "react";
import { Search } from "lucide-react";
import type { Report, ViewMode, Role, ReportStatus } from "../../types";
import { ReportCard } from "../ui/ReportCard";

interface ReportListProps {
  reports: Report[];
  viewMode: ViewMode;
  role: Role;
  onUpdateStatus: (id: string, nextStatus: ReportStatus) => void;
}

export const ReportList: React.FC<ReportListProps> = ({
  reports,
  viewMode,
  role,
  onUpdateStatus,
}) => {
  if (reports.length === 0) {
    return (
      <div className='py-24 text-center border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-[2.5rem] bg-gray-50/50 dark:bg-zinc-900/20 transition-all'>
        <div className='w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors'>
          <Search size={24} className='text-gray-300 dark:text-zinc-600' />
        </div>
        <p className='text-sm text-gray-400 dark:text-zinc-500 font-medium'>
          Tidak ada laporan yang sesuai kriteria.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }
    >
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          viewMode={viewMode}
          role={role}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};
