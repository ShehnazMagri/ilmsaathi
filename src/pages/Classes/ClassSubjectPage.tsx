import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { ClassItem, SubjectItem } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { BookOpen, Users, Building2, Plus, Trash2 } from 'lucide-react';

export const ClassSubjectPage: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [activeTab, setActiveTab] = useState<'classes' | 'subjects'>('classes');

  useEffect(() => {
    apiService.getClasses().then(setClasses);
    apiService.getSubjects().then(setSubjects);
  }, []);

  const classColumns: Column<ClassItem>[] = [
    {
      header: 'Class Name',
      cell: row => <span className="font-bold text-white text-base">{row.name}</span>
    },
    {
      header: 'Section',
      cell: row => (
        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-bold border border-indigo-500/20 text-xs">
          Section {row.section}
        </span>
      )
    },
    { header: 'Room Allocation', accessorKey: 'roomNumber' },
    {
      header: 'Student Occupancy',
      cell: row => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: `${(row.enrolledStudents / row.capacity) * 100}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-300">
            {row.enrolledStudents} / {row.capacity}
          </span>
        </div>
      )
    },
    { header: 'Class Teacher', accessorKey: 'classTeacher' },
    { header: 'Subjects Count', accessorKey: 'subjectsCount' }
  ];

  const subjectColumns: Column<SubjectItem>[] = [
    { header: 'Subject Code', accessorKey: 'code' },
    {
      header: 'Subject Title',
      cell: row => <span className="font-bold text-white">{row.name}</span>
    },
    { header: 'Department', accessorKey: 'department' },
    { header: 'Assigned Teacher', accessorKey: 'teacherName' },
    {
      header: 'Credits',
      cell: row => <span className="font-bold text-purple-400">{row.credits} Credits</span>
    },
    { header: 'Total Hours', accessorKey: 'totalHours' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Class & Subject Management</h1>
          <p className="text-xs text-slate-400 mt-1">Configure academic classes, section capacities, room numbers, and subject curricula.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5">
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'classes' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Classes ({classes.length})
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'subjects' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Subjects ({subjects.length})
          </button>
        </div>
      </div>

      {activeTab === 'classes' ? (
        <DataTable
          title="Active School Classes"
          description="Classes and room assignments for Session 2026"
          columns={classColumns}
          data={classes}
          exportFileName="classes_list"
        />
      ) : (
        <DataTable
          title="Academic Subjects Directory"
          description="Curriculum catalog and credit distribution"
          columns={subjectColumns}
          data={subjects}
          exportFileName="subjects_catalog"
        />
      )}
    </div>
  );
};
