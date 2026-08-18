import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/api';
import {
  Users,
  GraduationCap,
  Briefcase,
  CalendarCheck,
  DollarSign,
  CreditCard,
  Bell,
  PlusCircle,
  FileText,
  Send,
  Award,
  BookOpen,
  ClipboardList
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 45000, expense: 28000 },
  { month: 'Feb', revenue: 52000, expense: 30000 },
  { month: 'Mar', revenue: 49000, expense: 29000 },
  { month: 'Apr', revenue: 68000, expense: 35000 },
  { month: 'May', revenue: 61000, expense: 32000 },
  { month: 'Jun', revenue: 75000, expense: 38000 },
  { month: 'Jul', revenue: 82000, expense: 41000 },
];

const ATTENDANCE_PIE = [
  { name: 'Present', value: 92, color: '#10B981' },
  { name: 'Late', value: 5, color: '#F59E0B' },
  { name: 'Absent', value: 3, color: '#EF4444' },
];

export const DashboardPage: React.FC = () => {
  const { user, role } = useAuth();

  const [studentCount, setStudentCount] = useState<number>(0);
  const [teacherCount, setTeacherCount] = useState<number>(0);
  const [employeeCount, setEmployeeCount] = useState<number>(0);

  useEffect(() => {
    loadDashboardCounts();
  }, []);

  const loadDashboardCounts = async () => {
    try {
      const students = await apiService.getStudents();
      setStudentCount(students?.length || 0);

      const teachers = await apiService.getTeachers();
      setTeacherCount(teachers?.length || 0);

      const employees = await apiService.getEmployees();
      setEmployeeCount(employees?.length || 0);
    } catch (err) {
      console.warn('[Dashboard Load Warning]', err);
    }
  };

  const isStudent = role === 'student';
  const isTeacher = role === 'teacher';
  const isAdmin = !isStudent && !isTeacher;

  return (
    <div className="space-y-8">
      {/* Top Greeting Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-2xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            {isStudent ? 'Student Academic Dashboard' : isTeacher ? 'Faculty & Teacher Portal' : 'Enterprise ERP Admin'}
          </div>
          <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 max-w-xl">
            {isStudent
              ? 'View your personal class schedule, exam performance, fee status, and attendance rate.'
              : isTeacher
              ? 'Manage your assigned subjects, class rosters, grade entry, and student attendance.'
              : 'Here is your live overview of school operations, student enrollment, financial collections, and faculty.'}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none hidden md:block">
          <GraduationCap className="w-96 h-96 text-indigo-300 -mr-12 -mb-12" />
        </div>
      </div>

      {/* STUDENT PORTAL DASHBOARD VIEW */}
      {isStudent && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Attendance Rate"
              value="96.5%"
              change="Required: 75%"
              isPositive={true}
              icon={CalendarCheck}
              gradient="from-emerald-900/50 to-slate-900"
              iconBg="bg-emerald-600"
              subtext="132 days present"
            />
            <StatCard
              title="Current GPA"
              value="3.9"
              change="Rank #1 in Class"
              isPositive={true}
              icon={Award}
              gradient="from-indigo-900/50 to-slate-900"
              iconBg="bg-indigo-600"
              subtext="Academic Session 2026"
            />
            <StatCard
              title="Assigned Subjects"
              value="6"
              change="120 Total Hours"
              isPositive={true}
              icon={BookOpen}
              gradient="from-purple-900/50 to-slate-900"
              iconBg="bg-purple-600"
              subtext="Class 10 - Section A"
            />
            <StatCard
              title="Tuition Fees Paid"
              value="$4,500"
              change="Balance: $500"
              isPositive={true}
              icon={DollarSign}
              gradient="from-amber-900/50 to-slate-900"
              iconBg="bg-amber-600"
              subtext="Term 2 Clearance"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>My Active Enrolled Courses & Syllabus</span>
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs">Advanced Mathematics (MATH-101)</h4>
                    <p className="text-[10px] text-slate-400">Instructor: Dr. Robert Langdon | 4 Credits</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/20">Grade: A+</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs">Organic Chemistry & Biochemistry (CHEM-101)</h4>
                    <p className="text-[10px] text-slate-400">Instructor: Elena Rostova | 3 Credits</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/20">Grade: A</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-amber-400" />
                <span>Student Action Portal</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/leaves" className="p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all text-xs font-bold block text-center">
                  Apply for Leave
                </Link>
                <Link to="/exams-results" className="p-4 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-all text-xs font-bold block text-center">
                  View Report Card
                </Link>
                <Link to="/fees" className="p-4 rounded-2xl bg-amber-600/10 border border-amber-500/20 hover:bg-amber-600 text-amber-300 hover:text-white transition-all text-xs font-bold block text-center">
                  Pay Tuition Fees
                </Link>
                <Link to="/homework" className="p-4 rounded-2xl bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600 text-purple-300 hover:text-white transition-all text-xs font-bold block text-center">
                  View Homework
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEACHER PORTAL DASHBOARD VIEW */}
      {isTeacher && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Assigned Classes"
              value="4 Sections"
              change="Class 10-A, 10-B, 9-A"
              isPositive={true}
              icon={Users}
              gradient="from-indigo-900/50 to-slate-900"
              iconBg="bg-indigo-600"
              subtext="148 Total Students"
            />
            <StatCard
              title="Subjects Taught"
              value="2 Courses"
              change="Maths & Physics"
              isPositive={true}
              icon={BookOpen}
              gradient="from-purple-900/50 to-slate-900"
              iconBg="bg-purple-600"
              subtext="Department of Science"
            />
            <StatCard
              title="Pending Homeworks"
              value="3 Sheets"
              change="32 Submitted"
              isPositive={true}
              icon={ClipboardList}
              gradient="from-emerald-900/50 to-slate-900"
              iconBg="bg-emerald-600"
              subtext="To be evaluated"
            />
            <StatCard
              title="Monthly Payout"
              value="$75,000"
              change="Status: Paid"
              isPositive={true}
              icon={DollarSign}
              gradient="from-amber-900/50 to-slate-900"
              iconBg="bg-amber-600"
              subtext="Ph.D Faculty Scale"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Student Roster & Grade Entry Portal</h3>
              <p className="text-xs text-slate-400">Prepare exam papers, update student marks, and mark attendance.</p>
              <div className="flex gap-3">
                <Link to="/students" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg">
                  View Student Registry
                </Link>
                <Link to="/exams-results" className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg">
                  Enter Subject Marks
                </Link>
                <Link to="/leaves" className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700">
                  Apply Teacher Leave
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Upcoming Class Timetable</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">Class 10-A (Maths)</p>
                    <p className="text-[10px] text-slate-400">09:00 AM - 10:00 AM</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">Room R-301</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">Class 9-B (Physics Lab)</p>
                    <p className="text-[10px] text-slate-400">11:15 AM - 12:30 PM</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold text-[10px]">Lab 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL ADMIN & MANAGEMENT OVERVIEW */}
      {isAdmin && (
        <>
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Enrolled Students"
              value={studentCount.toString()}
              change="Active System Directory"
              isPositive={true}
              icon={GraduationCap}
              gradient="from-indigo-900/50 to-slate-900"
              iconBg="bg-indigo-600"
              subtext="Registered Students"
            />
            <StatCard
              title="Teaching Faculty"
              value={teacherCount.toString()}
              change="Active System Directory"
              isPositive={true}
              icon={Users}
              gradient="from-purple-900/50 to-slate-900"
              iconBg="bg-purple-600"
              subtext="Faculty Members"
            />
            <StatCard
              title="Staff Employees"
              value={employeeCount.toString()}
              change="Active System Directory"
              isPositive={true}
              icon={Briefcase}
              gradient="from-pink-900/50 to-slate-900"
              iconBg="bg-pink-600"
              subtext="Administrative Personnel"
            />
            <StatCard
              title="Total Active Records"
              value={(studentCount + teacherCount + employeeCount).toString()}
              change="Real-time Database Count"
              isPositive={true}
              icon={DollarSign}
              gradient="from-amber-900/50 to-slate-900"
              iconBg="bg-amber-600"
              subtext="System Online"
            />
          </div>

          {/* Analytics Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Revenue & Expenses Overview</h3>
                  <p className="text-xs text-slate-400">Monthly breakdown of fee inflows and operational payouts</p>
                </div>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  FY 2026
                </span>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name="Revenue ($)" />
                    <Area type="monotone" dataKey="expense" stroke="#EC4899" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" name="Expense ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Daily Attendance Ratio</h3>
                <p className="text-xs text-slate-400">Real-time status breakdown for today</p>
              </div>

              <div className="h-52 w-full flex items-center justify-center my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ATTENDANCE_PIE} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {ATTENDANCE_PIE.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <span className="block text-emerald-400 font-bold text-sm">92%</span>
                  <span className="text-slate-400 text-[10px]">Present</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <span className="block text-amber-400 font-bold text-sm">5%</span>
                  <span className="text-slate-400 text-[10px]">Late</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <span className="block text-rose-400 font-bold text-sm">3%</span>
                  <span className="text-slate-400 text-[10px]">Absent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Operations Shortcuts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Quick Operations Shortcuts</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Link to="/students" className="p-3.5 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all text-left group block">
                  <PlusCircle className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold block">Manage Students</span>
                </Link>
                <Link to="/teachers" className="p-3.5 rounded-2xl bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600 text-purple-300 hover:text-white transition-all text-left group block">
                  <Users className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold block">Manage Faculty</span>
                </Link>
                <Link to="/employees" className="p-3.5 rounded-2xl bg-pink-600/10 border border-pink-500/20 hover:bg-pink-600 text-pink-300 hover:text-white transition-all text-left group block">
                  <Briefcase className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold block">Manage Employees</span>
                </Link>
                <Link to="/fees" className="p-3.5 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-all text-left group block">
                  <CreditCard className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold block">Collect Fees</span>
                </Link>
                <Link to="/exams-results" className="p-3.5 rounded-2xl bg-amber-600/10 border border-amber-500/20 hover:bg-amber-600 text-amber-300 hover:text-white transition-all text-left group block">
                  <Award className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold block">Exam Results</span>
                </Link>
                <Link to="/leaves" className="p-3.5 rounded-2xl bg-rose-600/10 border border-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-all text-left group block">
                  <FileText className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold block">Leave Approvals</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-indigo-400" />
                  <span>School Notice Board</span>
                </h3>
                <span className="text-xs font-bold text-slate-400">Live Announcements</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-400">Sports & Athletics</span>
                    <span className="text-[10px] text-slate-400">Aug 06, 2026</span>
                  </div>
                  <p className="text-xs font-bold text-white">Annual Athletic Trials & Sports Registrations</p>
                  <p className="text-[11px] text-slate-400">Trials for track & field events will commence next Tuesday at the main ground.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400">Academic Notice</span>
                    <span className="text-[10px] text-slate-400">Aug 05, 2026</span>
                  </div>
                  <p className="text-xs font-bold text-white">Mid-Term Exam Time-Table Published</p>
                  <p className="text-[11px] text-slate-400">The detailed subject-wise timetable is now accessible under the Exam Portal.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
