import React from 'react';

export default function LiveActivityBanner() {
  const activities = [
    { text: "🥖 45 Sourdough Loaves claimed by Uday Foundation (AIIMS Gate 2)", tag: "Just Claimed", badgeBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
    { text: "🍛 35 Trays Hot Dal Makhani posted in Connaught Place (1.7h left)", tag: "Available", badgeBg: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
    { text: "📦 60 Dry Ration Packs dispatched to Salaam Baalak Trust (Paharganj)", tag: "In Transit", badgeBg: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300" },
    { text: "🥦 12 Crates Fresh Apples & Greens delivered to Sarvodaya Enclave", tag: "Completed", badgeBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
    { text: "🍱 50 Indian Thali Meals picked up from Aerocity Catering Lounge", tag: "Dispatched", badgeBg: "bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200" },
    { text: "☕ 70 Sandwiches & Breakfast Bowls served in Mahipalpur Shelter", tag: "Distributed", badgeBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
  ];

  return (
    <div className="w-full bg-[#EFE8DA] dark:bg-[#141210] border-b border-[#E0D5C3] dark:border-[#2E2822] overflow-hidden py-2 text-xs select-none transition-colors duration-300">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {[...activities, ...activities].map((act, idx) => (
          <div key={idx} className="inline-flex items-center gap-2.5 text-[#57534E] dark:text-[#A8A29E]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-[#292524] dark:text-[#E7E5E4]">{act.text}</span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-black/5 dark:border-white/5 shadow-xs ${act.badgeBg}`}>
              {act.tag}
            </span>
            <span className="text-[#A8A29E] ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
