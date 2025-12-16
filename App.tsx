import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardHome } from './pages/DashboardHome';
import { LinksList } from './pages/LinksList';
import { LeadsPage } from './pages/LeadsPage';
import { PublicGate } from './pages/PublicGate';
import { SettingsPage } from './pages/SettingsPage';

// Login Page Component (Inline for simplicity)
const LoginPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div>
                     <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent tracking-tight">GateKeep</h1>
                     <p className="mt-2 text-gray-500 text-lg">Turn your content into a lead generation machine.</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
                    <button 
                        onClick={() => window.location.hash = '#/dashboard'}
                        className="w-full bg-[#1877F2] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#166fe5] transition-colors flex items-center justify-center gap-2 mb-4"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Continue with Facebook
                    </button>
                    
                    <div className="my-4 flex items-center gap-4">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-gray-400 text-sm font-medium">OR</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>
                    
                     <button 
                        onClick={() => window.location.hash = '#/dashboard'}
                        className="w-full bg-gray-50 text-gray-700 border border-gray-200 px-4 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                    >
                        Log in with Email
                    </button>
                    <p className="mt-6 text-xs text-gray-400">By continuing, you agree to our Terms of Service.</p>
                </div>
            </div>
        </div>
    )
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Landing Page for Login */}
        <Route path="/" element={<LoginPage />} />

        {/* The Fan/Viewer Experience */}
        <Route path="/view/:id" element={<PublicGate />} />

        {/* Influencer Dashboard */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          <Route path="links" element={<LinksList />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;