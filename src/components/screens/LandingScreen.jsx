import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import InteractiveMap from '../InteractiveMap';
import { triggerConfetti } from '../../utils/confetti';
import { DELHI_NGOS, GROUND_IMPACT_STORIES } from '../../data/mockData';
import AnimatedNumber from '../animations/AnimatedNumber';
import TiltCard from '../animations/TiltCard';
import RippleButton from '../animations/RippleButton';
import { createRipple, spawnSparkles } from '../../utils/animations';
import { 
  ArrowRight, 
  Utensils, 
  HandHeart, 
  Building2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  TrendingUp, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Compass, 
  LayoutGrid, 
  Award, 
  Calculator, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  ChevronRight, 
  Heart, 
  Thermometer, 
  FileText,
  Camera,
  ZoomIn,
  X
} from 'lucide-react';

export default function LandingScreen() {
  const { setActiveTab, stats, drops, claimDrop, setCurrentNgo, setSupportModalOpen, showToast } = useApp();
  const [landingViewMode, setLandingViewMode] = useState('grid'); // 'grid' | 'map'
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [photoCategory, setPhotoCategory] = useState('ALL');
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  // Interactive Impact Calculator State
  const [businessType, setBusinessType] = useState('restaurant'); // 'restaurant' | 'bakery' | 'banquet' | 'cafeteria'
  const [dailySurplusMeals, setDailySurplusMeals] = useState(45);

  const businessMultiplier = {
    restaurant: { label: 'Fine Dining / QSR', avgCost: 55 },
    bakery: { label: 'Artisan Bakery', avgCost: 40 },
    banquet: { label: 'Banquet & Wedding Hall', avgCost: 75 },
    cafeteria: { label: 'Corporate Cafeteria', avgCost: 50 },
  };

  const monthlyMeals = dailySurplusMeals * 30;
  const monthlyTaxRebate = monthlyMeals * (businessMultiplier[businessType]?.avgCost || 50);
  const monthlyCo2SavedKg = Math.round(monthlyMeals * 0.48);
  const sheltersSupported = Math.max(1, Math.ceil(dailySurplusMeals / 22));

  // Filter drops
  const activeDrops = drops
    .filter(d => d.status === 'Available')
    .filter(d => {
      if (selectedCategory === 'ALL') return true;
      if (selectedCategory === 'Bakery') return d.foodType?.includes('Bakery');
      if (selectedCategory === 'Cooked') return d.foodType?.includes('Meal') || d.foodType?.includes('Cooked');
      if (selectedCategory === 'Produce') return d.foodType?.includes('Produce') || d.foodType?.includes('Fruits');
      return true;
    })
    .filter(d => {
      if (!localSearch) return true;
      return d.itemName.toLowerCase().includes(localSearch.toLowerCase()) ||
             d.donorName.toLowerCase().includes(localSearch.toLowerCase()) ||
             d.location.toLowerCase().includes(localSearch.toLowerCase());
    });

  const handleClaim = (dropId, dropName) => {
    claimDrop(dropId, 'Uday Foundation (AIIMS Ward)');
    triggerConfetti();
    showToast(`🎉 Claimed "${dropName}"! Dispatch courier assigned.`);
  };

  // Top spotlight NGOs
  const spotlightNgos = DELHI_NGOS.slice(0, 3);

  return (
    <div className="space-y-16 py-6 animate-fade-in text-[#1C1917] dark:text-white">
      
      {/* ========================================================
          HERO SECTION (Warm Beige, Rich Editorial, Clean Hairline Border)
          ======================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-[#24201D]/90 backdrop-blur-md border border-[#E8E2D5] dark:border-[#332E29] p-8 sm:p-14 lg:p-16 text-center shadow-xs">
        
        {/* Ambient Organic Warm Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-emerald-500/[0.06] dark:bg-emerald-500/10 blur-3xl pointer-events-none -z-10 rounded-full"></div>
        <div className="absolute bottom-0 right-10 w-72 h-48 bg-[#D8CEBD]/30 dark:bg-amber-500/10 blur-3xl pointer-events-none -z-10 rounded-full"></div>

        {/* Floating live sticker pills on desktop */}
        <div className="hidden xl:flex items-center gap-2 absolute top-8 left-8 px-4 py-1.5 rounded-full bg-[#FAF7F0]/90 dark:bg-[#2C2723]/90 border border-[#E8E2D5] dark:border-[#3A332C] text-[11px] font-semibold text-[#57534E] dark:text-stone-300 shadow-xs animate-float-slow select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>⚡ Live: 35 Dal Makhani trays claimed in CP</span>
        </div>

        <div className="hidden xl:flex items-center gap-2 absolute top-8 right-8 px-4 py-1.5 rounded-full bg-[#FAF7F0]/90 dark:bg-[#2C2723]/90 border border-[#E8E2D5] dark:border-[#3A332C] text-[11px] font-semibold text-[#57534E] dark:text-stone-300 shadow-xs animate-float-delayed select-none">
          <span>🍲 14,820+ Meals Rescued in Delhi NCR</span>
        </div>

        {/* Status indicator tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-200/80 dark:border-emerald-800/60 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-ping"></span>
          <span>Delhi NCR Live Food Rescue • 20 Verified NGOs • Real-Time Dispatch</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1C1917] dark:text-white max-w-5xl mx-auto leading-[1.08] font-display">
          Connect. Contribute. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
            Create Real Impact.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#57534E] dark:text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Connecting Delhi NCR restaurants, bakeries, and compassionate donors directly with grassroots night shelters and hospital soup kitchens in minutes.
        </p>

        {/* 3 Core CTAs with Warm Styling & Animations */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setActiveTab('donor')}
            className="btn-warm-primary group relative overflow-hidden flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 animate-shimmer pointer-events-none"></div>
            <Utensils className="w-4 h-4" />
            <span>Donate Surplus Food</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setActiveTab('receiver')}
            className="btn-warm-secondary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold active:scale-95 transition-all"
          >
            <HandHeart className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Request Help (Shelters)</span>
          </button>

          <button
            onClick={() => setActiveTab('ngo')}
            className="btn-warm-secondary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold active:scale-95 transition-all"
          >
            <Building2 className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            <span>Explore 20 Delhi NGOs</span>
          </button>
        </div>

        {/* Quick Demo Simulator Bar */}
        <div className="mt-8 pt-6 border-t border-[#E8E2D5] dark:border-[#332E29] max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-[#FAF7F0]/80 dark:bg-[#1E1B18]/80 p-3 px-5 rounded-2xl border border-[#E8E2D5] dark:border-[#332E29]">
          <div className="flex items-center gap-2.5 text-[#44403C] dark:text-stone-300 text-left">
            <span className="text-base">⚡</span>
            <span><strong>Live Demo:</strong> 1-click test to simulate rescuing active fresh surplus food right now.</span>
          </div>
          <button
            onClick={() => {
              handleClaim('drop-1', '45 Sourdough Loaves');
              setActiveTab('receiver');
            }}
            className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all whitespace-nowrap shadow-xs hover:scale-105 active:scale-95 shrink-0"
          >
            Simulate 1-Click Rescue →
          </button>
        </div>

        {/* Delhi Active Coverage Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#78716C] dark:text-stone-400 font-medium">
          <span className="text-[#A8A29E] font-semibold">Active Coverage:</span>
          {['Connaught Place', 'Hauz Khas', 'AIIMS Ward', 'Paharganj', 'Saket', 'Okhla', 'Rohini', 'Dwarka'].map(area => (
            <span key={area} className="px-3 py-1 rounded-full bg-[#FAF7F0] dark:bg-[#2C2723] border border-[#E8E2D5] dark:border-[#332E29] text-[#44403C] dark:text-stone-300 font-medium shadow-2xs">
              {area}
            </span>
          ))}
        </div>

      </section>

      {/* ========================================================
          DYNAMIC IMPACT METRICS (Beige Elevation & Sparklines)
          ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1917] dark:text-white flex items-center gap-2 font-display">
              <span>Live Community Impact Counter</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-ping"></span>
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-stone-400">
              Aggregated across registered Delhi kitchens, volunteer dispatchers, and verified non-profit partners.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Meals Rescued */}
          <TiltCard className="beige-card p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-600/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400">
                Total Meals Rescued
              </div>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                <Utensils className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-emerald-800 dark:text-emerald-400 font-display">
              <AnimatedNumber value={stats.mealsSaved} suffix="+" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[#57534E] dark:text-stone-400">
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                <TrendingUp className="w-3.5 h-3.5" />
                +24% this week
              </span>
              <span className="font-semibold text-[11px]">Delhi NCR</span>
            </div>
            <div className="w-full h-1.5 bg-[#EFE8DA] dark:bg-stone-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-400 w-4/5 rounded-full"></div>
            </div>
          </TiltCard>

          {/* Card 2: Waste Diverted */}
          <TiltCard className="beige-card p-6 rounded-2xl relative overflow-hidden group hover:border-teal-600/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400">
                Waste Diverted
              </div>
              <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-400 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/40 shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#1C1917] dark:text-white font-display">
              <AnimatedNumber value={stats.wasteDivertedKg} suffix=" kg" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[#57534E] dark:text-stone-400 font-medium text-[11px]">
              <span>Saved from Ghazipur Landfill</span>
            </div>
            <div className="w-full h-1.5 bg-[#EFE8DA] dark:bg-stone-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-500 dark:to-cyan-400 w-3/4 rounded-full"></div>
            </div>
          </TiltCard>

          {/* Card 3: Active Drops */}
          <TiltCard className="beige-card p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-600/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400">
                Active Drops Nearby
              </div>
              <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 flex items-center justify-center border border-cyan-200/60 dark:border-cyan-800/40 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-teal-800 dark:text-cyan-400 font-display">
              <AnimatedNumber value={stats.activeDrops} suffix=" live" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[#57534E] dark:text-stone-400">
              <span className="flex items-center gap-1.5 text-teal-700 dark:text-cyan-400 font-bold text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-cyan-400 animate-pulse"></span>
                Ready for 1-click claim
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#EFE8DA] dark:bg-stone-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-cyan-500 dark:to-blue-400 w-2/3 rounded-full"></div>
            </div>
          </TiltCard>

          {/* Card 4: Verified Delhi NGOs */}
          <TiltCard className="beige-card p-6 rounded-2xl relative overflow-hidden group hover:border-amber-600/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400">
                Verified Delhi Partners
              </div>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-200/60 dark:border-amber-800/40 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-amber-800 dark:text-amber-400 font-display">
              <AnimatedNumber value={stats.verifiedNgos} suffix=" NGOs" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[#57534E] dark:text-stone-400 font-medium text-[11px]">
              <span className="text-amber-800 dark:text-amber-400 font-bold">100% Tax Deductible (80G)</span>
            </div>
            <div className="w-full h-1.5 bg-[#EFE8DA] dark:bg-stone-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-600 to-orange-500 w-full rounded-full"></div>
            </div>
          </TiltCard>

        </div>
      </section>

      {/* ========================================================
          INTERACTIVE FOOD WASTE & TAX SAVINGS CALCULATOR
          (Gives deep substance, utility, and engagement)
          ======================================================== */}
      <section className="p-6 sm:p-10 rounded-3xl relative overflow-hidden bg-white/70 dark:bg-[#24201D]/70 backdrop-blur-md border border-[#E8E2D5] dark:border-[#332E29] shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E8E2D5] dark:border-[#332E29]">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>Commercial Food Waste & Tax Savings Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] dark:text-white font-display">
              Calculate Your Business Impact & Section 80G Value
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-stone-300 leading-relaxed font-normal">
              Find out how much landfill tax your Delhi business can write off while providing fresh meals to nearby community kitchens.
            </p>
          </div>

          {/* Business Type Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(businessMultiplier).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setBusinessType(key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  businessType === key 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'bg-white dark:bg-[#1E1B18] text-[#57534E] dark:text-stone-300 border border-[#E8E2D5] dark:border-[#332E29] hover:bg-[#FAF7F0]'
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
          
          {/* Slider Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400">
                  Estimated Daily Surplus Portions
                </span>
                <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-display">
                  {dailySurplusMeals} <span className="text-sm font-semibold text-[#57534E] dark:text-stone-400">meals/day</span>
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={dailySurplusMeals}
                onChange={(e) => setDailySurplusMeals(Number(e.target.value))}
                className="w-full h-2 bg-[#EFE8DA] dark:bg-[#332E29] rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
              <div className="flex justify-between text-[11px] text-[#A8A29E] font-medium">
                <span>10 meals (Small cafe)</span>
                <span>150 meals (Hotel banquet)</span>
                <span>300+ meals (Convention center)</span>
              </div>
            </div>

            {/* Micro Benefits Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs text-[#57534E] dark:text-stone-300">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-[#1E1B18]/80 p-3.5 rounded-2xl border border-[#E8E2D5] dark:border-[#332E29]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant digital FSSAI temperature dispatch logs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-[#1E1B18]/80 p-3.5 rounded-2xl border border-[#E8E2D5] dark:border-[#332E29]">
                <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated Section 80G tax receipt generation</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box (5 cols) with 3D Tilt & Animated Counters */}
          <TiltCard className="lg:col-span-5 bg-white dark:bg-[#1E1B18] border border-[#E8E2D5] dark:border-[#332E29] p-6 rounded-2xl shadow-xs space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400">
              Your Projected 30-Day Impact
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[#78716C] dark:text-stone-400">Monthly Meals Rescued</div>
                <div className="text-2xl font-extrabold text-[#1C1917] dark:text-white font-display mt-0.5">
                  <AnimatedNumber value={monthlyMeals} duration={600} />
                </div>
              </div>

              <div>
                <div className="text-xs text-[#78716C] dark:text-stone-400">Est. 80G Tax Credit</div>
                <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-display mt-0.5">
                  <AnimatedNumber value={monthlyTaxRebate} prefix="₹" duration={600} />
                </div>
              </div>

              <div>
                <div className="text-xs text-[#78716C] dark:text-stone-400">GHG Emiss. Prevented</div>
                <div className="text-xl font-extrabold text-teal-700 dark:text-teal-400 font-display mt-0.5">
                  <AnimatedNumber value={monthlyCo2SavedKg} suffix=" kg CO₂" duration={600} />
                </div>
              </div>

              <div>
                <div className="text-xs text-[#78716C] dark:text-stone-400">Shelters Supported</div>
                <div className="text-xl font-extrabold text-amber-700 dark:text-amber-400 font-display mt-0.5">
                  <AnimatedNumber value={sheltersSupported} suffix=" Centers" duration={600} />
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                createRipple(e);
                spawnSparkles(e.clientX, e.clientY, 8);
                triggerConfetti();
                setActiveTab('donor');
              }}
              className="w-full btn-warm-primary py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-xs relative overflow-hidden active:scale-95"
            >
              <span>Activate Surplus Donation with These Portions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </TiltCard>

        </div>
      </section>

      {/* ========================================================
          LIVE SURPLUS DROPS FEED & RADAR VIEW
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1917] dark:text-white flex items-center gap-2 font-display">
              <Flame className="w-5 h-5 text-amber-600 fill-amber-500" />
              <span>Active Surplus Drops Requiring Urgent Pickup</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-stone-400">
              Commercial kitchens with immediate pickup deadlines. 1-click rescue for verified recipients.
            </p>
          </div>

          {/* Search, Filter Pills & Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5">
              {['ALL', 'Bakery', 'Cooked', 'Produce'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white dark:bg-[#2C2723] text-[#57534E] dark:text-stone-300 border border-[#E8E2D5] dark:border-[#332E29] hover:bg-[#FAF7F0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search food or locality..."
                className="pl-8 pr-3 py-1.5 rounded-full border border-[#E8E2D5] dark:border-[#332E29] bg-white dark:bg-[#1E1B18] text-xs text-[#1C1917] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/40 w-48 shadow-2xs"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-0.5 bg-[#FAF7F0] dark:bg-[#1E1B18] rounded-full border border-[#E8E2D5] dark:border-[#332E29]">
              <button
                onClick={() => setLandingViewMode('grid')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  landingViewMode === 'grid'
                    ? 'bg-white dark:bg-[#2C2723] text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-[#78716C] dark:text-stone-400 hover:text-[#1C1917]'
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setLandingViewMode('map')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  landingViewMode === 'map'
                    ? 'bg-white dark:bg-[#2C2723] text-teal-700 dark:text-teal-300 shadow-xs'
                    : 'text-[#78716C] dark:text-stone-400 hover:text-[#1C1917]'
                }`}
              >
                <Compass className="w-3 h-3" />
                <span>Live Radar</span>
              </button>
            </div>
          </div>
        </div>

        {landingViewMode === 'map' ? (
          <InteractiveMap />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeDrops.slice(0, 6).map(drop => (
              <TiltCard 
                key={drop.id}
                className="rounded-2xl overflow-hidden border border-[#E8E2D5] dark:border-[#332E29] bg-white dark:bg-[#24201D] shadow-xs hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between group"
              >
                <div className="relative h-48 overflow-hidden bg-[#FAF7F0] dark:bg-stone-800">
                  <img 
                    src={drop.image} 
                    alt={drop.itemName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Donor Avatar and Name Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-[#1C1917]/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#1C1917] dark:text-white flex items-center gap-1.5 shadow-2xs border border-[#E8E2D5] dark:border-[#332E29]">
                    <span>{drop.donorAvatar}</span>
                    <span className="truncate max-w-[130px]">{drop.donorName}</span>
                  </div>

                  {/* Pickup Countdown Timer Tag */}
                  <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-2xs flex items-center gap-1 animate-pulse">
                    <Clock className="w-3 h-3" />
                    <span>{drop.deadlineHoursLeft}h left</span>
                  </div>

                  {/* Temperature Storage Tag */}
                  {drop.temp && (
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-cyan-400" />
                      <span>{drop.temp}</span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#78716C] dark:text-stone-400 mb-1.5">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 text-[11px]">
                        {drop.servings} Servings
                      </span>
                      <span className="flex items-center gap-1 font-medium text-[#44403C] dark:text-stone-300 text-xs">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {drop.location}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-[#1C1917] dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {drop.itemName}
                    </h3>
                    <p className="mt-2 text-xs text-[#57534E] dark:text-stone-300 line-clamp-2 leading-relaxed font-normal">
                      {drop.notes}
                    </p>
                  </div>

                  {/* Dietary & Verification Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {drop.dietary?.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF7F0] dark:bg-[#2C2723] text-[#57534E] dark:text-stone-300 border border-[#E8E2D5] dark:border-[#332E29] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-[#E8E2D5] dark:border-[#332E29] flex items-center justify-between">
                    <div className="text-[11px] text-[#78716C] dark:text-stone-400">
                      Window: <span className="font-bold text-[#1C1917] dark:text-white">{drop.pickupDeadline}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        createRipple(e);
                        spawnSparkles(e.clientX, e.clientY, 8);
                        handleClaim(drop.id, drop.itemName);
                      }}
                      className="btn-warm-primary px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-2xs relative overflow-hidden active:scale-95"
                    >
                      <span>1-Click Claim</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================
          HOW KINDLINK WORKS (3-Stage Visual Pipeline)
          ======================================================== */}
      <section className="p-8 sm:p-12 rounded-3xl space-y-10 bg-[#FAF7F0]/80 dark:bg-[#24201D]/80 border border-[#E8E2D5] dark:border-[#332E29] shadow-xs">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <span>Fast • Safe • Verifiable</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] dark:text-white font-display">
            How KindLink Eliminates Food Waste in 3 Steps
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-stone-400 font-normal">
            Engineered to bypass administrative delays so hot surplus reaches community plates before expiry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-[#1E1B18] p-6 rounded-2xl border border-[#E8E2D5] dark:border-[#332E29] space-y-4 shadow-xs hover:shadow-sm transition-all">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-lg font-extrabold shadow-2xs font-display">
              1
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#1C1917] dark:text-white">
                Commercial Donor Posts in 30s
              </h3>
              <p className="text-xs text-[#57534E] dark:text-stone-300 mt-2 leading-relaxed font-normal">
                Chefs or managers take a quick photo, specify approximate servings, temperature tier, and a strict pickup deadline.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Instant FSSAI Digital Log</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-[#1E1B18] p-6 rounded-2xl border border-[#E8E2D5] dark:border-[#332E29] space-y-4 shadow-xs hover:shadow-sm transition-all">
            <div className="w-11 h-11 rounded-2xl bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center text-lg font-extrabold shadow-2xs font-display">
              2
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#1C1917] dark:text-white">
                1-Click Geofenced Shelter Claim
              </h3>
              <p className="text-xs text-[#57534E] dark:text-stone-300 mt-2 leading-relaxed font-normal">
                Nearest verified Delhi NGOs receive an instant WhatsApp/SMS notification and can lock the food drop with a single tap.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Human Match Latency</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-[#1E1B18] p-6 rounded-2xl border border-[#E8E2D5] dark:border-[#332E29] space-y-4 shadow-xs hover:shadow-sm transition-all">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center text-lg font-extrabold shadow-2xs font-display">
              3
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#1C1917] dark:text-white">
                Thermal Transit & Tax Receipt
              </h3>
              <p className="text-xs text-[#57534E] dark:text-stone-300 mt-2 leading-relaxed font-normal">
                Courier arrives with insulated thermal gear. Upon OTP delivery, donor receives an automated Section 80G tax certificate.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Tax Deductible Compliance</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SPOTLIGHT: VERIFIED DELHI NGOS PREVIEW
          ======================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1917] dark:text-white font-display">
              Featured Delhi Grassroots Partners
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-stone-400">
              Verified non-profits providing hot meals, pediatric support, and night shelters across the National Capital Region.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('ngo')}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <span>View All 20 Verified Delhi NGOs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightNgos.map(ngo => (
            <TiltCard 
              key={ngo.id} 
              className="beige-card p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:shadow-warm-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300/60 dark:border-emerald-800">
                    {ngo.category}
                  </span>
                  <span className="text-xs font-bold text-[#78716C] dark:text-stone-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {ngo.area}
                  </span>
                </div>

                <h3 className="mt-3 font-extrabold text-base text-[#1C1917] dark:text-white leading-snug">
                  {ngo.name}
                </h3>
                <p className="text-xs text-[#57534E] dark:text-stone-300 mt-1 line-clamp-2">
                  {ngo.cause}
                </p>

                {/* Urgent Need progress bar */}
                {ngo.urgentNeed && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs">
                    <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1 mb-1">
                      <Flame className="w-3.5 h-3.5 text-amber-600" />
                      <span>Emergency Need: {ngo.urgentNeed.item}</span>
                    </div>
                    <div className="w-full h-1.5 bg-amber-200 dark:bg-amber-900 rounded-full overflow-hidden mt-1.5">
                      <div 
                        className="h-full bg-amber-600 rounded-full" 
                        style={{ width: `${Math.round((ngo.urgentNeed.collected / ngo.urgentNeed.target) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E6DFD1] dark:border-[#38332E] flex items-center justify-between gap-2">
                <a
                  href={`https://wa.me/${ngo.phone?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(ngo.name)},%20we%20would%20like%20to%20support%20via%20KindLink.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    createRipple(e);
                    spawnSparkles(e.clientX, e.clientY, 5);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1 transition-colors relative overflow-hidden active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={(e) => {
                    createRipple(e);
                    spawnSparkles(e.clientX, e.clientY, 7);
                    setCurrentNgo(ngo);
                    setSupportModalOpen(true);
                  }}
                  className="btn-warm-primary px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs relative overflow-hidden active:scale-95"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Support NGO</span>
                </button>
              </div>

            </TiltCard>
          ))}
        </div>
      </section>

      {/* ========================================================
          GROUND REALITY: DELHI GRASSROOTS IN ACTION PHOTO SHOWCASE
          ======================================================== */}
      <section className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2.5 border border-emerald-300/80 dark:border-emerald-700/60 shadow-xs">
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>KindLink Verified Ground Verifications</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] dark:text-white font-display">
              Ground Reality: Delhi Grassroots in Action
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-stone-300 max-w-2xl mt-1">
              Authentic on-site photographs from verified Delhi NGOs, open-air night schools, stationery distributions, and environmental clean-up drives across NCR.
            </p>
          </div>

          {/* Photo Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF7F0] dark:bg-[#25201C] rounded-full border border-[#E8E2D5] dark:border-[#38332E] self-start lg:self-end">
            {[
              { id: 'ALL', label: 'All 5 Drives' },
              { id: 'Education', label: '📚 Night Schools & Literacy' },
              { id: 'Environment', label: '🌿 Clean-up & Waste' },
              { id: 'Children', label: '🎒 Stationery & Relief' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPhotoCategory(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  photoCategory === tab.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-[#57534E] dark:text-stone-300 hover:text-[#1C1917] hover:bg-[#EFE8DA] dark:hover:bg-[#322B25]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Editorial Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(GROUND_IMPACT_STORIES || [])
            .filter(story => {
              if (photoCategory === 'ALL') return true;
              if (photoCategory === 'Education' && (story.category.includes('Literacy') || story.category.includes('Learning') || story.category.includes('Education'))) return true;
              if (photoCategory === 'Environment' && (story.category.includes('Environmental') || story.category.includes('Waste') || story.category.includes('Clean-up') || story.category.includes('Mobilization'))) return true;
              if (photoCategory === 'Children' && (story.category.includes('Relief') || story.category.includes('Shelter') || story.category.includes('Stationery') || story.category.includes('Child'))) return true;
              return true;
            })
            .map((story) => {
              const matchedNgo = DELHI_NGOS.find(n => n.id === story.ngoId) || { name: story.ngoName, cause: story.category };
              const cleanDigits = story.phone ? story.phone.replace(/[^0-9]/g, '') : null;
              const waUrl = cleanDigits
                ? `https://wa.me/${cleanDigits}?text=${encodeURIComponent(`Hello ${story.ngoName}, I saw your ${story.title} field drive on KindLink and would like to support your immediate requirement!`)}`
                : null;

              return (
                <TiltCard
                  key={story.id}
                  className="rounded-3xl overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300 border border-[#E8E2D5] dark:border-[#332E29] bg-white dark:bg-[#24201D] shadow-xs"
                >
                  <div>
                    {/* Cropped Photo Container with Zoom Hover */}
                    <div 
                      onClick={() => setActivePhotoModal(story)}
                      className="relative h-56 overflow-hidden bg-stone-900 cursor-pointer"
                    >
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-emerald-400/40 flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{story.badge}</span>
                        </span>

                        <span className="bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {story.regdNo}
                        </span>
                      </div>

                      {/* Bottom Image Overlay Strip */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                        <div>
                          <p className="text-[11px] font-semibold text-emerald-300 drop-shadow-xs">
                            📍 {story.location}
                          </p>
                          <p className="text-[10px] text-stone-300 font-medium">
                            {story.area}
                          </p>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            createRipple(e);
                            spawnSparkles(e.clientX, e.clientY, 5);
                            setActivePhotoModal(story);
                          }}
                          className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-white text-[10px] font-bold flex items-center gap-1 border border-white/20 backdrop-blur-xs transition-colors relative overflow-hidden active:scale-95"
                        >
                          <ZoomIn className="w-3 h-3" />
                          <span>Expand</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          {story.category}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          {story.impactMetric}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-[#1C1917] dark:text-white font-display group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-xs font-semibold text-[#57534E] dark:text-stone-300 mt-0.5 flex items-center gap-1">
                          <span>{story.ngoName}</span>
                          <span className="text-emerald-600">✓</span>
                        </p>
                      </div>

                      <p className="text-xs text-[#57534E] dark:text-stone-300 line-clamp-3 leading-relaxed font-normal">
                        {story.description}
                      </p>

                      {/* Urgent Need in Drive */}
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-300/80 dark:border-amber-800/80 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 dark:text-amber-300">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-600" />
                            Target Need:
                          </span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/80 font-bold">
                            Active Drive
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-[#292524] dark:text-stone-200">
                          {story.urgentNeed}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-[#E8E2D5] dark:border-[#332E29] mt-2">
                    {waUrl && (
                      <button
                        onClick={(e) => {
                          createRipple(e);
                          spawnSparkles(e.clientX, e.clientY, 5);
                          window.open(waUrl, '_blank');
                        }}
                        className="px-3.5 py-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors relative overflow-hidden active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Coordinator</span>
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        createRipple(e);
                        spawnSparkles(e.clientX, e.clientY, 7);
                        setCurrentNgo(matchedNgo);
                        setSupportModalOpen(true);
                      }}
                      className="btn-warm-primary flex-1 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs relative overflow-hidden active:scale-95"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Support Drive</span>
                    </button>
                  </div>
                </TiltCard>
              );
            })}
        </div>
      </section>

      {/* ========================================================
          TRUST & QUALITY CERTIFICATION GUARANTEE
          ======================================================== */}
      <section className="rounded-3xl border border-[#E8E2D5] dark:border-[#332E29] bg-white dark:bg-[#1E1B18] p-8 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#E8E2D5] dark:divide-[#332E29]">
          
          <div className="space-y-2 px-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto text-lg font-bold">
              🛡️
            </div>
            <h4 className="font-extrabold text-sm text-[#1C1917] dark:text-white">FSSAI Guideline Compliant</h4>
            <p className="text-xs text-[#57534E] dark:text-stone-400">Strict temperature holding controls and safe food transport protocols.</p>
          </div>

          <div className="space-y-2 px-4 pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center mx-auto text-lg font-bold">
              📜
            </div>
            <h4 className="font-extrabold text-sm text-[#1C1917] dark:text-white">Section 80G Tax Certificates</h4>
            <p className="text-xs text-[#57534E] dark:text-stone-400">Automated digital tax deduction receipts issued upon verified delivery.</p>
          </div>

          <div className="space-y-2 px-4 pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto text-lg font-bold">
              ⚡
            </div>
            <h4 className="font-extrabold text-sm text-[#1C1917] dark:text-white">Zero Platform Commission</h4>
            <p className="text-xs text-[#57534E] dark:text-stone-400">100% of donor food and pledged resources pass directly to the shelter.</p>
          </div>

          <div className="space-y-2 px-4 pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto text-lg font-bold">
              🔍
            </div>
            <h4 className="font-extrabold text-sm text-[#1C1917] dark:text-white">20 Verified Delhi NGOs</h4>
            <p className="text-xs text-[#57534E] dark:text-stone-400">Vetted non-profit registration numbers with direct ground contacts.</p>
          </div>

        </div>
      </section>

      {/* Lightbox Ground Photo Modal */}
      {activePhotoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setActivePhotoModal(null)}
        >
          <div 
            className="bg-[#FAF7F0] dark:bg-[#201D1A] border-2 border-[#D8CEBD] dark:border-[#3E3832] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Preview Header */}
            <div className="relative bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
              <img 
                src={activePhotoModal.image} 
                alt={activePhotoModal.title} 
                className="w-full h-full max-h-[60vh] object-contain"
              />
              <button
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 transition-colors shadow-lg cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-emerald-600/95 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-400/40 shadow-sm">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{activePhotoModal.badge}</span>
                </span>
                <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                  {activePhotoModal.regdNo}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 text-white text-xs bg-black/60 backdrop-blur-xs px-3 py-1 rounded-lg">
                📍 {activePhotoModal.location}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6DFD1] dark:border-[#38332E] pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                    {activePhotoModal.category} • {activePhotoModal.area}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C1917] dark:text-white font-display mt-0.5">
                    {activePhotoModal.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-semibold mt-0.5">
                    Coordinated by <span className="font-bold text-[#1C1917] dark:text-white">{activePhotoModal.ngoName}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="inline-block px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold border border-emerald-300">
                    {activePhotoModal.impactMetric}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#44403C] dark:text-stone-300 leading-relaxed">
                {activePhotoModal.description}
              </p>

              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-extrabold text-amber-900 dark:text-amber-300">Immediate Need: </span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{activePhotoModal.urgentNeed}</span>
                  </div>
                </div>
                {activePhotoModal.phone && (
                  <span className="text-[11px] font-mono font-bold text-stone-600 dark:text-stone-400 shrink-0">
                    ☎ {activePhotoModal.phone}
                  </span>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActivePhotoModal(null)}
                  className="btn-warm-secondary px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  Close Photo
                </button>

                <div className="flex items-center gap-2">
                  {activePhotoModal.phone && (
                    <a
                      href={`https://wa.me/${activePhotoModal.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${activePhotoModal.ngoName}, I viewed your ${activePhotoModal.title} on KindLink and want to contribute!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Coordinator</span>
                    </a>
                  )}

                  <button
                    onClick={() => {
                      const match = DELHI_NGOS.find(n => n.id === activePhotoModal.ngoId);
                      if (match) {
                        setCurrentNgo(match);
                        setSupportModalOpen(true);
                        setActivePhotoModal(null);
                      }
                    }}
                    className="btn-warm-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Support Initiative</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
