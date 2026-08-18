import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { ExamItem, ResultItem } from '../../types';
import { Modal } from '../../components/common/Modal';
import { Award, Printer, Download, CheckCircle2 } from 'lucide-react';

export const ExamResultPage: React.FC = () => {
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [activeTab, setActiveTab] = useState<'exams' | 'results'>('results');
  const [selectedResult, setSelectedResult] = useState<ResultItem | null>(null);

  useEffect(() => {
    apiService.getExams().then(setExams);
    apiService.getResults().then(setResults);
  }, []);

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Examinations & Result Cards</h1>
          <p className="text-xs text-slate-400 mt-1">Schedule mid-terms/finals, calculate GPA & rank, and generate printable report cards.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5">
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'results' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Student Results ({results.length})
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'exams' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Exam Schedule ({exams.length})
          </button>
        </div>
      </div>

      {activeTab === 'results' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map(res => (
              <div key={res.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{res.studentName}</h3>
                    <p className="text-xs text-slate-400">Roll No: {res.rollNo} • {res.className} ({res.section})</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                      GPA: {res.gpa} / 4.0
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Rank #{res.rank} in Class</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-b border-slate-800 py-3 text-xs">
                  {res.subjectMarks.map((sm, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-300">
                      <span>{sm.subject}</span>
                      <span className="font-bold text-white">
                        {sm.marksObtained} / {sm.maxMarks} ({sm.grade})
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs">
                    <span className="text-slate-400">Total Score: </span>
                    <strong className="text-white">{res.totalMarks} / {res.maxTotalMarks} ({res.percentage}%)</strong>
                  </div>

                  <button
                    onClick={() => setSelectedResult(res)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>View / Print Card</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map(ex => (
            <div key={ex.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                  {ex.examType}
                </span>
                <span className="text-xs font-bold text-slate-400">Hall: {ex.roomNo}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{ex.title}</h3>
              <p className="text-xs text-slate-400">Class: {ex.className} • Subject: {ex.subject}</p>
              <div className="p-3 rounded-xl bg-slate-800/60 text-xs flex justify-between font-semibold text-slate-300">
                <span>Date: {ex.date}</span>
                <span>Time: {ex.startTime} - {ex.endTime}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Printable Report Card Modal */}
      {selectedResult && (
        <Modal isOpen={!!selectedResult} onClose={() => setSelectedResult(null)} title="Official Academic Report Card">
          <div id="printable-area" className="space-y-6 text-xs text-slate-200">
            <div className="text-center pb-4 border-b border-slate-700">
              <h2 className="text-xl font-black text-indigo-400 uppercase tracking-wide">Aura International School</h2>
              <p className="text-xs text-slate-400">Official Term Academic Report Card - Session 2026</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-800/60 rounded-2xl border border-slate-700">
              <div>
                <p><span className="text-slate-400">Student Name:</span> <strong className="text-white">{selectedResult.studentName}</strong></p>
                <p><span className="text-slate-400">Roll Number:</span> <strong className="text-white">{selectedResult.rollNo}</strong></p>
              </div>
              <div>
                <p><span className="text-slate-400">Class & Section:</span> <strong className="text-white">{selectedResult.className} ({selectedResult.section})</strong></p>
                <p><span className="text-slate-400">Class Rank:</span> <strong className="text-emerald-400">#{selectedResult.rank}</strong></p>
              </div>
            </div>

            <table className="w-full text-left border border-slate-700 rounded-xl overflow-hidden">
              <thead className="bg-slate-800 text-slate-300 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Max Marks</th>
                  <th className="p-3">Marks Obtained</th>
                  <th className="p-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {selectedResult.subjectMarks.map((sm, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold text-white">{sm.subject}</td>
                    <td className="p-3">{sm.maxMarks}</td>
                    <td className="p-3 font-bold text-indigo-400">{sm.marksObtained}</td>
                    <td className="p-3 font-bold text-emerald-400">{sm.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center p-4 bg-slate-800/60 rounded-2xl border border-slate-700 font-bold">
              <div>
                <span>Cumulative Percentage: </span>
                <span className="text-indigo-400">{selectedResult.percentage}%</span>
              </div>
              <div>
                <span>GPA Score: </span>
                <span className="text-emerald-400">{selectedResult.gpa} / 4.0</span>
              </div>
            </div>

            <div className="no-print pt-4 flex justify-end">
              <button
                onClick={handlePrintReport}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official PDF</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
