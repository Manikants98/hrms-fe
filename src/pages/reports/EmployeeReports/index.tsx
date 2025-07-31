import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';
import {
  RxBackpack,
  RxBadge,
  RxBarChart,
  RxCalendar,
  RxCheckCircled,
  RxClock,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxExit,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxMagnifyingGlass,
  RxMinus,
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
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';
import Clock from '../../../shared/clock';

interface EmployeeReport {
  id: string;
  reportName: string;
  reportType:
    | 'employee_details'
    | 'attendance'
    | 'performance'
    | 'payroll'
    | 'leave'
    | 'compliance'
    | 'demographics'
    | 'turnover'
    | 'training'
    | 'custom';
  category: 'operational' | 'strategic' | 'compliance' | 'analytics' | 'financial';

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
    employmentStatus: string[];
    customFilters: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
  };

  // Report Metrics and Data
  dataPoints: {
    totalEmployees: number;
    activeEmployees: number;
    newHires: number;
    separations: number;
    averageTenure: number;
    averageAge: number;
    genderDistribution: {
      male: number;
      female: number;
      other: number;
    };
    departmentBreakdown: Array<{
      department: string;
      count: number;
      percentage: number;
    }>;
  };

  // Report Status and Generation Info
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
  };

  // Export and Sharing
  exportFormats: ('pdf' | 'excel' | 'csv' | 'powerpoint')[];
  sharedWith: Array<{
    id: string;
    name: string;
    email: string;
    accessLevel: 'view' | 'edit' | 'admin';
  }>;

  // Report Insights
  keyInsights: string[];
  recommendations: string[];
  trends: Array<{
    metric: string;
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    description: string;
  }>;

  // Visualization Config
  chartTypes: string[];
  visualizations: Array<{
    type: 'bar' | 'line' | 'pie' | 'donut' | 'gauge' | 'table';
    title: string;
  }>;

  // Compliance and Approval
  requiresApproval: boolean;
  approvedBy?: {
    id: string;
    name: string;
    approvedDate: string;
  };
  complianceFlags: string[];

  // Performance Metrics
  generationTime: number; // in seconds
  dataAccuracy: number; // percentage
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

const EmployeeReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Custom Chip component (same as other components)
  const Chip = ({
    label,
    variant = 'filled',
    color = 'default',
    size = 'medium',
    className = '',
  }: {
    label: string;
    variant?: 'filled' | 'outlined';
    color?: 'default' | 'primary' | 'success' | 'error' | 'warning';
    size?: 'small' | 'medium';
    className?: string;
  }) => {
    const getColorClasses = () => {
      const baseClasses = size === 'small' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

      if (variant === 'outlined') {
        switch (color) {
          case 'primary':
            return `${baseClasses} border border-blue-500 text-blue-700 bg-blue-50`;
          case 'success':
            return `${baseClasses} border border-green-500 text-green-700 bg-green-50`;
          case 'error':
            return `${baseClasses} border border-red-500 text-red-700 bg-red-50`;
          case 'warning':
            return `${baseClasses} border border-yellow-500 text-yellow-700 bg-yellow-50`;
          default:
            return `${baseClasses} border border-gray-300 text-gray-700 bg-gray-50`;
        }
      } else {
        switch (color) {
          case 'primary':
            return `${baseClasses} bg-blue-500 text-white`;
          case 'success':
            return `${baseClasses} bg-green-500 text-white`;
          case 'error':
            return `${baseClasses} bg-red-500 text-white`;
          case 'warning':
            return `${baseClasses} bg-yellow-500 text-white`;
          default:
            return `${baseClasses} bg-gray-500 text-white`;
        }
      }
    };

    return (
      <span className={`inline-flex items-center rounded-full font-medium ${getColorClasses()} ${className}`}>
        {label}
      </span>
    );
  };

  // Mock employee reports data
  const employeeReports: EmployeeReport[] = [
    {
      id: 'RPT001',
      reportName: 'Monthly Employee Headcount Analysis',
      reportType: 'employee_details',
      category: 'operational',
      dateRange: {
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        period: 'monthly',
      },
      filters: {
        departments: ['Engineering', 'Marketing', 'Finance'],
        locations: ['Mumbai', 'Bangalore', 'Delhi'],
        employeeGrades: ['L1', 'L2', 'L3', 'L4', 'L5'],
        employmentStatus: ['Active', 'On Leave'],
        customFilters: [],
      },
      dataPoints: {
        totalEmployees: 1247,
        activeEmployees: 1198,
        newHires: 45,
        separations: 12,
        averageTenure: 3.2,
        averageAge: 28.5,
        genderDistribution: {
          male: 672,
          female: 498,
          other: 28,
        },
        departmentBreakdown: [
          { department: 'Engineering', count: 487, percentage: 39.1 },
          { department: 'Marketing', count: 234, percentage: 18.8 },
          { department: 'Finance', count: 156, percentage: 12.5 },
          { department: 'Operations', count: 198, percentage: 15.9 },
          { department: 'HR', count: 89, percentage: 7.1 },
          { department: 'Sales', count: 83, percentage: 6.7 },
        ],
      },
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
      },
      exportFormats: ['pdf', 'excel', 'powerpoint'],
      sharedWith: [
        {
          id: 'MGR001',
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@company.com',
          accessLevel: 'view',
        },
      ],
      keyInsights: [
        'Engineering department represents 39.1% of total workforce',
        'Gender distribution: 56% male, 41% female, 3% other',
        'Average employee age decreased by 0.5 years from last month',
        'Retention rate improved to 96.4% this month',
      ],
      recommendations: [
        'Consider targeted recruitment for underrepresented departments',
        'Implement diversity initiatives to improve gender balance',
        'Focus on retention strategies for high-turnover departments',
      ],
      trends: [
        {
          metric: 'Total Employees',
          direction: 'up',
          percentage: 3.8,
          description: 'Headcount increased by 3.8% compared to last month',
        },
        {
          metric: 'Average Tenure',
          direction: 'up',
          percentage: 2.1,
          description: 'Employee tenure improved indicating better retention',
        },
      ],
      chartTypes: ['bar', 'pie', 'line'],
      visualizations: [
        {
          type: 'pie',
          title: 'Department Distribution',
        },
        {
          type: 'bar',
          title: 'Gender Distribution by Department',
        },
      ],
      requiresApproval: false,
      complianceFlags: [],
      generationTime: 45,
      dataAccuracy: 99.2,
      lastUpdated: '2025-07-31T10:30:00Z',
      tags: ['headcount', 'demographics', 'monthly'],
      description:
        'Comprehensive monthly analysis of employee headcount, demographics, and distribution across departments and locations.',
      priority: 'high',
      accessLevel: 'public',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 156,
      viewCount: 428,
    },
    {
      id: 'RPT002',
      reportName: 'Q2 Performance Analytics Dashboard',
      reportType: 'performance',
      category: 'strategic',
      dateRange: {
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        period: 'quarterly',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        employeeGrades: ['L3', 'L4', 'L5'],
        employmentStatus: ['Active'],
        customFilters: [
          {
            field: 'performance_rating',
            operator: 'greater_than',
            value: '3.0',
          },
        ],
      },
      dataPoints: {
        totalEmployees: 945,
        activeEmployees: 945,
        newHires: 0,
        separations: 0,
        averageTenure: 4.1,
        averageAge: 30.2,
        genderDistribution: {
          male: 521,
          female: 398,
          other: 26,
        },
        departmentBreakdown: [
          { department: 'Engineering', count: 387, percentage: 41.0 },
          { department: 'Marketing', count: 189, percentage: 20.0 },
          { department: 'Finance', count: 145, percentage: 15.3 },
          { department: 'Operations', count: 224, percentage: 23.7 },
        ],
      },
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
        recipients: ['leadership@company.com', 'hr@company.com'],
        nextRunDate: '2025-09-30',
        lastRunDate: '2025-06-30',
      },
      exportFormats: ['pdf', 'powerpoint'],
      sharedWith: [
        {
          id: 'CEO001',
          name: 'Vikram Mehta',
          email: 'vikram.mehta@company.com',
          accessLevel: 'view',
        },
      ],
      keyInsights: [
        'Average performance rating: 4.2/5.0 across all departments',
        'Engineering team shows highest performance consistency',
        '23% of employees exceeded their quarterly goals',
        'Performance improvement of 8.5% compared to Q1',
      ],
      recommendations: [
        'Implement best practices from Engineering across other departments',
        'Provide additional support for underperforming teams',
        'Consider performance-based incentive programs',
      ],
      trends: [
        {
          metric: 'Average Performance',
          direction: 'up',
          percentage: 8.5,
          description: 'Performance scores improved significantly this quarter',
        },
        {
          metric: 'Goal Achievement',
          direction: 'up',
          percentage: 12.3,
          description: 'More employees meeting and exceeding goals',
        },
      ],
      chartTypes: ['bar', 'line', 'gauge'],
      visualizations: [
        {
          type: 'gauge',
          title: 'Overall Performance Score',
        },
        {
          type: 'bar',
          title: 'Department Performance Comparison',
        },
      ],
      requiresApproval: true,
      approvedBy: {
        id: 'CHRO001',
        name: 'Sunita Sharma',
        approvedDate: '2025-07-15',
      },
      complianceFlags: [],
      generationTime: 120,
      dataAccuracy: 98.7,
      lastUpdated: '2025-07-15T14:22:00Z',
      tags: ['performance', 'quarterly', 'analytics'],
      description:
        'Comprehensive quarterly performance analysis including goal achievement, ratings, and departmental comparisons.',
      priority: 'high',
      accessLevel: 'restricted',
      createdDate: '2025-07-10',
      modifiedDate: '2025-07-15',
      downloadCount: 89,
      viewCount: 234,
    },
    {
      id: 'RPT003',
      reportName: 'Attendance & Leave Summary Report',
      reportType: 'attendance',
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
        employmentStatus: ['Active'],
        customFilters: [],
      },
      dataPoints: {
        totalEmployees: 1247,
        activeEmployees: 1198,
        newHires: 0,
        separations: 0,
        averageTenure: 0,
        averageAge: 0,
        genderDistribution: {
          male: 0,
          female: 0,
          other: 0,
        },
        departmentBreakdown: [],
      },
      status: 'generating',
      generatedBy: {
        id: 'HR003',
        name: 'Kavya Nair',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        role: 'HR Analyst',
      },
      isScheduled: true,
      scheduleConfig: {
        frequency: 'monthly',
        recipients: ['operations@company.com', 'hr@company.com'],
        nextRunDate: '2025-08-31',
      },
      exportFormats: ['excel', 'csv'],
      sharedWith: [],
      keyInsights: [],
      recommendations: [],
      trends: [],
      chartTypes: ['line', 'bar'],
      visualizations: [],
      requiresApproval: false,
      complianceFlags: ['attendance_tracking'],
      generationTime: 0,
      dataAccuracy: 0,
      lastUpdated: '2025-07-31T16:45:00Z',
      tags: ['attendance', 'leave', 'operational'],
      description: 'Monthly attendance patterns, leave utilization, and workforce availability analysis.',
      priority: 'medium',
      accessLevel: 'public',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 0,
      viewCount: 12,
    },
    {
      id: 'RPT004',
      reportName: 'Compensation Benchmarking Analysis',
      reportType: 'payroll',
      category: 'financial',
      dateRange: {
        startDate: '2025-01-01',
        endDate: '2025-06-30',
        period: 'custom',
      },
      filters: {
        departments: ['Engineering', 'Marketing', 'Finance'],
        locations: ['All'],
        employeeGrades: ['L2', 'L3', 'L4', 'L5'],
        employmentStatus: ['Active'],
        customFilters: [
          {
            field: 'salary_band',
            operator: 'between',
            value: '500000-2000000',
          },
        ],
      },
      dataPoints: {
        totalEmployees: 789,
        activeEmployees: 789,
        newHires: 0,
        separations: 0,
        averageTenure: 0,
        averageAge: 0,
        genderDistribution: {
          male: 0,
          female: 0,
          other: 0,
        },
        departmentBreakdown: [],
      },
      status: 'completed',
      generatedBy: {
        id: 'FIN001',
        name: 'Deepika Iyer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        role: 'Finance Manager',
      },
      isScheduled: false,
      exportFormats: ['pdf', 'excel'],
      sharedWith: [
        {
          id: 'CHRO001',
          name: 'Sunita Sharma',
          email: 'sunita.sharma@company.com',
          accessLevel: 'edit',
        },
      ],
      keyInsights: [
        'Average salary increase of 12% across all levels',
        'Engineering salaries 15% above market benchmark',
        'Gender pay gap reduced to 3.2% from 5.8%',
        'Compensation competitiveness improved significantly',
      ],
      recommendations: [
        'Continue monitoring market trends quarterly',
        'Address remaining pay equity gaps',
        'Consider variable pay structures for retention',
      ],
      trends: [
        {
          metric: 'Average Salary',
          direction: 'up',
          percentage: 12.0,
          description: 'Salary increases implemented across organization',
        },
        {
          metric: 'Pay Equity',
          direction: 'up',
          percentage: 45.2,
          description: 'Significant improvement in pay equity metrics',
        },
      ],
      chartTypes: ['bar', 'line', 'table'],
      visualizations: [
        {
          type: 'bar',
          title: 'Salary Distribution by Department',
        },
        {
          type: 'line',
          title: 'Compensation Trends Over Time',
        },
      ],
      requiresApproval: true,
      approvedBy: {
        id: 'CFO001',
        name: 'Amit Gupta',
        approvedDate: '2025-07-28',
      },
      complianceFlags: ['confidential_data', 'salary_information'],
      generationTime: 180,
      dataAccuracy: 99.8,
      lastUpdated: '2025-07-28T11:15:00Z',
      tags: ['compensation', 'benchmarking', 'financial'],
      description:
        'Comprehensive analysis of compensation structures, market benchmarking, and pay equity across the organization.',
      priority: 'high',
      accessLevel: 'confidential',
      createdDate: '2025-07-25',
      modifiedDate: '2025-07-28',
      downloadCount: 23,
      viewCount: 67,
    },
    {
      id: 'RPT005',
      reportName: 'Diversity & Inclusion Metrics',
      reportType: 'demographics',
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
        employmentStatus: ['Active'],
        customFilters: [],
      },
      dataPoints: {
        totalEmployees: 1247,
        activeEmployees: 1198,
        newHires: 145,
        separations: 34,
        averageTenure: 3.2,
        averageAge: 28.5,
        genderDistribution: {
          male: 672,
          female: 498,
          other: 28,
        },
        departmentBreakdown: [
          { department: 'Engineering', count: 487, percentage: 39.1 },
          { department: 'Marketing', count: 234, percentage: 18.8 },
          { department: 'Finance', count: 156, percentage: 12.5 },
        ],
      },
      status: 'failed',
      generatedBy: {
        id: 'DIV001',
        name: 'Rohan Patel',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        role: 'Diversity Officer',
      },
      isScheduled: true,
      scheduleConfig: {
        frequency: 'quarterly',
        recipients: ['diversity@company.com', 'leadership@company.com'],
        nextRunDate: '2025-10-31',
      },
      exportFormats: ['pdf', 'excel'],
      sharedWith: [],
      keyInsights: [],
      recommendations: [],
      trends: [],
      chartTypes: ['pie', 'bar', 'donut'],
      visualizations: [],
      requiresApproval: true,
      complianceFlags: ['diversity_reporting', 'eeo_compliance'],
      generationTime: 0,
      dataAccuracy: 0,
      lastUpdated: '2025-07-31T09:12:00Z',
      tags: ['diversity', 'inclusion', 'compliance'],
      description:
        'Comprehensive diversity and inclusion metrics tracking representation, hiring patterns, and progression across all organizational levels.',
      priority: 'high',
      accessLevel: 'restricted',
      createdDate: '2025-07-30',
      modifiedDate: '2025-07-31',
      downloadCount: 0,
      viewCount: 8,
    },
  ];

  const reportTypes = [
    'all',
    'employee_details',
    'attendance',
    'performance',
    'payroll',
    'leave',
    'compliance',
    'demographics',
    'turnover',
    'training',
    'custom',
  ];
  const statuses = ['all', 'generating', 'completed', 'failed', 'scheduled', 'draft'];

  // Filter employee reports
  const filteredReports = employeeReports.filter((report) => {
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
      case 'strategic':
        return <RxTarget className="w-4 h-4 text-purple-500" />;
      case 'compliance':
        return <RxBadge className="w-4 h-4 text-orange-500" />;
      case 'analytics':
        return <RxBarChart className="w-4 h-4 text-green-500" />;
      case 'financial':
        return <FaCalculator className="w-4 h-4 text-red-500" />;
      default:
        return <RxFileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'employee_details':
        return <RxPerson className="w-4 h-4 text-blue-500" />;
      case 'attendance':
        return <RxClock className="w-4 h-4 text-green-500" />;
      case 'performance':
        return <RxTriangleUp className="w-4 h-4 text-purple-500" />;
      case 'payroll':
        return <FaCalculator className="w-4 h-4 text-red-500" />;
      case 'leave':
        return <RxCalendar className="w-4 h-4 text-yellow-500" />;
      case 'compliance':
        return <RxBadge className="w-4 h-4 text-orange-500" />;
      case 'demographics':
        return <RxPieChart className="w-4 h-4 text-teal-500" />;
      case 'turnover':
        return <RxExit className="w-4 h-4 text-pink-500" />;
      case 'training':
        return <RxBackpack className="w-4 h-4 text-indigo-500" />;
      case 'custom':
        return <RxGear className="w-4 h-4 text-gray-500" />;
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <RxTriangleUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <RxTriangleDown className="w-3 h-3 text-red-500" />;
      case 'stable':
        return <RxMinus className="w-3 h-3 text-gray-500" />;
      default:
        return <RxMinus className="w-3 h-3 text-gray-500" />;
    }
  };

  // Calculate statistics
  const totalReports = employeeReports.length;
  const completedReports = employeeReports.filter((r) => r.status === 'completed').length;
  const scheduledReports = employeeReports.filter((r) => r.isScheduled).length;
  const avgAccuracy =
    employeeReports.filter((r) => r.dataAccuracy > 0).reduce((sum, r) => sum + r.dataAccuracy, 0) /
    employeeReports.filter((r) => r.dataAccuracy > 0).length;

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

          {/* Key Metrics (for completed reports) */}
          {report.status === 'completed' && report.dataPoints.totalEmployees > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Key Metrics</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Total Employees:</span>
                  <span className="font-medium ml-1">{formatNumber(report.dataPoints.totalEmployees)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Active:</span>
                  <span className="font-medium ml-1">{formatNumber(report.dataPoints.activeEmployees)}</span>
                </div>
                {report.dataPoints.newHires > 0 && (
                  <div>
                    <span className="text-gray-600">New Hires:</span>
                    <span className="font-medium ml-1 text-green-600">{formatNumber(report.dataPoints.newHires)}</span>
                  </div>
                )}
                {report.dataPoints.separations > 0 && (
                  <div>
                    <span className="text-gray-600">Separations:</span>
                    <span className="font-medium ml-1 text-red-600">{formatNumber(report.dataPoints.separations)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Trends (for completed reports) */}
          {report.trends.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Key Trends</p>
              <div className="space-y-1">
                {report.trends.slice(0, 2).map((trend, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(trend.direction)}
                      <span className="text-gray-600">{trend.metric}</span>
                    </div>
                    <span
                      className={`font-medium ${
                        trend.direction === 'up'
                          ? 'text-green-600'
                          : trend.direction === 'down'
                            ? 'text-red-600'
                            : 'text-gray-600'
                      }`}
                    >
                      {trend.direction === 'stable'
                        ? 'Stable'
                        : `${trend.percentage > 0 ? '+' : ''}${trend.percentage}%`}
                    </span>
                  </div>
                ))}
                {report.trends.length > 2 && (
                  <p className="text-xs text-gray-500">+{report.trends.length - 2} more trends</p>
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
                  Next: {new Date(report.scheduleConfig.nextRunDate).toLocaleDateString()}
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
                Key Metrics
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status & Quality
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated By
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage & Access
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
                  {report.status === 'completed' && report.dataPoints.totalEmployees > 0 ? (
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatNumber(report.dataPoints.totalEmployees)}
                      </div>
                      <div className="text-xs text-gray-500">Total Employees</div>
                      {report.dataPoints.newHires > 0 && (
                        <div className="text-xs text-green-600">+{formatNumber(report.dataPoints.newHires)} hired</div>
                      )}
                      {report.dataPoints.separations > 0 && (
                        <div className="text-xs text-red-600">-{formatNumber(report.dataPoints.separations)} left</div>
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
                  <div className="text-sm font-medium text-gray-900">
                    {report.accessLevel.charAt(0).toUpperCase() + report.accessLevel.slice(1)}
                  </div>
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
                  {report.sharedWith.length > 0 && (
                    <div className="text-xs text-blue-600 mt-1">Shared with {report.sharedWith.length}</div>
                  )}
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Employee Reports</h1>
            <p className="text-gray-600">
              Generate, manage, and analyze comprehensive employee reports for data-driven HR decisions
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
            <span>Create Report</span>
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
            <span>Report Templates</span>
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
          Showing {filteredReports.length} of {employeeReports.length} employee reports
          {reportTypeFilter !== 'all' && ` • ${reportTypeFilter.replace('_', ' ')} reports`}
          {statusFilter !== 'all' && ` • ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default EmployeeReports;
