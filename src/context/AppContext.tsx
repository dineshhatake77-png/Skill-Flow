import React, { createContext, useContext, useState } from 'react';
import type { 
  NavigationTab, 
  Language, 
  Candidate, 
  Credential, 
  SkillNode, 
  Workflow, 
  WorkflowNode, 
  Project, 
  Task, 
  BlockchainRecord, 
  AIInsight, 
  SystemActivity, 
  SkillGap, 
  WorkCredential 
} from '../types';
import { 
  INITIAL_CANDIDATES, 
  INITIAL_CREDENTIALS, 
  INITIAL_SKILL_NODES, 
  DEFAULT_WORKFLOW, 
  INITIAL_PROJECTS, 
  INITIAL_BLOCKCHAIN_RECORDS, 
  INITIAL_AI_INSIGHTS, 
  INITIAL_ACTIVITIES, 
  INITIAL_SKILL_GAP 
} from '../data/mockData';
import confetti from 'canvas-confetti';

export type ThemeMode = 'light' | 'dark';

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedMotion: boolean;
}

interface DemoState {
  isActive: boolean;
  step: number;
  totalSteps: number;
  isPaused: boolean;
  currentStepMessage: string;
}

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  
  candidates: Candidate[];
  selectedCandidateId: string;
  setSelectedCandidateId: (id: string) => void;
  selectedCandidate: Candidate;
  
  credentials: Credential[];
  skillNodes: SkillNode[];
  selectedSkillId: string | null;
  setSelectedSkillId: (id: string | null) => void;
  
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  
  projects: Project[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  selectedProject: Project;
  
  blockchainRecords: BlockchainRecord[];
  insights: AIInsight[];
  activities: SystemActivity[];
  skillGap: SkillGap;
  
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  
  isVoiceRecording: boolean;
  toggleVoiceRecording: () => void;
  
  accessibility: AccessibilitySettings;
  updateAccessibility: (key: keyof AccessibilitySettings, value: any) => void;
  
  demoState: DemoState;
  startDemoMode: () => void;
  stopDemoMode: () => void;
  nextDemoStep: () => void;
  togglePauseDemo: () => void;
  
  // Custom Actions
  generateWorkflowFromPrompt: (promptText: string) => void;
  applyAiWorkflowCommand: (command: string) => void;
  addWorkflowNode: (nodeTitle: string, category: WorkflowNode['category']) => void;
  deleteWorkflowNode: (nodeId: string) => void;
  updateWorkflowNodeStatus: (nodeId: string, status: WorkflowNode['status']) => void;
  reorderWorkflowNodes: (draggedId: string, targetId: string) => void;
  uploadCredentialDocument: (title: string, issuer: string, candidateName: string, file?: File) => void;
  completeProjectAndMintCredential: (projectId: string) => void;
  addTaskToProject: (projectId: string, taskTitle: string) => void;
  updateTaskStatus: (projectId: string, taskId: string, newStatus: Task['status']) => void;
  advanceSkillGapStep: (stepId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('light');
  
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('cand-1');
  
  const [credentials, setCredentials] = useState<Credential[]>(INITIAL_CREDENTIALS);
  const [skillNodes] = useState<SkillNode[]>(INITIAL_SKILL_NODES);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>('sk-2');
  
  const [workflow, setWorkflow] = useState<Workflow>(DEFAULT_WORKFLOW);
  
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-1');
  
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainRecord[]>(INITIAL_BLOCKCHAIN_RECORDS);
  const [insights] = useState<AIInsight[]>(INITIAL_AI_INSIGHTS);
  const [activities, setActivities] = useState<SystemActivity[]>(INITIAL_ACTIVITIES);
  const [skillGap, setSkillGap] = useState<SkillGap>(INITIAL_SKILL_GAP);
  
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState<boolean>(false);
  
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    reducedMotion: false
  });
  
  const [demoState, setDemoState] = useState<DemoState>({
    isActive: false,
    step: 1,
    totalSteps: 12,
    isPaused: false,
    currentStepMessage: 'Welcome to SkillFlow Demo. Step 1: Business owner enters requirement.'
  });

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];
  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleVoiceRecording = () => {
    setIsVoiceRecording(prev => !prev);
  };

  const updateAccessibility = (key: keyof AccessibilitySettings, value: any) => {
    setAccessibility(prev => ({ ...prev, [key]: value }));
  };

  // Automated Hackathon Demo Runner (60-90s)
  const DEMO_MESSAGES = [
    '1. Requirement Entered: "I need a frontend developer for a 3-month e-commerce project."',
    '2. AI Skill Extraction: Role Frontend Developer, Skills: React, JavaScript, HTML/CSS, API Integration.',
    '3. AI Candidate Matching: Arun Kumar matched (92% confidence with transparent rationale).',
    '4. Select Candidate: Inspecting Arun Kumar\'s verified EVM skill credentials.',
    '5. Credential Verification: Hash 0x8f7a... verified on EVM Sepolia Testnet.',
    '6. Skill Gap Analyzer: Figma skill gap detected. AI generated 5-step learning path.',
    '7. Workflow Builder: Visual pipeline dynamically rendered with 11 interactive nodes.',
    '8. Project Management: E-commerce Platform workspace initialized with candidate assignment.',
    '9. AI Task Generation: Interactive Kanban sprint tasks generated automatically.',
    '10. Project Completion: Final sprint delivered and peer review verified.',
    '11. Blockchain Work Credential Minted: Cryptographic proof published to Polygon/Sepolia.',
    '12. Skill Passport Updated: Digital Skill Passport for Arun Kumar synced with shareable QR proof!'
  ];

  const DEMO_TABS: NavigationTab[] = [
    'ai-workspace',
    'ai-workspace',
    'candidates',
    'candidates',
    'blockchain',
    'skill-gap',
    'workflows',
    'projects',
    'projects',
    'projects',
    'blockchain',
    'skill-passport'
  ];

  const startDemoMode = () => {
    setDemoState({
      isActive: true,
      step: 1,
      totalSteps: 12,
      isPaused: false,
      currentStepMessage: DEMO_MESSAGES[0]
    });
    setActiveTab(DEMO_TABS[0]);
  };

  const stopDemoMode = () => {
    setDemoState(prev => ({ ...prev, isActive: false }));
  };

  const togglePauseDemo = () => {
    setDemoState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const nextDemoStep = () => {
    setDemoState(prev => {
      const nextStep = prev.step >= prev.totalSteps ? 1 : prev.step + 1;
      const targetTab = DEMO_TABS[nextStep - 1];
      setActiveTab(targetTab);
      
      if (nextStep === 11) {
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {
          console.log('Confetti effect triggered');
        }
      }

      return {
        ...prev,
        step: nextStep,
        currentStepMessage: DEMO_MESSAGES[nextStep - 1]
      };
    });
  };

  // Actions
  const generateWorkflowFromPrompt = (promptText: string) => {
    const isTamil = promptText.includes('தேவை') || promptText.includes('எனக்கு');
    const newWorkflow: Workflow = {
      id: `wf-${Date.now()}`,
      title: isTamil ? 'React Software Developer Flow (Tamil Input)' : 'E-Commerce Frontend Developer Flow',
      role: 'Frontend Developer',
      duration: '3 months',
      requirementPrompt: promptText,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      nodes: [
        { id: `n-${Date.now()}-1`, title: 'AI Requirement Extraction', category: 'requirement', status: 'completed', description: 'Extracted Role: Frontend Developer (React, JS, HTML/CSS)', stepNumber: 1 },
        { id: `n-${Date.now()}-2`, title: 'Competency Mapping', category: 'analysis', status: 'completed', description: 'Mapped 5 core technical competencies', stepNumber: 2 },
        { id: `n-${Date.now()}-3`, title: 'Candidate Discovery', category: 'matching', status: 'completed', description: 'Matched Arun Kumar (92%) & Priya Sharma (84%)', stepNumber: 3 },
        { id: `n-${Date.now()}-4`, title: 'EVM Credential Audit', category: 'verification', status: 'running', description: 'Checking Meta & OpenJS certificates on Sepolia', stepNumber: 4 },
        { id: `n-${Date.now()}-5`, title: 'Skill Gap Remediation', category: 'assessment', status: 'waiting', description: 'Figma learning path recommendation', stepNumber: 5 },
        { id: `n-${Date.now()}-6`, title: 'Sprint Onboarding', category: 'onboarding', status: 'waiting', description: 'Repo access & automated workspace setup', stepNumber: 6 },
        { id: `n-${Date.now()}-7`, title: 'Work History Credential Minting', category: 'credential', status: 'waiting', description: 'Generate verifiable NFT proof on completion', stepNumber: 7 }
      ]
    };
    setWorkflow(newWorkflow);
    
    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        title: `AI Workflow generated from prompt: "${promptText.substring(0, 30)}..."`,
        timestamp: 'Just now',
        type: 'workflow',
        iconType: 'GitBranch'
      },
      ...prev
    ]);
  };

  const applyAiWorkflowCommand = (commandText: string) => {
    if (commandText.toLowerCase().includes('interview')) {
      const newNode: WorkflowNode = {
        id: `node-${Date.now()}`,
        title: 'Technical Interview Step',
        category: 'assessment',
        status: 'waiting',
        description: 'AI-assisted technical interview and code architecture evaluation.',
        stepNumber: workflow.nodes.length + 1,
        duration: '45m'
      };
      
      setWorkflow(prev => {
        const nodes = [...prev.nodes];
        const approvalIdx = nodes.findIndex(n => n.category === 'approval');
        if (approvalIdx !== -1) {
          nodes.splice(approvalIdx, 0, newNode);
        } else {
          nodes.push(newNode);
        }
        return {
          ...prev,
          nodes: nodes.map((n, idx) => ({ ...n, stepNumber: idx + 1 }))
        };
      });
    }
  };

  const addWorkflowNode = (nodeTitle: string, category: WorkflowNode['category']) => {
    const newNode: WorkflowNode = {
      id: `node-custom-${Date.now()}`,
      title: nodeTitle,
      category,
      status: 'waiting',
      description: `Custom workflow step added manually.`,
      stepNumber: workflow.nodes.length + 1
    };
    setWorkflow(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
  };

  const deleteWorkflowNode = (nodeId: string) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.filter(n => n.id !== nodeId).map((n, idx) => ({ ...n, stepNumber: idx + 1 }))
    }));
  };

  const updateWorkflowNodeStatus = (nodeId: string, status: WorkflowNode['status']) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => n.id === nodeId ? { ...n, status } : n)
    }));
  };

  const reorderWorkflowNodes = (draggedId: string, targetId: string) => {
    setWorkflow(prev => {
      const nodes = [...prev.nodes];
      const dragIdx = nodes.findIndex(n => n.id === draggedId);
      const targetIdx = nodes.findIndex(n => n.id === targetId);
      if (dragIdx === -1 || targetIdx === -1) return prev;
      const [removed] = nodes.splice(dragIdx, 1);
      nodes.splice(targetIdx, 0, removed);
      return {
        ...prev,
        nodes: nodes.map((n, idx) => ({ ...n, stepNumber: idx + 1 }))
      };
    });
  };

  const uploadCredentialDocument = (title: string, issuer: string, candidateName: string) => {
    const randomHash = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const randomTx = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newCred: Credential = {
      id: `cred-${Date.now()}`,
      title,
      candidateName,
      candidateId: selectedCandidateId,
      issuer,
      issuedDate: new Date().toISOString().split('T')[0],
      credentialType: 'certificate',
      hash: randomHash,
      txHash: randomTx,
      network: 'EVM Sepolia Testnet',
      status: 'Verified',
      documentName: `${title.toLowerCase().replace(/\s+/g, '_')}_proof.pdf`,
      skillsVerified: ['React', 'JavaScript']
    };

    const newTxRecord: BlockchainRecord = {
      txHash: randomTx,
      credentialId: newCred.id,
      credentialTitle: title,
      issuer: `0x${issuer.substring(0, 6)}...ProofAddress`,
      holderName: candidateName,
      blockNumber: Math.floor(19000000 + Math.random() * 500000),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      gasUsed: '41,200 Gwei',
      status: 'VERIFIED',
      network: 'EVM Sepolia Testnet'
    };

    setCredentials(prev => [newCred, ...prev]);
    setBlockchainRecords(prev => [newTxRecord, ...prev]);

    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        title: `Credential "${title}" verified & minted on EVM Sepolia`,
        timestamp: 'Just now',
        type: 'verification',
        iconType: 'ShieldCheck'
      },
      ...prev
    ]);
  };

  const completeProjectAndMintCredential = (projectId: string) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    const newWorkCred: WorkCredential = {
      id: `wc-${Date.now()}`,
      candidateId: proj.assignedCandidateId,
      candidateName: proj.assignedCandidateName,
      projectTitle: proj.title,
      role: 'Frontend Developer',
      skillsDemonstrated: proj.requiredSkills,
      duration: proj.duration,
      company: proj.client,
      issuedDate: new Date().toISOString().split('T')[0],
      hash: '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      txHash: '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      status: 'VERIFIED'
    };

    setCandidates(prev => prev.map(c => {
      if (c.id === proj.assignedCandidateId) {
        return {
          ...c,
          workHistory: [newWorkCred, ...c.workHistory],
          projectsCount: c.projectsCount + 1,
          credentialsCount: c.credentialsCount + 1
        };
      }
      return c;
    }));

    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'Completed', workCredentialId: newWorkCred.id } : p));

    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    } catch (e) {
      console.log('Confetti effect');
    }

    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        title: `Work Credential minted for completed project "${proj.title}"! Appended to Digital Skill Passport.`,
        timestamp: 'Just now',
        type: 'passport',
        iconType: 'Award'
      },
      ...prev
    ]);
  };

  const addTaskToProject = (projectId: string, taskTitle: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskTitle,
      status: 'in_progress',
      priority: 'high',
      assigneeName: selectedCandidate.name
    };
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, tasks: [...p.tasks, newTask] };
      }
      return p;
    }));
  };

  const updateTaskStatus = (projectId: string, taskId: string, newStatus: Task['status']) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
        };
      }
      return p;
    }));
  };

  const advanceSkillGapStep = (stepId: number) => {
    setSkillGap(prev => ({
      ...prev,
      recommendedPath: prev.recommendedPath.map(item => item.id === stepId ? { ...item, completed: true } : item)
    }));
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      language,
      setLanguage,
      theme,
      setTheme,
      toggleTheme,
      candidates,
      selectedCandidateId,
      setSelectedCandidateId,
      selectedCandidate,
      credentials,
      skillNodes,
      selectedSkillId,
      setSelectedSkillId,
      workflow,
      setWorkflow,
      projects,
      selectedProjectId,
      setSelectedProjectId,
      selectedProject,
      blockchainRecords,
      insights,
      activities,
      skillGap,
      isAssistantOpen,
      setIsAssistantOpen,
      isVoiceRecording,
      toggleVoiceRecording,
      accessibility,
      updateAccessibility,
      demoState,
      startDemoMode,
      stopDemoMode,
      nextDemoStep,
      togglePauseDemo,
      generateWorkflowFromPrompt,
      applyAiWorkflowCommand,
      addWorkflowNode,
      deleteWorkflowNode,
      updateWorkflowNodeStatus,
      reorderWorkflowNodes,
      uploadCredentialDocument,
      completeProjectAndMintCredential,
      addTaskToProject,
      updateTaskStatus,
      advanceSkillGapStep
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
