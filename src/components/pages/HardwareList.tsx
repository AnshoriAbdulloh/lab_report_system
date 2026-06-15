import { useState } from "react";
import { Server, Monitor, Printer, Mouse, Keyboard } from "lucide-react";
import { Navbar } from "../layout/Navbar";
import { ReportModal } from "../ui/ReportModal";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import type { Report } from "../../types";

const HARDWARE_DATA = [
  {
    id: 1,
    name: "Laboratorium Komputer",
    status: "Baik",
    icon: Monitor,
  },
  {
    id: 2,
    name: "Laboratorium Teknik",
    status: "Baik",
    icon: Monitor,
  },
  {
    id: 3,
    name: "Printer HP LaserJet",
    status: "Rusak",
    icon: Printer,
  },
  {
    id: 4,
    name: "Keyboard Logitech",
    type: "Aksesoris",
    status: "Baik",
    icon: Keyboard,
  },
  {
    id: 5,
    name: "Mouse Wireless",
    type: "Aksesoris",
    status: "Perbaikan",
    icon: Mouse,
  },
];

export const HardwareList = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateReportSubmit = (data: {
    title: string;
    description: string;
    category: string;
    location: string;
    reporterName: string;
  }) => {
    const timestamp = Date.now();
    const suffix =
      String(timestamp).slice(-3) + String(Math.floor(Math.random() * 10));
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
      .then(() => setIsModalOpen(false))
      .catch((error) => alert("Gagal menambahkan laporan: " + error.message));
  };

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className='max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10'>
        <div className='mb-6 sm:mb-10'>
          <div className='flex items-center gap-3 mb-2'>
            <Server className='text-gray-400 dark:text-zinc-500' size={24} />
            <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight'>
              Daftar Fasilitas Hardware
            </h1>
          </div>
          <p className='text-xs sm:text-sm text-gray-500 dark:text-zinc-400'>
            Pantau dan kelola seluruh inventaris perangkat keras laboratorium
            kampus.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {HARDWARE_DATA.map((item) => (
            <div
              key={item.id}
              className='bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col gap-4'
            >
              <div className='flex justify-between items-start'>
                <div className='p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl'>
                  <item.icon
                    size={24}
                    className='text-gray-700 dark:text-zinc-300'
                  />
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.status === "Baik"
                      ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                      : item.status === "Rusak"
                        ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div>
                <h3 className='font-bold text-gray-900 dark:text-zinc-100'>
                  {item.name}
                </h3>
                <p className='text-sm text-gray-500 dark:text-zinc-400'>
                  {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateReportSubmit}
      />
    </>
  );
};
