/**
 * App.tsx
 * Root application component for the Lab Report System (LabCare).
 * Manages global state (role, reports, filters) and composes the layout
 * from reusable components.
 */

import React, { useState, useMemo } from "react";
import { UserCircle, Wrench } from "lucide-react";

// Types & Constants
import type { Role, ViewMode, Report, ReportStatus } from "./types";
import { INITIAL_REPORTS } from "./constants";

// Layout Components
import { Navbar } from "./components/layout/Navbar";

// Section Components
import { FilterTabs } from "./components/sections/FilterTabs";
import { SearchControls } from "./components/sections/SearchControls";
import { ReportList } from "./components/sections/ReportList";

// UI Components
import { ReportModal } from "./components/ui/ReportModal";

const App: React.FC = () => {
  const [role, setRole] = useState<Role>("User");
  const [viewMode, setViewMode] = useState<ViewMode>("list"); // Default: list
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
      reporter: "Mahasiswa",
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
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-['Poppins']">
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        rel='stylesheet'
      />

      <Navbar
        role={role}
        setRole={setRole}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <main className='max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10'>
        {/* Dynamic Heading based on Role */}
        <div className='mb-6 sm:mb-10'>
          <div className='flex items-center gap-3 mb-2'>
            {role === "Teknisi" ? (
              <Wrench className='text-gray-400' size={24} />
            ) : (
              <UserCircle className='text-gray-400' size={24} />
            )}
            <h1 className='text-xl sm:text-2xl font-bold text-gray-900 tracking-tight'>
              {role === "Teknisi"
                ? "Manajemen Antrean Tugas"
                : "Layanan Fasilitas Lab"}
            </h1>
          </div>
          <p className='text-xs sm:text-sm text-gray-500'>
            {role === "Teknisi"
              ? "Kelola laporan kerusakan dan pantau progres perbaikan unit laboratorium."
              : "Pantau status perbaikan dan kirim keluhan fasilitas kampus secara real-time."}
          </p>
        </div>

        {/* Filters and Controls container */}
        <div className='space-y-4 sm:space-y-6 mb-6 sm:mb-8'>
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

      {/* Utility Styles */}
      <style>{`
        body { 
          -webkit-font-smoothing: antialiased; 
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: -0.01em;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;
