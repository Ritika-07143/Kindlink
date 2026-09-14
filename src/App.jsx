import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LiveActivityBanner from './components/LiveActivityBanner';
import Footer from './components/Footer';
import PresenterDrawer from './components/PresenterDrawer';
import SupportModal from './components/SupportModal';
import CertificateModal from './components/CertificateModal';

import LandingScreen from './components/screens/LandingScreen';
import NgoScreen from './components/screens/NgoScreen';
import DonorScreen from './components/screens/DonorScreen';
import ReceiverScreen from './components/screens/ReceiverScreen';
import AiMatchingScreen from './components/screens/AiMatchingScreen';
import AmbientParticlesCanvas from './components/animations/AmbientParticlesCanvas';
import { CheckCircle2, AlertCircle } from 'lucide-react';

function AppContent() {
  const { activeTab, toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED] text-[#1C1917] dark:bg-[#1C1917] dark:text-[#FBF9F5] transition-colors duration-300 selection:bg-emerald-600 selection:text-white relative overflow-hidden beige-grid">
      
      {/* Interactive JavaScript Ambient KindLink Network Particles */}
      <AmbientParticlesCanvas className="opacity-75 dark:opacity-40" />

      {/* Organic ambient warm glow orbs */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[450px] bg-emerald-500/[0.08] dark:bg-emerald-500/[0.05] rounded-full blur-[130px] pointer-events-none -z-10 glow-warm"></div>
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[400px] bg-[#E8DCC4]/60 dark:bg-amber-500/[0.04] rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[750px] h-[450px] bg-teal-500/[0.06] dark:bg-teal-500/[0.04] rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Real-Time Live Activity Ticker Bar */}
      <LiveActivityBanner />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area with Animated Tab Transitions */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div key={activeTab} className="animate-fade-in transition-all duration-300">
          {activeTab === 'landing' && <LandingScreen />}
          {activeTab === 'ngo' && <NgoScreen />}
          {activeTab === 'donor' && <DonorScreen />}
          {activeTab === 'receiver' && <ReceiverScreen />}
          {activeTab === 'ai' && <AiMatchingScreen />}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals and Overlays */}
      <SupportModal />
      <CertificateModal />
      <PresenterDrawer />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl text-xs sm:text-sm font-semibold border border-slate-700 dark:border-slate-200">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 dark:text-amber-600 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return <AppContent />;
}
