import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { NavigationTab } from '../../types';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Plus, 
  Menu, 
  X, 
  Sparkles,
  LayoutDashboard,
  Cpu,
  GitBranch,
  Users,
  Network,
  Zap,
  ShieldCheck,
  Award,
  Briefcase,
  BarChart3,
  Home
} from 'lucide-react';

interface TopBarProps {
  setMobileOpen: (open: boolean) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ setMobileOpen }) => {
  const { 
    activeTab,
    setActiveTab, 
    activities, 
    generateWorkflowFromPrompt,
    toggleTheme
  } = useApp();

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [createPrompt, setCreatePrompt] = useState<string>('');

  const handleQuickCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createPrompt.trim()) return;
    generateWorkflowFromPrompt(createPrompt);
    setCreatePrompt('');
    setShowCreateModal(false);
    setActiveTab('workflows');
  };

  const navItems: { id: NavigationTab; label: string; icon: any }[] = [
    { id: 'landing', label: 'HOME', icon: Home },
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'ai-workspace', label: 'AI WORKSPACE', icon: Cpu },
    { id: 'workflows', label: 'WORKFLOWS', icon: GitBranch },
    { id: 'candidates', label: 'CANDIDATES', icon: Users },
    { id: 'skill-graph', label: 'SKILL GRAPH', icon: Network },
    { id: 'skill-gap', label: 'SKILL GAP', icon: Zap },
    { id: 'credentials', label: 'CREDENTIALS', icon: ShieldCheck },
    { id: 'skill-passport', label: 'PASSPORT', icon: Award },
    { id: 'projects', label: 'PROJECTS', icon: Briefcase },
    { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-30 w-full px-2 md:px-6 py-3 flex flex-col space-y-3 transition-colors">
      {/* Top Controls Row */}
      <div className="flex items-center justify-between gap-4 px-2">
        {/* Left Mobile Menu Toggle & Brand Greeting */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md text-slate-900 dark:text-white border border-white/60 dark:border-slate-700 shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400"></span>
            <h1 className="text-sm md:text-base font-black text-slate-900 dark:text-white tracking-tight">
              SkillFlow AI Platform
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-[9px] font-mono font-black border border-cyan-400/30 hidden sm:inline-block">
              EVM Sepolia Testnet
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md border border-cyan-300/40 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Workflow</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => toggleTheme()}
            className="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/60 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-white shadow-sm cursor-pointer"
            title="Toggle Dark / Light Mode"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowSearchModal(true)}
            className="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/60 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-white shadow-sm cursor-pointer"
            title="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </motion.button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/60 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-white shadow-sm relative cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 border border-white dark:border-slate-900"></span>
            </motion.button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 rounded-3xl bg-slate-900/95 border border-slate-700 shadow-2xl p-4 z-50 text-white backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <span className="text-xs font-black text-white">System Telemetry Logs</span>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">{activities.length} Events</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {activities.slice(0, 4).map((act) => (
                    <div key={act.id} className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-left">
                      <p className="text-xs text-slate-100 font-extrabold">{act.title}</p>
                      <span className="text-[10px] text-cyan-400 font-mono font-bold mt-1 block">{act.timestamp}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    setActiveTab('dashboard');
                  }}
                  className="w-full mt-3 pt-2 border-t border-slate-800 text-xs text-cyan-300 font-black hover:underline text-center block cursor-pointer"
                >
                  View Activity Telemetry
                </button>
              </div>
            )}
          </div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTab('skill-passport')}
            className="cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
              alt="Arun Kumar" 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-400 shadow-sm"
            />
          </motion.div>
        </div>
      </div>

      {/* FUTURISTIC SCI-FI SEGMENTED LIQUID GLASS NAVIGATION BAR */}
      <div className="w-full scifi-glass-navbar rounded-[20px] overflow-x-auto custom-scrollbar shadow-2xl border border-white/60 dark:border-slate-700/60">
        <div className="flex items-center justify-between min-w-max px-1 py-0.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const IconComp = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  scifi-glass-tab px-4 py-2.5 flex items-center gap-2 text-[11px] font-black tracking-wider uppercase transition-all cursor-pointer flex-1 justify-center
                  ${isActive 
                    ? 'scifi-glass-tab-active text-black dark:text-white font-black' 
                    : 'text-black/85 dark:text-slate-200 font-black hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'}
                `}
              >
                <IconComp className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-rose-600 dark:text-rose-400 stroke-[2.5]' : 'text-black dark:text-slate-200 stroke-[2.2]'}`} />
                <span className="font-black text-black dark:text-slate-100">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black">Create New AI Workflow Pipeline</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-full hover:bg-slate-800">
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleQuickCreateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-black block mb-1">Enter Requirement Prompt</label>
                <textarea
                  rows={3}
                  value={createPrompt}
                  onChange={(e) => setCreatePrompt(e.target.value)}
                  placeholder="e.g. Hire a verified UI/UX designer for 2 months..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-3 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 rounded-xl text-xs font-black hover:bg-slate-800">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs shadow-md border border-cyan-300/40">
                  Generate Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-black">Search Platform Data</span>
              <button onClick={() => setShowSearchModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-3.5" />
              <input
                type="text"
                autoFocus
                placeholder="Search candidates, EVM hashes, skills..."
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-9 pr-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;


