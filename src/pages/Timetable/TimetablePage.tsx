import React, { useState } from 'react';
import { Clock, Calendar, Building2 } from 'lucide-react';

interface PeriodSlot {
  time: string;
  monday: { subject: string; teacher: string; room: string };
  tuesday: { subject: string; teacher: string; room: string };
  wednesday: { subject: string; teacher: string; room: string };
  thursday: { subject: string; teacher: string; room: string };
  friday: { subject: string; teacher: string; room: string };
}

const WEEKLY_SCHEDULE: PeriodSlot[] = [
  {
    time: '08:30 AM - 09:30 AM',
    monday: { subject: 'Advanced Math', teacher: 'Dr. R. Langdon', room: 'R-301' },
    tuesday: { subject: 'Physics Lab', teacher: 'Dr. R. Langdon', room: 'Lab B' },
    wednesday: { subject: 'Chemistry', teacher: 'Elena Rostova', room: 'R-301' },
    thursday: { subject: 'English Lit', teacher: 'Prof. J. Vance', room: 'R-301' },
    friday: { subject: 'Advanced Math', teacher: 'Dr. R. Langdon', room: 'R-301' }
  },
  {
    time: '09:30 AM - 10:30 AM',
    monday: { subject: 'Chemistry', teacher: 'Elena Rostova', room: 'R-301' },
    tuesday: { subject: 'Advanced Math', teacher: 'Dr. R. Langdon', room: 'R-301' },
    wednesday: { subject: 'World History', teacher: 'Prof. J. Vance', room: 'R-301' },
    thursday: { subject: 'Physics Lab', teacher: 'Dr. R. Langdon', room: 'Lab B' },
    friday: { subject: 'Biology Lab', teacher: 'Elena Rostova', room: 'Lab A' }
  },
  {
    time: '10:30 AM - 11:00 AM',
    monday: { subject: '☕ RECESS / BREAK', teacher: '-', room: 'Courtyard' },
    tuesday: { subject: '☕ RECESS / BREAK', teacher: '-', room: 'Courtyard' },
    wednesday: { subject: '☕ RECESS / BREAK', teacher: '-', room: 'Courtyard' },
    thursday: { subject: '☕ RECESS / BREAK', teacher: '-', room: 'Courtyard' },
    friday: { subject: '☕ RECESS / BREAK', teacher: '-', room: 'Courtyard' }
  },
  {
    time: '11:00 AM - 12:00 PM',
    monday: { subject: 'English Lit', teacher: 'Prof. J. Vance', room: 'R-301' },
    tuesday: { subject: 'Computer Science', teacher: 'Alan Turing', room: 'CS Lab 1' },
    wednesday: { subject: 'Advanced Math', teacher: 'Dr. R. Langdon', room: 'R-301' },
    thursday: { subject: 'Organic Chemistry', teacher: 'Elena Rostova', room: 'R-301' },
    friday: { subject: 'Sports & PE', teacher: 'Coach Marcus', room: 'Turf Ground' }
  }
];

export const TimetablePage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10 - Section A');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Academic Timetable</h1>
          <p className="text-xs text-slate-400 mt-1">Weekly class schedules, period breakdown, and classroom allocations.</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-400">Class Filter:</label>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-4 py-2 font-bold"
          >
            <option value="Class 10 - Section A">Class 10 - Section A</option>
            <option value="Class 10 - Section B">Class 10 - Section B</option>
            <option value="Class 9 - Section A">Class 9 - Section A</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span>Weekly Schedule Matrix for {selectedClass}</span>
          </h3>
          <span className="text-xs font-bold text-slate-400">Session 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 min-w-[150px]">Time Slot</th>
                <th className="px-4 py-3 min-w-[180px]">Monday</th>
                <th className="px-4 py-3 min-w-[180px]">Tuesday</th>
                <th className="px-4 py-3 min-w-[180px]">Wednesday</th>
                <th className="px-4 py-3 min-w-[180px]">Thursday</th>
                <th className="px-4 py-3 min-w-[180px]">Friday</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {WEEKLY_SCHEDULE.map((slot, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="px-4 py-4 font-bold text-indigo-300 bg-slate-950/30">{slot.time}</td>
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map(dayKey => {
                    const dayData = (slot as any)[dayKey];
                    const isBreak = dayData.subject.includes('RECESS');
                    return (
                      <td key={dayKey} className="px-4 py-4">
                        <div className={`p-3 rounded-xl border ${isBreak ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : 'bg-slate-800/60 border-slate-700/60'}`}>
                          <p className="font-bold text-white">{dayData.subject}</p>
                          {!isBreak && (
                            <p className="text-[10px] text-slate-400 mt-1">
                              {dayData.teacher} • <span className="text-indigo-400 font-semibold">{dayData.room}</span>
                            </p>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
