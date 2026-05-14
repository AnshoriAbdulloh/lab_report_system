import React, { useState, useMemo } from "react";
import {
  ClipboardList,
  Plus,
  Search,
  List,
  LayoutGrid,
  MapPin,
  CheckCircle,
  PlayCircle,
  Clock,
  X,
  ChevronRight,
  UserCircle,
  Wrench,
} from "lucide-react";

type ReportStatus = "Menunggu" | "Disetujui" | "Progres" | "Selesai";
type Role = "User" | "Teknisi";
type ViewMode = "list" | "grid";

interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: ReportStatus;
  reporter: string;
  date: string;
}

const LOCATIONS = [
  "Lab 1",
  "Lab 2",
  "Lab 3",
  "Lab Teknik",
  "Kelas 1",
  "Kelas 2",
  "Kelas 3",
  "Kelas 4",
  "Lab Mini Perpus",
];

const INITIAL_REPORTS: Report[] = [
  {
    id: "RPT-101",
    title: "PC-05 Tidak Bisa Booting",
    description: "Muncul error blue screen saat dinyalakan.",
    location: "Lab Teknik",
    category: "Hardware",
    status: "Menunggu",
    reporter: "Andi",
    date: "26 Oct 2023",
  },
  {
    id: "RPT-102",
    title: "AC Berisik",
    description: "Suara bising dari unit AC di sudut ruangan.",
    location: "Lab 1",
    category: "Fasilitas",
    status: "Disetujui",
    reporter: "Budi",
    date: "25 Oct 2023",
  },
  {
    id: "RPT-103",
    title: "Update MATLAB",
    description: "Mohon update versi MATLAB ke yang terbaru.",
    location: "Lab 2",
    category: "Software",
    status: "Progres",
    reporter: "Dosen Citra",
    date: "24 Oct 2023",
  },
  {
    id: "RPT-104",
    title: "Kabel LAN Putus",
    description: "Kabel LAN di PC-12 terkelupas.",
    location: "Lab 3",
    category: "Jaringan",
    status: "Selesai",
    reporter: "Dedi",
    date: "22 Oct 2023",
  },
];

const App: React.FC = () => {
  const [role, setRole] = useState<Role>("User");
  const [viewMode, setViewMode] = useState<ViewMode>("list"); // Default: list
  const [activeTab, setActiveTab] = useState<string>("Semua");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);

  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    category: "Hardware",
    location: LOCATIONS[0],
  });

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

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `RPT-${Math.floor(100 + Math.random() * 900)}`;
    const reportToAdd: Report = {
      ...newReport,
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
    setNewReport({
      title: "",
      description: "",
      category: "Hardware",
      location: LOCATIONS[0],
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-['Poppins']">
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        rel='stylesheet'
      />

      {}
      <nav className='sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 h-16'>
        <div className='max-w-6xl mx-auto flex items-center justify-between h-full'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center'>
              <ClipboardList className='text-white' size={18} />
            </div>
            <span className='font-bold text-lg tracking-tight'>LabCare</span>
          </div>

          <div className='flex items-center gap-6'>
            <div className='hidden sm:flex bg-gray-100 p-1 rounded-full'>
              {(["User", "Teknisi"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${role === r ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-black transition-all'
            >
              <Plus size={16} />
              Buat Laporan
            </button>
          </div>
        </div>
      </nav>

      <main className='max-w-6xl mx-auto px-6 py-10'>
        {/* Dynamic Heading based on Role */}
        <div className='mb-10'>
          <div className='flex items-center gap-3 mb-2'>
            {role === "Teknisi" ? (
              <Wrench className='text-gray-400' size={24} />
            ) : (
              <UserCircle className='text-gray-400' size={24} />
            )}
            <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>
              {role === "Teknisi"
                ? "Manajemen Antrean Tugas"
                : "Layanan Fasilitas Lab"}
            </h1>
          </div>
          <p className='text-sm text-gray-500'>
            {role === "Teknisi"
              ? "Kelola laporan kerusakan dan pantau progres perbaikan unit laboratorium."
              : "Pantau status perbaikan dan kirim keluhan fasilitas kampus secara real-time."}
          </p>
        </div>

        {}
        <div className='space-y-6 mb-8'>
          {/* 1st Row: Tabs */}
          <div className='flex bg-white p-1.5 rounded-2xl border border-gray-100 overflow-x-auto w-full md:w-fit shadow-sm'>
            {["Semua", "Menunggu", "Disetujui", "Progres", "Selesai"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 whitespace-nowrap rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          {/* 2nd Row: Search and View Controls */}
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='relative group w-full md:w-96'>
              <Search
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors'
                size={16}
              />
              <input
                type='text'
                placeholder='Cari ID laporan atau kata kunci...'
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
                <List size={18} />
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
        </div>

        {}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className={`
                  bg-white border border-gray-100 group transition-all duration-300 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/40
                  ${viewMode === "list" ? "flex flex-col md:flex-row items-center p-5 rounded-[1.5rem]" : "p-6 rounded-[2.5rem] flex flex-col h-full"}
                `}
              >
                {/* Meta Information */}
                <div
                  className={`${viewMode === "list" ? "md:w-36 mb-3 md:mb-0" : "mb-4"} shrink-0`}
                >
                  <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                    {report.id}
                  </div>
                  <div className='flex items-center gap-1.5 mt-1 text-gray-900'>
                    <MapPin className='text-gray-400' size={12} />
                    <span className='text-[11px] font-bold'>
                      {report.location}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`${viewMode === "list" ? "flex-1 md:px-8 border-t md:border-t-0 md:border-l border-gray-50 pt-3 md:pt-0" : "flex-1 mb-6"}`}
                >
                  <h3 className='font-bold text-sm text-gray-900 group-hover:text-black transition-colors'>
                    {report.title}
                  </h3>
                  <p className='text-xs text-gray-500 mt-1 line-clamp-1'>
                    {report.description}
                  </p>
                </div>

                {/* Status Badge */}
                <div
                  className={`${viewMode === "list" ? "md:w-40 flex justify-center py-3 md:py-0" : "mb-4 order-first flex items-center justify-between"}`}
                >
                  <span
                    className={`inline-block text-[10px] font-bold px-3 py-1.5 rounded-full border tracking-wide uppercase
                    ${report.status === "Menunggu" ? "bg-white border-gray-200 text-gray-400" : ""}
                    ${report.status === "Disetujui" ? "bg-gray-50 border-gray-900 text-gray-900" : ""}
                    ${report.status === "Progres" ? "bg-white border-gray-900 text-gray-900" : ""}
                    ${report.status === "Selesai" ? "bg-black border-black text-white" : ""}
                  `}
                  >
                    {report.status}
                  </span>
                  {viewMode === "grid" && (
                    <div className='flex items-center gap-1.5 text-[10px] text-gray-400 font-medium'>
                      <Clock size={10} />
                      {report.date}
                    </div>
                  )}
                </div>

                {/* Actions Section */}
                <div
                  className={`${viewMode === "list" ? "md:w-48 md:border-l border-gray-100 md:pl-6 flex items-center justify-between pt-3 md:pt-0 border-t md:border-t-0" : "mt-auto pt-5 border-t border-gray-50 flex items-center justify-between"}`}
                >
                  <div className='flex items-center gap-2'>
                    <div className='w-7 h-7 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600'>
                      {report.reporter.charAt(0)}
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-[10px] font-bold text-gray-900'>
                        {report.reporter}
                      </span>
                      {viewMode === "list" && (
                        <span className='text-[9px] text-gray-400 font-medium'>
                          {report.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {role === "Teknisi" && (
                    <div className='flex gap-2'>
                      {report.status === "Menunggu" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(report.id, "Disetujui")
                          }
                          className='p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all'
                          title='Terima'
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      {report.status === "Disetujui" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(report.id, "Progres")
                          }
                          className='p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all'
                          title='Mulai'
                        >
                          <PlayCircle size={18} />
                        </button>
                      )}
                      {report.status === "Progres" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(report.id, "Selesai")
                          }
                          className='p-2 bg-gray-900 text-white rounded-xl shadow-md transition-all hover:bg-black'
                          title='Selesai'
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                    </div>
                  )}
                  {role === "User" && viewMode === "list" && (
                    <ChevronRight size={16} className='text-gray-300' />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className='py-24 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/50'>
              <div className='w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100'>
                <Search size={24} className='text-gray-300' />
              </div>
              <p className='text-sm text-gray-400 font-medium'>
                Tidak ada laporan yang sesuai kriteria.
              </p>
            </div>
          )}
        </div>
      </main>

      {}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm'>
          <div className='bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-gray-100'>
            <div className='p-8 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]'>
              <div>
                <h3 className='font-bold text-xl text-gray-900'>
                  Buat Laporan Baru
                </h3>
                <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                  Informasi Keluhan Fasilitas
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className='p-2.5 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 rounded-full transition-all text-gray-400'
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className='p-8 space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5'>
                    Lokasi Spesifik
                  </label>
                  <div className='relative'>
                    <select
                      required
                      className='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm appearance-none focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all cursor-pointer'
                      value={newReport.location}
                      onChange={(e) =>
                        setNewReport({ ...newReport, location: e.target.value })
                      }
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronRight
                      size={14}
                      className='absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5'>
                    Kategori
                  </label>
                  <select
                    required
                    className='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm appearance-none focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all cursor-pointer'
                    value={newReport.category}
                    onChange={(e) =>
                      setNewReport({ ...newReport, category: e.target.value })
                    }
                  >
                    <option>Hardware</option>
                    <option>Software</option>
                    <option>Jaringan</option>
                    <option>Fasilitas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5'>
                  Judul Keluhan
                </label>
                <input
                  required
                  type='text'
                  placeholder='Contoh: Proyektor tidak menyala'
                  className='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all'
                  value={newReport.title}
                  onChange={(e) =>
                    setNewReport({ ...newReport, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5'>
                  Deskripsi Masalah
                </label>
                <textarea
                  required
                  rows={3}
                  className='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all resize-none'
                  placeholder='Ceritakan kendala yang Anda alami...'
                  value={newReport.description}
                  onChange={(e) =>
                    setNewReport({ ...newReport, description: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type='submit'
                className='w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all active:scale-[0.98] shadow-xl shadow-gray-200'
              >
                Kirim Laporan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Helper Styles */}
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
