import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Share2, 
  QrCode, 
  Briefcase, 
  Copy, 
  X
} from 'lucide-react';

export const PassportView: React.FC = () => {
  const { selectedCandidate } = useApp();
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const passportUrl = `https://skillflow.app/passport/${selectedCandidate.name.toLowerCase().replace(/\s+/g, '-')}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(passportUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="liquid-glass-panel p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5 text-center md:text-left">
            <img 
              src={selectedCandidate.avatar} 
              alt={selectedCandidate.name} 
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-cyan-500/40 shadow-xl" 
            />
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{selectedCandidate.name}</h2>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-sm font-extrabold text-cyan-600 dark:text-cyan-300 mt-0.5">{selectedCandidate.role}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-mono font-bold mt-1">
                Passport ID: <span className="text-slate-900 dark:text-white font-extrabold">{selectedCandidate.passportId}</span> • {selectedCandidate.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* QR Code Container Box */}
            <div className="p-3 rounded-2xl liquid-glass-dark text-white shadow-md flex flex-col items-center justify-center border border-white/20">
              <QrCode className="w-12 h-12 text-cyan-300" />
              <span className="text-[8px] font-mono font-extrabold text-cyan-300 uppercase mt-1">Scannable EVM Proof</span>
            </div>

            <button
              onClick={() => setShowShareModal(true)}
              className="px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 border border-cyan-300/40 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-white" />
              <span>Share Passport</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verified Skills & Verified Work History Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verified Skills Column */}
        <div className="liquid-glass-card p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/30 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Verified Skills</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">
              {selectedCandidate.verifiedSkills.length} On-Chain Competencies
            </span>
          </div>

          <div className="space-y-2">
            {selectedCandidate.verifiedSkills.map((sk, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/50 dark:border-slate-700/50 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{sk.name}</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30 font-extrabold">
                  {sk.score}% Verified
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Work History & Projects Column */}
        <div className="liquid-glass-card p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/30 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Verified Work History & Projects</h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-extrabold">
              {selectedCandidate.workHistory.length} Cryptographic Proofs
            </span>
          </div>

          <div className="space-y-3">
            {selectedCandidate.workHistory.map((wh) => (
              <div key={wh.id} className="p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/50 dark:border-slate-700/50 space-y-2.5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{wh.projectTitle}</h4>
                    <p className="text-[11px] text-cyan-600 dark:text-cyan-300 font-bold">{wh.role} • {wh.company}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-400/30 font-extrabold">
                    Completed ✓
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {wh.skillsDemonstrated.map((s, idx) => (
                    <span key={idx} className="text-[9px] px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-mono font-bold border border-cyan-500/30">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/20 dark:border-slate-800 font-mono text-[9px] text-slate-500 dark:text-slate-400 flex justify-between font-bold">
                  <span>Duration: {wh.duration}</span>
                  <span className="text-cyan-500 dark:text-cyan-400">Tx: {wh.txHash.substring(0, 14)}...</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Passport Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1422] border border-purple-500/40 rounded-2xl p-6 w-full max-w-md space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Share Portable Skill Passport</h3>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Anyone with this URL can publicly verify {selectedCandidate.name}'s digital credentials and work history proofs.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs text-cyan-300">
              <span className="truncate max-w-[280px]">{passportUrl}</span>
              <button
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold shrink-0 text-[10px] flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
