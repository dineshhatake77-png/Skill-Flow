import React from 'react';
import { useApp } from '../../context/AppContext';
import type { NavigationTab } from '../../types';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Sparkles, 
  GitBranch, 
  UserCheck, 
  Network, 
  Zap, 
  ShieldCheck, 
  Boxes, 
  Award, 
  Briefcase, 
  BarChart3, 
  Sliders, 
  Bot, 
  CheckCircle2 
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsAssistantOpen 
  } = useApp();

  const mainNavItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'ai-workspace', label: 'AI Workspace', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'workflows', label: 'Workflows', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'candidates', label: 'Candidates', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'skill-graph', label: 'Skill Graph', icon: <Network className="w-4 h-4" /> },
    { id: 'skill-gap', label: 'Skill Gap', icon: <Zap className="w-4 h-4" /> },
    { id: 'credentials', label: 'Credentials', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'skill-passport', label: 'Skill Passport', icon: <Award className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <aside className={`
      fixed md:absolute inset-y-0 left-0 z-40 w-64 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out
      ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Floating Liquid Glass Sidebar Container with Motion */}
      <motion.div 
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="w-full h-full idraft-sidebar p-5 flex flex-col justify-between overflow-y-auto rounded-[32px] relative text-slate-900 dark:text-white backdrop-blur-2xl shadow-2xl transition-all"
      >
        <div>
          {/* Top Brand Logo with Motion Pulse */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer mb-6 px-2 py-1"
          >
            <motion.div 
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 border border-cyan-300/50 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight block">SkillFlow</span>
              <span className="block text-[11px] text-cyan-600 dark:text-cyan-400 font-mono font-black">AI & Verifiable Skills</span>
            </div>
          </motion.div>

          {/* Primary Nav List with Motion Hover */}
          <nav className="space-y-1.5">
            {mainNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all relative overflow-hidden backdrop-blur-md border
                    ${isActive 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300/40 shadow-lg shadow-cyan-500/25' 
                      : 'bg-white/40 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 border-white/50 dark:border-slate-700/50 hover:border-cyan-400/50 hover:bg-white/70 dark:hover:bg-slate-800/70'
                    }
                  `}
                >
                  <span className={isActive ? 'text-white' : 'text-cyan-600 dark:text-cyan-400'}>
                    {item.icon}
                  </span>
                  <span className={`tracking-tight font-black ${isActive ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebarActivePill"
                      className="absolute right-3.5 w-2 h-2 rounded-full bg-white shadow-md shadow-white/50" 
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Section: Platform Engines */}
          <div className="mt-6 pt-4 border-t border-white/40 dark:border-slate-700/50">
            <span className="text-[10px] font-black tracking-wider text-cyan-600 dark:text-cyan-400 uppercase px-3 block mb-2 font-mono">
              PLATFORM ENGINES
            </span>
            <div className="space-y-1">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setIsAssistantOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-black text-slate-800 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent hover:border-cyan-400/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-cyan-500" />
                  <span className="font-black">AI Assistant</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => handleNavClick('blockchain')}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-black text-slate-800 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent hover:border-cyan-400/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Boxes className="w-4 h-4 text-emerald-500" />
                  <span className="font-black">EVM Sepolia</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </motion.button>
            </div>
          </div>

          {/* Section: Teams & Access */}
          <div className="mt-4 pt-4 border-t border-white/40 dark:border-slate-700/50">
            <span className="text-[10px] font-black tracking-wider text-cyan-600 dark:text-cyan-400 uppercase px-3 block mb-2 font-mono">
              TEAMS
            </span>
            <div className="space-y-1 text-xs font-black text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-2.5 px-3 py-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50"></span>
                <span className="font-black">Frontend Dev Team</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50"></span>
                <span className="font-black">AI & Skill Audit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Settings Button */}
        <div className="pt-4 border-t border-white/40 dark:border-slate-700/50">
          <motion.button
            whileHover={{ x: 4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick('settings')}
            className={`
              w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-black transition-all border backdrop-blur-md
              ${activeTab === 'settings' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300/40 shadow-md' 
                : 'text-slate-800 dark:text-slate-200 border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 hover:border-cyan-400/40'}
            `}
          >
            <Sliders className="w-4 h-4 text-cyan-500" />
            <span className="font-black">Settings</span>
          </motion.button>
        </div>
      </motion.div>
    </aside>
  );
};

