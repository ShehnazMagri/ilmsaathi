import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';
import {
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  Menu,
  Shield
} from 'lucide-react';

const ROLE_BADGES: Record<UserRole, { label: string; badgeColor: string }> = {
  super_admin: { label: 'Super Admin', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  admin: { label: 'School Admin', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  principal: { label: 'Principal', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  teacher: { label: 'Teacher', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  student: { label: 'Student', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  parent: { label: 'Parent', badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
  accountant: { label: 'Accountant', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  hr: { label: 'HR Manager', badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  librarian: { label: 'Librarian', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  receptionist: { label: 'Receptionist', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  employee: { label: 'Employee Staff', badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30' }
};

interface HeaderProps {
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
  const { user, role, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const currentRoleBadge = ROLE_BADGES[role] || ROLE_BADGES.student;

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left section: Mobile menu toggle + Global Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative hidden md:block max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search portal records..."
            className="w-full bg-slate-800/80 border border-slate-700/70 text-slate-100 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Right Section: Authentic User Role Badge, Notifications, Theme, Profile */}
      <div className="flex items-center gap-3">
        {/* Authentic Dynamic User Role Badge from Database */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${currentRoleBadge.badgeColor}`}>
          <Shield className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Role:</span>
          <span>{currentRoleBadge.label}</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">System Live</span>
              </div>
              <div className="mt-3 space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <p className="font-semibold text-slate-200">System Connection Active</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Connected to Enterprise School ERP Server</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-300" />}
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt="Avatar"
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/30"
            />
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-100 leading-tight">{user?.name || 'User'}</p>
              <p className="text-[10px] text-slate-400 capitalize">{role.replace('_', ' ')}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-800">
                <p className="text-xs font-bold text-white">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  setShowProfileMenu(false);
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 font-semibold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
