import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  Play 
} from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { 
    skillGap, 
    advanceSkillGapStep, 
    selectedCandidate, 
    setActiveTab 
  } = useApp();

  const completedSteps = skillGap.recommendedPath.filter(p => p.completed).length;
  const progressPercent = Math.round((completedSteps / skillGap.recommendedPath.length) * 100);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 idraft-card-white p-6 md:p-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#18181B] text-white font-extrabold">
              Inclusion Engine
            </span>
            <span className="text-xs text-slate-600 font-bold">Target Candidate: {selectedCandidate.name}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#18181B] dark:text-white tracking-tight mt-1">Skill Gap Analyzer & Remediation Path</h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            SkillFlow empowers candidates by generating automated learning curricula instead of rejecting them for missing credentials.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('candidates')}
          className="px-5 py-2.5 rounded-full bg-[#18181B] text-white font-extrabold text-xs flex items-center gap-2 shadow-md hover:bg-slate-800 transition-all"
        >
          <UserCheck className="w-4 h-4 text-white" />
          <span>Return to Candidates</span>
        </button>
      </div>

      {/* Comparison Matrix */}
      <div className="idraft-card-white p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-[#18181B] dark:text-white tracking-tight flex items-center gap-2">
          <span>Required Project Competencies vs Candidate Verified Profile</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Required Matrix */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <span className="text-xs font-extrabold text-[#18181B] font-mono uppercase">Required Skills (E-Commerce)</span>
            <div className="space-y-2">
              {[
                { name: 'React', required: true },
                { name: 'JavaScript', required: true },
                { name: 'HTML/CSS', required: true },
                { name: 'API Integration', required: true },
                { name: 'Figma UI/UX', required: true },
              ].map((sk, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-3 rounded-2xl bg-[#18181B] text-white shadow-sm font-bold">
                  <span>{sk.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Status Matrix */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <span className="text-xs font-extrabold text-[#18181B] font-mono uppercase">{selectedCandidate.name}'s Credentials</span>
            <div className="space-y-2">
              {[
                { name: 'React', has: true, status: 'Verified EVM' },
                { name: 'JavaScript', has: true, status: 'Verified EVM' },
                { name: 'HTML/CSS', has: true, status: 'Verified EVM' },
                { name: 'API Integration', has: true, status: 'Verified EVM' },
                { name: 'Figma UI/UX', has: false, status: 'Missing Credential' },
              ].map((sk, idx) => (
                <div 
                  key={idx} 
                  className={`
                    flex items-center justify-between text-xs p-3 rounded-2xl font-bold shadow-sm
                    ${sk.has 
                      ? 'bg-[#18181B] text-white' 
                      : 'bg-rose-50 border border-rose-200 text-rose-800'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {sk.has ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                    <span>{sk.name}</span>
                  </span>
                  <span className={`text-[10px] font-mono font-extrabold uppercase ${sk.has ? 'text-emerald-400' : 'text-rose-700'}`}>
                    {sk.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skill Gap Alert Card */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-slate-900 to-cyan-950/20 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400">Skill Gap Detected</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                Missing: Figma UI/UX
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">AI Recommended Upskilling Path</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Completing this 5-step curriculum will upgrade {selectedCandidate.name}'s match score from 92% to 98% and mint a verified Figma Credential.
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Curriculum Progress: {completedSteps} / {skillGap.recommendedPath.length} Steps</span>
            <span className="text-cyan-400 font-bold">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Step by Step Path */}
        <div className="space-y-3">
          {skillGap.recommendedPath.map((step) => (
            <div
              key={step.id}
              className={`
                p-4 rounded-2xl bg-[#18181B] text-white border border-slate-900 flex items-center justify-between transition-all shadow-md
                ${step.completed 
                  ? 'ring-2 ring-emerald-500/40' 
                  : ''
                }
              `}
            >
              <div className="flex items-center gap-3.5">
                <div className={`
                  w-8 h-8 rounded-xl flex items-center justify-center font-mono font-extrabold text-xs shrink-0
                  ${step.completed ? 'bg-emerald-500 text-white' : 'bg-[#000000] text-cyan-400 border border-slate-800'}
                `}>
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : `Step ${step.id}`}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-extrabold text-white">{step.title}</h4>
                    <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                      {step.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium mt-0.5">{step.description}</p>
                </div>
              </div>

              {!step.completed && (
                <button
                  onClick={() => advanceSkillGapStep(step.id)}
                  className="px-4 py-2 rounded-full bg-white text-[#18181B] font-extrabold text-xs shrink-0 flex items-center gap-1.5 hover:bg-slate-200 shadow-sm transition-all"
                >
                  <span>Start Step</span>
                  <Play className="w-3 h-3 fill-[#18181B]" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
