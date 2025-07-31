import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';
import {
  RxBadge,
  RxBarChart,
  RxCalendar,
  RxCheckCircled,
  RxClock,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxIdCard,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
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

interface AttendanceReport {
  id: string;
  reportName: string;
  reportType:
    | 'daily_status'
    | 'monthly_summary'
    | 'attendance_analysis'
    | 'late_early'
    | 'overtime'
    | 'leave_pattern'
    | 'biometric_raw'
    | 'working_hours'
    | 'absenteeism'
    | 'muster_roll';
  category: 'operational' | 'payroll' | 'compliance' | 'analytics' | 'summary';
  dateRange: {
    startDate: string;
    endDate: string;
    period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'custom';
  };
  filters: {
    departments: string[];
    locations: string[];
    shifts: string[];
    employeeStatus: string[];
    attendanceStatus: string[];
    customFilters: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
  };
  attendanceData: {
    totalEmployees: number;
    presentEmployees: number;
    absentEmployees: number;
    lateArrivals: number;
    earlyDepartures: number;
    onLeave: number;
    workFromHome: number;
    overtime: number;
    presentPercentage: number;
    absentPercentage: number;
    punctualityRate: number;
    avgWorkingHours: number;
    totalWorkedHours: number;
    totalOvertimeHours: number;
    totalBreakTime: number;
    attendanceTrends: Array<{
      date: string;
      present: number;
      absent: number;
      late: number;
      onTime: number;
    }>;
    departmentBreakdown: Array<{
      department: string;
      totalEmployees: number;
      presentCount: number;
      absentCount: number;
      presentPercentage: number;
    }>;
  };
  employeeRecords: Array<{
    employeeId: string;
    employeeName: string;
    department: string;
    designation: string;
    checkInTime?: string;
    checkOutTime?: string;
    totalHours: number;
    status: 'present' | 'absent' | 'late' | 'half_day' | 'on_leave' | 'wfh' | 'holiday';
    lateBy?: number;
    earlyBy?: number;
    overtimeHours?: number;
    breakTime?: number;
    location?: string;
    remarks?: string;
  }>;

  status: 'generating' | 'completed' | 'failed' | 'scheduled' | 'draft';
  generatedBy: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  isScheduled: boolean;
  scheduleConfig?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
    nextRunDate: string;
    lastRunDate?: string;
    deliveryTime: string;
  };
  exportFormats: ('pdf' | 'excel' | 'csv')[];
  sharedWith: Array<{
    id: string;
    name: string;
    email: string;
    accessLevel: 'view' | 'edit';
  }>;
  keyInsights: string[];
  attendanceAlerts: Array<{
    type: 'high_absenteeism' | 'frequent_late' | 'overtime_threshold' | 'perfect_attendance';
    message: string;
    affectedEmployees: number;
    severity: 'low' | 'medium' | 'high';
  }>;
  complianceFlags: string[];
  generationTime: number;
  dataAccuracy: number;
  lastUpdated: string;
  tags: string[];
  description: string;
  priority: 'high' | 'medium' | 'low';
  accessLevel: 'public' | 'restricted' | 'confidential';
  createdDate: string;
  modifiedDate: string;
  downloadCount: number;
  viewCount: number;
}

const AttendanceReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Mock attendance reports data
  const attendanceReports: AttendanceReport[] = [
    {
      id: 'ATR001',
      reportName: 'Daily Attendance Status Report',
      reportType: 'daily_status',
      category: 'operational',
      dateRange: {
        startDate: '2025-07-31',
        endDate: '2025-07-31',
        period: 'daily',
      },
      filters: {
        departments: ['All'],
        locations: ['Mumbai', 'Bangalore', 'Delhi'],
        shifts: ['General Shift', 'Night Shift'],
        employeeStatus: ['Active'],
        attendanceStatus: ['All'],
        customFilters: [],
      },
      attendanceData: {
        totalEmployees: 1247,
        presentEmployees: 1089,
        absentEmployees: 98,
        lateArrivals: 45,
        earlyDepartures: 23,
        onLeave: 60,
        workFromHome: 87,
        overtime: 156,
        presentPercentage: 87.3,
        absentPercentage: 7.9,
        punctualityRate: 95.9,
        avgWorkingHours: 8.2,
        totalWorkedHours: 8932,
        totalOvertimeHours: 312,
        totalBreakTime: 1156,
        attendanceTrends: [
          {
            date: '2025-07-31',
            present: 1089,
            absent: 98,
            late: 45,
            onTime: 1044,
          },
        ],
        departmentBreakdown: [
          {
            department: 'Engineering',
            totalEmployees: 487,
            presentCount: 431,
            absentCount: 34,
            presentPercentage: 88.5,
          },
          { department: 'Marketing', totalEmployees: 234, presentCount: 198, absentCount: 18, presentPercentage: 84.6 },
          { department: 'Finance', totalEmployees: 156, presentCount: 142, absentCount: 8, presentPercentage: 91.0 },
          {
            department: 'Operations',
            totalEmployees: 198,
            presentCount: 178,
            absentCount: 12,
            presentPercentage: 89.9,
          },
          { department: 'HR', totalEmployees: 89, presentCount: 78, absentCount: 6, presentPercentage: 87.6 },
          { department: 'Sales', totalEmployees: 83, presentCount: 62, absentCount: 20, presentPercentage: 74.7 },
        ],
      },
      employeeRecords: [
        {
          employeeId: 'EMP001',
          employeeName: 'Rahul Sharma',
          department: 'Engineering',
          designation: 'Senior Software Engineer',
          checkInTime: '09:02',
          checkOutTime: '18:15',
          totalHours: 8.2,
          status: 'late',
          lateBy: 2,
          overtimeHours: 0.25,
          location: 'Mumbai',
        },
        {
          employeeId: 'EMP002',
          employeeName: 'Meera Patel',
          department: 'Marketing',
          designation: 'Marketing Manager',
          checkInTime: '08:58',
          checkOutTime: '17:45',
          totalHours: 7.8,
          status: 'present',
          location: 'Mumbai',
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
        frequency: 'daily',
        recipients: ['hr@company.com', 'operations@company.com'],
        nextRunDate: '2025-08-01',
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
        '87.3% attendance rate - above company average of 85%',
        '45 employees arrived late, majority within 15 minutes',
        'Engineering department shows highest punctuality at 88.5%',
        'Sales department attendance below threshold at 74.7%',
      ],
      attendanceAlerts: [
        {
          type: 'high_absenteeism',
          message: 'Sales department showing 25.3% absenteeism rate',
          affectedEmployees: 20,
          severity: 'high',
        },
        {
          type: 'overtime_threshold',
          message: '156 employees worked overtime hours',
          affectedEmployees: 156,
          severity: 'medium',
        },
      ],
      complianceFlags: ['overtime_tracking', 'break_time_compliance'],
      generationTime: 32,
      dataAccuracy: 99.5,
      lastUpdated: '2025-07-31T09:30:00Z',
      tags: ['daily', 'operational', 'real-time'],
      description:
        'Comprehensive daily attendance status report showing present/absent employees, late arrivals, and departmental breakdown.',
      priority: 'high',
      accessLevel: 'public',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 45,
      viewCount: 128,
    },
    {
      id: 'ATR002',
      reportName: 'Monthly Attendance Summary - July 2025',
      reportType: 'monthly_summary',
      category: 'payroll',
      dateRange: {
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        period: 'monthly',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        shifts: ['All'],
        employeeStatus: ['Active'],
        attendanceStatus: ['All'],
        customFilters: [],
      },
      attendanceData: {
        totalEmployees: 1247,
        presentEmployees: 0, // Monthly average
        absentEmployees: 0,
        lateArrivals: 987,
        earlyDepartures: 456,
        onLeave: 1234,
        workFromHome: 1876,
        overtime: 3245,
        presentPercentage: 89.2,
        absentPercentage: 10.8,
        punctualityRate: 92.4,
        avgWorkingHours: 8.1,
        totalWorkedHours: 201456,
        totalOvertimeHours: 6789,
        totalBreakTime: 25678,
        attendanceTrends: [
          { date: '2025-07-01', present: 1098, absent: 149, late: 56, onTime: 1042 },
          { date: '2025-07-02', present: 1156, absent: 91, late: 42, onTime: 1114 },
          { date: '2025-07-03', present: 1134, absent: 113, late: 38, onTime: 1096 },
          { date: '2025-07-31', present: 1089, absent: 98, late: 45, onTime: 1044 },
        ],
        departmentBreakdown: [
          { department: 'Engineering', totalEmployees: 487, presentCount: 0, absentCount: 0, presentPercentage: 91.2 },
          { department: 'Marketing', totalEmployees: 234, presentCount: 0, absentCount: 0, presentPercentage: 88.7 },
          { department: 'Finance', totalEmployees: 156, presentCount: 0, absentCount: 0, presentPercentage: 93.1 },
          { department: 'Operations', totalEmployees: 198, presentCount: 0, absentCount: 0, presentPercentage: 89.8 },
          { department: 'HR', totalEmployees: 89, presentCount: 0, absentCount: 0, presentPercentage: 90.3 },
          { department: 'Sales', totalEmployees: 83, presentCount: 0, absentCount: 0, presentPercentage: 82.1 },
        ],
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
        frequency: 'monthly',
        recipients: ['payroll@company.com', 'management@company.com'],
        nextRunDate: '2025-08-31',
        lastRunDate: '2025-07-31',
        deliveryTime: '10:00',
      },
      exportFormats: ['pdf', 'excel'],
      sharedWith: [
        {
          id: 'FIN001',
          name: 'Deepika Iyer',
          email: 'deepika.iyer@company.com',
          accessLevel: 'view',
        },
      ],
      keyInsights: [
        'Overall attendance improved to 89.2% from 87.8% last month',
        'Average working hours: 8.1 hours per day',
        'Total overtime: 6,789 hours for July',
        'Work from home requests increased by 23% compared to June',
      ],
      attendanceAlerts: [
        {
          type: 'perfect_attendance',
          message: '234 employees achieved perfect attendance this month',
          affectedEmployees: 234,
          severity: 'low',
        },
      ],
      complianceFlags: ['monthly_reporting', 'payroll_integration'],
      generationTime: 125,
      dataAccuracy: 98.9,
      lastUpdated: '2025-07-31T18:45:00Z',
      tags: ['monthly', 'payroll', 'summary'],
      description: 'Comprehensive monthly attendance summary for payroll processing and workforce analytics.',
      priority: 'high',
      accessLevel: 'restricted',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 89,
      viewCount: 267,
    },
    {
      id: 'ATR003',
      reportName: 'Late Arrivals & Early Departures Analysis',
      reportType: 'late_early',
      category: 'analytics',
      dateRange: {
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        period: 'monthly',
      },
      filters: {
        departments: ['Engineering', 'Marketing', 'Sales'],
        locations: ['All'],
        shifts: ['General Shift'],
        employeeStatus: ['Active'],
        attendanceStatus: ['Late', 'Early Out'],
        customFilters: [
          {
            field: 'late_minutes',
            operator: 'greater_than',
            value: '15',
          },
        ],
      },
      attendanceData: {
        totalEmployees: 804,
        presentEmployees: 0,
        absentEmployees: 0,
        lateArrivals: 987,
        earlyDepartures: 456,
        onLeave: 0,
        workFromHome: 0,
        overtime: 0,
        presentPercentage: 0,
        absentPercentage: 0,
        punctualityRate: 75.6,
        avgWorkingHours: 7.8,
        totalWorkedHours: 0,
        totalOvertimeHours: 0,
        totalBreakTime: 0,
        attendanceTrends: [],
        departmentBreakdown: [
          { department: 'Engineering', totalEmployees: 487, presentCount: 0, absentCount: 0, presentPercentage: 78.2 },
          { department: 'Marketing', totalEmployees: 234, presentCount: 0, absentCount: 0, presentPercentage: 71.8 },
          { department: 'Sales', totalEmployees: 83, presentCount: 0, absentCount: 0, presentPercentage: 68.5 },
        ],
      },
      employeeRecords: [
        {
          employeeId: 'EMP003',
          employeeName: 'Arjun Reddy',
          department: 'Finance',
          designation: 'Financial Analyst',
          checkInTime: '09:25',
          checkOutTime: '17:30',
          totalHours: 7.1,
          status: 'late',
          lateBy: 25,
          location: 'Mumbai',
          remarks: 'Frequent late arrival pattern observed',
        },
      ],
      status: 'generating',
      generatedBy: {
        id: 'HR003',
        name: 'Kavya Nair',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        role: 'HR Analyst',
      },
      isScheduled: false,
      exportFormats: ['excel', 'csv'],
      sharedWith: [],
      keyInsights: [],
      attendanceAlerts: [
        {
          type: 'frequent_late',
          message: '67 employees with frequent late arrivals (>5 times/month)',
          affectedEmployees: 67,
          severity: 'high',
        },
      ],
      complianceFlags: ['punctuality_tracking'],
      generationTime: 0,
      dataAccuracy: 0,
      lastUpdated: '2025-07-31T14:20:00Z',
      tags: ['punctuality', 'analytics', 'behavior'],
      description:
        'Detailed analysis of late arrivals and early departures to identify punctuality patterns and issues.',
      priority: 'medium',
      accessLevel: 'restricted',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 12,
      viewCount: 34,
    },
    {
      id: 'ATR004',
      reportName: 'Overtime Hours Analysis - Q3 2025',
      reportType: 'overtime',
      category: 'compliance',
      dateRange: {
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        period: 'quarterly',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        shifts: ['All'],
        employeeStatus: ['Active'],
        attendanceStatus: ['Overtime'],
        customFilters: [
          {
            field: 'overtime_hours',
            operator: 'greater_than',
            value: '40',
          },
        ],
      },
      attendanceData: {
        totalEmployees: 1247,
        presentEmployees: 0,
        absentEmployees: 0,
        lateArrivals: 0,
        earlyDepartures: 0,
        onLeave: 0,
        workFromHome: 0,
        overtime: 456,
        presentPercentage: 0,
        absentPercentage: 0,
        punctualityRate: 0,
        avgWorkingHours: 8.7,
        totalWorkedHours: 0,
        totalOvertimeHours: 15678,
        totalBreakTime: 0,
        attendanceTrends: [],
        departmentBreakdown: [
          { department: 'Engineering', totalEmployees: 487, presentCount: 0, absentCount: 0, presentPercentage: 0 },
          { department: 'Operations', totalEmployees: 198, presentCount: 0, absentCount: 0, presentPercentage: 0 },
        ],
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
        frequency: 'monthly',
        recipients: ['compliance@company.com', 'legal@company.com'],
        nextRunDate: '2025-08-31',
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
        'Total overtime hours: 15,678 across all departments',
        'Average overtime per employee: 34.4 hours/quarter',
        '23 employees exceeded 60 hours overtime limit',
        'Engineering team accounts for 45% of total overtime',
      ],
      attendanceAlerts: [
        {
          type: 'overtime_threshold',
          message: '23 employees exceeded quarterly overtime limits',
          affectedEmployees: 23,
          severity: 'high',
        },
      ],
      complianceFlags: ['labor_law_compliance', 'overtime_regulations', 'working_time_directive'],
      generationTime: 89,
      dataAccuracy: 99.1,
      lastUpdated: '2025-07-30T11:15:00Z',
      tags: ['overtime', 'compliance', 'quarterly'],
      description: 'Quarterly overtime analysis for labor law compliance and workforce optimization.',
      priority: 'high',
      accessLevel: 'confidential',
      createdDate: '2025-07-30',
      modifiedDate: '2025-07-30',
      downloadCount: 34,
      viewCount: 78,
    },
    {
      id: 'ATR005',
      reportName: 'Biometric Raw Data Export',
      reportType: 'biometric_raw',
      category: 'operational',
      dateRange: {
        startDate: '2025-07-31',
        endDate: '2025-07-31',
        period: 'daily',
      },
      filters: {
        departments: ['All'],
        locations: ['Mumbai Office'],
        shifts: ['All'],
        employeeStatus: ['Active'],
        attendanceStatus: ['All'],
        customFilters: [],
      },
      attendanceData: {
        totalEmployees: 634,
        presentEmployees: 587,
        absentEmployees: 47,
        lateArrivals: 0,
        earlyDepartures: 0,
        onLeave: 0,
        workFromHome: 0,
        overtime: 0,
        presentPercentage: 92.6,
        absentPercentage: 7.4,
        punctualityRate: 0,
        avgWorkingHours: 0,
        totalWorkedHours: 0,
        totalOvertimeHours: 0,
        totalBreakTime: 0,
        attendanceTrends: [],
        departmentBreakdown: [],
      },
      employeeRecords: [],
      status: 'failed',
      generatedBy: {
        id: 'IT001',
        name: 'Vikram Patel',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        role: 'IT Administrator',
      },
      isScheduled: false,
      exportFormats: ['csv'],
      sharedWith: [],
      keyInsights: [],
      attendanceAlerts: [],
      complianceFlags: ['biometric_data_protection'],
      generationTime: 0,
      dataAccuracy: 0,
      lastUpdated: '2025-07-31T16:30:00Z',
      tags: ['biometric', 'raw-data', 'technical'],
      description: 'Raw biometric attendance data export for technical analysis and system integration.',
      priority: 'low',
      accessLevel: 'restricted',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 2,
      viewCount: 8,
    },
  ];

  const reportTypes = [
    'all',
    'daily_status',
    'monthly_summary',
    'attendance_analysis',
    'late_early',
    'overtime',
    'leave_pattern',
    'biometric_raw',
    'working_hours',
    'absenteeism',
    'muster_roll',
  ];
  const statuses = ['all', 'generating', 'completed', 'failed', 'scheduled', 'draft'];

  const filteredReports = attendanceReports.filter((report) => {
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
      case 'payroll':
        return <FaCalculator className="w-4 h-4 text-green-500" />;
      case 'compliance':
        return <RxBadge className="w-4 h-4 text-orange-500" />;
      case 'analytics':
        return <RxBarChart className="w-4 h-4 text-purple-500" />;
      case 'summary':
        return <RxPieChart className="w-4 h-4 text-teal-500" />;
      default:
        return <RxFileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily_status':
        return <RxClock className="w-4 h-4 text-blue-500" />;
      case 'monthly_summary':
        return <RxCalendar className="w-4 h-4 text-green-500" />;
      case 'attendance_analysis':
        return <RxBarChart className="w-4 h-4 text-purple-500" />;
      case 'late_early':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'overtime':
        return <RxTriangleUp className="w-4 h-4 text-red-500" />;
      case 'leave_pattern':
        return <RxCalendar className="w-4 h-4 text-teal-500" />;
      case 'biometric_raw':
        return <RxIdCard className="w-4 h-4 text-indigo-500" />;
      case 'working_hours':
        return <RxClock className="w-4 h-4 text-orange-500" />;
      case 'absenteeism':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'muster_roll':
        return <RxPerson className="w-4 h-4 text-gray-500" />;
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
  const totalReports = attendanceReports.length;
  const completedReports = attendanceReports.filter((r) => r.status === 'completed').length;
  const scheduledReports = attendanceReports.filter((r) => r.isScheduled).length;
  const avgAccuracy =
    attendanceReports.filter((r) => r.dataAccuracy > 0).reduce((sum, r) => sum + r.dataAccuracy, 0) /
    attendanceReports.filter((r) => r.dataAccuracy > 0).length;

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

          {/* Key Attendance Metrics (for completed reports) */}
          {report.status === 'completed' && report.attendanceData.totalEmployees > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Key Metrics</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Total Employees:</span>
                  <span className="font-medium ml-1">{formatNumber(report.attendanceData.totalEmployees)}</span>
                </div>
                {report.attendanceData.presentEmployees > 0 && (
                  <div>
                    <span className="text-gray-600">Present:</span>
                    <span className="font-medium ml-1 text-green-600">
                      {formatNumber(report.attendanceData.presentEmployees)}
                    </span>
                  </div>
                )}
                {report.attendanceData.presentPercentage > 0 && (
                  <div>
                    <span className="text-gray-600">Attendance:</span>
                    <span className="font-medium ml-1 text-blue-600">
                      {formatPercentage(report.attendanceData.presentPercentage)}
                    </span>
                  </div>
                )}
                {report.attendanceData.lateArrivals > 0 && (
                  <div>
                    <span className="text-gray-600">Late Arrivals:</span>
                    <span className="font-medium ml-1 text-yellow-600">
                      {formatNumber(report.attendanceData.lateArrivals)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attendance Alerts */}
          {report.attendanceAlerts.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Alerts ({report.attendanceAlerts.length})</p>
              <div className="space-y-1">
                {report.attendanceAlerts.slice(0, 2).map((alert, index) => (
                  <div key={index} className={`text-xs p-2 rounded ${getAlertSeverityColor(alert.severity)}`}>
                    <div className="font-medium">
                      {alert.type.replace('_', ' ').charAt(0).toUpperCase() + alert.type.replace('_', ' ').slice(1)}
                    </div>
                    <div className="text-xs">{alert.affectedEmployees} employees affected</div>
                  </div>
                ))}
                {report.attendanceAlerts.length > 2 && (
                  <p className="text-xs text-gray-500">+{report.attendanceAlerts.length - 2} more alerts</p>
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

          {/* Compliance Flags */}
          {report.complianceFlags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {report.complianceFlags.slice(0, 2).map((flag, index) => (
                  <span key={index} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    {flag.replace('_', ' ')}
                  </span>
                ))}
                {report.complianceFlags.length > 2 && (
                  <span className="text-xs text-gray-500">+{report.complianceFlags.length - 2}</span>
                )}
              </div>
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
                Attendance Metrics
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status & Quality
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated By
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alerts & Insights
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
                  {report.status === 'completed' && report.attendanceData.totalEmployees > 0 ? (
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatNumber(report.attendanceData.totalEmployees)}
                      </div>
                      <div className="text-xs text-gray-500">Total Employees</div>
                      {report.attendanceData.presentPercentage > 0 && (
                        <div className="text-xs text-green-600 font-medium">
                          {formatPercentage(report.attendanceData.presentPercentage)} present
                        </div>
                      )}
                      {report.attendanceData.lateArrivals > 0 && (
                        <div className="text-xs text-yellow-600">
                          {formatNumber(report.attendanceData.lateArrivals)} late
                        </div>
                      )}
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
                  {report.complianceFlags.length > 0 && (
                    <div className="text-xs text-orange-600">{report.complianceFlags.length} compliance flags</div>
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
                  <div className="text-sm font-medium text-gray-900">{report.attendanceAlerts.length} Alerts</div>
                  {report.attendanceAlerts.length > 0 && (
                    <div className="text-xs">
                      {report.attendanceAlerts.filter((a) => a.severity === 'high').length > 0 && (
                        <span className="text-red-600">
                          {report.attendanceAlerts.filter((a) => a.severity === 'high').length} high
                        </span>
                      )}
                      {report.attendanceAlerts.filter((a) => a.severity === 'medium').length > 0 && (
                        <span className="text-yellow-600 ml-1">
                          {report.attendanceAlerts.filter((a) => a.severity === 'medium').length} medium
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Reports</h1>
            <p className="text-gray-600">
              Comprehensive attendance tracking and analysis reports for workforce management
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
            <span>Live Dashboard</span>
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
          Showing {filteredReports.length} of {attendanceReports.length} attendance reports
          {reportTypeFilter !== 'all' && ` • ${reportTypeFilter.replace('_', ' ')} reports`}
          {statusFilter !== 'all' && ` • ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default AttendanceReports;
