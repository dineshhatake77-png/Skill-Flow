import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Credential } from '../../types';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Lock, 
  ExternalLink, 
  Cpu, 
  Boxes,
  ShieldCheck
} from 'lucide-react';

export const CredentialCenterView: React.FC = () => {
  const { 
    credentials, 
    uploadCredentialDocument, 
    selectedCandidate, 
    setActiveTab 
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [docTitle, setDocTitle] = useState<string>('');
  const [docIssuer, setDocIssuer] = useState<string>('');
  const [isProcessingUpload, setIsProcessingUpload] = useState<boolean>(false);

  const filteredCreds = credentials.filter(c => filterStatus === 'All' || c.status === filterStatus);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim() || !docIssuer.trim()) return;

    setIsProcessingUpload(true);

    setTimeout(() => {
      uploadCredentialDocument(docTitle, docIssuer, selectedCandidate.name);
      setIsProcessingUpload(false);
      setShowUploadModal(false);
      setDocTitle('');
      setDocIssuer('');
    }, 1200);
  };

  const getStatusBadge = (status: Credential['status']) => {
    switch (status) {
      case 'Verified':
        return <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> VERIFIED</span>;
      case 'Pending':
        return <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold flex items-center gap-1 animate-pulse"><Clock className="w-3 h-3" /> PENDING ISSUER</span>;
      case 'Needs Review':
        return <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-semibold">NEEDS REVIEW</span>;
      default:
        return <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-semibold">INVALID</span>;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 idraft-card-white p-6 md:p-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#18181B] text-white font-bold">
              Cryptographic Trust Layer
            </span>
            <span className="text-xs text-slate-500 font-medium">EVM Smart Contract Attestation</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#18181B] dark:text-white tracking-tight mt-1">Credential Verification Center</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Combines AI metadata extraction with trusted issuer record verification and immutable EVM blockchain proofs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-2.5 rounded-full bg-[#18181B] text-white font-extrabold text-xs flex items-center gap-2 shadow-md hover:bg-slate-800 transition-all"
          >
            <Upload className="w-4 h-4 text-white" />
            <span>Upload & Verify Document</span>
          </button>

          <button
            onClick={() => setActiveTab('blockchain')}
            className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#18181B] text-xs font-extrabold flex items-center gap-2 border border-slate-200"
          >
            <Boxes className="w-4 h-4 text-[#18181B]" />
            <span>Open Blockchain Explorer</span>
          </button>
        </div>
      </div>

      {/* Verification Pipeline Architecture Visual */}
      <div className="idraft-card-white p-6 space-y-4">
        <h3 className="text-xs font-extrabold text-[#18181B] dark:text-white uppercase tracking-wider">Verification Pipeline Steps</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center text-xs">
          {[
            { step: '1', title: 'Document Upload', icon: <FileText className="w-4 h-4 text-cyan-400" /> },
            { step: '2', title: 'AI OCR Extraction', icon: <Cpu className="w-4 h-4 text-blue-400" /> },
            { step: '3', title: 'Credential Parse', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
            { step: '4', title: 'Issuer Signature', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
            { step: '5', title: 'SHA-256 Hash', icon: <Lock className="w-4 h-4 text-amber-400" /> },
            { step: '6', title: 'EVM Proof Mint', icon: <Boxes className="w-4 h-4 text-indigo-400" /> },
            { step: '7', title: 'Verified Badge', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> }
          ].map((p, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#18181B] text-white border border-slate-900 flex flex-col items-center justify-between space-y-2 shadow-md hover:scale-[1.03] transition-transform">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Step {p.step}</span>
              <div className="p-2.5 rounded-xl bg-[#000000] border border-slate-800 shadow-inner">{p.icon}</div>
              <span className="text-[11px] font-extrabold text-white leading-tight">{p.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs & Credential Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-[#18181B] dark:text-white uppercase tracking-wider">
            Verified Credentials Database ({filteredCreds.length})
          </span>

          <div className="flex items-center gap-2">
            {['All', 'Verified', 'Pending'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-extrabold transition-all
                  ${filterStatus === st 
                    ? 'bg-[#18181B] text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'}
                `}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCreds.map((cred) => (
            <div key={cred.id} className="idraft-card-white p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-extrabold border border-purple-200">
                    {cred.credentialType}
                  </span>
                  <h4 className="text-base font-extrabold text-[#18181B] dark:text-white mt-2">{cred.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Holder: <span className="text-[#18181B] font-bold">{cred.candidateName}</span></p>
                </div>
                {getStatusBadge(cred.status)}
              </div>

              <div className="space-y-1.5 text-xs font-medium text-slate-600">
                <div className="flex justify-between">
                  <span>Verified Issuer:</span>
                  <span className="text-cyan-700 font-bold">{cred.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Issued Date:</span>
                  <span className="font-mono font-bold text-slate-700">{cred.issuedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="font-mono text-emerald-700 font-bold">{cred.network}</span>
                </div>
              </div>

              {/* Hash Proof Bar (Solid Black Box) */}
              <div className="p-3 rounded-2xl bg-[#18181B] text-white font-mono text-[10px] space-y-1 shadow-inner">
                <div className="flex justify-between">
                  <span className="text-slate-400">Credential Hash:</span>
                  <span className="text-white font-bold">{cred.hash.substring(0, 18)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">EVM Tx Hash:</span>
                  <span className="text-cyan-400 font-bold">{cred.txHash.substring(0, 18)}...</span>
                </div>
              </div>

              {/* Skills Verified */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {cred.skillsVerified.map((sk, idx) => (
                    <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-extrabold border border-emerald-200">
                      ✓ {sk}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('blockchain')}
                  className="text-xs text-[#18181B] hover:underline font-extrabold flex items-center gap-1"
                >
                  <span>View Proof</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1422] border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Upload Certificate / Record</span>
            </h3>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Credential Title</label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. Meta Certified Senior React Specialist"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Issuer Name</label>
                <input
                  type="text"
                  value={docIssuer}
                  onChange={(e) => setDocIssuer(e.target.value)}
                  placeholder="e.g. Meta Certification Network"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Upload Dropzone Box */}
              <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-6 text-center space-y-2 bg-slate-900/40">
                <FileText className="w-8 h-8 text-cyan-400 mx-auto" />
                <p className="text-xs text-slate-300 font-medium">Drag and drop PDF/PNG certificate file</p>
                <p className="text-[10px] text-slate-500">Supports PDF, PNG up to 10MB</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isProcessingUpload}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5"
                >
                  {isProcessingUpload ? (
                    <span>Extracting & Minting EVM Proof...</span>
                  ) : (
                    <span>Mint Blockchain Proof</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
