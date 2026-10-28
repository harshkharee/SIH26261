import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { api } from '../../services/api';
import { Notification } from '../../types';
import {
  ShieldCheck,
  Search,
  Bell,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Scale,
  BarChart3,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, demoLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (user) {
      api.getNotifications()
        .then((res) => {
          setNotifications(res.notifications || []);
          setUnreadCount(res.unreadCount || 0);
        })
        .catch(() => {});
    }
  }, [user, location.pathname]);

  const handleMarkAllRead = async () => {
    try {
      await api.markNotificationRead('all');
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {}
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0B0F17]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-glow-brand transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow-violet ring-1 ring-white/20">
            <ShieldCheck className="w-5 h-5 text-white drop-shadow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white font-sans">SIH26261</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 tracking-wider">
                REGULATORY SUITE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 font-medium tracking-wide">
              AI Verification &amp; Statutory Compliance
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
          {user?.role === 'APPLICANT' && (
            <>
              <Link
                to="/applicant"
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  location.pathname === '/applicant'
                    ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                My Applications
              </Link>
            </>
          )}

          {user?.role === 'OFFICER' && (
            <>
              <Link
                to="/officer"
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  location.pathname === '/officer'
                    ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Verification Queue
              </Link>
            </>
          )}

          {user?.role === 'ADMIN' && (
            <>
              <Link
                to="/admin"
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  location.pathname === '/admin'
                    ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Executive Analytics
              </Link>
              <Link
                to="/admin/rules"
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  location.pathname === '/admin/rules'
                    ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Compliance Rules
              </Link>
              <Link
                to="/admin/audit"
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  location.pathname === '/admin/audit'
                    ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Audit Trail
              </Link>
            </>
          )}
        </nav>

        {/* Right Section: Command Palette Trigger, Role Switcher, Notifications, Theme, Profile */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/20 transition-all text-xs"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-medium">Quick search...</span>
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">Ctrl+K</kbd>
          </button>

          {/* Quick 1-Click Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white hover:border-indigo-500/40 transition-all shadow-sm"
              title="Switch demo persona"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-400">Role:</span>
              <span className="font-bold text-indigo-300 uppercase tracking-wide">{user?.role || 'Guest'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#111827]/95 border border-white/10 shadow-2xl backdrop-blur-xl p-1.5 z-50 text-xs">
                <div className="px-2.5 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Switch Demo Persona:
                </div>
                <button
                  onClick={() => { demoLogin('OFFICER'); setShowRoleMenu(false); navigate('/officer'); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/[0.06] text-slate-200 transition flex items-center justify-between"
                >
                  <span className="font-medium">Verification Officer</span>
                  {user?.role === 'OFFICER' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </button>
                <button
                  onClick={() => { demoLogin('APPLICANT'); setShowRoleMenu(false); navigate('/applicant'); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/[0.06] text-slate-200 transition flex items-center justify-between"
                >
                  <span className="font-medium">College Applicant</span>
                  {user?.role === 'APPLICANT' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </button>
                <button
                  onClick={() => { demoLogin('ADMIN'); setShowRoleMenu(false); navigate('/admin'); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/[0.06] text-slate-200 transition flex items-center justify-between"
                >
                  <span className="font-medium">Compliance Admin</span>
                  {user?.role === 'ADMIN' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white transition-all relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#111827]/95 border border-white/10 shadow-2xl backdrop-blur-xl p-2.5 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08] px-2">
                    <span className="font-bold text-white text-xs">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[10px] text-indigo-400 hover:underline font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-1.5">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-slate-500 text-[11px]">
                        No notifications right now.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-xl border transition ${
                            n.isRead ? 'bg-white/[0.02] border-white/[0.04] text-slate-400' : 'bg-indigo-500/10 border-indigo-500/20 text-slate-200'
                          }`}
                        >
                          <p className="font-bold text-white text-[11px] mb-0.5">{n.title}</p>
                          <p className="text-[11px] text-slate-300 leading-tight">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white transition"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* User Profile / Logout */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={logout}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-medium text-xs transition bg-white/[0.02]"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                state={{ mode: 'register' }}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-xs transition shadow-lg shadow-indigo-500/25 ring-1 ring-white/10"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
