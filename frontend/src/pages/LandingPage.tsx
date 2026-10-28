import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Cpu,
  FileCheck2,
  Lock,
  ArrowRight,
  Sparkles,
  BarChart2,
  FileText,
  UserCheck,
  Layers,
  Scale,
  CheckCircle,
  Eye,
  CheckCircle2,
  Fingerprint,
  FileSearch,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();
  const [stats, setStats] = useState({
    total: 12,
    passRate: '92%',
    turnaround: '2.4 days',
    trustIndex: '94.8'
  });

  useEffect(() => {
    api.getAnalytics()
      .then((res) => {
        if (res.metrics) {
          setStats({
            total: res.metrics.totalApplications || 12,
            passRate: res.metrics.approvalRate || '92%',
            turnaround: res.metrics.avgProcessingTime || '2.4 days',
            trustIndex: '94.8'
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleQuickDemo = async (role: 'APPLICANT' | 'OFFICER' | 'ADMIN') => {
    await demoLogin(role);
    if (role === 'APPLICANT') navigate('/applicant');
    else if (role === 'OFFICER') navigate('/officer');
    else navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white overflow-hidden font-sans">
      {/* Hero Section with Velvet Aurora Mesh Glow */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto aurora-bg">
        {/* Subtle Ambient background orbs */}
        <div className="absolute top-12 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Heading, Tagline & Role-Based CTAs */}
          <motion.div
            className="lg:col-span-7 space-y-7 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-indigo-300 text-xs font-semibold shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>SIH26261 Autonomous Regulatory Compliance Suite</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              From Documents to Decisions,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300">
                Powered by AI, Built for Trust.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Automated institutional application validation, forensic document authentication, cryptographic registry verification, and explainable compliance decisioning.
            </p>

            {/* Core Principle Callout */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 flex items-center gap-3.5 max-w-xl backdrop-blur-md shadow-sm">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 flex-shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <span className="leading-relaxed">
                <strong className="text-white font-semibold">Core Regulatory Mandate:</strong> AI provides explainable evidence, not verdicts. Final determination always rests with authorized regulatory officers.
              </span>
            </div>

            {/* Role-Based One-Click Demo CTAs */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                ⚡ Instant One-Click Role Portals:
              </span>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleQuickDemo('APPLICANT')}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 cursor-pointer ring-1 ring-white/15"
                >
                  <FileText className="w-4 h-4" />
                  Applicant Portal
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleQuickDemo('OFFICER')}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white font-bold text-xs transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2 cursor-pointer ring-1 ring-white/15"
                >
                  <UserCheck className="w-4 h-4 text-white" />
                  Verification Officer Desk
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleQuickDemo('ADMIN')}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-xs border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Scale className="w-4 h-4 text-emerald-400" />
                  Admin Analytics
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Signature Holographic Certificate Scanning Replica */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative w-full max-w-sm rounded-3xl p-6 bg-[#111827]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Animated Laser Scanning Line */}
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06B6D4] z-20"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Document Certificate Replica */}
              <div className="bg-[#FAFBFD] text-slate-900 rounded-2xl p-5 shadow-inner border border-slate-200 relative select-none">
                {/* Header emblem */}
                <div className="text-center pb-3 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-indigo-400 flex items-center justify-center mx-auto mb-1">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-800 block">
                    GOVERNMENT STATUTORY CLEARANCE
                  </span>
                  <p className="text-[9px] text-slate-500 font-medium">Directorate of Regulatory Scrutiny</p>
                </div>

                <div className="py-3 space-y-2 text-left">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">CERTIFICATE NO:</span>
                    <span className="font-bold text-slate-900">FIRE-NOC-2024-9981</span>
                  </div>
                  <div className="text-[10px] font-mono">
                    <span className="text-slate-500">INSTITUTION:</span>
                    <p className="font-bold text-slate-900 text-xs mt-0.5">Apex Institute of Technology</p>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">STATUS:</span>
                    <span className="font-bold text-emerald-600">Active &amp; Compliant</span>
                  </div>
                </div>

                {/* Scanned Verified Stamp Animation */}
                <motion.div
                  className="mt-2 py-2 px-3 rounded-xl border border-emerald-600/40 bg-emerald-50 text-emerald-800 flex items-center justify-center gap-2"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: [0.95, 1.02, 1], opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    AUTHENTICITY VERIFIED
                  </span>
                </motion.div>

                {/* Footer QR Hash */}
                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] font-mono text-slate-500">
                  <span>SHA-256: 9a8b7c6d5e...</span>
                  <span className="text-indigo-600 font-bold">REGISTRY OK</span>
                </div>
              </div>

              {/* Bottom Telemetry Ticker */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  Neural OCR Live
                </span>
                <span>Latency: 42ms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Operational Counters Strip */}
      <section className="py-12 border-y border-white/[0.08] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-[#111827]/80 border border-white/[0.06]">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white">{stats.total}</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Applications Processed</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#111827]/80 border border-white/[0.06]">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-indigo-400">{stats.turnaround}</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Avg. Turnaround Time</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#111827]/80 border border-white/[0.06]">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-400">{stats.passRate}</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Regulatory Pass Rate</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#111827]/80 border border-white/[0.06]">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-cyan-400">{stats.trustIndex}%</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">AI Confidence Index</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            Automated Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            End-to-End Regulatory Verification Pipeline
          </h2>
          <p className="text-sm text-slate-400 mt-2.5">
            Eliminating procedural backlogs through transparent multi-model AI scrutiny while preserving officer sovereignty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-7 rounded-3xl bg-[#111827]/80 border border-white/[0.08] hover:border-indigo-500/30 transition-all space-y-4 hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center font-mono font-bold text-lg border border-indigo-500/25">
              01
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Multi-Format Intake &amp; Hashing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Institutions upload statutory clearance certificates (Fire NOC, Land Deed, Building Blueprint). The platform generates immutable cryptographic SHA-256 hashes and conducts instant duplicate detection.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-7 rounded-3xl bg-[#111827]/80 border border-white/[0.08] hover:border-violet-500/30 transition-all space-y-4 hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/15 text-violet-400 flex items-center justify-center font-mono font-bold text-lg border border-violet-500/25">
              02
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Autonomous Multi-Engine AI Scrutiny</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Neural OCR extracts coordinates, ELA (Error Level Analysis) detects image tampering and pixel alteration, cross-document engine flags entity mismatches, and dynamic rules evaluate regulatory bylaws.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-7 rounded-3xl bg-[#111827]/80 border border-white/[0.08] hover:border-emerald-500/30 transition-all space-y-4 hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-mono font-bold text-lg border border-emerald-500/25">
              03
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Officer Adjudication &amp; Audit Trail</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verification officers examine side-by-side evidence with bounding boxes, inspect explainability vectors, and record statutory determination (Approve / Reject / Clarify) backed by an immutable audit trail.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
