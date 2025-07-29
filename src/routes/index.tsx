import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

// Lazy load components
const AdminDashboard = lazy(() => import('../pages/dashboard/AdminDashboard'));
const EmployeeDashboard = lazy(() => import('../pages/dashboard/EmployeeDashboard'));
const ManagerDashboard = lazy(() => import('../pages/dashboard/ManagerDashboard'));

// Employee related pages
const AllEmployees = lazy(() => import('../pages/employees/Employees'));
const EmployeeDetail = lazy(() => import('../pages/employees/Employees/EmployeeDetail'));
const Attachments = lazy(() => import('../pages/employees/Attachments'));
const OrganizationalChart = lazy(() => import('../pages/employees/OrganizationalChart'));

// Attendance pages
const DailyAttendance = lazy(() => import('../pages/attendance/DailyAttendance'));
const AttendanceReports = lazy(() => import('../pages/attendance/AttendanceReports'));
const Timesheet = lazy(() => import('../pages/attendance/Timesheet'));
const AttendanceSettings = lazy(() => import('../pages/attendance/AttendanceSettings'));

// Leave Management pages
const LeaveApplications = lazy(() => import('../pages/leave/LeaveApplications'));
const LeaveBalance = lazy(() => import('../pages/leave/LeaveBalance'));
const LeaveCalendar = lazy(() => import('../pages/leave/LeaveCalendar'));
const LeavePolicies = lazy(() => import('../pages/leave/LeavePolicies'));

// Payroll pages
const SalaryProcessing = lazy(() => import('../pages/payroll/SalaryProcessing'));
const PayrollReports = lazy(() => import('../pages/payroll/PayrollReports'));
const SalarySlips = lazy(() => import('../pages/payroll/SalarySlips'));
const TaxManagement = lazy(() => import('../pages/payroll/TaxManagement'));

// Recruitment pages
const JobPostings = lazy(() => import('../pages/recruitment/JobPostings'));
const Candidates = lazy(() => import('../pages/recruitment/Candidates'));
const Interviews = lazy(() => import('../pages/recruitment/Interviews'));
const HiringPipeline = lazy(() => import('../pages/recruitment/HiringPipeline'));

// Exit Management pages
const ExitApplications = lazy(() => import('../pages/exit/ExitApplications'));
const ClearanceProcess = lazy(() => import('../pages/exit/ClearanceProcess'));
const ExitInterviews = lazy(() => import('../pages/exit/ExitInterviews'));
const FinalSettlement = lazy(() => import('../pages/exit/FinalSettlement'));

// Performance pages
const PerformanceReviews = lazy(() => import('../pages/performance/PerformanceReviews'));
const GoalSetting = lazy(() => import('../pages/performance/GoalSetting'));
const Appraisals = lazy(() => import('../pages/performance/Appraisals'));
const Feedback = lazy(() => import('../pages/performance/Feedback'));

// Reports pages
const EmployeeReports = lazy(() => import('../pages/reports/EmployeeReports'));
const AttendanceReportsPage = lazy(() => import('../pages/reports/AttendanceReports'));
const PayrollReportsPage = lazy(() => import('../pages/reports/PayrollReports'));
const LeaveReports = lazy(() => import('../pages/reports/LeaveReports'));

// Settings pages
const Departments = lazy(() => import('../pages/settings/Departments'));
const Designations = lazy(() => import('../pages/settings/Designations'));
const LeaveTypes = lazy(() => import('../pages/settings/LeaveTypes'));
const Holidays = lazy(() => import('../pages/settings/Holidays'));
const CompanySettings = lazy(() => import('../pages/settings/CompanySettings'));
const UserManagement = lazy(() => import('../pages/settings/UserManagement'));
const RolePermissions = lazy(() => import('../pages/settings/RolePermissions'));
const SystemSettings = lazy(() => import('../pages/settings/SystemSettings'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AdminDashboard />,
  },
  {
    path: '/dashboard/admin-dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/dashboard/employee-dashboard',
    element: <EmployeeDashboard />,
  },
  {
    path: '/dashboard/manager-dashboard',
    element: <ManagerDashboard />,
  },

  // Employee routes
  {
    path: '/employees/all-employees',
    element: <AllEmployees />,
  },
  {
    path: '/employees/employee-detail/:id',
    element: <EmployeeDetail />,
  },
  {
    path: '/employees/attachments',
    element: <Attachments />,
  },
  {
    path: '/employees/organizational-chart',
    element: <OrganizationalChart />,
  },

  // Attendance routes
  {
    path: '/attendance/daily-attendance',
    element: <DailyAttendance />,
  },
  {
    path: '/attendance/attendance-reports',
    element: <AttendanceReports />,
  },
  {
    path: '/attendance/timesheet',
    element: <Timesheet />,
  },
  {
    path: '/attendance/attendance-settings',
    element: <AttendanceSettings />,
  },

  // Leave Management routes
  {
    path: '/leave-management/leave-applications',
    element: <LeaveApplications />,
  },
  {
    path: '/leave-management/leave-balance',
    element: <LeaveBalance />,
  },
  {
    path: '/leave-management/leave-calendar',
    element: <LeaveCalendar />,
  },
  {
    path: '/leave-management/leave-policies',
    element: <LeavePolicies />,
  },

  // Payroll routes
  {
    path: '/payroll/salary-processing',
    element: <SalaryProcessing />,
  },
  {
    path: '/payroll/payroll-reports',
    element: <PayrollReports />,
  },
  {
    path: '/payroll/salary-slips',
    element: <SalarySlips />,
  },
  {
    path: '/payroll/tax-management',
    element: <TaxManagement />,
  },

  // Recruitment routes
  {
    path: '/recruitment/job-postings',
    element: <JobPostings />,
  },
  {
    path: '/recruitment/candidates',
    element: <Candidates />,
  },
  {
    path: '/recruitment/interviews',
    element: <Interviews />,
  },
  {
    path: '/recruitment/hiring-pipeline',
    element: <HiringPipeline />,
  },

  // Exit Management routes
  {
    path: '/exit-management/exit-applications',
    element: <ExitApplications />,
  },
  {
    path: '/exit-management/clearance-process',
    element: <ClearanceProcess />,
  },
  {
    path: '/exit-management/exit-interviews',
    element: <ExitInterviews />,
  },
  {
    path: '/exit-management/final-settlement',
    element: <FinalSettlement />,
  },

  // Performance routes
  {
    path: '/performance/performance-reviews',
    element: <PerformanceReviews />,
  },
  {
    path: '/performance/goal-setting',
    element: <GoalSetting />,
  },
  {
    path: '/performance/appraisals',
    element: <Appraisals />,
  },
  {
    path: '/performance/feedback',
    element: <Feedback />,
  },

  // Reports routes
  {
    path: '/reports/employee-reports',
    element: <EmployeeReports />,
  },
  {
    path: '/reports/attendance-reports',
    element: <AttendanceReportsPage />,
  },
  {
    path: '/reports/payroll-reports',
    element: <PayrollReportsPage />,
  },
  {
    path: '/reports/leave-reports',
    element: <LeaveReports />,
  },

  // Settings routes
  {
    path: '/settings/departments',
    element: <Departments />,
  },
  {
    path: '/settings/designations',
    element: <Designations />,
  },
  {
    path: '/settings/leave-types',
    element: <LeaveTypes />,
  },
  {
    path: '/settings/holidays',
    element: <Holidays />,
  },
  {
    path: '/settings/company-settings',
    element: <CompanySettings />,
  },
  {
    path: '/settings/user-management',
    element: <UserManagement />,
  },
  {
    path: '/settings/role-permissions',
    element: <RolePermissions />,
  },
  {
    path: '/settings/system-settings',
    element: <SystemSettings />,
  },
];

export default routes;
