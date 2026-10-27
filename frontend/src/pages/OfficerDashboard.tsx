import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  UserCheck,
  Search,
  Filter,
  Layers,
  FileText,
  Activity,
  Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Application, ApplicationStatus } from '../types';
import { KanbanQueue } from '../components/interactions/KanbanQueue';

export const OfficerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const fetchApps = async () => {
    setIsLoading(true);
    try {
      const res = await api.getApplications({
        search: search || undefined,
        risk: riskFilter !== 'ALL' ? riskFilter : undefined,
        programCategory: categoryFilter !== 'ALL' ? categoryFilter : undefined
      });
      setApplications(res.applications || []);
    } catch (err) {
      console.error('Failed to load officer applications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [search, riskFilter, categoryFilter]);

  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    // Optimistic UI update
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
  };

  const highRiskCount = applications.filter((a) => a.overallTrustScore <= 60 && a.status !== 'DRAFT').length;
  const mediumRiskCount = applications.filter((a) => a.overallTrustScore > 60 && a.overallTrustScore <= 85).length;
  const lowRiskCount = applications.filter((a) => a.overallTrustScore > 85).length;
  const underReviewCount = applications.filter((a) => a.status === 'UNDER_REVIEW').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Officer Header Card */}
      <div className="p-6 rounded-2xl glass-panel border border-trust-blue/30 bg-gradient-to-r from-trust-midnight via-slate-900 to-trust-midnight shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-trust-teal px-2 py-0.5 rounded bg-trust-blue/20 border border-trust-teal/30">
              Regulatory Verification Bureau
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Autonomous Scrutiny Queue</span>
          </div>
          <h2 className="text-2xl font-black text-white">{user?.name}</h2>
          <p className="text-xs text-slate-300">
            {user?.designation || 'Senior Verification Officer • AICTE National Accreditation Scrutiny Cell'}
          </p>
        </div>

        {/* Live Scrutiny Ticker */}
        <div className="flex items-center gap-4 bg-slate-950/70 px-4 py-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="font-mono text-xl font-black text-white">{underReviewCount}</span>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Active Queue</p>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <span className="font-mono text-xl font-black text-rose-400">{highRiskCount}</span>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">High Risk Flags</p>
          </div>
        </div>
      </div>

      {/* Risk Heatmap Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400" />
            AI Risk Stratification &amp; Anomaly Heatmap
          </span>
          <span className="text-xs text-slate-400">Click a risk tier to filter queue</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* High Risk Tier */}
          <div
            onClick={() => setRiskFilter(riskFilter === 'HIGH' ? 'ALL' : 'HIGH')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              riskFilter === 'HIGH'
                ? 'bg-rose-950/50 border-rose-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                : 'glass-panel border-rose-500/30 hover:border-rose-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                High Risk (&le;60% Trust)
              </span>
              <span className="font-mono text-xl font-black text-rose-400">{highRiskCount}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Contains image tampering (ELA), cross-application duplicate certificates, or major bylaws non-compliance.
            </p>
          </div>

          {/* Medium Risk Tier */}
          <div
            onClick={() => setRiskFilter(riskFilter === 'MEDIUM' ? 'ALL' : 'MEDIUM')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              riskFilter === 'MEDIUM'
                ? 'bg-amber-950/50 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                : 'glass-panel border-amber-500/30 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Moderate Risk (61-85% Trust)
              </span>
              <span className="font-mono text-xl font-black text-amber-400">{mediumRiskCount}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Minor entity name discrepancies, near-expiry certificates, or missing non-critical clearances.
            </p>
          </div>

          {/* Low Risk Tier */}
          <div
            onClick={() => setRiskFilter(riskFilter === 'LOW' ? 'ALL' : 'LOW')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              riskFilter === 'LOW'
                ? 'bg-emerald-950/50 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                : 'glass-panel border-emerald-500/30 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Low Risk (&gt;85% Trust)
              </span>
              <span className="font-mono text-xl font-black text-emerald-400">{lowRiskCount}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Full cryptographic QR registry authentication, active validity, 100% regulatory rules pass.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search application # or college name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-trust-teal"
          >
            <option value="ALL">All Categories</option>
            <option value="ENGINEERING">Engineering</option>
            <option value="MANAGEMENT">Management</option>
            <option value="PHARMACY">Pharmacy</option>
            <option value="ARCHITECTURE">Architecture</option>
          </select>

          {riskFilter !== 'ALL' && (
            <button
              onClick={() => setRiskFilter('ALL')}
              className="text-xs px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              Clear Risk Filter ({riskFilter})
            </button>
          )}
        </div>
      </div>

      {/* KANBAN / TABLE TOGGLE QUEUE */}
      {isLoading ? (
        <div className="p-16 text-center text-slate-400 text-xs font-mono">
          Loading regulatory scrutiny queue...
        </div>
      ) : (
        <KanbanQueue
          applications={applications}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};
