import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Info, 
  MoreHorizontal, 
  TrendingUp, 
  ArrowUpRight, 
  HelpCircle,
  X
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(5); // JUN active by default as in screenshot
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 12 Months data matching reference design
  const monthlyData = [
    { month: 'JAN', year: '2025', newUsers: 22, existingUsers: 12, blocksNew: 4, blocksExist: 2 },
    { month: 'FEB', year: '2025', newUsers: 28, existingUsers: 15, blocksNew: 5, blocksExist: 3 },
    { month: 'MAR', year: '2025', newUsers: 24, existingUsers: 10, blocksNew: 4, blocksExist: 2 },
    { month: 'APR', year: '2025', newUsers: 32, existingUsers: 14, blocksNew: 6, blocksExist: 3 },
    { month: 'MAY', year: '2025', newUsers: 30, existingUsers: 16, blocksNew: 5, blocksExist: 3 },
    { month: 'JUN', year: '2025', newUsers: 38, existingUsers: 18, blocksNew: 7, blocksExist: 4 },
    { month: 'JUL', year: '2025', newUsers: 26, existingUsers: 14, blocksNew: 5, blocksExist: 3 },
    { month: 'AUG', year: '2025', newUsers: 34, existingUsers: 20, blocksNew: 6, blocksExist: 4 },
    { month: 'SEP', year: '2025', newUsers: 29, existingUsers: 15, blocksNew: 5, blocksExist: 3 },
    { month: 'OCT', year: '2025', newUsers: 36, existingUsers: 19, blocksNew: 7, blocksExist: 4 },
    { month: 'NOV', year: '2025', newUsers: 25, existingUsers: 13, blocksNew: 4, blocksExist: 2 },
    { month: 'DEC', year: '2025', newUsers: 42, existingUsers: 22, blocksNew: 8, blocksExist: 5 },
  ];

  const activeIndex = hoveredMonthIndex !== null ? hoveredMonthIndex : selectedMonthIndex;
  const activeItem = monthlyData[activeIndex];

  // Top 3 KPI metric tiles matching reference image
  const kpiMetrics = [
    {
      title: 'TOTAL REVENUE',
      value: '$20,320',
      sub: '',
      growth: '+0,94 last year',
      sparkline: [40, 65, 30, 85, 95]
    },
    {
      title: 'TOTAL ORDERS',
      value: '10,320',
      unit: 'Orders',
      growth: '+0,91 last year',
      sparkline: [50, 40, 75, 90, 100]
    },
    {
      title: 'NEW CUSTOMERS',
      value: '4,305',
      unit: 'New Users',
      growth: '+0,94 last year',
      sparkline: [35, 55, 45, 80, 88]
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 text-slate-900 dark:text-white">
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-slate-900 dark:text-white">Overview</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Welcome back, Salung
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-700/60 rounded-2xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 backdrop-blur-md shadow-sm"
          />
        </div>
      </div>

      {/* TOP ROW: 3 Metric Cards (Total Revenue, Total Orders, New Customers) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiMetrics.map((kpi, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -3 }}
            className="liquid-glass-panel p-6 rounded-[24px] space-y-4 shadow-xl border border-white/40 dark:border-slate-700/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  {kpi.title}
                </span>
                
                {/* Mini Sparkline Graph (5 Vertical Bars) */}
                <div className="flex items-end gap-1 h-8">
                  {kpi.sparkline.map((heightPct, barIdx) => (
                    <div
                      key={barIdx}
                      style={{ height: `${heightPct}%` }}
                      className={`w-1.5 rounded-full transition-all ${
                        barIdx === kpi.sparkline.length - 1
                          ? 'bg-slate-900 dark:bg-white shadow-sm'
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {kpi.unit}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-2 border-t border-white/20 dark:border-slate-800 text-[11px] font-mono font-black text-emerald-600 dark:text-emerald-400">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
                <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              </div>
              <span>{kpi.growth}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MAIN SALES / WORKFORCE TREND CHART CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="liquid-glass-panel p-6 md:p-8 rounded-[32px] space-y-6 shadow-2xl relative overflow-hidden"
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-white/20 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black uppercase text-slate-800 dark:text-slate-200 tracking-wider font-mono">
              SALES TREND
            </h3>
            <button 
              onClick={() => setShowInfoModal(true)}
              className="p-1 rounded-full text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer"
              title="View Information Effect Details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <button className="p-1.5 rounded-xl hover:bg-white/30 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Controls & Summary Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">Total Revenue :</span>
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">$20,320</span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-mono font-bold">
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span> NEW USER
              </span>
              <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white"></span> EXISTING USER
              </span>
            </div>
          </div>

          {/* Timeframe Filter Pills */}
          <div className="flex items-center gap-1 bg-white/40 dark:bg-slate-900/60 p-1.5 rounded-full border border-white/50 dark:border-slate-700/60 backdrop-blur-md self-start sm:self-auto">
            {(['weekly', 'monthly', 'yearly'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-black capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md border border-white/60 dark:border-slate-700/60'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Pixel Bar Chart with Grid Background & Dynamic Information Effect */}
        <div className="relative pt-6 pb-2 min-h-[340px]">
          {/* Subtle Grid Lines Background */}
          <div className="absolute inset-x-0 top-6 bottom-10 flex flex-col justify-between pointer-events-none opacity-20">
            {[60, 50, 40, 30, 20, 10, 0].map((val) => (
              <div key={val} className="border-b border-dashed border-slate-400 dark:border-slate-600 w-full h-0" />
            ))}
          </div>

          {/* Chart Core Layout */}
          <div className="flex items-stretch gap-4 relative z-10">
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 pr-2 select-none">
              <span>60k</span>
              <span>50k</span>
              <span>40k</span>
              <span>30k</span>
              <span>20k</span>
              <span>10k</span>
              <span>0k</span>
            </div>

            {/* 12 Month Bar Columns Canvas */}
            <div className="flex-1 grid grid-cols-12 gap-2 sm:gap-4 items-end min-h-[280px]">
              {monthlyData.map((item, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredMonthIndex(idx)}
                    onMouseLeave={() => setHoveredMonthIndex(null)}
                    onClick={() => setSelectedMonthIndex(idx)}
                    className="flex flex-col items-center gap-2 group cursor-pointer relative h-full justify-end"
                  >
                    {/* Vertical Dashed Guideline indicator when active */}
                    {isSelected && (
                      <div className="absolute inset-y-0 w-0 border-r-2 border-dashed border-slate-400 dark:border-slate-500 z-0 pointer-events-none" />
                    )}

                    {/* Interactive Node Marker dot when active */}
                    {isSelected && (
                      <motion.div 
                        layoutId="activeChartMarker"
                        className="w-3 h-3 rounded-full bg-slate-900 dark:bg-white border-2 border-white dark:border-slate-900 shadow-lg absolute top-[30%] z-20"
                      />
                    )}

                    {/* Pixel Block Bars Column Stack */}
                    <div className="w-full max-w-[28px] flex flex-col justify-end items-center gap-1 relative z-10">
                      {/* Existing Users Stack (Dark Pixel Blocks) */}
                      <div className="w-full flex flex-col gap-0.5">
                        {Array.from({ length: item.blocksExist }).map((_, bIdx) => (
                          <div
                            key={`ex-${bIdx}`}
                            className={`h-2.5 rounded-sm transition-all duration-300 ${
                              isSelected
                                ? 'bg-slate-900 dark:bg-white shadow-md'
                                : 'bg-slate-700 dark:bg-slate-400 group-hover:bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>

                      {/* New Users Stack (Light Pixel Blocks) */}
                      <div className="w-full flex flex-col gap-0.5">
                        {Array.from({ length: item.blocksNew }).map((_, bIdx) => (
                          <div
                            key={`nw-${bIdx}`}
                            className={`h-2.5 rounded-sm transition-all duration-300 ${
                              isSelected
                                ? 'bg-slate-400 dark:bg-slate-300'
                                : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* X-Axis Month Label */}
                    <span className={`text-[10px] font-mono font-extrabold uppercase transition-colors ${
                      isSelected
                        ? 'text-slate-900 dark:text-white underline decoration-2 underline-offset-4'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700'
                    }`}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FLOATING GLASS INFORMATION EFFECT TOOLTIP CARD (Matching Reference Image) */}
          <AnimatePresence>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                left: `calc(10% + ${(activeIndex / 11) * 75}%)`
              }}
              className="absolute top-[20%] -translate-x-1/2 z-30 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/95 text-slate-900 dark:text-white border border-white/60 dark:border-slate-700/80 shadow-2xl backdrop-blur-xl w-48 space-y-2 pointer-events-none"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                <span className="text-xs font-mono font-black text-slate-500 dark:text-slate-400">
                  {activeItem.month} {activeItem.year}
                </span>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                  Verified Data
                </span>
              </div>

              <div className="space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span> New User
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">{activeItem.newUsers}k</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                    <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white"></span> Existing User
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">{activeItem.existingUsers}k</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* INFORMATION EFFECT EXPLANATION MODAL */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="liquid-glass-panel max-w-lg w-full p-6 md:p-8 rounded-[32px] space-y-5 shadow-2xl relative border border-white/50 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/95"
            >
              <button
                onClick={() => setShowInfoModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 flex items-center justify-center border border-cyan-400/30">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Information Effect & Telemetry</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Sales & Workforce Growth Telemetry Breakdown</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <p>
                  <strong>Active Month Selected:</strong> <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{activeItem.month} {activeItem.year}</span>
                </p>
                <p>
                  The interactive matrix visualizes verified candidate subscriptions (New Users) versus returning workforce deployments (Existing Users) across 12 calendar months.
                </p>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span>New Candidates Onboarded:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{activeItem.newUsers},000 Users</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Existing Active Workflows:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{activeItem.existingUsers},000 Workflows</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-300 dark:border-slate-700 pt-2">
                    <span>Combined Revenue Telemetry:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">${(activeItem.newUsers + activeItem.existingUsers) * 360} USD</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs shadow-md cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsView;

