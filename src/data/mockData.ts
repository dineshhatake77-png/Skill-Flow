import type { 
  Candidate, 
  Credential, 
  SkillNode, 
  Workflow, 
  Project, 
  BlockchainRecord, 
  AIInsight, 
  SystemActivity, 
  SkillGap 
} from '../types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Arun Kumar',
    role: 'Senior Frontend Developer',
    category: 'Frontend & UI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    experienceYears: 5,
    matchScore: 94,
    matchExplanation: 'Exceptional match. Verified React & JavaScript credentials on-chain. Built 2 scalable e-commerce micro-frontends with high test coverage.',
    verifiedSkills: [
      { name: 'React', score: 100, verified: true, issuer: 'Meta Certification Hub', txHash: '0x8f7a91c2e4b6d801' },
      { name: 'JavaScript', score: 100, verified: true, issuer: 'OpenJS Foundation', txHash: '0x9a8b7c6d5e4f3a2b' },
      { name: 'HTML/CSS', score: 95, verified: true, issuer: 'W3C Skill Trust', txHash: '0x1c2d3e4f5a6b7c8d' },
      { name: 'API Integration', score: 90, verified: true, issuer: 'Stripe Dev Alliance', txHash: '0x3e4f5a6b7c8d9e0f' },
      { name: 'Node.js', score: 80, verified: true, issuer: 'OpenJS Foundation', txHash: '0x4f5a6b7c8d9e0f1a' },
    ],
    unverifiedSkills: [
      { name: 'Figma UI/UX', score: 60, verified: false },
      { name: 'GraphQL', score: 70, verified: false }
    ],
    projectsCount: 7,
    credentialsCount: 6,
    bio: 'Passionate frontend engineer specializing in React ecosystems, performance optimization, and accessible component libraries.',
    location: 'Bengaluru, India',
    availableForHire: true,
    passportId: 'PASSPORT-ARUN-8891',
    workHistory: [
      {
        id: 'wc-101',
        candidateId: 'cand-1',
        candidateName: 'Arun Kumar',
        projectTitle: 'Global Shop Marketplace',
        role: 'Lead Frontend Developer',
        skillsDemonstrated: ['React', 'JavaScript', 'Stripe API', 'Tailwind CSS'],
        duration: '4 months',
        company: 'ShopVerse Inc.',
        issuedDate: '2025-11-15',
        hash: '0xa41e7d82910cfb32a11b0e9871',
        txHash: '0x72ac49e190283e91',
        status: 'VERIFIED'
      }
    ]
  },
  {
    id: 'cand-2',
    name: 'Priya Sharma',
    role: 'Full Stack Engineer & AI Integrator',
    category: 'AI & ML',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    experienceYears: 4,
    matchScore: 89,
    matchExplanation: 'Strong technical fit with verified Node.js and PyTorch AI API integration certificates.',
    verifiedSkills: [
      { name: 'Node.js', score: 95, verified: true, issuer: 'Node Institute', txHash: '0x5a6b7c8d9e0f1a2b' },
      { name: 'Python PyTorch', score: 92, verified: true, issuer: 'DeepLearning.AI', txHash: '0x3b2c1a0f9e8d7c6b' },
      { name: 'API Integration', score: 95, verified: true, issuer: 'AWS Training', txHash: '0x7c8d9e0f1a2b3c4d' },
    ],
    unverifiedSkills: [
      { name: 'React', score: 75, verified: false },
      { name: 'HTML/CSS', score: 80, verified: false }
    ],
    projectsCount: 5,
    credentialsCount: 4,
    bio: 'Fullstack builder enthusiastic about LLM pipelines, serverless microservices, and AI backend APIs.',
    location: 'Mumbai, India',
    availableForHire: true,
    passportId: 'PASSPORT-PRIYA-4402',
    workHistory: []
  },
  {
    id: 'cand-3',
    name: 'Marcus Vance',
    role: 'UI/UX Product Designer & Developer',
    category: 'Frontend & UI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    experienceYears: 6,
    matchScore: 82,
    matchExplanation: 'World-class Figma design credentials verified on-chain. Possesses React fundamentals and design systems mastery.',
    verifiedSkills: [
      { name: 'Figma UI/UX', score: 100, verified: true, issuer: 'Design Academy', txHash: '0x8d9e0f1a2b3c4d5e' },
      { name: 'Tailwind CSS', score: 95, verified: true, issuer: 'W3C Skill Trust', txHash: '0x9e0f1a2b3c4d5e6f' }
    ],
    unverifiedSkills: [
      { name: 'React', score: 70, verified: false },
      { name: 'JavaScript', score: 65, verified: false }
    ],
    projectsCount: 9,
    credentialsCount: 5,
    bio: 'Crafting pixel-perfect design systems, interactive prototypes, and modern Web3 glass interfaces.',
    location: 'San Francisco, USA',
    availableForHire: false,
    passportId: 'PASSPORT-MARCUS-1903',
    workHistory: []
  },
  {
    id: 'cand-4',
    name: 'Elena Rostova',
    role: 'Web3 DApp & Smart Contract Lead',
    category: 'Web3 & EVM',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    experienceYears: 5,
    matchScore: 91,
    matchExplanation: 'Verified Solidity & Sepolia EVM skills. Highly capable in decentralized application frontend & smart contract architecture.',
    verifiedSkills: [
      { name: 'Solidity EVM', score: 98, verified: true, issuer: 'ConsenSys Academy', txHash: '0x0f1a2b3c4d5e6f7a' },
      { name: 'Ethers.js', score: 92, verified: true, issuer: 'Ethereum Foundation', txHash: '0x1a2b3c4d5e6f7a8b' },
    ],
    unverifiedSkills: [
      { name: 'Rust', score: 65, verified: false }
    ],
    projectsCount: 8,
    credentialsCount: 6,
    bio: 'Specialized in web3 frontend interfaces, ethers.js integration, and gas-optimized smart contract deployment.',
    location: 'Berlin, Germany',
    availableForHire: true,
    passportId: 'PASSPORT-ELENA-7731',
    workHistory: []
  },
  {
    id: 'cand-5',
    name: 'David Chen',
    role: 'AI Model Engineer & PyTorch Lead',
    category: 'AI & ML',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    experienceYears: 6,
    matchScore: 96,
    matchExplanation: 'Mastery in PyTorch model training, transformer fine-tuning, and real-time inference optimization.',
    verifiedSkills: [
      { name: 'PyTorch ML', score: 98, verified: true, issuer: 'Stanford Online AI', txHash: '0xaa11bb22cc33dd44' },
      { name: 'Python', score: 96, verified: true, issuer: 'Python Institute', txHash: '0xbb22cc33dd44ee55' }
    ],
    unverifiedSkills: [
      { name: 'C++', score: 75, verified: false }
    ],
    projectsCount: 11,
    credentialsCount: 7,
    bio: 'Building state-of-the-art computer vision models and neural retrieval pipelines.',
    location: 'Toronto, Canada',
    availableForHire: true,
    passportId: 'PASSPORT-DAVID-9912',
    workHistory: []
  },
  {
    id: 'cand-6',
    name: 'Aisha Patel',
    role: 'EVM Smart Contract Security Auditor',
    category: 'Security & Data',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    experienceYears: 7,
    matchScore: 95,
    matchExplanation: 'Audited over $40M in EVM smart contract volume. Verified Foundry and Slither static analysis credentials.',
    verifiedSkills: [
      { name: 'Smart Contract Audit', score: 99, verified: true, issuer: 'CertiK Alliance', txHash: '0xcc33dd44ee55ff66' },
      { name: 'Foundry & Solidity', score: 95, verified: true, issuer: 'Ethereum Security Council', txHash: '0xdd44ee55ff66aa77' }
    ],
    unverifiedSkills: [
      { name: 'Vyper', score: 70, verified: false }
    ],
    projectsCount: 14,
    credentialsCount: 9,
    bio: 'Dedicated security researcher specializing in DeFi protocol exploit defense and invariant testing.',
    location: 'London, UK',
    availableForHire: true,
    passportId: 'PASSPORT-AISHA-3321',
    workHistory: []
  },
  {
    id: 'cand-7',
    name: 'Kenji Sato',
    role: 'Distributed Systems & Go Specialist',
    category: 'Backend & Cloud',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    experienceYears: 8,
    matchScore: 93,
    matchExplanation: 'Built high-throughput gRPC microservices processing 100k req/sec with verified Go performance credentials.',
    verifiedSkills: [
      { name: 'Golang', score: 97, verified: true, issuer: 'Google Cloud Academy', txHash: '0xee55ff66aa77bb88' },
      { name: 'gRPC & Microservices', score: 94, verified: true, issuer: 'CNCF Certification', txHash: '0xff66aa77bb88cc99' }
    ],
    unverifiedSkills: [
      { name: 'Kafka', score: 75, verified: false }
    ],
    projectsCount: 12,
    credentialsCount: 8,
    bio: 'Architecting ultra-low latency backend infrastructures and distributed fault-tolerant systems.',
    location: 'Tokyo, Japan',
    availableForHire: true,
    passportId: 'PASSPORT-KENJI-5541',
    workHistory: []
  },
  {
    id: 'cand-8',
    name: 'Sarah Jenkins',
    role: 'Cloud Infrastructure & Kubernetes Lead',
    category: 'Backend & Cloud',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    experienceYears: 6,
    matchScore: 90,
    matchExplanation: 'CKA Certified Kubernetes Administrator with automated Terraform & AWS deployment credentials on-chain.',
    verifiedSkills: [
      { name: 'Kubernetes CKA', score: 96, verified: true, issuer: 'Linux Foundation', txHash: '0xaa77bb88cc99dd00' },
      { name: 'Terraform AWS', score: 94, verified: true, issuer: 'HashiCorp Certified', txHash: '0xbb88cc99dd00ee11' }
    ],
    unverifiedSkills: [
      { name: 'Ansible', score: 70, verified: false }
    ],
    projectsCount: 10,
    credentialsCount: 7,
    bio: 'DevOps maven skilled in gitops workflows, Prometheus monitoring, and automated zero-downtime scaling.',
    location: 'Austin, USA',
    availableForHire: true,
    passportId: 'PASSPORT-SARAH-9082',
    workHistory: []
  },
  {
    id: 'cand-9',
    name: 'Carlos Mendez',
    role: 'React Native & Mobile Lead',
    category: 'Frontend & UI',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    experienceYears: 5,
    matchScore: 88,
    matchExplanation: 'Published 4 cross-platform iOS & Android apps with verified React Native performance benchmarks.',
    verifiedSkills: [
      { name: 'React Native', score: 95, verified: true, issuer: 'Meta Mobile Trust', txHash: '0xcc99dd00ee11ff22' },
      { name: 'TypeScript', score: 92, verified: true, issuer: 'OpenJS Foundation', txHash: '0xdd00ee11ff22aa33' }
    ],
    unverifiedSkills: [
      { name: 'Swift', score: 65, verified: false }
    ],
    projectsCount: 8,
    credentialsCount: 5,
    bio: 'Crafting fluid native mobile apps with smooth offline synchronization and biometric auth.',
    location: 'Madrid, Spain',
    availableForHire: true,
    passportId: 'PASSPORT-CARLOS-1120',
    workHistory: []
  },
  {
    id: 'cand-10',
    name: 'Dr. Amara Okafor',
    role: 'ZK Proofs & Cryptography Researcher',
    category: 'Security & Data',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200',
    experienceYears: 9,
    matchScore: 97,
    matchExplanation: 'Published peer-reviewed research on Zero-Knowledge SNARKs with verified Circom implementation proofs.',
    verifiedSkills: [
      { name: 'ZK Cryptography', score: 100, verified: true, issuer: 'Stanford Cryptography Hub', txHash: '0xee11ff22aa33bb44' },
      { name: 'Circom & SnarkJS', score: 96, verified: true, issuer: 'Ethereum Research Labs', txHash: '0xff22aa33bb44cc55' }
    ],
    unverifiedSkills: [
      { name: 'Halo2', score: 80, verified: false }
    ],
    projectsCount: 15,
    credentialsCount: 10,
    bio: 'Pioneering privacy-preserving verification architectures and zero-knowledge identity protocols.',
    location: 'Lagos, Nigeria',
    availableForHire: true,
    passportId: 'PASSPORT-AMARA-7700',
    workHistory: []
  },
  {
    id: 'cand-11',
    name: 'Liam O\'Connor',
    role: 'LLM Fine-Tuning & Vector DB Specialist',
    category: 'AI & ML',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    experienceYears: 4,
    matchScore: 91,
    matchExplanation: 'Built RAG pipelines indexing 5M documents using LangChain, Qdrant vector database, and LoRA adapters.',
    verifiedSkills: [
      { name: 'LangChain & RAG', score: 96, verified: true, issuer: 'Hugging Face Certified', txHash: '0xaa33bb44cc55dd66' },
      { name: 'Vector DBs', score: 94, verified: true, issuer: 'Pinecone Academy', txHash: '0xbb44cc55dd66ee77' }
    ],
    unverifiedSkills: [
      { name: 'ONNX', score: 70, verified: false }
    ],
    projectsCount: 6,
    credentialsCount: 5,
    bio: 'Specialized in domain-adapted large language models, semantic search vectors, and AI agent memory.',
    location: 'Dublin, Ireland',
    availableForHire: true,
    passportId: 'PASSPORT-LIAM-4491',
    workHistory: []
  },
  {
    id: 'cand-12',
    name: 'Maya Lin',
    role: 'Design Systems & Framer Motion Lead',
    category: 'Frontend & UI',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    experienceYears: 5,
    matchScore: 89,
    matchExplanation: 'Creator of popular open-source glassmorphic UI kit with 15k GitHub stars. Verified Tailwind CSS expert.',
    verifiedSkills: [
      { name: 'Framer Motion', score: 98, verified: true, issuer: 'Framer Institute', txHash: '0xcc55dd66ee77ff88' },
      { name: 'Design Systems', score: 96, verified: true, issuer: 'Design Systems Guild', txHash: '0xdd66ee77ff88aa99' }
    ],
    unverifiedSkills: [
      { name: 'Three.js', score: 72, verified: false }
    ],
    projectsCount: 8,
    credentialsCount: 6,
    bio: 'Obsessed with fluid micro-interactions, spring physics, dynamic dark modes, and glass UI aesthetics.',
    location: 'Singapore',
    availableForHire: true,
    passportId: 'PASSPORT-MAYA-8812',
    workHistory: []
  },
  {
    id: 'cand-13',
    name: 'Vikram Reddy',
    role: 'Solidity & Polygon Protocol Engineer',
    category: 'Web3 & EVM',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    experienceYears: 4,
    matchScore: 87,
    matchExplanation: 'Deployed high-volume NFT credential contracts on Polygon and EVM Sepolia testnet with verified on-chain hashes.',
    verifiedSkills: [
      { name: 'Solidity', score: 93, verified: true, issuer: 'Polygon Dev Guild', txHash: '0xee77ff88aa99bb00' },
      { name: 'ERC-721 / ERC-1155', score: 95, verified: true, issuer: 'OpenZeppelin Certified', txHash: '0xff88aa99bb00cc11' }
    ],
    unverifiedSkills: [
      { name: 'Hardhat', score: 75, verified: false }
    ],
    projectsCount: 7,
    credentialsCount: 5,
    bio: 'Building decentralized credentials, soulbound token standards, and multi-chain verification bridges.',
    location: 'Hyderabad, India',
    availableForHire: true,
    passportId: 'PASSPORT-VIKRAM-6632',
    workHistory: []
  },
  {
    id: 'cand-14',
    name: 'Chloe Dubois',
    role: 'High-Throughput Data Pipeline Lead',
    category: 'Security & Data',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    experienceYears: 7,
    matchScore: 92,
    matchExplanation: 'Engineered Apache Spark real-time telemetry processing 200GB daily log streams with verified data credentials.',
    verifiedSkills: [
      { name: 'Apache Spark Data', score: 96, verified: true, issuer: 'Databricks Certified', txHash: '0xaa99bb00cc11dd22' },
      { name: 'PostgreSQL & ClickHouse', score: 94, verified: true, issuer: 'DataCamp Professional', txHash: '0xbb00cc11dd22ee33' }
    ],
    unverifiedSkills: [
      { name: 'Flink', score: 70, verified: false }
    ],
    projectsCount: 11,
    credentialsCount: 7,
    bio: 'Transforming massive telemetry streams into real-time skill analytics and fraud detection signals.',
    location: 'Paris, France',
    availableForHire: true,
    passportId: 'PASSPORT-CHLOE-2290',
    workHistory: []
  },
  {
    id: 'cand-15',
    name: 'Alex Rivera',
    role: 'Serverless Microservices Architect',
    category: 'Backend & Cloud',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    experienceYears: 6,
    matchScore: 90,
    matchExplanation: 'Designed AWS Lambda event-driven architecture serving 2M daily active users with sub-50ms latencies.',
    verifiedSkills: [
      { name: 'AWS Lambda Serverless', score: 96, verified: true, issuer: 'AWS Solutions Architect', txHash: '0xcc11dd22ee33ff44' },
      { name: 'GraphQL & REST', score: 92, verified: true, issuer: 'Apollo GraphQL Guild', txHash: '0xdd22ee33ff44aa55' }
    ],
    unverifiedSkills: [
      { name: 'DynamoDB', score: 78, verified: false }
    ],
    projectsCount: 9,
    credentialsCount: 6,
    bio: 'Specialist in cloud-native serverless pipelines, event-driven architectures, and API gateways.',
    location: 'Denver, USA',
    availableForHire: true,
    passportId: 'PASSPORT-ALEX-5501',
    workHistory: []
  },
  {
    id: 'cand-15',
    name: 'Alex Rivera',
    role: 'Serverless Microservices Architect',
    category: 'Backend & Cloud',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    experienceYears: 6,
    matchScore: 90,
    matchExplanation: 'Designed AWS Lambda event-driven architecture serving 2M daily active users with sub-50ms latencies.',
    verifiedSkills: [
      { name: 'AWS Lambda Serverless', score: 96, verified: true, issuer: 'AWS Solutions Architect', txHash: '0xcc11dd22ee33ff44' },
      { name: 'GraphQL & REST', score: 92, verified: true, issuer: 'Apollo GraphQL Guild', txHash: '0xdd22ee33ff44aa55' }
    ],
    unverifiedSkills: [
      { name: 'DynamoDB', score: 78, verified: false }
    ],
    projectsCount: 9,
    credentialsCount: 6,
    bio: 'Specialist in cloud-native serverless pipelines, event-driven architectures, and API gateways.',
    location: 'Denver, USA',
    availableForHire: true,
    passportId: 'PASSPORT-ALEX-5501',
    workHistory: []
  },
  {
    id: 'cand-16',
    name: 'Devon Vance',
    role: 'Lead Rust & ZK-Rollups Protocol Developer',
    category: 'Web3 & EVM',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    experienceYears: 7,
    matchScore: 96,
    matchExplanation: 'Built Layer-2 zero-knowledge rollup verifier in Rust with verified EVM Sepolia testnet proofs.',
    verifiedSkills: [
      { name: 'Rust', score: 98, verified: true, issuer: 'Rust Foundation Certified', txHash: '0x1122334455667788' },
      { name: 'ZK Proofs & Sepolia', score: 95, verified: true, issuer: 'Ethereum Research Guild', txHash: '0x2233445566778899' }
    ],
    unverifiedSkills: [
      { name: 'Substrate', score: 75, verified: false }
    ],
    projectsCount: 13,
    credentialsCount: 8,
    bio: 'Pioneering high-throughput zkEVM circuits, cryptographic state compression, and Rust protocol engines.',
    location: 'Zurich, Switzerland',
    availableForHire: true,
    passportId: 'PASSPORT-DEVON-9901',
    workHistory: []
  },
  {
    id: 'cand-17',
    name: 'Nisha Kapoor',
    role: 'Staff Next.js 15 & React Server Components Engineer',
    category: 'Frontend & UI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    experienceYears: 6,
    matchScore: 94,
    matchExplanation: 'Architected enterprise Next.js App Router platforms with 100/100 Lighthouse performance scores.',
    verifiedSkills: [
      { name: 'Next.js 15', score: 99, verified: true, issuer: 'Vercel Partner Guild', txHash: '0x3344556677889900' },
      { name: 'React 19 & TypeScript', score: 96, verified: true, issuer: 'Meta Frontend Hub', txHash: '0x4455667788990011' }
    ],
    unverifiedSkills: [
      { name: 'Tailwind CSS v4', score: 82, verified: false }
    ],
    projectsCount: 10,
    credentialsCount: 7,
    bio: 'Specialized in server-side rendering, edge middleware, streaming hydration, and responsive design systems.',
    location: 'New Delhi, India',
    availableForHire: true,
    passportId: 'PASSPORT-NISHA-1204',
    workHistory: []
  },
  {
    id: 'cand-18',
    name: 'Tariq Al-Mansoor',
    role: 'Computer Vision & OpenCV AI Researcher',
    category: 'AI & ML',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    experienceYears: 8,
    matchScore: 93,
    matchExplanation: 'Developed real-time video telemetry extraction pipelines processing 60 FPS streams with PyTorch.',
    verifiedSkills: [
      { name: 'Computer Vision & YOLO', score: 97, verified: true, issuer: 'OpenCV AI Institute', txHash: '0x5566778899001122' },
      { name: 'PyTorch & CUDA', score: 95, verified: true, issuer: 'NVIDIA Deep Learning', txHash: '0x6677889900112233' }
    ],
    unverifiedSkills: [
      { name: 'TensorRT', score: 78, verified: false }
    ],
    projectsCount: 14,
    credentialsCount: 9,
    bio: 'Building edge AI vision models for industrial automation, object detection, and spatial analytics.',
    location: 'Dubai, UAE',
    availableForHire: true,
    passportId: 'PASSPORT-TARIQ-8821',
    workHistory: []
  },
  {
    id: 'cand-19',
    name: 'Sofia Rossi',
    role: 'GraphQL & Microservices Systems Lead',
    category: 'Backend & Cloud',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    experienceYears: 5,
    matchScore: 89,
    matchExplanation: 'Designed federated GraphQL graph layer querying 30+ distributed backend services seamlessly.',
    verifiedSkills: [
      { name: 'GraphQL Federation', score: 95, verified: true, issuer: 'Apollo GraphQL Professional', txHash: '0x7788990011223344' },
      { name: 'Node.js & Express', score: 93, verified: true, issuer: 'OpenJS Foundation', txHash: '0x8899001122334455' }
    ],
    unverifiedSkills: [
      { name: 'Kafka Streams', score: 70, verified: false }
    ],
    projectsCount: 8,
    credentialsCount: 5,
    bio: 'Connecting complex backend ecosystems with unified GraphQL schemas, caching layers, and rate limiters.',
    location: 'Milan, Italy',
    availableForHire: true,
    passportId: 'PASSPORT-SOFIA-3310',
    workHistory: []
  },
  {
    id: 'cand-20',
    name: 'Jackson Blake',
    role: 'Fullstack Web3 & Solana/EVM Developer',
    category: 'Web3 & EVM',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    experienceYears: 4,
    matchScore: 88,
    matchExplanation: 'Cross-chain Web3 developer proficient in Wagmi, Ethers.js, and Anchor Solana smart contracts.',
    verifiedSkills: [
      { name: 'Web3.js & Wagmi', score: 94, verified: true, issuer: 'Ethereum Dev Alliance', txHash: '0x9900112233445566' },
      { name: 'Solidity & Sepolia', score: 90, verified: true, issuer: 'ConsenSys Academy', txHash: '0x0011223344556677' }
    ],
    unverifiedSkills: [
      { name: 'Anchor Rust', score: 72, verified: false }
    ],
    projectsCount: 7,
    credentialsCount: 5,
    bio: 'Creating seamless multi-chain wallet connection interfaces, NFT minting dApps, and DeFi swaps.',
    location: 'Austin, USA',
    availableForHire: true,
    passportId: 'PASSPORT-JACKSON-6601',
    workHistory: []
  },
  {
    id: 'cand-21',
    name: 'Zoe Washington',
    role: 'Cybersecurity & Zero-Trust Incident Lead',
    category: 'Security & Data',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    experienceYears: 7,
    matchScore: 95,
    matchExplanation: 'CISSP Certified security engineer with verified penetration testing and IAM credential proofs.',
    verifiedSkills: [
      { name: 'Cybersecurity CISSP', score: 98, verified: true, issuer: 'ISC2 Security Council', txHash: '0x1133557799bbdd00' },
      { name: 'Zero-Trust IAM', score: 94, verified: true, issuer: 'Okta Security Professional', txHash: '0x22446688aaccee11' }
    ],
    unverifiedSkills: [
      { name: 'SIEM Splunk', score: 80, verified: false }
    ],
    projectsCount: 12,
    credentialsCount: 8,
    bio: 'Safeguarding enterprise identity pipelines, auditing API endpoints, and hardening zero-trust networks.',
    location: 'Washington D.C., USA',
    availableForHire: true,
    passportId: 'PASSPORT-ZOE-4411',
    workHistory: []
  },
  {
    id: 'cand-22',
    name: 'Hiroshi Tanaka',
    role: 'Autonomous AI Agents & AutoGPT Architect',
    category: 'AI & ML',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    experienceYears: 5,
    matchScore: 97,
    matchExplanation: 'Pioneered multi-agent collaboration frameworks with LangChain, CrewAI, and vector search memory.',
    verifiedSkills: [
      { name: 'Autonomous AI Agents', score: 99, verified: true, issuer: 'OpenAI Agent Guild', txHash: '0x33557799bbdd0022' },
      { name: 'Python & LangChain', score: 96, verified: true, issuer: 'DeepLearning.AI', txHash: '0x446688aaccee1133' }
    ],
    unverifiedSkills: [
      { name: 'AutoGen', score: 82, verified: false }
    ],
    projectsCount: 11,
    credentialsCount: 7,
    bio: 'Designing autonomous multi-agent task execution engines, tool-calling LLMs, and persistent memory stores.',
    location: 'Tokyo, Japan',
    availableForHire: true,
    passportId: 'PASSPORT-HIROSHI-9988',
    workHistory: []
  },
  {
    id: 'cand-23',
    name: 'Hannah Schmidt',
    role: 'Flutter & iOS Cross-Platform Architect',
    category: 'Frontend & UI',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    experienceYears: 6,
    matchScore: 91,
    matchExplanation: 'Shipped 5 Flutter mobile apps with 4.9 star App Store ratings and verified Dart performance benchmarks.',
    verifiedSkills: [
      { name: 'Flutter & Dart', score: 97, verified: true, issuer: 'Google Developers Guild', txHash: '0x557799bbdd002244' },
      { name: 'Mobile UI/UX', score: 93, verified: true, issuer: 'Apple Developer Academy', txHash: '0x6688aaccee113355' }
    ],
    unverifiedSkills: [
      { name: 'SwiftUI', score: 75, verified: false }
    ],
    projectsCount: 9,
    credentialsCount: 6,
    bio: 'Crafting high-performance mobile experiences with smooth 120Hz animations and offline database sync.',
    location: 'Munich, Germany',
    availableForHire: true,
    passportId: 'PASSPORT-HANNAH-2210',
    workHistory: []
  },
  {
    id: 'cand-24',
    name: 'Mateo Silva',
    role: 'PostgreSQL & Vector Database Tuning Lead',
    category: 'Security & Data',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    experienceYears: 7,
    matchScore: 92,
    matchExplanation: 'Optimized pgvector & ClickHouse indexing handling 100M embedding vectors with sub-10ms nearest-neighbor retrieval.',
    verifiedSkills: [
      { name: 'PostgreSQL & pgvector', score: 96, verified: true, issuer: 'PostgreSQL Professional', txHash: '0x7799bbdd00224466' },
      { name: 'Database Query Tuning', score: 94, verified: true, issuer: 'DBA Certification Hub', txHash: '0x88aaccee11335577' }
    ],
    unverifiedSkills: [
      { name: 'Redis Stack', score: 80, verified: false }
    ],
    projectsCount: 10,
    credentialsCount: 7,
    bio: 'Database specialist focused on relational scalability, vector embeddings indexing, and high availability clusters.',
    location: 'Sao Paulo, Brazil',
    availableForHire: true,
    passportId: 'PASSPORT-MATEO-7733',
    workHistory: []
  },
  {
    id: 'cand-25',
    name: 'Ananya Rao',
    role: 'Lead React 19 & Tailwind CSS Systems Engineer',
    category: 'Frontend & UI',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200',
    experienceYears: 5,
    matchScore: 95,
    matchExplanation: 'Architected component library used by 50+ enterprise teams with verified React 19 & TypeScript credentials.',
    verifiedSkills: [
      { name: 'React 19 & Hooks', score: 98, verified: true, issuer: 'Meta Frontend Certified', txHash: '0x99bbdd0022446688' },
      { name: 'Tailwind CSS & Glass UI', score: 95, verified: true, issuer: 'W3C Web Standards', txHash: '0xaaccee1133557799' }
    ],
    unverifiedSkills: [
      { name: 'WebGL', score: 70, verified: false }
    ],
    projectsCount: 8,
    credentialsCount: 6,
    bio: 'Building beautiful, accessible, and lightning-fast web applications with clean atomic CSS architectures.',
    location: 'Bengaluru, India',
    availableForHire: true,
    passportId: 'PASSPORT-ANANYA-3390',
    workHistory: []
  },
  {
    id: 'cand-26',
    name: 'Siddharth Mehta',
    role: 'PyTorch Neural Network Research Lead',
    category: 'AI & ML',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    experienceYears: 6,
    matchScore: 96,
    matchExplanation: 'Fine-tuned 70B parameter open-weight LLMs with FlashAttention-2 and LoRA adapters on 16 H100 GPUs.',
    verifiedSkills: [
      { name: 'PyTorch & Transformers', score: 98, verified: true, issuer: 'Hugging Face Expert', txHash: '0xbbdd0022446688aa' },
      { name: 'CUDA GPU Tuning', score: 94, verified: true, issuer: 'NVIDIA AI Institute', txHash: '0xccee1133557799bb' }
    ],
    unverifiedSkills: [
      { name: 'Triton Compiler', score: 78, verified: false }
    ],
    projectsCount: 12,
    credentialsCount: 8,
    bio: 'Specialist in distributed LLM training, model quantization (GGUF/AWQ), and high-efficiency neural inference.',
    location: 'Bengaluru, India',
    availableForHire: true,
    passportId: 'PASSPORT-SIDDHARTH-5512',
    workHistory: []
  },
  {
    id: 'cand-27',
    name: 'Beatriz Santos',
    role: 'Solidity Audit & Smart Contract Security Engineer',
    category: 'Web3 & EVM',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    experienceYears: 5,
    matchScore: 94,
    matchExplanation: 'Verified Foundry invariant tester and Solidity auditor with 10+ published smart contract security reports.',
    verifiedSkills: [
      { name: 'Solidity & Sepolia', score: 96, verified: true, issuer: 'ConsenSys Security Guild', txHash: '0xdd0022446688aac2' },
      { name: 'Foundry & Slither', score: 95, verified: true, issuer: 'OpenZeppelin Security', txHash: '0xee1133557799bbd3' }
    ],
    unverifiedSkills: [
      { name: 'Yul Assembly', score: 72, verified: false }
    ],
    projectsCount: 9,
    credentialsCount: 6,
    bio: 'Securing decentralized protocols against reentrancy attacks, flash loan exploits, and governance hijacks.',
    location: 'Lisbon, Portugal',
    availableForHire: true,
    passportId: 'PASSPORT-BEATRIZ-1199',
    workHistory: []
  },
  {
    id: 'cand-28',
    name: 'Oliver Wright',
    role: 'DevOps & Terraform Infrastructure Lead',
    category: 'Backend & Cloud',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    experienceYears: 7,
    matchScore: 91,
    matchExplanation: 'Automated multi-region AWS Kubernetes clusters with GitOps ArgoCD and Terraform Infrastructure-as-Code.',
    verifiedSkills: [
      { name: 'DevOps & Kubernetes', score: 96, verified: true, issuer: 'Linux Foundation CKA', txHash: '0xff22446688aacce4' },
      { name: 'Terraform & AWS', score: 93, verified: true, issuer: 'HashiCorp Certified', txHash: '0x0033557799bbdd05' }
    ],
    unverifiedSkills: [
      { name: 'Pulumi', score: 75, verified: false }
    ],
    projectsCount: 11,
    credentialsCount: 7,
    bio: 'Building resilient cloud infrastructure, CI/CD pipelines, and automated zero-downtime deployment workflows.',
    location: 'London, UK',
    availableForHire: true,
    passportId: 'PASSPORT-OLIVER-8877',
    workHistory: []
  }
];

export const INITIAL_CREDENTIALS: Credential[] = [
  {
    id: 'cred-1',
    title: 'Meta Certified Senior React Specialist',
    candidateName: 'Arun Kumar',
    candidateId: 'cand-1',
    issuer: 'Meta Certification Network',
    issuedDate: '2025-08-14',
    credentialType: 'certificate',
    hash: '0x8f7a91c2e4b6d8019ac12034981d02fe',
    txHash: '0x72ac49e190283e91a029304192038102',
    network: 'EVM Sepolia Testnet',
    status: 'Verified',
    documentName: 'meta_react_advanced_arun.pdf',
    skillsVerified: ['React', 'JavaScript', 'HTML/CSS', 'Redux']
  },
  {
    id: 'cred-2',
    title: 'OpenJS Foundation JavaScript Master',
    candidateName: 'Arun Kumar',
    candidateId: 'cand-1',
    issuer: 'OpenJS Foundation',
    issuedDate: '2025-04-10',
    credentialType: 'course',
    hash: '0x9a8b7c6d5e4f3a2b1092837465019283',
    txHash: '0x83bd50f201394f029102930491029384',
    network: 'EVM Sepolia Testnet',
    status: 'Verified',
    documentName: 'openjs_master_cert.pdf',
    skillsVerified: ['JavaScript', 'API Integration', 'ES6+']
  },
  {
    id: 'cred-3',
    title: 'Stripe Dev Certified Commerce API Engineer',
    candidateName: 'Arun Kumar',
    candidateId: 'cand-1',
    issuer: 'Stripe Developer Alliance',
    issuedDate: '2025-09-01',
    credentialType: 'project',
    hash: '0x3e4f5a6b7c8d9e0f9182736450192837',
    txHash: '0x94ce61a312405a139102930491029384',
    network: 'EVM Polygon Amoy',
    status: 'Verified',
    documentName: 'stripe_api_proof.json',
    skillsVerified: ['API Integration', 'Payment Workflows']
  },
  {
    id: 'cred-4',
    title: 'Figma UI/UX Advanced System Designer',
    candidateName: 'Marcus Vance',
    candidateId: 'cand-3',
    issuer: 'Design Systems Institute',
    issuedDate: '2025-02-18',
    credentialType: 'certificate',
    hash: '0x8d9e0f1a2b3c4d5e9018273645019283',
    txHash: '0x05df72b423516b249102930491029384',
    network: 'EVM Sepolia Testnet',
    status: 'Verified',
    documentName: 'figma_master_marcus.pdf',
    skillsVerified: ['Figma UI/UX', 'Design Tokens']
  },
  {
    id: 'cred-5',
    title: 'AWS Certified Cloud Solutions Associate',
    candidateName: 'Priya Sharma',
    candidateId: 'cand-2',
    issuer: 'Amazon Web Services',
    issuedDate: '2025-10-12',
    credentialType: 'certificate',
    hash: '0x7c8d9e0f1a2b3c4d1234567890abcdef',
    txHash: '0x16ea83c534627c359102930491029384',
    network: 'EVM Sepolia Testnet',
    status: 'Verified',
    documentName: 'aws_solutions_priya.pdf',
    skillsVerified: ['Node.js', 'API Integration', 'Serverless']
  },
  {
    id: 'cred-6',
    title: 'Advanced Figma Component Systems',
    candidateName: 'Arun Kumar',
    candidateId: 'cand-1',
    issuer: 'Coursera & Figma Guild',
    issuedDate: '2026-01-15',
    credentialType: 'course',
    hash: '0x2b3c4d5e6f7a8b9c1029384756102938',
    txHash: '0x27fb94d645738d469102930491029384',
    network: 'EVM Sepolia Testnet',
    status: 'Pending',
    documentName: 'figma_course_draft.pdf',
    skillsVerified: ['Figma UI/UX']
  }
];

export const INITIAL_SKILL_NODES: SkillNode[] = [
  {
    id: 'sk-1',
    name: 'Frontend Development',
    category: 'Frontend',
    level: 'Expert',
    description: 'Core foundation for web interfaces, single-page apps, and interactive component libraries.',
    verifiedCandidatesCount: 42,
    demandScore: 96,
    childrenIds: ['sk-2', 'sk-3', 'sk-4'],
    relatedSkills: ['UI/UX', 'API Integration', 'State Management'],
    demonstratedInProjects: ['E-commerce Platform', 'FinTech Dashboard Suite', 'SaaS Workflow'],
    learningPath: ['DOM Fundamentals', 'ES6+ Syntax', 'Component Design Patterns', 'State & Props']
  },
  {
    id: 'sk-2',
    name: 'React',
    category: 'Frontend',
    level: 'Advanced',
    description: 'Declarative component framework for building responsive user interfaces.',
    verifiedCandidatesCount: 38,
    demandScore: 98,
    parentId: 'sk-1',
    childrenIds: ['sk-5', 'sk-6'],
    relatedSkills: ['JavaScript', 'Redux', 'Tailwind CSS', 'TypeScript'],
    demonstratedInProjects: ['E-commerce Platform', 'SkillFlow Core'],
    learningPath: ['JSX Syntax', 'Hooks (useState, useEffect)', 'Custom Hooks', 'Performance Memoization']
  },
  {
    id: 'sk-3',
    name: 'JavaScript',
    category: 'Frontend',
    level: 'Expert',
    description: 'Universal language of the web for client side dynamic execution & async APIs.',
    verifiedCandidatesCount: 45,
    demandScore: 94,
    parentId: 'sk-1',
    childrenIds: [],
    relatedSkills: ['TypeScript', 'Node.js', 'Async/Await'],
    demonstratedInProjects: ['E-commerce Platform', 'Crypto Wallet'],
    learningPath: ['Prototypes', 'Closures', 'Promises', 'Event Loop']
  },
  {
    id: 'sk-4',
    name: 'UI/UX & Figma',
    category: 'Design & UX',
    level: 'Intermediate',
    description: 'User experience layout wireframing, color systems, glassmorphism, and vector design.',
    verifiedCandidatesCount: 29,
    demandScore: 89,
    parentId: 'sk-1',
    childrenIds: [],
    relatedSkills: ['React', 'CSS Grid', 'Tailwind CSS'],
    demonstratedInProjects: ['Linear Style Dashboard'],
    learningPath: ['Figma Auto Layout', 'Design Tokens', 'Micro-interactions', 'Accessibility Contrast']
  },
  {
    id: 'sk-5',
    name: 'React Hooks',
    category: 'Frontend',
    level: 'Advanced',
    description: 'Functional state and lifecycle handlers in modern React.',
    verifiedCandidatesCount: 35,
    demandScore: 92,
    parentId: 'sk-2',
    relatedSkills: ['React', 'Redux'],
    demonstratedInProjects: ['E-commerce Platform'],
    learningPath: ['useState', 'useEffect', 'useReducer', 'useCallback']
  },
  {
    id: 'sk-6',
    name: 'API Integration',
    category: 'Backend',
    level: 'Advanced',
    description: 'Connecting frontend clients to RESTful endpoints, GraphQL, and async WebSockets.',
    verifiedCandidatesCount: 31,
    demandScore: 90,
    parentId: 'sk-2',
    relatedSkills: ['Node.js', 'Axios', 'Fetch API'],
    demonstratedInProjects: ['Stripe Checkout', 'Blockchain Indexer'],
    learningPath: ['HTTP Headers', 'JSON Parsing', 'Error Handling', 'Authentication Bearer Tokens']
  }
];

export const DEFAULT_WORKFLOW: Workflow = {
  id: 'wf-101',
  title: 'E-commerce Frontend Developer Onboarding Flow',
  role: 'Frontend Developer',
  duration: '3 months',
  requirementPrompt: 'I need a frontend developer for a 3-month e-commerce project.',
  status: 'Active',
  createdAt: '2026-09-22',
  nodes: [
    {
      id: 'node-1',
      title: 'Requirement Analysis',
      category: 'requirement',
      status: 'completed',
      description: 'Extract role requirements, project scope, and required tech stack.',
      stepNumber: 1,
      duration: '5m'
    },
    {
      id: 'node-2',
      title: 'Skill Analysis',
      category: 'analysis',
      status: 'completed',
      description: 'AI extracts required competencies: React, JavaScript, HTML/CSS, API Integration.',
      stepNumber: 2,
      duration: '10m'
    },
    {
      id: 'node-3',
      title: 'Candidate Matching',
      category: 'matching',
      status: 'completed',
      description: 'Filter verified candidate database. Top Candidate: Arun Kumar (92% match).',
      stepNumber: 3,
      assignee: 'SkillFlow AI Engine',
      duration: '15m'
    },
    {
      id: 'node-4',
      title: 'Credential Verification',
      category: 'verification',
      status: 'completed',
      description: 'Verify Meta React Certificate & OpenJS Proof on Sepolia Testnet.',
      stepNumber: 4,
      duration: '1m'
    },
    {
      id: 'node-5',
      title: 'Technical Assessment',
      category: 'assessment',
      status: 'completed',
      description: 'Evaluate React e-commerce code sandbox submission and API wiring.',
      stepNumber: 5,
      duration: '2h'
    },
    {
      id: 'node-6',
      title: 'Manager Approval',
      category: 'approval',
      status: 'running',
      description: 'Engineering Lead review match reason and budget parameters.',
      stepNumber: 6,
      assignee: 'Arun (Project Lead)',
      duration: '1d'
    },
    {
      id: 'node-7',
      title: 'Onboarding & Setup',
      category: 'onboarding',
      status: 'waiting',
      description: 'Grant repo access, Slack channels, and dev environment credentials.',
      stepNumber: 7,
      duration: '1d'
    },
    {
      id: 'node-8',
      title: 'Project Assignment',
      category: 'assignment',
      status: 'waiting',
      description: 'Assign E-commerce Platform Kanban sprint tasks.',
      stepNumber: 8,
      duration: '3m'
    },
    {
      id: 'node-9',
      title: 'Progress Tracking',
      category: 'tracking',
      status: 'waiting',
      description: 'Monitor daily commit telemetry and sprint completion.',
      stepNumber: 9,
      duration: '3 months'
    },
    {
      id: 'node-10',
      title: 'Project Completion',
      category: 'completion',
      status: 'waiting',
      description: 'Final code audit and peer review approval.',
      stepNumber: 10,
      duration: '1d'
    },
    {
      id: 'node-11',
      title: 'Work Credential Minting',
      category: 'credential',
      status: 'waiting',
      description: 'Mint verifiable Work History Credential on EVM and append to Digital Skill Passport.',
      stepNumber: 11,
      duration: '30s'
    }
  ]
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'E-commerce Platform Frontend',
    description: 'High performance React e-commerce store with real-time inventory, Stripe checkout, and dark mode interface.',
    client: 'ShopVerse Global',
    duration: '3 months',
    status: 'In Progress',
    teamCount: 4,
    requiredSkills: ['React', 'JavaScript', 'HTML/CSS', 'API Integration', 'Figma UI/UX'],
    assignedCandidateId: 'cand-1',
    assignedCandidateName: 'Arun Kumar',
    workflowId: 'wf-101',
    startDate: '2026-09-01',
    tasks: [
      { id: 'task-1', title: 'Setup React + Vite + Tailwind boilerplate', status: 'completed', priority: 'high', assigneeName: 'Arun Kumar', category: 'Dev Setup' },
      { id: 'task-2', title: 'Build Product Catalog Grid with filter filters', status: 'completed', priority: 'high', assigneeName: 'Arun Kumar', category: 'UI Components' },
      { id: 'task-3', title: 'Integrate Stripe Payment API Checkout Drawer', status: 'in_progress', priority: 'high', assigneeName: 'Arun Kumar', category: 'API Integration' },
      { id: 'task-4', title: 'Implement Responsive Shopping Cart State & Badges', status: 'in_progress', priority: 'medium', assigneeName: 'Arun Kumar', category: 'State' },
      { id: 'task-5', title: 'Design System Alignment with Figma Specs', status: 'backlog', priority: 'medium', assigneeName: 'Arun Kumar', category: 'UI/UX' },
      { id: 'task-6', title: 'End-to-End E2E Checkout Flow Testing', status: 'backlog', priority: 'low', assigneeName: 'Arun Kumar', category: 'QA' }
    ]
  },
  {
    id: 'proj-2',
    title: 'AI Workflow Telemetry Dashboard',
    description: 'Real-time analytics engine visualizing model latency, pipeline completion, and verified skill attestations.',
    client: 'Cognitive Automation Corp',
    duration: '2 months',
    status: 'Active',
    teamCount: 3,
    requiredSkills: ['Node.js', 'React', 'Recharts', 'API Integration'],
    assignedCandidateId: 'cand-2',
    assignedCandidateName: 'Priya Sharma',
    workflowId: 'wf-102',
    startDate: '2026-08-15',
    tasks: [
      { id: 'task-10', title: 'Connect WebSockets telemetry stream', status: 'in_progress', priority: 'high', assigneeName: 'Priya Sharma' },
      { id: 'task-11', title: 'Configure Recharts custom tooltip & glowing gradients', status: 'completed', priority: 'medium', assigneeName: 'Priya Sharma' }
    ]
  }
];

export const INITIAL_BLOCKCHAIN_RECORDS: BlockchainRecord[] = [
  {
    txHash: '0x72ac49e190283e91a029304192038102',
    credentialId: 'cred-1',
    credentialTitle: 'Meta Certified Senior React Specialist',
    issuer: '0x89205A3A3b2A6AD1a2381287b41C0d',
    holderName: 'Arun Kumar',
    blockNumber: 18492041,
    timestamp: '2025-08-14 14:22:08 UTC',
    gasUsed: '42,108 Gwei',
    status: 'VERIFIED',
    network: 'EVM Sepolia Testnet'
  },
  {
    txHash: '0x83bd50f201394f029102930491029384',
    credentialId: 'cred-2',
    credentialTitle: 'OpenJS Foundation JavaScript Master',
    issuer: '0x41F93a4B0912D83921A70321B0918F',
    holderName: 'Arun Kumar',
    blockNumber: 18102948,
    timestamp: '2025-04-10 09:15:33 UTC',
    gasUsed: '38,920 Gwei',
    status: 'VERIFIED',
    network: 'EVM Sepolia Testnet'
  },
  {
    txHash: '0x94ce61a312405a139102930491029384',
    credentialId: 'cred-3',
    credentialTitle: 'Stripe Dev Certified Commerce API Engineer',
    issuer: '0x99A82b4C7712E91029381029381029',
    holderName: 'Arun Kumar',
    blockNumber: 19028311,
    timestamp: '2025-09-01 18:40:12 UTC',
    gasUsed: '45,120 Gwei',
    status: 'VERIFIED',
    network: 'EVM Polygon Amoy'
  },
  {
    txHash: '0x05df72b423516b249102930491029384',
    credentialId: 'cred-4',
    credentialTitle: 'Figma UI/UX Advanced System Designer',
    issuer: '0x12B34c56D789e01234567890abcdef',
    holderName: 'Marcus Vance',
    blockNumber: 17892011,
    timestamp: '2025-02-18 11:04:45 UTC',
    gasUsed: '39,400 Gwei',
    status: 'VERIFIED',
    network: 'EVM Sepolia Testnet'
  }
];

export const INITIAL_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-1',
    title: '3 Candidates Match E-Commerce Requirement',
    description: 'Arun Kumar is top match (92%). Has 100% verified React & JS credentials on EVM. Figma skill gap detected.',
    type: 'match',
    actionText: 'Review Matches',
    targetTab: 'candidates',
    date: '10m ago'
  },
  {
    id: 'ins-2',
    title: 'Skill Gap Opportunity Identified',
    description: 'Arun Kumar missing verified Figma credential. Starting recommended 5-step learning path can boost match to 98%.',
    type: 'suggestion',
    actionText: 'Open Skill Gap Analyzer',
    targetTab: 'skill-gap',
    date: '30m ago'
  },
  {
    id: 'ins-3',
    title: 'Credential Verification Complete',
    description: 'Meta Certified React Specialist credential hash 0x8f7a... verified on EVM Sepolia Testnet block #18492041.',
    type: 'verification',
    actionText: 'View Blockchain Proof',
    targetTab: 'blockchain',
    date: '1h ago'
  }
];

export const INITIAL_ACTIVITIES: SystemActivity[] = [
  { id: 'act-1', title: 'React credential verified for Arun Kumar on EVM Sepolia', timestamp: '5m ago', type: 'verification', iconType: 'ShieldCheck' },
  { id: 'act-2', title: 'Candidate Arun Kumar matched to E-commerce Project (92%)', timestamp: '15m ago', type: 'match', iconType: 'UserCheck' },
  { id: 'act-3', title: 'AI Workflow generated: "E-Commerce Frontend Developer"', timestamp: '25m ago', type: 'workflow', iconType: 'GitBranch' },
  { id: 'act-4', title: 'Work Credential wc-101 appended to Digital Skill Passport', timestamp: '1h ago', type: 'passport', iconType: 'Award' }
];

export const INITIAL_SKILL_GAP: SkillGap = {
  candidateId: 'cand-1',
  candidateName: 'Arun Kumar',
  projectTitle: 'E-commerce Platform Frontend',
  missingSkills: ['Figma UI/UX'],
  recommendedPath: [
    { id: 1, title: 'Figma Fundamentals & Auto Layout', description: 'Master Figma components, variants, auto layout 3.0, and design tokens.', type: 'Course', completed: true },
    { id: 2, title: 'UI Design Exercise: Commerce Checkout', description: 'Design pixel-perfect shopping cart and modal checkout state.', type: 'Exercise', completed: true },
    { id: 3, title: 'Create Sample React-Figma Interface', description: 'Implement design token mapping in React with Tailwind CSS.', type: 'Project', completed: false },
    { id: 4, title: 'AI Skill & Code Assessment', description: 'Automated evaluation of UI fidelity and accessibility ratio.', type: 'Assessment', completed: false },
    { id: 5, title: 'Credential Minting on EVM', description: 'Verify certificate and issue verifiable skill proof to Passport.', type: 'Credential', completed: false }
  ]
};
