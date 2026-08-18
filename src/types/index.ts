export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'principal'
  | 'teacher'
  | 'student'
  | 'parent'
  | 'accountant'
  | 'librarian'
  | 'receptionist'
  | 'hr'
  | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  schoolId?: string;
  createdAt?: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  rollNo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  className: string;
  section: string;
  parentName: string;
  parentContact: string;
  address: string;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
  admissionDate: string;
  avatar?: string;
  feesPaid?: number;
  totalFees?: number;
  attendanceRate?: number;
}

export interface Teacher {
  id: string;
  employeeId?: string;
  teacherId?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phone?: string;
  mobile?: string;
  department: string;
  qualification: string;
  specialization?: string;
  subjects?: string[];
  experienceYears?: number;
  salary: number;
  joiningDate?: string;
  status?: 'Active' | 'On Leave' | 'Terminated' | 'Inactive' | string;
  avatar?: string;
}

export interface Employee {
  id: string;
  employeeId?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phone?: string;
  role: 'HR' | 'Accountant' | 'Receptionist' | 'Librarian' | 'Office Staff' | 'Security' | 'Driver' | string;
  department: string;
  designation: string;
  salary: number;
  joiningDate?: string;
  shift?: 'Morning' | 'Evening' | 'Night' | string;
  status?: 'Active' | 'On Leave' | 'Inactive' | string;
}

export interface ClassItem {
  id: string;
  name: string;
  section: string;
  roomNumber: string;
  capacity: number;
  enrolledStudents: number;
  classTeacher: string;
  subjectsCount: number;
}

export interface SubjectItem {
  id: string;
  code: string;
  name: string;
  department: string;
  teacherName: string;
  credits: number;
  totalHours: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  section: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  remarks?: string;
}

export interface HomeworkItem {
  id: string;
  title: string;
  subject: string;
  className: string;
  section: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  description: string;
  submissionsCount: number;
  totalStudents: number;
}

export interface ExamItem {
  id: string;
  title: string;
  examType: 'Mid-Term' | 'Final' | 'Unit Test' | 'Quiz';
  className: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  maxMarks: number;
  passingMarks: number;
  roomNo: string;
}

export interface ResultItem {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  className: string;
  section: string;
  examTitle: string;
  subjectMarks: { subject: string; marksObtained: number; maxMarks: number; grade: string }[];
  totalMarks: number;
  maxTotalMarks: number;
  percentage: number;
  gpa: number;
  rank: number;
  status: 'Pass' | 'Fail';
}

export interface FeeItem {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  invoiceNo: string;
  tuitionFee: number;
  transportFee: number;
  libraryFee: number;
  hostelFee: number;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
}

export interface PayrollItem {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  monthYear: string;
  basicSalary: number;
  hra: number;
  allowances: number;
  pfDeduction: number;
  taxDeduction: number;
  netSalary: number;
  paymentDate: string;
  status: 'Paid' | 'Pending';
}

export interface LeaveItem {
  id: string;
  applicantName: string;
  role: 'Student' | 'Teacher' | 'Employee';
  leaveType: 'Casual' | 'Sick' | 'Maternity' | 'Emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

export interface LibraryBookItem {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  copies: number;
  availableCopies: number;
  rackLocation: string;
  status: 'Available' | 'Low Stock' | 'Out of Stock';
}

export interface HostelRoomItem {
  id: string;
  hostelName: string;
  roomNo: string;
  capacity: number;
  occupied: number;
  type: 'Single' | 'Double' | 'Dormitory';
  monthlyFee: number;
}

export interface TransportRouteItem {
  id: string;
  routeName: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  stopsCount: number;
  studentsCount: number;
  capacity: number;
}

export interface InventoryItem {
  id: string;
  itemName: string;
  category: 'Furniture' | 'Computers' | 'Sports' | 'Lab Equipment' | 'Stationery';
  quantity: number;
  unitPrice: number;
  totalValue: number;
  condition: 'New' | 'Good' | 'Needs Repair' | 'Scrapped';
  location: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: 'General' | 'Academic' | 'Sports' | 'Exam' | 'Emergency';
  targetAudience: 'All' | 'Students' | 'Teachers' | 'Parents';
  date: string;
  postedBy: string;
  content: string;
  pinned: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Sports' | 'Cultural' | 'Academic' | 'Holiday' | 'Workshop';
  description: string;
}
