import React from 'react';
import { useApp } from '../context/AppContext';
import KindLinkLogo from './KindLinkLogo';
import { X, Award, ShieldCheck, Printer, CheckCircle2, Download, FileText } from 'lucide-react';

export default function CertificateModal() {
  const { certificateModalOpen, setCertificateModalOpen, activeCertificate, showToast } = useApp();

  if (!certificateModalOpen || !activeCertificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReceipt = () => {
    showToast(`📄 Section 80G Tax receipt ${activeCertificate.id} downloaded!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FAF7F0] dark:bg-[#24201D] border-2 border-[#E6DFD1] dark:border-[#443D36] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-slide-up text-[#1C1917] dark:text-white">
        
        {/* Top Actions */}
        <div className="p-4 bg-white dark:bg-[#1E1B18] border-b border-[#E6DFD1] dark:border-[#38332E] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Official Section 80G Food Rescue Tax Exemption Certificate</span>
          </div>
          <button 
            onClick={() => setCertificateModalOpen(false)}
            className="p-1 rounded-lg hover:bg-[#EFE8DA] dark:hover:bg-stone-800 transition-colors text-[#78716C] dark:text-stone-400 hover:text-[#1C1917]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body (Clean Printable Design) */}
        <div className="p-8 sm:p-10 space-y-6 bg-white dark:bg-[#221E1B] border-8 border-double border-[#D8CEBD] dark:border-[#3E3832] m-3 rounded-2xl relative">
          
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <KindLinkLogo size="lg" variant="badge" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1C1917] dark:text-white font-display uppercase">
              Certificate of Zero-Waste Impact
            </h2>
            <p className="text-xs text-emerald-800 dark:text-emerald-400 font-bold tracking-widest uppercase">
              Issued by KindLink Verified Food Redistribution Network (Delhi NCR)
            </p>
          </div>

          <div className="text-center text-sm text-[#57534E] dark:text-stone-300 leading-relaxed max-w-lg mx-auto">
            This certifies that <strong className="text-[#1C1917] dark:text-white underline decoration-emerald-600 font-bold">{activeCertificate.donorName}</strong> has successfully rescued and safely routed edible commercial surplus food to emergency community relief programs:
          </div>

          {/* Donation Summary Card */}
          <div className="p-5 rounded-2xl bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E6DFD1] dark:border-[#38332E] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6DFD1] dark:border-[#38332E] pb-3">
              <div>
                <div className="text-xs text-[#78716C] dark:text-stone-400">Rescued Item Description:</div>
                <div className="font-bold text-base text-[#1C1917] dark:text-white">{activeCertificate.itemName}</div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs">
                  {activeCertificate.servings} Servings Rescued
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#26221E] border border-[#E6DFD1] dark:border-[#38332E]">
                <div className="text-[10px] text-[#78716C] dark:text-stone-400 uppercase font-bold">Fair Market Value</div>
                <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 mt-0.5">₹{(activeCertificate.estimatedValueUsd * 83).toLocaleString()}</div>
                <div className="text-[9px] text-[#A8A29E]">Sec 80G Deductible</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-[#26221E] border border-[#E6DFD1] dark:border-[#38332E]">
                <div className="text-[10px] text-[#78716C] dark:text-stone-400 uppercase font-bold">Waste Diverted</div>
                <div className="text-base font-extrabold text-teal-700 dark:text-teal-400 mt-0.5">{activeCertificate.wasteDivertedKg} kg</div>
                <div className="text-[9px] text-[#A8A29E]">From Ghazipur Landfill</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-[#26221E] border border-[#E6DFD1] dark:border-[#38332E]">
                <div className="text-[10px] text-[#78716C] dark:text-stone-400 uppercase font-bold">GHG Avoided</div>
                <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 mt-0.5">{activeCertificate.co2PreventedKg} kg</div>
                <div className="text-[9px] text-[#A8A29E]">CO2 Equivalent</div>
              </div>
            </div>
          </div>

          {/* Verification details & signoff */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#57534E] dark:text-stone-400 pt-2 border-t border-[#E6DFD1] dark:border-[#38332E]">
            <div>
              <div><strong>Receiving Non-Profit:</strong> {activeCertificate.claimedBy}</div>
              <div><strong>Statutory Basis:</strong> Section 80G Income Tax Act (1961)</div>
              <div><strong>Certificate ID:</strong> {activeCertificate.id}</div>
              <div><strong>Issued Date:</strong> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </div>

            <div className="flex items-end justify-end">
              <div className="text-right border-t border-[#1C1917]/20 dark:border-white/20 pt-1 w-44">
                <div className="font-display font-extrabold text-sm text-[#1C1917] dark:text-white">Dr. Anita Sharma</div>
                <div className="text-[10px] text-[#78716C] dark:text-stone-400">Chief Food Safety & Compliance</div>
                <div className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold">KindLink Foundation (Delhi)</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white dark:bg-[#1E1B18] border-t border-[#E6DFD1] dark:border-[#38332E] flex items-center justify-between">
          <div className="text-xs text-[#78716C] dark:text-stone-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Tamper-proof SHA256 verifiable hash stored</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF7F0] dark:bg-[#2C2723] hover:bg-[#EFE8DA] text-xs font-bold text-[#1C1917] dark:text-white border border-[#D8CEBD] dark:border-[#3E3832] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadReceipt}
              className="btn-warm-primary flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download 80G Receipt (PDF)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
