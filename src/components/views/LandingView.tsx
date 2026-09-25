import React from 'react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Layers, 
  TrendingUp,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';
import cardBgVideo from '../../assets/card_bg.mp4';

export const LandingView: React.FC = () => {
  const { setActiveTab, startDemoMode } = useApp();

  return (
    <div className="py-6 px-2 md:px-6 max-w-7xl mx-auto space-y-12 text-slate-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative pt-4 pb-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text Block */}
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-slate-900 dark:text-white text-xs font-black tracking-wide border border-white/60 dark:border-slate-700/60 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-sm shadow-cyan-500"></span>
              <span>Welcome to SkillFlow AI</span>
              <span className="opacity-40">|</span>
              <span className="font-mono font-black text-cyan-600 dark:text-cyan-400">250+ Verified Credentials</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              WE CRAFT SKILLS & VERIFIABLE WORKFORCE EXPERIENCES
            </h1>

            <p className="text-sm sm:text-base text-slate-100 dark:text-slate-100 max-w-lg font-normal leading-relaxed drop-shadow-sm">
              AI understands complex skills, automates workforce pipelines, and mints tamper-proof digital credentials directly on-chain.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab('ai-workspace')}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white border border-cyan-300/40 font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <span>Let's Talk Workflow</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={startDemoMode}
                className="px-6 py-3.5 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/60 dark:border-slate-700/60 text-slate-900 dark:text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-cyan-500" />
                <span>Launch Interactive Demo</span>
              </motion.button>
            </div>
          </div>

          {/* Right Spotlight Highlight Compact Video Background Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[320px] p-5 rounded-[24px] relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-2xl border border-white/20 backdrop-blur-xl bg-slate-950/80 group hover:border-cyan-400/50 transition-all"
          >
            {/* Background Video */}
            <video 
              src={cardBgVideo} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 group-hover:opacity-85 transition-opacity duration-500"
            />
            {/* Liquid Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/30 z-0 backdrop-blur-[1px]" />

            {/* Card Content - Z-Index above video */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-300 font-black">
                AI MATCH PERFORMANCE
              </span>
              <div className="px-2.5 py-0.5 rounded-full bg-cyan-500/30 text-cyan-300 text-[9px] font-black border border-cyan-400/40 backdrop-blur-md">
                EVM Verified
              </div>
            </div>

            <div className="relative z-10 my-3 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white tracking-tight drop-shadow-md">99.4%</span>
                <span className="text-emerald-400 text-xs font-black flex items-center gap-0.5 drop-shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5" /> +40% Speed
                </span>
              </div>
              <p className="text-[11px] text-slate-200 font-extrabold leading-snug drop-shadow-sm">
                4x faster hiring workflows backed by cryptographic proofs.
              </p>
            </div>

            {/* Tag Bubbles */}
            <div className="relative z-10 flex flex-wrap gap-1.5 pt-2 border-t border-white/20">
              {['AI Skill Mapping', 'EVM Sepolia', 'Digital Passport'].map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-full bg-slate-900/60 text-cyan-200 text-[9px] font-black border border-cyan-400/30 backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metric Counters Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { metric: '150+', label: 'Verified Developers', sub: 'Indexed in Talent Graph' },
          { metric: '50+', label: 'Enterprise Clients', sub: 'Automated Job Workflows' },
          { metric: '10+', label: 'EVM Blockchains', sub: 'Cryptographic Audits' },
          { metric: '24/7', label: 'Continuous Monitoring', sub: 'Real-time Skill Telemetry' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="liquid-glass-card p-6 rounded-[28px] text-center space-y-1 shadow-xl"
          >
            <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {item.metric}
            </span>
            <p className="text-xs font-black text-slate-900 dark:text-white">{item.label}</p>
            <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300 block">{item.sub}</span>
          </motion.div>
        ))}
      </section>

      {/* Tilted Process Step Cards Timeline */}
      <section className="space-y-8 pt-4">
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-[11px] font-black">
            <Layers className="w-3.5 h-3.5" />
            <span>How We Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Let us show you how we drive your workforce to new heights
          </h2>
        </div>

        {/* 4 Connected Tilted Liquid Glass Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            { 
              num: '01', 
              title: 'Define', 
              desc: 'Input complex hiring rules or prompt in natural language.',
              badge: 'Prompt Engine',
              rotate: '-rotate-1'
            },
            { 
              num: '02', 
              title: 'AI Skill Map', 
              desc: 'AI parses requirements into interactive skill telemetry nodes.',
              badge: 'Graph Engine',
              rotate: 'rotate-1'
            },
            { 
              num: '03', 
              title: 'Verify Proof', 
              desc: 'Audits certificates & degree records on EVM testnet.',
              badge: 'Sepolia EVM',
              rotate: '-rotate-1'
            },
            { 
              num: '04', 
              title: 'Match & Launch', 
              desc: 'Auto-deploys candidate contracts & verified work passports.',
              badge: 'NFT Minting',
              rotate: 'rotate-2'
            }
          ].map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`liquid-glass-card p-6 rounded-[28px] space-y-4 flex flex-col justify-between shadow-xl ${step.rotate}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                    {step.num}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30 text-[10px] font-black">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 font-extrabold leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/20 dark:border-slate-700/50 flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-black uppercase">Ready for execution</span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white border border-cyan-300/40 shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enterprise Verification Schedule Table Liquid Glass Panel */}
      <section className="liquid-glass-panel p-6 md:p-8 rounded-[32px] space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/30 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Enterprise Verification Telemetry
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-extrabold">
              Live scheduled audit events and automated candidate validation logs.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('credentials')}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black border border-cyan-300/40 flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-md"
          >
            <span>View All Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-white/30 dark:border-slate-800 pb-2">
                <th className="py-3 px-4 font-black">Event / Candidate</th>
                <th className="py-3 px-4 font-black">Verification Scope</th>
                <th className="py-3 px-4 font-black">Status</th>
                <th className="py-3 px-4 font-black">Timestamp</th>
                <th className="py-3 px-4 font-black text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20 dark:divide-slate-800 text-xs font-bold text-slate-900 dark:text-white">
              {[
                { name: 'Senior Fullstack AI Engineer', scope: 'React 19, EVM Sepolia, PyTorch', status: 'VERIFIED ON-CHAIN', date: '25/09/2026' },
                { name: 'Lead UI/UX Systems Designer', scope: 'Framer Motion, Glassmorphism', status: 'AUDIT IN PROGRESS', date: '26/09/2026' },
                { name: 'Smart Contract Auditor', scope: 'Solidity, ZK Proofs, Foundry', status: 'VERIFIED ON-CHAIN', date: '28/09/2026' },
                { name: 'AI Pipeline Architect', scope: 'LangChain, Vector DBs', status: 'VERIFIED ON-CHAIN', date: '30/09/2026' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-white/30 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-cyan-500" />
                    <span>{row.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold">{row.scope}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black font-mono bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold">{row.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => setActiveTab('blockchain')} className="p-1.5 rounded-full hover:bg-white/40 dark:hover:bg-slate-700/50 cursor-pointer">
                      <ArrowUpRight className="w-4 h-4 text-slate-900 dark:text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default LandingView;
