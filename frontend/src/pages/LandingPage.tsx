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
  Scale
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
    <div className="min-h-screen bg-[#070D1E] text-white overflow-hidden">
      {/* Hero Section with Aurora Glow & Animated Scanning Document */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto aurora-bg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Tagline & Role-Based CTAs */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-trust-blue/15 border border-trust-teal/30 text-trust-teal text-xs font-semibold shadow-glow-teal">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>SIH26261 Prototype • Regulatory Compliance Bureau</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              From Documents to Decisions,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-trust-blue via-trust-teal to-emerald-400">
                Powered by AI, Built for Trust.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Automated institutional application validation, document authentication, cryptographic registry verification, and forensic anomaly detection for regulatory authorities.
            </p>

            {/* Core Principle Callout */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2.5 max-w-xl">
              <Scale className="w-5 h-5 text-trust-teal flex-shrink-0" />
              <span>
                <strong className="text-white">Core Principle:</strong> AI provides explainable evidence, not verdicts. Final determination always rests with authorized regulatory officers.
              </span>
            </div>

            {/* Role-Based One-Click Demo CTAs */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Instant One-Click Demo Personas:
              </span>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleQuickDemo('APPLICANT')}
                  className="px-4 py-2.5 rounded-xl bg-trust-blue hover:bg-blue-600 text-white font-bold text-xs transition shadow-lg shadow-blue-500/25 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Demo as Applicant
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleQuickDemo('OFFICER')}
                  className="px-4 py-2.5 rounded-xl bg-trust-teal hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-cyan-500/25 flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-slate-950" />
                  Demo as Verification Officer
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleQuickDemo('ADMIN')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-2"
                >
                  <Scale className="w-4 h-4 text-trust-teal" />
                  Demo as Admin
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Signature Animated Document Scanning Demonstration */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full max-w-sm rounded-2xl p-6 bg-slate-900/90 border border-trust-blue/40 shadow-2xl overflow-hidden glass-panel">
              {/* Animated Laser Scanning Line */}
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-trust-teal to-transparent shadow-[0_0_20px_#00F0FF] z-20"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Document Certificate Replica */}
              <div className="bg-[#FAFBFD] text-slate-900 rounded-xl p-5 shadow-inner border border-slate-200 relative select-none">
                {/* Header emblem */}
                <div className="text-center pb-3 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-trust-teal flex items-center justify-center mx-auto mb-1">
                    <ShieldCheck className="w-5 h-5 text-trust-teal" />
                  </div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-700 block">
                    GOVERNMENT REGULATORY CLEARANCE
                  </span>
                  <p className="text-[9px] text-slate-500 font-medium">Directorate of Statutory Approval</p>
                </div>

                <div className="py-3 space-y-2 text-left">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">CERT NO:</span>
                    <span className="font-bold text-slate-900">FIRE-NOC-2024-9981</span>
                  </div>
                  <div className="text-[10px] font-mono">
                    <span className="text-slate-500">APPLICANT:</span>
                    <p className="font-bold text-slate-900 text-xs mt-0.5">Apex Institute of Technology</p>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-500">VALIDITY:</span>
                    <span className="font-bold text-emerald-600">2024 - 2027 (Active)</span>
                  </div>
                </div>

                {/* Scanned Verified Stamp Animation */}
                <motion.div
                  className="mt-2 py-2 px-3 rounded-lg border-2 border-emerald-600 bg-emerald-50 text-emerald-700 flex items-center justify-center gap-2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    AUTHENTICITY VERIFIED
                  </span>
                </motion.div>

                {/* Footer QR Hash */}
                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] font-mono text-slate-500">
                  <span>SHA-256: 9a8b7c6d5e...</span>
                  <span className="text-trust-blue font-bold">QR VALID</span>
                </div>
              </div>

              {/* Bottom Telemetry Ticker */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-trust-teal">
                  <span className="w-1.5 h-1.5 rounded-full bg-trust-teal animate-ping" />
                  Neural OCR Live
                </span>
                <span>Latency: 48ms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Operational Counters */}
      <section className="py-12 border-y border-slate-800 bg-trust-midnight/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl glass-panel">
              <span className="font-mono text-3xl sm:text-4xl font-black text-white">{stats.total}</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Applications Processed</p>
            </div>
            <div className="p-4 rounded-xl glass-panel">
              <span className="font-mono text-3xl sm:text-4xl font-black text-trust-teal">{stats.turnaround}</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Avg. Turnaround Time</p>
            </div>
            <div className="p-4 rounded-xl glass-panel">
              <span className="font-mono text-3xl sm:text-4xl font-black text-emerald-400">{stats.passRate}</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Regulatory Pass Rate</p>
            </div>
            <div className="p-4 rounded-xl glass-panel">
              <span className="font-mono text-3xl sm:text-4xl font-black text-trust-blue">{stats.trustIndex}%</span>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">AI Confidence Index</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-trust-teal uppercase tracking-widest px-3 py-1 rounded-full bg-trust-blue/10 border border-trust-blue/20">
            Automated Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3">
            How The Statutory Verification Platform Operates
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Eliminating manual bottlenecks through end-to-end multi-engine AI scrutiny while keeping regulatory officers in absolute control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-trust-blue/20 text-trust-teal flex items-center justify-center font-mono font-bold text-lg border border-trust-teal/30">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Format Intake &amp; Hashing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Institutions upload statutory clearance certificates (Fire NOC, Land Deed, Building Blueprint). The platform generates immutable cryptographic SHA-256 hashes and conducts instant duplicate detection.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-trust-teal/20 text-trust-teal flex items-center justify-center font-mono font-bold text-lg border border-trust-teal/30">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Autonomous Multi-Engine AI Scrutiny</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Neural OCR extracts coordinates, ELA (Error Level Analysis) detects image tampering and pixel alteration, cross-document engine flags entity mismatches, and dynamic rules evaluate regulatory bylaws.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-lg border border-emerald-500/30">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Officer Adjudication &amp; Immutable Audit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verification officers examine side-by-side evidence with bounding boxes, inspect explainability vectors, and record statutory determination (Approve / Reject / Clarify) backed by an immutable audit trail.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
