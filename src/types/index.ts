export type NavigationTab = 
  | 'landing'
  | 'dashboard'
  | 'ai-workspace'
  | 'workflows'
  | 'candidates'
  | 'skill-graph'
  | 'skill-gap'
  | 'credentials'
  | 'blockchain'
  | 'skill-passport'
  | 'projects'
  | 'analytics'
  | 'settings';

export type Language = 'en' | 'ta' | 'hi';

export interface VerifiedSkillItem {
  name: string;
  score: number; // 0 - 100
  verified: boolean;
  issuer?: string;
  txHash?: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  category?: 'Frontend & UI' | 'AI & ML' | 'Web3 & EVM' | 'Backend & Cloud' | 'Security & Data';
  avatar: string;
  experienceYears: number;
  matchScore: number;
  matchExplanation: string;
  verifiedSkills: VerifiedSkillItem[];
  unverifiedSkills: VerifiedSkillItem[];
  projectsCount: number;
  credentialsCount: number;
  workHistory: WorkCredential[];
  bio: string;
  location: string;
  availableForHire: boolean;
  passportId: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'AI & Data' | 'Design & UX' | 'Blockchain';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  verifiedCandidatesCount: number;
  demandScore: number; // 0 - 100
  parentId?: string;
  childrenIds?: string[];
  relatedSkills: string[];
  demonstratedInProjects: string[];
  learningPath: string[];
}

export interface Credential {
  id: string;
  title: string;
  candidateName: string;
  candidateId: string;
  issuer: string;
  issuedDate: string;
  credentialType: 'certificate' | 'course' | 'internship' | 'project' | 'employment';
  hash: string;
  txHash: string;
  network: string;
  status: 'Verified' | 'Pending' | 'Needs Review' | 'Invalid';
  documentName?: string;
  skillsVerified: string[];
}

export interface WorkflowNode {
  id: string;
  title: string;
  category: 'requirement' | 'analysis' | 'matching' | 'verification' | 'assessment' | 'approval' | 'onboarding' | 'assignment' | 'tracking' | 'completion' | 'credential';
  status: 'completed' | 'running' | 'waiting' | 'failed';
  description: string;
  assignee?: string;
  duration?: string;
  stepNumber: number;
}

export interface Workflow {
  id: string;
  title: string;
  role: string;
  duration: string;
  requirementPrompt: string;
  nodes: WorkflowNode[];
  status: 'Draft' | 'Active' | 'Completed';
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'backlog' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assigneeName?: string;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  client: string;
  duration: string;
  status: 'Active' | 'In Progress' | 'Completed';
  teamCount: number;
  requiredSkills: string[];
  assignedCandidateId: string;
  assignedCandidateName: string;
  workflowId: string;
  tasks: Task[];
  workCredentialId?: string;
  startDate: string;
}

export interface SkillGap {
  candidateId: string;
  candidateName: string;
  projectTitle: string;
  missingSkills: string[];
  recommendedPath: {
    id: number;
    title: string;
    description: string;
    type: string;
    completed: boolean;
  }[];
}

export interface WorkCredential {
  id: string;
  candidateId: string;
  candidateName: string;
  projectTitle: string;
  role: string;
  skillsDemonstrated: string[];
  duration: string;
  company: string;
  issuedDate: string;
  hash: string;
  txHash: string;
  status: 'VERIFIED';
}

export interface BlockchainRecord {
  txHash: string;
  credentialId: string;
  credentialTitle: string;
  issuer: string;
  holderName: string;
  blockNumber: number;
  timestamp: string;
  gasUsed: string;
  status: 'VERIFIED' | 'CONFIRMED' | 'PENDING';
  network: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'suggestion' | 'match' | 'verification';
  actionText: string;
  targetTab: NavigationTab;
  date: string;
}

export interface SystemActivity {
  id: string;
  title: string;
  timestamp: string;
  type: 'verification' | 'match' | 'workflow' | 'passport' | 'project';
  iconType: string;
}
