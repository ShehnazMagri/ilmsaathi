import { Student, Teacher, Employee, ClassItem, SubjectItem, AttendanceRecord, HomeworkItem, ExamItem, ResultItem, FeeItem, PayrollItem, LeaveItem, LibraryBookItem, HostelRoomItem, TransportRouteItem, InventoryItem, NoticeItem, EventItem, UserRole } from '../types';

const API_BASE = '/api';

function formatNetworkError(err: any, fallbackMessage: string) {
  const isRefused =
    err?.name === 'TypeError' ||
    err?.message?.includes('Failed to fetch') ||
    err?.message?.includes('ERR_CONNECTION_REFUSED') ||
    err?.message?.includes('NetworkError');

  if (isRefused) {
    return {
      success: false,
      isNetworkError: true,
      message: 'Backend server unreachable (ERR_CONNECTION_REFUSED). Please ensure Express backend server is running on http://localhost:5000 (`npm start` inside server directory).'
    };
  }

  return {
    success: false,
    isNetworkError: false,
    message: err?.message || fallbackMessage
  };
}

async function fetchFromApi<T>(url: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    if (!res.ok) throw new Error(`API call failed: ${res.statusText}`);
    const json = await res.json();
    return (json.data || json) as T;
  } catch (err) {
    console.warn(`[API Fetch Warning] ${url}:`, err);
    return [] as unknown as T;
  }
}

export const apiService = {
  // Auth API Endpoints (Strict MongoDB Queries)
  loginApi: async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return formatNetworkError(err, 'Login request failed');
    }
  },

  registerApi: async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return formatNetworkError(err, 'Registration failed');
    }
  },

  getMeApi: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return { success: false, message: 'No auth token found' };
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return formatNetworkError(err, 'Failed to fetch current user context');
    }
  },

  forgotPasswordApi: async (email: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err: any) {
      return formatNetworkError(err, 'Password reset request failed');
    }
  },

  resetPasswordApi: async (token: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      return await res.json();
    } catch (err: any) {
      return formatNetworkError(err, 'Password update failed');
    }
  },

  // Dynamic MongoDB Student CRUD Endpoints
  getStudents: () => fetchFromApi<Student[]>('/students'),
  createStudent: async (studentData: Partial<Student>): Promise<Student> => {
    const res = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(studentData)
    });
    const json = await res.json();
    return json.data || json;
  },
  updateStudent: async (id: string, studentData: Partial<Student>): Promise<Student> => {
    const res = await fetch(`${API_BASE}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(studentData)
    });
    const json = await res.json();
    return json.data || json;
  },
  deleteStudent: async (id: string): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(`${API_BASE}/students/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    return await res.json();
  },

  // Dynamic MongoDB Teacher CRUD Endpoints
  getTeachers: () => fetchFromApi<Teacher[]>('/teachers'),
  createTeacher: async (teacherData: Partial<Teacher>): Promise<Teacher> => {
    const res = await fetch(`${API_BASE}/teachers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(teacherData)
    });
    const json = await res.json();
    return json.data || json;
  },
  updateTeacher: async (id: string, teacherData: Partial<Teacher>): Promise<Teacher> => {
    const res = await fetch(`${API_BASE}/teachers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(teacherData)
    });
    const json = await res.json();
    return json.data || json;
  },
  deleteTeacher: async (id: string): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(`${API_BASE}/teachers/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    return await res.json();
  },

  // Dynamic MongoDB Employee CRUD Endpoints
  getEmployees: () => fetchFromApi<Employee[]>('/employees'),
  createEmployee: async (employeeData: Partial<Employee>): Promise<Employee> => {
    const res = await fetch(`${API_BASE}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(employeeData)
    });
    const json = await res.json();
    return json.data || json;
  },
  updateEmployee: async (id: string, employeeData: Partial<Employee>): Promise<Employee> => {
    const res = await fetch(`${API_BASE}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify(employeeData)
    });
    const json = await res.json();
    return json.data || json;
  },
  deleteEmployee: async (id: string): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(`${API_BASE}/employees/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    return await res.json();
  },

  // Classes & Subjects
  getClasses: () => fetchFromApi<ClassItem[]>('/classes'),
  getSubjects: () => fetchFromApi<SubjectItem[]>('/subjects'),

  // Attendance
  getAttendance: () => fetchFromApi<AttendanceRecord[]>('/attendance'),

  // Homework
  getHomework: () => fetchFromApi<HomeworkItem[]>('/homework'),

  // Exams & Results
  getExams: () => fetchFromApi<ExamItem[]>('/exams'),
  getResults: () => fetchFromApi<ResultItem[]>('/results'),

  // Fees & Payroll
  getFees: () => fetchFromApi<FeeItem[]>('/fees'),
  getPayroll: () => fetchFromApi<PayrollItem[]>('/payroll'),

  // Leaves
  getLeaves: () => fetchFromApi<LeaveItem[]>('/leaves'),

  // Library, Hostel, Transport, Inventory
  getBooks: () => fetchFromApi<LibraryBookItem[]>('/library'),
  getHostels: () => fetchFromApi<HostelRoomItem[]>('/hostel'),
  getTransport: () => fetchFromApi<TransportRouteItem[]>('/transport'),
  getInventory: () => fetchFromApi<InventoryItem[]>('/inventory'),

  // Notices & Events
  getNotices: () => fetchFromApi<NoticeItem[]>('/notices'),
  getEvents: () => fetchFromApi<EventItem[]>('/events')
};
