import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, Search, Filter, Bot, UserCheck, FileText, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { AuditLog } from '../types';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actionFilter, setActionFilter] = useState<string>('');

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await api.getAuditLogs({ action: actionFilter || undefined });
      setLogs(res.logs || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-trust-blue/30 bg-trust-midnight">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-trust-teal px-2 py-0.5 rounded bg-trust-blue/20 border border-trust-teal/30">
            Immutable Regulatory Ledger
          </span>
          <h2 className="text-2xl font-black text-white mt-1">System Audit &amp; Event Trail</h2>
          <p className="text-xs text-slate-400">
            Cryptographically sealed audit records for all user logins, document uploads, AI findings, and officer verdicts
          </p>
        </div>

        <div className="font-mono text-xs text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
          Total Recorded Events: <span className="text-trust-teal font-bold">{total}</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-slate-400" />
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-trust-teal"
        >
          <option value="">All Event Actions</option>
          <option value="USER_LOGIN">User Logins</option>
          <option value="APPLICATION_CREATED">Application Creations</option>
          <option value="APPLICATION_SUBMITTED">Application Submissions</option>
          <option value="AI_VERIFICATION_COMPLETE">AI Verifications</option>
          <option value="OFFICER_DECISION_APPROVED">Officer Approvals</option>
          <option value="OFFICER_DECISION_REJECTED">Officer Rejections</option>
          <option value="OFFICER_DECISION_CLARIFICATION_REQUESTED">Clarification Requests</option>
          <option value="RULE_UPDATED">Rule Configurations</option>
        </select>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-16 text-center text-slate-400 text-xs font-mono">
            Loading immutable audit trail...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Action Event</th>
                  <th className="py-3.5 px-4">Actor</th>
                  <th className="py-3.5 px-4">Associated Dossier</th>
                  <th className="py-3.5 px-4">Audit Narrative &amp; Details</th>
                  <th className="py-3.5 px-4 font-mono">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-trust-blue/15 text-trust-teal border border-trust-teal/30">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans whitespace-nowrap">
                      <p className="text-white font-semibold text-xs">{log.user?.name || 'Automated Daemon'}</p>
                      <p className="text-[10px] text-slate-500">{log.user?.role || 'SYSTEM'}</p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-trust-blue">
                      {log.application?.applicationNumber || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-sans text-slate-300 text-xs max-w-md">
                      {log.details}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
