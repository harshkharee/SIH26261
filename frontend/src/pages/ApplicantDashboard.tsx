import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  PlusCircle,
  Building2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Application } from '../types';
import { ApplicationWizardModal } from '../components/applicant/ApplicationWizardModal';

export const ApplicantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showWizard, setShowWizard] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const fetchApps = async () => {
    setIsLoading(true);
    try {
      const res = await api.getApplications({
        search: search || undefined,
        status: statusFilter !== 'ALL' ? statusFilter : undefined
      });
      setApplications(res.applications || []);
    } catch (err) {
      console.error('Failed to load applicant applications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [search, statusFilter]);

  const approvedCount = applications.filter((a) => a.status === 'APPROVED').length;
  const pendingCount = applications.filter((a) => ['SUBMITTED', 'PROCESSING', 'UNDER_REVIEW'].includes(a.status)).length;
  const actionCount = applications.filter((a) => ['NEEDS_ATTENTION', 'CLARIFICATION_REQUESTED'].includes(a.status)).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Top Welcome Card */}
      <div className="p-6 rounded-2xl glass-panel border border-trust-blue/30 bg-gradient-to-r from-trust-midnight via-slate-900 to-trust-midnight shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-trust-teal px-2 py-0.5 rounded bg-trust-blue/20 border border-trust-teal/30">
              Institutional Applicant Portal
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">{user?.name}</h2>
          <p className="text-xs text-slate-300 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-trust-teal" />
            <span>{user?.institution?.name || 'Apex Institute of Technology'}</span>
            <span className="text-slate-500">•</span>
            <span className="font-mono text-slate-400">Code: {user?.institution?.code || 'INST-APEX-01'}</span>
          </p>
        </div>

        <button
          onClick={() => setShowWizard(true)}
          className="px-5 py-2.5 rounded-xl bg-trust-blue hover:bg-blue-600 text-white font-bold text-xs transition shadow-lg shadow-blue-500/20 flex items-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Initialize New Application
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Total Submissions</span>
          <p className="text-2xl font-mono font-bold text-white mt-1">{applications.length}</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-blue-500/30">
          <span className="text-xs text-blue-400 font-semibold">In Progress / Scrutiny</span>
          <p className="text-2xl font-mono font-bold text-blue-400 mt-1">{pendingCount}</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-emerald-500/30">
          <span className="text-xs text-emerald-400 font-semibold">Approved by Regulator</span>
          <p className="text-2xl font-mono font-bold text-emerald-400 mt-1">{approvedCount}</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-amber-500/30">
          <span className="text-xs text-amber-400 font-semibold">Clarifications Required</span>
          <p className="text-2xl font-mono font-bold text-amber-400 mt-1">{actionCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID or program..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-trust-teal"
          >
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="NEEDS_ATTENTION">Needs Attention</option>
            <option value="CLARIFICATION_REQUESTED">Clarification Requested</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-xs font-mono">
            Loading institutional dossier inventory...
          </div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center glass-panel rounded-2xl border border-slate-800 space-y-3">
            <FileText className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-sm font-bold text-white">No applications match your filter</h4>
            <p className="text-xs text-slate-400">Initialize a new application or clear filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => {
              const scoreColor = app.overallTrustScore >= 85 ? 'text-emerald-400' : app.overallTrustScore >= 60 ? 'text-amber-400' : 'text-rose-400';
              const flags = app.anomalyFlags || [];

              return (
                <div
                  key={app.id}
                  onClick={() => navigate(`/applications/${app.applicationNumber}`)}
                  className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-trust-teal/40 cursor-pointer transition glass-panel-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-trust-teal">
                          {app.applicationNumber}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-0.5">
                          {app.programCategory}
                        </h4>
                        <p className="text-[11px] text-slate-400">Intake Year: {app.academicYear}</p>
                      </div>

                      <div className="text-right">
                        <span className={`font-mono text-base font-black ${scoreColor}`}>
                          {app.overallTrustScore}%
                        </span>
                        <p className="text-[9px] text-slate-400 uppercase">AI Trust</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[10px]">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                        {app.status.replace(/_/g, ' ')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        {app.documents.length} Clearance Docs
                      </span>
                      {flags.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 font-semibold">
                          <ShieldAlert className="w-2.5 h-2.5" />
                          {flags.length} Flags
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {app.aiSummary || 'Dossier initialized. Review clearance attachments.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      {app.submittedAt ? `Submitted ${new Date(app.submittedAt).toLocaleDateString()}` : 'Draft Mode'}
                    </span>
                    <span className="text-trust-blue font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Dossier <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Creation Wizard Modal */}
      <ApplicationWizardModal
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onSuccess={(newApp) => {
          fetchApps();
          navigate(`/applications/${newApp.applicationNumber}`);
        }}
        institutionId={user?.institutionId}
      />
    </div>
  );
};
