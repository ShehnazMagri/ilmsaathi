import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { LandingPage } from './pages/Landing/LandingPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/Auth/ResetPasswordPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { StudentsPage } from './pages/Students/StudentsPage';
import { TeachersPage } from './pages/Teachers/TeachersPage';
import { EmployeesPage } from './pages/Employees/EmployeesPage';
import { ParentPortalPage } from './pages/Parent/ParentPortalPage';
import { ClassSubjectPage } from './pages/Classes/ClassSubjectPage';
import { TimetablePage } from './pages/Timetable/TimetablePage';
import { AttendancePage } from './pages/Attendance/AttendancePage';
import { HomeworkAssignmentPage } from './pages/Homework/HomeworkAssignmentPage';
import { ExamResultPage } from './pages/Exams/ExamResultPage';
import { FeePayrollPage } from './pages/Fees/FeePayrollPage';
import { LeaveManagementPage } from './pages/Leaves/LeaveManagementPage';
import { LibraryPage } from './pages/Library/LibraryPage';
import { HostelTransportPage } from './pages/Hostel/HostelTransportPage';
import { InventoryPage } from './pages/Inventory/InventoryPage';
import { NoticesEventsPage } from './pages/Notices/NoticesEventsPage';
import { ReportsPage } from './pages/Reports/ReportsPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: '#0f172a', color: '#fff', border: '1px solid #334155' } }} />
        <Routes>
          {/* Public Landing Homepage & Authentication */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          {/* Protected Dashboard Routes (Requires Signed In User) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teachers"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TeachersPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <EmployeesPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent-portal"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ParentPortalPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/classes-subjects"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ClassSubjectPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/timetable"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TimetablePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AttendancePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/homework"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <HomeworkAssignmentPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/exams-results"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ExamResultPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fees"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <FeePayrollPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payroll"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <FeePayrollPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaves"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LeaveManagementPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LibraryPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/hostel-transport"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <HostelTransportPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InventoryPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notices-events"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NoticesEventsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
