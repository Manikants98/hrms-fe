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
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxIdCard,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxReload,
  RxRows,
  RxShare1,
  RxTarget,
  RxTimer,
} from 'react-icons/rx';
import Clock from '../../../shared/clock';

interface PayrollReport {
  id: string;
  reportName: string;
  reportType:
    | 'payroll_summary'
    | 'payslip_details'
    | 'tax_liability'
    | 'statutory_compliance'
    | 'cost_analysis'
    | 'year_end'
    | 'employee_wise'
    | 'department_wise'
    | 'audit_trail'
    | 'custom';
  category: 'operational' | 'compliance' | 'financial' | 'statutory' | 'analytics';

  // Report Configuration
  dateRange: {
    startDate: string;
    endDate: string;
    period: 'monthly' | 'quarterly' | 'annual' | 'custom';
    payrollCycle: string;
  };

  // Filters Applied
  filters: {
    departments: string[];
    locations: string[];
    employeeGrades: string[];
    employmentStatus: string[];
    payrollComponents: string[];
    customFilters: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
  };

  // Payroll Data Summary
  payrollData: {
    totalEmployees: number;
    processedEmployees: number;
    totalGrossPay: number;
    totalNetPay: number;
    totalDeductions: number;
    totalTaxes: number;
    totalBenefits: number;
    totalOvertime: number;
    totalBonus: number;

    // Statutory Components
    statutoryDeductions: {
      providentFund: number;
      esi: number;
      professionalTax: number;
      incomeTax: number;
      laborWelfareFund: number;
    };

    // Cost Breakdown
    costBreakdown: {
      basicSalary: number;
      allowances: number;
      overtime: number;
      bonus: number;
      incentives: number;
      employerContributions: number;
    };

    departmentBreakdown: Array<{
      department: string;
      employeeCount: number;
      grossPay: number;
      netPay: number;
      deductions: number;
      costPercentage: number;
    }>;
  };

  // Individual Employee Records
  employeeRecords: Array<{
    employeeId: string;
    employeeName: string;
    department: string;
    designation: string;
    basicSalary: number;
    grossPay: number;
    netPay: number;
    totalDeductions: number;
    incomeTax: number;
    providentFund: number;
    esi: number;
    professionalTax: number;
    workingDays: number;
    paidDays: number;
    leaveDays: number;
    overtimeHours: number;
    overtimePay: number;
    bonus: number;
    allowances: {
      hra: number;
      medical: number;
      transport: number;
      special: number;
      other: number;
    };
    deductions: {
      pf: number;
      esi: number;
      tax: number;
      loan: number;
      advance: number;
      other: number;
    };
    bankDetails: {
      accountNumber: string;
      ifscCode: string;
      bankName: string;
    };
  }>;

  // Report Status and Generation
  status: 'generating' | 'completed' | 'failed' | 'scheduled' | 'approved' | 'locked';
  generatedBy: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };

  // Approval Workflow
  requiresApproval: boolean;
  approvalWorkflow: Array<{
    level: number;
    approverRole: 'payroll_manager' | 'finance_head' | 'cfo' | 'statutory_officer';
    approverName: string;
    approverId: string;
    status: 'pending' | 'approved' | 'rejected';
    comments: string;
    approvedDate?: string;
  }>;

  // Schedule Configuration
  isScheduled: boolean;
  scheduleConfig?: {
    frequency: 'monthly' | 'quarterly' | 'annual';
    recipients: string[];
    nextRunDate: string;
    lastRunDate?: string;
    deliveryTime: string;
    autoSubmit: boolean;
  };

  // Export and Sharing
  exportFormats: ('pdf' | 'excel' | 'csv' | 'json')[];
  sharedWith: Array<{
    id: string;
    name: string;
    email: string;
    accessLevel: 'view' | 'edit' | 'approve';
  }>;

  // Compliance and Statutory
  complianceFlags: string[];
  statutoryForms: Array<{
    formType: 'Form16' | 'Form24Q' | 'EPF' | 'ESI' | 'PT' | 'LWF';
    generatedDate: string;
    submissionDate?: string;
    status: 'generated' | 'submitted' | 'accepted' | 'rejected';
  }>;

  // Analytics and Insights
  keyInsights: string[];
  costAnalytics: {
    monthlyTrend: Array<{
      month: string;
      totalCost: number;
      employeeCount: number;
      averageCostPerEmployee: number;
    }>;
    departmentCostComparison: Array<{
      department: string;
      currentCost: number;
      previousCost: number;
      variance: number;
      variancePercentage: number;
    }>;
  };

  // Variance Analysis
  varianceAnalysis: {
    budgetVariance: number;
    previousPeriodVariance: number;
    significantChanges: Array<{
      component: string;
      currentValue: number;
      previousValue: number;
      variance: number;
      reason: string;
    }>;
  };

  // Performance Metrics
  generationTime: number;
  dataAccuracy: number;
  reconciliationStatus: 'pending' | 'completed' | 'discrepancy';

  // Administrative
  tags: string[];
  description: string;
  priority: 'high' | 'medium' | 'low';
  accessLevel: 'public' | 'restricted' | 'confidential';

  createdDate: string;
  modifiedDate: string;
  downloadCount: number;
  viewCount: number;
  lastUpdated: string;
}

const PayrollReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Custom Chip component
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

  // Mock payroll reports data
  const payrollReports: PayrollReport[] = [
    {
      id: 'PR001',
      reportName: 'Monthly Payroll Summary - July 2025',
      reportType: 'payroll_summary',
      category: 'operational',
      dateRange: {
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        period: 'monthly',
        payrollCycle: 'July 2025',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        employeeGrades: ['All'],
        employmentStatus: ['Active'],
        payrollComponents: ['All'],
        customFilters: [],
      },
      payrollData: {
        totalEmployees: 1247,
        processedEmployees: 1198,
        totalGrossPay: 98750000,
        totalNetPay: 74562500,
        totalDeductions: 24187500,
        totalTaxes: 14825000,
        totalBenefits: 8937500,
        totalOvertime: 2156000,
        totalBonus: 4875000,
        statutoryDeductions: {
          providentFund: 8975000,
          esi: 985000,
          professionalTax: 623000,
          incomeTax: 14825000,
          laborWelfareFund: 187500,
        },
        costBreakdown: {
          basicSalary: 59250000,
          allowances: 29625000,
          overtime: 2156000,
          bonus: 4875000,
          incentives: 2844000,
          employerContributions: 12456000,
        },
        departmentBreakdown: [
          {
            department: 'Engineering',
            employeeCount: 487,
            grossPay: 38612500,
            netPay: 29039625,
            deductions: 9572875,
            costPercentage: 39.1,
          },
          {
            department: 'Marketing',
            employeeCount: 234,
            grossPay: 18562500,
            netPay: 13921875,
            deductions: 4640625,
            costPercentage: 18.8,
          },
          {
            department: 'Finance',
            employeeCount: 156,
            grossPay: 12343750,
            netPay: 9257812,
            deductions: 3085938,
            costPercentage: 12.5,
          },
          {
            department: 'Operations',
            employeeCount: 198,
            grossPay: 15703125,
            netPay: 11777344,
            deductions: 3925781,
            costPercentage: 15.9,
          },
          {
            department: 'HR',
            employeeCount: 89,
            grossPay: 7046875,
            netPay: 5285156,
            deductions: 1761719,
            costPercentage: 7.1,
          },
          {
            department: 'Sales',
            employeeCount: 83,
            grossPay: 6481250,
            netPay: 4860938,
            deductions: 1620312,
            costPercentage: 6.6,
          },
        ],
      },
      employeeRecords: [
        {
          employeeId: 'EMP001',
          employeeName: 'Rahul Sharma',
          department: 'Engineering',
          designation: 'Senior Software Engineer',
          basicSalary: 70000,
          grossPay: 115000,
          netPay: 86250,
          totalDeductions: 28750,
          incomeTax: 12500,
          providentFund: 8400,
          esi: 0,
          professionalTax: 500,
          workingDays: 31,
          paidDays: 29,
          leaveDays: 2,
          overtimeHours: 8,
          overtimePay: 2500,
          bonus: 10000,
          allowances: {
            hra: 28000,
            medical: 5000,
            transport: 3000,
            special: 5000,
            other: 2000,
          },
          deductions: {
            pf: 8400,
            esi: 0,
            tax: 12500,
            loan: 5000,
            advance: 2000,
            other: 850,
          },
          bankDetails: {
            accountNumber: '****6789',
            ifscCode: 'HDFC0001234',
            bankName: 'HDFC Bank',
          },
        },
      ],
      status: 'completed',
      generatedBy: {
        id: 'PAY001',
        name: 'Anita Verma',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        role: 'Payroll Manager',
      },
      requiresApproval: true,
      approvalWorkflow: [
        {
          level: 1,
          approverRole: 'payroll_manager',
          approverName: 'Anita Verma',
          approverId: 'PAY001',
          status: 'approved',
          comments: 'Payroll processed successfully. All calculations verified.',
          approvedDate: '2025-07-31',
        },
        {
          level: 2,
          approverRole: 'finance_head',
          approverName: 'Deepika Iyer',
          approverId: 'FIN001',
          status: 'approved',
          comments: 'Financial reconciliation completed. Approved for payment.',
          approvedDate: '2025-07-31',
        },
      ],
      isScheduled: true,
      scheduleConfig: {
        frequency: 'monthly',
        recipients: ['payroll@company.com', 'finance@company.com', 'management@company.com'],
        nextRunDate: '2025-08-31',
        lastRunDate: '2025-07-31',
        deliveryTime: '09:00',
        autoSubmit: false,
      },
      exportFormats: ['pdf', 'excel', 'csv'],
      sharedWith: [
        {
          id: 'FIN001',
          name: 'Deepika Iyer',
          email: 'deepika.iyer@company.com',
          accessLevel: 'view',
        },
        {
          id: 'CEO001',
          name: 'Vikram Mehta',
          email: 'vikram.mehta@company.com',
          accessLevel: 'view',
        },
      ],
      complianceFlags: ['statutory_compliance', 'tax_filing_ready', 'audit_trail'],
      statutoryForms: [
        {
          formType: 'Form24Q',
          generatedDate: '2025-07-31',
          submissionDate: '2025-08-07',
          status: 'submitted',
        },
        {
          formType: 'EPF',
          generatedDate: '2025-07-31',
          submissionDate: '2025-08-15',
          status: 'generated',
        },
      ],
      keyInsights: [
        'Total payroll cost increased by 3.2% compared to June 2025',
        'Engineering department accounts for 39.1% of total payroll cost',
        'Overtime payments reduced by 8.5% due to improved resource planning',
        'Tax deductions account for 15% of gross payroll',
      ],
      costAnalytics: {
        monthlyTrend: [
          { month: 'May', totalCost: 95680000, employeeCount: 1234, averageCostPerEmployee: 77551 },
          { month: 'June', totalCost: 95670000, employeeCount: 1241, averageCostPerEmployee: 77106 },
          { month: 'July', totalCost: 98750000, employeeCount: 1247, averageCostPerEmployee: 79191 },
        ],
        departmentCostComparison: [
          {
            department: 'Engineering',
            currentCost: 38612500,
            previousCost: 37450000,
            variance: 1162500,
            variancePercentage: 3.1,
          },
          {
            department: 'Marketing',
            currentCost: 18562500,
            previousCost: 18125000,
            variance: 437500,
            variancePercentage: 2.4,
          },
        ],
      },
      varianceAnalysis: {
        budgetVariance: -2.3,
        previousPeriodVariance: 3.2,
        significantChanges: [
          {
            component: 'Overtime Pay',
            currentValue: 2156000,
            previousValue: 2356000,
            variance: -200000,
            reason: 'Improved resource allocation and project planning',
          },
        ],
      },
      generationTime: 45,
      dataAccuracy: 99.8,
      reconciliationStatus: 'completed',
      tags: ['monthly', 'payroll', 'statutory'],
      description:
        'Comprehensive monthly payroll summary including all salary components, deductions, and statutory compliance data.',
      priority: 'high',
      accessLevel: 'restricted',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 156,
      viewCount: 428,
      lastUpdated: '2025-07-31T10:30:00Z',
    },
    {
      id: 'PR002',
      reportName: 'Statutory Compliance Report - Q2 2025',
      reportType: 'statutory_compliance',
      category: 'compliance',
      dateRange: {
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        period: 'quarterly',
        payrollCycle: 'Q2 2025',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        employeeGrades: ['All'],
        employmentStatus: ['Active'],
        payrollComponents: ['PF', 'ESI', 'PT', 'Income Tax'],
        customFilters: [],
      },
      payrollData: {
        totalEmployees: 1241,
        processedEmployees: 1241,
        totalGrossPay: 287250000,
        totalNetPay: 215437500,
        totalDeductions: 71812500,
        totalTaxes: 43575000,
        totalBenefits: 25875000,
        totalOvertime: 6468000,
        totalBonus: 14362500,
        statutoryDeductions: {
          providentFund: 26082000,
          esi: 2872500,
          professionalTax: 1861500,
          incomeTax: 43575000,
          laborWelfareFund: 562500,
        },
        costBreakdown: {
          basicSalary: 172350000,
          allowances: 86175000,
          overtime: 6468000,
          bonus: 14362500,
          incentives: 7894500,
          employerContributions: 36225000,
        },
        departmentBreakdown: [],
      },
      employeeRecords: [],
      status: 'completed',
      generatedBy: {
        id: 'COMP001',
        name: 'Rohit Sharma',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        role: 'Compliance Officer',
      },
      requiresApproval: true,
      approvalWorkflow: [
        {
          level: 1,
          approverRole: 'statutory_officer',
          approverName: 'Rohit Sharma',
          approverId: 'COMP001',
          status: 'approved',
          comments: 'All statutory compliance requirements met. Ready for submission.',
          approvedDate: '2025-07-15',
        },
      ],
      isScheduled: true,
      scheduleConfig: {
        frequency: 'quarterly',
        recipients: ['compliance@company.com', 'legal@company.com'],
        nextRunDate: '2025-10-15',
        lastRunDate: '2025-07-15',
        deliveryTime: '14:00',
        autoSubmit: true,
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
      complianceFlags: ['epf_compliance', 'esi_compliance', 'tax_compliance', 'labor_law_compliance'],
      statutoryForms: [
        {
          formType: 'Form24Q',
          generatedDate: '2025-07-15',
          submissionDate: '2025-07-31',
          status: 'submitted',
        },
        {
          formType: 'EPF',
          generatedDate: '2025-07-15',
          submissionDate: '2025-07-31',
          status: 'accepted',
        },
        {
          formType: 'ESI',
          generatedDate: '2025-07-15',
          submissionDate: '2025-07-31',
          status: 'accepted',
        },
      ],
      keyInsights: [
        'Q2 statutory deductions totaled ₹71.8 crores',
        'EPF contributions increased by 5.2% compared to Q1',
        'All statutory forms submitted within deadlines',
        '100% compliance maintained across all regulations',
      ],
      costAnalytics: {
        monthlyTrend: [],
        departmentCostComparison: [],
      },
      varianceAnalysis: {
        budgetVariance: 0,
        previousPeriodVariance: 5.2,
        significantChanges: [],
      },
      generationTime: 89,
      dataAccuracy: 100.0,
      reconciliationStatus: 'completed',
      tags: ['quarterly', 'statutory', 'compliance'],
      description:
        'Quarterly statutory compliance report covering all mandatory deductions and government submissions.',
      priority: 'high',
      accessLevel: 'confidential',
      createdDate: '2025-07-15',
      modifiedDate: '2025-07-15',
      downloadCount: 23,
      viewCount: 67,
      lastUpdated: '2025-07-15T14:22:00Z',
    },
    {
      id: 'PR003',
      reportName: 'Department-wise Cost Analysis - July 2025',
      reportType: 'cost_analysis',
      category: 'analytics',
      dateRange: {
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        period: 'monthly',
        payrollCycle: 'July 2025',
      },
      filters: {
        departments: ['Engineering', 'Marketing', 'Finance', 'Operations'],
        locations: ['All'],
        employeeGrades: ['All'],
        employmentStatus: ['Active'],
        payrollComponents: ['All'],
        customFilters: [],
      },
      payrollData: {
        totalEmployees: 964,
        processedEmployees: 964,
        totalGrossPay: 85221875,
        totalNetPay: 64416406,
        totalDeductions: 20805469,
        totalTaxes: 12783281,
        totalBenefits: 7698984,
        totalOvertime: 1856640,
        totalBonus: 4200000,
        statutoryDeductions: {
          providentFund: 7743750,
          esi: 851250,
          professionalTax: 537500,
          incomeTax: 12783281,
          laborWelfareFund: 162500,
        },
        costBreakdown: {
          basicSalary: 51133125,
          allowances: 25566562,
          overtime: 1856640,
          bonus: 4200000,
          incentives: 2465548,
          employerContributions: 10725000,
        },
        departmentBreakdown: [
          {
            department: 'Engineering',
            employeeCount: 487,
            grossPay: 38612500,
            netPay: 29039625,
            deductions: 9572875,
            costPercentage: 45.3,
          },
          {
            department: 'Marketing',
            employeeCount: 234,
            grossPay: 18562500,
            netPay: 13921875,
            deductions: 4640625,
            costPercentage: 21.8,
          },
          {
            department: 'Finance',
            employeeCount: 156,
            grossPay: 12343750,
            netPay: 9257812,
            deductions: 3085938,
            costPercentage: 14.5,
          },
          {
            department: 'Operations',
            employeeCount: 87,
            grossPay: 15703125,
            netPay: 11777344,
            deductions: 3925781,
            costPercentage: 18.4,
          },
        ],
      },
      employeeRecords: [],
      status: 'generating',
      generatedBy: {
        id: 'ANAL001',
        name: 'Priya Singh',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        role: 'HR Analytics Manager',
      },
      requiresApproval: false,
      approvalWorkflow: [],
      isScheduled: false,
      exportFormats: ['excel', 'csv'],
      sharedWith: [],
      complianceFlags: [],
      statutoryForms: [],
      keyInsights: [],
      costAnalytics: {
        monthlyTrend: [
          { month: 'May', totalCost: 82560000, employeeCount: 945, averageCostPerEmployee: 87365 },
          { month: 'June', totalCost: 83890000, employeeCount: 952, averageCostPerEmployee: 88119 },
          { month: 'July', totalCost: 85221875, employeeCount: 964, averageCostPerEmployee: 88404 },
        ],
        departmentCostComparison: [
          {
            department: 'Engineering',
            currentCost: 38612500,
            previousCost: 37450000,
            variance: 1162500,
            variancePercentage: 3.1,
          },
          {
            department: 'Marketing',
            currentCost: 18562500,
            previousCost: 18125000,
            variance: 437500,
            variancePercentage: 2.4,
          },
          {
            department: 'Finance',
            currentCost: 12343750,
            previousCost: 12087500,
            variance: 256250,
            variancePercentage: 2.1,
          },
          {
            department: 'Operations',
            currentCost: 15703125,
            previousCost: 15227500,
            variance: 475625,
            variancePercentage: 3.1,
          },
        ],
      },
      varianceAnalysis: {
        budgetVariance: -1.8,
        previousPeriodVariance: 1.6,
        significantChanges: [
          {
            component: 'Engineering Salaries',
            currentValue: 38612500,
            previousValue: 37450000,
            variance: 1162500,
            reason: 'New hires and salary increments',
          },
        ],
      },
      generationTime: 0,
      dataAccuracy: 0,
      reconciliationStatus: 'pending',
      tags: ['department-wise', 'cost-analysis', 'monthly'],
      description: 'Detailed cost analysis report breaking down payroll expenses by department with variance analysis.',
      priority: 'medium',
      accessLevel: 'restricted',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 8,
      viewCount: 24,
      lastUpdated: '2025-07-31T16:45:00Z',
    },
    {
      id: 'PR004',
      reportName: 'Employee Payslip Details - July 2025',
      reportType: 'payslip_details',
      category: 'operational',
      dateRange: {
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        period: 'monthly',
        payrollCycle: 'July 2025',
      },
      filters: {
        departments: ['Engineering'],
        locations: ['Mumbai'],
        employeeGrades: ['L3', 'L4', 'L5'],
        employmentStatus: ['Active'],
        payrollComponents: ['All'],
        customFilters: [],
      },
      payrollData: {
        totalEmployees: 187,
        processedEmployees: 187,
        totalGrossPay: 23875000,
        totalNetPay: 17906250,
        totalDeductions: 5968750,
        totalTaxes: 3581250,
        totalBenefits: 2150625,
        totalOvertime: 468750,
        totalBonus: 1875000,
        statutoryDeductions: {
          providentFund: 2231250,
          esi: 0,
          professionalTax: 93500,
          incomeTax: 3581250,
          laborWelfareFund: 93750,
        },
        costBreakdown: {
          basicSalary: 14325000,
          allowances: 7162500,
          overtime: 468750,
          bonus: 1875000,
          incentives: 43750,
          employerContributions: 2456250,
        },
        departmentBreakdown: [
          {
            department: 'Engineering',
            employeeCount: 187,
            grossPay: 23875000,
            netPay: 17906250,
            deductions: 5968750,
            costPercentage: 100.0,
          },
        ],
      },
      employeeRecords: [
        {
          employeeId: 'EMP001',
          employeeName: 'Rahul Sharma',
          department: 'Engineering',
          designation: 'Senior Software Engineer',
          basicSalary: 70000,
          grossPay: 115000,
          netPay: 86250,
          totalDeductions: 28750,
          incomeTax: 12500,
          providentFund: 8400,
          esi: 0,
          professionalTax: 500,
          workingDays: 31,
          paidDays: 29,
          leaveDays: 2,
          overtimeHours: 8,
          overtimePay: 2500,
          bonus: 10000,
          allowances: {
            hra: 28000,
            medical: 5000,
            transport: 3000,
            special: 5000,
            other: 2000,
          },
          deductions: {
            pf: 8400,
            esi: 0,
            tax: 12500,
            loan: 5000,
            advance: 2000,
            other: 850,
          },
          bankDetails: {
            accountNumber: '****6789',
            ifscCode: 'HDFC0001234',
            bankName: 'HDFC Bank',
          },
        },
      ],
      status: 'completed',
      generatedBy: {
        id: 'PAY002',
        name: 'Kavya Nair',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        role: 'Payroll Executive',
      },
      requiresApproval: false,
      approvalWorkflow: [],
      isScheduled: true,
      scheduleConfig: {
        frequency: 'monthly',
        recipients: ['payroll@company.com'],
        nextRunDate: '2025-08-31',
        lastRunDate: '2025-07-31',
        deliveryTime: '10:00',
        autoSubmit: false,
      },
      exportFormats: ['pdf', 'excel'],
      sharedWith: [
        {
          id: 'MGR001',
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@company.com',
          accessLevel: 'view',
        },
      ],
      complianceFlags: ['payslip_generation'],
      statutoryForms: [],
      keyInsights: [
        'Average gross pay: ₹1,27,674 per employee',
        'Average net pay: ₹95,755 per employee',
        'Average deduction rate: 25% of gross pay',
        '15 employees worked overtime totaling 156 hours',
      ],
      costAnalytics: {
        monthlyTrend: [],
        departmentCostComparison: [],
      },
      varianceAnalysis: {
        budgetVariance: 0,
        previousPeriodVariance: 0,
        significantChanges: [],
      },
      generationTime: 23,
      dataAccuracy: 99.5,
      reconciliationStatus: 'completed',
      tags: ['payslip', 'employee-wise', 'engineering'],
      description:
        'Detailed payslip information for Engineering department employees including all salary components and deductions.',
      priority: 'medium',
      accessLevel: 'restricted',
      createdDate: '2025-07-31',
      modifiedDate: '2025-07-31',
      downloadCount: 45,
      viewCount: 123,
      lastUpdated: '2025-07-31T11:15:00Z',
    },
    {
      id: 'PR005',
      reportName: 'Year-End Tax Report - FY 2024-25',
      reportType: 'year_end',
      category: 'statutory',
      dateRange: {
        startDate: '2024-04-01',
        endDate: '2025-03-31',
        period: 'annual',
        payrollCycle: 'FY 2024-25',
      },
      filters: {
        departments: ['All'],
        locations: ['All'],
        employeeGrades: ['All'],
        employmentStatus: ['Active', 'Separated'],
        payrollComponents: ['Income Tax', 'PF', 'Professional Tax'],
        customFilters: [],
      },
      payrollData: {
        totalEmployees: 1456,
        processedEmployees: 1456,
        totalGrossPay: 1187500000,
        totalNetPay: 891562500,
        totalDeductions: 295937500,
        totalTaxes: 177843750,
        totalBenefits: 106875000,
        totalOvertime: 25875000,
        totalBonus: 59375000,
        statutoryDeductions: {
          providentFund: 107775000,
          esi: 11876250,
          professionalTax: 7656250,
          incomeTax: 177843750,
          laborWelfareFund: 2343750,
        },
        costBreakdown: {
          basicSalary: 712500000,
          allowances: 356250000,
          overtime: 25875000,
          bonus: 59375000,
          incentives: 33500000,
          employerContributions: 149625000,
        },
        departmentBreakdown: [],
      },
      employeeRecords: [],
      status: 'locked',
      generatedBy: {
        id: 'TAX001',
        name: 'Sunita Sharma',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        role: 'Tax Officer',
      },
      requiresApproval: true,
      approvalWorkflow: [
        {
          level: 1,
          approverRole: 'statutory_officer',
          approverName: 'Sunita Sharma',
          approverId: 'TAX001',
          status: 'approved',
          comments: 'Annual tax calculations completed and verified.',
          approvedDate: '2025-04-15',
        },
        {
          level: 2,
          approverRole: 'cfo',
          approverName: 'Amit Gupta',
          approverId: 'CFO001',
          status: 'approved',
          comments: 'Financial reconciliation completed. Ready for statutory filing.',
          approvedDate: '2025-04-20',
        },
      ],
      isScheduled: false,
      exportFormats: ['pdf', 'excel'],
      sharedWith: [
        {
          id: 'CA001',
          name: 'External CA Firm',
          email: 'ca@externaltax.com',
          accessLevel: 'view',
        },
      ],
      complianceFlags: ['annual_filing', 'tax_audit_ready', 'form16_generated'],
      statutoryForms: [
        {
          formType: 'Form16',
          generatedDate: '2025-04-30',
          submissionDate: '2025-05-31',
          status: 'generated',
        },
        {
          formType: 'Form24Q',
          generatedDate: '2025-04-30',
          submissionDate: '2025-05-31',
          status: 'generated',
        },
      ],
      keyInsights: [
        'Total tax deducted: ₹17.78 crores for FY 2024-25',
        'Average tax rate: 15% across all employees',
        'Form 16 generated for 1,456 employees',
        'Annual compliance filing ready',
      ],
      costAnalytics: {
        monthlyTrend: [],
        departmentCostComparison: [],
      },
      varianceAnalysis: {
        budgetVariance: 2.1,
        previousPeriodVariance: 8.7,
        significantChanges: [
          {
            component: 'Income Tax',
            currentValue: 177843750,
            previousValue: 163625000,
            variance: 14218750,
            reason: 'Salary increments and bonus payments',
          },
        ],
      },
      generationTime: 156,
      dataAccuracy: 100.0,
      reconciliationStatus: 'completed',
      tags: ['annual', 'tax', 'year-end'],
      description:
        'Comprehensive year-end tax report for FY 2024-25 including all statutory deductions and Form 16 generation.',
      priority: 'high',
      accessLevel: 'confidential',
      createdDate: '2025-04-30',
      modifiedDate: '2025-04-30',
      downloadCount: 78,
      viewCount: 234,
      lastUpdated: '2025-04-30T18:30:00Z',
    },
  ];

  const reportTypes = [
    'all',
    'payroll_summary',
    'payslip_details',
    'tax_liability',
    'statutory_compliance',
    'cost_analysis',
    'year_end',
    'employee_wise',
    'department_wise',
    'audit_trail',
    'custom',
  ];
  const statuses = ['all', 'generating', 'completed', 'failed', 'scheduled', 'approved', 'locked'];

  // Filter payroll reports
  const filteredReports = payrollReports.filter((report) => {
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
      case 'approved':
        return 'success';
      case 'locked':
        return 'warning';
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
      case 'approved':
        return <RxBadge className="w-4 h-4 text-green-600" />;
      case 'locked':
        return <RxIdCard className="w-4 h-4 text-orange-500" />;
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
      case 'financial':
        return <FaCalculator className="w-4 h-4 text-green-500" />;
      case 'statutory':
        return <RxIdCard className="w-4 h-4 text-red-500" />;
      case 'analytics':
        return <RxBarChart className="w-4 h-4 text-purple-500" />;
      default:
        return <RxFileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payroll_summary':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      case 'payslip_details':
        return <RxPerson className="w-4 h-4 text-green-500" />;
      case 'tax_liability':
        return <FaCalculator className="w-4 h-4 text-red-500" />;
      case 'statutory_compliance':
        return <RxBadge className="w-4 h-4 text-orange-500" />;
      case 'cost_analysis':
        return <RxBarChart className="w-4 h-4 text-purple-500" />;
      case 'year_end':
        return <RxCalendar className="w-4 h-4 text-teal-500" />;
      case 'employee_wise':
        return <RxPerson className="w-4 h-4 text-indigo-500" />;
      case 'department_wise':
        return <RxTarget className="w-4 h-4 text-pink-500" />;
      case 'audit_trail':
        return <RxEyeOpen className="w-4 h-4 text-yellow-500" />;
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Calculate statistics
  const totalReports = payrollReports.length;
  const completedReports = payrollReports.filter(
    (r) => r.status === 'completed' || r.status === 'approved' || r.status === 'locked'
  ).length;
  const scheduledReports = payrollReports.filter((r) => r.isScheduled).length;
  const avgAccuracy =
    payrollReports.filter((r) => r.dataAccuracy > 0).reduce((sum, r) => sum + r.dataAccuracy, 0) /
    payrollReports.filter((r) => r.dataAccuracy > 0).length;

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
            {report.requiresApproval && <RxBadge className="w-4 h-4 text-orange-500" title="Requires Approval" />}
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

          {/* Date Range and Payroll Cycle */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <RxCalendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{report.dateRange.payrollCycle}</span>
            </div>
            <div className="text-sm text-gray-600 capitalize">{report.dateRange.period} Report</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(report.dateRange.startDate).toLocaleDateString()} -{' '}
              {new Date(report.dateRange.endDate).toLocaleDateString()}
            </div>
          </div>

          {/* Key Payroll Metrics (for completed reports) */}
          {(report.status === 'completed' || report.status === 'approved' || report.status === 'locked') &&
            report.payrollData.totalEmployees > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Key Metrics</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Employees:</span>
                    <span className="font-medium ml-1">{formatNumber(report.payrollData.totalEmployees)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Gross Pay:</span>
                    <span className="font-medium ml-1 text-green-600">
                      {formatCurrency(report.payrollData.totalGrossPay)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Net Pay:</span>
                    <span className="font-medium ml-1 text-blue-600">
                      {formatCurrency(report.payrollData.totalNetPay)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Deductions:</span>
                    <span className="font-medium ml-1 text-red-600">
                      {formatCurrency(report.payrollData.totalDeductions)}
                    </span>
                  </div>
                </div>
              </div>
            )}

          {/* Department Breakdown */}
          {report.payrollData.departmentBreakdown.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Department Breakdown</p>
              <div className="space-y-1">
                {report.payrollData.departmentBreakdown.slice(0, 3).map((dept, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{dept.department}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{dept.employeeCount}</span>
                      <span className="text-gray-500">({dept.costPercentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                ))}
                {report.payrollData.departmentBreakdown.length > 3 && (
                  <p className="text-xs text-gray-500">
                    +{report.payrollData.departmentBreakdown.length - 3} more departments
                  </p>
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

          {/* Approval Status */}
          {report.requiresApproval && (
            <div className="mb-4 p-2 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-orange-700 font-medium">Approval Status</span>
                <span className="text-xs text-orange-600">
                  {report.approvalWorkflow.filter((a) => a.status === 'approved').length}/
                  {report.approvalWorkflow.length}
                </span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                {report.approvalWorkflow.map((approval, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      approval.status === 'approved'
                        ? 'bg-green-500'
                        : approval.status === 'rejected'
                          ? 'bg-red-500'
                          : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Data Quality and Performance */}
          {(report.status === 'completed' || report.status === 'approved' || report.status === 'locked') &&
            report.dataAccuracy > 0 && (
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
                Payroll Cycle
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Financials
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status & Approval
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated By
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compliance & Access
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
                      {report.requiresApproval && (
                        <div className="absolute -top-1 -left-1">
                          <RxBadge className="w-3 h-3 text-orange-500" />
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
                  <div className="text-sm font-medium text-gray-900">{report.dateRange.payrollCycle}</div>
                  <div className="text-xs text-gray-500 capitalize">{report.dateRange.period}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(report.dateRange.startDate).toLocaleDateString()} -{' '}
                    {new Date(report.dateRange.endDate).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {(report.status === 'completed' || report.status === 'approved' || report.status === 'locked') &&
                  report.payrollData.totalEmployees > 0 ? (
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {formatNumber(report.payrollData.totalEmployees)} employees
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        Gross: {formatCurrency(report.payrollData.totalGrossPay)}
                      </div>
                      <div className="text-xs text-blue-600">Net: {formatCurrency(report.payrollData.totalNetPay)}</div>
                      <div className="text-xs text-red-600">
                        Deductions: {formatCurrency(report.payrollData.totalDeductions)}
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
                  {report.requiresApproval && (
                    <div className="text-xs text-orange-600">
                      {report.approvalWorkflow.filter((a) => a.status === 'approved').length}/
                      {report.approvalWorkflow.length} approvals
                    </div>
                  )}
                  {(report.status === 'completed' || report.status === 'approved') && report.dataAccuracy > 0 && (
                    <div className="text-xs text-green-600 mt-1">{report.dataAccuracy.toFixed(1)}% accuracy</div>
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
                  <div className="text-sm font-medium text-gray-900 capitalize">{report.accessLevel}</div>
                  {report.complianceFlags.length > 0 && (
                    <div className="text-xs text-orange-600 mt-1">{report.complianceFlags.length} compliance flags</div>
                  )}
                  {report.statutoryForms.length > 0 && (
                    <div className="text-xs text-blue-600">{report.statutoryForms.length} statutory forms</div>
                  )}
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payroll Reports</h1>
            <p className="text-gray-600">
              Comprehensive payroll reporting and analytics for accurate financial management and statutory compliance
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
            <RxBadge className="w-4 h-4" />
            <span>Statutory Forms</span>
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
          Showing {filteredReports.length} of {payrollReports.length} payroll reports
          {reportTypeFilter !== 'all' && ` • ${reportTypeFilter.replace('_', ' ')} reports`}
          {statusFilter !== 'all' && ` • ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default PayrollReports;
