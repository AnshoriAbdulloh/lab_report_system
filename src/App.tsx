/**
 * App.tsx
 * Root application component for the Lab Report System (LabCare).
 * Manages authentication flow: shows LoginPage when not authenticated,
 * and the role-appropriate Dashboard when logged in.
 */

import type React from "react";

// Auth
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import { LoginPage } from "./components/pages/LoginPage";
import { Dashboard } from "./components/pages/Dashboard";

/**
 * AppContent handles the conditional rendering based on auth state.
 * Separated from App so it can access AuthContext via useAuth().
 */
const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-['Poppins']">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {user ? <Dashboard /> : <LoginPage />}

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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
