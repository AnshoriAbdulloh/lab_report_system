/**
 * ReportModal.tsx
 * Modal dialog for creating a new facility report.
 * Responsive: full-screen on mobile, centered card on desktop.
 */

import React, { useState } from "react";
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, category, location });
    setTitle("");
    setDescription("");
    setCategory("Hardware");
    setLocation(LOCATIONS[0]);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-gray-900/40 backdrop-blur-sm'>
      <div className='bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] sm:max-h-[85vh] flex flex-col'>
        {/* Header */}
        <div className='p-5 sm:p-8 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA] shrink-0'>
          <div>
            <h3 className='font-bold text-lg sm:text-xl text-gray-900'>
              Buat Laporan Baru
            </h3>
            <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
              Informasi Keluhan Fasilitas
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-2.5 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 rounded-full transition-all text-gray-400'
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable form body */}
        <form onSubmit={handleSubmit} className='p-5 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            <div>
              <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2'>
                Lokasi Spesifik
              </label>
              <div className='relative'>
                <select
                  required
                  className='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm appearance-none focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all cursor-pointer'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
              <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2'>
                Kategori
              </label>
              <select
                required
                className='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm appearance-none focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all cursor-pointer'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Hardware</option>
                <option>Software</option>
                <option>Jaringan</option>
                <option>Fasilitas</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2'>
              Judul Keluhan
            </label>
            <input
              required
              type='text'
              placeholder='Contoh: Proyektor tidak menyala'
              className='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2'>
              Deskripsi Masalah
            </label>
            <textarea
              required
              rows={3}
              className='w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all resize-none'
              placeholder='Ceritakan kendala yang Anda alami...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type='submit'
            className='w-full bg-gray-900 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all active:scale-[0.98] shadow-xl shadow-gray-200'
          >
            Kirim Laporan
          </button>
        </form>
      </div>
    </div>
  );
};
