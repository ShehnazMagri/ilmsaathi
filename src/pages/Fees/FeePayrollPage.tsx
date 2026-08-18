import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { FeeItem, PayrollItem } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { Modal } from '../../components/common/Modal';
import { CreditCard, DollarSign, Printer, CheckCircle2 } from 'lucide-react';

export const FeePayrollPage: React.FC = () => {
  const [fees, setFees] = useState<FeeItem[]>([]);
  const [payroll, setPayroll] = useState<PayrollItem[]>([]);
  const [activeTab, setActiveTab] = useState<'fees' | 'payroll'>('fees');
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollItem | null>(null);

  useEffect(() => {
    apiService.getFees().then(setFees);
    apiService.getPayroll().then(setPayroll);
  }, []);

  const markFeeAsPaid = (id: string) => {
    setFees(prev =>
      prev.map(f => (f.id === id ? { ...f, status: 'Paid', paidAmount: f.totalAmount } : f))
    );
  };

  const feeColumns: Column<FeeItem>[] = [
    { header: 'Invoice No', accessorKey: 'invoiceNo' },
    {
      header: 'Student Name',
      cell: row => <span className="font-bold text-white">{row.studentName}</span>
    },
    { header: 'Class', accessorKey: 'className' },
    {
      header: 'Tuition & Charges',
      cell: row => (
        <span className="text-xs text-slate-300">
          Tuition: ${row.tuitionFee} • Bus: ${row.transportFee} • Lib: ${row.libraryFee}
        </span>
      )
    },
    {
      header: 'Total Amount',
      cell: row => <span className="font-bold text-white">${row.totalAmount}</span>
    },
    {
      header: 'Payment Status',
      cell: row => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            row.status === 'Paid'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {row.status} (${row.paidAmount} Paid)
        </span>
      )
    },
    {
      header: 'Action',
      cell: row =>
        row.status !== 'Paid' ? (
          <button
            onClick={() => markFeeAsPaid(row.id)}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all"
          >
            Mark Paid
          </button>
        ) : (
          <span className="text-xs text-slate-500 font-semibold">Settled</span>
        )
    }
  ];

  const payrollColumns: Column<PayrollItem>[] = [
    { header: 'Employee ID', accessorKey: 'employeeId' },
    {
      header: 'Employee Name',
      cell: row => <span className="font-bold text-white">{row.employeeName}</span>
    },
    { header: 'Role', accessorKey: 'role' },
    { header: 'Pay Period', accessorKey: 'monthYear' },
    {
      header: 'Basic Salary',
      cell: row => <span>${row.basicSalary.toLocaleString()}</span>
    },
    {
      header: 'Deductions (PF/Tax)',
      cell: row => <span className="text-rose-400">-${(row.pfDeduction + row.taxDeduction).toLocaleString()}</span>
    },
    {
      header: 'Net Payable Salary',
      cell: row => <span className="font-bold text-emerald-400 text-sm">${row.netSalary.toLocaleString()}</span>
    },
    {
      header: 'Payslip',
      cell: row => (
        <button
          onClick={() => setSelectedPayslip(row)}
          className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Payslip</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Fees & Payroll Management</h1>
          <p className="text-xs text-slate-400 mt-1">Manage student fee invoices, online payment tracking, teacher & staff payroll slips.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5">
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'fees' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Student Fees ({fees.length})
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'payroll' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Staff Payroll ({payroll.length})
          </button>
        </div>
      </div>

      {activeTab === 'fees' ? (
        <DataTable
          title="Student Fee Ledger"
          description="Invoices, due amounts, and online payment status"
          columns={feeColumns}
          data={fees}
          exportFileName="fee_ledger_2026"
        />
      ) : (
        <DataTable
          title="Employee Payroll Register"
          description="Salary disbursal, HRA, PF deductions, net pay"
          columns={payrollColumns}
          data={payroll}
          exportFileName="payroll_register_2026"
        />
      )}

      {/* Payslip View Modal */}
      {selectedPayslip && (
        <Modal isOpen={!!selectedPayslip} onClose={() => setSelectedPayslip(null)} title="Official Salary Payslip">
          <div className="space-y-4 text-xs text-slate-200">
            <div className="text-center pb-3 border-b border-slate-700">
              <h2 className="text-lg font-bold text-indigo-400">Aura International School ERP</h2>
              <p className="text-slate-400">Salary Slip for Period: {selectedPayslip.monthYear}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-800/60 rounded-xl">
              <div>
                <p>Employee: <strong className="text-white">{selectedPayslip.employeeName}</strong></p>
                <p>ID: <strong className="text-white">{selectedPayslip.employeeId}</strong></p>
              </div>
              <div>
                <p>Role / Dept: <strong className="text-white">{selectedPayslip.role}</strong></p>
                <p>Disbursal Date: <strong className="text-emerald-400">{selectedPayslip.paymentDate}</strong></p>
              </div>
            </div>

            <div className="space-y-2 border-t border-b border-slate-800 py-3">
              <div className="flex justify-between">
                <span>Basic Salary:</span>
                <span className="font-bold text-white">${selectedPayslip.basicSalary}</span>
              </div>
              <div className="flex justify-between">
                <span>House Rent Allowance (HRA):</span>
                <span className="font-bold text-white">${selectedPayslip.hra}</span>
              </div>
              <div className="flex justify-between">
                <span>Special Allowances:</span>
                <span className="font-bold text-white">${selectedPayslip.allowances}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Provident Fund (PF):</span>
                <span>-${selectedPayslip.pfDeduction}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Tax Deduction:</span>
                <span>-${selectedPayslip.taxDeduction}</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl font-bold text-sm">
              <span>Net Salary Paid:</span>
              <span className="text-emerald-400">${selectedPayslip.netSalary.toLocaleString()}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
