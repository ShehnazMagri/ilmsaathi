import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Settings, Shield, Moon, Sun, Save, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, role } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [schoolName, setSchoolName] = useState('Aura International School');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [saved, setSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">System Settings & Profile</h1>
        <p className="text-xs text-slate-400 mt-1">Configure school branding, active academic sessions, role permissions, and user credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: School Metadata & Branding */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <span>School Organization Settings</span>
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">School Name</label>
              <input
                type="text"
                required
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-4 py-3 font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Active Academic Year</label>
                <select
                  value={academicYear}
                  onChange={e => setAcademicYear(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-3 font-semibold"
                >
                  <option value="2026-2027">2026 - 2027</option>
                  <option value="2025-2026">2025 - 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">System Currency</label>
                <input
                  type="text"
                  disabled
                  value="USD ($)"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-400 text-xs rounded-xl px-3 py-3 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Campus Address</label>
              <input
                type="text"
                defaultValue="100 University Parkway, Tech City, CA"
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-4 py-3"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </form>

          {saved && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </div>
          )}
        </div>

        {/* Right: Theme & Active Profile Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active User Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>Logged User Account</span>
            </h3>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt="User Avatar"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
              />
              <div>
                <p className="font-bold text-white text-sm">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold capitalize">
                  {role.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Theme Settings Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white">Appearance & Theme</h3>
            <p className="text-xs text-slate-400">Switch between dark glassmorphism and light high-contrast UI theme mode.</p>

            <button
              onClick={toggleTheme}
              className="w-full p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
                <span>Active Mode: <strong className="capitalize">{theme} Theme</strong></span>
              </div>
              <span className="text-indigo-400">Toggle Theme</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
