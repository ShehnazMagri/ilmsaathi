import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { AttendanceRecord } from '../../types';
import { CalendarDays, CheckCircle2, XCircle, Clock, AlertCircle, Save } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedDate, setSelectedDate] = useState('2026-08-06');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiService.getAttendance().then(setRecords);
  }, []);

  const toggleStatus = (id: string, status: AttendanceRecord['status']) => {
    setRecords(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
    setSaved(false);
  };

  const markAllPresent = () => {
    setRecords(prev => prev.map(r => ({ ...r, status: 'Present' })));
    setSaved(false);
  };

  const presentCount = records.filter(r => r.status === 'Present').length;
  const lateCount = records.filter(r => r.status === 'Late').length;
  const absentCount = records.filter(r => r.status === 'Absent').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Daily Attendance Marking</h1>
          <p className="text-xs text-slate-400 mt-1">Record and monitor student attendance, late arrivals, and excused leaves.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 font-bold"
          />
          <button
            onClick={markAllPresent}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
          >
            Mark All Present
          </button>
          <button
            onClick={() => setSaved(true)}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>Attendance records for {selectedDate} saved successfully to database!</span>
        </div>
      )}

      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-400">Total Present</p>
            <h3 className="text-2xl font-black text-white mt-0.5">{presentCount}</h3>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-400">Late Arrival</p>
            <h3 className="text-2xl font-black text-white mt-0.5">{lateCount}</h3>
          </div>
          <Clock className="w-8 h-8 text-amber-400" />
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-rose-400">Absent</p>
            <h3 className="text-2xl font-black text-white mt-0.5">{absentCount}</h3>
          </div>
          <XCircle className="w-8 h-8 text-rose-400" />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <h3 className="text-base font-bold text-white">Roster for {selectedClass} - Section A</h3>
        </div>

        <div className="divide-y divide-slate-800">
          {records.map(rec => (
            <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
              <div>
                <p className="font-bold text-white text-sm">{rec.studentName}</p>
                <p className="text-[11px] text-slate-400">{rec.className} ({rec.section}) • ID: {rec.studentId}</p>
              </div>

              {/* Status Selector Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(rec.id, 'Present')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    rec.status === 'Present'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Present
                </button>
                <button
                  onClick={() => toggleStatus(rec.id, 'Late')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    rec.status === 'Late'
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Late
                </button>
                <button
                  onClick={() => toggleStatus(rec.id, 'Absent')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    rec.status === 'Absent'
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
