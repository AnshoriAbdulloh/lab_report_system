// Auth
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Pages
import { LoginPage } from "./components/pages/LoginPage";
import { Dashboard } from "./components/pages/Dashboard";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HardwareList } from './components/pages/HardwareList';

/**
 * AppContent handles the conditional rendering based on auth state.
 * Separated from App so it can access AuthContext via useAuth().
 */
const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f1f1f1] dark:bg-zinc-950 text-[#1A1A1A] dark:text-zinc-100 font-['Poppins'] transition-colors duration-300">
      <link
        href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        rel='stylesheet'
      />

      {user ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hardware" element={<HardwareList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <LoginPage />
      )}

      {/* Utility Styles */}
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

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
