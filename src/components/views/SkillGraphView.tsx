import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Network, 
  Sparkles, 
  BookOpen 
} from 'lucide-react';

export const SkillGraphView: React.FC = () => {
  const { skillNodes, selectedSkillId, setSelectedSkillId, setActiveTab } = useApp();

  const selectedSkill = skillNodes.find(s => s.id === selectedSkillId) || skillNodes[0];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 idraft-card-white p-6 md:p-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#18181B] text-white font-extrabold">
              Graph Telemetry
            </span>
            <span className="text-xs text-slate-600 font-bold">Verifiable Skill Dependencies & Learning Paths</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#18181B] dark:text-white tracking-tight mt-1">AI Interactive Skill Graph</h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">Click any skill node to inspect on-chain verifications and recommended learning curricula.</p>
        </div>

        <button
          onClick={() => setActiveTab('skill-gap')}
          className="px-5 py-2.5 rounded-full bg-[#18181B] text-white font-extrabold text-xs flex items-center gap-2 shadow-md hover:bg-slate-800 transition-all"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Launch Skill Gap Analyzer</span>
        </button>
      </div>

      {/* Main Canvas + Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Graph Canvas (2 cols) */}
        <div className="lg:col-span-2 idraft-card-white p-6 space-y-6 min-h-[450px] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#18181B] dark:text-white uppercase tracking-wider">Skill Tree Nodes</span>
            <span className="text-[10px] font-mono text-cyan-600 font-extrabold">{skillNodes.length} Verified Competencies</span>
          </div>

          {/* Graph Nodes Grid Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            {skillNodes.map((skill) => {
              const isSelected = selectedSkillId === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`
                    p-4 rounded-2xl bg-[#18181B] text-white border border-slate-900 cursor-pointer transition-all flex flex-col justify-between space-y-3 shadow-md
                    ${isSelected 
                      ? 'ring-2 ring-cyan-400 border-2 border-cyan-400 shadow-xl scale-[1.03]' 
                      : 'hover:scale-[1.02]'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#000000] text-cyan-300 font-extrabold border border-slate-800">
                      {skill.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{skill.level}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-white">{skill.name}</h4>
                    <p className="text-[11px] text-slate-300 font-medium mt-1 line-clamp-2">{skill.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="font-bold">{skill.verifiedCandidatesCount} Candidates</span>
                    <span className="text-cyan-400 font-extrabold">{skill.demandScore}% Demand</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Skill Detail Inspector Drawer */}
        <div className="idraft-card-white p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#18181B]" />
              <h3 className="text-sm font-extrabold text-[#18181B] dark:text-white">Skill Node Telemetry</h3>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#18181B] text-white font-extrabold">
              {selectedSkill.category}
            </span>
          </div>

          <div>
            <h4 className="text-xl font-extrabold text-[#18181B] dark:text-white">{selectedSkill.name}</h4>
            <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">{selectedSkill.description}</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#18181B] text-white shadow-sm">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-extrabold">Verified Candidates</span>
              <p className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">{selectedSkill.verifiedCandidatesCount}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#18181B] text-white shadow-sm">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-extrabold">Workforce Demand</span>
              <p className="text-xl font-extrabold text-cyan-400 font-mono mt-0.5">{selectedSkill.demandScore}%</p>
            </div>
          </div>

          {/* Related Skills */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-[#18181B] dark:text-white block">Related Competency Nodes:</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedSkill.relatedSkills.map((rel, idx) => (
                <span key={idx} className="text-[11px] px-3 py-1 rounded-full bg-[#18181B] text-white font-mono font-extrabold shadow-sm">
                  {rel}
                </span>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-extrabold text-[#18181B] dark:text-white flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#18181B]" />
              Recommended Curriculum Path:
            </span>
            <div className="space-y-2">
              {selectedSkill.learningPath.map((step, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-[#18181B] text-white text-xs font-extrabold flex items-center gap-2.5 shadow-sm border border-slate-900">
                  <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-mono text-[10px] shrink-0 font-extrabold">
                    {idx + 1}
                  </span>
                  <span className="text-white font-bold">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
