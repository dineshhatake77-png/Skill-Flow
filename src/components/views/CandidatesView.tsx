import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ExternalLink, 
  Brain,
  Mic,
  MicOff,
  Search,
  Layers,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  Briefcase,
  Lightbulb,
  UserCheck,
  Award,
  Activity,
  Check,
  RefreshCw,
  FileText,
  UploadCloud,
  FileCode,
  CheckSquare,
  Square,
  Users,
  Download,
  Trash2,
  X
} from 'lucide-react';

export const CandidatesView: React.FC = () => {
  const { 
    candidates, 
    setSelectedCandidateId, 
    selectedCandidateId, 
    setActiveTab 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceStatus, setVoiceStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<'match' | 'exp' | 'credentials'>('match');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showAnalysisIdeas, setShowAnalysisIdeas] = useState<boolean>(true);

  // Batch Resume Uploader & Selection State
  const [candidateRoster, setCandidateRoster] = useState<any[]>(candidates);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [isUploadingBatch, setIsUploadingBatch] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStepText, setUploadStepText] = useState<string>('');
  const [uploadedBatchCount, setUploadedBatchCount] = useState<number>(0);
  const [showBatchToast, setShowBatchToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isListeningRef = useRef<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const simulationIntervalRef = useRef<any>(null);

  // Sync candidateRoster if global context candidates update
  useEffect(() => {
    if (candidates.length > candidateRoster.length) {
      setCandidateRoster(candidates);
    }
  }, [candidates]);

  const categories = [
    'All',
    'Frontend & UI',
    'AI & ML',
    'Web3 & EVM',
    'Backend & Cloud',
    'Security & Data'
  ];

  // Helper sample voice phrases for simulated microphone fallback
  const sampleVoiceQueries = [
    "Looking for Senior React & Web3 EVM Smart Contract Engineer",
    "Find AI Machine Learning PyTorch & Neural Network Lead",
    "Search Kubernetes Cloud Architect with High Cryptographic Proofs",
    "Show Top Ranked Frontend UI Engineers with 5+ Years Experience"
  ];

  // Speech Recognition & Continuous Voice Loop Logic
  useEffect(() => {
    isListeningRef.current = isListening;

    if (!isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }
      return;
    }

    const windowObj = window as any;
    const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setVoiceStatus('Live Mic Active... Listening continuously for candidate role or skill...');
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript.trim()) {
            setSearchQuery(currentTranscript);
          }
        };

        recognition.onerror = () => {
          if (isListeningRef.current && !simulationIntervalRef.current) {
            startFallbackVoiceSimulation();
          }
        };

        recognition.onend = () => {
          if (isListeningRef.current) {
            try {
              recognition.start();
            } catch (e) {
              startFallbackVoiceSimulation();
            }
          }
        };

        recognition.start();
      } catch (err) {
        startFallbackVoiceSimulation();
      }
    } else {
      startFallbackVoiceSimulation();
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, [isListening]);

  // Fallback Voice Simulation Stream
  const startFallbackVoiceSimulation = () => {
    setVoiceStatus('Listening & Audio Frequency Active...');
    let step = 0;
    const randomQuery = sampleVoiceQueries[Math.floor(Math.random() * sampleVoiceQueries.length)];
    const words = randomQuery.split(' ');

    if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);

    simulationIntervalRef.current = setInterval(() => {
      if (!isListeningRef.current) {
        clearInterval(simulationIntervalRef.current);
        return;
      }
      step++;
      const currentText = words.slice(0, step).join(' ');
      setSearchQuery(currentText);
      setVoiceStatus(`Voice Transcribing (${step}/${words.length} words): "${currentText}"`);

      if (step >= words.length) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
        setVoiceStatus('Voice Input Captured Successfully!');
      }
    }, 700);
  };

  const toggleVoiceRecording = () => {
    if (isListening) {
      isListeningRef.current = false;
      setIsListening(false);
      setVoiceStatus('Voice recording completed.');
      triggerAiAnalysis();
    } else {
      isListeningRef.current = true;
      setIsListening(true);
      setShowAnalysisIdeas(true);
    }
  };

  const triggerAiAnalysis = () => {
    setIsAnalyzing(true);
    setShowAnalysisIdeas(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setVoiceStatus('');
    }, 1200);
  };

  // Batch Resume AI Upload & Extraction Simulation Engine
  const handleBatchResumeUpload = (batchType: 'fullstack' | 'web3' | 'ai' | 'custom', customFilesCount?: number) => {
    setIsUploadingBatch(true);
    setUploadProgress(10);
    const count = customFilesCount || (batchType === 'fullstack' ? 10 : batchType === 'web3' ? 8 : 6);
    setUploadedBatchCount(count);
    setUploadStepText(`1/4: Scanning ${count} Resume Documents (PDF/DOCX/TXT)...`);

    setTimeout(() => {
      setUploadProgress(40);
      setUploadStepText(`2/4: Parsing Technical Competencies & Experience Vector...`);
    }, 800);

    setTimeout(() => {
      setUploadProgress(75);
      setUploadStepText(`3/4: Evaluating On-Chain EVM Hashes & Cryptographic Credentials...`);
    }, 1600);

    setTimeout(() => {
      setUploadProgress(100);
      setUploadStepText(`4/4: Extracted ${count} Profiles & Added to Active Candidate Selection Index!`);

      // Generate mock parsed candidates
      const newParsedCandidates: any[] = [];
      const presets = {
        fullstack: [
          { name: 'David Miller', role: 'Senior React & Node Architect', cat: 'Frontend & UI', score: 98, exp: 7, skills: ['React 19', 'TypeScript', 'Node.js', 'GraphQL'] },
          { name: 'Elena Rostova', role: 'Staff UI/UX Design Engineer', cat: 'Frontend & UI', score: 96, exp: 6, skills: ['Figma Tokens', 'Framer Motion', 'CSS Tailwind', 'Accessibility'] },
          { name: 'Karthik Raja', role: 'Fullstack Next.js Specialist', cat: 'Frontend & UI', score: 95, exp: 5, skills: ['Next.js', 'React', 'Tailwind', 'PostgreSQL'] },
          { name: 'Sophia Chen', role: 'Frontend Systems Architect', cat: 'Frontend & UI', score: 94, exp: 8, skills: ['React', 'WebAssembly', 'Performance', 'Vite'] },
        ],
        web3: [
          { name: 'Alexander Vance', role: 'Lead Solidity EVM Auditor', cat: 'Web3 & EVM', score: 99, exp: 6, skills: ['Solidity', 'Foundry', 'Sepolia EVM', 'ZK Proofs'] },
          { name: 'Mei Ling', role: 'Smart Contract & Protocol Dev', cat: 'Web3 & EVM', score: 97, exp: 5, skills: ['Hardhat', 'Ethers.js', 'OpenZeppelin', 'IPFS'] },
          { name: 'Vikram Patel', role: 'DeFi Security & ZK Engineer', cat: 'Web3 & EVM', score: 96, exp: 7, skills: ['ZK-SNARKs', 'Rust', 'Solidity', 'Audit'] },
        ],
        ai: [
          { name: 'Dr. Sarah Jenkins', role: 'Principal AI Neural Pipeline Engineer', cat: 'AI & ML', score: 99, exp: 9, skills: ['PyTorch', 'Python', 'LLM Fine-Tuning', 'Vector DB'] },
          { name: 'Rahul Sharma', role: 'Machine Learning Infrastructure Lead', cat: 'AI & ML', score: 97, exp: 6, skills: ['TensorFlow', 'LangChain', 'Python', 'CUDA'] },
          { name: 'Claire Dubois', role: 'AI Model Optimization Researcher', cat: 'AI & ML', score: 95, exp: 5, skills: ['PyTorch', 'ONNX', 'NLP', 'Computer Vision'] },
        ],
        custom: [
          { name: 'Marcus Sterling', role: 'Cloud Infrastructure & DevOps Lead', cat: 'Backend & Cloud', score: 96, exp: 7, skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'] },
          { name: 'Aisha Hassan', role: 'Cybersecurity & Data Privacy Expert', cat: 'Security & Data', score: 95, exp: 6, skills: ['Penetration Testing', 'SIEM', 'Cryptography', 'Audit'] },
        ]
      };

      const selectedList = presets[batchType] || presets.fullstack;

      selectedList.forEach((cand, idx) => {
        newParsedCandidates.push({
          id: `batch-${Date.now()}-${idx}`,
          name: cand.name,
          role: cand.role,
          category: cand.cat,
          matchScore: cand.score,
          experienceYears: cand.exp,
          credentialsCount: Math.floor(Math.random() * 4) + 2,
          location: 'Remote / Global',
          avatar: `https://images.unsplash.com/photo-${1534528741775 + idx * 100}?auto=format&fit=crop&w=250&q=80`,
          matchExplanation: `Parsed from batch resume upload. Demonstrates high expertise in ${cand.skills.slice(0, 2).join(', ')} with verified EVM credentials.`,
          verifiedSkills: cand.skills.map((s, sIdx) => ({ name: s, score: 95 - sIdx * 3 })),
          unverifiedSkills: [{ name: 'CI/CD Pipelines', score: 85 }]
        });
      });

      setCandidateRoster(prev => [...newParsedCandidates, ...prev]);
      setTimeout(() => {
        setIsUploadingBatch(false);
        setShowBatchToast(`Successfully Analyzed & Added ${count} Resumes to Selection Roster!`);
        setTimeout(() => setShowBatchToast(null), 3500);
      }, 1000);
    }, 2400);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleBatchResumeUpload('custom', files.length);
    }
  };

  // Checkbox multi-select logic
  const toggleSelectCandidate = (id: string) => {
    setSelectedCandidateIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidateIds.length === filteredCandidates.length) {
      setSelectedCandidateIds([]);
    } else {
      setSelectedCandidateIds(filteredCandidates.map(c => c.id));
    }
  };

  // Filter & Search Candidates
  const filteredCandidates = candidateRoster.filter((cand) => {
    const matchesCategory = selectedCategory === 'All' || cand.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName = cand.name.toLowerCase().includes(query);
    const matchesRole = cand.role.toLowerCase().includes(query);
    const matchesLocation = cand.location.toLowerCase().includes(query);
    const matchesSkills = cand.verifiedSkills.some((s: any) => s.name.toLowerCase().includes(query));

    return matchesCategory && (matchesName || matchesRole || matchesLocation || matchesSkills);
  }).sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'exp') return b.experienceYears - a.experienceYears;
    if (sortBy === 'credentials') return b.credentialsCount - a.credentialsCount;
    return 0;
  });

  const topPickCandidate = filteredCandidates.length > 0 ? filteredCandidates[0] : candidateRoster[0];
  const secondaryCandidate = filteredCandidates.length > 1 ? filteredCandidates[1] : (candidateRoster[1] || candidateRoster[0]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 text-slate-900 dark:text-white">
      {/* Toast Notification */}
      {showBatchToast && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 right-8 z-50 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs shadow-2xl flex items-center gap-2 border border-cyan-300/40"
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{showBatchToast}</span>
        </motion.div>
      )}

      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="liquid-glass-card p-6 md:p-8 rounded-[32px] space-y-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-xs font-black border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>AI Workforce Candidate Index</span>
              <span className="opacity-40">|</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{candidateRoster.length} Verified Candidates</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-2 text-slate-900 dark:text-white">
              Bulk Resume Upload & Candidate Selection Dashboard
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">
              Batch upload resumes, auto-extract technical competencies, and execute multi-candidate selection.
            </p>
          </div>

          {/* Functional Voice & Search Bar */}
          <div className="w-full lg:w-96 space-y-2">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-cyan-500 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length > 2) setShowAnalysisIdeas(true);
                }}
                placeholder="Search name, React, PyTorch, EVM..."
                className="w-full bg-white/60 dark:bg-slate-900/60 border border-white/60 dark:border-slate-700/60 rounded-full pl-10 pr-12 py-2.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 backdrop-blur-md shadow-sm"
              />
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={`absolute right-1.5 p-2 rounded-full transition-all flex items-center justify-center ${
                  isListening 
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/40 ring-4 ring-rose-500/20' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 shadow-md border border-cyan-300/40'
                }`}
                title={isListening ? 'Click to Stop Voice Recording & Analyze' : 'Click to Start Voice Input'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            {isListening && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-extrabold truncate max-w-[200px]">
                    {voiceStatus || 'Recording voice input...'}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* BULK AI RESUME UPLOADER & PARSER ZONE */}
        <div className="pt-4 border-t border-white/30 dark:border-slate-800 space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            multiple
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Drag and Drop Zone Card */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="idraft-dashed-card p-6 rounded-[24px] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all space-y-2 group shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white">
                  Drop Batch Resumes or Click to Browse
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold mt-0.5">
                  Supports PDF, DOCX, TXT • Multi-File Batch Selection
                </p>
              </div>
            </div>

            {/* Instant One-Click Batch Upload Preset Buttons */}
            <div className="lg:col-span-2 liquid-glass-panel p-5 rounded-[24px] space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black uppercase text-cyan-600 dark:text-cyan-300 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-cyan-500" />
                  <span>One-Click Batch Resume Upload Presets</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">Auto-Parse & Score</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBatchResumeUpload('fullstack')}
                  disabled={isUploadingBatch}
                  className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-white/60 dark:border-slate-700/60 text-left space-y-1 cursor-pointer transition-all shadow-sm"
                >
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    ⚡ Upload 10 Senior Fullstack Resumes
                  </span>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold block">
                    React 19, TypeScript, Next.js
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBatchResumeUpload('web3')}
                  disabled={isUploadingBatch}
                  className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-white/60 dark:border-slate-700/60 text-left space-y-1 cursor-pointer transition-all shadow-sm"
                >
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    ⚡ Upload 8 Web3 EVM Engineers
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                    Solidity, Sepolia, ZK Proofs
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBatchResumeUpload('ai')}
                  disabled={isUploadingBatch}
                  className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-white/60 dark:border-slate-700/60 text-left space-y-1 cursor-pointer transition-all shadow-sm"
                >
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    ⚡ Upload 6 AI & PyTorch Specialists
                  </span>
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold block">
                    PyTorch, Neural LLM, Vector DB
                  </span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Active AI Resume Batch Parsing Progress Bar */}
          {isUploadingBatch && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-mono font-black">
                <span className="text-cyan-600 dark:text-cyan-300 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-500" />
                  <span>{uploadStepText}</span>
                </span>
                <span className="text-cyan-600 dark:text-cyan-300">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Category Tabs & Batch Multi-Selection Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-white/30 dark:border-slate-800">
          {/* Orderly Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isCatActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    triggerAiAnalysis();
                  }}
                  className={`
                    px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer
                    ${isCatActive 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md border border-cyan-300/40' 
                      : 'bg-white/40 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 border border-white/50 dark:border-slate-700/50 hover:bg-white/60'}
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Multi-Select & Sort Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={handleSelectAll}
              className="px-3.5 py-1.5 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/50 dark:border-slate-700/50 text-xs font-black flex items-center gap-1.5 hover:bg-white/60 cursor-pointer"
            >
              {selectedCandidateIds.length === filteredCandidates.length && filteredCandidates.length > 0 ? (
                <CheckSquare className="w-4 h-4 text-cyan-500" />
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
              <span>
                {selectedCandidateIds.length === filteredCandidates.length && filteredCandidates.length > 0
                  ? 'Deselect All'
                  : `Select All (${filteredCandidates.length})`}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-500" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white/60 dark:bg-slate-900/60 border border-white/60 dark:border-slate-700/60 rounded-xl px-3 py-1.5 text-xs font-black text-slate-900 dark:text-white focus:outline-none backdrop-blur-md"
              >
                <option value="match">Match Score (High to Low)</option>
                <option value="exp">Experience Years</option>
                <option value="credentials">Verified On-Chain Credentials</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FLOATING BATCH CANDIDATE SELECTION DASHBOARD TOOLBAR */}
      <AnimatePresence>
        {selectedCandidateIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-3xl bg-slate-900/95 text-white border border-cyan-500/40 shadow-2xl backdrop-blur-2xl flex flex-wrap items-center justify-between gap-4 max-w-2xl w-[92%]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white flex items-center gap-2">
                  <span>{selectedCandidateIds.length} Candidates Selected</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
                    Batch Action Ready
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">Execute batch hiring & EVM passport operations</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setShowBatchToast(`Minted EVM Skill Passports for ${selectedCandidateIds.length} Selected Candidates!`);
                  setTimeout(() => setShowBatchToast(null), 3000);
                  setActiveTab('skill-passport');
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs shadow-md border border-cyan-300/40 cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Batch Mint Passports</span>
              </button>

              <button
                onClick={() => {
                  setShowBatchToast(`Assigned ${selectedCandidateIds.length} Candidates to Active Workflow Project!`);
                  setTimeout(() => setShowBatchToast(null), 3000);
                  setActiveTab('projects');
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-slate-700 cursor-pointer flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                <span>Assign to Project</span>
              </button>

              <button
                onClick={() => setSelectedCandidateIds([])}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                title="Clear Selection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Candidate Picking Ideas & Action Functions Banner */}
      <AnimatePresence>
        {showAnalysisIdeas && topPickCandidate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="liquid-glass-card p-6 md:p-8 rounded-[32px] border border-cyan-500/40 relative overflow-hidden space-y-6 shadow-2xl"
          >
            {/* Top Bar with AI Analysis Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                  <Brain className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                      AI Candidate Selection & Action Insights
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-[10px] font-mono font-bold uppercase border border-cyan-400/30">
                      {isAnalyzing ? 'Analyzing Query...' : 'Analysis Complete'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                    Strategic candidate recommendations & automated functions based on real-time voice & skill index evaluation.
                  </p>
                </div>
              </div>

              {isAnalyzing && (
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold self-start md:self-auto">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-500" />
                  <span>Evaluating Candidate Skill Hashes...</span>
                </div>
              )}
            </div>

            {/* Candidate Selection Ideas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Primary Recommended Candidate Pick */}
              <div className="lg:col-span-1 p-5 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-cyan-500/30 space-y-4 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black uppercase text-cyan-600 dark:text-cyan-300 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-cyan-500" /> Top Candidate Pick
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-black border border-emerald-400/30">
                    {topPickCandidate.matchScore}% Match
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img 
                    src={topPickCandidate.avatar} 
                    alt={topPickCandidate.name} 
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500 shadow-md"
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      {topPickCandidate.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-extrabold">{topPickCandidate.role}</p>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{topPickCandidate.credentialsCount} Verified EVM Proofs</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/30 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800 text-xs space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">Selection Rationale</span>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                    {topPickCandidate.matchExplanation}
                  </p>
                </div>
              </div>

              {/* Ideas & Guidance Breakdown */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strategic Candidate Picking Ideas */}
                  <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/50 dark:border-slate-700/50 space-y-2 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-xs">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Picking Strategy & Role Fit</span>
                    </div>
                    <ul className="text-xs space-y-2 font-semibold text-slate-800 dark:text-slate-200">
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Primary Choice:</strong> Hire <strong>{topPickCandidate.name}</strong> for immediate impact. Highest score ({topPickCandidate.matchScore}%) & verified skills.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span><strong>Secondary Choice:</strong> <strong>{secondaryCandidate.name}</strong> ({secondaryCandidate.role}) offers complimentary skillset.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Recommended Evaluation Functions */}
                  <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/50 dark:border-slate-700/50 space-y-2 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-cyan-500 font-bold text-xs">
                      <Award className="w-4 h-4 text-cyan-500" />
                      <span>Recommended Functions</span>
                    </div>
                    <ul className="text-xs space-y-2 font-semibold text-slate-800 dark:text-slate-200">
                      <li className="flex items-start gap-2">
                        <Activity className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>Run <strong>Skill Gap Benchmark</strong> against project requirements to ensure no critical blindspots.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Mint official <strong>EVM Skill Passport</strong> & verify cryptographic hashes on-chain.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Direct Action Execution Buttons */}
                <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Execute Candidate Functions for {topPickCandidate.name}:</span>
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setSelectedCandidateId(topPickCandidate.id);
                        setActiveTab('skill-passport');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md border border-cyan-300/40 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Mint Skill Passport</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setSelectedCandidateId(topPickCandidate.id);
                        setActiveTab('skill-gap');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Run Skill Gap</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setSelectedCandidateId(topPickCandidate.id);
                        setActiveTab('blockchain');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/60 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black flex items-center gap-1.5 border border-white/60 dark:border-slate-700 shadow-md cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Verify EVM Proofs</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setSelectedCandidateId(topPickCandidate.id);
                        setActiveTab('projects');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Assign to Project</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candidate Cards Grid with Checkbox Multi-Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCandidates.map((cand) => {
            const isSelected = selectedCandidateId === cand.id;
            const isMultiSelected = selectedCandidateIds.includes(cand.id);

            return (
              <motion.div
                key={cand.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -6 }}
                className={`
                  liquid-glass-card p-6 md:p-7 flex flex-col justify-between space-y-5 relative overflow-hidden transition-all
                  ${isMultiSelected ? 'ring-2 ring-cyan-500 shadow-2xl bg-cyan-500/5' : ''}
                  ${isSelected ? 'border-cyan-400' : ''}
                `}
              >
                {/* Multi-Select Checkbox Pill */}
                <div className="absolute top-3 left-4 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelectCandidate(cand.id);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      isMultiSelected
                        ? 'bg-cyan-500 text-white border border-cyan-300 shadow-md'
                        : 'bg-white/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border border-white/50 dark:border-slate-700/50 hover:bg-white/60'
                    }`}
                  >
                    {isMultiSelected ? (
                      <CheckSquare className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{isMultiSelected ? 'Selected' : 'Select'}</span>
                  </button>
                </div>

                {/* Category Badge Pill */}
                <div className="absolute top-3 right-4 px-3 py-1 rounded-full bg-cyan-500/15 text-[10px] font-mono font-black text-cyan-600 dark:text-cyan-300 border border-cyan-400/30">
                  {cand.category || 'Engineering'}
                </div>

                {/* Top Row: Avatar + Name + Match Score */}
                <div className="flex items-start justify-between gap-4 pt-6">
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={cand.avatar} 
                      alt={cand.name} 
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-cyan-500 shadow-md" 
                    />
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                        {cand.name}
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <p className="text-xs text-slate-700 dark:text-slate-200 font-extrabold">{cand.role}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 font-semibold mt-0.5">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-500" />{cand.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-amber-500" />{cand.experienceYears} Yrs Exp</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="inline-flex items-baseline gap-1 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30 shadow-md">
                      <span className="text-lg font-black font-mono">{cand.matchScore}%</span>
                      <span className="text-[9px] uppercase font-black">Match</span>
                    </div>
                  </div>
                </div>

                {/* AI Rationale Card */}
                <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 border border-white/50 dark:border-slate-800 space-y-1 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 text-[11px] font-mono font-black uppercase">
                    <Brain className="w-3.5 h-3.5 text-cyan-500" />
                    <span>AI Match Rationale</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                    {cand.matchExplanation}
                  </p>
                </div>

                {/* Verified Skills Progress Breakdown */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-600 dark:text-slate-400 font-black block">
                    Verified Skill Breakdown ({cand.verifiedSkills.length} Verified)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {cand.verifiedSkills.map((sk: any, skIdx: number) => (
                      <div key={skIdx} className="p-2.5 rounded-2xl bg-white/50 dark:bg-slate-900/60 border border-white/50 dark:border-slate-800 text-xs backdrop-blur-md">
                        <div className="flex items-center justify-between text-slate-900 dark:text-white font-extrabold">
                          <span className="flex items-center gap-1 text-[11px] truncate">
                            <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span className="truncate">{sk.name}</span>
                          </span>
                          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-black ml-1">{sk.score}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: `${sk.score}%` }} />
                        </div>
                      </div>
                    ))}

                    {cand.unverifiedSkills.map((sk: any, skIdx: number) => (
                      <div key={skIdx} className="p-2.5 rounded-2xl bg-white/30 dark:bg-slate-900/30 border border-white/30 dark:border-slate-800 text-xs opacity-70">
                        <div className="flex items-center justify-between text-slate-700 dark:text-slate-400 font-bold">
                          <span className="text-[11px] truncate">{sk.name}</span>
                          <span className="font-mono text-[10px] text-orange-500 font-extrabold">Unverified</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-orange-500/60 rounded-full" style={{ width: `${sk.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-white/30 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedCandidateId(cand.id);
                        setActiveTab('blockchain');
                      }}
                      className="px-3.5 py-2 rounded-full bg-white/60 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black flex items-center gap-1.5 transition-colors border border-white/60 dark:border-slate-700 shadow-sm cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>EVM Proofs ({cand.credentialsCount})</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedCandidateId(cand.id);
                        setActiveTab('skill-gap');
                      }}
                      className="px-3.5 py-2 rounded-full bg-white/60 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black flex items-center gap-1.5 transition-colors border border-white/60 dark:border-slate-700 shadow-sm cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Skill Gap</span>
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCandidateId(cand.id);
                      setActiveTab('skill-passport');
                    }}
                    className="px-4.5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md border border-cyan-300/40 cursor-pointer"
                  >
                    <span>Skill Passport</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="liquid-glass-card p-12 text-center rounded-[32px] space-y-3">
          <Layers className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-black text-slate-900 dark:text-white">No candidates match your voice search query</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Try saying "React", "PyTorch", "Solidity", or reset category filters.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); triggerAiAnalysis(); }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black shadow-md mt-2 border border-cyan-300/40 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidatesView;

