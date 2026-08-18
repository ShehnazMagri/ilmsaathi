import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Briefcase,
  UserCheck,
  BookOpen,
  CalendarDays,
  Clock,
  FileCheck2,
  Award,
  CreditCard,
  DollarSign,
  CalendarCheck,
  Library,
  Building2,
  Package,
  Bell,
  BarChart3,
  Settings,
  Globe,
  X
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { role } = useAuth();

  const navItems = [
    // { label: 'Public Portal', path: '/landing', icon: Globe, roles: ['*'] },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['*'] },
    { label: 'Students', path: '/students', icon: GraduationCap, roles: ['super_admin', 'admin', 'principal', 'teacher', 'accountant', 'receptionist'] },
    { label: 'Teachers', path: '/teachers', icon: Users, roles: ['super_admin', 'admin', 'principal', 'hr'] },
    { label: 'Employees', path: '/employees', icon: Briefcase, roles: ['super_admin', 'admin', 'hr', 'principal'] },
    { label: 'Parent Portal', path: '/parent-portal', icon: UserCheck, roles: ['super_admin', 'admin', 'parent'] },
    { label: 'Classes & Subjects', path: '/classes-subjects', icon: BookOpen, roles: ['super_admin', 'admin', 'principal', 'teacher'] },
    { label: 'Timetable', path: '/timetable', icon: Clock, roles: ['*'] },
    { label: 'Attendance', path: '/attendance', icon: CalendarDays, roles: ['*'] },
    { label: 'Homework & Assignments', path: '/homework', icon: FileCheck2, roles: ['super_admin', 'admin', 'teacher', 'student', 'parent'] },
    { label: 'Exams & Results', path: '/exams-results', icon: Award, roles: ['*'] },
    { label: 'Fee Management', path: '/fees', icon: CreditCard, roles: ['super_admin', 'admin', 'accountant', 'parent', 'student'] },
    { label: 'Payroll & Salary', path: '/payroll', icon: DollarSign, roles: ['super_admin', 'admin', 'accountant', 'hr', 'employee'] },
    { label: 'Leave Requests', path: '/leaves', icon: CalendarCheck, roles: ['*'] },
    { label: 'Library', path: '/library', icon: Library, roles: ['super_admin', 'admin', 'librarian', 'teacher', 'student'] },
    { label: 'Hostel & Transport', path: '/hostel-transport', icon: Building2, roles: ['super_admin', 'admin', 'student', 'parent', 'employee'] },
    { label: 'Inventory', path: '/inventory', icon: Package, roles: ['super_admin', 'admin', 'accountant', 'employee'] },
    { label: 'Notices & Events', path: '/notices-events', icon: Bell, roles: ['*'] },
    { label: 'Reports & Analytics', path: '/reports', icon: BarChart3, roles: ['super_admin', 'admin', 'principal', 'accountant', 'hr'] },
    { label: 'Settings & Profile', path: '/settings', icon: Settings, roles: ['*'] },
  ];

  const filteredNav = navItems.filter(
    item => item.roles.includes('*') || item.roles.includes(role)
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden animate-fadeIn"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-slate-900 border-r border-slate-800/90 transition-transform duration-300 ease-in-out lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
          } flex flex-col`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/25">
              A
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                SAM<span className="text-indigo-400">SMS</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Enterprise ERP</p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Main Portal Menu
          </div>

          {filteredNav.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 translate-x-1'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-[11px]">
              <p className="font-semibold text-slate-200">System v2.4 Active</p>
              <p className="text-slate-400">Server Online</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
