import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Zap,
  X,
  Users,
  Volume2,
  ExternalLink
} from 'lucide-react';

export const AiWorkspaceView: React.FC = () => {
  const { 
    candidates,
    setSelectedCandidateId,
    setActiveTab, 
    generateWorkflowFromPrompt
  } = useApp();

  const [promptText, setPromptText] = useState<string>(
    'I need a verified frontend developer for a 3-month e-commerce project.'
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [voiceStatus, setVoiceStatus] = useState<string>('Listening... Speak your requirement');

  const recognitionRef = useRef<any>(null);
  const simulationIntervalRef = useRef<any>(null);
  const isListeningRef = useRef<boolean>(false);

  const [extractedData, setExtractedData] = useState<{
    role: string;
    duration: string;
    projectType: string;
    skills: string[];
    confidenceScore: number;
    queryKeywords: string[];
  }>({
    role: 'Frontend Developer',
    duration: '3 months',
    projectType: 'E-commerce Platform',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'API Integration', 'UI/UX'],
    confidenceScore: 98,
    queryKeywords: ['frontend', 'react', 'javascript', 'e-commerce']
  });

  const samplePrompts = [
    { label: 'English Default', text: 'I need a frontend developer for a 3-month e-commerce project.' },
    { label: 'Tamil Multilingual (தமிழ்)', text: 'எனக்கு 3 மாத ஈ-காமர்ஸ் திட்டத்திற்கு ஒரு React Developer தேவை.' },
    { label: 'Hindi Multilingual (हिंदी)', text: 'मुझे 3 महीने के ई-कॉमर्स प्रोजेक्ट के लिए एक React डेवलपर चाहिए।' },
    { label: 'Web3 & EVM Project', text: 'Looking for a Solidity EVM smart contract developer for 4 months.' },
    { label: 'AI & PyTorch Engineer', text: 'Hire a PyTorch AI engineer to build neural network LLM pipeline.' }
  ];

  // Speech Recognition & Live YouTube-style Voice Input Setup
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
          setVoiceStatus('Listening... Speak requirement into your microphone...');
        };

        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            current += event.results[i][0].transcript;
          }
          if (current.trim()) {
            setLiveTranscript(current);
            setPromptText(current);
          }
        };

        recognition.onerror = () => {
          if (isListeningRef.current && !simulationIntervalRef.current) {
            startFallbackVoiceSimulation();
          }
        };

        recognition.onend = () => {
          if (isListeningRef.current) {
            try { recognition.start(); } catch (e) { startFallbackVoiceSimulation(); }
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

  // YouTube Voice Input Simulation Stream Fallback
  const startFallbackVoiceSimulation = (presetPhrase?: string) => {
    const targetPhrase = presetPhrase || "I need a verified React & Solidity EVM developer for 3-month project";
    const words = targetPhrase.split(' ');
    let step = 0;
    setVoiceStatus('Listening... Audio spectrum active');

    if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);

    simulationIntervalRef.current = setInterval(() => {
      if (!isListeningRef.current) {
        clearInterval(simulationIntervalRef.current);
        return;
      }
      step++;
      const partial = words.slice(0, step).join(' ');
      setLiveTranscript(partial);
      setPromptText(partial);
      setVoiceStatus(`Transcribing Voice (${step}/${words.length} words)...`);

      if (step >= words.length) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
        setVoiceStatus('Voice Input Transcribed Successfully!');
      }
    }, 600);
  };

  const openVoiceModal = () => {
    setShowVoiceModal(true);
    setIsListening(true);
    isListeningRef.current = true;
    setLiveTranscript('');
  };

  const closeVoiceModalAndAnalyze = () => {
    isListeningRef.current = false;
    setIsListening(false);
    setShowVoiceModal(false);

    const textToAnalyze = liveTranscript || promptText;
    if (textToAnalyze.trim()) {
      handleSimulatePromptSubmit(textToAnalyze);
    }
  };

  const handleSimulatePromptSubmit = (customText?: string) => {
    const textToProcess = customText || promptText;
    setIsProcessing(true);

    // Extract keywords for candidate search
    const lower = textToProcess.toLowerCase();
    const extractedKeywords: string[] = [];
    if (lower.includes('react')) extractedKeywords.push('React');
    if (lower.includes('frontend')) extractedKeywords.push('Frontend');
    if (lower.includes('solidity') || lower.includes('evm') || lower.includes('web3')) extractedKeywords.push('Solidity', 'EVM');
    if (lower.includes('pytorch') || lower.includes('ai') || lower.includes('ml')) extractedKeywords.push('PyTorch', 'AI & ML');
    if (lower.includes('ui') || lower.includes('ux') || lower.includes('designer')) extractedKeywords.push('UI/UX', 'Figma');
    if (lower.includes('node') || lower.includes('backend')) extractedKeywords.push('Node.js', 'Backend');
    if (extractedKeywords.length === 0) extractedKeywords.push('React', 'JavaScript', 'UI/UX');

    setTimeout(() => {
      setIsProcessing(false);
      if (textToProcess.includes('தமிழ்') || textToProcess.includes('தேவை')) {
        setExtractedData({
          role: 'React Software Developer',
          duration: '3 months (3 மாதங்கள்)',
          projectType: 'E-Commerce Platform (ஈ-காமர்ஸ்)',
          skills: ['React', 'JavaScript', 'API Integration', 'UI/UX'],
          confidenceScore: 99,
          queryKeywords: extractedKeywords
        });
      } else if (lower.includes('solidity') || lower.includes('evm') || lower.includes('web3')) {
        setExtractedData({
          role: 'Smart Contract & EVM Architect',
          duration: '4 months',
          projectType: 'Decentralized Web3 Protocol',
          skills: ['Solidity', 'EVM Proofs', 'Smart Contracts', 'Web3.js', 'Security'],
          confidenceScore: 97,
          queryKeywords: extractedKeywords
        });
      } else if (lower.includes('pytorch') || lower.includes('ai') || lower.includes('ml')) {
        setExtractedData({
          role: 'AI & Machine Learning Engineer',
          duration: '6 months',
          projectType: 'LLM Neural Pipeline',
          skills: ['PyTorch', 'Python', 'Neural Networks', 'LLM API', 'Vector DB'],
          confidenceScore: 96,
          queryKeywords: extractedKeywords
        });
      } else if (lower.includes('ui') || lower.includes('designer')) {
        setExtractedData({
          role: 'UI/UX Product Designer',
          duration: '2 months',
          projectType: 'Design System Overhaul',
          skills: ['Figma UI/UX', 'HTML/CSS', 'Design Tokens', 'Micro-interactions'],
          confidenceScore: 95,
          queryKeywords: extractedKeywords
        });
      } else {
        setExtractedData({
          role: 'Frontend Developer',
          duration: '3 months',
          projectType: 'E-commerce Platform',
          skills: ['React', 'JavaScript', 'HTML/CSS', 'API Integration', 'UI/UX'],
          confidenceScore: 98,
          queryKeywords: extractedKeywords
        });
      }
    }, 600);
  };

  const handleGenerateWorkflow = () => {
    generateWorkflowFromPrompt(promptText);
    setActiveTab('workflows');
  };

  // Search Engine Candidate Discovery Logic based on keywords across all 28 candidates
  const matchedCandidates = candidates.filter((cand) => {
    const queryStr = (promptText + ' ' + extractedData.skills.join(' ') + ' ' + extractedData.role + ' ' + (extractedData.queryKeywords?.join(' ') || '')).toLowerCase();
    const matchesRole = queryStr.includes(cand.role.toLowerCase());
    const matchesSkill = cand.verifiedSkills.some(s => queryStr.includes(s.name.toLowerCase()));
    const matchesCategory = extractedData.skills.some(sk => cand.verifiedSkills.some(vs => vs.name.toLowerCase().includes(sk.toLowerCase())));
    return matchesRole || matchesSkill || matchesCategory;
  }).sort((a, b) => b.matchScore - a.matchScore);

  // Fallback to top scored candidates if filter yields empty
  const displayCandidates = matchedCandidates.length > 0 ? matchedCandidates.slice(0, 6) : candidates.slice(0, 6);

  // Dynamic Requirement Project Flow Steps based on input prompt
  const generatedProjectFlowSteps = [
    {
      stepNum: '01',
      title: 'LLM Requirement & Skill Extraction',
      category: 'Keyword Parsing',
      duration: '5 sec',
      status: 'COMPLETED',
      detail: `Parsed role "${extractedData.role}" with tech stack: ${extractedData.skills.slice(0, 3).join(', ')}. Target Timeline: ${extractedData.duration}.`
    },
    {
      stepNum: '02',
      title: 'Candidate Index & Match Matrix',
      category: 'Roster Search',
      duration: '12 sec',
      status: 'COMPLETED',
      detail: `Evaluated 28 verified candidate IDs. Top Recommendation: ${displayCandidates[0]?.name || 'Arun Kumar'} (${displayCandidates[0]?.matchScore || 98}% Match Score).`
    },
    {
      stepNum: '03',
      title: 'EVM Sepolia Credential & Hash Audit',
      category: 'On-Chain Proof',
      duration: '15 sec',
      status: 'IN PROGRESS',
      detail: `Auditing cryptographic attestation hashes on Sepolia testnet for ${displayCandidates[0]?.verifiedSkills[0]?.name || 'React 19'}.`
    },
    {
      stepNum: '04',
      title: 'Sprint Backlog & Workspace Initialization',
      category: 'Task Pipeline',
      duration: '1 min',
      status: 'READY',
      detail: `Auto-configuring 6 Kanban sprint tasks assigned to candidate ID ${displayCandidates[0]?.id || 'cand-1'}.`
    },
    {
      stepNum: '05',
      title: 'Work Credential NFT Minting & Deployment',
      category: 'Digital Passport',
      duration: '30 sec',
      status: 'SCHEDULED',
      detail: `Publishing tamper-proof completion proof to candidate's verified Skill Passport upon milestone delivery.`
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Top Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          <span>Natural Language Workforce Intelligence</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          What do you need to accomplish?
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Type or speak your workforce requirement in English, Tamil, or Hindi. SkillFlow AI will structure the project and generate executable workflow pipelines.
        </p>
      </motion.div>

      {/* Primary Conversational AI Input Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 md:p-8 rounded-3xl relative card-hover-effect"
      >
        <div className="space-y-4">
          <div className="relative">
            <textarea
              rows={4}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. I need a frontend developer for a 3-month e-commerce project..."
              className="w-full bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none leading-relaxed shadow-inner"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Quick Sample Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Quick Prompts:</span>
              {samplePrompts.slice(0, 3).map((sp, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setPromptText(sp.text);
                    handleSimulatePromptSubmit(sp.text);
                  }}
                  className="text-[11px] px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                >
                  {sp.label}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* YouTube-Style Voice Microphone Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openVoiceModal}
                className="px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white border border-rose-400 text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
                title="Open YouTube-Style Voice Search Modal"
              >
                <Mic className="w-4 h-4 animate-pulse" />
                <span>Voice Input</span>
              </motion.button>

              {/* AI Analyze Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSimulatePromptSubmit()}
                disabled={isProcessing}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                {isProcessing ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin text-cyan-200" />
                    <span>Analyzing AI Vectors...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Requirement</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* YouTube-Style Voice Input Modal Overlay */}
      <AnimatePresence>
        {showVoiceModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="liquid-glass-card max-w-lg w-full p-8 rounded-[36px] text-center relative space-y-6 shadow-2xl border-2 border-rose-500/40 bg-slate-950 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  isListeningRef.current = false;
                  setIsListening(false);
                  setShowVoiceModal(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Title */}
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase font-bold text-rose-400 flex items-center justify-center gap-1.5">
                  <Volume2 className="w-4 h-4 animate-bounce" /> YouTube-Style Voice STT Search
                </span>
                <h3 className="text-xl font-black text-white">{voiceStatus}</h3>
              </div>

              {/* Large Glowing Red Microphone Circle */}
              <div className="relative my-6 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-28 h-28 rounded-full bg-rose-500/20 absolute pointer-events-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (isListening) {
                      isListeningRef.current = false;
                      setIsListening(false);
                      setVoiceStatus('Mic Paused. Click again or Done.');
                    } else {
                      isListeningRef.current = true;
                      setIsListening(true);
                      setVoiceStatus('Listening... Speak requirement');
                    }
                  }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 to-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-600/60 relative z-10 hover:scale-105 transition-all"
                >
                  {isListening ? <Mic className="w-8 h-8 animate-pulse" /> : <MicOff className="w-8 h-8" />}
                </button>
              </div>

              {/* Real-Time Live Voice Speech Transcription Box */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 min-h-[90px] text-left space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Live Voice Transcription:</span>
                <p className="text-sm font-semibold text-rose-300 font-mono">
                  {liveTranscript || promptText || "Speak requirement into mic..."}
                </p>
              </div>

              {/* Quick Spoken Voice Sample Shortcuts */}
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Or tap a sample query:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "I need a React and Solidity EVM developer",
                    "Find PyTorch AI Machine Learning engineer",
                    "Hire UI/UX Product Designer for 2 months"
                  ].map((phrase, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setLiveTranscript(phrase);
                        setPromptText(phrase);
                        startFallbackVoiceSimulation(phrase);
                      }}
                      className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-rose-500 hover:text-rose-300 font-medium"
                    >
                      "{phrase}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    isListeningRef.current = false;
                    setIsListening(false);
                    setShowVoiceModal(false);
                  }}
                  className="w-1/2 py-3 rounded-2xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={closeVoiceModalAndAnalyze}
                  className="w-1/2 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-cyan-500 text-white text-xs font-black shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5"
                >
                  <span>Search & Find Candidates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Structured AI Understanding Results Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/30 space-y-6 shadow-xl card-hover-effect"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                Structured AI LLM Understanding
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">
                  {extractedData.confidenceScore}% Vector Match
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Transformed raw prompt into verified workforce parameters</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateWorkflow}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all self-start md:self-auto cursor-pointer"
          >
            <span>Deploy Project Flow</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-2xl">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Target Role</span>
            <p className="text-sm font-extrabold text-cyan-600 dark:text-cyan-300 mt-1">{extractedData.role}</p>
          </div>

          <div className="glass-card p-4 rounded-2xl">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Project Duration</span>
            <p className="text-sm font-extrabold text-cyan-600 dark:text-cyan-300 mt-1">{extractedData.duration}</p>
          </div>

          <div className="glass-card p-4 rounded-2xl">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Project Classification</span>
            <p className="text-sm font-extrabold text-cyan-600 dark:text-cyan-300 mt-1">{extractedData.projectType}</p>
          </div>
        </div>

        {/* Extracted Skills Badges */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" />
            Extracted Technical Competencies & Skills:
          </span>

          <div className="flex flex-wrap gap-2">
            {extractedData.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* GENERATED REQUIREMENT PROJECT FLOW SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/40 space-y-6 shadow-2xl"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              <Zap className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Generated Project Flow Diagram & Milestones
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase border border-cyan-400/30">
                  AI Pipeline Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated project execution workflow synthesized from natural language keywords.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateWorkflow}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs flex items-center gap-2 shadow-md border border-cyan-300/40 cursor-pointer"
          >
            <span>Open Interactive Workflow Canvas</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* 5 Milestone Pipeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {generatedProjectFlowSteps.map((flowStep, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/80 border border-cyan-500/30 space-y-3 flex flex-col justify-between shadow-md relative group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-cyan-400">{flowStep.stepNum}</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[9px] font-mono font-black border border-cyan-400/30">
                    {flowStep.status}
                  </span>
                </div>
                <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                  {flowStep.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  {flowStep.detail}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>{flowStep.category}</span>
                <span className="text-cyan-400 font-bold">{flowStep.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Voice Search Engine Candidate Discovery Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 md:p-8 rounded-3xl border border-rose-500/30 space-y-6 shadow-2xl"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Matched Requirement Candidates ({displayCandidates.length} Found)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold uppercase border border-rose-500/30">
                  28 Candidate Roster Index
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extracted candidate matches based on LLM keyword analysis of <span className="font-mono text-cyan-400 font-bold">{extractedData.skills.join(', ')}</span>
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('candidates')}
            className="px-5 py-2.5 rounded-2xl bg-slate-950 dark:bg-cyan-500 text-white dark:text-slate-950 font-black text-xs flex items-center gap-2 shadow-md self-start md:self-auto cursor-pointer"
          >
            <span>Browse Full Roster ({candidates.length})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Matched Candidate Cards Roster */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayCandidates.map((cand) => (
            <motion.div
              key={cand.id}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-black border border-emerald-500/30">
                    {cand.matchScore}% Match
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">ID: {cand.id}</span>
                </div>

                <div className="flex items-center gap-3">
                  <img 
                    src={cand.avatar} 
                    alt={cand.name} 
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500 shadow-md"
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-1">
                      {cand.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold">{cand.role}</p>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">{cand.experienceYears} Yrs Exp • {cand.location}</span>
                  </div>
                </div>

                {/* Verified Skills */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Verified Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {cand.verifiedSkills.slice(0, 3).map((sk, skIdx) => (
                      <span key={skIdx} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-cyan-400 font-bold border border-slate-700">
                        {sk.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCandidateId(cand.id);
                  setActiveTab('skill-passport');
                }}
                className="w-full py-2 rounded-xl bg-slate-950 dark:bg-cyan-500 text-white dark:text-slate-950 text-xs font-black shadow-md flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
              >
                <span>Select & View Passport</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AiWorkspaceView;

