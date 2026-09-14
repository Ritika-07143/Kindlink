import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import KindLinkLogo from '../KindLinkLogo';
import { triggerConfetti } from '../../utils/confetti';
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  RefreshCw,
  Sliders,
  Award,
  Navigation
} from 'lucide-react';

export default function AiMatchingScreen() {
  const { drops, showToast, setActiveTab } = useApp();

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStage, setSimulationStage] = useState(0);
  const [matchResult, setMatchResult] = useState(null);

  // Algorithm tuning weights (interactive)
  const [proximityWeight, setProximityWeight] = useState(40);
  const [urgencyWeight, setUrgencyWeight] = useState(35);
  const [perishabilityWeight, setPerishabilityWeight] = useState(25);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationStage(1);
    setMatchResult(null);

    setTimeout(() => {
      setSimulationStage(2);
    }, 700);

    setTimeout(() => {
      setSimulationStage(3);
    }, 1400);

    setTimeout(() => {
      setSimulationStage(4);
      setMatchResult({
        sourceDrop: drops[0] || {
          donorName: 'The Imperial Spice (Connaught Place)',
          itemName: '35 Trays Hot Dal Makhani & Rice',
          servings: 70,
          location: 'Connaught Place Block M'
        },
        matchedOrg: {
          name: 'Salaam Baalak Trust (Paharganj)',
          director: 'Sanjeev Kumar',
          servingsNeeded: 70,
          location: 'Paharganj Railway Station (1.4 km)',
          urgency: 'Immediate (< 1.5 hrs)',
        },
        confidenceScore: 98.6,
        metrics: {
          distanceKm: 1.4,
          transitMinutes: 11,
          foodSavedKg: 32.5,
          co2PreventedKg: 74.2,
        },
        rationale: 'Optimal thermal holding match (hot food < 1.4 km). Paharganj shelter dinner window closes in 55 mins. Zero intermediate storage needed.'
      });
      setIsSimulating(false);
      triggerConfetti();
      showToast('🤖 AI Match complete! 98.6% optimal routing compatibility score found.');
    }, 2200);
  };

  return (
    <div className="space-y-12 py-6 animate-fade-in text-[#1C1917] dark:text-white">
      
      {/* Hero / Vision Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-[#1C1917] to-teal-950 text-white p-8 sm:p-12 border-2 border-emerald-500/30 shadow-2xl">
        
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
            <KindLinkLogo size="xs" variant="icon" />
            <span>Autonomous Resource Routing Engine • Phase 2 Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            The KindLink AI Spatial Matching Agent
          </h1>

          <blockquote className="text-base sm:text-lg text-emerald-100 font-medium italic border-l-4 border-emerald-400 pl-4 py-1">
            &ldquo;Our AI Agent will intelligently match verified requests with suitable NGOs, available resources and donors.&rdquo;
          </blockquote>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-1 font-medium">
            Eliminating human latency and manual phone calls. KindLink's predictive matching agent continuously analyzes incoming surplus drops against live Delhi shelter deficits, FSSAI temperature limits, and peak traffic corridors.
          </p>

          {/* Quick Trigger Callout */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-stone-950 font-extrabold text-xs shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-stone-950" />
              <span>{isSimulating ? 'Computing Optimal Route...' : 'Simulate Live AI Match'}</span>
            </button>

            <button
              onClick={() => setActiveTab('receiver')}
              className="px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/15"
            >
              View Manual Claims Feed
            </button>
          </div>
        </div>

      </div>

      {/* Interactive AI Simulation Section */}
      <div className="beige-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6DFD1] dark:border-[#38332E]">
          <div>
            <h2 className="text-xl font-extrabold text-[#1C1917] dark:text-white flex items-center gap-2 font-display">
              <Cpu className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <span>Live Algorithm Demonstration & Neural Telemetry</span>
            </h2>
            <p className="text-xs text-[#57534E] dark:text-stone-400 mt-0.5">
              Watch how our spatial matching model pairs commercial food drops with shelter deficits in Delhi NCR.
            </p>
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>Re-run Simulation</span>
          </button>
        </div>

        {/* Algorithm Weights Tuner */}
        <div className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-[#1E1B18] border border-[#E6DFD1] dark:border-[#38332E] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#44403C] dark:text-stone-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-700" />
              <span>Algorithm Decision Weights:</span>
            </span>
            <span className="text-[11px] text-[#78716C]">Total: 100% Dynamic Allocation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div>
              <div className="flex justify-between font-semibold text-[11px] mb-1">
                <span>Distance Proximity:</span>
                <span className="font-bold text-emerald-700">{proximityWeight}%</span>
              </div>
              <input 
                type="range" min="10" max="60" value={proximityWeight}
                onChange={(e) => setProximityWeight(Number(e.target.value))}
                className="w-full accent-emerald-700 h-1.5 bg-[#E6DFD1] dark:bg-[#3E3832] rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-[11px] mb-1">
                <span>Shelter Hunger Deficit:</span>
                <span className="font-bold text-teal-700">{urgencyWeight}%</span>
              </div>
              <input 
                type="range" min="10" max="60" value={urgencyWeight}
                onChange={(e) => setUrgencyWeight(Number(e.target.value))}
                className="w-full accent-teal-700 h-1.5 bg-[#E6DFD1] dark:bg-[#3E3832] rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-[11px] mb-1">
                <span>Food Perishability Speed:</span>
                <span className="font-bold text-amber-700">{perishabilityWeight}%</span>
              </div>
              <input 
                type="range" min="10" max="60" value={perishabilityWeight}
                onChange={(e) => setPerishabilityWeight(Number(e.target.value))}
                className="w-full accent-amber-700 h-1.5 bg-[#E6DFD1] dark:bg-[#3E3832] rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Neural Matching Visualizer */}
        <div className="relative rounded-2xl bg-[#1C1917] p-6 sm:p-8 text-white overflow-hidden shadow-inner space-y-6">
          
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-mono text-emerald-400 font-bold">STATE: {isSimulating ? 'COMPUTING_GRAPH_NODES' : matchResult ? 'OPTIMAL_PAIR_FOUND' : 'IDLE_AWAITING_TRIGGER'}</span>
            <span className="text-[11px]">Delhi NCR Network: 20 Verified NGOs Linked</span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className={`p-2.5 rounded-xl border transition-all ${simulationStage >= 1 ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold' : 'border-stone-800 text-stone-500'}`}>
              1. Ingesting Drops & GPS
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${simulationStage >= 2 ? 'border-teal-500 bg-teal-950/60 text-teal-300 font-bold' : 'border-stone-800 text-stone-500'}`}>
              2. Analyzing Deficits
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${simulationStage >= 3 ? 'border-emerald-400 bg-emerald-950/80 text-emerald-200 font-bold' : 'border-stone-800 text-stone-500'}`}>
              3. Spatial Route Locked
            </div>
          </div>

          {/* Result Display */}
          {matchResult ? (
            <div className="bg-[#26221E] border-2 border-emerald-500/80 rounded-2xl p-6 space-y-4 animate-scale-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                  <h3 className="text-base font-extrabold text-white font-display">
                    High Compatibility Match Locked ({matchResult.confidenceScore}%)
                  </h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-700">
                  ETA {matchResult.metrics.transitMinutes} Minutes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1">
                  <div className="text-stone-400 font-bold uppercase text-[10px]">Donor Source</div>
                  <div className="font-extrabold text-white text-sm">{matchResult.sourceDrop.donorName}</div>
                  <div className="text-stone-300">{matchResult.sourceDrop.itemName}</div>
                  <div className="text-emerald-400 font-semibold">{matchResult.sourceDrop.servings} Servings Available</div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1">
                  <div className="text-stone-400 font-bold uppercase text-[10px]">Optimal Receiving Shelter</div>
                  <div className="font-extrabold text-white text-sm">{matchResult.matchedOrg.name}</div>
                  <div className="text-stone-300">{matchResult.matchedOrg.location}</div>
                  <div className="text-amber-400 font-semibold">{matchResult.matchedOrg.urgency}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200">
                <strong>Algorithmic Rationale:</strong> {matchResult.rationale}
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-xs text-stone-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CO₂ Offset: <strong>{matchResult.metrics.co2PreventedKg} kg</strong></span>
                </div>

                <button
                  onClick={() => {
                    triggerConfetti();
                    showToast('🚴 Dispatch courier assigned! Thermal transit bag logged.');
                    setActiveTab('receiver');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1.5"
                >
                  <span>Dispatch Courier with This Match</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-xl">
                🤖
              </div>
              <p className="text-xs text-stone-400">Click &ldquo;Simulate Live AI Match&rdquo; above to run the neural dispatch optimization test.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
