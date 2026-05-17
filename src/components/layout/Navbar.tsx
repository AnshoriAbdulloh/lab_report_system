/**
 * Navbar.tsx
 * Top navigation bar with role switcher and "Buat Laporan" button.
 * Responsive: role switcher shows inline on sm+, as a row below on mobile.
 */

import React from "react";
import { ClipboardList, Plus } from "lucide-react";
import type { Role } from "../../types";

interface NavbarProps {
  role: Role;
  setRole: (role: Role) => void;
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  role,
  setRole,
  onOpenModal,
}) => {
  return (
    <nav className='sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100'>
      {/* Main bar */}
      <div className='max-w-6xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center'>
            <ClipboardList className='text-white' size={18} />
          </div>
          <span className='font-bold text-lg tracking-tight'>LabCare</span>
        </div>

        <div className='flex items-center gap-3 sm:gap-6'>
          {/* Role switcher — hidden on mobile, shown in the row below */}
          <div className='hidden sm:flex bg-gray-100 p-1 rounded-full'>
            {(["User", "Teknisi"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  role === r
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={onOpenModal}
            className='bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 hover:bg-black transition-all'
          >
            <Plus size={16} />
            <span className='hidden sm:inline'>Buat Laporan</span>
            <span className='sm:hidden'>Laporan</span>
          </button>
        </div>
      </div>

      {/* Mobile role switcher row */}
      <div className='sm:hidden flex justify-center pb-2 px-4'>
        <div className='flex bg-gray-100 p-1 rounded-full w-full max-w-xs'>
          {(["User", "Teknisi"] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                role === r
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
