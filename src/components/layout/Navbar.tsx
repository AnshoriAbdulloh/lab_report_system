/**
 * Navbar.tsx
 * Top navigation bar with logged-in user info, role badge, and logout button.
 * Responsive: user info shows inline on sm+, condensed on mobile.
 */

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  ClipboardList,
  Plus,
  LogOut,
  Sun,
  Moon,
  Menu,
  Monitor,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

interface NavbarProps {
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className='sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-colors duration-300'>
      {/* Main bar */}
      <div className='max-w-6xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-gray-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center'>
            <ClipboardList
              className='text-white dark:text-zinc-900'
              size={18}
            />
          </div>
          <span className='font-bold text-lg tracking-tight text-gray-900 dark:text-zinc-100'>
            LabCare
          </span>
        </div>

        <div className='flex items-center gap-2 sm:gap-4'>
          {/* Logged-in user info — desktop */}
          <div className='hidden sm:flex items-center gap-2.5 bg-gray-50 dark:bg-zinc-800 pl-1.5 pr-4 py-1.5 rounded-full border border-gray-100 dark:border-zinc-700'>
            <div className='w-7 h-7 rounded-full bg-gray-900 dark:bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-white dark:text-zinc-900 uppercase'>
              {user?.username.charAt(0)}
            </div>
            <div className='flex flex-col'>
              <span className='text-[11px] font-bold text-gray-900 dark:text-zinc-100 capitalize leading-tight'>
                {user?.username}
              </span>
              <span className='text-[9px] font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider leading-tight'>
                {user?.role}
              </span>
            </div>
          </div>

          {/* Mobile user avatar */}
          <div className='sm:hidden w-8 h-8 rounded-full bg-gray-900 dark:bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-white dark:text-zinc-900 uppercase'>
            {user?.username.charAt(0)}
          </div>

          {/* Create report button */}
          <button
            onClick={onOpenModal}
            className='bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 hover:bg-black dark:hover:bg-white/95 transition-all'
          >
            <Plus size={16} />
            <span className='hidden md:inline'>Buat Laporan</span>
            <span className='hidden sm:inline md:hidden'>Laporan</span>
            <span className='hidden'></span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className='p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-all'
            title={theme === "light" ? "Mode Gelap" : "Mode Terang"}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Menu Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-all'
              title='Menu'
            >
              <Menu size={18} />
            </button>

            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-lg py-2 z-50'>
                <Link
                  to='/'
                  className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors'
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <ClipboardList size={16} />
                  Dashboard Laporan
                </Link>
                <Link
                  to='/hardware'
                  className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors'
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Monitor size={16} />
                  List Hardware
                </Link>
                <div className='h-px bg-gray-100 dark:bg-zinc-800 my-1'></div>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className='w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left'
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
