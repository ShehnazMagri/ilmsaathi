import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiService } from '../../services/api';
import { Employee } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Edit3, Trash2 } from 'lucide-react';

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    department: string;
    designation: string;
    salary: number;
    shift: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'HR',
    department: 'Human Resources',
    designation: 'Staff Executive',
    salary: 45000,
    shift: 'Morning'
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await apiService.getEmployees();
    setEmployees(data);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiService.createEmployee({
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        department: formData.department,
        designation: formData.designation,
        salary: formData.salary,
        joiningDate: new Date().toISOString().split('T')[0],
        shift: formData.shift,
        status: 'Active'
      });
      if (created) {
        toast.success('Employee registered successfully!');
        await loadEmployees();
        setIsModalOpen(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          role: 'HR',
          department: 'Human Resources',
          designation: 'Staff Executive',
          salary: 45000,
          shift: 'Morning'
        });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to register employee');
    }
  };

  const handleEditClick = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({
      firstName: emp.firstName || emp.fullName?.split(' ')[0] || '',
      lastName: emp.lastName || emp.fullName?.split(' ').slice(1).join(' ') || '',
      email: emp.email,
      phone: emp.phone || '',
      role: emp.role,
      department: emp.department,
      designation: emp.designation,
      salary: emp.salary || 45000,
      shift: emp.shift || 'Morning'
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmployee) return;
    try {
      const targetId = editingEmployee.id || (editingEmployee as any)._id;
      const updated = await apiService.updateEmployee(targetId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        department: formData.department,
        designation: formData.designation,
        salary: formData.salary,
        shift: formData.shift
      });
      if (updated) {
        toast.success('Employee profile updated successfully!');
        await loadEmployees();
        setIsEditModalOpen(false);
        setEditingEmployee(null);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update employee record');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingEmployeeId) return;
    try {
      const res = await apiService.deleteEmployee(deletingEmployeeId);
      toast.success(res.message || 'Employee record deleted successfully!');
      await loadEmployees();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete employee record');
    } finally {
      setDeletingEmployeeId(null);
    }
  };

  const columns: Column<Employee>[] = [
    {
      header: 'Employee Profile',
      cell: row => (
        <div>
          <p className="font-bold text-white leading-tight">{row.fullName || `${row.firstName || ''} ${row.lastName || ''}`}</p>
          <p className="text-[10px] text-slate-400">{row.email}</p>
        </div>
      )
    },
    { header: 'Employee ID', accessorKey: 'employeeId' },
    {
      header: 'Role',
      cell: row => (
        <span className="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 font-semibold border border-pink-500/20 text-xs">
          {row.role}
        </span>
      )
    },
    { header: 'Department', accessorKey: 'department' },
    { header: 'Designation', accessorKey: 'designation' },
    {
      header: 'Monthly Salary',
      cell: row => <span className="font-bold text-emerald-400">${(row.salary || 35000).toLocaleString()}</span>
    },
    {
      header: 'Actions',
      cell: row => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditClick(row)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-amber-400 transition-colors"
            title="Edit Employee"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingEmployeeId(row.id || (row as any)._id)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 transition-colors"
            title="Delete Employee"
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
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Administrative & Staff Management</h1>
        <p className="text-xs text-slate-400 mt-1">Manage non-teaching staff including HR, Accountants, Librarians, Receptionists, and Maintenance personnel.</p>
      </div>

      <DataTable
        title="School Staff Directory"
        description="Comprehensive list of active non-faculty staff members"
        columns={columns}
        data={employees}
        onAddClick={() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: 'HR',
            department: 'Human Resources',
            designation: 'Staff Executive',
            salary: 45000,
            shift: 'Morning'
          });
          setIsModalOpen(true);
        }}
        addButtonText="Add Staff Employee"
        exportFileName="staff_directory_2026"
      />

      {/* Add Staff Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Administrative Employee">
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              >
                <option value="HR">HR</option>
                <option value="Accountant">Accountant</option>
                <option value="Librarian">Librarian</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Office Staff">Office Staff</option>
                <option value="Security">Security</option>
                <option value="Driver">Driver</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Designation</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Shift</label>
              <select
                value={formData.shift}
                onChange={e => setFormData({ ...formData, shift: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Save Employee Profile
          </button>
        </form>
      </Modal>

      {/* Edit Staff Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Employee Profile">
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              >
                <option value="HR">HR</option>
                <option value="Accountant">Accountant</option>
                <option value="Librarian">Librarian</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Office Staff">Office Staff</option>
                <option value="Security">Security</option>
                <option value="Driver">Driver</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Designation</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Update Employee Profile
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingEmployeeId}
        onClose={() => setDeletingEmployeeId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee Record"
        message="Are you sure you want to delete this employee record? This action will permanently remove the record."
        confirmText="Delete Employee"
      />
    </div>
  );
};
