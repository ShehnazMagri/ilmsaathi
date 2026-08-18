import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { LeaveItem } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { Modal } from '../../components/common/Modal';
import { CalendarCheck, Plus, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const LeaveManagementPage: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<LeaveItem>>({
    applicantName: 'Alex Morgan',
    role: 'Student',
    leaveType: 'Sick',
    startDate: '2026-08-10',
    endDate: '2026-08-11',
    days: 2,
    reason: 'Medical checkup'
  });

  useEffect(() => {
    apiService.getLeaves().then(setLeaves);
  }, []);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave: LeaveItem = {
      id: `lv-${Date.now()}`,
      applicantName: formData.applicantName || 'Applicant',
      role: formData.role || 'Student',
      leaveType: formData.leaveType || 'Casual',
      startDate: formData.startDate || '2026-08-10',
      endDate: formData.endDate || '2026-08-11',
      days: formData.days || 1,
      reason: formData.reason || 'Personal reasons',
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };
    setLeaves(prev => [newLeave, ...prev]);
    setIsModalOpen(false);
  };

  const updateStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setLeaves(prev =>
      prev.map(l => (l.id === id ? { ...l, status } : l))
    );
  };

  const columns: Column<LeaveItem>[] = [
    {
      header: 'Applicant Name',
      cell: row => <span className="font-bold text-white">{row.applicantName}</span>
    },
    {
      header: 'Role',
      cell: row => (
        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
          {row.role}
        </span>
      )
    },
    { header: 'Leave Type', accessorKey: 'leaveType' },
    {
      header: 'Duration',
      cell: row => (
        <span className="text-xs text-slate-300">
          {row.startDate} to {row.endDate} ({row.days} days)
        </span>
      )
    },
    { header: 'Reason', accessorKey: 'reason' },
    {
      header: 'Status',
      cell: row => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            row.status === 'Approved'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : row.status === 'Rejected'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {row.status}
        </span>
      )
    },
    {
      header: 'Approval Action',
      cell: row =>
        row.status === 'Pending' ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateStatus(row.id, 'Approved')}
              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
              title="Approve Leave"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateStatus(row.id, 'Rejected')}
              className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all"
              title="Reject Leave"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <span className="text-xs text-slate-500">Processed</span>
        )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Leave Approval Workflow</h1>
          <p className="text-xs text-slate-400 mt-1">Apply for leave, track leave balances, and approve student/teacher leave applications.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      <DataTable
        title="Leave Applications Directory"
        description="Pending and processed leave requests"
        columns={columns}
        data={leaves}
        exportFileName="leave_requests_2026"
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit Leave Application">
        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Applicant Name</label>
            <input
              type="text"
              required
              value={formData.applicantName}
              onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Leave Type</label>
              <select
                value={formData.leaveType}
                onChange={e => setFormData({ ...formData, leaveType: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              >
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
                <option value="Emergency">Emergency Leave</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Reason for Leave</label>
            <textarea
              rows={2}
              required
              value={formData.reason}
              onChange={e => setFormData({ ...formData, reason: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Submit Application
          </button>
        </form>
      </Modal>
    </div>
  );
};
