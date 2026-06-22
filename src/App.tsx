import { useState, useMemo } from 'react';
// @ts-ignore
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Users,
  ShoppingCart,
  MousePointer,
  Smartphone,
  Mail,
  Share2,
  RotateCcw,
  Sliders,
  BarChart3,
} from 'lucide-react';
// Exact historical dataset extracted from your website screenshot
const BASE_DATA = [
  {
    channel: 'Organic Search',
    device: 'desktop',
    users: 5120,
    sessions: 6050,
    engaged: 4235,
    cart: 880,
    tx: 215,
    rev: 18490.5,
  },
  {
    channel: 'Organic Search',
    device: 'mobile',
    users: 7420,
    sessions: 8830,
    engaged: 5121,
    cart: 915,
    tx: 215,
    rev: 13650.2,
  },
  {
    channel: 'Organic Search',
    device: 'tablet',
    users: 985,
    sessions: 1120,
    engaged: 705,
    cart: 105,
    tx: 28,
    rev: 2550.0,
  },
  {
    channel: 'Paid Search',
    device: 'desktop',
    users: 3950,
    sessions: 4550,
    engaged: 3321,
    cart: 950,
    tx: 250,
    rev: 22500.0,
  },
  {
    channel: 'Paid Search',
    device: 'mobile',
    users: 3175,
    sessions: 3500,
    engaged: 1995,
    cart: 420,
    tx: 105,
    rev: 7875.0,
  },
  {
    channel: 'Direct',
    device: 'desktop',
    users: 4010,
    sessions: 5550,
    engaged: 4440,
    cart: 1110,
    tx: 310,
    rev: 28520.0,
  },
  {
    channel: 'Direct',
    device: 'mobile',
    users: 2540,
    sessions: 3400,
    engaged: 2108,
    cart: 425,
    tx: 91,
    rev: 7553.5,
  },
  {
    channel: 'Organic Social',
    device: 'mobile',
    users: 4890,
    sessions: 5230,
    engaged: 2092,
    cart: 210,
    tx: 35,
    rev: 2555.0,
  },
  {
    channel: 'Organic Social',
    device: 'desktop',
    users: 1090,
    sessions: 1220,
    engaged: 610,
    cart: 85,
    tx: 18,
    rev: 1440.0,
  },
  {
    channel: 'Paid Social',
    device: 'mobile',
    users: 2800,
    sessions: 3150,
    engaged: 1653,
    cart: 315,
    tx: 65,
    rev: 4940.0,
  },
  {
    channel: 'Paid Social',
    device: 'desktop',
    users: 950,
    sessions: 1050,
    engaged: 682,
    cart: 125,
    tx: 32,
    rev: 2688.0,
  },
  {
    channel: 'Email',
    device: 'desktop',
    users: 1225,
    sessions: 1670,
    engaged: 1486,
    cart: 417,
    tx: 110,
    rev: 10450.0,
  },
  {
    channel: 'Email',
    device: 'mobile',
    users: 670,
    sessions: 850,
    engaged: 680,
    cart: 188,
    tx: 55,
    rev: 4070.0,
  },
];

const PRESETS = [
  {
    name: 'Conservative Optimizations',
    mobileUxEnabled: true,
    mobileConvBoost: 25,
    mobileAovBoost: 5,
    mobileBudget: 1500,
    emailEnabled: true,
    emailTrafficBoost: 30,
    emailBudget: 150,
    socialEnabled: true,
    socialConvBoost: 50,
    socialBudget: 500,
  },
  {
    name: 'Aggressive Expansion',
    mobileUxEnabled: true,
    mobileConvBoost: 75,
    mobileAovBoost: 15,
    mobileBudget: 4000,
    emailEnabled: true,
    emailTrafficBoost: 150,
    emailBudget: 500,
    socialEnabled: true,
    socialConvBoost: 200,
    socialBudget: 1500,
  },
  {
    name: 'Mobile First Focus',
    mobileUxEnabled: true,
    mobileConvBoost: 90,
    mobileAovBoost: 20,
    mobileBudget: 3500,
    emailEnabled: false,
    emailTrafficBoost: 50,
    emailBudget: 200,
    socialEnabled: false,
    socialConvBoost: 100,
    socialBudget: 800,
  },
  {
    name: 'Max Retention (Email Overhaul)',
    mobileUxEnabled: false,
    mobileConvBoost: 40,
    mobileAovBoost: 10,
    mobileBudget: 2000,
    emailEnabled: true,
    emailTrafficBoost: 250,
    emailBudget: 800,
    socialEnabled: true,
    socialConvBoost: 75,
    socialBudget: 600,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('financial');

  // Strategy Controls State
  const [mobileUxEnabled, setMobileUxEnabled] = useState(true);
  const [mobileConvBoost, setMobileConvBoost] = useState(50); // % increase in conversion
  const [mobileAovBoost, setMobileAovBoost] = useState(10); // $ AOV increase
  const [mobileBudget, setMobileBudget] = useState(2000); // Implement cost ($)

  const [emailEnabled, setEmailEnabled] = useState(true);
  const [emailTrafficBoost, setEmailTrafficBoost] = useState(100); // % session increase
  const [emailBudget, setEmailBudget] = useState(300); // Incremental monthly cost

  const [socialEnabled, setSocialEnabled] = useState(true);
  const [socialConvBoost, setSocialConvBoost] = useState(150); // % increase in transaction conversion
  const [socialBudget, setSocialBudget] = useState(800); // Setup creative asset cost

  // Global Financial Constants
  const [grossMargin, setGrossMargin] = useState(62); // typical standard for premium trousers
  const [fixedOverhead, setFixedOverhead] = useState(15000);

  // Custom User Saved Scenarios
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [newScenarioName, setNewScenarioName] = useState('');

  // Apply a preset
  const applyPreset = (preset) => {
    setMobileUxEnabled(preset.mobileUxEnabled);
    setMobileConvBoost(preset.mobileConvBoost);
    setMobileAovBoost(preset.mobileAovBoost);
    setMobileBudget(preset.mobileBudget);

    setEmailEnabled(preset.emailEnabled);
    setEmailTrafficBoost(preset.emailTrafficBoost);
    setEmailBudget(preset.emailBudget);

    setSocialEnabled(preset.socialEnabled);
    setSocialConvBoost(preset.socialConvBoost);
    setSocialBudget(preset.socialBudget);
  };

  // Run Calculations
  const calculatedData = useMemo(() => {
    let baseTotalRev = 0;
    let baseTotalTx = 0;
    let baseTotalSessions = 0;
    let baseTotalCarts = 0;

    let projTotalRev = 0;
    let projTotalTx = 0;
    let projTotalSessions = 0;
    let projTotalCarts = 0;

    const channelsBreakdown = BASE_DATA.map((row) => {
      // Base stats
      const baseAov = row.tx > 0 ? row.rev / row.tx : 0;
      const baseCr = (row.tx / row.sessions) * 100;

      baseTotalRev += row.rev;
      baseTotalTx += row.tx;
      baseTotalSessions += row.sessions;
      baseTotalCarts += row.cart;

      // Projecting updates
      let projectedSessions = row.sessions;
      let projectedTx = row.tx;
      let projectedCart = row.cart;
      let projectedAov = baseAov;

      const isMobile = row.device === 'mobile' || row.device === 'tablet';

      // 1. Mobile UX Impact
      if (isMobile && mobileUxEnabled) {
        // High mobile checkout conversion scaling (compounds cart to checkout)
        projectedTx = projectedTx * (1 + mobileConvBoost / 100);
        // Add to cart rates climb as layout improves
        projectedCart = projectedCart * (1 + (mobileConvBoost * 0.4) / 100);
        projectedAov = baseAov + mobileAovBoost;
      }

      // 2. Email Scaling Impact
      if (row.channel === 'Email' && emailEnabled) {
        projectedSessions = row.sessions * (1 + emailTrafficBoost / 100);
        projectedTx = projectedTx * (1 + emailTrafficBoost / 100);
        projectedCart = projectedCart * (1 + emailTrafficBoost / 100);
      }

      // 3. Social Landing Page Optimization Impact
      if (row.channel === 'Organic Social' && socialEnabled) {
        // Specifically targets improving checkout conversion since traffic was bouncing
        projectedTx = projectedTx * (1 + socialConvBoost / 100);
        // Also boost add to cart rates as page matches expectations
        projectedCart = projectedCart * (1 + (socialConvBoost * 0.6) / 100);
      }

      const projectedRev = projectedTx * projectedAov;

      projTotalRev += projectedRev;
      projTotalTx += projectedTx;
      projTotalSessions += projectedSessions;
      projTotalCarts += projectedCart;

      return {
        ...row,
        baseAov,
        baseCr,
        projectedSessions: Math.round(projectedSessions),
        projectedTx: Math.round(projectedTx),
        projectedCart: Math.round(projectedCart),
        projectedRev: parseFloat(projectedRev.toFixed(2)),
        projectedCr: (projectedTx / projectedSessions) * 100,
        projectedAov: projectedAov,
      };
    });

    // Strategy-specific incremental marketing investments
    const activeMobileCost = mobileUxEnabled ? mobileBudget : 0;
    const activeEmailCost = emailEnabled ? emailBudget : 0;
    const activeSocialCost = socialEnabled ? socialBudget : 0;
    const totalStrategyInvestment =
      activeMobileCost + activeEmailCost + activeSocialCost;

    // Financial calculations
    const baseGrossProfit = baseTotalRev * (grossMargin / 100);
    const projGrossProfit = projTotalRev * (grossMargin / 100);

    const baseNetProfit = baseGrossProfit - fixedOverhead;
    const projNetProfit =
      projGrossProfit - fixedOverhead - totalStrategyInvestment;

    const netProfitDelta = projNetProfit - baseNetProfit;
    const roiPercentage =
      totalStrategyInvestment > 0
        ? (netProfitDelta / totalStrategyInvestment) * 100
        : 0;

    return {
      baseTotalRev,
      baseTotalTx,
      baseTotalSessions,
      baseTotalCarts,
      projTotalRev,
      projTotalTx,
      projTotalSessions,
      projTotalCarts,
      baseGrossProfit,
      projGrossProfit,
      baseNetProfit,
      projNetProfit,
      netProfitDelta,
      roiPercentage,
      totalStrategyInvestment,
      channelsBreakdown,
    };
  }, [
    mobileUxEnabled,
    mobileConvBoost,
    mobileAovBoost,
    mobileBudget,
    emailEnabled,
    emailTrafficBoost,
    emailBudget,
    socialEnabled,
    socialConvBoost,
    socialBudget,
    grossMargin,
    fixedOverhead,
  ]);

  // Save Current state as custom scenario
  const saveCurrentScenario = (e) => {
    e.preventDefault();
    if (!newScenarioName.trim()) return;
    const newScenario = {
      id: Date.now(),
      name: newScenarioName,
      metrics: {
        revenue: calculatedData.projTotalRev,
        netProfit: calculatedData.projNetProfit,
        netProfitDelta: calculatedData.netProfitDelta,
        roi: calculatedData.roiPercentage,
        investment: calculatedData.totalStrategyInvestment,
      },
      settings: {
        mobileUxEnabled,
        mobileConvBoost,
        mobileAovBoost,
        mobileBudget,
        emailEnabled,
        emailTrafficBoost,
        emailBudget,
        socialEnabled,
        socialConvBoost,
        socialBudget,
      },
    };
    setSavedScenarios([...savedScenarios, newScenario]);
    setNewScenarioName('');
  };

  const deleteScenario = (id) => {
    setSavedScenarios(savedScenarios.filter((s) => s.id !== id));
  };

  // Helper formatting values
  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  const formatPercentage = (val) => `${val.toFixed(1)}%`;
  const formatNum = (val) =>
    new Intl.NumberFormat('en-US').format(Math.round(val));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* HEADER NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-lg">
            {/* Trouser Silhouette / Hanger SVG */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              TrouserCo Advisor
            </h1>
            <p className="text-xs text-slate-400">
              Profit Optimisation & Strategy Planner
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-3 rounded-lg border border-slate-700 hover:border-emerald-500 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT COLUMN: CONTROL PANEL */}
        <aside className="w-full lg:w-[420px] bg-slate-950/40 border-r border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
              Core Strategic Levers
            </h2>
            <button
              onClick={() => {
                setMobileUxEnabled(true);
                setMobileConvBoost(50);
                setMobileAovBoost(10);
                setMobileBudget(2000);
                setEmailEnabled(true);
                setEmailTrafficBoost(100);
                setEmailBudget(300);
                setSocialEnabled(true);
                setSocialConvBoost(150);
                setSocialBudget(800);
              }}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition"
            >
              Reset Inputs
            </button>
          </div>

          {/* STRATEGY 1: MOBILE OVERHAUL */}
          <div
            className={`p-4 rounded-xl border transition ${
              mobileUxEnabled
                ? 'bg-slate-900 border-emerald-500/50'
                : 'bg-slate-950/20 border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📱</span>
                <div>
                  <h3 className="text-sm font-bold">1. Overhaul Mobile UX</h3>
                  <p className="text-2xs text-slate-400">
                    Plugs device conversions gap
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={mobileUxEnabled}
                  onChange={(e) => setMobileUxEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {mobileUxEnabled && (
              <div className="space-y-4 mt-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">
                      Mobile Checkout Conversion Increase
                    </span>
                    <span className="text-emerald-400 font-bold">
                      +{mobileConvBoost}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={mobileConvBoost}
                    onChange={(e) =>
                      setMobileConvBoost(parseInt(e.target.value))
                    }
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-2xs text-slate-500">
                    Improves all mobile transactions securely
                  </span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">
                      Mobile Average Order Value (AOV) Boost
                    </span>
                    <span className="text-emerald-400 font-bold">
                      +{formatCurrency(mobileAovBoost)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={mobileAovBoost}
                    onChange={(e) =>
                      setMobileAovBoost(parseInt(e.target.value))
                    }
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-2xs text-slate-500">
                    Upselling & product bundles on mobile checkouts
                  </span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">
                      Development Budget (One-time investment)
                    </span>
                    <span className="text-rose-400 font-bold">
                      {formatCurrency(mobileBudget)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={mobileBudget}
                    onChange={(e) => setMobileBudget(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* STRATEGY 2: EMAIL SCALE UP */}
          <div
            className={`p-4 rounded-xl border transition ${
              emailEnabled
                ? 'bg-slate-900 border-emerald-500/50'
                : 'bg-slate-950/20 border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">✉️</span>
                <div>
                  <h3 className="text-sm font-bold">
                    2. Scale Email Campaigns
                  </h3>
                  <p className="text-2xs text-slate-400">
                    Leverages high-intent channels
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailEnabled}
                  onChange={(e) => setEmailEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {emailEnabled && (
              <div className="space-y-4 mt-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">
                      Traffic (Sessions) Growth
                    </span>
                    <span className="text-emerald-400 font-bold">
                      +{emailTrafficBoost}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={emailTrafficBoost}
                    onChange={(e) =>
                      setEmailTrafficBoost(parseInt(e.target.value))
                    }
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-2xs text-slate-500">
                    Expands subscriber captures & automated drips
                  </span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">
                      Campaign Softwares & Platform Tooling Fee
                    </span>
                    <span className="text-rose-400 font-bold">
                      {formatCurrency(emailBudget)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={emailBudget}
                    onChange={(e) => setEmailBudget(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* STRATEGY 3: ORGANIC SOCIAL FIX */}
          <div
            className={`p-4 rounded-xl border transition ${
              socialEnabled
                ? 'bg-slate-900 border-emerald-500/50'
                : 'bg-slate-950/20 border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤳</span>
                <div>
                  <h3 className="text-sm font-bold">
                    3. Align Social Landing Pages
                  </h3>
                  <p className="text-2xs text-slate-400">
                    Captures engaged mobile traffic
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={socialEnabled}
                  onChange={(e) => setSocialEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {socialEnabled && (
              <div className="space-y-4 mt-3 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">
                      Conversion Boost on Custom Funnels
                    </span>
                    <span className="text-emerald-400 font-bold">
                      +{socialConvBoost}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={socialConvBoost}
                    onChange={(e) =>
                      setSocialConvBoost(parseInt(e.target.value))
                    }
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-2xs text-slate-500">
                    Direct matches social posts to checkout flows
                  </span>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">
                      Content Production & Dynamic Routing Budget
                    </span>
                    <span className="text-rose-400 font-bold">
                      {formatCurrency(socialBudget)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="100"
                    value={socialBudget}
                    onChange={(e) => setSocialBudget(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* FINANCIAL SETTINGS */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 text-xs space-y-4">
            <h3 className="font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider text-2xs">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Global Shop Parameters
            </h3>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Trouser Gross Margin</span>
                <span className="text-slate-200 font-bold">{grossMargin}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="85"
                value={grossMargin}
                onChange={(e) => setGrossMargin(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="text-2xs text-slate-500">
                Retail margins vary by volume and manufacturing
              </span>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">
                  Fixed Overhead (Operations/Base ads)
                </span>
                <span className="text-slate-200 font-bold">
                  {formatCurrency(fixedOverhead)}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={fixedOverhead}
                onChange={(e) => setFixedOverhead(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-500"
              />
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: WORKSPACE */}
        <main className="flex-1 bg-slate-900 p-6 flex flex-col gap-6 overflow-y-auto">
          {/* NAVIGATION TABS */}
          <div className="flex border-b border-slate-800 gap-2">
            {[
              { id: 'dashboard', label: 'Financial Projections' },
              { id: 'channels', label: 'Channel Deep-Dive' },
              { id: 'funnels', label: 'Conversion Funnels' },
              { id: 'scenarios', label: 'Scenario Builder' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 font-medium text-sm transition border-b-2 -mb-[2px] ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* DYNAMIC TAB CONTENTS */}

          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* PRIMARY STAT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                    Projected Net Profit
                  </span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-emerald-400">
                      {formatCurrency(calculatedData.projNetProfit)}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Historical Base:{' '}
                      {formatCurrency(calculatedData.baseNetProfit)}
                    </span>
                  </div>
                  <div
                    className={`text-xs inline-flex items-center gap-1 font-bold ${
                      calculatedData.netProfitDelta >= 0
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {calculatedData.netProfitDelta >= 0 ? '▲' : '▼'}
                    {formatCurrency(
                      Math.abs(calculatedData.netProfitDelta)
                    )}{' '}
                    Incremental Profit
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                    Projected Gross Revenue
                  </span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-indigo-400">
                      {formatCurrency(calculatedData.projTotalRev)}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Historical Base:{' '}
                      {formatCurrency(calculatedData.baseTotalRev)}
                    </span>
                  </div>
                  <div className="text-xs text-indigo-300 font-bold">
                    ▲{' '}
                    {formatPercentage(
                      ((calculatedData.projTotalRev -
                        calculatedData.baseTotalRev) /
                        calculatedData.baseTotalRev) *
                        100
                    )}{' '}
                    Revenue Increase
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                    Strategic ROI Meter
                  </span>
                  <div className="my-2">
                    <span className="text-3xl font-extrabold text-amber-400">
                      {calculatedData.totalStrategyInvestment > 0
                        ? formatPercentage(calculatedData.roiPercentage)
                        : '0%'}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Total Allocated Budget:{' '}
                      {formatCurrency(calculatedData.totalStrategyInvestment)}
                    </span>
                  </div>
                  <div className="text-xs text-amber-300 font-medium leading-relaxed">
                    Every $1 invested yields{' '}
                    <span className="font-bold">
                      {calculatedData.totalStrategyInvestment > 0
                        ? formatCurrency(
                            calculatedData.netProfitDelta /
                              calculatedData.totalStrategyInvestment +
                              1
                          )
                        : '$0.00'}
                    </span>{' '}
                    in returned profit value.
                  </div>
                </div>
              </div>

              {/* SECONDARY RATIOS BAR */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950/20 p-4 rounded-xl border border-slate-800/60">
                <div className="text-center">
                  <p className="text-2xs text-slate-400 uppercase tracking-wider">
                    Total Transactions
                  </p>
                  <p className="text-lg font-bold mt-1 text-slate-200">
                    {formatNum(calculatedData.projTotalTx)}{' '}
                    <span className="text-2xs text-emerald-500 font-medium">
                      ({formatNum(calculatedData.baseTotalTx)} base)
                    </span>
                  </p>
                </div>
                <div className="text-center border-l border-slate-800">
                  <p className="text-2xs text-slate-400 uppercase tracking-wider">
                    Total Visits (Sessions)
                  </p>
                  <p className="text-lg font-bold mt-1 text-slate-200">
                    {formatNum(calculatedData.projTotalSessions)}{' '}
                    <span className="text-2xs text-indigo-400 font-medium">
                      ({formatNum(calculatedData.baseTotalSessions)} base)
                    </span>
                  </p>
                </div>
                <div className="text-center border-l border-slate-800">
                  <p className="text-2xs text-slate-400 uppercase tracking-wider">
                    Blended Conv. Rate
                  </p>
                  <p className="text-lg font-bold mt-1 text-slate-200">
                    {formatPercentage(
                      (calculatedData.projTotalTx /
                        calculatedData.projTotalSessions) *
                        100
                    )}{' '}
                    <span className="text-2xs text-emerald-500 font-medium">
                      (
                      {formatPercentage(
                        (calculatedData.baseTotalTx /
                          calculatedData.baseTotalSessions) *
                          100
                      )}{' '}
                      base)
                    </span>
                  </p>
                </div>
                <div className="text-center border-l border-slate-800">
                  <p className="text-2xs text-slate-400 uppercase tracking-wider">
                    Average Order Value
                  </p>
                  <p className="text-lg font-bold mt-1 text-slate-200">
                    {formatCurrency(
                      calculatedData.projTotalRev / calculatedData.projTotalTx
                    )}{' '}
                    <span className="text-2xs text-emerald-500 font-medium">
                      (
                      {formatCurrency(
                        calculatedData.baseTotalRev / calculatedData.baseTotalTx
                      )}{' '}
                      base)
                    </span>
                  </p>
                </div>
              </div>

              {/* PERFORMANCE CHART VISUALIZATION */}
              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-base font-bold mb-4 text-slate-200 flex justify-between items-center">
                  <span>Forecast Comparison Chart</span>
                  <span className="text-xs text-slate-500 font-normal">
                    Base performance vs. strategic forecast metrics
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-64 items-end pt-6">
                  {/* REVENUE BAR */}
                  <div className="h-full flex flex-col justify-end">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Total Revenue Growth</span>
                      <span className="text-emerald-400 font-bold">
                        +
                        {formatPercentage(
                          ((calculatedData.projTotalRev -
                            calculatedData.baseTotalRev) /
                            calculatedData.baseTotalRev) *
                            100
                        )}
                      </span>
                    </div>
                    <div className="flex gap-4 items-end h-48 border-b border-l border-slate-800 p-2">
                      <div className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-slate-700 hover:bg-slate-600 transition-all rounded-t-md"
                          style={{ height: '60%' }}
                        />
                        <span className="text-2xs text-slate-400 mt-2 font-medium">
                          {formatCurrency(calculatedData.baseTotalRev)}
                        </span>
                        <span className="text-2xs text-slate-500">
                          Historical Base
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-indigo-500 hover:bg-indigo-400 transition-all rounded-t-md"
                          style={{
                            height: `${Math.min(
                              98,
                              60 *
                                (calculatedData.projTotalRev /
                                  calculatedData.baseTotalRev)
                            )}%`,
                          }}
                        />
                        <span className="text-2xs text-indigo-300 mt-2 font-bold">
                          {formatCurrency(calculatedData.projTotalRev)}
                        </span>
                        <span className="text-2xs text-slate-400">
                          Projected Strategy
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* NET PROFIT BAR */}
                  <div className="h-full flex flex-col justify-end">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Net Profit Expansion</span>
                      <span className="text-emerald-400 font-bold">
                        +
                        {formatPercentage(
                          ((calculatedData.projNetProfit -
                            calculatedData.baseNetProfit) /
                            Math.abs(calculatedData.baseNetProfit)) *
                            100
                        )}
                      </span>
                    </div>
                    <div className="flex gap-4 items-end h-48 border-b border-l border-slate-800 p-2">
                      <div className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-slate-700 hover:bg-slate-600 transition-all rounded-t-md"
                          style={{ height: '40%' }}
                        />
                        <span className="text-2xs text-slate-400 mt-2 font-medium">
                          {formatCurrency(calculatedData.baseNetProfit)}
                        </span>
                        <span className="text-2xs text-slate-500">
                          Historical Base
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-emerald-500 hover:bg-emerald-400 transition-all rounded-t-md"
                          style={{
                            height: `${Math.min(
                              98,
                              40 *
                                (calculatedData.projNetProfit /
                                  calculatedData.baseNetProfit)
                            )}%`,
                          }}
                        />
                        <span className="text-2xs text-emerald-300 mt-2 font-bold">
                          {formatCurrency(calculatedData.projNetProfit)}
                        </span>
                        <span className="text-2xs text-slate-400">
                          Projected Strategy
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED DATA TABLE */}
          {activeTab === 'channels' && (
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden p-6">
              <div className="mb-4">
                <h3 className="text-base font-bold text-slate-200">
                  Segmented Channel Forecast Model
                </h3>
                <p className="text-xs text-slate-400">
                  Verify raw metric performance shift across every single
                  traffic driver
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-2">Traffic Channel</th>
                      <th className="py-3 px-2">Device</th>
                      <th className="py-3 px-2 text-right">
                        Sessions (Proj / Base)
                      </th>
                      <th className="py-3 px-2 text-right">
                        Transactions (Proj / Base)
                      </th>
                      <th className="py-3 px-2 text-right">
                        Conv. Rate (Proj / Base)
                      </th>
                      <th className="py-3 px-2 text-right">
                        AOV (Proj / Base)
                      </th>
                      <th className="py-3 px-2 text-right text-indigo-400">
                        Revenue Forecast
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {calculatedData.channelsBreakdown.map((row, idx) => {
                      const hasChange =
                        row.sessions !== row.projectedSessions ||
                        row.tx !== row.projectedTx ||
                        row.rev !== row.projectedRev;
                      return (
                        <tr
                          key={idx}
                          className={`hover:bg-slate-800/40 transition-colors ${
                            hasChange ? 'bg-slate-900/30' : ''
                          }`}
                        >
                          <td className="py-3.5 px-2 font-semibold text-slate-200 flex items-center gap-1.5">
                            {row.channel === 'Email' && '✉️'}
                            {row.channel === 'Organic Search' && '🔍'}
                            {row.channel === 'Paid Search' && '🚀'}
                            {row.channel === 'Direct' && '🚪'}
                            {row.channel === 'Organic Social' && '🤳'}
                            {row.channel === 'Paid Social' && '💳'}
                            {row.channel}
                          </td>
                          <td className="py-3.5 px-2 uppercase text-2xs text-slate-400 font-mono">
                            {row.device === 'mobile' && '📱 Mobile'}
                            {row.device === 'desktop' && '💻 Desktop'}
                            {row.device === 'tablet' && '📟 Tablet'}
                          </td>

                          {/* SESSIONS */}
                          <td className="py-3.5 px-2 text-right font-mono">
                            <span
                              className={
                                row.projectedSessions > row.sessions
                                  ? 'text-emerald-400 font-bold'
                                  : 'text-slate-300'
                              }
                            >
                              {formatNum(row.projectedSessions)}
                            </span>
                            <span className="text-slate-500 block text-2xs">
                              ({formatNum(row.sessions)})
                            </span>
                          </td>

                          {/* TRANSACTIONS */}
                          <td className="py-3.5 px-2 text-right font-mono">
                            <span
                              className={
                                row.projectedTx > row.tx
                                  ? 'text-emerald-400 font-bold'
                                  : 'text-slate-300'
                              }
                            >
                              {formatNum(row.projectedTx)}
                            </span>
                            <span className="text-slate-500 block text-2xs">
                              ({formatNum(row.tx)})
                            </span>
                          </td>

                          {/* CONVERSION RATE */}
                          <td className="py-3.5 px-2 text-right font-mono">
                            <span
                              className={
                                row.projectedCr > row.baseCr
                                  ? 'text-emerald-400 font-bold'
                                  : 'text-slate-300'
                              }
                            >
                              {formatPercentage(row.projectedCr)}
                            </span>
                            <span className="text-slate-500 block text-2xs">
                              ({formatPercentage(row.baseCr)})
                            </span>
                          </td>

                          {/* AOV */}
                          <td className="py-3.5 px-2 text-right font-mono">
                            <span
                              className={
                                row.projectedAov > row.baseAov
                                  ? 'text-emerald-400 font-bold'
                                  : 'text-slate-300'
                              }
                            >
                              {formatCurrency(row.projectedAov)}
                            </span>
                            <span className="text-slate-500 block text-2xs">
                              ({formatCurrency(row.baseAov)})
                            </span>
                          </td>

                          {/* REVENUE */}
                          <td className="py-3.5 px-2 text-right font-mono font-bold text-indigo-400">
                            {formatCurrency(row.projectedRev)}
                            <span className="text-slate-500 block text-2xs font-normal">
                              ({formatCurrency(row.rev)})
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: FUNNEL COMPARISON */}
          {activeTab === 'funnels' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* DESKTOP FUNNEL */}
              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-slate-200">
                    💻 Desktop Funnel Model
                  </h3>
                  <p className="text-xs text-slate-400">
                    Robust base conversion benchmark metrics
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  {/* LEVEL 1: SESSIONS */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">
                        1. Total Ad / Organic Impressions & Sessions
                      </span>
                      <span className="font-bold">
                        {formatNum(14490)} Sessions
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-8 rounded-lg overflow-hidden flex items-center px-4 relative">
                      <div className="absolute top-0 left-0 bg-indigo-500/20 h-full w-full" />
                      <span className="text-xs font-semibold z-10 text-indigo-300">
                        100% of desktop traffic
                      </span>
                    </div>
                  </div>

                  {/* LEVEL 2: ADD TO CART */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">
                        2. Trouser Sizing & Add to Cart
                      </span>
                      <span className="font-bold">
                        {formatNum(3442)} Actions (23.7% add-to-cart rate)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-8 rounded-lg overflow-hidden flex items-center px-4 relative">
                      <div className="absolute top-0 left-0 bg-indigo-500/40 h-full w-[23.7%]" />
                      <span className="text-xs font-semibold z-10 text-indigo-200">
                        23.7% of sessions
                      </span>
                    </div>
                  </div>

                  {/* LEVEL 3: CHECKOUT */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">
                        3. Checkout Completed Orders
                      </span>
                      <span className="font-bold">
                        {formatNum(820)} Purchases (23.8% checkout rate)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-8 rounded-lg overflow-hidden flex items-center px-4 relative">
                      <div className="absolute top-0 left-0 bg-indigo-500/70 h-full w-[5.6%]" />
                      <span className="text-xs font-semibold z-10 text-indigo-100">
                        5.6% overall checkout rate
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOBILE FUNNEL WITH LIVE UPDATING METRICS */}
              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-slate-200">
                    📱 Mobile & Tablet Funnel Model
                  </h3>
                  <p className="text-xs text-slate-400">
                    Calculates friction removal updates dynamically
                  </p>
                </div>

                {/* Calculate live Mobile Sums */}
                {(() => {
                  const baseMobSessions =
                    8830 + 1120 + 3500 + 3400 + 5230 + 3150 + 850; // 26,080
                  const baseMobCarts = 915 + 105 + 420 + 425 + 210 + 315 + 188; // 2,578
                  const baseMobTx = 215 + 28 + 105 + 91 + 35 + 65 + 55; // 594

                  // Projects
                  let projMobSessions = baseMobSessions;
                  let projMobCarts = baseMobCarts;
                  let projMobTx = baseMobTx;

                  // Apply active strategies
                  if (mobileUxEnabled) {
                    projMobTx = baseMobTx * (1 + mobileConvBoost / 100);
                    projMobCarts =
                      baseMobCarts * (1 + (mobileConvBoost * 0.4) / 100);
                  }
                  if (socialEnabled) {
                    // Only applies to organic social mobile portion (base 35 transactions)
                    const extraSocialTx = 35 * (socialConvBoost / 100);
                    const extraSocialCarts =
                      210 * ((socialConvBoost * 0.6) / 100);
                    projMobTx += extraSocialTx;
                    projMobCarts += extraSocialCarts;
                  }
                  if (emailEnabled) {
                    // Only applies to email mobile portion (base 55 transactions)
                    const extraEmailTx = 55 * (emailTrafficBoost / 100);
                    const extraEmailCarts = 188 * (emailTrafficBoost / 100);
                    const extraEmailSessions = 850 * (emailTrafficBoost / 100);
                    projMobTx += extraEmailTx;
                    projMobCarts += extraEmailCarts;
                    projMobSessions += extraEmailSessions;
                  }

                  const activeCartPct = (projMobCarts / projMobSessions) * 100;
                  const activeOverallCheckoutPct =
                    (projMobTx / projMobSessions) * 100;

                  return (
                    <div className="space-y-6 pt-4">
                      {/* LEVEL 1: SESSIONS */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">
                            1. Total Impressions & Sessions
                          </span>
                          <span className="font-bold">
                            {formatNum(projMobSessions)} Sessions
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-8 rounded-lg overflow-hidden flex items-center px-4 relative">
                          <div className="absolute top-0 left-0 bg-emerald-500/20 h-full w-full" />
                          <span className="text-xs font-semibold z-10 text-emerald-300">
                            100% of mobile traffic
                          </span>
                        </div>
                      </div>

                      {/* LEVEL 2: ADD TO CART */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">
                            2. Trouser Add to Cart Actions
                          </span>
                          <span className="font-bold">
                            {formatNum(projMobCarts)} Actions (
                            {formatPercentage(activeCartPct)} rate)
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-8 rounded-lg overflow-hidden flex items-center px-4 relative">
                          <div
                            className="absolute top-0 left-0 bg-emerald-500/40 h-full transition-all duration-300"
                            style={{
                              width: `${Math.min(100, activeCartPct)}%`,
                            }}
                          />
                          <span className="text-xs font-semibold z-10 text-emerald-200">
                            {formatPercentage(activeCartPct)} of sessions
                          </span>
                        </div>
                      </div>

                      {/* LEVEL 3: CHECKOUT */}
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">
                            3. Checkout Completed Orders
                          </span>
                          <span className="font-bold">
                            {formatNum(projMobTx)} Purchases (
                            {formatPercentage(activeOverallCheckoutPct)} rate)
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-8 rounded-lg overflow-hidden flex items-center px-4 relative">
                          <div
                            className="absolute top-0 left-0 bg-emerald-500/70 h-full transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                100,
                                activeOverallCheckoutPct * 4
                              )}%`,
                            }} // scale width visually so tiny shifts display clearly
                          />
                          <span className="text-xs font-semibold z-10 text-emerald-100">
                            {formatPercentage(activeOverallCheckoutPct)} overall
                            checkout rate
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* TAB 4: SCENARIO SAVER & MANAGER */}
          {activeTab === 'scenarios' && (
            <div className="space-y-6">
              {/* SAVE CURRENT STATE SECTION */}
              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-slate-200 mb-2">
                  Save Current Custom Scenario
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Freeze your current toggle states, conversion coefficients,
                  and budgets as a named forecast scenario.
                </p>

                <form
                  onSubmit={saveCurrentScenario}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="text"
                    required
                    placeholder="e.g., Q3 High Growth Phase, Minimal Dev Cost Run..."
                    value={newScenarioName}
                    onChange={(e) => setNewScenarioName(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm py-2 px-6 rounded-lg transition"
                  >
                    Save Model Scenario
                  </button>
                </form>
              </div>

              {/* LIST SAVED SCENARIOS */}
              <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-slate-200 mb-4">
                  Your Custom Saved Scenarios
                </h3>

                {savedScenarios.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    No custom scenarios saved yet. Build an outlook state on the
                    left and hit "Save Model Scenario" above!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedScenarios.map((sc) => (
                      <div
                        key={sc.id}
                        className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-slate-200">
                            {sc.name}
                          </h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-2xs text-slate-400">
                            <span>
                              Mobile Boost:{' '}
                              <strong className="text-slate-300">
                                {sc.settings.mobileUxEnabled
                                  ? `+${sc.settings.mobileConvBoost}%`
                                  : 'Disabled'}
                              </strong>
                            </span>
                            <span>
                              Email Scale:{' '}
                              <strong className="text-slate-300">
                                {sc.settings.emailEnabled
                                  ? `+${sc.settings.emailTrafficBoost}%`
                                  : 'Disabled'}
                              </strong>
                            </span>
                            <span>
                              Social Align:{' '}
                              <strong className="text-slate-300">
                                {sc.settings.socialEnabled
                                  ? `+${sc.settings.socialConvBoost}%`
                                  : 'Disabled'}
                              </strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <span className="text-2xs text-slate-500 uppercase block font-semibold">
                              Projected Net Profit
                            </span>
                            <span className="text-sm font-bold text-emerald-400">
                              {formatCurrency(sc.metrics.netProfit)}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-2xs text-slate-500 uppercase block font-semibold">
                              Incremental gain
                            </span>
                            <span className="text-sm font-bold text-indigo-300">
                              +{formatCurrency(sc.metrics.netProfitDelta)}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-2xs text-slate-500 uppercase block font-semibold">
                              Strategic ROI
                            </span>
                            <span className="text-sm font-bold text-amber-400">
                              {formatPercentage(sc.metrics.roi)}
                            </span>
                          </div>

                          <button
                            onClick={() => deleteScenario(sc.id)}
                            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-rose-400 transition"
                            title="Delete scenario"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950/40 p-4 text-center text-xs text-slate-500">
        TrouserCo Data Intelligence Tool. Constructed dynamically to test
        website conversion optimizations.
      </footer>
    </div>
  );
}
