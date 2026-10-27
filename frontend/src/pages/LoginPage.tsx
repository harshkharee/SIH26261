import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, FileText, Scale, ArrowRight, Lock, Mail, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'APPLICANT' | 'OFFICER' | 'ADMIN') => {
    setIsLoading(true);
    setError('');
    try {
      await demoLogin(role);
      if (role === 'APPLICANT') navigate('/applicant');
      else if (role === 'OFFICER') navigate('/officer');
      else navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed demo login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#070D1E] aurora-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel w-full max-w-lg rounded-2xl p-8 border border-trust-blue/30 bg-trust-midnight shadow-2xl space-y-6"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-trust-blue to-trust-teal flex items-center justify-center shadow-glow-blue mx-auto">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Sign In to Platform</h2>
          <p className="text-xs text-slate-400">
            SIH26261 • AICTE Regulatory Scrutiny &amp; Compliance Portal
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1-Click Demo Login Personas Grid */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-left">
            ⚡ One-Click Instant Demo Login:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleDemoLogin('APPLICANT')}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-trust-blue text-left transition group hover:bg-slate-800/80"
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-trust-blue" />
                <span className="text-xs font-bold text-white">Applicant</span>
              </div>
              <p className="text-[10px] text-slate-400">Dr. Rajesh Sharma (Apex Inst.)</p>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('OFFICER')}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-trust-teal text-left transition group hover:bg-slate-800/80"
            >
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className="w-4 h-4 text-trust-teal" />
                <span className="text-xs font-bold text-white">Officer</span>
              </div>
              <p className="text-[10px] text-slate-400">Smt. Priya Sundaram (AICTE)</p>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('ADMIN')}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-400 text-left transition group hover:bg-slate-800/80"
            >
              <div className="flex items-center gap-2 mb-1">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Admin</span>
              </div>
              <p className="text-[10px] text-slate-400">Shri Amitabh Roy (Chief)</p>
            </button>
          </div>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            or sign in with credentials
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Standard Credentials Form */}
        <form onSubmit={handleStandardLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@aicte.gov.in"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-trust-teal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-trust-teal"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Default demo password for seeded accounts: password123</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-trust-blue hover:bg-blue-600 text-white transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
