import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, X, Send, Sparkles } from 'lucide-react';

export const AiAssistantDrawer: React.FC = () => {
  const { 
    isAssistantOpen, 
    setIsAssistantOpen, 
    setActiveTab, 
    applyAiWorkflowCommand 
  } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'assistant'; text: string; timestamp: string }[]>([
    {
      sender: 'assistant',
      text: 'Hello Arun! I am your SkillFlow AI Assistant. I can help you search verified candidates, analyze skill gaps, modify workflows, or inspect EVM blockchain credentials. How can I assist your workforce today?',
      timestamp: 'Just now'
    }
  ]);

  if (!isAssistantOpen) return null;

  const quickPrompts = [
    { label: 'Show candidates with verified React skills', action: () => { setActiveTab('candidates'); addAssistantReply('Navigated to Candidates view. Showing candidates with verified Meta & OpenJS React credentials.'); } },
    { label: 'Which credentials are pending verification?', action: () => { setActiveTab('credentials'); addAssistantReply('Navigated to Credential Verification Center. 1 credential is currently pending issuer verification.'); } },
    { label: 'Add a technical interview step', action: () => { applyAiWorkflowCommand('Add a technical interview step'); setActiveTab('workflows'); addAssistantReply('Added a Technical Assessment Node into the E-commerce Workflow before Manager Approval.'); } },
    { label: 'What skills are missing for E-commerce project?', action: () => { setActiveTab('skill-gap'); addAssistantReply('Navigated to Skill Gap Analyzer. Candidate Arun Kumar is missing a verified Figma UI/UX credential. A 5-step learning path is available.'); } },
    { label: 'Show my verified work history', action: () => { setActiveTab('skill-passport'); addAssistantReply('Opening Digital Skill Passport for Arun Kumar. Displaying 2 verified work credentials on Polygon & Sepolia.'); } }
  ];

  const addAssistantReply = (replyText: string) => {
    setMessages(prev => [
      ...prev,
      { sender: 'assistant', text: replyText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    setInputMessage('');
    
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setTimeout(() => {
      if (userText.toLowerCase().includes('candidate') || userText.toLowerCase().includes('react')) {
        setActiveTab('candidates');
        addAssistantReply('I searched the candidate database and found 3 matches. Arun Kumar matches 92% based on on-chain React credentials.');
      } else if (userText.toLowerCase().includes('workflow') || userText.toLowerCase().includes('step') || userText.toLowerCase().includes('interview')) {
        applyAiWorkflowCommand(userText);
        setActiveTab('workflows');
        addAssistantReply('Workflow updated! Adjusted node dependencies and refreshed execution pipeline.');
      } else if (userText.toLowerCase().includes('passport') || userText.toLowerCase().includes('history')) {
        setActiveTab('skill-passport');
        addAssistantReply('Digital Skill Passport loaded with QR proof verification.');
      } else {
        addAssistantReply(`AI processed request: "${userText}". All candidate skill vectors, workflow dependencies, and blockchain proofs have been updated.`);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-l-2 border-black dark:border-white flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 text-black dark:text-white">
        {/* Header */}
        <div className="p-4 border-b-2 border-black dark:border-zinc-700 flex items-center justify-between bg-zinc-100 dark:bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-black dark:text-white flex items-center gap-1.5">
                SkillFlow AI Assistant
                <span className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white"></span>
              </h3>
              <p className="text-xs font-mono font-black text-zinc-800 dark:text-zinc-200">Context-Aware AI Workforce Agent</p>
            </div>
          </div>
          <button
            onClick={() => setIsAssistantOpen(false)}
            className="p-1.5 rounded-lg text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}
              <div className={`
                max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed font-extrabold border-2
                ${msg.sender === 'user' 
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white rounded-br-none shadow-md' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border-black dark:border-zinc-600 rounded-bl-none shadow-sm'
                }
              `}>
                <p>{msg.text}</p>
                <span className="text-[10px] font-mono font-black mt-1 block text-right opacity-80">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {/* Quick Command Suggestions */}
          <div className="pt-3 border-t-2 border-black dark:border-zinc-700">
            <p className="text-xs font-black uppercase tracking-wider mb-2 text-black dark:text-white">Suggested Actions</p>
            <div className="space-y-1.5">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={qp.action}
                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-zinc-600 text-left text-xs font-black transition-colors flex items-center justify-between group shadow-sm"
                >
                  <span>{qp.label}</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Footer */}
        <div className="p-3 border-t-2 border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask AI or give command..."
              className="flex-1 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-black text-black dark:text-white placeholder:text-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

