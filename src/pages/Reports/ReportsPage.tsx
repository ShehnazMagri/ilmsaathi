import React, { useState } from 'react';
import { BarChart3, Download, FileText, CheckCircle2, Filter } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('Student Directory & Enrollment');
  const [academicTerm, setAcademicTerm] = useState('Term 2 - 2026');
  const [format, setFormat] = useState<'PDF' | 'CSV'>('PDF');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
    setTimeout(() => {
      setGenerated(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Custom Analytics & Reports Generator</h1>
        <p className="text-xs text-slate-400 mt-1">Export filtered administrative, financial, attendance, and student performance reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Report Builder Form */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Generate Executive Report</span>
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Report Category</label>
              <select
                value={reportType}
                onChange={e => setReportType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-4 py-3 font-semibold"
              >
                <option value="Student Directory & Enrollment">Student Directory & Enrollment</option>
                <option value="Attendance Summary & Absenteeism Rate">Attendance Summary & Absenteeism Rate</option>
                <option value="Fee Collection & Pending Dues Ledger">Fee Collection & Pending Dues Ledger</option>
                <option value="Staff Payroll & Salary Disbursal">Staff Payroll & Salary Disbursal</option>
                <option value="Academic Examination Result Matrix">Academic Examination Result Matrix</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Academic Session Period</label>
              <select
                value={academicTerm}
                onChange={e => setAcademicTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-4 py-3 font-semibold"
              >
                <option value="Term 2 - 2026">Term 2 - Academic Session 2026</option>
                <option value="Term 1 - 2026">Term 1 - Academic Session 2026</option>
                <option value="Full Year 2025">Full Year 2025</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Export File Format</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormat('PDF')}
                  className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                    format === 'PDF' ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  PDF Document (.pdf)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('CSV')}
                  className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${
                    format === 'CSV' ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Excel CSV Data (.csv)
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Compile & Download {format} Report</span>
            </button>
          </form>

          {generated && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5" />
              <span>Report compiled successfully! Download started in browser.</span>
            </div>
          )}
        </div>

        {/* Quick Report Download Cards */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Pre-compiled Monthly Summaries</h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-indigo-500/40 transition-all">
              <div>
                <p className="font-bold text-white text-sm">Monthly Attendance Summary - July 2026</p>
                <p className="text-xs text-slate-400">PDF • 1.4 MB • 2,540 Students Tracked</p>
              </div>
              <button className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold text-xs rounded-xl transition-all">
                Download
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-indigo-500/40 transition-all">
              <div>
                <p className="font-bold text-white text-sm">Fee Defaulters & Pending Dues</p>
                <p className="text-xs text-slate-400">CSV • 340 KB • Updated Today</p>
              </div>
              <button className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold text-xs rounded-xl transition-all">
                Download
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-indigo-500/40 transition-all">
              <div>
                <p className="font-bold text-white text-sm">Staff Payroll & Tax Ledger 2026</p>
                <p className="text-xs text-slate-400">PDF • 2.1 MB • Confidential Finance Document</p>
              </div>
              <button className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold text-xs rounded-xl transition-all">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
