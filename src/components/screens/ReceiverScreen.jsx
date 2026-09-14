import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import KindLinkLogo from '../KindLinkLogo';
import { triggerConfetti } from '../../utils/confetti';
import TiltCard from '../animations/TiltCard';
import { createRipple, spawnSparkles } from '../../utils/animations';
import { 
  PlusCircle, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  ChevronRight, 
  Flame, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Award,
  Navigation
} from 'lucide-react';

export default function ReceiverScreen() {
  const { 
    drops, 
    claimDrop, 
    advanceDropStatus, 
    helpRequests, 
    addHelpRequest, 
    setActiveTab,
    openCertificate,
    showToast 
  } = useApp();

  const [activeSubView, setActiveSubView] = useState('feed'); // 'feed' | 'request'
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'Available' | 'Claimed' | 'In Transit' | 'Completed'

  // Request Help Form State
  const [helpType, setHelpType] = useState('Cooked Hot Meals');
  const [servingsNeeded, setServingsNeeded] = useState(60);
  const [orgName, setOrgName] = useState('Uday Foundation (AIIMS Ward)');
  const [requestLocation, setRequestLocation] = useState('Sarvodaya Enclave / AIIMS Ward');
  const [urgency, setUrgency] = useState('Immediate (< 2 hrs)');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredDrops = drops.filter(d => {
    if (filterStatus === 'ALL') return true;
    return d.status === filterStatus;
  });

  const handleHelpSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addHelpRequest({
        organization: orgName,
        type: helpType,
        servingsNeeded: Number(servingsNeeded),
        location: requestLocation,
        urgency,
        description: description || 'Emergency meal supplies required for dinner service.',
      });
      triggerConfetti();
      showToast(`📢 Emergency requirement for ${servingsNeeded} servings broadcast to Delhi donors!`);
      setDescription('');
      setIsSubmitting(false);
      setActiveSubView('feed');
    }, 600);
  };

  const handleClaimWithConfetti = (dropId, dropTitle) => {
    claimDrop(dropId, 'Uday Foundation (AIIMS Ward)');
    triggerConfetti();
    showToast(`🎉 Claimed "${dropTitle}"! Dispatch courier alerted.`);
  };

  const statusSteps = ['Available', 'Claimed', 'In Transit', 'Completed'];

  return (
    <div className="space-y-10 py-6 animate-fade-in text-[#1C1917] dark:text-white">
      
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD1] dark:border-[#38332E] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2 border border-emerald-300 dark:border-emerald-700/60 shadow-xs">
            <KindLinkLogo size="xs" variant="icon" />
            <span>Delhi Shelter & Receiver Command Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] dark:text-white font-display">
            Live Drops Feed & Status Lifecycle
          </h1>
          <p className="text-sm text-[#57534E] dark:text-stone-300 mt-1 max-w-2xl">
            Real-time feed tracking food drops from restaurant kitchens to community plates in 4 verifiable operational stages.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center p-1 bg-[#FAF7F0] dark:bg-[#1E1B18] rounded-2xl border border-[#D8CEBD] dark:border-[#3E3832]">
          <button
            onClick={() => setActiveSubView('feed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubView === 'feed'
                ? 'bg-white dark:bg-[#2C2723] text-emerald-800 dark:text-emerald-300 shadow-xs border border-[#E6DFD1] dark:border-[#443D36]'
                : 'text-[#57534E] dark:text-stone-400 hover:text-[#1C1917]'
            }`}
          >
            Active Drops ({drops.length})
          </button>
          <button
            onClick={() => setActiveSubView('request')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubView === 'request'
                ? 'bg-white dark:bg-[#2C2723] text-emerald-800 dark:text-emerald-300 shadow-xs border border-[#E6DFD1] dark:border-[#443D36]'
                : 'text-[#57534E] dark:text-stone-400 hover:text-[#1C1917]'
            }`}
          >
            + Request Help ({helpRequests.length})
          </button>
        </div>
      </div>

      {activeSubView === 'feed' ? (
        <div className="space-y-6">
          
          {/* Status Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#78716C] dark:text-stone-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter State:
              </span>
              {['ALL', 'Available', 'Claimed', 'In Transit', 'Completed'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filterStatus === st 
                      ? 'bg-emerald-700 text-white shadow-xs' 
                      : 'bg-white dark:bg-[#1E1B18] text-[#57534E] dark:text-stone-300 hover:bg-[#FAF7F0] border border-[#D8CEBD] dark:border-[#3E3832]'
                  }`}
                >
                  {st}
                  {st !== 'ALL' && (
                    <span className="ml-1.5 opacity-80 text-[10px]">
                      ({drops.filter(d => d.status === st).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('ai')}
              className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Let AI Match Optimal Routes →</span>
            </button>
          </div>

          {/* Drops Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDrops.map(drop => {
              const currentStepIndex = statusSteps.indexOf(drop.status);

              return (
                <TiltCard 
                  key={drop.id}
                  className="beige-card rounded-3xl overflow-hidden flex flex-col justify-between shadow-warm-sm hover:shadow-warm-md transition-all"
                >
                  <div>
                    {/* Top Row: Donor & Status tag */}
                    <div className="p-5 border-b border-[#E6DFD1] dark:border-[#38332E] flex items-center justify-between gap-3 bg-[#FAF7F0]/60 dark:bg-[#201C19]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#2C2723] border border-[#E6DFD1] dark:border-[#3E3832] flex items-center justify-center text-xl shadow-xs">
                          {drop.donorAvatar}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-[#1C1917] dark:text-white leading-tight font-display">
                            {drop.donorName}
                          </h4>
                          <p className="text-[11px] text-[#78716C] dark:text-stone-400 flex items-center gap-1 mt-0.5 font-medium">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {drop.location}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          drop.status === 'Available' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          drop.status === 'Claimed' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                          drop.status === 'In Transit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                          'bg-[#EFE8DA] text-[#44403C] dark:bg-stone-800 dark:text-stone-200'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                          {drop.status}
                        </span>
                        <div className="text-[10px] text-[#A8A29E] mt-1 font-semibold">
                          Posted {drop.postedTime}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Details & Image */}
                    <div className="p-5 flex flex-col sm:flex-row gap-4">
                      <img 
                        src={drop.image} 
                        alt={drop.itemName} 
                        className="w-full sm:w-28 h-28 rounded-2xl object-cover shrink-0 border border-[#E6DFD1] dark:border-[#3E3832]" 
                      />
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                            {drop.servings} Servings
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FAF7F0] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 border border-[#E6DFD1] dark:border-[#3E3832]">
                            {drop.temp}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-base text-[#1C1917] dark:text-white leading-snug font-display">
                          {drop.itemName}
                        </h3>
                        <p className="text-xs text-[#57534E] dark:text-stone-300 line-clamp-2">
                          {drop.notes}
                        </p>
                        <div className="text-[11px] text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1 pt-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Deadline: {drop.pickupDeadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Status Lifecycle Stepper */}
                  <div className="bg-[#FAF7F0] dark:bg-[#1E1B18] p-5 border-t border-[#E6DFD1] dark:border-[#38332E] space-y-4">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-[#78716C] dark:text-stone-400 uppercase tracking-wider">
                        Operational Lifecycle (4 Stages)
                      </span>
                      {drop.claimedBy && (
                        <span className="font-bold text-emerald-800 dark:text-emerald-400">
                          Claimed: {drop.claimedBy}
                        </span>
                      )}
                    </div>

                    {/* Progress Track */}
                    <div className="relative flex items-center justify-between px-2">
                      <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-[#E6DFD1] dark:bg-stone-800 -z-0 rounded-full">
                        <div 
                          className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                          style={{ width: `${(currentStepIndex / 3) * 100}%` }}
                        ></div>
                      </div>

                      {statusSteps.map((step, idx) => {
                        const isCompleted = idx <= currentStepIndex;
                        const isCurrent = idx === currentStepIndex;

                        return (
                          <div key={step} className="relative z-10 flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold transition-all shadow-xs ${
                              isCurrent
                                ? 'bg-emerald-700 text-white ring-4 ring-emerald-600/20 scale-110'
                                : isCompleted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#EFE8DA] dark:bg-stone-700 text-[#78716C]'
                            }`}>
                              {isCompleted ? '✓' : idx + 1}
                            </div>
                            <span className={`text-[10px] mt-1.5 font-bold whitespace-nowrap ${
                              isCurrent 
                                ? 'text-emerald-800 dark:text-emerald-300' 
                                : 'text-[#A8A29E]'
                            }`}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Simulated Telemetry info with Animated Flow Line when in transit */}
                    {drop.status === 'In Transit' && (
                      <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl text-xs text-blue-900 dark:text-blue-300 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-blue-600 animate-bounce-subtle shrink-0" />
                            <span><strong>Courier En Route:</strong> Suresh K. (Electric Scooter) • 1.2 km away</span>
                          </div>
                          <span className="font-mono font-bold text-[10px] bg-blue-200 dark:bg-blue-900 px-2 py-0.5 rounded-full text-blue-900 dark:text-blue-200">
                            ETA 14m
                          </span>
                        </div>
                        {/* Live Route Flow Graphic */}
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[10px] font-bold text-stone-500">Kitchen</span>
                          <div className="flex-1 relative h-3 flex items-center">
                            <svg className="w-full h-2 overflow-visible">
                              <line x1="0" y1="4" x2="100%" y2="4" stroke="#60A5FA" strokeWidth="2.5" className="route-dash-flow" />
                            </svg>
                            <span className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs animate-ping"></span>
                            <span className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs"></span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600">Shelter Hub</span>
                        </div>
                      </div>
                    )}

                    {/* Actions Toolbar for this drop */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          createRipple(e);
                          advanceDropStatus(drop.id);
                        }}
                        title="Simulate advancing the operational status"
                        className="btn-warm-secondary px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 relative overflow-hidden active:scale-95"
                      >
                        <span>Step Next State →</span>
                      </button>

                      {drop.status === 'Available' ? (
                        <button
                          onClick={(e) => {
                            createRipple(e);
                            spawnSparkles(e.clientX, e.clientY, 8);
                            handleClaimWithConfetti(drop.id, drop.itemName);
                          }}
                          className="btn-warm-primary px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 relative overflow-hidden active:scale-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>1-Click Claim Drop</span>
                        </button>
                      ) : drop.status === 'Completed' ? (
                        <button
                          onClick={(e) => {
                            createRipple(e);
                            spawnSparkles(e.clientX, e.clientY, 6);
                            openCertificate({
                              id: `CERT-DELHI-${drop.id}`,
                              donorName: drop.donorName,
                              itemName: drop.itemName,
                              servings: drop.servings,
                              claimedBy: drop.claimedBy || 'Uday Foundation',
                              estimatedValueUsd: drop.servings * 0.65,
                              wasteDivertedKg: Math.round(drop.servings * 0.45),
                              co2PreventedKg: Math.round(drop.servings * 1.1),
                            });
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1 transition-colors relative overflow-hidden active:scale-95"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-700" />
                          <span>View 80G Certificate</span>
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Pickup in Progress</span>
                        </span>
                      )}
                    </div>

                  </div>
                </TiltCard>
              );
            })}
          </div>

        </div>
      ) : (
        /* Request Help Sub-View */
        <div className="max-w-2xl mx-auto beige-card p-6 sm:p-8 rounded-3xl space-y-6 shadow-warm-sm">
          <div>
            <h2 className="text-xl font-extrabold text-[#1C1917] dark:text-white flex items-center gap-2 font-display">
              <PlusCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <span>Broadcast Immediate Shelter Food Deficit</span>
            </h2>
            <p className="text-xs text-[#57534E] dark:text-stone-400 mt-1">
              Posts instantly alert registered commercial kitchens and catering hubs across your Delhi sector.
            </p>
          </div>

          <form onSubmit={handleHelpSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                Your Organization Name
              </label>
              <input 
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Required Resource Type
                </label>
                <select
                  value={helpType}
                  onChange={(e) => setHelpType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                >
                  <option>Cooked Hot Meals (Dal/Sabzi/Roti)</option>
                  <option>Packaged Dry Rations (Atta/Dal/Rice)</option>
                  <option>Fresh Fruits & Infant Milk</option>
                  <option>Bakery Loaves & Breakfast Buns</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Estimated Portions / Servings Needed
                </label>
                <input 
                  type="number"
                  min="10"
                  max="500"
                  value={servingsNeeded}
                  onChange={(e) => setServingsNeeded(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Delivery Destination / Delhi Locality
                </label>
                <input 
                  type="text"
                  value={requestLocation}
                  onChange={(e) => setRequestLocation(e.target.value)}
                  placeholder="e.g. AIIMS Ward Gate 2 / Paharganj Station"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                  Urgency Level
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                >
                  <option>Immediate (&lt; 2 hrs)</option>
                  <option>Tonight Dinner (Before 8 PM)</option>
                  <option>Tomorrow Morning Breakfast</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#44403C] dark:text-stone-300 mb-1">
                Context & Notes (Number of children/patients, dietary constraints)
              </label>
              <textarea 
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Feeding outstation patient families waiting on the AIIMS concourse. Pure vegetarian meals preferred."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] text-[#1C1917] dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveSubView('feed')}
                className="btn-warm-secondary px-4 py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-warm-primary px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{isSubmitting ? 'Broadcasting Need...' : 'Broadcast Urgent Deficit'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
