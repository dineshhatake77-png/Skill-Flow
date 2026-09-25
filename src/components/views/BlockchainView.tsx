import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { BlockchainRecord } from '../../types';
import { 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  X
} from 'lucide-react';

export const BlockchainView: React.FC = () => {
  const { blockchainRecords } = useApp();

  const [selectedRecord, setSelectedRecord] = useState<BlockchainRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRecords = blockchainRecords.filter(r => 
    r.credentialTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.holderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 liquid-glass-panel p-6 md:p-8 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30 font-extrabold">
              Public Ledger Explorer
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">Network: EVM Sepolia & Polygon Amoy Testnets</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">Human-Readable Blockchain Verification</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
            Transparently audit cryptographic hashes, issuer addresses, block numbers, and attestation proofs.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-cyan-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter tx hash, credential title..."
            className="w-full bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-700/60 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 backdrop-blur-md"
          />
        </div>
      </div>

      {/* Explorer Table */}
      <div className="liquid-glass-panel p-6 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/30 dark:border-slate-800 text-slate-900 dark:text-white font-mono uppercase text-[10px] font-extrabold">
              <tr>
                <th className="pb-3 px-3">Transaction Hash</th>
                <th className="pb-3 px-3">Credential Title</th>
                <th className="pb-3 px-3">Holder</th>
                <th className="pb-3 px-3">Block #</th>
                <th className="pb-3 px-3">Network</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Verification Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20 dark:divide-slate-800">
              {filteredRecords.map((rec, idx) => (
                <tr key={idx} className="hover:bg-white/30 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-cyan-600 dark:text-cyan-400 font-extrabold">
                    {rec.txHash.substring(0, 10)}...{rec.txHash.substring(rec.txHash.length - 6)}
                  </td>
                  <td className="p-3 font-extrabold text-slate-900 dark:text-white">{rec.credentialTitle}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-200 font-bold">{rec.holderName}</td>
                  <td className="p-3 font-mono text-slate-500 dark:text-slate-400 font-bold">#{rec.blockNumber}</td>
                  <td className="p-3 font-mono text-slate-500 dark:text-slate-400 font-bold">{rec.network}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-400/30 font-mono text-[10px] font-extrabold flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> VERIFIED
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedRecord(rec)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs hover:from-cyan-400 hover:to-blue-500 transition-colors shadow-md border border-cyan-300/40 cursor-pointer"
                    >
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1422] border border-cyan-500/40 rounded-2xl p-6 w-full max-w-lg space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Verification Record Proof</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">✓ VERIFIED ON-CHAIN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Credential Title:</span>
                <span className="text-slate-200">{selectedRecord.credentialTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Holder:</span>
                <span className="text-cyan-300">{selectedRecord.holderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Issuer Address:</span>
                <span className="text-slate-300">{selectedRecord.issuer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Block Height:</span>
                <span className="text-slate-200">#{selectedRecord.blockNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-200">{selectedRecord.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction Hash:</span>
                <span className="text-cyan-400 break-all">{selectedRecord.txHash}</span>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Close Proof Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
