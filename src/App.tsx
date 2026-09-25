import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { AiAssistantDrawer } from './components/layout/AiAssistantDrawer';
import { DemoTour } from './components/demo/DemoTour';
import { motion, AnimatePresence } from 'framer-motion';

import { LandingView } from './components/views/LandingView';
import { DashboardView } from './components/views/DashboardView';
import { AiWorkspaceView } from './components/views/AiWorkspaceView';
import { WorkflowView } from './components/views/WorkflowView';
import { CandidatesView } from './components/views/CandidatesView';
import { SkillGraphView } from './components/views/SkillGraphView';
import { SkillGapView } from './components/views/SkillGapView';
import { CredentialCenterView } from './components/views/CredentialCenterView';
import { BlockchainView } from './components/views/BlockchainView';
import { PassportView } from './components/views/PassportView';
import { ProjectsView } from './components/views/ProjectsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';

const MainLayout: React.FC = () => {
  const { activeTab, accessibility } = useApp();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing': return <LandingView />;
      case 'dashboard': return <DashboardView />;
      case 'ai-workspace': return <AiWorkspaceView />;
      case 'workflows': return <WorkflowView />;
      case 'candidates': return <CandidatesView />;
      case 'skill-graph': return <SkillGraphView />;
      case 'skill-gap': return <SkillGapView />;
      case 'credentials': return <CredentialCenterView />;
      case 'blockchain': return <BlockchainView />;
      case 'skill-passport': return <PassportView />;
      case 'projects': return <ProjectsView />;
      case 'analytics': return <AnalyticsView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  const getFontScaleClass = () => {
    if (accessibility.fontSize === 'large') return 'font-scale-large';
    if (accessibility.fontSize === 'xlarge') return 'font-scale-xlarge';
    return '';
  };

  return (
    <div className={`min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased p-2 md:p-6 flex items-center justify-center relative overflow-hidden ${getFontScaleClass()} ${accessibility.highContrast ? 'high-contrast-mode' : ''}`}>
      {/* Animated Liquid Background Light Orbs for Refraction Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 90, -60, 0],
            y: [0, -100, 60, 0],
            scale: [1, 1.3, 0.85, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/6 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-purple-600/30 via-fuchsia-500/20 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 70, 0],
            y: [0, 90, -80, 0],
            scale: [1, 1.25, 0.9, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/6 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-violet-600/30 via-purple-500/25 to-transparent blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, 70, -80, 0],
            y: [0, 60, -50, 0],
            scale: [1, 1.2, 0.95, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/3 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-400/20 to-transparent blur-[110px]"
        />
      </div>

      {/* Outer Liquid Glass Canvas Container */}
      <div className="w-full max-w-[1600px] min-h-[92vh] idraft-container flex relative z-10 overflow-hidden shadow-2xl backdrop-blur-3xl border border-white/50 dark:border-white/20">
        {/* Persistent Left Sidebar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Content Area */}
        <div className="flex-1 md:pl-64 flex flex-col min-h-screen md:min-h-[92vh] w-full overflow-x-hidden">
          <main className="flex-1 pb-24 px-3 md:px-6 pt-6 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16, scale: 0.985, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, scale: 0.985, filter: 'blur(4px)' }}
                transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
              >
                {renderActiveView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Global AI Assistant Drawer */}
      <AiAssistantDrawer />

      {/* Hackathon Guided Demo Tour Runner */}
      <DemoTour />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
