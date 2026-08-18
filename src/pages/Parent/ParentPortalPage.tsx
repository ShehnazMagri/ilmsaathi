import React, { useState } from 'react';
import { UserCheck, GraduationCap, CalendarCheck, CreditCard, Award, MessageSquare } from 'lucide-react';

export const ParentPortalPage: React.FC = () => {
  const [activeChild, setActiveChild] = useState('Alex Morgan');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Parent Guardian Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time academic performance, attendance, fee status, and teacher communication.</p>
        </div>

        {/* Child Selector */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5">
          <span className="text-xs font-semibold text-slate-400 pl-2">Select Student:</span>
          <button
            onClick={() => setActiveChild('Alex Morgan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeChild === 'Alex Morgan' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Alex Morgan (Class 10A)
          </button>
        </div>
      </div>

      {/* Child Summary Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Alex Morgan"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{activeChild}</h2>
            <p className="text-xs text-slate-400">Class 10 - Section A | Admission No: ADM-2025-001 | Roll No: 101</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                Attendance: 96.5%
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                GPA: 3.9 / 4.0
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-bold">
                Rank: #1 in Class
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Child Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attendance Summary */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-400" />
              <span>Attendance History</span>
            </h3>
            <span className="text-xs font-bold text-emerald-400">96.5%</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60">
              <span>Today (Aug 06)</span>
              <span className="text-emerald-400 font-bold">Present (On time)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60">
              <span>Yesterday (Aug 05)</span>
              <span className="text-emerald-400 font-bold">Present (On time)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60">
              <span>Aug 04, 2026</span>
              <span className="text-emerald-400 font-bold">Present (On time)</span>
            </div>
          </div>
        </div>

        {/* Fee Payment Tracker */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-400" />
              <span>Term Fee Status</span>
            </h3>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
              Fully Paid
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Tuition & Lab Fee:</span>
              <span className="text-white font-bold">$3,500</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Bus Route Transport:</span>
              <span className="text-white font-bold">$800</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Library Subscription:</span>
              <span className="text-white font-bold">$200</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-white">
              <span>Total Settled:</span>
              <span className="text-emerald-400">$4,500</span>
            </div>
          </div>
        </div>

        {/* Teacher Communication */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span>Class Teacher Contact</span>
            </h3>
            <p className="text-xs text-slate-400 mt-2">Dr. Robert Langdon (Mathematics Head Teacher)</p>
            <p className="text-xs text-slate-400 mt-1">Office Hours: Mon - Fri (2:00 PM - 4:00 PM)</p>
          </div>

          <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>Send Direct Message to Teacher</span>
          </button>
        </div>
      </div>
    </div>
  );
};
