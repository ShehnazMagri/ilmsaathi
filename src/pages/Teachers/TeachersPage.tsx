import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiService } from '../../services/api';
import { Teacher } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Edit3, Trash2 } from 'lucide-react';

export const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    qualification: string;
    specialization: string;
    salary: number;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Mathematics',
    qualification: 'M.Sc. Mathematics',
    specialization: 'Applied Math',
    salary: 55000
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    const data = await apiService.getTeachers();
    setTeachers(data);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiService.createTeacher({
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        mobile: formData.phone,
        department: formData.department,
        qualification: formData.qualification,
        specialization: formData.specialization,
        salary: formData.salary,
        joiningDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      });
      if (created) {
        toast.success('Faculty member registered successfully!');
        await loadTeachers();
        setIsModalOpen(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          department: 'Mathematics',
          qualification: 'M.Sc. Mathematics',
          specialization: 'Applied Math',
          salary: 55000
        });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to register faculty member');
    }
  };

  const handleEditClick = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      firstName: teacher.firstName || teacher.fullName?.split(' ')[0] || '',
      lastName: teacher.lastName || teacher.fullName?.split(' ').slice(1).join(' ') || '',
      email: teacher.email,
      phone: teacher.phone || teacher.mobile || '',
      department: teacher.department,
      qualification: teacher.qualification,
      specialization: teacher.specialization || '',
      salary: teacher.salary || 55000
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;
    try {
      const targetId = editingTeacher.id || (editingTeacher as any)._id;
      const updated = await apiService.updateTeacher(targetId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        mobile: formData.phone,
        department: formData.department,
        qualification: formData.qualification,
        salary: formData.salary
      });
      if (updated) {
        toast.success('Faculty profile updated successfully!');
        await loadTeachers();
        setIsEditModalOpen(false);
        setEditingTeacher(null);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update faculty record');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingTeacherId) return;
    try {
      const res = await apiService.deleteTeacher(deletingTeacherId);
      toast.success(res.message || 'Faculty record deleted successfully!');
      await loadTeachers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete faculty record');
    } finally {
      setDeletingTeacherId(null);
    }
  };

  const columns: Column<Teacher>[] = [
    {
      header: 'Faculty Member',
      cell: row => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'}
            alt=""
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-purple-500/30"
          />
          <div>
            <p className="font-bold text-white leading-tight">{row.fullName || `${row.firstName || ''} ${row.lastName || ''}`}</p>
            <p className="text-[10px] text-slate-400">{row.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Employee ID', accessorKey: 'employeeId' },
    {
      header: 'Department',
      cell: row => (
        <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 font-semibold border border-purple-500/20 text-xs">
          {row.department}
        </span>
      )
    },
    { header: 'Qualification', accessorKey: 'qualification' },
    {
      header: 'Monthly Salary',
      cell: row => <span className="font-bold text-emerald-400">${(row.salary || 50000).toLocaleString()}</span>
    },
    {
      header: 'Actions',
      cell: row => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-amber-400 transition-colors"
            title="Edit Teacher"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingTeacherId(row.id || (row as any)._id)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
            title="Delete Teacher"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Teacher & Faculty Management</h1>
        <p className="text-xs text-slate-400 mt-1">Manage teaching staff credentials, subject allocations, salaries, and department assignments.</p>
      </div>

      <DataTable
        title="Faculty Staff Registry"
        description="Comprehensive list of active teaching faculty"
        columns={columns}
        data={teachers}
        onAddClick={() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            department: 'Mathematics',
            qualification: 'M.Sc. Mathematics',
            specialization: 'Applied Math',
            salary: 55000
          });
          setIsModalOpen(true);
        }}
        addButtonText="Add Faculty Member"
        exportFileName="faculty_registry_2026"
      />

      {/* Register Faculty Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Faculty Member">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Highest Qualification</label>
              <input
                type="text"
                required
                value={formData.qualification}
                onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Salary ($)</label>
            <input
              type="number"
              required
              value={formData.salary}
              onChange={e => setFormData({ ...formData, salary: Number(e.target.value) })}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Register Faculty Member
          </button>
        </form>
      </Modal>

      {/* Edit Faculty Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Faculty Profile">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Highest Qualification</label>
              <input
                type="text"
                required
                value={formData.qualification}
                onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Salary ($)</label>
            <input
              type="number"
              required
              value={formData.salary}
              onChange={e => setFormData({ ...formData, salary: Number(e.target.value) })}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Update Faculty Profile
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingTeacherId}
        onClose={() => setDeletingTeacherId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Faculty Member"
        message="Are you sure you want to delete this faculty member? This action will permanently remove the record."
        confirmText="Delete Faculty"
      />
    </div>
  );
};
