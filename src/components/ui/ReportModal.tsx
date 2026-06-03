/**
 * ReportModal.tsx
 * Modal dialog for creating a new facility report.
 * Responsive: full-screen on mobile, centered card on desktop.
 */

import type React from "react";
import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { LOCATIONS } from "../../constants";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: {
    title: string;
    description: string;
    category: string;
    location: string;
    reporterName: string;
  }) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hardware");
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [reporterName, setReporterName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, category, location, reporterName });
    setTitle("");
    setDescription("");
    setReporterName("");
    setCategory("Hardware");
    setLocation(LOCATIONS[0]);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-gray-950/60 backdrop-blur-sm transition-colors duration-300'>
      <div className='bg-white dark:bg-zinc-900 w-full sm:max-w-lg rounded-t-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 max-h-[90vh] sm:max-h-[85vh] flex flex-col transition-colors duration-300'>
        {/* Header */}
        <div className='p-5 sm:p-8 border-b border-gray-50 dark:border-zinc-800 flex justify-between items-center bg-[#FAFAFA] dark:bg-zinc-900/50 shrink-0'>
          <div>
            <h3 className='font-bold text-lg sm:text-xl text-gray-900 dark:text-zinc-100'>
              Buat Laporan Baru
            </h3>
            <p className='text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1'>
              Informasi Keluhan Fasilitas
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-2.5 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-zinc-700 rounded-full transition-all text-gray-400 dark:text-zinc-500 cursor-pointer'
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable form body */}
        <form onSubmit={handleSubmit} className='p-5 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            <div>
              <label className='block text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2'>
                Lokasi Spesifik
              </label>
              <div className='relative'>
                <select
                  required
                  className='w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent dark:border-zinc-800 rounded-2xl text-sm dark:text-zinc-100 appearance-none focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-400 focus:border-gray-900 dark:focus:border-zinc-700 outline-none transition-all cursor-pointer'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="dark:bg-zinc-800 dark:text-zinc-100">
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  size={14}
                  className='absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 dark:text-zinc-500 pointer-events-none'
                />
              </div>
            </div>
            <div>
              <label className='block text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2'>
                Kategori
              </label>
              <select
                required
                className='w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent dark:border-zinc-800 rounded-2xl text-sm dark:text-zinc-100 appearance-none focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-400 focus:border-gray-900 dark:focus:border-zinc-700 outline-none transition-all cursor-pointer'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option className="dark:bg-zinc-800 dark:text-zinc-100">Hardware</option>
                <option className="dark:bg-zinc-800 dark:text-zinc-100">Software</option>
                <option className="dark:bg-zinc-800 dark:text-zinc-100">Jaringan</option>
                <option className="dark:bg-zinc-800 dark:text-zinc-100">Fasilitas</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2'>
              Judul Keluhan
            </label>
            <input
              required
              type='text'
              placeholder='Contoh: Proyektor tidak menyala'
              className='w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent dark:border-zinc-800 rounded-2xl text-sm dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-400 focus:border-gray-900 dark:focus:border-zinc-700 outline-none transition-all'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2'>
              Nama Pelapor
            </label>
            <input
              required
              type='text'
              placeholder='Masukkan nama lengkap Anda'
              className='w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent dark:border-zinc-800 rounded-2xl text-sm dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-400 focus:border-gray-900 dark:focus:border-zinc-700 outline-none transition-all'
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2'>
              Deskripsi Masalah
            </label>
            <textarea
              required
              rows={3}
              className='w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent dark:border-zinc-800 rounded-2xl text-sm dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-400 focus:border-gray-900 dark:focus:border-zinc-700 outline-none transition-all resize-none'
              placeholder='Ceritakan kendala yang Anda alami...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type='submit'
            className='w-full bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3.5 sm:py-4 rounded-2xl font-bold text-sm hover:bg-black dark:hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-xl shadow-gray-200 dark:shadow-zinc-950/40 cursor-pointer'
          >
            Kirim Laporan
          </button>
        </form>
      </div>
    </div>
  );
};
