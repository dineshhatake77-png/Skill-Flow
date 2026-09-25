import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Boxes, Cpu, CheckCircle2, Globe2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { accessibility, updateAccessibility } = useApp();
  const [selectedNetwork, setSelectedNetwork] = useState<string>('EVM Sepolia Testnet');
  const [selectedModel, setSelectedModel] = useState<string>('Gemini 3.6 Flash (AI Layer)');

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold text-white">Platform Settings & Integrations</h2>
        <p className="text-xs text-slate-400 mt-1">Configure AI abstraction layer, EVM blockchain networks, and accessibility defaults.</p>
      </div>

      {/* Network Config */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Boxes className="w-4 h-4 text-cyan-400" />
          <span>EVM Blockchain Testnet Selector</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['EVM Sepolia Testnet', 'Polygon Amoy Testnet', 'Arbitrum Sepolia'].map((net) => (
            <button
              key={net}
              onClick={() => setSelectedNetwork(net)}
              className={`
                p-3 rounded-xl border text-xs font-mono text-left transition-all flex items-center justify-between
                ${selectedNetwork === net 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 font-bold' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}
              `}
            >
              <span>{net}</span>
              {selectedNetwork === net && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* AI Provider Config */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>AI Abstraction Model Provider</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['Gemini 3.6 Flash (AI Layer)', 'GPT-4o Enterprise', 'Claude 3.5 Sonnet'].map((mod) => (
            <button
              key={mod}
              onClick={() => setSelectedModel(mod)}
              className={`
                p-3 rounded-xl border text-xs font-mono text-left transition-all flex items-center justify-between
                ${selectedModel === mod 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 font-bold' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}
              `}
            >
              <span>{mod}</span>
              {selectedModel === mod && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Config */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-emerald-400" />
          <span>Accessibility Defaults</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <span className="font-semibold text-slate-200">High Contrast Mode</span>
              <p className="text-[11px] text-slate-400">Increase outline borders and black contrast ratios.</p>
            </div>
            <input
              type="checkbox"
              checked={accessibility.highContrast}
              onChange={(e) => updateAccessibility('highContrast', e.target.checked)}
              className="w-4 h-4 accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <span className="font-semibold text-slate-200">Reduced Motion</span>
              <p className="text-[11px] text-slate-400">Disable pulsing animations and transitions.</p>
            </div>
            <input
              type="checkbox"
              checked={accessibility.reducedMotion}
              onChange={(e) => updateAccessibility('reducedMotion', e.target.checked)}
              className="w-4 h-4 accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
