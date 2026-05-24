/**
 * ReportCard.tsx
 * Renders a single report item in either list or grid layout.
 * Responsive: list view stacks vertically on mobile with clean spacing.
 */

import type React from "react";
import {
  CheckCircle,
  PlayCircle,
  Check,
  ChevronRight,
  MapPin,
  Clock,
} from "lucide-react";
import type { Report, ViewMode, Role, ReportStatus } from "../../types";

interface ReportCardProps {
  report: Report;
  viewMode: ViewMode;
  role: Role;
  onUpdateStatus: (id: string, nextStatus: ReportStatus) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  viewMode,
  role,
  onUpdateStatus,
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 group transition-all duration-300 hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-zinc-950/40
        ${viewMode === "list"
          ? "p-4 sm:p-5 rounded-2xl sm:rounded-[1.5rem]"
          : "p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] flex flex-col h-full"
        }
      `}
    >
      {viewMode === "list" ? (
        /* ---- LIST VIEW ---- */
        <>
          {/* Top row: ID + location | Status badge */}
          <div className='flex items-start justify-between gap-3 mb-2'>
            <div className='flex items-center gap-3 min-w-0'>
              <span className='text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest shrink-0'>
                {report.id}
              </span>
              <div className='flex items-center gap-1 text-gray-900 dark:text-zinc-100 shrink-0'>
                <MapPin className='text-gray-400 dark:text-zinc-500' size={11} />
                <span className='text-[11px] font-bold'>{report.location}</span>
              </div>
            </div>
            <span
              className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border tracking-wide uppercase
              ${report.status === "Menunggu" ? "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-500" : ""}
              ${report.status === "Disetujui" ? "bg-gray-50 dark:bg-zinc-800 border-gray-900 dark:border-zinc-100 text-gray-900 dark:text-zinc-100" : ""}
              ${report.status === "Progres" ? "bg-white dark:bg-zinc-900 border-gray-900 dark:border-zinc-100 text-gray-900 dark:text-zinc-100" : ""}
              ${report.status === "Selesai" ? "bg-black dark:bg-zinc-100 border-black dark:border-zinc-100 text-white dark:text-zinc-900" : ""}
            `}
            >
              {report.status}
            </span>
          </div>

          {/* Title + description */}
          <h3 className='font-bold text-sm text-gray-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors'>
            {report.title}
          </h3>
          <p className='text-xs text-gray-500 dark:text-zinc-400 mt-0.5 line-clamp-1'>
            {report.description}
          </p>

          {/* Bottom row: Reporter | Date | Actions */}
          <div className='flex items-center justify-between mt-3 pt-3 border-t border-gray-50 dark:border-zinc-800'>
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-zinc-300'>
                {report.reporter.charAt(0)}
              </div>
              <div className='flex flex-col'>
                <span className='text-[10px] font-bold text-gray-900 dark:text-zinc-100'>
                  {report.reporter}
                </span>
                <span className='text-[9px] text-gray-400 dark:text-zinc-500 font-medium'>
                  {report.date}
                </span>
              </div>
            </div>

            {role === "Teknisi" && (
              <div className='flex gap-1.5 sm:gap-2'>
                {report.status === "Menunggu" && (
                  <button
                    onClick={() => onUpdateStatus(report.id, "Disetujui")}
                    className='p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-all cursor-pointer'
                    title='Terima'
                  >
                    <Check size={16} />
                  </button>
                )}
                {report.status === "Disetujui" && (
                  <button
                    onClick={() => onUpdateStatus(report.id, "Progres")}
                    className='p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-all cursor-pointer'
                    title='Mulai'
                  >
                    <PlayCircle size={16} />
                  </button>
                )}
                {report.status === "Progres" && (
                  <button
                    onClick={() => onUpdateStatus(report.id, "Selesai")}
                    className='p-1.5 sm:p-2 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl shadow-md transition-all hover:bg-black dark:hover:bg-white/95 cursor-pointer'
                    title='Selesai'
                  >
                    <CheckCircle size={16} />
                  </button>
                )}
              </div>
            )}
            {role === "User" && (
              <ChevronRight size={16} className='text-gray-300 dark:text-zinc-600' />
            )}
          </div>
        </>
      ) : (
        /* ---- GRID VIEW ---- */
        <>
          {/* Status Badge + Date (top) */}
          <div className='mb-3 sm:mb-4 flex items-center justify-between'>
            <span
              className={`inline-block text-[10px] font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border tracking-wide uppercase
              ${report.status === "Menunggu" ? "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-500" : ""}
              ${report.status === "Disetujui" ? "bg-gray-50 dark:bg-zinc-800 border-gray-900 dark:border-zinc-100 text-gray-900 dark:text-zinc-100" : ""}
              ${report.status === "Progres" ? "bg-white dark:bg-zinc-900 border-gray-900 dark:border-zinc-100 text-gray-900 dark:text-zinc-100" : ""}
              ${report.status === "Selesai" ? "bg-black dark:bg-zinc-100 border-black dark:border-zinc-100 text-white dark:text-zinc-900" : ""}
            `}
            >
              {report.status}
            </span>
            <div className='flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-zinc-500 font-medium'>
              <Clock size={10} />
              {report.date}
            </div>
          </div>

          {/* Meta */}
          <div className='mb-3 sm:mb-4 shrink-0'>
            <div className='text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest'>
              {report.id}
            </div>
            <div className='flex items-center gap-1.5 mt-1 text-gray-900 dark:text-zinc-100'>
              <MapPin className='text-gray-400 dark:text-zinc-500' size={12} />
              <span className='text-[11px] font-bold'>{report.location}</span>
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 mb-4 sm:mb-6'>
            <h3 className='font-bold text-sm text-gray-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors'>
              {report.title}
            </h3>
            <p className='text-xs text-gray-500 dark:text-zinc-400 mt-1 line-clamp-1'>
              {report.description}
            </p>
          </div>

          {/* Actions & Author */}
          <div className='mt-auto pt-4 sm:pt-5 border-t border-gray-50 dark:border-zinc-800 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-zinc-300'>
                {report.reporter.charAt(0)}
              </div>
              <span className='text-[10px] font-bold text-gray-900 dark:text-zinc-100'>
                {report.reporter}
              </span>
            </div>

            {role === "Teknisi" && (
              <div className='flex gap-1.5 sm:gap-2'>
                {report.status === "Menunggu" && (
                  <button
                    onClick={() => onUpdateStatus(report.id, "Disetujui")}
                    className='p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-all cursor-pointer'
                    title='Terima'
                  >
                    <Check size={16} />
                  </button>
                )}
                {report.status === "Disetujui" && (
                  <button
                    onClick={() => onUpdateStatus(report.id, "Progres")}
                    className='p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-all cursor-pointer'
                    title='Mulai'
                  >
                    <PlayCircle size={16} />
                  </button>
                )}
                {report.status === "Progres" && (
                  <button
                    onClick={() => onUpdateStatus(report.id, "Selesai")}
                    className='p-1.5 sm:p-2 bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl shadow-md transition-all hover:bg-black dark:hover:bg-white/95 cursor-pointer'
                    title='Selesai'
                  >
                    <CheckCircle size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
