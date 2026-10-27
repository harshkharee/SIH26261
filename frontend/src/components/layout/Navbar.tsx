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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-trust-darkBg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-trust-blue to-trust-teal flex items-center justify-center shadow-glow-blue transition-transform group-hover:scale-105">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">SIH26261</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-trust-blue/20 text-trust-teal border border-trust-teal/30">
                AICTE PROTOTYPE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 font-medium tracking-wide">
              AI Document Verification &amp; Compliance
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
          {user?.role === 'APPLICANT' && (
            <>
              <Link
                to="/applicant"
                className={`px-3 py-1.5 rounded-lg transition ${
                  location.pathname === '/applicant' ? 'bg-trust-blue/20 text-trust-teal' : 'text-slate-300 hover:text-white'
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
                className={`px-3 py-1.5 rounded-lg transition ${
                  location.pathname === '/officer' ? 'bg-trust-blue/20 text-trust-teal' : 'text-slate-300 hover:text-white'
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
                className={`px-3 py-1.5 rounded-lg transition ${
                  location.pathname === '/admin' ? 'bg-trust-blue/20 text-trust-teal' : 'text-slate-300 hover:text-white'
                }`}
              >
                Executive Analytics
              </Link>
              <Link
                to="/admin/rules"
                className={`px-3 py-1.5 rounded-lg transition ${
                  location.pathname === '/admin/rules' ? 'bg-trust-blue/20 text-trust-teal' : 'text-slate-300 hover:text-white'
                }`}
              >
                Compliance Rules
              </Link>
              <Link
                to="/admin/audit"
                className={`px-3 py-1.5 rounded-lg transition ${
                  location.pathname === '/admin/audit' ? 'bg-trust-blue/20 text-trust-teal' : 'text-slate-300 hover:text-white'
                }`}
              >
                Audit Logs
              </Link>
            </>
          )}
        </nav>

        {/* Right Section: Command Palette Trigger, Role Switcher, Notifications, Theme, Profile */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs"
          >
            <Search className="w-3.5 h-3.5 text-trust-teal" />
            <span className="font-medium">Quick search...</span>
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Ctrl+K</kbd>
          </button>

          {/* Quick 1-Click Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white hover:border-trust-teal/40 transition"
              title="Switch demo persona"
            >
              <span className="w-2 h-2 rounded-full bg-trust-teal animate-pulse" />
              <span className="font-semibold text-slate-300">Role:</span>
              <span className="font-bold text-trust-teal uppercase">{user?.role || 'Guest'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-trust-midnight border border-slate-800 shadow-2xl p-1.5 z-50 text-xs">
                <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-slate-400">
                  Switch Demo Persona:
                </div>
                <button
                  onClick={() => { demoLogin('OFFICER'); setShowRoleMenu(false); navigate('/officer'); }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition flex items-center justify-between"
                >
                  <span>Verification Officer</span>
                  {user?.role === 'OFFICER' && <CheckCircle2 className="w-3.5 h-3.5 text-trust-teal" />}
                </button>
                <button
                  onClick={() => { demoLogin('APPLICANT'); setShowRoleMenu(false); navigate('/applicant'); }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition flex items-center justify-between"
                >
                  <span>College Applicant</span>
                  {user?.role === 'APPLICANT' && <CheckCircle2 className="w-3.5 h-3.5 text-trust-teal" />}
                </button>
                <button
                  onClick={() => { demoLogin('ADMIN'); setShowRoleMenu(false); navigate('/admin'); }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition flex items-center justify-between"
                >
                  <span>Compliance Admin</span>
                  {user?.role === 'ADMIN' && <CheckCircle2 className="w-3.5 h-3.5 text-trust-teal" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition relative"
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
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-trust-midnight border border-slate-800 shadow-2xl p-2 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 px-2">
                    <span className="font-bold text-white text-xs">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[10px] text-trust-teal hover:underline font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-slate-500 text-[11px]">
                        No notifications right now.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-lg border transition ${
                            n.isRead ? 'bg-slate-900/40 border-slate-800/60 text-slate-400' : 'bg-trust-blue/15 border-trust-teal/30 text-slate-200'
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
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-trust-blue" />}
          </button>

          {/* User Profile / Logout */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={logout}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-xl bg-trust-blue hover:bg-blue-600 text-white font-semibold text-xs transition shadow-md"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
