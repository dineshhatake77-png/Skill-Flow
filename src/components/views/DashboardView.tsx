import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Download, 
  MoreHorizontal, 
  Bell, 
  CheckSquare, 
  Square, 
  Plus, 
  TrendingUp, 
  Pin, 
  Edit, 
  Trash2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    setActiveTab, 
    projects, 
    addTaskToProject
  } = useApp();

  // Interactive Checklist State
  const [goals, setGoals] = useState([
    { id: 1, text: 'SkillFlow AI Requirements Engine Setup', completed: true },
    { id: 2, text: 'Verify Meta React Credential on EVM', completed: true },
    { id: 3, text: 'Audit Polygon Smart Contract Hashes', completed: false },
    { id: 4, text: 'Mint Work Credential to Skill Passport', completed: false },
  ]);

  // Interactive Post-It Tasks State
  const [tasksInProcess, setTasksInProcess] = useState([
    { id: 't1', title: 'Integrate Stripe Payment API Drawer', date: 'Today', pinned: false, dropdownOpen: false },
    { id: 't2', title: 'Figma Shopping Cart UI Design Audit', date: '02.09.2026', pinned: false, dropdownOpen: false },
  ]);

  const [downloadToast, setDownloadToast] = useState<boolean>(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const toggleGoal = (id: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleDownloadReport = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2500);
  };

  const toggleTaskDropdown = (id: string) => {
    setTasksInProcess(prev => prev.map(t => t.id === id ? { ...t, dropdownOpen: !t.dropdownOpen } : { ...t, dropdownOpen: false }));
  };

  const deleteTask = (id: string) => {
    setTasksInProcess(prev => prev.filter(t => t.id !== id));
  };

  const togglePinTask = (id: string) => {
    setTasksInProcess(prev => prev.map(t => t.id === id ? { ...t, pinned: !t.pinned, dropdownOpen: false } : t));
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      date: 'Just now',
      pinned: false,
      dropdownOpen: false
    };
    setTasksInProcess(prev => [...prev, newTask]);
    addTaskToProject(projects[0].id, newTaskTitle);
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  const completedGoalsCount = goals.filter(g => g.completed).length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 text-black dark:text-white">
      {/* Toast Notification */}
      {downloadToast && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 right-8 z-50 px-5 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white text-xs font-black shadow-2xl flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-white dark:text-black" />
          <span>Workforce Audit Report Downloaded (PDF / EVM Proofs)</span>
        </motion.div>
      )}

      {/* TOP ROW (3 CARDS): Overall Info, Weekly Progress, Month Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: Overall Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass-dark p-6 flex flex-col justify-between space-y-6 rounded-[28px] shadow-2xl border border-white/20 backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-base font-black tracking-tight text-cyan-300">Overall Information</span>
            <div className="flex items-center gap-2 text-white">
              <button onClick={() => setActiveTab('analytics')} className="p-1.5 rounded-lg hover:bg-white/10 text-white">
                <Share2 className="w-4 h-4" />
              </button>
              <button onClick={() => setActiveTab('settings')} className="p-1.5 rounded-lg hover:bg-white/10 text-white">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-6">
            <div>
              <span className="text-4xl font-black font-mono text-white">43</span>
              <span className="text-xs text-slate-300 font-extrabold block mt-0.5">Tasks done for all time</span>
            </div>
            <div>
              <span className="text-4xl font-black font-mono text-white">2</span>
              <span className="text-xs text-slate-300 font-extrabold block mt-0.5">projects active</span>
            </div>
          </div>

          {/* 3 Inner Liquid Glass Metric Tiles */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div 
              onClick={() => setActiveTab('projects')}
              className="p-3.5 rounded-2xl bg-white/15 text-white border border-white/20 backdrop-blur-md cursor-pointer hover:bg-white/25 transition-all text-center shadow-md"
            >
              <div className="w-5 h-5 rounded-full border border-cyan-400 mx-auto mb-1 flex items-center justify-center text-[10px] font-mono font-black text-cyan-300">
                ●
              </div>
              <span className="text-lg font-black font-mono block leading-none">28</span>
              <span className="text-[10px] font-black uppercase tracking-wider block mt-1 text-slate-200">Projects</span>
            </div>

            <div 
              onClick={() => setActiveTab('workflows')}
              className="p-3.5 rounded-2xl bg-white/15 text-white border border-white/20 backdrop-blur-md cursor-pointer hover:bg-white/25 transition-all text-center shadow-md"
            >
              <div className="w-5 h-5 rounded-full border border-blue-400 mx-auto mb-1 flex items-center justify-center text-[10px] font-mono font-black text-blue-300">
                ◐
              </div>
              <span className="text-lg font-black font-mono block leading-none">14</span>
              <span className="text-[10px] font-black uppercase tracking-wider block mt-1 text-slate-200">In Progress</span>
            </div>

            <div 
              onClick={() => setActiveTab('credentials')}
              className="p-3.5 rounded-2xl bg-white/15 text-white border border-white/20 backdrop-blur-md cursor-pointer hover:bg-white/25 transition-all text-center shadow-md"
            >
              <div className="w-5 h-5 rounded-full border border-emerald-400 mx-auto mb-1 flex items-center justify-center text-[10px] font-mono font-black text-emerald-300">
                ✓
              </div>
              <span className="text-lg font-black font-mono block leading-none">11</span>
              <span className="text-[10px] font-black uppercase tracking-wider block mt-1 text-slate-200">Completed</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Weekly Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="liquid-glass-card p-6 flex flex-col justify-between space-y-4 rounded-[28px] shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Weekly progress</h3>
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-extrabold mt-1">
                <span className="flex items-center gap-1 text-cyan-500">● Verified Skills</span>
                <span className="flex items-center gap-1 opacity-70">● Workflows</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-mono text-xs font-black border border-cyan-400/30 shadow-sm">
              +24%
            </span>
          </div>

          {/* SVG Line Visualizer */}
          <div className="h-32 w-full pt-2">
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <path
                d="M 0 70 Q 50 60, 100 65 T 200 40 T 300 20"
                fill="none"
                stroke="currentColor"
                className="text-cyan-500 dark:text-cyan-400"
                strokeWidth="3.5"
              />
              <path
                d="M 0 85 Q 50 75, 100 80 T 200 60 T 300 45"
                fill="none"
                stroke="currentColor"
                className="text-slate-400 dark:text-slate-600"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
            <div className="flex items-center justify-between text-xs font-mono font-black text-slate-900 dark:text-white pt-2 border-t border-white/30 dark:border-slate-800">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span>
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-sm">S</span>
              <span>S</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: Month Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="liquid-glass-card p-6 flex flex-col justify-between space-y-4 rounded-[28px] shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Month progress</h3>
              <p className="text-xs font-black text-slate-600 dark:text-slate-300 mt-0.5">+20% compared to last month*</p>
            </div>
            <TrendingUp className="w-5 h-5 text-cyan-500" />
          </div>

          <div className="flex items-center justify-between gap-4 py-1">
            <div className="space-y-1.5 text-xs font-black text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2 text-cyan-500">● <span>Skill Audit</span></div>
              <div className="flex items-center gap-2 opacity-80 text-blue-500">● <span>EVM Mint</span></div>
              <div className="flex items-center gap-2 opacity-60 text-purple-500">● <span>Projects</span></div>
            </div>

            {/* Radial Dial Visualizer */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full multi-ring-dial" viewBox="0 0 36 36">
                <path className="text-slate-200 dark:text-slate-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-cyan-500 dark:text-cyan-400" strokeDasharray="120, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center">
                <span className="text-base font-black font-mono text-slate-900 dark:text-white block leading-none">120%</span>
                <span className="text-[8px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-black block mt-0.5">Overdone</span>
              </div>
            </div>
          </div>

          {/* Download Report CTA Button */}
          <div className="flex items-center gap-2 pt-2">
            <button onClick={() => setActiveTab('analytics')} className="p-2.5 rounded-full bg-white/40 dark:bg-slate-800/40 text-slate-900 dark:text-white border border-white/50 dark:border-slate-700/50 hover:bg-white/60">
              <Share2 className="w-4 h-4" />
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadReport}
              className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs flex items-center justify-center gap-2 border border-cyan-300/40 shadow-md"
            >
              <span>Download Report</span>
              <Download className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* MIDDLE ROW: Month Goals Checklist & Tasks In Process */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Month Goals Checklist */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="liquid-glass-card p-6 flex flex-col justify-between space-y-4 rounded-[28px] shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Month goals:</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30">
                {completedGoalsCount}/{goals.length}
              </span>
            </div>
          </div>

          <div className="space-y-3 font-extrabold text-xs">
            {goals.map((goal) => (
              <div 
                key={goal.id} 
                onClick={() => toggleGoal(goal.id)}
                className={`
                  flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all border backdrop-blur-md
                  ${goal.completed 
                    ? 'text-slate-900 dark:text-white font-black bg-white/40 dark:bg-slate-800/40 border-cyan-400/50 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 border-white/30 dark:border-slate-800 hover:border-cyan-400/40'}
                `}
              >
                {goal.completed ? (
                  <CheckSquare className="w-4 h-4 text-cyan-500 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={goal.completed ? 'line-through opacity-70' : ''}>{goal.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tasks In Process */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
              Task In process ({tasksInProcess.length})
            </h3>
            <button onClick={() => setActiveTab('projects')} className="text-xs font-black text-cyan-500 hover:underline">
              Open archive &gt;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tasksInProcess.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ y: -4, rotate: -1 }}
                className="liquid-glass-card p-5 flex flex-col justify-between min-h-[150px] relative rounded-[24px] shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-4 h-4" />
                  </div>

                  <div className="relative">
                    <button 
                      onClick={() => toggleTaskDropdown(task.id)}
                      className="p-1 rounded-lg hover:bg-white/40 dark:hover:bg-slate-700/50 text-slate-900 dark:text-white"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Context Menu Dropdown */}
                    {task.dropdownOpen && (
                      <div className="absolute right-0 mt-1 w-32 bg-slate-900/90 text-white border border-slate-700 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 text-[11px] font-black">
                        <button onClick={() => togglePinTask(task.id)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 flex items-center gap-2">
                          <Pin className="w-3 h-3" /> Pin Note
                        </button>
                        <button onClick={() => toggleTaskDropdown(task.id)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 flex items-center gap-2">
                          <Edit className="w-3 h-3" /> Edit
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 text-rose-400 flex items-center gap-2">
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-2">{task.title}</h4>
                  <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold mt-1">{task.date}</p>
                </div>

                <div className="flex items-center justify-end">
                  <button className="p-2 rounded-xl bg-white/40 dark:bg-slate-800/40 text-slate-900 dark:text-white border border-white/50 dark:border-slate-700/50 shadow-sm">
                    <Bell className="w-3.5 h-3.5 text-cyan-500" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* "+ Add Task" Liquid Glass Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowAddTaskModal(true)}
              className="idraft-dashed-card rounded-[24px] p-5 min-h-[150px] flex flex-col items-center justify-center cursor-pointer text-slate-900 dark:text-white hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all shadow-md"
            >
              <div className="flex items-center gap-2 font-black text-xs text-cyan-600 dark:text-cyan-300">
                <Plus className="w-4 h-4" />
                <span>Add task</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Last Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Last Projects</h3>
          <span className="text-xs text-slate-600 dark:text-slate-300 font-mono font-black">Sort by ▼</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div 
            onClick={() => setActiveTab('projects')}
            className="liquid-glass-card p-5 flex items-center justify-between cursor-pointer rounded-[24px] shadow-xl hover:scale-[1.02] transition-all"
          >
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">E-Commerce Platform</h4>
              <p className="text-[11px] text-cyan-500 font-bold mt-0.5">● In progress</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 font-bold line-clamp-1 mt-2">React 19 + Stripe Checkout + EVM Proof</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-cyan-400/50 bg-cyan-500/15 flex items-center justify-center font-mono font-black text-xs text-cyan-500 shrink-0">
              3/5
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('workflows')}
            className="liquid-glass-card p-5 flex items-center justify-between cursor-pointer rounded-[24px] shadow-xl hover:scale-[1.02] transition-all"
          >
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">AI Skill Telemetry</h4>
              <p className="text-[11px] text-emerald-500 font-bold mt-0.5">● Completed</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 font-bold line-clamp-1 mt-2">11 Executable Canvas Nodes Verified</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-emerald-400/50 bg-emerald-500/15 flex items-center justify-center font-mono font-black text-xs text-emerald-500 shrink-0">
              1/1
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('skill-passport')}
            className="liquid-glass-card p-5 flex items-center justify-between cursor-pointer rounded-[24px] shadow-xl hover:scale-[1.02] transition-all"
          >
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Skill Passport Sync</h4>
              <p className="text-[11px] text-cyan-500 font-bold mt-0.5">● In progress</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 font-bold line-clamp-1 mt-2">Polygon Amoy & Sepolia NFT Proof</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-cyan-400/50 bg-cyan-500/15 flex items-center justify-center font-mono font-black text-xs text-cyan-500 shrink-0">
              2/3
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl text-black dark:text-white">
            <h3 className="text-base font-black">Add Task to Workspace</h3>
            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g. Audit Figma Commerce Specs..."
                className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-black dark:border-zinc-600 rounded-2xl p-3 text-xs text-black dark:text-white focus:outline-none font-bold"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddTaskModal(false)} className="px-4 py-2 text-xs font-black">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white text-xs font-black">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
