/**
 * Dashboard.tsx
 * Shared dashboard component used by both User and Teknisi roles.
 * Manages reports, filters, search, and the create-report modal.
 * The role is automatically determined from the AuthContext.
 */

import type React from "react";
import { useState, useMemo } from "react";
import { UserCircle, Wrench } from "lucide-react";

// Types & Constants
import type { ViewMode, Report, ReportStatus } from "../../types";
import { INITIAL_REPORTS } from "../../constants";

// Context
import { useAuth } from "../../context/AuthContext";

// Section Components
import { FilterTabs } from "../sections/FilterTabs";
import { SearchControls } from "../sections/SearchControls";
import { ReportList } from "../sections/ReportList";

// UI Components
import { ReportModal } from "../ui/ReportModal";

// Layout Components
import { Navbar } from "../layout/Navbar";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const role = user!.role; // Dashboard is only rendered when authenticated

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [activeTab, setActiveTab] = useState<string>("Semua");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesTab = activeTab === "Semua" || r.status === activeTab;
      const matchesSearch =
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [reports, activeTab, searchTerm]);

  const handleUpdateStatus = (id: string, nextStatus: ReportStatus) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status: nextStatus } : report,
      ),
    );
  };

  const handleCreateReportSubmit = (data: {
    title: string;
    description: string;
    category: string;
    location: string;
  }) => {
    const id = `RPT-${Math.floor(100 + Math.random() * 900)}`;
    const reportToAdd: Report = {
      ...data,
      id,
      status: "Menunggu",
      reporter: user!.username,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
    setReports([reportToAdd, ...reports]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Dynamic Heading based on Role */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-3 mb-2">
            {role === "Teknisi" ? (
              <Wrench className="text-gray-400 dark:text-zinc-500" size={24} />
            ) : (
              <UserCircle className="text-gray-400 dark:text-zinc-500" size={24} />
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
              {role === "Teknisi"
                ? "Manajemen Antrean Tugas"
                : "Layanan Fasilitas Lab"}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
            {role === "Teknisi"
              ? "Kelola laporan kerusakan dan pantau progres perbaikan unit laboratorium."
              : "Pantau status perbaikan dan kirim keluhan fasilitas kampus secara real-time."}
          </p>
        </div>

        {/* Filters and Controls container */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          <FilterTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reports={reports}
          />

          <SearchControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>

        {/* Report List view container */}
        <ReportList
          reports={filteredReports}
          viewMode={viewMode}
          role={role}
          onUpdateStatus={handleUpdateStatus}
        />
      </main>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateReportSubmit}
      />
    </>
  );
};
