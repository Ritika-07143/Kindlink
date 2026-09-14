import React from 'react';
import { useApp } from '../context/AppContext';
import KindLinkLogo from './KindLinkLogo';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  PlusCircle, 
  HeartHandshake, 
  Building2, 
  Utensils, 
  Bot, 
  Menu, 
  X,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { 
    theme, 
    toggleTheme, 
    activeTab, 
    setActiveTab, 
    currentRole,
    setCurrentRole,
    showPitchNotes, 
    setShowPitchNotes 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: HeartHandshake },
    { id: 'ngo', label: 'Explore NGOs', icon: Building2, badge: '20 Verified' },
    { id: 'donor', label: 'Donor Portal', icon: Utensils },
    { id: 'receiver', label: 'Request & Drops', icon: PlusCircle },
    { id: 'ai', label: 'AI Match Engine', icon: Bot, highlight: true },
  ];

  const roles = [
    { id: 'donor', label: 'Restaurant Donor', icon: '🥐', desc: 'Post surplus food & claim tax credit' },
    { id: 'receiver', label: 'Shelter Receiver', icon: '🍲', desc: '1-click claim food drops & log needs' },
    { id: 'volunteer', label: 'Courier Volunteer', icon: '🚴', desc: 'Dispatch & thermal pickup tracking' },
  ];

  const activeRoleObj = roles.find(r => r.id === currentRole) || roles[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E2D5] dark:border-[#2D2824] clean-glass transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('landing')} 
              className="flex items-center gap-2.5 text-left group focus:outline-none transition-transform hover:scale-[1.01]"
            >
              <KindLinkLogo size="md" variant="full" animated={true} />
            </button>
          </div>

          {/* Desktop Navigation Tabs (Clean Pill Design) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#ECE5D8]/70 dark:bg-[#201C19]/90 p-1 rounded-full border border-[#DFD7C7]/80 dark:border-[#332E29]">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-[#2C2723] text-emerald-800 dark:text-emerald-300 shadow-xs border border-[#DCD3C3] dark:border-[#403932]'
                      : 'text-[#57534E] dark:text-stone-300 hover:text-[#1C1917] dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-[#78716C] dark:text-stone-400'}`} />
                  <span>{item.label}</span>
                  
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-2">
            
            {/* Persona Role Switcher */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D8CEBD] dark:border-[#38332E] bg-white dark:bg-[#24201D] hover:bg-[#FAF7F0] dark:hover:bg-[#2C2723] text-xs text-[#44403C] dark:text-stone-200 font-semibold shadow-xs transition-colors"
                title="Switch interactive presentation persona"
              >
                <span>{activeRoleObj.icon}</span>
                <span className="text-[#1C1917] dark:text-white font-bold">{activeRoleObj.label}</span>
                <ChevronDown className="w-3 h-3 text-[#A8A29E]" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#24201D] border-2 border-[#E6DFD1] dark:border-[#3E3832] shadow-warm-lg p-2 z-50 animate-scale-in">
                  <div className="px-3 py-1 text-[10px] uppercase font-extrabold text-[#78716C] dark:text-stone-400">
                    Switch Active Persona
                  </div>
                  {roles.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setCurrentRole(r.id);
                        setRoleMenuOpen(false);
                        if (r.id === 'donor') setActiveTab('donor');
                        if (r.id === 'receiver') setActiveTab('receiver');
                      }}
                      className={`w-full flex items-start gap-2 px-3 py-2 rounded-xl text-left text-xs transition-all ${
                        currentRole === r.id 
                          ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-200/60 dark:border-emerald-800' 
                          : 'hover:bg-[#FAF7F0] dark:hover:bg-stone-800 text-[#44403C] dark:text-stone-300'
                      }`}
                    >
                      <span className="text-base">{r.icon}</span>
                      <div>
                        <div className="font-bold text-[#1C1917] dark:text-white">{r.label}</div>
                        <div className="text-[10px] text-[#78716C] dark:text-stone-400">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Quick Post Button */}
            <button
              onClick={() => setActiveTab('donor')}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl btn-warm-primary text-xs font-bold shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post Surplus</span>
            </button>

            {/* Pitch Guide / Cheat Sheet Trigger */}
            <button
              onClick={() => setShowPitchNotes(!showPitchNotes)}
              title="Open Presenter Pitch Guide"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                showPitchNotes 
                  ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/80 dark:border-amber-700 dark:text-amber-200' 
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
              <span className="hidden sm:inline">Pitch Guide</span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Light/Dark Mode"
              className="p-2 rounded-xl text-[#57534E] dark:text-stone-300 hover:text-[#1C1917] dark:hover:text-white hover:bg-[#EFE8DA] dark:hover:bg-stone-800 border border-transparent hover:border-[#D8CEBD] transition-all"
              title={`Switch to ${theme === 'dark' ? 'Warm Beige' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#57534E] dark:text-stone-300 hover:bg-[#EFE8DA] dark:hover:bg-stone-800"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E6DFD1] dark:border-[#38332E] space-y-1.5 animate-fade-in">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-300'
                      : 'text-[#57534E] dark:text-stone-300 hover:bg-[#EFE8DA] dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200/80 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('donor');
                  setMobileMenuOpen(false);
                }}
                className="w-full btn-warm-primary py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Surplus Food Drop</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
