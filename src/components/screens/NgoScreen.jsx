import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import KindLinkLogo from '../KindLinkLogo';
import { TRUSTED_NGO, DELHI_NGOS } from '../../data/mockData';
import TiltCard from '../animations/TiltCard';
import AnimatedNumber from '../animations/AnimatedNumber';
import { createRipple, spawnSparkles } from '../../utils/animations';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Heart, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Globe, 
  ExternalLink, 
  Search, 
  Filter, 
  PlusCircle, 
  Sparkles,
  Copy,
  ArrowRight,
  Building2,
  MessageCircle,
  Award,
  Clock,
  Camera,
  X,
  ZoomIn
} from 'lucide-react';

export default function NgoScreen() {
  const { setSupportModalOpen, setCurrentNgo, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedArea, setSelectedArea] = useState('ALL');
  const [filterUrgentOnly, setFilterUrgentOnly] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // Quick NGO registration form state
  const [newNgoName, setNewNgoName] = useState('');
  const [newNgoLocation, setNewNgoLocation] = useState('');
  const [newNgoPhone, setNewNgoPhone] = useState('');
  const [newNgoNeed, setNewNgoNeed] = useState('');

  // Filtering the 20 Delhi NGOs
  const filteredNgos = DELHI_NGOS.filter(ngo => {
    if (selectedCategory !== 'ALL' && ngo.category !== selectedCategory) return false;
    if (selectedArea !== 'ALL' && ngo.area !== selectedArea) return false;
    if (filterUrgentOnly && !ngo.urgentNeed) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = ngo.name.toLowerCase().includes(q);
      const matchLoc = ngo.location.toLowerCase().includes(q);
      const matchCause = ngo.cause.toLowerCase().includes(q);
      const matchCat = ngo.category.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchCause && !matchCat) return false;
    }
    return true;
  });

  const handleCopyPhone = (phone, name) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phone);
      showToast(`📞 Phone for ${name} copied: ${phone}`);
    }
  };

  const handleRegisterNgo = (e) => {
    e.preventDefault();
    setRegisterModalOpen(false);
    showToast(`🎉 "${newNgoName}" registered! Our verification team will review your credentials within 4 hours.`);
    setNewNgoName('');
    setNewNgoLocation('');
    setNewNgoPhone('');
    setNewNgoNeed('');
  };

  const categories = ['ALL', 'NGO', 'Non-profit', 'Charity', 'Social services'];
  const areas = ['ALL', 'South Delhi', 'Central Delhi', 'North Delhi', 'East Delhi', 'West Delhi'];

  return (
    <div className="space-y-12 py-6 animate-fade-in text-[#1C1917] dark:text-white">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E8E2D5] dark:border-[#38332E] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2 border border-emerald-200/80 dark:border-emerald-700/60 shadow-2xs">
            <KindLinkLogo size="xs" variant="icon" />
            <span>Delhi NCR Verified NGO & Charity Network ({DELHI_NGOS.length} Organizations Listed)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] dark:text-white font-display">
            Explore Verified Delhi NGOs & Live Needs
          </h1>
          <p className="text-sm text-[#57534E] dark:text-stone-300 mt-1 max-w-2xl font-normal">
            Directly connect with grassroots Delhi non-profits, view real-time kitchen & supply requirements, and bypass marketing middlemen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRegisterModalOpen(true)}
            className="btn-warm-secondary flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>List Your Local NGO</span>
          </button>

          <button
            onClick={() => {
              setCurrentNgo(TRUSTED_NGO);
              setSupportModalOpen(true);
            }}
            className="btn-warm-primary flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold shadow-xs shrink-0 active:scale-95 transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Pledge to Spotlight NGO</span>
          </button>
        </div>
      </div>

      {/* Problem Statement Callout Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/10 via-emerald-500/[0.07] to-teal-500/10 border border-amber-500/30 dark:border-amber-600/25 p-6 sm:p-7 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xl shrink-0 font-bold mt-0.5 shadow-2xs">
            💡
          </div>
          <div className="space-y-1.5">
            <h3 className="font-extrabold text-base text-[#1C1917] dark:text-white font-display">
              The Discoverability Gap: Why KindLink Verifies Local NGOs
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-stone-300 leading-relaxed max-w-4xl font-normal">
              &ldquo;Right now, when Delhi businesses or residents want to donate food or supplies, it&apos;s hard to know which NGO to trust, which shelter has an urgent deficit tonight, or whether resources reach the right people. KindLink bridges this gap by cataloging vetted grassroots non-profits, verifying 80G tax exemptions, and publishing real-time requirements.&rdquo;
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <span className="flex items-center gap-1">✓ 100% Direct Phone & WhatsApp Contact</span>
              <span>•</span>
              <span className="flex items-center gap-1">✓ Real-time Daily Needs (Not just annual reports)</span>
              <span>•</span>
              <span className="flex items-center gap-1">✓ Zero Middleman Commission</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured NGO Spotlight: Uday Foundation */}
      <div className="beige-card rounded-3xl overflow-hidden shadow-warm-md">
        
        {/* Banner with image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
          <img 
            src={TRUSTED_NGO.bannerImage} 
            alt={TRUSTED_NGO.name}
            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-[#1E1B18] border-2 border-emerald-500 flex items-center justify-center text-3xl sm:text-4xl shadow-xl">
                {TRUSTED_NGO.avatar}
              </div>
              <div className="text-white">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display">{TRUSTED_NGO.name}</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Partner
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 flex items-center gap-3 flex-wrap font-medium">
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    {TRUSTED_NGO.rating} ({TRUSTED_NGO.reviewsCount} verified reviews)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {TRUSTED_NGO.location}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={TRUSTED_NGO.website}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md transition-colors flex items-center gap-1.5 border border-white/20"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => {
                  setCurrentNgo(TRUSTED_NGO);
                  setSupportModalOpen(true);
                }}
                className="btn-warm-primary px-5 py-2.5 rounded-xl text-xs font-bold shadow-md"
              >
                Support Mission
              </button>
            </div>
          </div>
        </div>

        {/* Details & Live Requirements */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-base font-extrabold text-[#1C1917] dark:text-white font-display">
                Organization Mission & Track Record
              </h3>
              <p className="text-sm text-[#57534E] dark:text-stone-300 leading-relaxed">
                {TRUSTED_NGO.about}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {TRUSTED_NGO.causes.map((cause, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800"
                  >
                    {cause}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E6DFD1] dark:border-[#38332E] flex flex-wrap items-center gap-4 text-xs text-[#78716C] dark:text-stone-400 font-semibold">
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {TRUSTED_NGO.bankDetails.taxExempt}
                </span>
                <span>•</span>
                <span>Verification ID: {TRUSTED_NGO.bankDetails.verificationId}</span>
                <span>•</span>
                <span>PAN / EIN: {TRUSTED_NGO.bankDetails.ein}</span>
              </div>
            </div>

            {/* Current Urgent Needs Box */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800/60 rounded-2xl p-5 space-y-3 shadow-warm-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-amber-900 dark:text-amber-300 text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Hospital Meal Deficit Today
                </h4>
                <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                  Urgent &lt; 2h
                </span>
              </div>

              <p className="text-xs text-[#44403C] dark:text-stone-300 font-medium leading-relaxed">
                Hot dinners needed for outstation patient families outside AIIMS Gate 2.
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] text-[#78716C] dark:text-stone-400">
                  <span>Progress: 85 / 150 meals</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">57% Fulfilled</span>
                </div>
                <div className="w-full bg-[#E6DFD1] dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '57%' }}></div>
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentNgo(TRUSTED_NGO);
                  setSupportModalOpen(true);
                }}
                className="w-full btn-warm-primary py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Pledge Surplus or Sponsor Meals</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Delhi NGO Explorer & Search Filter Bar */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1C1917] dark:text-white flex items-center gap-2 font-display">
              <Building2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
              <span>Delhi NGO Directory Database</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                {filteredNgos.length} Active
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-stone-400">
              Direct contact phone numbers, websites, and verified daily needs for all 20 Delhi organizations.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, area (Paharganj, Rohini)..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[#E8E2D5] dark:border-[#332E29] bg-white dark:bg-[#1E1B18] text-xs text-[#1C1917] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/40 shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-[#E8E2D5] dark:border-[#332E29] pb-4">
          <span className="text-xs font-bold text-[#78716C] dark:text-stone-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white dark:bg-[#1E1B18] text-[#57534E] dark:text-stone-300 hover:bg-[#FAF7F0] border border-[#E8E2D5] dark:border-[#332E29]'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="h-4 w-px bg-[#E8E2D5] dark:border-[#332E29] mx-2 hidden sm:block"></div>

          {/* Area Selector */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-4 py-1.5 rounded-full border border-[#E8E2D5] dark:border-[#332E29] bg-white dark:bg-[#1E1B18] text-xs text-[#1C1917] dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40 shadow-2xs"
          >
            {areas.map(a => (
              <option key={a} value={a}>Area: {a}</option>
            ))}
          </select>

          {/* Urgent Deficit toggle */}
          <button
            onClick={() => setFilterUrgentOnly(!filterUrgentOnly)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              filterUrgentOnly 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300/80 dark:border-amber-800'
            }`}
          >
            <span>🔥 Urgent Deficits Only</span>
          </button>
        </div>

        {/* 20 Delhi NGOs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNgos.map(ngo => {
            const rawDigits = ngo.phone ? ngo.phone.replace(/[^0-9]/g, '') : null;
            const waUrl = rawDigits 
              ? `https://wa.me/${rawDigits}?text=${encodeURIComponent(`Hello ${ngo.name}, I discovered your organization on KindLink and would like to support your urgent food & supply requirements!`)}`
              : null;

            return (
              <TiltCard
                key={ngo.id}
                className="beige-card rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:shadow-warm-lg transition-all duration-300 group overflow-hidden"
              >
                <div className="space-y-3.5">
                  {/* Real Cropped Ground Impact Photo Banner (if available) */}
                  {ngo.image && (
                    <div 
                      onClick={() => setPreviewPhoto({ image: ngo.image, title: ngo.name, caption: ngo.about, cause: ngo.cause, area: ngo.area })}
                      className="relative h-44 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl bg-stone-900 cursor-pointer group/img"
                      title="Click to view full high-res ground photo"
                    >
                      <img 
                        src={ngo.image} 
                        alt={ngo.name} 
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 group-hover/img:opacity-90 transition-opacity"></div>
                      
                      <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20 shadow-sm">
                        <Camera className="w-3 h-3 text-emerald-400" />
                        <span>Verified Ground Photo</span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                        <span className="font-semibold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                          📍 {ngo.area} Field Action
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40">
                          <ZoomIn className="w-2.5 h-2.5" />
                          <span>Inspect</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] dark:bg-[#2C2723] border border-[#E6DFD1] dark:border-[#3E3832] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                        {ngo.avatar}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-base text-[#1C1917] dark:text-white leading-tight truncate font-display">
                          {ngo.name}
                        </h4>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mt-0.5 truncate">
                          {ngo.cause}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F0] dark:bg-[#2C2723] text-[#57534E] dark:text-stone-300 border border-[#E6DFD1] dark:border-[#3E3832] shrink-0">
                      {ngo.area}
                    </span>
                  </div>

                  {/* Location & Tax status */}
                  <div className="space-y-1 text-xs text-[#78716C] dark:text-stone-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate text-[#44403C] dark:text-stone-300 font-medium">{ngo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        {ngo.taxExempt}
                      </span>
                      <span>•</span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold">★ {ngo.rating}</span>
                    </div>
                  </div>

                  {/* About note */}
                  <p className="text-xs text-[#57534E] dark:text-stone-300 line-clamp-2 leading-relaxed">
                    {ngo.about}
                  </p>

                  {/* Live Urgent Requirement box */}
                  {ngo.urgentNeed && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-extrabold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          Urgent Need:
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                          {ngo.needUrgency}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#292524] dark:text-stone-200 font-semibold leading-tight">
                        {ngo.urgentNeed}
                      </p>

                      {/* Mini progress */}
                      <div className="pt-1 space-y-0.5">
                        <div className="flex justify-between text-[9px] text-[#78716C] dark:text-stone-400 font-semibold">
                          <span>Fulfilled: {ngo.fulfilled} / {ngo.target} {ngo.unit}</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">{Math.round((ngo.fulfilled / ngo.target) * 100)}%</span>
                        </div>
                        <div className="w-full bg-[#E6DFD1] dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-amber-500 to-emerald-600 h-full rounded-full" 
                            style={{ width: `${(ngo.fulfilled / ngo.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Toolbar with WhatsApp, Phone, Web & Pledge */}
                <div className="pt-3 border-t border-[#E6DFD1] dark:border-[#38332E] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* WhatsApp Direct Connect */}
                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Chat directly on WhatsApp"
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 transition-colors flex items-center gap-1 text-[11px] font-bold"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    )}

                    {ngo.phone && (
                      <button
                        onClick={() => handleCopyPhone(ngo.phone, ngo.name)}
                        title={`Call: ${ngo.phone} (Click to copy)`}
                        className="p-2 rounded-xl bg-[#FAF7F0] dark:bg-[#2C2723] hover:bg-[#EFE8DA] text-[#44403C] dark:text-stone-300 border border-[#D8CEBD] dark:border-[#3E3832] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {ngo.website && (
                      <a
                        href={ngo.website}
                        target="_blank"
                        rel="noreferrer"
                        title="Visit official website"
                        className="p-2 rounded-xl bg-[#FAF7F0] dark:bg-[#2C2723] hover:bg-[#EFE8DA] text-[#44403C] dark:text-stone-300 border border-[#D8CEBD] dark:border-[#3E3832] transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      createRipple(e);
                      spawnSparkles(e.clientX, e.clientY, 7);
                      setCurrentNgo({
                        ...TRUSTED_NGO,
                        id: ngo.id,
                        name: ngo.name,
                        avatar: ngo.avatar,
                        location: ngo.location,
                        summary: ngo.about,
                        causes: [ngo.cause, ngo.category],
                        website: ngo.website,
                        phone: ngo.phone,
                      });
                      setSupportModalOpen(true);
                    }}
                    className="btn-warm-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs relative overflow-hidden active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Pledge Support</span>
                  </button>
                </div>

              </TiltCard>
            );
          })}
        </div>

        {filteredNgos.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#1E1B18] rounded-2xl border border-[#E6DFD1] dark:border-[#38332E] space-y-2">
            <p className="text-sm font-bold text-[#1C1917] dark:text-white">No NGOs matched your search filters</p>
            <p className="text-xs text-[#78716C] dark:text-stone-400">Try clearing the search query or selecting &ldquo;ALL&rdquo; categories.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); setSelectedArea('ALL'); setFilterUrgentOnly(false); }}
              className="mt-2 text-xs text-emerald-700 font-bold hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal: List / Register Your Local NGO */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-[#24201D] border-2 border-[#E6DFD1] dark:border-[#3E3832] w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 animate-slide-up">
            <div className="flex items-center justify-between border-b border-[#E6DFD1] dark:border-[#38332E] pb-3">
              <div className="flex items-center gap-2">
                <KindLinkLogo size="xs" variant="icon" />
                <h3 className="font-extrabold text-base text-[#1C1917] dark:text-white font-display">Register Grassroots Delhi NGO</h3>
              </div>
              <button 
                onClick={() => setRegisterModalOpen(false)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed">
              No marketing budget required. Tell local donors what emergency meals or provisions your organization needs today.
            </p>

            <form onSubmit={handleRegisterNgo} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  NGO or Trust Name
                </label>
                <input 
                  type="text" 
                  value={newNgoName}
                  onChange={(e) => setNewNgoName(e.target.value)}
                  placeholder="e.g. Navjeevan Seva Samiti"
                  className="w-full px-3 py-2 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Delhi Area / Locality
                </label>
                <input 
                  type="text" 
                  value={newNgoLocation}
                  onChange={(e) => setNewNgoLocation(e.target.value)}
                  placeholder="e.g. Shakurpur, North West Delhi 110034"
                  className="w-full px-3 py-2 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Contact Phone Number
                </label>
                <input 
                  type="text" 
                  value={newNgoPhone}
                  onChange={(e) => setNewNgoPhone(e.target.value)}
                  placeholder="+91 98..."
                  className="w-full px-3 py-2 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Immediate Daily Requirement
                </label>
                <textarea 
                  rows="2"
                  value={newNgoNeed}
                  onChange={(e) => setNewNgoNeed(e.target.value)}
                  placeholder="e.g. 50 cooked dinners for children every weekday evening..."
                  className="w-full px-3 py-2 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRegisterModalOpen(false)}
                  className="btn-warm-secondary px-3.5 py-2 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-warm-primary px-5 py-2 rounded-xl text-xs shadow-xs"
                >
                  Submit for Fast Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Ground Photo Modal */}
      {previewPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setPreviewPhoto(null)}
        >
          <div 
            className="bg-[#FAF7F0] dark:bg-[#201D1A] border-2 border-[#D8CEBD] dark:border-[#3E3832] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
              <img 
                src={previewPhoto.image} 
                alt={previewPhoto.title} 
                className="w-full h-full max-h-[60vh] object-contain"
              />
              <button
                onClick={() => setPreviewPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-400/40">
                <Camera className="w-3.5 h-3.5" />
                <span>Verified Field Photo</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                    {previewPhoto.cause} • {previewPhoto.area}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#1C1917] dark:text-white font-display mt-0.5">
                    {previewPhoto.title}
                  </h3>
                </div>
                <button
                  onClick={() => setPreviewPhoto(null)}
                  className="btn-warm-secondary px-4 py-2 rounded-xl text-xs shrink-0"
                >
                  Close
                </button>
              </div>

              <p className="text-sm text-[#57534E] dark:text-stone-300 leading-relaxed">
                {previewPhoto.caption}
              </p>

              <div className="pt-3 border-t border-[#E6DFD1] dark:border-[#38332E] flex items-center justify-between">
                <span className="text-xs text-stone-500 font-medium">
                  📸 Cropped high-resolution verified ground capture
                </span>
                <button
                  onClick={() => {
                    const match = DELHI_NGOS.find(n => n.name === previewPhoto.title);
                    if (match) {
                      setCurrentNgo(match);
                      setSupportModalOpen(true);
                      setPreviewPhoto(null);
                    }
                  }}
                  className="btn-warm-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Support Organization</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
