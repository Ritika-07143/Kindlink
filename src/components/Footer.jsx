import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import KindLinkLogo from './KindLinkLogo';
import { Heart, Sparkles, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function Footer() {
  const { setActiveTab, setShowPitchNotes, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    triggerConfetti();
    showToast('🌱 Thank you for joining the Delhi Food Rescue Dispatch Network!');
    setEmailInput('');
  };

  return (
    <footer className="border-t border-[#E8E2D5] dark:border-[#332E29] bg-[#FAF7F0]/90 dark:bg-[#1C1917]/90 backdrop-blur-md transition-colors mt-20 text-[#1C1917] dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Logo (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <KindLinkLogo size="lg" variant="full" />
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-stone-300 max-w-sm leading-relaxed font-normal">
              Connecting commercial food donors, restaurants, and compassionate Delhi residents with verified grassroots night shelters and hospital soup kitchens in minutes.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#78716C] dark:text-stone-400">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200/80 dark:border-emerald-700/60 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                20 Verified Delhi NGOs Listed
              </span>
              <span>•</span>
              <span className="font-medium">100% Tax Deductible (80G)</span>
            </div>

            {/* Volunteer Dispatch Newsletter */}
            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email for daily food alerts..."
                  className="flex-1 px-4 py-2 rounded-full text-xs bg-white dark:bg-[#26221E] border border-[#E8E2D5] dark:border-[#3E3832] text-[#1C1917] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/40 shadow-2xs"
                />
                <button
                  type="submit"
                  className="btn-warm-primary px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Join</span>
                </button>
              </form>
              {subscribed && (
                <div className="mt-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Subscribed to daily Delhi surplus alerts!</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Platform Navigation (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#57534E] dark:text-stone-300">
              <li>
                <button 
                  onClick={() => setActiveTab('landing')} 
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  Home & Impact Live Feed
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('ngo')} 
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  20 Delhi NGOs Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('donor')} 
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  Donor Commercial Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('receiver')} 
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  Receiver Claim & Lifecycle
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('ai')} 
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  AI Match Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Delhi Coverage Zones (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400">
              Delhi NCR Hubs
            </h4>
            <ul className="space-y-1.5 text-xs text-[#57534E] dark:text-stone-300 font-medium">
              <li>Connaught Place (CP)</li>
              <li>AIIMS & Safdarjung Ward</li>
              <li>Hauz Khas Village</li>
              <li>Paharganj Night Shelters</li>
              <li>Saket & Malviya Nagar</li>
              <li>Okhla Industrial Sector</li>
              <li>Rohini & Pitampura</li>
            </ul>
          </div>

          {/* Col 4: Innovation & Vision (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400">
              Autonomous AI Roadmap
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E] dark:text-stone-300 font-medium">
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600">✦</span> Autonomous Spatial Matching Agent
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600">✦</span> Automated Section 80G Tax API
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-600">✦</span> IoT Thermal Cold-Chain Telemetry
              </li>
            </ul>

            <button
              onClick={() => setShowPitchNotes(true)}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100/90 dark:bg-amber-950/80 border border-amber-300/80 dark:border-amber-700/80 text-amber-900 dark:text-amber-200 text-xs font-bold hover:bg-amber-200 transition-all shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Open Presenter Pitch Guide</span>
            </button>
          </div>

        </div>

        {/* ========================================================
            TEAM IMPACTRIX CREDITS SHOWCASE (Prominent & Clean UI)
            ======================================================== */}
        <div className="mt-12 pt-8 border-t border-[#E8E2D5] dark:border-[#332E29]">
          <div className="bg-white/80 dark:bg-[#24201D]/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] dark:border-[#332E29] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Engineered & Developed By</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] dark:text-white font-display tracking-tight flex items-center justify-center lg:justify-start gap-2.5">
                <span>TEAM IMPACTRIX</span>
                <span className="text-xs px-3 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold border border-amber-300/60 dark:border-amber-700/60 shadow-2xs">
                  7 Innovators
                </span>
              </h3>
              <p className="text-xs text-[#57534E] dark:text-stone-300 font-normal max-w-md">
                Mission-driven innovators delivering zero-hunger food redistribution, hyper-local spatial logistics, and tech-for-good community impact across Delhi NCR.
              </p>
            </div>

            {/* Team Members Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2.5 max-w-2xl">
              {[
                { name: 'Tanmay', role: 'Innovation' },
                { name: 'Vivek', role: 'Engineering' },
                { name: 'Mahi', role: 'Design' },
                { name: 'Ritika', role: 'Operations' },
                { name: 'Satyam', role: 'Systems' },
                { name: 'Vishesh', role: 'Full Stack' },
                { name: 'Pujitha', role: 'Product' }
              ].map((member) => (
                <div 
                  key={member.name}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F0] dark:bg-[#1E1B18] border border-[#E8E2D5] dark:border-[#3A332C] hover:border-emerald-600/50 hover:shadow-xs transition-all group select-none"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-[11px] font-bold flex items-center justify-center shadow-2xs">
                    {member.name[0]}
                  </span>
                  <span className="text-xs font-bold text-[#1C1917] dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {member.name}
                  </span>
                  <span className="text-[10px] text-[#A8A29E] font-medium hidden sm:inline">
                    • {member.role}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-8 pt-6 border-t border-[#E8E2D5] dark:border-[#332E29] flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] dark:text-stone-400 gap-3">
          <p>© {new Date().getFullYear()} KindLink Ecosystem • Built with purpose by <strong className="text-[#1C1917] dark:text-white font-bold">Team IMPACTRIX</strong></p>
          <div className="flex items-center gap-1.5 font-medium">
            <span>Powering zero-hunger community impact in Delhi NCR with</span>
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
