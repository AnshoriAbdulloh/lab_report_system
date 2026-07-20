import { useState } from "react";
import {
  Server,
  Monitor,
  MonitorCog,
  BookOpen,
  SquareLibrary,
  University,
  School,
  ArrowLeft,
  Printer,
  Mouse,
  Keyboard,
  Projector,
  Router
} from "lucide-react";
import { Navbar } from "../layout/Navbar";
import { ReportModal } from "../ui/ReportModal";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import type { Report } from "../../types";

const HARDWARE_DATA = [
  { id: 1, name: "Laboratorium Komputer", icon: Monitor },
  { id: 2, name: "Laboratorium Teknik", icon: MonitorCog },
  { id: 3, name: "Kelas", icon: BookOpen },
  { id: 4, name: "Perpustakaan", icon: SquareLibrary },
  { id: 5, name: "Sekretariat Lt 1", icon: University },
  { id: 6, name: "Sekretariat Lt 2", icon: University },
  { id: 7, name: "BEM", icon: School },
];

const LOCATION_HARDWARE: Record<number, any[]> = {
  1: [
    { id: 101, name: "PC-01", type: "Komputer", status: "Baik", icon: Monitor },
    { id: 102, name: "PC-02", type: "Komputer", status: "Rusak", icon: Monitor },
    { id: 103, name: "Projector EPSON", type: "Proyektor", status: "Baik", icon: Projector },
    { id: 104, name: "Printer HP", type: "Printer", status: "Perbaikan", icon: Printer },
  ],
  2: [
    { id: 201, name: "Oscilloscope", type: "Alat Ukur", status: "Baik", icon: MonitorCog },
    { id: 202, name: "PC Server", type: "Server", status: "Perbaikan", icon: Server },
  ],
  3: [
    { id: 301, name: "Projector Sony", type: "Proyektor", status: "Baik", icon: Projector },
    { id: 302, name: "Speaker Kelas", type: "Audio", status: "Baik", icon: Server },
  ],
  4: [
    { id: 401, name: "PC Katalog 1", type: "Komputer", status: "Baik", icon: Monitor },
    { id: 402, name: "PC Katalog 2", type: "Komputer", status: "Baik", icon: Monitor },
  ],
  5: [
    { id: 501, name: "Printer Brother", type: "Printer", status: "Rusak", icon: Printer },
    { id: 502, name: "Keyboard Logitech", type: "Aksesoris", status: "Baik", icon: Keyboard },
  ],
  6: [
    { id: 601, name: "Router Mikrotik", type: "Jaringan", status: "Baik", icon: Router },
    { id: 602, name: "Mouse Wireless", type: "Aksesoris", status: "Baik", icon: Mouse },
  ],
  7: [
    { id: 701, name: "Speaker Aktif", type: "Audio", status: "Baik", icon: Server },
  ]
};

export const HardwareList = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

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

  const selectedLocation = HARDWARE_DATA.find(loc => loc.id === selectedLocationId);
  const hardwareList = selectedLocationId ? (LOCATION_HARDWARE[selectedLocationId] || []) : [];

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className='max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10'>
        {!selectedLocationId ? (
          <>
            <div className='mb-6 sm:mb-10'>
              <div className='flex items-center gap-3 mb-2'>
                <Server className='text-gray-400 dark:text-zinc-500' size={24} />
                <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight'>
                  Daftar Fasilitas Hardware
                </h1>
              </div>
              <p className='text-xs sm:text-sm text-gray-500 dark:text-zinc-400'>
                Pilih lokasi untuk melihat daftar inventaris perangkat keras laboratorium kampus.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {HARDWARE_DATA.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedLocationId(item.id)}
                  className='bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col gap-4 cursor-pointer hover:-translate-y-1.5 transition-all duration-300 ease-in-out'
                >
                  <div className='flex justify-between items-start'>
                    <div className='p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl'>
                      <item.icon
                        size={24}
                        className='text-gray-700 dark:text-zinc-300'
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 dark:text-zinc-100'>
                      {item.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className='mb-6 sm:mb-10'>
              <button 
                onClick={() => setSelectedLocationId(null)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100 mb-4 transition-colors"
              >
                <ArrowLeft size={16} />
                Kembali ke Daftar Lokasi
              </button>
              <div className='flex items-center gap-3 mb-2'>
                {selectedLocation && <selectedLocation.icon className='text-gray-400 dark:text-zinc-500' size={24} />}
                <h1 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight'>
                  Fasilitas di {selectedLocation?.name}
                </h1>
              </div>
              <p className='text-xs sm:text-sm text-gray-500 dark:text-zinc-400'>
                Daftar perangkat keras yang tersedia di lokasi ini beserta statusnya.
              </p>
            </div>

            {hardwareList.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {hardwareList.map((item) => (
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
            ) : (
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 text-center">
                <p className="text-gray-500 dark:text-zinc-400">Belum ada data hardware untuk lokasi ini.</p>
              </div>
            )}
          </>
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
