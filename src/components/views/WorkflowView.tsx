import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { WorkflowNode } from '../../types';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Send, 
  ArrowRight, 
  ChevronRight, 
  Settings
} from 'lucide-react';

export const WorkflowView: React.FC = () => {
  const { 
    workflow, 
    applyAiWorkflowCommand, 
    addWorkflowNode, 
    deleteWorkflowNode, 
    updateWorkflowNodeStatus,
    setActiveTab 
  } = useApp();

  const [aiCommand, setAiCommand] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(workflow.nodes[0] || null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newNodeTitle, setNewNodeTitle] = useState<string>('');
  const [newNodeCategory, setNewNodeCategory] = useState<WorkflowNode['category']>('assessment');

  const handleAiCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiCommand.trim()) return;
    applyAiWorkflowCommand(aiCommand);
    setAiCommand('');
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeTitle.trim()) return;
    addWorkflowNode(newNodeTitle, newNodeCategory);
    setNewNodeTitle('');
    setShowAddModal(false);
  };

  const getNodeStatusBadge = (status: WorkflowNode['status']) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono uppercase flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> Completed</span>;
      case 'running':
        return <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[9px] font-mono uppercase flex items-center gap-1 animate-pulse"><Clock className="w-2.5 h-2.5" /> Running</span>;
      case 'failed':
        return <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-mono uppercase flex items-center gap-1"><AlertTriangle className="w-2.5 h-2.5" /> Failed</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[9px] font-mono uppercase">Waiting</span>;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 idraft-card-white p-6 md:p-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#18181B] text-white font-extrabold">
              Visual AI Canvas
            </span>
            <span className="text-xs text-slate-600 font-bold font-mono">Workflow ID: {workflow.id}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#18181B] dark:text-white tracking-tight mt-1">{workflow.title}</h2>
          <p className="text-xs text-slate-600 font-bold mt-0.5">Role: {workflow.role} • Duration: {workflow.duration}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#18181B] font-extrabold text-xs flex items-center gap-1.5 transition-colors border border-slate-200"
          >
            <Plus className="w-4 h-4 text-[#18181B]" />
            <span>Add Node</span>
          </button>

          <button
            onClick={() => setActiveTab('candidates')}
            className="px-5 py-2.5 rounded-full bg-[#18181B] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-slate-800 transition-all"
          >
            <span>Match Candidates</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* AI Canvas Command Bar */}
      <div className="idraft-card-white p-4">
        <form onSubmit={handleAiCommandSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 text-[#18181B] font-extrabold text-xs shrink-0">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span>AI Canvas Command:</span>
          </div>

          <input
            type="text"
            value={aiCommand}
            onChange={(e) => setAiCommand(e.target.value)}
            placeholder="e.g. Add a technical interview before manager approval..."
            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#18181B]"
          />

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setAiCommand('Add a technical interview step');
                applyAiWorkflowCommand('Add a technical interview step');
              }}
              className="text-[10px] px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#18181B] font-mono font-extrabold border border-slate-200"
            >
              + Quick Interview Step
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#18181B] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Update Flow</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Main Canvas + Configuration Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Visual Canvas (2 cols) */}
        <div className="lg:col-span-2 idraft-card-white p-6 space-y-4 max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold text-[#18181B] dark:text-white uppercase tracking-wider">Pipeline Node Hierarchy</span>
            <span className="text-[10px] font-mono text-slate-500 font-bold">{workflow.nodes.length} Connected Nodes</span>
          </div>

          <div className="space-y-3 relative">
            {workflow.nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div key={node.id} className="relative group">
                  {/* Connector Line */}
                  {index < workflow.nodes.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200 group-hover:bg-[#18181B] z-0" />
                  )}

                  <div
                    onClick={() => setSelectedNode(node)}
                    className={`
                      relative z-10 p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-md
                      ${isSelected 
                        ? 'bg-[#18181B] text-white border-2 border-cyan-400 shadow-xl' 
                        : 'bg-[#18181B] text-white border-slate-900 hover:border-slate-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`
                        w-9 h-9 rounded-xl flex items-center justify-center font-mono font-extrabold text-xs shrink-0
                        ${node.status === 'completed' ? 'bg-emerald-500 text-white' :
                          node.status === 'running' ? 'bg-cyan-500 text-slate-950 font-extrabold animate-pulse' :
                          'bg-[#000000] text-slate-300 border border-slate-800'}
                      `}>
                        Step {node.stepNumber}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-extrabold text-white">{node.title}</h4>
                          {getNodeStatusBadge(node.status)}
                        </div>
                        <p className="text-xs text-slate-300 font-medium mt-0.5 line-clamp-1">{node.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWorkflowNode(node.id);
                        }}
                        className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete Node"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-500'}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Configuration Panel */}
        <div className="idraft-card-white p-6 space-y-4">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#18181B]" />
                  <h3 className="text-sm font-extrabold text-[#18181B] dark:text-white">Node Config Inspector</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-600 font-extrabold">Step #{selectedNode.stepNumber}</span>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#18181B] font-extrabold uppercase block">Node Title</label>
                <input
                  type="text"
                  value={selectedNode.title}
                  readOnly
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-extrabold text-[#18181B]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#18181B] font-extrabold uppercase block">Category</label>
                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-mono text-xs font-extrabold border border-purple-200 uppercase">
                  {selectedNode.category}
                </span>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#18181B] font-extrabold uppercase block mb-1">Execution Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['completed', 'running', 'waiting', 'failed'] as WorkflowNode['status'][]).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateWorkflowNodeStatus(selectedNode.id, st)}
                      className={`
                        p-2.5 rounded-2xl text-xs font-mono uppercase text-center border font-extrabold transition-all
                        ${selectedNode.status === st 
                          ? 'bg-[#18181B] text-white border-[#18181B] shadow-md' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}
                      `}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#18181B] font-extrabold uppercase block">Description</label>
                <p className="mt-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 font-medium leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {selectedNode.assignee && (
                <div>
                  <label className="text-[10px] font-mono text-[#18181B] font-extrabold uppercase block">Assignee</label>
                  <p className="mt-1 text-xs text-[#18181B] font-extrabold">{selectedNode.assignee}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs font-medium">
              Select a workflow node on the canvas to inspect or edit configuration.
            </div>
          )}
        </div>
      </div>

      {/* Modal for Manual Add Node */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1422] border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add Workflow Canvas Node</h3>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Node Title</label>
                <input
                  type="text"
                  value={newNodeTitle}
                  onChange={(e) => setNewNodeTitle(e.target.value)}
                  placeholder="e.g. Peer Code Review"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Node Category</label>
                <select
                  value={newNodeCategory}
                  onChange={(e) => setNewNodeCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="assessment">Technical Assessment</option>
                  <option value="approval">Manager Approval</option>
                  <option value="onboarding">Onboarding</option>
                  <option value="credential">Work Credential</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Create Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
