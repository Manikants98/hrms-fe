import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';
import {
  RxBadge,
  RxBarChart,
  RxCalendar,
  RxCheckCircled,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEnvelopeClosed,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxIdCard,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPieChart,
  RxPlus,
  RxReload,
  RxRows,
  RxShare1,
  RxTarget,
  RxTimer,
  RxTriangleUp,
} from 'react-icons/rx';
import Clock from '../../../shared/clock';

interface LeaveReport {
  id: string;
  reportName: string;
  reportType:
    | 'leave_summary'
    | 'leave_balance'
    | 'leave_usage'
    | 'leave_requests'
    | 'absenteeism'
    | 'leave_audit'
    | 'leave_encashment'
    | 'leave_trends'
    | 'department_analysis'
    | 'compliance';
  category: 'operational' | 'compliance' | 'analytics' | 'summary' | 'financial';

  // Report Configuration
  dateRange: {
    startDate: string;
    endDate: string;
    period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'custom';
  };

  // Filters Applied
  filters: {
    departments: string[];
    locations: string[];
    employeeGrades: string[];
    leaveTypes: string[];
    employmentStatus: string[];
    customFilters: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
  };

  // Leave Data Summary
  leaveData: {
    totalEmployees: number;
    employeesOnLeave: number;
    totalLeaveDays: number;
    totalLeaveRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;

    // Leave Balance Information
    leaveBalances: {
      totalAllocated: number;
      totalUsed: number;
      totalRemaining: number;
      totalExpired: number;
      totalCarriedForward: number;
    };

    // Leave Type Breakdown
    leaveTypeBreakdown: Array<{
      leaveType: string;
      allocated: number;
      used: number;
      remaining: number;
      utilizationRate: number;
    }>;

    // Department Analysis
    departmentBreakdown: Array<{
      department: string;
      totalEmployees: number;
      employeesOnLeave: number;
      totalLeaveDays: number;
      absenteeismRate: number;
      utilizationRate: number;
    }>;

    // Monthly Trends
    monthlyTrends: Array<{
      month: string;
      totalLeaves: number;
      averageLeavePerEmployee: number;
      mostUsedLeaveType: string;
      absenteeismRate: number;
    }>;
  };

  // Individual Employee Records
  employeeRecords: Array<{
    employeeId: string;
    employeeName: string;
    department: string;
    designation: string;

    leaveBalances: {
      annualLeave: { allocated: number; used: number; remaining: number };
      sickLeave: { allocated: number; used: number; remaining: number };
      casualLeave: { allocated: number; used: number; remaining: number };
      maternityLeave: { allocated: number; used: number; remaining: number };
      paternityLeave: { allocated: number; used: number; remaining: number };
      compensatoryOff: { allocated: number; used: number; remaining: number };
    };

    recentLeaveHistory: Array<{
      leaveType: string;
      startDate: string;
      endDate: string;
      days: number;
      status: 'approved' | 'pending' | 'rejected';
      appliedDate: string;
    }>;

    absenteeismMetrics: {
      totalAbsentDays: number;
      absenteeismRate: number;
      frequentAbsencePeriods: string[];
      lastLeaveDate: string;
    };
  }>;

  // Report Status and Generation
  status: 'generating' | 'completed' | 'failed' | 'scheduled' | 'draft';
  generatedBy: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };

  // Schedule Configuration
  isScheduled: boolean;
  scheduleConfig?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    recipients: string[];
    nextRunDate: string;
    lastRunDate?: string;
    deliveryTime: string;
  };

  // Export and Sharing
  exportFormats: ('pdf' | 'excel' | 'csv')[];
  sharedWith: Array<{
    id: string;
    name: string;
    email: string;
    accessLevel: 'view' | 'edit';
  }>;

  // Insights and Analytics
  keyInsights: string[];
  leaveAlerts: Array<{
    type: 'high_utilization' | 'low_utilization' | 'excessive_carry_forward' | 'compliance_risk' | 'pattern_anomaly';
    message: string;
    affectedEmployees: number;
    severity: 'low' | 'medium' | 'high';
    department?: string;
  }>;

  // Compliance Tracking
  complianceMetrics: {
    totalCompliantRequests: number;
    totalNonCompliantRequests: number;
    complianceRate: number;
    riskFactors: string[];
  };

  // Performance Metrics
  generationTime: number;
  dataAccuracy: number;
  lastUpdated: string;

  // Administrative
  tags: string[];
  description: string;
  priority: 'high' | 'medium' | 'low';
  accessLevel: 'public' | 'restricted' | 'confidential';

  createdDate: string;
  modifiedDate: string;
  downloadCount: number;
  viewCount: number;
}

const LeaveReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const leaveReports: LeaveReport[] = [
    {
      id: 'LR001',
      reportName: 'Monthly Leave Summary - July 2025',
      reportType: 'leave_summary',
      category: 'operational',
      dateRange: {
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        period: 'monthly',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        employeeGrades: ['All'],
        leaveTypes: ['All'],
        employmentStatus: ['Active'],
        customFilters: [],
      },
      leaveData: {
        totalEmployees: 1247,
        employeesOnLeave: 156,
        totalLeaveDays: 1234,
        totalLeaveRequests: 289,
        pendingRequests: 23,
        approvedRequests: 234,
        rejectedRequests: 32,
        leaveBalances: {
          totalAllocated: 24940,
          totalUsed: 8976,
          totalRemaining: 15964,
          totalExpired: 456,
          totalCarriedForward: 2340,
        },
        leaveTypeBreakdown: [
          { leaveType: 'Annual Leave', allocated: 12470, used: 4567, remaining: 7903, utilizationRate: 36.6 },
          { leaveType: 'Sick Leave', allocated: 6235, used: 2134, remaining: 4101, utilizationRate: 34.2 },
          { leaveType: 'Casual Leave', allocated: 3741, used: 1678, remaining: 2063, utilizationRate: 44.9 },
          { leaveType: 'Maternity Leave', allocated: 1872, used: 456, remaining: 1416, utilizationRate: 24.4 },
          { leaveType: 'Compensatory Off', allocated: 622, used: 141, remaining: 481, utilizationRate: 22.7 },
        ],
        departmentBreakdown: [
          {
            department: 'Engineering',
            totalEmployees: 487,
            employeesOnLeave: 62,
            totalLeaveDays: 487,
            absenteeismRate: 12.7,
            utilizationRate: 38.2,
          },
          {
            department: 'Marketing',
            totalEmployees: 234,
            employeesOnLeave: 31,
            totalLeaveDays: 234,
            absenteeismRate: 13.2,
            utilizationRate: 42.1,
          },
          {
            department: 'Finance',
            totalEmployees: 156,
            employeesOnLeave: 18,
            totalLeaveDays: 156,
            absenteeismRate: 11.5,
            utilizationRate: 35.8,
          },
          {
            department: 'Operations',
            totalEmployees: 198,
            employeesOnLeave: 25,
            totalLeaveDays: 198,
            absenteeismRate: 12.6,
            utilizationRate: 39.7,
          },
          {
            department: 'HR',
            totalEmployees: 89,
            employeesOnLeave: 11,
            totalLeaveDays: 89,
            absenteeismRate: 12.4,
            utilizationRate: 37.1,
          },
          {
            department: 'Sales',
            totalEmployees: 83,
            employeesOnLeave: 9,
            totalLeaveDays: 70,
            absenteeismRate: 10.8,
            utilizationRate: 33.5,
          },
        ],
        monthlyTrends: [
          {
            month: 'May',
            totalLeaves: 1089,
            averageLeavePerEmployee: 0.88,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 11.2,
          },
          {
            month: 'June',
            totalLeaves: 1156,
            averageLeavePerEmployee: 0.93,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 11.8,
          },
          {
            month: 'July',
            totalLeaves: 1234,
            averageLeavePerEmployee: 0.99,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 12.5,
          },
        ],
      },
      employeeRecords: [
        {
          employeeId: 'EMP001',
          employeeName: 'Rahul Sharma',
          department: 'Engineering',
          designation: 'Senior Software Engineer',
          leaveBalances: {
            annualLeave: { allocated: 21, used: 8, remaining: 13 },
            sickLeave: { allocated: 12, used: 3, remaining: 9 },
            casualLeave: { allocated: 6, used: 2, remaining: 4 },
            maternityLeave: { allocated: 0, used: 0, remaining: 0 },
            paternityLeave: { allocated: 15, used: 0, remaining: 15 },
            compensatoryOff: { allocated: 4, used: 1, remaining: 3 },
          },
          recentLeaveHistory: [
            {
              leaveType: 'Annual Leave',
              startDate: '2025-07-15',
              endDate: '2025-07-17',
              days: 3,
              status: 'approved',
              appliedDate: '2025-07-10',
            },
            {
              leaveType: 'Sick Leave',
              startDate: '2025-07-08',
              endDate: '2025-07-08',
              days: 1,
              status: 'approved',
              appliedDate: '2025-07-08',
            },
          ],
          absenteeismMetrics: {
            totalAbsentDays: 11,
            absenteeismRate: 5.2,
            frequentAbsencePeriods: ['Q2 2025'],
            lastLeaveDate: '2025-07-17',
          },
        },
      ],
      status: 'completed',
      generatedBy: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        role: 'HR Manager',
      },
      isScheduled: true,
      scheduleConfig: {
        frequency: 'monthly',
        recipients: ['hr@company.com', 'management@company.com'],
        nextRunDate: '2025-08-31',
        lastRunDate: '2025-07-31',
        deliveryTime: '09:00',
      },
      exportFormats: ['pdf', 'excel', 'csv'],
      sharedWith: [
        {
          id: 'MGR001',
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@company.com',
          accessLevel: 'view',
        },
      ],
      keyInsights: [
        'Leave utilization increased by 8.2% compared to June 2025',
        'Engineering department has highest leave usage at 38.2%',
        'Annual leave remains most utilized leave type at 36.6%',
        'Average leave per employee: 0.99 days in July',
      ],
      leaveAlerts: [
        {
          type: 'high_utilization',
          message: 'Marketing department showing 42.1% leave utilization',
          affectedEmployees: 31,
          severity: 'medium',
          department: 'Marketing',
        },
        {
          type: 'compliance_risk',
          message: '23 pending leave requests require immediate attention',
          affectedEmployees: 23,
          severity: 'high',
        },
      ],
      complianceMetrics: {
        totalCompliantRequests: 266,
        totalNonCompliantRequests: 23,
        complianceRate: 92.0,
        riskFactors: ['Pending approvals', 'Documentation incomplete'],
      },
      generationTime: 34,
      dataAccuracy: 99.2,
      lastUpdated: '2025-07-31T09:30:00Z',
      tags: ['monthly', 'summary', 'operational'],
      description:
        'Comprehensive monthly leave summary showing utilization patterns, department breakdowns, and compliance metrics.',
      priority: 'high',
      accessLevel: 'public',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 89,
      viewCount: 234,
    },
    {
      id: 'LR002',
      reportName: 'Leave Balance Analysis - Q2 2025',
      reportType: 'leave_balance',
      category: 'analytics',
      dateRange: {
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        period: 'quarterly',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        employeeGrades: ['All'],
        leaveTypes: ['Annual Leave', 'Sick Leave', 'Casual Leave'],
        employmentStatus: ['Active'],
        customFilters: [],
      },
      leaveData: {
        totalEmployees: 1241,
        employeesOnLeave: 0,
        totalLeaveDays: 3456,
        totalLeaveRequests: 678,
        pendingRequests: 0,
        approvedRequests: 612,
        rejectedRequests: 66,
        leaveBalances: {
          totalAllocated: 74460,
          totalUsed: 25673,
          totalRemaining: 48787,
          totalExpired: 1234,
          totalCarriedForward: 6789,
        },
        leaveTypeBreakdown: [
          { leaveType: 'Annual Leave', allocated: 37230, used: 13456, remaining: 23774, utilizationRate: 36.1 },
          { leaveType: 'Sick Leave', allocated: 18615, used: 6789, remaining: 11826, utilizationRate: 36.5 },
          { leaveType: 'Casual Leave', allocated: 11169, used: 4567, remaining: 6602, utilizationRate: 40.9 },
          { leaveType: 'Compensatory Off', allocated: 1861, used: 456, remaining: 1405, utilizationRate: 24.5 },
        ],
        departmentBreakdown: [],
        monthlyTrends: [],
      },
      employeeRecords: [],
      status: 'completed',
      generatedBy: {
        id: 'HR002',
        name: 'Priya Singh',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        role: 'HR Business Partner',
      },
      isScheduled: true,
      scheduleConfig: {
        frequency: 'quarterly',
        recipients: ['hr@company.com', 'finance@company.com'],
        nextRunDate: '2025-09-30',
        lastRunDate: '2025-06-30',
        deliveryTime: '10:00',
      },
      exportFormats: ['excel', 'pdf'],
      sharedWith: [],
      keyInsights: [
        'Q2 leave utilization: 34.5% across all leave types',
        '65.5% of total allocated leave remains unused',
        'Casual leave shows highest utilization at 40.9%',
        '1,234 leave days expired due to non-utilization',
      ],
      leaveAlerts: [
        {
          type: 'low_utilization',
          message: 'Compensatory off utilization only 24.5%',
          affectedEmployees: 234,
          severity: 'low',
        },
        {
          type: 'excessive_carry_forward',
          message: '6,789 days eligible for carry forward',
          affectedEmployees: 445,
          severity: 'medium',
        },
      ],
      complianceMetrics: {
        totalCompliantRequests: 612,
        totalNonCompliantRequests: 66,
        complianceRate: 90.3,
        riskFactors: ['Excessive unused leave', 'Policy violations'],
      },
      generationTime: 67,
      dataAccuracy: 98.7,
      lastUpdated: '2025-06-30T16:45:00Z',
      tags: ['quarterly', 'balance', 'analytics'],
      description: 'Quarterly leave balance analysis focusing on utilization patterns and carry-forward implications.',
      priority: 'medium',
      accessLevel: 'restricted',
      createdDate: '2025-06-30',
      modifiedDate: '2025-06-30',
      downloadCount: 45,
      viewCount: 123,
    },
    {
      id: 'LR003',
      reportName: 'Department-wise Leave Usage Analysis',
      reportType: 'department_analysis',
      category: 'analytics',
      dateRange: {
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        period: 'monthly',
      },
      filters: {
        departments: ['Engineering', 'Marketing', 'Finance', 'Operations'],
        locations: ['All'],
        employeeGrades: ['All'],
        leaveTypes: ['All'],
        employmentStatus: ['Active'],
        customFilters: [],
      },
      leaveData: {
        totalEmployees: 964,
        employeesOnLeave: 125,
        totalLeaveDays: 978,
        totalLeaveRequests: 234,
        pendingRequests: 12,
        approvedRequests: 198,
        rejectedRequests: 24,
        leaveBalances: {
          totalAllocated: 19280,
          totalUsed: 6893,
          totalRemaining: 12387,
          totalExpired: 234,
          totalCarriedForward: 1456,
        },
        leaveTypeBreakdown: [],
        departmentBreakdown: [
          {
            department: 'Engineering',
            totalEmployees: 487,
            employeesOnLeave: 62,
            totalLeaveDays: 487,
            absenteeismRate: 12.7,
            utilizationRate: 38.2,
          },
          {
            department: 'Marketing',
            totalEmployees: 234,
            employeesOnLeave: 31,
            totalLeaveDays: 234,
            absenteeismRate: 13.2,
            utilizationRate: 42.1,
          },
          {
            department: 'Finance',
            totalEmployees: 156,
            employeesOnLeave: 18,
            totalLeaveDays: 156,
            absenteeismRate: 11.5,
            utilizationRate: 35.8,
          },
          {
            department: 'Operations',
            totalEmployees: 87,
            employeesOnLeave: 14,
            totalLeaveDays: 101,
            absenteeismRate: 16.1,
            utilizationRate: 45.3,
          },
        ],
        monthlyTrends: [],
      },
      employeeRecords: [],
      status: 'generating',
      generatedBy: {
        id: 'ANAL001',
        name: 'Kavya Nair',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        role: 'HR Analyst',
      },
      isScheduled: false,
      exportFormats: ['excel', 'csv'],
      sharedWith: [],
      keyInsights: [],
      leaveAlerts: [
        {
          type: 'high_utilization',
          message: 'Operations department showing 45.3% utilization rate',
          affectedEmployees: 14,
          severity: 'high',
          department: 'Operations',
        },
      ],
      complianceMetrics: {
        totalCompliantRequests: 210,
        totalNonCompliantRequests: 24,
        complianceRate: 89.7,
        riskFactors: ['High utilization patterns', 'Resource planning risks'],
      },
      generationTime: 0,
      dataAccuracy: 0,
      lastUpdated: '2025-07-31T14:20:00Z',
      tags: ['department-wise', 'analysis', 'monthly'],
      description:
        'Department-wise leave usage analysis comparing utilization patterns and absenteeism rates across teams.',
      priority: 'medium',
      accessLevel: 'restricted',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 12,
      viewCount: 34,
    },
    {
      id: 'LR004',
      reportName: 'Leave Compliance Audit Report',
      reportType: 'compliance',
      category: 'compliance',
      dateRange: {
        startDate: '2025-01-01',
        endDate: '2025-07-31',
        period: 'custom',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        employeeGrades: ['All'],
        leaveTypes: ['All'],
        employmentStatus: ['Active', 'Separated'],
        customFilters: [
          {
            field: 'compliance_status',
            operator: 'not_equals',
            value: 'compliant',
          },
        ],
      },
      leaveData: {
        totalEmployees: 1456,
        employeesOnLeave: 0,
        totalLeaveDays: 15670,
        totalLeaveRequests: 3456,
        pendingRequests: 67,
        approvedRequests: 3123,
        rejectedRequests: 266,
        leaveBalances: {
          totalAllocated: 116320,
          totalUsed: 45673,
          totalRemaining: 70647,
          totalExpired: 2234,
          totalCarriedForward: 8976,
        },
        leaveTypeBreakdown: [],
        departmentBreakdown: [],
        monthlyTrends: [],
      },
      employeeRecords: [],
      status: 'completed',
      generatedBy: {
        id: 'COMP001',
        name: 'Rohit Sharma',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        role: 'Compliance Officer',
      },
      isScheduled: true,
      scheduleConfig: {
        frequency: 'quarterly',
        recipients: ['compliance@company.com', 'legal@company.com', 'hr@company.com'],
        nextRunDate: '2025-10-31',
        lastRunDate: '2025-07-31',
        deliveryTime: '16:00',
      },
      exportFormats: ['pdf', 'excel'],
      sharedWith: [
        {
          id: 'LEGAL001',
          name: 'Sunita Mehta',
          email: 'sunita.mehta@company.com',
          accessLevel: 'view',
        },
      ],
      keyInsights: [
        'Overall compliance rate: 91.3% across all leave requests',
        '266 non-compliant leave requests identified',
        '67 pending requests require immediate review',
        'Documentation gaps found in 4.2% of cases',
      ],
      leaveAlerts: [
        {
          type: 'compliance_risk',
          message: '67 leave requests pending beyond policy timeframe',
          affectedEmployees: 67,
          severity: 'high',
        },
        {
          type: 'pattern_anomaly',
          message: 'Unusual leave patterns detected in 12 employees',
          affectedEmployees: 12,
          severity: 'medium',
        },
      ],
      complianceMetrics: {
        totalCompliantRequests: 3156,
        totalNonCompliantRequests: 300,
        complianceRate: 91.3,
        riskFactors: ['Policy violations', 'Documentation gaps', 'Approval delays', 'Pattern anomalies'],
      },
      generationTime: 123,
      dataAccuracy: 99.8,
      lastUpdated: '2025-07-31T18:15:00Z',
      tags: ['compliance', 'audit', 'risk-assessment'],
      description:
        'Comprehensive compliance audit report identifying policy violations, risks, and recommendations for improvement.',
      priority: 'high',
      accessLevel: 'confidential',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 23,
      viewCount: 67,
    },
    {
      id: 'LR005',
      reportName: 'Leave Trends & Forecasting Analysis',
      reportType: 'leave_trends',
      category: 'analytics',
      dateRange: {
        startDate: '2024-08-01',
        endDate: '2025-07-31',
        period: 'annual',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        employeeGrades: ['All'],
        leaveTypes: ['Annual Leave', 'Sick Leave'],
        employmentStatus: ['Active'],
        customFilters: [],
      },
      leaveData: {
        totalEmployees: 1247,
        employeesOnLeave: 0,
        totalLeaveDays: 18945,
        totalLeaveRequests: 4567,
        pendingRequests: 0,
        approvedRequests: 4234,
        rejectedRequests: 333,
        leaveBalances: {
          totalAllocated: 149640,
          totalUsed: 56789,
          totalRemaining: 92851,
          totalExpired: 3456,
          totalCarriedForward: 12567,
        },
        leaveTypeBreakdown: [
          { leaveType: 'Annual Leave', allocated: 89784, used: 34567, remaining: 55217, utilizationRate: 38.5 },
          { leaveType: 'Sick Leave', allocated: 44892, used: 16789, remaining: 28103, utilizationRate: 37.4 },
        ],
        departmentBreakdown: [],
        monthlyTrends: [
          {
            month: 'Aug 2024',
            totalLeaves: 1456,
            averageLeavePerEmployee: 1.17,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 11.8,
          },
          {
            month: 'Sep 2024',
            totalLeaves: 1567,
            averageLeavePerEmployee: 1.26,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 12.2,
          },
          {
            month: 'Oct 2024',
            totalLeaves: 1234,
            averageLeavePerEmployee: 0.99,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 10.1,
          },
          {
            month: 'Nov 2024',
            totalLeaves: 1345,
            averageLeavePerEmployee: 1.08,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 10.9,
          },
          {
            month: 'Dec 2024',
            totalLeaves: 1789,
            averageLeavePerEmployee: 1.43,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 14.5,
          },
          {
            month: 'Jan 2025',
            totalLeaves: 1123,
            averageLeavePerEmployee: 0.9,
            mostUsedLeaveType: 'Sick Leave',
            absenteeismRate: 9.1,
          },
          {
            month: 'Feb 2025',
            totalLeaves: 1089,
            averageLeavePerEmployee: 0.87,
            mostUsedLeaveType: 'Sick Leave',
            absenteeismRate: 8.9,
          },
          {
            month: 'Mar 2025',
            totalLeaves: 1456,
            averageLeavePerEmployee: 1.17,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 11.7,
          },
          {
            month: 'Apr 2025',
            totalLeaves: 1567,
            averageLeavePerEmployee: 1.26,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 12.6,
          },
          {
            month: 'May 2025',
            totalLeaves: 1389,
            averageLeavePerEmployee: 1.11,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 11.1,
          },
          {
            month: 'Jun 2025',
            totalLeaves: 1678,
            averageLeavePerEmployee: 1.35,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 13.5,
          },
          {
            month: 'Jul 2025',
            totalLeaves: 1234,
            averageLeavePerEmployee: 0.99,
            mostUsedLeaveType: 'Annual Leave',
            absenteeismRate: 9.9,
          },
        ],
      },
      employeeRecords: [],
      status: 'failed',
      generatedBy: {
        id: 'PRED001',
        name: 'Data Analytics Team',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        role: 'Analytics Specialist',
      },
      isScheduled: false,
      exportFormats: ['excel', 'pdf'],
      sharedWith: [],
      keyInsights: [],
      leaveAlerts: [],
      complianceMetrics: {
        totalCompliantRequests: 4234,
        totalNonCompliantRequests: 333,
        complianceRate: 92.7,
        riskFactors: [],
      },
      generationTime: 0,
      dataAccuracy: 0,
      lastUpdated: '2025-07-31T11:30:00Z',
      tags: ['trends', 'forecasting', 'annual'],
      description:
        'Annual leave trends analysis with predictive insights for workforce planning and leave policy optimization.',
      priority: 'low',
      accessLevel: 'restricted',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 8,
      viewCount: 19,
    },
  ];

  const reportTypes = [
    'all',
    'leave_summary',
    'leave_balance',
    'leave_usage',
    'leave_requests',
    'absenteeism',
    'leave_audit',
    'leave_encashment',
    'leave_trends',
    'department_analysis',
    'compliance',
  ];
  const statuses = ['all', 'generating', 'completed', 'failed', 'scheduled', 'draft'];

  // Filter leave reports
  const filteredReports = leaveReports.filter((report) => {
    const matchesSearch =
      report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      report.generatedBy.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = reportTypeFilter === 'all' || report.reportType === reportTypeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generating':
        return 'primary';
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'scheduled':
        return 'warning';
      case 'draft':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'generating':
        return <RxReload className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'scheduled':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'draft':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'operational':
        return <RxGear className="w-4 h-4 text-blue-500" />;
      case 'compliance':
        return <RxBadge className="w-4 h-4 text-orange-500" />;
      case 'analytics':
        return <RxBarChart className="w-4 h-4 text-purple-500" />;
      case 'summary':
        return <RxPieChart className="w-4 h-4 text-teal-500" />;
      case 'financial':
        return <FaCalculator className="w-4 h-4 text-green-500" />;
      default:
        return <RxFileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'leave_summary':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      case 'leave_balance':
        return <RxTarget className="w-4 h-4 text-green-500" />;
      case 'leave_usage':
        return <RxBarChart className="w-4 h-4 text-purple-500" />;
      case 'leave_requests':
        return <RxEnvelopeClosed className="w-4 h-4 text-yellow-500" />;
      case 'absenteeism':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'leave_audit':
        return <RxBadge className="w-4 h-4 text-orange-500" />;
      case 'leave_encashment':
        return <FaCalculator className="w-4 h-4 text-teal-500" />;
      case 'leave_trends':
        return <RxTriangleUp className="w-4 h-4 text-indigo-500" />;
      case 'department_analysis':
        return <RxPieChart className="w-4 h-4 text-pink-500" />;
      case 'compliance':
        return <RxIdCard className="w-4 h-4 text-gray-500" />;
      default:
        return <RxFileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  // Calculate statistics
  const totalReports = leaveReports.length;
  const completedReports = leaveReports.filter((r) => r.status === 'completed').length;
  const scheduledReports = leaveReports.filter((r) => r.isScheduled).length;
  const avgAccuracy =
    leaveReports.filter((r) => r.dataAccuracy > 0).reduce((sum, r) => sum + r.dataAccuracy, 0) /
    leaveReports.filter((r) => r.dataAccuracy > 0).length;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredReports.map((report) => (
        <div
          key={report.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority Indicator and Actions */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(report.priority)}`}></div>
            {report.isScheduled && <RxReload className="w-4 h-4 text-blue-500" title="Scheduled Report" />}
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Report Header */}
          <div className="flex items-start justify-between mb-4 pr-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">{getTypeIcon(report.reportType)}</div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{report.reportName}</h3>
                <p className="text-sm text-gray-500">{report.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">{getStatusIcon(report.status)}</div>
          </div>

          {/* Report Type and Category */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              {getCategoryIcon(report.category)}
              <Chip
                label={report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                size="small"
                variant="outlined"
              />
              <Chip
                label={
                  report.reportType.replace('_', ' ').charAt(0).toUpperCase() +
                  report.reportType.replace('_', ' ').slice(1)
                }
                size="small"
                color="primary"
              />
            </div>
          </div>

          {/* Date Range and Period */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <RxCalendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 capitalize">{report.dateRange.period} Report</span>
            </div>
            <div className="text-sm text-gray-600">
              {new Date(report.dateRange.startDate).toLocaleDateString()} -{' '}
              {new Date(report.dateRange.endDate).toLocaleDateString()}
            </div>
          </div>

          {/* Key Leave Metrics (for completed reports) */}
          {report.status === 'completed' && report.leaveData.totalEmployees > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Key Metrics</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Total Employees:</span>
                  <span className="font-medium ml-1">{formatNumber(report.leaveData.totalEmployees)}</span>
                </div>
                <div>
                  <span className="text-gray-600">On Leave:</span>
                  <span className="font-medium ml-1 text-blue-600">
                    {formatNumber(report.leaveData.employeesOnLeave)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Leave Days:</span>
                  <span className="font-medium ml-1 text-green-600">
                    {formatNumber(report.leaveData.totalLeaveDays)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Requests:</span>
                  <span className="font-medium ml-1 text-purple-600">
                    {formatNumber(report.leaveData.totalLeaveRequests)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Leave Type Breakdown */}
          {report.leaveData.leaveTypeBreakdown.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Leave Type Breakdown</p>
              <div className="space-y-1">
                {report.leaveData.leaveTypeBreakdown.slice(0, 3).map((leave, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{leave.leaveType}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{formatNumber(leave.used)}</span>
                      <span className="text-blue-600">({formatPercentage(leave.utilizationRate)})</span>
                    </div>
                  </div>
                ))}
                {report.leaveData.leaveTypeBreakdown.length > 3 && (
                  <p className="text-xs text-gray-500">+{report.leaveData.leaveTypeBreakdown.length - 3} more types</p>
                )}
              </div>
            </div>
          )}

          {/* Leave Alerts */}
          {report.leaveAlerts.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Alerts ({report.leaveAlerts.length})</p>
              <div className="space-y-1">
                {report.leaveAlerts.slice(0, 2).map((alert, index) => (
                  <div key={index} className={`text-xs p-2 rounded ${getAlertSeverityColor(alert.severity)}`}>
                    <div className="font-medium">
                      {alert.type.replace('_', ' ').charAt(0).toUpperCase() + alert.type.replace('_', ' ').slice(1)}
                    </div>
                    <div className="text-xs">{alert.affectedEmployees} employees affected</div>
                  </div>
                ))}
                {report.leaveAlerts.length > 2 && (
                  <p className="text-xs text-gray-500">+{report.leaveAlerts.length - 2} more alerts</p>
                )}
              </div>
            </div>
          )}

          {/* Key Insights */}
          {report.keyInsights.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Key Insights</p>
              <div className="space-y-1">
                {report.keyInsights.slice(0, 2).map((insight, index) => (
                  <div key={index} className="text-xs text-gray-700 bg-blue-50 p-2 rounded">
                    {insight}
                  </div>
                ))}
                {report.keyInsights.length > 2 && (
                  <p className="text-xs text-gray-500">+{report.keyInsights.length - 2} more insights</p>
                )}
              </div>
            </div>
          )}

          {/* Generated By */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Generated By</p>
            <div className="flex items-center space-x-2">
              <img
                src={report.generatedBy.avatar}
                alt={report.generatedBy.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{report.generatedBy.name}</p>
                <p className="text-xs text-gray-500">{report.generatedBy.role}</p>
              </div>
            </div>
          </div>

          {/* Data Quality and Performance */}
          {report.status === 'completed' && report.dataAccuracy > 0 && (
            <div className="mb-4 p-2 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-700">Data Accuracy:</span>
                <span className="font-medium text-green-800">{report.dataAccuracy.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-green-700">Generation Time:</span>
                <span className="font-medium text-green-800">{report.generationTime}s</span>
              </div>
            </div>
          )}

          {/* Schedule Info */}
          {report.isScheduled && report.scheduleConfig && (
            <div className="mb-4 p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <RxTimer className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-blue-700 font-medium">Scheduled {report.scheduleConfig.frequency}</span>
              </div>
              {report.scheduleConfig.nextRunDate && (
                <div className="text-xs text-blue-600 mt-1">
                  Next: {new Date(report.scheduleConfig.nextRunDate).toLocaleDateString()} at{' '}
                  {report.scheduleConfig.deliveryTime}
                </div>
              )}
            </div>
          )}

          {/* Compliance Status */}
          {report.complianceMetrics.complianceRate > 0 && (
            <div className="mb-4 p-2 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="text-orange-700">Compliance Rate:</span>
                <span className="font-medium text-orange-800">
                  {formatPercentage(report.complianceMetrics.complianceRate)}
                </span>
              </div>
              {report.complianceMetrics.riskFactors.length > 0 && (
                <div className="text-xs text-orange-600 mt-1">
                  {report.complianceMetrics.riskFactors.length} risk factors identified
                </div>
              )}
            </div>
          )}

          {/* Usage Stats */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <RxEyeOpen className="w-3 h-3" />
                  <span>{report.viewCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <RxDownload className="w-3 h-3" />
                  <span>{report.downloadCount}</span>
                </div>
              </div>
              <div>Updated: {new Date(report.lastUpdated).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              size="small"
              color={getStatusColor(report.status)}
              variant="filled"
            />
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxDownload className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxShare1 className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxPencil1 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Table View Component
  const TableView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report Details
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Category
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Range
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leave Metrics
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status & Quality
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated By
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Insights & Alerts
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative">
                      <div className="p-2 bg-gray-100 rounded-lg">{getTypeIcon(report.reportType)}</div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(report.priority)}`}
                      ></div>
                      {report.isScheduled && (
                        <div className="absolute -top-1 -right-1">
                          <RxReload className="w-3 h-3 text-blue-500" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">{report.reportName}</div>
                      <div className="text-sm text-gray-500">{report.id}</div>
                      <div className="text-xs text-gray-400 line-clamp-1">{report.description}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {getCategoryIcon(report.category)}
                    <span className="text-sm font-medium text-gray-900 capitalize">{report.category}</span>
                  </div>
                  <Chip
                    label={
                      report.reportType.replace('_', ' ').charAt(0).toUpperCase() +
                      report.reportType.replace('_', ' ').slice(1)
                    }
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900 capitalize">{report.dateRange.period}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(report.dateRange.startDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">{new Date(report.dateRange.endDate).toLocaleDateString()}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {report.status === 'completed' && report.leaveData.totalEmployees > 0 ? (
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatNumber(report.leaveData.totalEmployees)} employees
                      </div>
                      <div className="text-xs text-blue-600">
                        {formatNumber(report.leaveData.employeesOnLeave)} on leave
                      </div>
                      <div className="text-xs text-green-600">
                        {formatNumber(report.leaveData.totalLeaveDays)} leave days
                      </div>
                      <div className="text-xs text-purple-600">
                        {formatNumber(report.leaveData.totalLeaveRequests)} requests
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No data</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {getStatusIcon(report.status)}
                    <Chip
                      label={report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      size="small"
                      color={getStatusColor(report.status)}
                      variant="filled"
                    />
                  </div>
                  {report.status === 'completed' && report.dataAccuracy > 0 && (
                    <div className="text-xs text-green-600">{report.dataAccuracy.toFixed(1)}% accuracy</div>
                  )}
                  {report.complianceMetrics.complianceRate > 0 && (
                    <div className="text-xs text-orange-600">
                      {formatPercentage(report.complianceMetrics.complianceRate)} compliance
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <img
                      src={report.generatedBy.avatar}
                      alt={report.generatedBy.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.generatedBy.name}</div>
                      <div className="text-xs text-gray-500">{report.generatedBy.role}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{new Date(report.createdDate).toLocaleDateString()}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{report.leaveAlerts.length} Alerts</div>
                  {report.leaveAlerts.length > 0 && (
                    <div className="text-xs">
                      {report.leaveAlerts.filter((a) => a.severity === 'high').length > 0 && (
                        <span className="text-red-600">
                          {report.leaveAlerts.filter((a) => a.severity === 'high').length} high
                        </span>
                      )}
                      {report.leaveAlerts.filter((a) => a.severity === 'medium').length > 0 && (
                        <span className="text-yellow-600 ml-1">
                          {report.leaveAlerts.filter((a) => a.severity === 'medium').length} medium
                        </span>
                      )}
                    </div>
                  )}
                  <div className="text-xs text-blue-600 mt-1">{report.keyInsights.length} insights</div>
                  <div className="flex items-center justify-center space-x-3 text-xs text-gray-500 mt-1">
                    <div className="flex items-center space-x-1">
                      <RxEyeOpen className="w-3 h-3" />
                      <span>{report.viewCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RxDownload className="w-3 h-3" />
                      <span>{report.downloadCount}</span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxDownload className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxShare1 className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxPencil1 className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxCalendar className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <RxDotsVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Leave Reports</h1>
            <p className="text-gray-600">
              Comprehensive leave tracking and analysis reports for effective workforce management
            </p>
          </div>
          <Clock />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <RxFileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedReports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxTimer className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{scheduledReports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxTarget className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{isNaN(avgAccuracy) ? 'N/A' : avgAccuracy.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Generate Report</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxTimer className="w-4 h-4" />
            <span>Schedule Report</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>Analytics Dashboard</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxGear className="w-4 h-4" />
            <span>Report Builder</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Report Type Filter */}
          <div className="relative">
            <select
              value={reportTypeFilter}
              onChange={(e) => setReportTypeFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {reportTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'All Types'
                    : type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-primary-400 rounded-lg hover:bg-primary-50 transition-colors">
            <RxMixerHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <RxGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <RxRows className="w-4 h-4" />
            </button>
          </div>

          {/* Export Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary cursor-pointer text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxDownload className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredReports.length} of {leaveReports.length} leave reports
          {reportTypeFilter !== 'all' && ` • ${reportTypeFilter.replace('_', ' ')} reports`}
          {statusFilter !== 'all' && ` • ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default LeaveReports;
