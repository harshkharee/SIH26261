import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-trust-darkBg/90 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-trust-blue/20 text-trust-teal flex items-center justify-center border border-trust-teal/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-white">SIH26261 PROTOTYPE</p>
              <p className="text-xs text-slate-400">
                AI-Powered Application Validation, Document Authentication &amp; Regulatory Compliance Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-medium text-[11px]">AI Engines Online</span>
            </div>
            <a
              href="http://localhost:5000/docs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-trust-teal transition flex items-center gap-1"
            >
              API Docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p className="font-medium text-slate-400">
            SIH26261 | Digitizing Verification. Ensuring Compliance. Building a Transparent Future.
          </p>
          <p className="text-[11px] font-mono">
            Form 26-B Regulatory Mandate • AICTE Scrutiny Division
          </p>
        </div>
      </div>
    </footer>
  );
};
