import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { HomeworkItem } from '../../types';
import { Modal } from '../../components/common/Modal';
import { FileCheck2, Upload, Calendar, Plus, CheckCircle2 } from 'lucide-react';

export const HomeworkAssignmentPage: React.FC = () => {
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<HomeworkItem>>({
    title: '',
    subject: 'Advanced Mathematics',
    className: 'Class 10',
    section: 'A',
    dueDate: '2026-08-10',
    description: ''
  });

  useEffect(() => {
    apiService.getHomework().then(setHomeworkList);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: HomeworkItem = {
      id: `hw-${Date.now()}`,
      title: formData.title || 'New Homework Assignment',
      subject: formData.subject || 'Mathematics',
      className: formData.className || 'Class 10',
      section: formData.section || 'A',
      assignedBy: 'Dr. Robert Langdon',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: formData.dueDate || '2026-08-12',
      description: formData.description || 'Complete exercises.',
      submissionsCount: 0,
      totalStudents: 38
    };
    setHomeworkList(prev => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Homework & Assignments</h1>
          <p className="text-xs text-slate-400 mt-1">Assign daily tasks, track student submissions, and review homework attachments.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Homework</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homeworkList.map(hw => (
          <div key={hw.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold border border-indigo-500/20">
                {hw.subject} • {hw.className} ({hw.section})
              </span>
              <span className="text-[11px] text-slate-400">Due: <strong className="text-amber-400">{hw.dueDate}</strong></span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{hw.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{hw.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400">Assigned by: <strong className="text-slate-200">{hw.assignedBy}</strong></span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(hw.submissionsCount / hw.totalStudents) * 100}%` }}
                  />
                </div>
                <span className="font-bold text-emerald-400">{hw.submissionsCount} / {hw.totalStudents} Submitted</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Homework Assignment">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Homework Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Instructions / Description</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Publish Homework to Class
          </button>
        </form>
      </Modal>
    </div>
  );
};
