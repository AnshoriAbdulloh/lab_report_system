/**
 * Dashboard.tsx
 * Shared dashboard component used by both User and Teknisi roles.
 * Manages reports, filters, search, and the create-report modal.
 * The role is automatically determined from the AuthContext.
 */

import type React from "react";
import { useState, useMemo, useEffect } from "react";
import { UserCircle, Wrench } from "lucide-react";

// Firebase Configuration
import { db } from "../../firebase";
import { collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

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
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Subscribe to Cloud Firestore reports collection
  useEffect(() => {
    const reportsRef = collection(db, "reports");
    const unsubscribe = onSnapshot(reportsRef, (snapshot) => {
      if (!snapshot.empty) {
        const reportsList: Report[] = [];
        snapshot.forEach((doc) => {
          reportsList.push({
            ...doc.data(),
            id: doc.id,
          } as Report);
        });
        
        // Sort reports by ID descending (newest report IDs first, e.g. RPT-104, RPT-103)
        reportsList.sort((a, b) => b.id.localeCompare(a.id));
        setReports(reportsList);
      } else {
        // Seed Firestore database if completely empty
        INITIAL_REPORTS.forEach((report) => {
          setDoc(doc(db, "reports", report.id), report);
        });
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
    // Build the fields to update
    const updateData: Record<string, unknown> = { status: nextStatus };

    if (nextStatus === "Selesai") {
      const now = Date.now();
      const report = reports.find((r) => r.id === id);

      // Formatted resolved timestamp
      updateData.resolvedDate = new Date().toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Calculate gap if we have the creation timestamp
      if (report?.dateTimestamp) {
        const diffMs = now - report.dateTimestamp;
        const totalMins = Math.floor(diffMs / 60000);
        const days = Math.floor(totalMins / 1440);
        const hours = Math.floor((totalMins % 1440) / 60);
        const mins = totalMins % 60;

        const parts: string[] = [];
        if (days > 0) parts.push(`${days} hari`);
        if (hours > 0) parts.push(`${hours} jam`);
        parts.push(`${mins} menit`);
        updateData.resolutionTime = parts.join(" ");
      }
    }

    updateDoc(doc(db, "reports", id), updateData).catch((error) => {
      alert("Gagal memperbarui status: " + error.message);
    });
  };

  const handleCreateReportSubmit = (data: {
    title: string;
    description: string;
    category: string;
    location: string;
    reporterName: string;
  }) => {
    // Use last 3 digits of timestamp + 1 random digit → very low collision chance
    const timestamp = Date.now();
    const suffix = String(timestamp).slice(-3) + String(Math.floor(Math.random() * 10));
    const id = `RPT-${suffix}`;
    const now = Date.now();
    const reportToAdd: Report = {
      ...data,
      id,
      status: "Menunggu",
      reporter: user!.username,
      reporterName: data.reporterName,
      dateTimestamp: now,
      date: new Date(now).toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
    
    setDoc(doc(db, "reports", id), reportToAdd)
      .then(() => {
        setIsModalOpen(false);
      })
      .catch((error) => {
        alert("Gagal menambahkan laporan: " + error.message);
      });
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-zinc-500">
            <div className="w-8 h-8 border-4 border-gray-200 dark:border-zinc-800 border-t-gray-900 dark:border-t-zinc-100 rounded-full animate-spin mb-4" />
            <p className="text-xs font-semibold uppercase tracking-wider">Memuat Laporan...</p>
          </div>
        ) : (
          <ReportList
            reports={filteredReports}
            viewMode={viewMode}
            role={role}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateReportSubmit}
      />
    </>
  );
};
