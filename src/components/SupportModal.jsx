import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import KindLinkLogo from './KindLinkLogo';
import { triggerConfetti } from '../utils/confetti';
import { X, Heart, ShieldCheck, Check, Utensils, QrCode, Smartphone, Download, Copy } from 'lucide-react';

export default function SupportModal() {
  const { supportModalOpen, setSupportModalOpen, currentNgo, showToast, openCertificate } = useApp();
  const [pledgeType, setPledgeType] = useState('meals'); // 'meals' | 'upi'
  const [selectedTier, setSelectedTier] = useState(1500);
  const [customServings, setCustomServings] = useState(40);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedPledge, setSubmittedPledge] = useState(null);

  if (!supportModalOpen || !currentNgo) return null;

  const upiId = `${currentNgo.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12)}@sbi`;

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    triggerConfetti();
    const mockPledge = {
      donorName: 'Generous Delhi Partner',
      itemName: pledgeType === 'meals' ? `${customServings} Freshly Cooked Meals` : `Direct Food Grant (₹${selectedTier})`,
      servings: pledgeType === 'meals' ? customServings : Math.round(selectedTier / 25),
      claimedBy: currentNgo.name,
    };
    setSubmittedPledge(mockPledge);

    setTimeout(() => {
      showToast(
        pledgeType === 'meals' 
          ? `🎉 Thank you! Your pledge of ${customServings} meals has been confirmed for ${currentNgo.name}.`
          : `🎉 Thank you! Contribution of ₹${selectedTier} directly feeds ${Math.round(selectedTier / 25)} children/patients!`
      );
    }, 400);
  };

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      showToast(`UPI ID copied: ${upiId}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#24201D] border-2 border-[#E6DFD1] dark:border-[#3E3832] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-slide-up text-[#1C1917] dark:text-white">
        
        {/* Header with KindLink Brand */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20">
              {currentNgo.avatar || '🍲'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base leading-tight font-display">Support {currentNgo.name}</h3>
              </div>
              <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                Verified Section 80G Tax Deductible (Delhi NCR)
              </p>
            </div>
          </div>
          <button 
            onClick={() => { setSupportModalOpen(false); setIsSubmitted(false); }}
            className="p-1.5 rounded-xl hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-warm-sm border border-emerald-300 dark:border-emerald-700 animate-bounce-subtle">
                ✓
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-[#1C1917] dark:text-white font-display">Pledge Recorded Successfully!</h4>
                <p className="text-xs text-[#57534E] dark:text-stone-300 max-w-sm mx-auto">
                  Your direct contribution is fueling {currentNgo.name}'s daily food relief operations in Delhi NCR.
                </p>
              </div>

              {/* Instant 80G Certificate trigger */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setSupportModalOpen(false);
                    if (submittedPledge) openCertificate(submittedPledge);
                  }}
                  className="w-full sm:w-auto btn-warm-primary px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View 80G Tax & Impact Certificate</span>
                </button>
                <button
                  onClick={() => { setSupportModalOpen(false); setIsSubmitted(false); }}
                  className="w-full sm:w-auto btn-warm-secondary px-4 py-2.5 rounded-xl text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePledgeSubmit} className="space-y-5">
              
              {/* Toggle Support Type */}
              <div className="flex p-1 bg-[#FAF7F0] dark:bg-[#1E1B18] rounded-2xl border border-[#D8CEBD] dark:border-[#3E3832]">
                <button
                  type="button"
                  onClick={() => setPledgeType('meals')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    pledgeType === 'meals' 
                      ? 'bg-white dark:bg-[#2C2723] text-emerald-800 dark:text-emerald-300 shadow-xs border border-[#E6DFD1] dark:border-[#443D36]' 
                      : 'text-[#57534E] dark:text-stone-400 hover:text-[#1C1917]'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Pledge Cooked Meals</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPledgeType('upi')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    pledgeType === 'upi' 
                      ? 'bg-white dark:bg-[#2C2723] text-emerald-800 dark:text-emerald-300 shadow-xs border border-[#E6DFD1] dark:border-[#443D36]' 
                      : 'text-[#57534E] dark:text-stone-400 hover:text-[#1C1917]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Instant UPI Grant</span>
                </button>
              </div>

              {pledgeType === 'meals' ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-[#44403C] dark:text-stone-300">
                        Hot Servings You Can Supply Tonight:
                      </label>
                      <span className="font-extrabold text-sm px-3 py-1 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 rounded-xl">
                        {customServings} portions
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="250" 
                      step="10"
                      value={customServings}
                      onChange={(e) => setCustomServings(Number(e.target.value))}
                      className="w-full accent-emerald-700 h-2.5 bg-[#E6DFD1] dark:bg-[#3E3832] rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="bg-[#FAF7F0] dark:bg-[#1E1B18] p-3.5 rounded-2xl border border-[#E6DFD1] dark:border-[#38332E] text-xs text-[#57534E] dark:text-stone-300 space-y-1.5">
                    <div className="font-bold text-[#1C1917] dark:text-white flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Free volunteer collection van across Delhi NCR</span>
                    </div>
                    <p className="text-[11px] text-[#78716C] dark:text-stone-400">
                      Thermal insulated carriers provided upon arrival. Digital Section 80G food rescue certificate issued instantly upon delivery.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#44403C] dark:text-stone-300 mb-2">
                      Select Direct Contribution (100% Tax Deductible Under Section 80G):
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { amount: 500, label: '₹500', impact: '20 Meals' },
                        { amount: 1500, label: '₹1,500', impact: '60 Meals + Fruit' },
                        { amount: 5000, label: '₹5,000', impact: 'Full Kitchen Shift' },
                      ].map(tier => (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => setSelectedTier(tier.amount)}
                          className={`p-3 rounded-2xl border-2 text-left transition-all ${
                            selectedTier === tier.amount
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 shadow-xs'
                              : 'border-[#E6DFD1] dark:border-[#3E3832] bg-[#FAF7F0] dark:bg-[#1E1B18] hover:border-[#D8CEBD]'
                          }`}
                        >
                          <div className="font-extrabold text-base text-[#1C1917] dark:text-white">{tier.label}</div>
                          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">{tier.impact}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* UPI QR & ID Box */}
                  <div className="p-3.5 bg-[#FAF7F0] dark:bg-[#1E1B18] rounded-2xl border border-[#E6DFD1] dark:border-[#38332E] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#2C2723] border border-[#E6DFD1] dark:border-[#3E3832] flex items-center justify-center text-xl shadow-xs">
                        <QrCode className="w-7 h-7 text-[#1C1917] dark:text-white" />
                      </div>
                      <div className="text-xs">
                        <div className="text-[#78716C] dark:text-stone-400 text-[10px] font-bold uppercase">Official Verified UPI ID</div>
                        <div className="font-mono font-bold text-[#1C1917] dark:text-white mt-0.5">{upiId}</div>
                        <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">GPay • PhonePe • Paytm • BHIM</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="p-2 rounded-xl bg-[#EFE8DA] dark:bg-[#2C2723] hover:bg-emerald-100 text-[#1C1917] dark:text-white transition-colors"
                      title="Copy UPI ID"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSupportModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#78716C] hover:bg-[#FAF7F0] dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-warm-primary px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Confirm & Generate 80G Receipt</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
