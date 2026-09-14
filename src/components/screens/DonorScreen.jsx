import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import KindLinkLogo from '../KindLinkLogo';
import { triggerConfetti } from '../../utils/confetti';
import { CAUSE_CATEGORIES } from '../../data/mockData';
import TiltCard from '../animations/TiltCard';
import { createRipple, spawnSparkles } from '../../utils/animations';
import { 
  Utensils, 
  Clock, 
  Camera, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  AlertCircle,
  PlusCircle,
  Building,
  Heart,
  Eye,
  Thermometer,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function DonorScreen() {
  const { drops, addDrop, setActiveTab, showToast } = useApp();

  const [selectedCause, setSelectedCause] = useState('food');
  
  // Surplus Drop Form State
  const [itemName, setItemName] = useState('45 Fresh Sourdough Loaves & Croissants');
  const [donorName, setDonorName] = useState('Artisan Hearth Bakery');
  const [donorType, setDonorType] = useState('Bakery & Cafe');
  const [servings, setServings] = useState(45);
  const [foodType, setFoodType] = useState('Bakery / Pastry');
  const [pickupDeadline, setPickupDeadline] = useState('Today before 9:30 PM (2h left)');
  const [deadlineHours, setDeadlineHours] = useState(2.0);
  const [location, setLocation] = useState('Hauz Khas Village, 1.8 km');
  const [storageTemp, setStorageTemp] = useState('Chilled (4°C)');
  const [notes, setNotes] = useState('Freshly prepared and packed in food-grade kraft boxes.');
  const [safetyChecked, setSafetyChecked] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  // Quick Preset Profiles for Delhi Donors
  const PRESET_PROFILES = [
    {
      title: 'Buffet Overrun',
      icon: '🍛',
      donor: 'The Imperial Spice',
      item: '35 Trays Hot Dal Makhani & Jeera Rice',
      servings: 70,
      type: 'Italian Restaurant',
      temp: 'Hot Steam Pan (> 65°C)',
      loc: 'Connaught Place Block M',
      deadline: 'Today before 10:00 PM (1.8h left)',
      img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Artisan Bakery',
      icon: '🥐',
      donor: 'Artisan Hearth Bakery',
      item: '45 Fresh Sourdough Loaves & Croissants',
      servings: 45,
      type: 'Bakery & Cafe',
      temp: 'Room Temperature / Shelf-stable',
      loc: 'Hauz Khas Village',
      deadline: 'Today before 9:30 PM (2h left)',
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Packed Lunches',
      icon: '🍱',
      donor: 'Aerocity Lounge Kitchen',
      item: '50 Boxed Indian Thali Lunches',
      servings: 50,
      type: 'Corporate Catering',
      temp: 'Chilled (< 4°C)',
      loc: 'Aerocity Hospitality District',
      deadline: 'Today before 8:30 PM (1.5h left)',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Farm Produce',
      icon: '🥦',
      donor: 'Green Farm Organics',
      item: '12 Crates Fresh Apples & Salad Greens',
      servings: 120,
      type: 'Grocery / Supermarket',
      temp: 'Chilled (< 4°C)',
      loc: 'Saket City Centre',
      deadline: 'Today before 11:00 PM (3.2h left)',
      img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Sample photo presets
  const PHOTO_PRESETS = [
    { label: 'Fresh Bakery / Pastries', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
    { label: 'Hot Pasta / Cooked Trays', url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80' },
    { label: 'Fresh Fruits & Veggies', url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80' },
    { label: 'Boxed Bento Lunches', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80' },
  ];
  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_PRESETS[0].url);

  const applyPreset = (p) => {
    setDonorName(p.donor);
    setItemName(p.item);
    setServings(p.servings);
    setDonorType(p.type);
    setStorageTemp(p.temp);
    setLocation(p.loc);
    setPickupDeadline(p.deadline);
    setSelectedPhoto(p.img);
    showToast(`⚡ Loaded "${p.title}" preset template!`);
  };

  const handlePostDrop = (e) => {
    e.preventDefault();
    if (!itemName) return;

    setIsPublishing(true);
    setTimeout(() => {
      addDrop({
        donorName,
        donorType,
        donorAvatar: '🥘',
        itemName,
        servings: Number(servings),
        foodType,
        pickupDeadline,
        deadlineHoursLeft: deadlineHours,
        location,
        temp: storageTemp,
        image: selectedPhoto,
        notes: notes || 'Stored in food-grade packaging. Ready for immediate collection.',
        dietary: ['Freshly Prepared', 'Commercial Kitchen Inspected', 'FSSAI Compliant'],
      });

      triggerConfetti();
      showToast(`🎉 Food drop "${itemName}" broadcast live to Delhi shelters!`);
      setIsPublishing(false);
      setActiveTab('receiver');
    }, 600);
  };

  const myPostedDrops = drops.slice(0, 3);

  return (
    <div className="space-y-12 py-6 animate-fade-in text-[#1C1917] dark:text-white">
      
      {/* Header */}
      <div className="border-b border-[#E6DFD1] dark:border-[#38332E] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2 border border-emerald-300 dark:border-emerald-700/60 shadow-xs">
            <KindLinkLogo size="xs" variant="icon" />
            <span>Delhi NCR Commercial Food Surplus Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] dark:text-white font-display">
            Post Available Surplus Food Drop
          </h1>
          <p className="text-sm text-[#57534E] dark:text-stone-300 mt-1 max-w-2xl">
            For Delhi restaurants, bakeries, caterers, and supermarkets. Posts appear on the live receiver feed instantly with automatic Section 80G tax receipt generation.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('receiver')}
          className="btn-warm-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0"
        >
          <Eye className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>View Live Shelter Feed</span>
        </button>
      </div>

      {/* 1-Click Quick Kitchen Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-stone-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>1-Click Commercial Presets (Fast Fill)</span>
          </label>
          <span className="text-[11px] text-[#78716C] dark:text-stone-400">Click any card to auto-fill form</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PRESET_PROFILES.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                createRipple(e);
                spawnSparkles(e.clientX, e.clientY, 6);
                applyPreset(p);
              }}
              className="beige-card p-3.5 rounded-2xl text-left hover:border-emerald-600 transition-all group relative overflow-hidden active:scale-95"
            >
              <div className="text-2xl mb-1.5">{p.icon}</div>
              <div className="font-extrabold text-xs text-[#1C1917] dark:text-white group-hover:text-emerald-700 transition-colors">
                {p.title}
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">
                {p.servings} Portions • {p.loc.split(' ')[0]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form Column + Live Card Preview Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 beige-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm-sm">
          <div>
            <h2 className="text-xl font-extrabold text-[#1C1917] dark:text-white flex items-center gap-2 font-display">
              <Utensils className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <span>Surplus Drop Specifications</span>
            </h2>
            <p className="text-xs text-[#57534E] dark:text-stone-400 mt-1">
              Specify portions and expiry deadline to alert nearest verified night shelters.
            </p>
          </div>

          <form onSubmit={handlePostDrop} className="space-y-4 text-xs">
            
            {/* Donor Entity Name & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Establishment Name
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Kitchen Category
                </label>
                <select
                  value={donorType}
                  onChange={(e) => setDonorType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                >
                  <option>Bakery & Cafe</option>
                  <option>Italian Restaurant</option>
                  <option>Corporate Catering</option>
                  <option>Grocery / Supermarket</option>
                  <option>Hotel Buffet Dining</option>
                </select>
              </div>
            </div>

            {/* Item Title */}
            <div>
              <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                Surplus Item Name & Approximate Description
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. 50 Fresh Croissants & Sourdough Loaves"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                required
              />
            </div>

            {/* Servings & Storage Temperature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Approx. Servings (Meals)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                    required
                  />
                  <span className="text-xs text-[#78716C] dark:text-stone-400 font-semibold whitespace-nowrap">portions</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Storage Condition (FSSAI)
                </label>
                <select
                  value={storageTemp}
                  onChange={(e) => setStorageTemp(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                >
                  <option>Room Temperature / Shelf-stable</option>
                  <option>Hot Steam Pan (&gt; 65°C)</option>
                  <option>Chilled / Refrigerated (&lt; 4°C)</option>
                  <option>Frozen Solid (-18°C)</option>
                </select>
              </div>
            </div>

            {/* Location & Strict Pickup Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Delhi Pickup Locality
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Hauz Khas Village, 1.8 km"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Strict Pickup Deadline
                </label>
                <input
                  type="text"
                  value={pickupDeadline}
                  onChange={(e) => setPickupDeadline(e.target.value)}
                  placeholder="e.g. Today before 9:30 PM (2h left)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
              </div>
            </div>

            {/* Photo Selection */}
            <div>
              <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1.5">
                Select Photo Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PHOTO_PRESETS.map((photo, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedPhoto(photo.url)}
                    className={`relative rounded-xl overflow-hidden h-16 border-2 transition-all group ${
                      selectedPhoto === photo.url 
                        ? 'border-emerald-600 ring-2 ring-emerald-600/30' 
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/80 text-[9px] text-white py-0.5 px-1 truncate text-center font-bold">
                      {photo.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Packaging notes */}
            <div>
              <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                Collection & Entry Notes
              </label>
              <textarea
                rows="2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Rear service entrance on alleyway. Pre-packed in thermal boxes."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
              />
            </div>

            {/* Food Safety Guarantee */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="safety-check"
                checked={safetyChecked}
                onChange={(e) => setSafetyChecked(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-emerald-700 cursor-pointer"
                required
              />
              <label htmlFor="safety-check" className="text-xs text-[#57534E] dark:text-stone-300 cursor-pointer font-medium">
                <strong>FSSAI Safety Compliance Pledge:</strong> I verify that all surplus items were prepared in a licensed commercial kitchen and stored within prescribed safe food temperature zones.
              </label>
            </div>

            {/* Publish Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPublishing}
                onClick={(e) => {
                  createRipple(e);
                  spawnSparkles(e.clientX, e.clientY, 8);
                }}
                className="w-full btn-warm-primary py-3.5 rounded-xl text-xs font-bold shadow-warm-md flex items-center justify-center gap-2 relative overflow-hidden active:scale-98"
              >
                {isPublishing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Broadcasting to Nearest Delhi Shelters...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Publish Food Drop to Live Shelter Feed</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Live Card Preview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Preview Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#78716C] dark:text-stone-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Feed Preview</span>
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300">
                Updating Live
              </span>
            </div>

            {/* Card Mockup with 3D Tilt */}
            <TiltCard className="beige-card rounded-2xl overflow-hidden shadow-warm-md border-2 border-emerald-600/40">
              <div className="relative h-44 overflow-hidden bg-[#FAF7F0] dark:bg-stone-800">
                <img src={selectedPhoto} alt={itemName} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/95 dark:bg-[#1C1917]/95 px-3 py-1 rounded-full text-xs font-bold text-[#1C1917] dark:text-white flex items-center gap-1.5 shadow-sm border border-[#E6DFD1]">
                  <span>🥘</span>
                  <span className="truncate max-w-[130px]">{donorName}</span>
                </div>
                <div className="absolute top-3 right-3 bg-amber-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 animate-pulse">
                  <Clock className="w-3 h-3" />
                  <span>2.0h left</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/75 text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-cyan-400" />
                  <span>{storageTemp.split('/')[0]}</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#78716C] dark:text-stone-400">
                  <span className="font-extrabold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-300">
                    {servings} Servings
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#44403C] dark:text-stone-300">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {location}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-[#1C1917] dark:text-white leading-snug font-display">
                  {itemName || 'Your Food Drop Title'}
                </h3>
                <p className="text-xs text-[#57534E] dark:text-stone-300 line-clamp-2">
                  {notes || 'No special notes entered.'}
                </p>

                <div className="pt-3 border-t border-[#E6DFD1] dark:border-[#38332E] flex items-center justify-between">
                  <span className="text-[11px] text-[#78716C]">Deadline: <strong>{pickupDeadline}</strong></span>
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-xs">
                    1-Click Claim
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Automated 80G Tax Benefit Seal */}
          <div className="p-5 rounded-2xl bg-[#FAF7F0] dark:bg-[#1E1B18] border border-[#E6DFD1] dark:border-[#38332E] space-y-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-extrabold">
              <ShieldCheck className="w-4 h-4" />
              <span>Section 80G Tax Exemption Guarantee</span>
            </div>
            <p className="text-[#57534E] dark:text-stone-300 leading-relaxed text-[11px]">
              Upon verified delivery to a Delhi night shelter or community kitchen, your business receives an automated Section 80G tax certificate signed by KindLink Food Safety & Compliance.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-[#78716C]">
              <span>Est. Tax Deduction: <strong>₹{(servings * 45).toLocaleString()}</strong></span>
              <span className="text-emerald-700">100% Deductible</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
