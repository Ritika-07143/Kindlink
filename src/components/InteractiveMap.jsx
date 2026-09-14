import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import KindLinkLogo from './KindLinkLogo';
import { triggerConfetti } from '../utils/confetti';
import { MapPin, Navigation, Clock, ShieldCheck, Zap, Compass, CheckCircle2, Eye, X } from 'lucide-react';

export default function InteractiveMap() {
  const { drops, claimDrop, setActiveTab, showToast } = useApp();
  const [selectedPin, setSelectedPin] = useState(null);
  const [radiusFilter, setRadiusFilter] = useState('3mi'); // '1mi' | '3mi' | '5mi'

  // Coordinates on a 100% normalized canvas tailored for Delhi NCR
  const MAP_NODES = [
    {
      id: 'node-drop-1',
      type: 'drop',
      name: 'Artisan Hearth (Hauz Khas)',
      dropRef: drops[0],
      x: 42,
      y: 58,
      servings: 60,
      item: '45 Sourdough Loaves & Croissants',
      deadline: '2.2h left',
      status: drops[0]?.status || 'Available',
      locality: 'Hauz Khas Village'
    },
    {
      id: 'node-drop-2',
      type: 'drop',
      name: 'The Imperial Spice (CP)',
      dropRef: drops[1],
      x: 52,
      y: 28,
      servings: 80,
      item: '35 Trays Dal Makhani & Rice',
      deadline: '1.7h left',
      status: drops[1]?.status || 'Available',
      locality: 'Connaught Place Block M'
    },
    {
      id: 'node-drop-3',
      type: 'drop',
      name: 'Green Farm Organics (Saket)',
      dropRef: drops[2],
      x: 62,
      y: 72,
      servings: 120,
      item: '12 Crates Fresh Apples & Greens',
      deadline: '3.2h left',
      status: drops[2]?.status || 'Claimed',
      locality: 'Saket City Centre'
    },
    {
      id: 'node-ngo-1',
      type: 'shelter',
      name: 'Uday Foundation (AIIMS Ward)',
      x: 48,
      y: 50,
      needs: '150 Dinners for Patient Families',
      verified: true,
      avatar: '🍲',
      locality: 'Sarvodaya Enclave / AIIMS'
    },
    {
      id: 'node-ngo-2',
      type: 'shelter',
      name: 'Salaam Baalak Trust (Paharganj)',
      x: 32,
      y: 35,
      needs: '80 Meals for Street Children',
      verified: true,
      avatar: '🏠',
      locality: 'Paharganj Railway Station'
    },
    {
      id: 'node-ngo-3',
      type: 'shelter',
      name: 'Hamari Pahchan NGO (Mahipalpur)',
      x: 22,
      y: 68,
      needs: '60 Dry Ration Packs',
      verified: true,
      avatar: '✨',
      locality: 'Mahipalpur Cluster'
    },
    {
      id: 'node-ngo-4',
      type: 'shelter',
      name: 'Blessings NGO (Okhla)',
      x: 75,
      y: 55,
      needs: '35 Infant Fruit Crates',
      verified: true,
      avatar: '💖',
      locality: 'Okhla Industrial Area'
    }
  ];

  const handlePinClaim = (node) => {
    if (node.dropRef) {
      claimDrop(node.dropRef.id, 'Uday Foundation (AIIMS Ward)');
      triggerConfetti();
      showToast(`🎉 Claimed "${node.item}" on radar! Dispatch driver assigned.`);
      setSelectedPin(null);
    }
  };

  return (
    <div className="beige-card rounded-3xl p-5 sm:p-6 shadow-warm-md relative overflow-hidden space-y-4 text-[#1C1917] dark:text-white">
      
      {/* Top Map Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-[#1C1917] dark:text-white flex items-center gap-2 font-display">
              <span>Delhi NCR Geographic Rescue Radar</span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-ping"></span>
            </h3>
            <p className="text-[11px] text-[#78716C] dark:text-stone-400">
              Interactive telemetry linking active donor kitchens with verified Delhi shelters.
            </p>
          </div>
        </div>

        {/* Radius Filter & Legend */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Commercial Surplus
            </span>
            <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Verified Shelter
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#FAF7F0] dark:bg-[#1E1B18] p-1 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] text-xs">
            <span className="text-[10px] text-[#78716C] px-2 font-bold">Radius:</span>
            {['1mi', '3mi', '5mi'].map(r => (
              <button
                key={r}
                onClick={() => setRadiusFilter(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  radiusFilter === r 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'text-[#78716C] dark:text-stone-400 hover:text-[#1C1917]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Radar Canvas */}
      <div className="relative h-80 sm:h-96 w-full rounded-2xl bg-[#FAF5EE] dark:bg-[#151311] border border-[#E6DFD1] dark:border-[#38332E] overflow-hidden select-none">
        
        {/* Radar grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(180,150,110,0.25)_1px,transparent_1px)] [background-size:24px_24px] opacity-60 dark:opacity-20"></div>

        {/* Concentric Radar Distance Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 rounded-full border border-emerald-600/20 dark:border-emerald-500/15"></div>
          <div className="w-80 h-80 rounded-full border border-emerald-600/15 dark:border-emerald-500/10"></div>
          <div className="w-[450px] h-[450px] rounded-full border border-emerald-600/10 dark:border-emerald-500/5"></div>
        </div>

        {/* Central Delhi Hub Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
          <KindLinkLogo size="xs" variant="icon" />
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mt-1 bg-white/90 dark:bg-black/80 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
            Delhi Central Hub
          </span>
        </div>

        {/* Radar Sweep Beam */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-full h-full max-w-[500px] max-h-[500px] radar-sweep rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, transparent 315deg, rgba(21, 128, 61, 0.15) 360deg)'
            }}
          ></div>
        </div>

        {/* Telemetry Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="42%" y1="58%" x2="48%" y2="50%" stroke="#15803D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="52%" y1="28%" x2="32%" y2="35%" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="62%" y1="72%" x2="75%" y2="55%" stroke="#15803D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        </svg>

        {/* Interactive Map Nodes / Pins */}
        {MAP_NODES.map(node => {
          const isSelected = selectedPin?.id === node.id;
          const isDrop = node.type === 'drop';

          return (
            <button
              key={node.id}
              onClick={() => setSelectedPin(node)}
              style={{ top: `${node.y}%`, left: `${node.x}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none transition-all ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              <div className="relative">
                {/* Ping wave */}
                <span className={`animate-ping absolute inset-0 rounded-full opacity-60 ${
                  isDrop ? 'bg-emerald-500' : 'bg-amber-500'
                }`}></span>

                {/* Node marker pin */}
                <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs shadow-md border-2 transition-colors ${
                  isDrop
                    ? 'bg-emerald-700 text-white border-white dark:border-[#1E1B18]'
                    : 'bg-amber-600 text-white border-white dark:border-[#1E1B18]'
                }`}>
                  {isDrop ? '🥘' : node.avatar || '🏠'}
                </div>

                {/* Compact label pill */}
                <span className="hidden sm:block absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white/95 dark:bg-[#1E1B18]/95 text-[#1C1917] dark:text-white border border-[#E6DFD1] dark:border-[#3E3832] shadow-xs">
                  {node.locality}
                </span>
              </div>
            </button>
          );
        })}

        {/* Interactive Node Details Drawer (when a node is clicked) */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 beige-card p-4 rounded-2xl shadow-warm-lg border-2 border-emerald-600/40 animate-slide-up">
            <div className="flex items-start justify-between gap-2 border-b border-[#E6DFD1] dark:border-[#38332E] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedPin.type === 'drop' ? '🥘' : selectedPin.avatar || '🏛️'}</span>
                <div>
                  <h4 className="font-extrabold text-xs text-[#1C1917] dark:text-white leading-tight font-display">
                    {selectedPin.name}
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                    {selectedPin.locality}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPin(null)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-2.5 text-xs text-[#57534E] dark:text-stone-300 space-y-1">
              {selectedPin.type === 'drop' ? (
                <>
                  <div className="font-extrabold text-[#1C1917] dark:text-white">{selectedPin.item}</div>
                  <div className="flex items-center justify-between text-[11px] pt-1 text-[#78716C]">
                    <span>{selectedPin.servings} Servings</span>
                    <span className="text-amber-700 font-bold">{selectedPin.deadline}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-amber-700 dark:text-amber-400 font-bold">Urgent Deficit:</div>
                  <p className="text-[11px] text-[#1C1917] dark:text-white font-medium">{selectedPin.needs}</p>
                </>
              )}
            </div>

            <div className="pt-2 border-t border-[#E6DFD1] dark:border-[#38332E]">
              {selectedPin.type === 'drop' ? (
                <button
                  onClick={() => handlePinClaim(selectedPin)}
                  className="w-full btn-warm-primary py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>1-Click Rescue This Drop</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveTab('donor');
                    setSelectedPin(null);
                  }}
                  className="w-full btn-warm-secondary py-2 rounded-xl text-xs flex items-center justify-center gap-1"
                >
                  <span>Post Surplus for This Shelter</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
