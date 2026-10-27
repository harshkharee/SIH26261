import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Application, ApplicationStatus } from '../../types';
import { LayoutGrid, List, ShieldAlert, ArrowRight, Clock, FileText, CheckCircle2, XCircle, AlertCircle, Eye, Sparkles } from 'lucide-react';

interface KanbanQueueProps {
  applications: Application[];
  onStatusChange?: (appId: string, newStatus: ApplicationStatus) => void;
}

const COLUMNS: { id: ApplicationStatus; title: string; color: string; badge: string }[] = [
  { id: 'SUBMITTED', title: 'Pending Triage', color: 'border-blue-500/40', badge: 'bg-blue-500/15 text-blue-400' },
  { id: 'NEEDS_ATTENTION', title: 'High Risk / Flagged', color: 'border-rose-500/50', badge: 'bg-rose-500/15 text-rose-400' },
  { id: 'UNDER_REVIEW', title: 'Active Scrutiny', color: 'border-amber-500/40', badge: 'bg-amber-500/15 text-amber-400' },
  { id: 'CLARIFICATION_REQUESTED', title: 'Clarification Pending', color: 'border-indigo-500/40', badge: 'bg-indigo-500/15 text-indigo-400' },
  { id: 'APPROVED', title: 'Officially Approved', color: 'border-emerald-500/40', badge: 'bg-emerald-500/15 text-emerald-400' },
  { id: 'REJECTED', title: 'Rejected / Ineligible', color: 'border-slate-700', badge: 'bg-slate-700/40 text-slate-400' }
];

export const KanbanQueue: React.FC<KanbanQueueProps> = ({ applications, onStatusChange }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'KANBAN' | 'TABLE'>('KANBAN');
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedAppId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: ApplicationStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedAppId;
    if (id && onStatusChange) {
      onStatusChange(id, targetStatus);
    }
    setDraggedAppId(null);
  };

  return (
    <div className="space-y-4">
      {/* Top View Switcher Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('KANBAN')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'KANBAN'
                ? 'bg-trust-blue text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Kanban Board
          </button>
          <button
            onClick={() => setViewMode('TABLE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'TABLE'
                ? 'bg-trust-blue text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Table View
          </button>
        </div>

        <span className="text-xs text-slate-400">
          Showing <span className="text-white font-bold">{applications.length}</span> institutional applications
        </span>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'KANBAN' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => {
            const colApps = applications.filter((a) => a.status === col.id);

            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
                className={`flex flex-col rounded-2xl bg-slate-950/60 border ${col.color} p-3 min-w-[270px] min-h-[500px] shadow-lg`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-white tracking-wide">{col.title}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${col.badge}`}>
                    {colApps.length}
                  </span>
                </div>

                {/* Column Cards Drop Area */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colApps.length === 0 ? (
                    <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-800/60 rounded-xl text-slate-600 text-xs font-medium">
                      Drop cards here
                    </div>
                  ) : (
                    colApps.map((app) => {
                      const hasFlags = app.anomalyFlags && app.anomalyFlags.length > 0;
                      const scoreColor = app.overallTrustScore >= 85 ? 'text-emerald-400' : app.overallTrustScore >= 60 ? 'text-amber-400' : 'text-rose-400';

                      return (
                        <div
                          key={app.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, app.id)}
                          onClick={() => navigate(`/applications/${app.applicationNumber}`)}
                          className="glass-panel p-3.5 rounded-xl border border-slate-800 hover:border-trust-teal/40 cursor-grab active:cursor-grabbing hover:shadow-[0_4px_20px_-2px_rgba(0,240,255,0.15)] transition duration-200 group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <span className="font-mono text-xs font-bold text-trust-teal group-hover:underline">
                                {app.applicationNumber}
                              </span>
                              <h5 className="text-xs font-semibold text-white line-clamp-1 mt-0.5">
                                {app.institution.name}
                              </h5>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className={`font-mono text-sm font-black ${scoreColor}`}>
                                {app.overallTrustScore}%
                              </span>
                              <p className="text-[9px] text-slate-400 uppercase">Trust</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 mb-2.5 text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                              {app.programCategory}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                              {app.documents.length} docs
                            </span>
                            {hasFlags && (
                              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                                <ShieldAlert className="w-2.5 h-2.5" />
                                {app.anomalyFlags.length} flags
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                            <span className="text-[10px] truncate max-w-[140px] text-slate-500">
                              {app.institution.state}
                            </span>
                            <span className="text-trust-blue group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold text-[11px]">
                              Review <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'TABLE' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Institution Name</th>
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Trust Score</th>
                  <th className="py-3 px-4">Integrity Flags</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {applications.map((app) => {
                  const scoreColor = app.overallTrustScore >= 85 ? 'text-emerald-400' : app.overallTrustScore >= 60 ? 'text-amber-400' : 'text-rose-400';
                  const flags = app.anomalyFlags || [];

                  return (
                    <tr
                      key={app.id}
                      onClick={() => navigate(`/applications/${app.applicationNumber}`)}
                      className="hover:bg-slate-800/40 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-trust-teal">
                        {app.applicationNumber}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-white max-w-[220px] truncate">
                        {app.institution.name}
                        <span className="block text-[10px] text-slate-400">{app.institution.state}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {app.programCategory}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-sm">
                        <span className={scoreColor}>{app.overallTrustScore}/100</span>
                      </td>
                      <td className="py-3.5 px-4">
                        {flags.length > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            <ShieldAlert className="w-3 h-3" />
                            {flags.length} Anomaly Flag{flags.length > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                          {app.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/applications/${app.applicationNumber}`);
                          }}
                          className="px-3 py-1 rounded-lg bg-trust-blue/20 hover:bg-trust-blue text-trust-blue hover:text-white transition font-medium text-xs inline-flex items-center gap-1.5"
                        >
                          <Eye className="w-3 h-3" />
                          View Dossier
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
