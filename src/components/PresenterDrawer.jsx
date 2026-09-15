import React from 'react';
import { useApp } from '../context/AppContext';
import KindLinkLogo from './KindLinkLogo';
import { Sparkles, X, Lightbulb, HelpCircle, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function PresenterDrawer() {
  const { showPitchNotes, setShowPitchNotes, setActiveTab } = useApp();

  if (!showPitchNotes) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white/95 dark:bg-[#24201D]/95 backdrop-blur-xl border-2 border-amber-500 rounded-3xl shadow-2xl pointer-events-auto overflow-hidden animate-slide-up text-[#1C1917] dark:text-white">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 px-6 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <KindLinkLogo size="xs" variant="icon" />
            <span className="font-extrabold text-xs tracking-wider uppercase font-display">
              KindLink Presenter Cheat Sheet • 1-Hour Pitch Helper
            </span>
          </div>
          <button 
            onClick={() => setShowPitchNotes(false)}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-sm text-[#44403C] dark:text-stone-200">
          
          {/* Key Answer */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                  When judges ask: &ldquo;Is this only frontend right now?&rdquo;
                </h4>
                <p className="mt-1.5 font-semibold text-amber-950 dark:text-amber-100 italic bg-white/80 dark:bg-[#1E1B18] p-3 rounded-xl border border-amber-300 dark:border-amber-700">
                  &ldquo;This is our Phase 1 prototype, focused on validating the user experience. The backend, NGO verification layer, and AI-powered matching agent are planned as the next phase.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* 30-Second Pitch */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4">
            <div className="flex items-start gap-2.5">
              <Lightbulb className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  30-Second Elevator Pitch
                </h4>
                <p className="mt-1 text-[#44403C] dark:text-stone-300 leading-relaxed">
                  <strong>&ldquo;KindLink is the real-time resource routing platform connecting surplus food and verified causes.</strong> Today, over 30% of edible food is thrown away by restaurants, while nearby shelters struggle with nightly deficits. KindLink bridges this gap in minutes through one-click claiming, strict pickup windows, and an intelligent AI matching agent.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* 3-Step Demo Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#FAF7F0] dark:bg-[#1E1B18] border border-[#E6DFD1] dark:border-[#38332E]">
              <div className="font-extrabold text-xs text-emerald-800 dark:text-emerald-400">Step 1: Explore NGOs</div>
              <p className="text-[11px] text-[#78716C] dark:text-stone-400 mt-1">Show 20 verified Delhi NGOs with real locations, WhatsApp links, and urgent needs.</p>
              <button 
                onClick={() => { setActiveTab('ngo'); setShowPitchNotes(false); }}
                className="mt-2 text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                Go to NGOs →
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F0] dark:bg-[#1E1B18] border border-[#E6DFD1] dark:border-[#38332E]">
              <div className="font-extrabold text-xs text-emerald-800 dark:text-emerald-400">Step 2: Donor Portal</div>
              <p className="text-[11px] text-[#78716C] dark:text-stone-400 mt-1">Demonstrate 30-second surplus food posting with instant digital receipt & live card preview.</p>
              <button 
                onClick={() => { setActiveTab('donor'); setShowPitchNotes(false); }}
                className="mt-2 text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                Go to Donor →
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F0] dark:bg-[#1E1B18] border border-[#E6DFD1] dark:border-[#38332E]">
              <div className="font-extrabold text-xs text-teal-800 dark:text-teal-400">Step 3: AI Matching</div>
              <p className="text-[11px] text-[#78716C] dark:text-stone-400 mt-1">Trigger the live neural match simulator calculating zero-waste compatibility score.</p>
              <button 
                onClick={() => { setActiveTab('ai'); setShowPitchNotes(false); }}
                className="mt-2 text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
              >
                Go to AI Match →
              </button>
            </div>
          </div>

          {/* Team IMPACTRIX Credit */}
          <div className="pt-3 border-t border-[#E8E2D5] dark:border-[#38332E] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                TEAM IMPACTRIX
              </span>
              <span className="text-[#78716C] dark:text-stone-400 font-medium">
                Tanmay • Ritika • Satyam
              </span>
            </div>
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
              Delhi NCR Zero-Hunger Initiative
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
