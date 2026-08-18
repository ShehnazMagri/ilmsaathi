import {
  Student,
  Teacher,
  Employee,
  ClassItem,
  SubjectItem,
  AttendanceRecord,
  HomeworkItem,
  ExamItem,
  ResultItem,
  FeeItem,
  PayrollItem,
  LeaveItem,
  LibraryBookItem,
  HostelRoomItem,
  TransportRouteItem,
  InventoryItem,
  NoticeItem,
  EventItem
} from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    admissionNo: 'ADM-2025-001',
    rollNo: '101',
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@school.edu',
    phone: '+1 555-0192',
    gender: 'Male',
    dob: '2010-04-15',
    bloodGroup: 'A+',
    className: 'Class 10',
    section: 'A',
    parentName: 'David Morgan',
    parentContact: '+1 555-0193',
    address: '742 Evergreen Terrace, Springfield',
    status: 'Active',
    admissionDate: '2022-08-15',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    feesPaid: 4500,
    totalFees: 5000,
    attendanceRate: 96.5,
  },
  {
    id: 'std-2',
    admissionNo: 'ADM-2025-002',
    rollNo: '102',
    firstName: 'Sophia',
    lastName: 'Chen',
    email: 'sophia.chen@school.edu',
    phone: '+1 555-0144',
    gender: 'Female',
    dob: '2010-08-22',
    bloodGroup: 'O+',
    className: 'Class 10',
    section: 'A',
    parentName: 'Michael Chen',
    parentContact: '+1 555-0145',
    address: '128 Willow Creek Way, Austin',
    status: 'Active',
    admissionDate: '2022-08-15',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    feesPaid: 5000,
    totalFees: 5000,
    attendanceRate: 98.2,
  },
  {
    id: 'std-3',
    admissionNo: 'ADM-2025-003',
    rollNo: '103',
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'marcus.vance@school.edu',
    phone: '+1 555-0188',
    gender: 'Male',
    dob: '2010-11-03',
    bloodGroup: 'B+',
    className: 'Class 10',
    section: 'B',
    parentName: 'Sarah Vance',
    parentContact: '+1 555-0189',
    address: '404 Metro Boulevard, Seattle',
    status: 'Active',
    admissionDate: '2023-01-10',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    feesPaid: 2500,
    totalFees: 5000,
    attendanceRate: 91.0,
  },
  {
    id: 'std-4',
    admissionNo: 'ADM-2025-004',
    rollNo: '104',
    firstName: 'Emma',
    lastName: 'Watson',
    email: 'emma.watson@school.edu',
    phone: '+1 555-0211',
    gender: 'Female',
    dob: '2011-01-19',
    bloodGroup: 'AB+',
    className: 'Class 9',
    section: 'A',
    parentName: 'John Watson',
    parentContact: '+1 555-0212',
    address: '55 Pine Crest Road, Boston',
    status: 'Active',
    admissionDate: '2023-08-20',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    feesPaid: 4800,
    totalFees: 4800,
    attendanceRate: 95.4,
  },
  {
    id: 'std-5',
    admissionNo: 'ADM-2025-005',
    rollNo: '105',
    firstName: 'Liam',
    lastName: 'O\'Connor',
    email: 'liam.oconnor@school.edu',
    phone: '+1 555-0377',
    gender: 'Male',
    dob: '2011-06-12',
    bloodGroup: 'O-',
    className: 'Class 9',
    section: 'B',
    parentName: 'Patrick O\'Connor',
    parentContact: '+1 555-0378',
    address: '89 Beacon Hill, Chicago',
    status: 'Active',
    admissionDate: '2023-08-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    feesPaid: 2000,
    totalFees: 4800,
    attendanceRate: 89.2,
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-1',
    employeeId: 'EMP-T-01',
    teacherId: 'TCH-101',
    fullName: 'Dr. Robert Langdon',
    email: 'robert.langdon@school.edu',
    mobile: '+1 555-7788',
    department: 'Mathematics & Physics',
    subjects: ['Advanced Mathematics', 'Physics Lab'],
    qualification: 'Ph.D. Applied Mathematics',
    experienceYears: 12,
    salary: 75000,
    joiningDate: '2018-06-01',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'tch-2',
    employeeId: 'EMP-T-02',
    teacherId: 'TCH-102',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@school.edu',
    mobile: '+1 555-8899',
    department: 'Science',
    subjects: ['Chemistry', 'Biology'],
    qualification: 'M.Sc. Biochemistry',
    experienceYears: 8,
    salary: 68000,
    joiningDate: '2020-08-15',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'tch-3',
    employeeId: 'EMP-T-03',
    teacherId: 'TCH-103',
    fullName: 'Prof. Jonathan Vance',
    email: 'jonathan.vance@school.edu',
    mobile: '+1 555-9900',
    department: 'Humanities & Literature',
    subjects: ['English Literature', 'World History'],
    qualification: 'M.A. English & History',
    experienceYears: 15,
    salary: 78000,
    joiningDate: '2015-09-01',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    employeeId: 'EMP-A-01',
    fullName: 'Samantha Miller',
    email: 'samantha.hr@school.edu',
    phone: '+1 555-1122',
    role: 'HR',
    department: 'Human Resources',
    designation: 'Senior HR Manager',
    salary: 62000,
    joiningDate: '2019-03-10',
    shift: 'Morning',
    status: 'Active'
  },
  {
    id: 'emp-2',
    employeeId: 'EMP-F-01',
    fullName: 'Arthur Dent',
    email: 'arthur.finance@school.edu',
    phone: '+1 555-2233',
    role: 'Accountant',
    department: 'Finance & Accounts',
    designation: 'Chief Accountant',
    salary: 65000,
    joiningDate: '2017-11-01',
    shift: 'Morning',
    status: 'Active'
  },
  {
    id: 'emp-3',
    employeeId: 'EMP-L-01',
    fullName: 'Clara Oswald',
    email: 'clara.library@school.edu',
    phone: '+1 555-3344',
    role: 'Librarian',
    department: 'Library Services',
    designation: 'Head Librarian',
    salary: 54000,
    joiningDate: '2021-01-15',
    shift: 'Morning',
    status: 'Active'
  },
  {
    id: 'emp-4',
    employeeId: 'EMP-R-01',
    fullName: 'Grace Hopper',
    email: 'grace.reception@school.edu',
    phone: '+1 555-4455',
    role: 'Receptionist',
    department: 'Administration',
    designation: 'Front Desk Executive',
    salary: 42000,
    joiningDate: '2022-05-20',
    shift: 'Morning',
    status: 'Active'
  }
];

export const INITIAL_CLASSES: ClassItem[] = [
  { id: 'cls-1', name: 'Class 10', section: 'A', roomNumber: 'R-301', capacity: 40, enrolledStudents: 38, classTeacher: 'Dr. Robert Langdon', subjectsCount: 6 },
  { id: 'cls-2', name: 'Class 10', section: 'B', roomNumber: 'R-302', capacity: 40, enrolledStudents: 36, classTeacher: 'Elena Rostova', subjectsCount: 6 },
  { id: 'cls-3', name: 'Class 9', section: 'A', roomNumber: 'R-201', capacity: 40, enrolledStudents: 39, classTeacher: 'Prof. Jonathan Vance', subjectsCount: 6 },
  { id: 'cls-4', name: 'Class 9', section: 'B', roomNumber: 'R-202', capacity: 40, enrolledStudents: 35, classTeacher: 'Sarah Jenkins', subjectsCount: 6 },
];

export const INITIAL_SUBJECTS: SubjectItem[] = [
  { id: 'sbj-1', code: 'MATH-101', name: 'Advanced Mathematics', department: 'Mathematics', teacherName: 'Dr. Robert Langdon', credits: 4, totalHours: 120 },
  { id: 'sbj-2', code: 'PHYS-101', name: 'Physics & Mechanics', department: 'Science', teacherName: 'Dr. Robert Langdon', credits: 4, totalHours: 100 },
  { id: 'sbj-3', code: 'CHEM-101', name: 'Organic & Inorganic Chemistry', department: 'Science', teacherName: 'Elena Rostova', credits: 3, totalHours: 90 },
  { id: 'sbj-4', code: 'ENG-101', name: 'English Literature & Grammar', department: 'Humanities', teacherName: 'Prof. Jonathan Vance', credits: 3, totalHours: 80 },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'std-1', studentName: 'Alex Morgan', className: 'Class 10', section: 'A', date: '2026-08-06', status: 'Present', remarks: 'On time' },
  { id: 'att-2', studentId: 'std-2', studentName: 'Sophia Chen', className: 'Class 10', section: 'A', date: '2026-08-06', status: 'Present', remarks: 'On time' },
  { id: 'att-3', studentId: 'std-3', studentName: 'Marcus Vance', className: 'Class 10', section: 'B', date: '2026-08-06', status: 'Late', remarks: '10 min late' },
  { id: 'att-4', studentId: 'std-4', studentName: 'Emma Watson', className: 'Class 9', section: 'A', date: '2026-08-06', status: 'Present', remarks: 'On time' },
  { id: 'att-5', studentId: 'std-5', studentName: 'Liam O\'Connor', className: 'Class 9', section: 'B', date: '2026-08-06', status: 'Absent', remarks: 'Sick leave notice submitted' },
];

export const INITIAL_HOMEWORK: HomeworkItem[] = [
  {
    id: 'hw-1',
    title: 'Quadratic Equations & Calculus Sheet',
    subject: 'Advanced Mathematics',
    className: 'Class 10',
    section: 'A',
    assignedBy: 'Dr. Robert Langdon',
    assignedDate: '2026-08-04',
    dueDate: '2026-08-08',
    description: 'Solve problems 1 to 25 on page 142 of the Advanced Math textbook.',
    submissionsCount: 32,
    totalStudents: 38
  },
  {
    id: 'hw-2',
    title: 'Chemical Reactions & Periodic Table Lab Report',
    subject: 'Organic & Inorganic Chemistry',
    className: 'Class 10',
    section: 'A',
    assignedBy: 'Elena Rostova',
    assignedDate: '2026-08-05',
    dueDate: '2026-08-09',
    description: 'Submit detailed observation tables for the acid-base titration lab.',
    submissionsCount: 28,
    totalStudents: 38
  }
];

export const INITIAL_EXAMS: ExamItem[] = [
  { id: 'ex-1', title: 'Mid-Term Mathematics Exam', examType: 'Mid-Term', className: 'Class 10', subject: 'Advanced Mathematics', date: '2026-08-15', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 40, roomNo: 'Hall A' },
  { id: 'ex-2', title: 'Mid-Term Chemistry Exam', examType: 'Mid-Term', className: 'Class 10', subject: 'Chemistry', date: '2026-08-17', startTime: '09:00 AM', endTime: '12:00 PM', maxMarks: 100, passingMarks: 40, roomNo: 'Hall B' },
];

export const INITIAL_RESULTS: ResultItem[] = [
  {
    id: 'res-1',
    studentId: 'std-1',
    studentName: 'Alex Morgan',
    rollNo: '101',
    className: 'Class 10',
    section: 'A',
    examTitle: 'Unit Test I 2026',
    subjectMarks: [
      { subject: 'Advanced Mathematics', marksObtained: 94, maxMarks: 100, grade: 'A+' },
      { subject: 'Physics', marksObtained: 88, maxMarks: 100, grade: 'A' },
      { subject: 'Chemistry', marksObtained: 91, maxMarks: 100, grade: 'A+' },
      { subject: 'English', marksObtained: 85, maxMarks: 100, grade: 'A' },
    ],
    totalMarks: 358,
    maxTotalMarks: 400,
    percentage: 89.5,
    gpa: 3.9,
    rank: 1,
    status: 'Pass'
  },
  {
    id: 'res-2',
    studentId: 'std-2',
    studentName: 'Sophia Chen',
    rollNo: '102',
    className: 'Class 10',
    section: 'A',
    examTitle: 'Unit Test I 2026',
    subjectMarks: [
      { subject: 'Advanced Mathematics', marksObtained: 90, maxMarks: 100, grade: 'A+' },
      { subject: 'Physics', marksObtained: 92, maxMarks: 100, grade: 'A+' },
      { subject: 'Chemistry', marksObtained: 89, maxMarks: 100, grade: 'A' },
      { subject: 'English', marksObtained: 86, maxMarks: 100, grade: 'A' },
    ],
    totalMarks: 357,
    maxTotalMarks: 400,
    percentage: 89.25,
    gpa: 3.88,
    rank: 2,
    status: 'Pass'
  }
];

export const INITIAL_FEES: FeeItem[] = [
  { id: 'fee-1', studentId: 'std-1', studentName: 'Alex Morgan', className: 'Class 10', invoiceNo: 'INV-2026-001', tuitionFee: 3500, transportFee: 800, libraryFee: 200, hostelFee: 0, totalAmount: 4500, paidAmount: 4500, dueDate: '2026-08-01', status: 'Paid' },
  { id: 'fee-2', studentId: 'std-2', studentName: 'Sophia Chen', className: 'Class 10', invoiceNo: 'INV-2026-002', tuitionFee: 3500, transportFee: 800, libraryFee: 200, hostelFee: 500, totalAmount: 5000, paidAmount: 5000, dueDate: '2026-08-01', status: 'Paid' },
  { id: 'fee-3', studentId: 'std-3', studentName: 'Marcus Vance', className: 'Class 10', invoiceNo: 'INV-2026-003', tuitionFee: 3500, transportFee: 800, libraryFee: 200, hostelFee: 500, totalAmount: 5000, paidAmount: 2500, dueDate: '2026-08-01', status: 'Partial' },
];

export const INITIAL_PAYROLL: PayrollItem[] = [
  { id: 'pay-1', employeeId: 'EMP-T-01', employeeName: 'Dr. Robert Langdon', role: 'Teacher', monthYear: 'July 2026', basicSalary: 50000, hra: 15000, allowances: 10000, pfDeduction: 4000, taxDeduction: 6000, netSalary: 65000, paymentDate: '2026-07-31', status: 'Paid' },
  { id: 'pay-2', employeeId: 'EMP-T-02', employeeName: 'Elena Rostova', role: 'Teacher', monthYear: 'July 2026', basicSalary: 45000, hra: 13000, allowances: 10000, pfDeduction: 3600, taxDeduction: 4400, netSalary: 60000, paymentDate: '2026-07-31', status: 'Paid' },
];

export const INITIAL_LEAVES: LeaveItem[] = [
  { id: 'lv-1', applicantName: 'Liam O\'Connor', role: 'Student', leaveType: 'Sick', startDate: '2026-08-06', endDate: '2026-08-07', days: 2, reason: 'High fever and doctor recommendation rest', status: 'Approved', appliedOn: '2026-08-05' },
  { id: 'lv-2', applicantName: 'Elena Rostova', role: 'Teacher', leaveType: 'Casual', startDate: '2026-08-12', endDate: '2026-08-13', days: 2, reason: 'Attending educational symposium in NYC', status: 'Pending', appliedOn: '2026-08-06' },
];

export const INITIAL_BOOKS: LibraryBookItem[] = [
  { id: 'bk-1', isbn: '978-0134685991', title: 'Calculus & Analytical Geometry', author: 'George B. Thomas', category: 'Mathematics', copies: 15, availableCopies: 11, rackLocation: 'Shelf A-4', status: 'Available' },
  { id: 'bk-2', isbn: '978-0321740908', title: 'Sears and Zemansky\'s University Physics', author: 'Hugh D. Young', category: 'Physics', copies: 20, availableCopies: 14, rackLocation: 'Shelf B-2', status: 'Available' },
];

export const INITIAL_HOSTELS: HostelRoomItem[] = [
  { id: 'hst-1', hostelName: 'Olympus Hall (Boys)', roomNo: 'R-101', capacity: 2, occupied: 2, type: 'Double', monthlyFee: 500 },
  { id: 'hst-2', hostelName: 'Athena Hall (Girls)', roomNo: 'G-204', capacity: 2, occupied: 1, type: 'Double', monthlyFee: 500 },
];

export const INITIAL_TRANSPORT: TransportRouteItem[] = [
  { id: 'trp-1', routeName: 'Route #1 - Downtown Express', vehicleNo: 'BUS-102', driverName: 'Robert Paulson', driverPhone: '+1 555-7711', stopsCount: 8, studentsCount: 34, capacity: 40 },
  { id: 'trp-2', routeName: 'Route #2 - Westside Shuttle', vehicleNo: 'BUS-105', driverName: 'Frank Martin', driverPhone: '+1 555-8822', stopsCount: 6, studentsCount: 28, capacity: 40 },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', itemName: 'Dell OptiPlex Core i7 Workstations', category: 'Computers', quantity: 45, unitPrice: 850, totalValue: 38250, condition: 'Good', location: 'Computer Lab 1' },
  { id: 'inv-2', itemName: 'Ergonomic Classroom Benches & Desks', category: 'Furniture', quantity: 300, unitPrice: 120, totalValue: 36000, condition: 'Good', location: 'Main Building Block A' },
];

export const INITIAL_NOTICES: NoticeItem[] = [
  { id: 'ntc-1', title: 'Annual Sports Meet & Athletic Trials 2026', category: 'Sports', targetAudience: 'All', date: '2026-08-06', postedBy: 'Sports Dept / Principal', content: 'Registrations for the upcoming Annual Athletic Meet are now open. All students from Class 6 to 12 can submit entry forms to their respective class teachers.', pinned: true },
  { id: 'ntc-2', title: 'Parent-Teacher Meeting (PTM) for Term 1 Results', category: 'Academic', targetAudience: 'Parents', date: '2026-08-05', postedBy: 'School Administration', content: 'The Mid-Term PTM will take place on Saturday from 9:00 AM to 1:00 PM. Parents can discuss academic progress with subject teachers.', pinned: false },
];

export const INITIAL_EVENTS: EventItem[] = [
  { id: 'evt-1', title: 'Science & Robotics Olympiad', date: '2026-08-20', time: '10:00 AM', venue: 'Auditorium Block C', category: 'Academic', description: 'Inter-school science innovation exhibit and robotics tournament.' },
  { id: 'evt-2', title: 'Independence & Cultural Fest', date: '2026-08-25', time: '08:30 AM', venue: 'Main Ground', category: 'Cultural', description: 'Flag hoisting ceremony followed by music, dance, and drama performances.' },
];
