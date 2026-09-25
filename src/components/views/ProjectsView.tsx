import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Task } from '../../types';
import { 
  Plus, 
  Sparkles, 
  Award, 
  ChevronRight
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { 
    selectedProject, 
    completeProjectAndMintCredential, 
    addTaskToProject, 
    updateTaskStatus,
    setActiveTab 
  } = useApp();

  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTaskToProject(selectedProject.id, newTaskTitle);
    setNewTaskTitle('');
  };

  const columns: { id: Task['status']; label: string; color: string }[] = [
    { id: 'backlog', label: 'Backlog', color: 'border-slate-800 text-slate-400' },
    { id: 'in_progress', label: 'In Progress', color: 'border-cyan-500/40 text-cyan-400' },
    { id: 'review', label: 'Review', color: 'border-purple-500/40 text-purple-300' },
    { id: 'completed', label: 'Completed', color: 'border-emerald-500/40 text-emerald-400' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 idraft-card-white p-6 md:p-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#18181B] text-white font-extrabold">
              Project Management Workspace
            </span>
            <span className="text-xs text-slate-600 font-bold">Client: {selectedProject.client}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#18181B] dark:text-white tracking-tight mt-1">{selectedProject.title}</h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Assigned Candidate: <span className="text-[#18181B] font-extrabold">{selectedProject.assignedCandidateName}</span> • Duration: {selectedProject.duration}
          </p>
        </div>

        {/* Complete Project & Mint Credential CTA */}
        <button
          onClick={() => {
            completeProjectAndMintCredential(selectedProject.id);
            setActiveTab('skill-passport');
          }}
          className="px-5 py-3 rounded-full bg-[#18181B] text-white font-extrabold text-xs flex items-center gap-2 shadow-md hover:bg-slate-800 transition-all"
        >
          <Award className="w-4 h-4 text-white" />
          <span>Complete Project & Mint Work Credential</span>
        </button>
      </div>

      {/* Required Skills & Quick Task Generator Input */}
      <div className="idraft-card-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#18181B] font-extrabold text-xs shrink-0">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <span>AI Task Generator:</span>
        </div>

        <form onSubmit={handleAddTask} className="flex-1 w-full flex items-center gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="e.g. Build Product Details Cart Modal in React..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#18181B]"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-[#18181B] text-white font-extrabold text-xs flex items-center gap-1.5 shrink-0 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </form>
      </div>

      {/* Kanban Task Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = selectedProject.tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="idraft-card-white p-4 space-y-3 min-h-[400px]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-extrabold text-[#18181B] uppercase font-mono">{col.label}</span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#18181B] text-white font-extrabold">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {colTasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-2xl bg-[#18181B] text-white border border-slate-900 space-y-2.5 text-xs shadow-sm">
                    <div className="flex items-start justify-between">
                      <h4 className="font-extrabold text-white">{task.title}</h4>
                      <span className={`
                        text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase
                        ${task.priority === 'high' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300'}
                      `}>
                        {task.priority}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                      <span>{task.assigneeName || 'Arun Kumar'}</span>

                      {/* Status Change Buttons */}
                      <div className="flex items-center gap-1">
                        {col.id !== 'completed' && (
                          <button
                            onClick={() => updateTaskStatus(selectedProject.id, task.id, col.id === 'backlog' ? 'in_progress' : col.id === 'in_progress' ? 'review' : 'completed')}
                            className="p-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white transition-colors"
                            title="Advance Task"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
