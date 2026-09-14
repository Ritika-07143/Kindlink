import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DROPS, INITIAL_HELP_REQUESTS, BASE_IMPACT_METRICS, TRUSTED_NGO } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme State - Default to 'light' for warm organic beige aesthetic
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kindlink_theme');
      if (saved) return saved;
      return 'light'; // Warm organic beige theme
    }
    return 'light';
  });

  // Navigation & Persona State
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'ngo' | 'donor' | 'receiver' | 'ai'
  const [currentRole, setCurrentRole] = useState('donor'); // 'donor' | 'receiver' | 'volunteer'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Presenter Cheat-Sheet Drawer
  const [showPitchNotes, setShowPitchNotes] = useState(false);

  // Certificate Modal State
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Core Data State
  const [drops, setDrops] = useState(() => {
    const saved = localStorage.getItem('kindlink_drops');
    return saved ? JSON.parse(saved) : INITIAL_DROPS;
  });

  const [helpRequests, setHelpRequests] = useState(() => {
    const saved = localStorage.getItem('kindlink_requests');
    return saved ? JSON.parse(saved) : INITIAL_HELP_REQUESTS;
  });

  // Support / Donation modal for current NGO
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [currentNgo, setCurrentNgo] = useState(TRUSTED_NGO);

  // Notification Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sync theme with DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('kindlink_theme', theme);
  }, [theme]);

  // Persist drops & requests
  useEffect(() => {
    localStorage.setItem('kindlink_drops', JSON.stringify(drops));
  }, [drops]);

  useEffect(() => {
    localStorage.setItem('kindlink_requests', JSON.stringify(helpRequests));
  }, [helpRequests]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Action: Add a new surplus drop from a donor
  const addDrop = (dropData) => {
    const newDrop = {
      id: `drop-${Date.now()}`,
      donorName: dropData.donorName || 'Artisan Table Co.',
      donorType: dropData.donorType || 'Restaurant Partner',
      donorAvatar: dropData.donorAvatar || '🥘',
      itemName: dropData.itemName,
      servings: Number(dropData.servings) || 25,
      category: dropData.category || 'Food',
      foodType: dropData.foodType || 'Cooked Meals',
      location: dropData.location || 'Within 2.0 miles',
      address: dropData.address || '742 Evergreen Terrace',
      postedTime: 'Just now',
      pickupDeadline: dropData.pickupDeadline || 'Today before 9:00 PM',
      deadlineHoursLeft: dropData.deadlineHoursLeft || 2.5,
      status: 'Available',
      claimedBy: null,
      image: dropData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      notes: dropData.notes || 'Freshly prepared. Stored according to food safety guidelines.',
      dietary: dropData.dietary || ['Freshly Prepared'],
      temp: dropData.temp || 'Hot / Safe Temp',
    };

    setDrops(prev => [newDrop, ...prev]);
    showToast(`🎉 Surplus drop "${newDrop.itemName}" published live! It is now visible to nearby verified receivers.`);
  };

  // Action: Claim a drop (1-click action)
  const claimDrop = (dropId, claimerName = 'Hope Harvest Community Kitchen') => {
    setDrops(prev => prev.map(drop => {
      if (drop.id === dropId) {
        return {
          ...drop,
          status: 'Claimed',
          claimedBy: claimerName,
        };
      }
      return drop;
    }));
    showToast(`✅ Food drop claimed by ${claimerName}! Routing & pickup dispatched.`);
  };

  // Action: Cycle status lifecycle: Available -> Claimed -> In Transit -> Completed
  const advanceDropStatus = (dropId) => {
    const statusSequence = ['Available', 'Claimed', 'In Transit', 'Completed'];
    setDrops(prev => prev.map(drop => {
      if (drop.id === dropId) {
        const currentIndex = statusSequence.indexOf(drop.status);
        const nextStatus = statusSequence[(currentIndex + 1) % statusSequence.length];
        const updatedClaimedBy = nextStatus === 'Available' ? null : (drop.claimedBy || 'Hope Harvest Community Kitchen');
        return {
          ...drop,
          status: nextStatus,
          claimedBy: updatedClaimedBy,
        };
      }
      return drop;
    }));
  };

  // Action: Submit a new Help Request
  const addHelpRequest = (reqData) => {
    const newReq = {
      id: `req-${Date.now()}`,
      organization: reqData.organization || 'Community Care Volunteer Network',
      requestedBy: reqData.requestedBy || 'Frontline Coordinator',
      type: reqData.type || 'Cooked Hot Meals',
      servingsNeeded: Number(reqData.servingsNeeded) || 40,
      location: reqData.location || 'Mission District',
      urgency: reqData.urgency || 'Immediate (< 2 hrs)',
      status: 'Pending Match',
      postedTime: 'Just now',
      description: reqData.description || 'Assistance requested for evening meal service.',
    };
    setHelpRequests(prev => [newReq, ...prev]);
    showToast(`📝 Request for ${newReq.servingsNeeded} servings submitted. AI Agent scanning active drops!`);
  };

  // Dynamic Impact Metrics Calculation
  const additionalMeals = drops.reduce((sum, d) => sum + (d.status !== 'Available' ? d.servings : Math.round(d.servings * 0.3)), 0);
  const activeAvailableDrops = drops.filter(d => d.status === 'Available').length;
  const currentStats = {
    mealsSaved: BASE_IMPACT_METRICS.mealsSaved + additionalMeals,
    wasteDivertedKg: (BASE_IMPACT_METRICS.wasteDivertedKg + (additionalMeals * 0.48)).toFixed(1),
    activeDrops: activeAvailableDrops,
    verifiedNgos: BASE_IMPACT_METRICS.verifiedNgos,
    co2PreventedKg: (BASE_IMPACT_METRICS.co2PreventedKg + (additionalMeals * 1.2)).toFixed(0),
  };

  // Action: Open Tax & ESG Certificate
  const openCertificate = (drop) => {
    setActiveCertificate({
      id: `CERT-${Date.now().toString().slice(-6)}`,
      donorName: drop.donorName || 'Artisan Table Co.',
      itemName: drop.itemName,
      servings: drop.servings,
      claimedBy: drop.claimedBy || 'Hope Harvest Community Kitchen',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      estimatedValueUsd: (drop.servings * 7.5).toFixed(2),
      wasteDivertedKg: (drop.servings * 0.45).toFixed(1),
      co2PreventedKg: (drop.servings * 1.14).toFixed(1),
      taxDeductibleSection: 'Internal Revenue Code 170(e)(3) / 80G Certified',
      verificationHash: `0x${Math.random().toString(16).substr(2, 8).toUpperCase()}...KL`,
    });
    setCertificateModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        currentRole,
        setCurrentRole,
        viewMode,
        setViewMode,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        drops,
        helpRequests,
        stats: currentStats,
        addDrop,
        claimDrop,
        advanceDropStatus,
        addHelpRequest,
        showPitchNotes,
        setShowPitchNotes,
        supportModalOpen,
        setSupportModalOpen,
        currentNgo,
        setCurrentNgo,
        certificateModalOpen,
        setCertificateModalOpen,
        activeCertificate,
        openCertificate,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
