/**
 * Navbar.tsx
 * Top navigation bar with logged-in user info, role badge, and logout button.
 * Responsive: user info shows inline on sm+, condensed on mobile.
 */

import type React from "react";
import { ClipboardList, Plus, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      {/* Main bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <ClipboardList className="text-white" size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight">LabCare</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Logged-in user info — desktop */}
          <div className="hidden sm:flex items-center gap-2.5 bg-gray-50 pl-1.5 pr-4 py-1.5 rounded-full border border-gray-100">
            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white uppercase">
              {user?.username.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-gray-900 capitalize leading-tight">
                {user?.username}
              </span>
              <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider leading-tight">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Mobile user avatar */}
          <div className="sm:hidden w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white uppercase">
            {user?.username.charAt(0)}
          </div>

          {/* Create report button */}
          <button
            onClick={onOpenModal}
            className="bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 hover:bg-black transition-all"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Buat Laporan</span>
            <span className="sm:hidden">Laporan</span>
          </button>

          {/* Logout button */}
          <button
            onClick={logout}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all"
            title="Keluar"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};
