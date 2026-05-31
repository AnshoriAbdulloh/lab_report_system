/**
 * LoginPage.tsx
 * Full-screen login page with role-based authentication.
 * Matches the existing LabCare design system: Poppins font, gray-900 accents,
 * rounded corners, and clean minimal aesthetic.
 */

import type React from "react";
import { useState } from "react";
import {
  ClipboardList,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export const LoginPage = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate a brief loading state for UX polish
    await new Promise((r) => setTimeout(r, 400));

    const errorMsg = login(username, password);
    if (errorMsg) {
      setError(errorMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-zinc-950 flex items-center justify-center p-4 font-['Poppins'] relative overflow-hidden transition-colors duration-300">
      {/* Google Fonts */}
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        rel='stylesheet'
      />

      {/* Floating Theme Toggle */}
      <div className='absolute top-4 right-4 z-50'>
        <button
          type='button'
          onClick={toggleTheme}
          className='p-3 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl text-gray-400 hover:text-gray-900 dark:hover:text-zinc-100 hover:shadow-md dark:shadow-zinc-950/50 transition-all cursor-pointer'
          title={theme === "light" ? "Mode Gelap" : "Mode Terang"}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      {/* Subtle background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gray-100 dark:bg-zinc-900 rounded-full opacity-50 dark:opacity-20 blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-gray-100 dark:bg-zinc-900 rounded-full opacity-40 dark:opacity-20 blur-3xl' />
        <div className='absolute top-1/4 left-1/3 w-64 h-64 bg-gray-50 dark:bg-zinc-900/50 rounded-full opacity-60 dark:opacity-10 blur-3xl' />
      </div>

      {/* Login Card */}
      <div className='w-full max-w-md relative animate-[fadeSlideUp_0.6s_ease-out]'>
        {/* Logo & Branding */}
        <div className='text-center mb-8'>
          <div className='w-14 h-14 bg-gray-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-gray-200 dark:shadow-zinc-950/40'>
            <ClipboardList
              className='text-white dark:text-zinc-900'
              size={28}
            />
          </div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight'>
            LabCare
          </h1>
          <p className='text-xs text-gray-400 dark:text-zinc-500 mt-1 font-medium'>
            Sistem Pelaporan Fasilitas Laboratorium
          </p>
        </div>

        {/* Card */}
        <div className='bg-white dark:bg-zinc-900 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-2xl shadow-gray-100/60 dark:shadow-zinc-950/40 overflow-hidden transition-all'>
          {/* Card Header */}
          <div className='px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-5 border-b border-gray-50 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-900/50'>
            <h2 className='font-bold text-lg text-gray-900 dark:text-zinc-100'>
              Masuk
            </h2>
            <p className='text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1'>
              Masukkan Kredensial Anda
            </p>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleSubmit}
            className='px-6 sm:px-8 py-6 sm:py-8 space-y-5'
          >
            {/* Error Alert */}
            {error && (
              <div className='flex items-center gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-2xl animate-[fadeIn_0.3s_ease-out]'>
                <AlertCircle size={16} className='text-red-400 shrink-0' />
                <span className='text-xs font-semibold text-red-500 dark:text-red-400'>
                  {error}
                </span>
              </div>
            )}

            {/* Username */}
            <div>
              <label className='block text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2'>
                Username
              </label>
              <input
                id='login-username'
                required
                type='text'
                placeholder='Masukkan username'
                autoComplete='username'
                className='w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-transparent dark:border-zinc-800 rounded-2xl text-sm dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-400 focus:border-gray-900 dark:focus:border-zinc-700 outline-none transition-all'
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null);
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className='block text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  id='login-password'
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder='Masukkan password'
                  autoComplete='current-password'
                  className='w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-zinc-800/50 border border-transparent dark:border-zinc-800 rounded-2xl text-sm dark:text-zinc-100 focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-400 focus:border-gray-900 dark:focus:border-zinc-700 outline-none transition-all'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all'
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id='login-submit'
              type='submit'
              disabled={isLoading}
              className='w-full bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3.5 sm:py-4 rounded-2xl font-bold text-sm hover:bg-black dark:hover:bg-white/95 transition-all active:scale-[0.98] shadow-xl shadow-gray-200 dark:shadow-zinc-950/40 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='w-5 h-5 border-2 border-white/30 border-t-white dark:border-zinc-900/30 dark:border-t-zinc-950 rounded-full animate-spin' />
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Masuk</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Hint */}
          <div className='px-6 sm:px-8 pb-6 sm:pb-8'>
            <div className='bg-gray-50 dark:bg-zinc-950/50 rounded-2xl p-4 border border-gray-100 dark:border-zinc-800'>
              <p className='text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-3'>
                Demo Akun
              </p>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='w-7 h-7 bg-white dark:bg-zinc-800 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-zinc-400'>
                      U
                    </span>
                    <div>
                      <p className='text-[11px] font-bold text-gray-700 dark:text-zinc-300'>
                        user
                      </p>
                      <p className='text-[9px] text-gray-400 dark:text-zinc-500 font-medium'>
                        user123
                      </p>
                    </div>
                  </div>
                  <span className='text-[9px] font-bold px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-zinc-400 uppercase tracking-wide'>
                    User
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='w-7 h-7 bg-gray-900 dark:bg-zinc-100 rounded-full flex items-center justify-center text-[10px] font-bold text-white dark:text-zinc-900'>
                      T
                    </span>
                    <div>
                      <p className='text-[11px] font-bold text-gray-700 dark:text-zinc-300'>
                        teknisi
                      </p>
                      <p className='text-[9px] text-gray-400 dark:text-zinc-500 font-medium'>
                        teknisi123
                      </p>
                    </div>
                  </div>
                  <span className='text-[9px] font-bold px-2.5 py-1 rounded-full bg-gray-900 dark:bg-zinc-100 border border-gray-900 dark:border-zinc-100 text-white dark:text-zinc-900 uppercase tracking-wide'>
                    Teknisi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className='text-center text-[10px] text-gray-300 dark:text-zinc-600 mt-6 font-medium'>
          © 2026 LabCare · Sistem Pelaporan Fasilitas
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
