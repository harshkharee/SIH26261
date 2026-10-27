import React, { useState, useEffect } from 'react';
import { Scale, Plus, Edit2, ToggleLeft, ToggleRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { ComplianceRule } from '../types';
import { RuleEditorModal } from '../components/admin/RuleEditorModal';

export const RulesManagementPage: React.FC = () => {
  const [rules, setRules] = useState<ComplianceRule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(null);
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const fetchRules = async () => {
    setIsLoading(true);
    try {
      const res = await api.getRules();
      setRules(res.rules || []);
    } catch (err) {
      console.error('Failed to load rules:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleToggle = async (id: string) => {
    try {
      await api.toggleRule(id);
      setRules((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
      );
    } catch (err) {
      console.error('Toggle rule error:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-trust-blue/30 bg-trust-midnight">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-trust-teal px-2 py-0.5 rounded bg-trust-blue/20 border border-trust-teal/30">
            Compliance Engine Governance
          </span>
          <h2 className="text-2xl font-black text-white mt-1">Regulatory Rules Catalog</h2>
          <p className="text-xs text-slate-400">
            Configure dynamic statutory criteria, validity thresholds, and mandatory clearance mandates
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedRule(null);
            setShowEditor(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-trust-blue hover:bg-blue-600 text-white font-bold text-xs transition shadow-lg shadow-blue-500/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create New Regulatory Rule
        </button>
      </div>

      {/* Rules Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-16 text-center text-slate-400 text-xs font-mono">
            Loading compliance rules catalog...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Rule Code</th>
                  <th className="py-3.5 px-4">Title &amp; Statutory Description</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Severity</th>
                  <th className="py-3.5 px-4">Engine Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rules.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4 font-mono font-bold text-trust-teal whitespace-nowrap">
                      {r.code}
                    </td>
                    <td className="py-4 px-4 max-w-sm">
                      <p className="font-bold text-white text-xs">{r.title}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{r.description}</p>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {r.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        r.severity === 'CRITICAL'
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggle(r.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                          r.isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {r.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {r.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedRule(r);
                          setShowEditor(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="Edit Rule"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <RuleEditorModal
        isOpen={showEditor}
        rule={selectedRule}
        onClose={() => setShowEditor(false)}
        onSuccess={() => fetchRules()}
      />
    </div>
  );
};
