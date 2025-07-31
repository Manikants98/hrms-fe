import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';
import {
  RxArchive,
  RxCalendar,
  RxCheckCircled,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxGear,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxStar,
  RxTimer,
  RxTrash,
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';
import Clock from '../../../shared/clock';

interface LeaveType {
  id: string;
  leaveTypeCode: string;
  leaveTypeName: string;
  description: string;
  category: 'statutory' | 'voluntary' | 'emergency' | 'special' | 'compensatory';
  leavePolicy: {
    annualEntitlement: number;
    maxConsecutiveDays: number;
    minAdvanceNotice: number;
    carryForwardAllowed: boolean;
    encashmentAllowed: boolean;
    proRatedAllocation: boolean;
  };
  applicability: {
    employeeTypes: string[];
    departments: string[];
    designations: string[];
    locations: string[];
    minimumServicePeriod: number;
  };
  accrualSettings: {
    accrualMethod: 'monthly' | 'quarterly' | 'annually' | 'immediate';
    accrualRate: number;
    maxAccumulationDays: number;
    lapsePolicy: 'use_it_or_lose_it' | 'carry_forward' | 'encashment';
  };
  approvalWorkflow: {
    requiresApproval: boolean;
    approvalLevels: number;
    approvers: string[];
    autoApprovalConditions?: string[];
  };
  documentationRequired: {
    medicalCertificate: boolean;
    proofOfEvent: boolean;
    managerRecommendation: boolean;
    customDocuments: string[];
  };
  payrollImpact: {
    isPaid: boolean;
    salaryDeductionPercentage: number;
    affectsBonusCalculation: boolean;
    includeInAttendance: boolean;
  };
  restrictions: {
    blackoutPeriods: string[];
    minimumGapBetweenRequests: number;
    maximumRequestsPerMonth: number;
    blockConsecutiveWeekends: boolean;
  };
  usageStatistics: {
    totalEmployeesEligible: number;
    averageUtilization: number;
    totalDaysConsumed: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
  };
  complianceInfo: {
    legalBasis: string;
    regulatoryReference: string;
    lastComplianceReview: string;
    complianceStatus: 'compliant' | 'pending_review' | 'non_compliant';
  };
  status: 'active' | 'inactive' | 'archived' | 'suspended';
  lastModified: string;
  modifiedBy: string;
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canArchive: boolean;
  };
  createdDate: string;
  tags: string[];
  businessRules: string[];
  integrations: {
    payrollSystem: boolean;
    attendanceSystem: boolean;
    hrms: boolean;
  };
}

const LeaveTypesMaster: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeaveTypes, setSelectedLeaveTypes] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('leaveTypeName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock leave types data
  const leaveTypes: LeaveType[] = [
    {
      id: 'LT001',
      leaveTypeCode: 'EL',
      leaveTypeName: 'Earned Leave',
      description: 'Annual earned leave for rest and recreation, accrued based on continuous service',
      category: 'statutory',
      leavePolicy: {
        annualEntitlement: 21,
        maxConsecutiveDays: 30,
        minAdvanceNotice: 7,
        carryForwardAllowed: true,
        encashmentAllowed: true,
        proRatedAllocation: true,
      },
      applicability: {
        employeeTypes: ['Permanent', 'Contract'],
        departments: ['All'],
        designations: ['All'],
        locations: ['All'],
        minimumServicePeriod: 240,
      },
      accrualSettings: {
        accrualMethod: 'monthly',
        accrualRate: 1.75,
        maxAccumulationDays: 45,
        lapsePolicy: 'carry_forward',
      },
      approvalWorkflow: {
        requiresApproval: true,
        approvalLevels: 2,
        approvers: ['Direct Manager', 'HR Manager'],
        autoApprovalConditions: ['Less than 3 consecutive days', 'Sufficient leave balance'],
      },
      documentationRequired: {
        medicalCertificate: false,
        proofOfEvent: false,
        managerRecommendation: false,
        customDocuments: [],
      },
      payrollImpact: {
        isPaid: true,
        salaryDeductionPercentage: 0,
        affectsBonusCalculation: false,
        includeInAttendance: true,
      },
      restrictions: {
        blackoutPeriods: ['Year End Closing', 'Audit Period'],
        minimumGapBetweenRequests: 7,
        maximumRequestsPerMonth: 2,
        blockConsecutiveWeekends: false,
      },
      usageStatistics: {
        totalEmployeesEligible: 1247,
        averageUtilization: 78.3,
        totalDaysConsumed: 18456,
        pendingRequests: 23,
        approvedRequests: 1456,
        rejectedRequests: 89,
      },
      complianceInfo: {
        legalBasis: 'Factories Act 1948',
        regulatoryReference: 'Section 79',
        lastComplianceReview: '2025-06-30',
        complianceStatus: 'compliant',
      },
      status: 'active',
      lastModified: '2025-07-30T14:20:00Z',
      modifiedBy: 'HR Manager',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: false,
      },
      createdDate: '2018-01-15',
      tags: ['statutory', 'annual', 'paid'],
      businessRules: [
        'Cannot be taken during probation period',
        'Requires 7 days advance notice for more than 3 consecutive days',
        'Can be clubbed with weekends and holidays',
      ],
      integrations: {
        payrollSystem: true,
        attendanceSystem: true,
        hrms: true,
      },
    },
    {
      id: 'LT002',
      leaveTypeCode: 'SL',
      leaveTypeName: 'Sick Leave',
      description: 'Medical leave for illness, injury, or medical appointments with family members',
      category: 'statutory',
      leavePolicy: {
        annualEntitlement: 12,
        maxConsecutiveDays: 90,
        minAdvanceNotice: 0,
        carryForwardAllowed: false,
        encashmentAllowed: false,
        proRatedAllocation: true,
      },
      applicability: {
        employeeTypes: ['Permanent', 'Contract', 'Temporary'],
        departments: ['All'],
        designations: ['All'],
        locations: ['All'],
        minimumServicePeriod: 0,
      },
      accrualSettings: {
        accrualMethod: 'monthly',
        accrualRate: 1,
        maxAccumulationDays: 12,
        lapsePolicy: 'use_it_or_lose_it',
      },
      approvalWorkflow: {
        requiresApproval: true,
        approvalLevels: 1,
        approvers: ['Direct Manager'],
        autoApprovalConditions: ['Medical certificate provided'],
      },
      documentationRequired: {
        medicalCertificate: true,
        proofOfEvent: false,
        managerRecommendation: false,
        customDocuments: ['Doctor Prescription', 'Hospital Discharge Summary'],
      },
      payrollImpact: {
        isPaid: true,
        salaryDeductionPercentage: 0,
        affectsBonusCalculation: false,
        includeInAttendance: true,
      },
      restrictions: {
        blackoutPeriods: [],
        minimumGapBetweenRequests: 0,
        maximumRequestsPerMonth: 4,
        blockConsecutiveWeekends: false,
      },
      usageStatistics: {
        totalEmployeesEligible: 1247,
        averageUtilization: 45.7,
        totalDaysConsumed: 6834,
        pendingRequests: 12,
        approvedRequests: 987,
        rejectedRequests: 34,
      },
      complianceInfo: {
        legalBasis: 'Employees State Insurance Act',
        regulatoryReference: 'Section 46',
        lastComplianceReview: '2025-06-30',
        complianceStatus: 'compliant',
      },
      status: 'active',
      lastModified: '2025-07-28T11:15:00Z',
      modifiedBy: 'Medical Officer',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: false,
      },
      createdDate: '2018-01-15',
      tags: ['statutory', 'medical', 'paid'],
      businessRules: [
        'Medical certificate mandatory for more than 3 consecutive days',
        'Can be applied retroactively with valid medical proof',
        'Extended sick leave may require fitness certificate',
      ],
      integrations: {
        payrollSystem: true,
        attendanceSystem: true,
        hrms: true,
      },
    },
    {
      id: 'LT003',
      leaveTypeCode: 'CL',
      leaveTypeName: 'Casual Leave',
      description: 'Short-term leave for personal work, family functions, or unforeseen circumstances',
      category: 'voluntary',
      leavePolicy: {
        annualEntitlement: 12,
        maxConsecutiveDays: 5,
        minAdvanceNotice: 1,
        carryForwardAllowed: false,
        encashmentAllowed: false,
        proRatedAllocation: true,
      },
      applicability: {
        employeeTypes: ['Permanent', 'Contract'],
        departments: ['All'],
        designations: ['All'],
        locations: ['All'],
        minimumServicePeriod: 90,
      },
      accrualSettings: {
        accrualMethod: 'monthly',
        accrualRate: 1,
        maxAccumulationDays: 12,
        lapsePolicy: 'use_it_or_lose_it',
      },
      approvalWorkflow: {
        requiresApproval: true,
        approvalLevels: 1,
        approvers: ['Direct Manager'],
        autoApprovalConditions: ['Single day leave', 'Sufficient balance'],
      },
      documentationRequired: {
        medicalCertificate: false,
        proofOfEvent: false,
        managerRecommendation: false,
        customDocuments: [],
      },
      payrollImpact: {
        isPaid: true,
        salaryDeductionPercentage: 0,
        affectsBonusCalculation: false,
        includeInAttendance: true,
      },
      restrictions: {
        blackoutPeriods: ['Month End Processing'],
        minimumGapBetweenRequests: 3,
        maximumRequestsPerMonth: 3,
        blockConsecutiveWeekends: true,
      },
      usageStatistics: {
        totalEmployeesEligible: 1198,
        averageUtilization: 89.2,
        totalDaysConsumed: 12845,
        pendingRequests: 45,
        approvedRequests: 2134,
        rejectedRequests: 123,
      },
      complianceInfo: {
        legalBasis: 'Company Policy',
        regulatoryReference: 'HR Policy 2.3.1',
        lastComplianceReview: '2025-06-30',
        complianceStatus: 'compliant',
      },
      status: 'active',
      lastModified: '2025-07-25T16:30:00Z',
      modifiedBy: 'HR Executive',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2018-01-15',
      tags: ['voluntary', 'personal', 'paid'],
      businessRules: [
        'Cannot be taken during first 90 days of employment',
        'Maximum 5 consecutive days allowed',
        'Cannot be clubbed with weekends',
      ],
      integrations: {
        payrollSystem: true,
        attendanceSystem: true,
        hrms: true,
      },
    },
    {
      id: 'LT004',
      leaveTypeCode: 'ML',
      leaveTypeName: 'Maternity Leave',
      description: 'Maternity leave for female employees before and after childbirth as per legal requirements',
      category: 'statutory',
      leavePolicy: {
        annualEntitlement: 182,
        maxConsecutiveDays: 182,
        minAdvanceNotice: 30,
        carryForwardAllowed: false,
        encashmentAllowed: false,
        proRatedAllocation: false,
      },
      applicability: {
        employeeTypes: ['Permanent', 'Contract'],
        departments: ['All'],
        designations: ['All'],
        locations: ['All'],
        minimumServicePeriod: 240,
      },
      accrualSettings: {
        accrualMethod: 'immediate',
        accrualRate: 182,
        maxAccumulationDays: 182,
        lapsePolicy: 'use_it_or_lose_it',
      },
      approvalWorkflow: {
        requiresApproval: true,
        approvalLevels: 2,
        approvers: ['Direct Manager', 'HR Manager'],
        autoApprovalConditions: ['Medical certificate provided'],
      },
      documentationRequired: {
        medicalCertificate: true,
        proofOfEvent: true,
        managerRecommendation: false,
        customDocuments: ['Gynecologist Certificate', 'Expected Delivery Date', 'Birth Certificate'],
      },
      payrollImpact: {
        isPaid: true,
        salaryDeductionPercentage: 0,
        affectsBonusCalculation: false,
        includeInAttendance: true,
      },
      restrictions: {
        blackoutPeriods: [],
        minimumGapBetweenRequests: 365,
        maximumRequestsPerMonth: 1,
        blockConsecutiveWeekends: false,
      },
      usageStatistics: {
        totalEmployeesEligible: 487,
        averageUtilization: 23.4,
        totalDaysConsumed: 2184,
        pendingRequests: 3,
        approvedRequests: 12,
        rejectedRequests: 1,
      },
      complianceInfo: {
        legalBasis: 'Maternity Benefit Act 1961',
        regulatoryReference: 'Section 5',
        lastComplianceReview: '2025-06-30',
        complianceStatus: 'compliant',
      },
      status: 'active',
      lastModified: '2025-07-29T09:45:00Z',
      modifiedBy: 'Legal Officer',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: false,
      },
      createdDate: '2018-01-15',
      tags: ['statutory', 'maternity', 'paid', 'female'],
      businessRules: [
        'Applicable only to female employees',
        'Can be split into pre and post natal leave',
        'Work from home options available for gradual return',
      ],
      integrations: {
        payrollSystem: true,
        attendanceSystem: true,
        hrms: true,
      },
    },
    {
      id: 'LT005',
      leaveTypeCode: 'PL',
      leaveTypeName: 'Paternity Leave',
      description: 'Paternity leave for male employees to care for newborn child and support spouse',
      category: 'statutory',
      leavePolicy: {
        annualEntitlement: 15,
        maxConsecutiveDays: 15,
        minAdvanceNotice: 7,
        carryForwardAllowed: false,
        encashmentAllowed: false,
        proRatedAllocation: false,
      },
      applicability: {
        employeeTypes: ['Permanent', 'Contract'],
        departments: ['All'],
        designations: ['All'],
        locations: ['All'],
        minimumServicePeriod: 240,
      },
      accrualSettings: {
        accrualMethod: 'immediate',
        accrualRate: 15,
        maxAccumulationDays: 15,
        lapsePolicy: 'use_it_or_lose_it',
      },
      approvalWorkflow: {
        requiresApproval: true,
        approvalLevels: 1,
        approvers: ['Direct Manager'],
        autoApprovalConditions: ['Birth certificate provided'],
      },
      documentationRequired: {
        medicalCertificate: false,
        proofOfEvent: true,
        managerRecommendation: false,
        customDocuments: ['Birth Certificate', 'Hospital Discharge Summary'],
      },
      payrollImpact: {
        isPaid: true,
        salaryDeductionPercentage: 0,
        affectsBonusCalculation: false,
        includeInAttendance: true,
      },
      restrictions: {
        blackoutPeriods: [],
        minimumGapBetweenRequests: 365,
        maximumRequestsPerMonth: 1,
        blockConsecutiveWeekends: false,
      },
      usageStatistics: {
        totalEmployeesEligible: 760,
        averageUtilization: 67.8,
        totalDaysConsumed: 915,
        pendingRequests: 2,
        approvedRequests: 61,
        rejectedRequests: 3,
      },
      complianceInfo: {
        legalBasis: 'Maternity Benefit Amendment Act 2017',
        regulatoryReference: 'Section 5A',
        lastComplianceReview: '2025-06-30',
        complianceStatus: 'compliant',
      },
      status: 'active',
      lastModified: '2025-07-26T13:20:00Z',
      modifiedBy: 'Policy Manager',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: false,
      },
      createdDate: '2018-01-15',
      tags: ['statutory', 'paternity', 'paid', 'male'],
      businessRules: [
        'Applicable only to male employees',
        'Must be taken within 6 months of child birth',
        'Can be taken in conjunction with annual leave',
      ],
      integrations: {
        payrollSystem: true,
        attendanceSystem: true,
        hrms: true,
      },
    },
    {
      id: 'LT006',
      leaveTypeCode: 'CO',
      leaveTypeName: 'Compensatory Off',
      description: 'Compensatory leave granted for working during weekends, holidays, or overtime',
      category: 'compensatory',
      leavePolicy: {
        annualEntitlement: 0,
        maxConsecutiveDays: 5,
        minAdvanceNotice: 1,
        carryForwardAllowed: true,
        encashmentAllowed: false,
        proRatedAllocation: false,
      },
      applicability: {
        employeeTypes: ['Permanent', 'Contract'],
        departments: ['All'],
        designations: ['All'],
        locations: ['All'],
        minimumServicePeriod: 0,
      },
      accrualSettings: {
        accrualMethod: 'immediate',
        accrualRate: 1,
        maxAccumulationDays: 10,
        lapsePolicy: 'carry_forward',
      },
      approvalWorkflow: {
        requiresApproval: true,
        approvalLevels: 1,
        approvers: ['Direct Manager'],
        autoApprovalConditions: ['Valid comp-off credit available'],
      },
      documentationRequired: {
        medicalCertificate: false,
        proofOfEvent: false,
        managerRecommendation: true,
        customDocuments: ['Overtime Work Approval', 'Holiday Work Authorization'],
      },
      payrollImpact: {
        isPaid: true,
        salaryDeductionPercentage: 0,
        affectsBonusCalculation: false,
        includeInAttendance: true,
      },
      restrictions: {
        blackoutPeriods: ['Project Deadlines'],
        minimumGapBetweenRequests: 7,
        maximumRequestsPerMonth: 2,
        blockConsecutiveWeekends: false,
      },
      usageStatistics: {
        totalEmployeesEligible: 856,
        averageUtilization: 34.6,
        totalDaysConsumed: 2456,
        pendingRequests: 18,
        approvedRequests: 786,
        rejectedRequests: 45,
      },
      complianceInfo: {
        legalBasis: 'Factories Act 1948',
        regulatoryReference: 'Section 64',
        lastComplianceReview: '2025-06-30',
        complianceStatus: 'compliant',
      },
      status: 'active',
      lastModified: '2025-07-31T10:00:00Z',
      modifiedBy: 'Operations Manager',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2018-06-20',
      tags: ['compensatory', 'earned', 'overtime'],
      businessRules: [
        'Earned only after working on designated holidays/weekends',
        'Must be availed within 90 days of earning',
        'Requires prior approval for overtime work',
      ],
      integrations: {
        payrollSystem: true,
        attendanceSystem: true,
        hrms: true,
      },
    },
    {
      id: 'LT007',
      leaveTypeCode: 'BL',
      leaveTypeName: 'Bereavement Leave',
      description: 'Leave for mourning and funeral arrangements in case of death of immediate family member',
      category: 'emergency',
      leavePolicy: {
        annualEntitlement: 7,
        maxConsecutiveDays: 7,
        minAdvanceNotice: 0,
        carryForwardAllowed: false,
        encashmentAllowed: false,
        proRatedAllocation: false,
      },
      applicability: {
        employeeTypes: ['Permanent', 'Contract', 'Temporary'],
        departments: ['All'],
        designations: ['All'],
        locations: ['All'],
        minimumServicePeriod: 0,
      },
      accrualSettings: {
        accrualMethod: 'annually',
        accrualRate: 7,
        maxAccumulationDays: 7,
        lapsePolicy: 'use_it_or_lose_it',
      },
      approvalWorkflow: {
        requiresApproval: true,
        approvalLevels: 1,
        approvers: ['Direct Manager'],
        autoApprovalConditions: ['Death certificate provided'],
      },
      documentationRequired: {
        medicalCertificate: false,
        proofOfEvent: true,
        managerRecommendation: false,
        customDocuments: ['Death Certificate', 'Relationship Proof'],
      },
      payrollImpact: {
        isPaid: true,
        salaryDeductionPercentage: 0,
        affectsBonusCalculation: false,
        includeInAttendance: true,
      },
      restrictions: {
        blackoutPeriods: [],
        minimumGapBetweenRequests: 0,
        maximumRequestsPerMonth: 1,
        blockConsecutiveWeekends: false,
      },
      usageStatistics: {
        totalEmployeesEligible: 1247,
        averageUtilization: 8.7,
        totalDaysConsumed: 756,
        pendingRequests: 1,
        approvedRequests: 108,
        rejectedRequests: 2,
      },
      complianceInfo: {
        legalBasis: 'Company Policy',
        regulatoryReference: 'HR Policy 2.5.3',
        lastComplianceReview: '2025-06-30',
        complianceStatus: 'compliant',
      },
      status: 'active',
      lastModified: '2025-07-24T15:30:00Z',
      modifiedBy: 'Welfare Officer',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2018-01-15',
      tags: ['emergency', 'bereavement', 'paid'],
      businessRules: [
        'Applicable for immediate family members only',
        'Can be applied retrospectively',
        'Additional unpaid leave may be granted on case-by-case basis',
      ],
      integrations: {
        payrollSystem: true,
        attendanceSystem: true,
        hrms: true,
      },
    },
    {
      id: 'LT008',
      leaveTypeCode: 'LWP',
      leaveTypeName: 'Leave Without Pay',
      description: 'Extended unpaid leave for personal reasons, education, or sabbatical purposes',
      category: 'special',
      leavePolicy: {
        annualEntitlement: 0,
        maxConsecutiveDays: 365,
        minAdvanceNotice: 30,
        carryForwardAllowed: false,
        encashmentAllowed: false,
        proRatedAllocation: false,
      },
      applicability: {
        employeeTypes: ['Permanent'],
        departments: ['All'],
        designations: ['All'],
        locations: ['All'],
        minimumServicePeriod: 365,
      },
      accrualSettings: {
        accrualMethod: 'immediate',
        accrualRate: 0,
        maxAccumulationDays: 365,
        lapsePolicy: 'use_it_or_lose_it',
      },
      approvalWorkflow: {
        requiresApproval: true,
        approvalLevels: 3,
        approvers: ['Direct Manager', 'Department Head', 'HR Director'],
        autoApprovalConditions: [],
      },
      documentationRequired: {
        medicalCertificate: false,
        proofOfEvent: true,
        managerRecommendation: true,
        customDocuments: ['Purpose Statement', 'Return Date Confirmation', 'Handover Document'],
      },
      payrollImpact: {
        isPaid: false,
        salaryDeductionPercentage: 100,
        affectsBonusCalculation: true,
        includeInAttendance: false,
      },
      restrictions: {
        blackoutPeriods: ['Project Critical Phases'],
        minimumGapBetweenRequests: 365,
        maximumRequestsPerMonth: 1,
        blockConsecutiveWeekends: false,
      },
      usageStatistics: {
        totalEmployeesEligible: 876,
        averageUtilization: 2.3,
        totalDaysConsumed: 1456,
        pendingRequests: 5,
        approvedRequests: 23,
        rejectedRequests: 8,
      },
      complianceInfo: {
        legalBasis: 'Company Policy',
        regulatoryReference: 'HR Policy 2.7.1',
        lastComplianceReview: '2025-06-30',
        complianceStatus: 'compliant',
      },
      status: 'active',
      lastModified: '2025-07-20T12:15:00Z',
      modifiedBy: 'HR Director',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: true,
      },
      createdDate: '2019-04-22',
      tags: ['special', 'unpaid', 'extended'],
      businessRules: [
        'Maximum 12 months in a calendar year',
        'Benefits may be suspended during leave period',
        'Requires detailed handover and return plan',
      ],
      integrations: {
        payrollSystem: true,
        attendanceSystem: false,
        hrms: true,
      },
    },
  ];

  // Filter leave types
  const filteredLeaveTypes = leaveTypes.filter((leaveType) => {
    const matchesSearch =
      leaveType.leaveTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leaveType.leaveTypeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leaveType.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leaveType.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leaveType.complianceInfo.legalBasis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leaveType.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Sort leave types
  const sortedLeaveTypes = [...filteredLeaveTypes].sort((a, b) => {
    const aValue = a[sortField as keyof LeaveType];
    const bValue = b[sortField as keyof LeaveType];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'archived':
        return 'error';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'archived':
        return <RxArchive className="w-4 h-4 text-red-500" />;
      case 'suspended':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'statutory':
        return 'error';
      case 'voluntary':
        return 'primary';
      case 'emergency':
        return 'warning';
      case 'special':
        return 'info';
      case 'compensatory':
        return 'success';
      default:
        return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'statutory':
        return <RxGear className="w-4 h-4 text-red-500" />;
      case 'voluntary':
        return <RxCalendar className="w-4 h-4 text-blue-500" />;
      case 'emergency':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'special':
        return <RxStar className="w-4 h-4 text-purple-500" />;
      case 'compensatory':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      default:
        return <FaCalendarAlt className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeaveTypes(sortedLeaveTypes.map((leaveType) => leaveType.id));
    } else {
      setSelectedLeaveTypes([]);
    }
  };

  const handleSelectLeaveType = (leaveTypeId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeaveTypes([...selectedLeaveTypes, leaveTypeId]);
    } else {
      setSelectedLeaveTypes(selectedLeaveTypes.filter((id) => id !== leaveTypeId));
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <RxTriangleUp className="w-4 h-4 ml-1" />
    ) : (
      <RxTriangleDown className="w-4 h-4 ml-1" />
    );
  };

  // Calculate statistics
  const totalLeaveTypes = leaveTypes.length;
  const activeLeaveTypes = leaveTypes.filter((lt) => lt.status === 'active').length;
  const totalEligibleEmployees = leaveTypes.reduce(
    (sum, lt) => Math.max(sum, lt.usageStatistics.totalEmployeesEligible),
    0
  );
  const totalDaysConsumed = leaveTypes.reduce((sum, lt) => sum + lt.usageStatistics.totalDaysConsumed, 0);

  // Table View Component
  const TableView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedLeaveTypes.length === sortedLeaveTypes.length && sortedLeaveTypes.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('leaveTypeCode')}
              >
                <div className="flex whitespace-nowrap items-center">Code {getSortIcon('leaveTypeCode')}</div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('leaveTypeName')}
              >
                <div className="flex whitespace-nowrap items-center">Leave Type {getSortIcon('leaveTypeName')}</div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center justify-center">
                  Category
                  {getSortIcon('category')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('leavePolicy.annualEntitlement')}
              >
                <div className="flex items-center justify-center">
                  Entitlement
                  {getSortIcon('leavePolicy.annualEntitlement')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('payrollImpact.isPaid')}
              >
                <div className="flex items-center justify-center">
                  Pay Status
                  {getSortIcon('payrollImpact.isPaid')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('usageStatistics.averageUtilization')}
              >
                <div className="flex items-center justify-center">
                  Usage Stats
                  {getSortIcon('usageStatistics.averageUtilization')}
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compliance
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center justify-center">
                  Status
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedLeaveTypes.map((leaveType) => (
              <tr key={leaveType.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedLeaveTypes.includes(leaveType.id)}
                    onChange={(e) => handleSelectLeaveType(leaveType.id, e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{leaveType.leaveTypeCode}</div>
                  <div className="text-xs text-gray-500">{leaveType.complianceInfo.regulatoryReference}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{leaveType.leaveTypeName}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{leaveType.description}</div>
                  <div className="text-xs text-blue-600 mt-1">{leaveType.complianceInfo.legalBasis}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    {getCategoryIcon(leaveType.category)}
                  </div>
                  <Chip
                    label={leaveType.category.charAt(0).toUpperCase() + leaveType.category.slice(1)}
                    size="small"
                    color={getCategoryColor(leaveType.category)}
                    variant="outlined"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {leaveType.leavePolicy.annualEntitlement === 0 ? 'N/A' : leaveType.leavePolicy.annualEntitlement}
                  </div>
                  <div className="text-xs text-gray-500">days/year</div>
                  {leaveType.leavePolicy.carryForwardAllowed && (
                    <div className="text-xs text-green-600">Carry Forward</div>
                  )}
                  {leaveType.leavePolicy.encashmentAllowed && <div className="text-xs text-blue-600">Encashable</div>}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center mb-1">
                    {leaveType.payrollImpact.isPaid ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-600 font-medium">Unpaid</span>
                    )}
                  </div>
                  {!leaveType.payrollImpact.isPaid && leaveType.payrollImpact.salaryDeductionPercentage > 0 && (
                    <div className="text-xs text-red-600">
                      {leaveType.payrollImpact.salaryDeductionPercentage}% deduction
                    </div>
                  )}
                  {leaveType.payrollImpact.affectsBonusCalculation && (
                    <div className="text-xs text-yellow-600">Affects bonus</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {formatPercentage(leaveType.usageStatistics.averageUtilization)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatNumber(leaveType.usageStatistics.totalDaysConsumed)} days used
                  </div>
                  <div className="text-xs text-blue-600">
                    {formatNumber(leaveType.usageStatistics.totalEmployeesEligible)} eligible
                  </div>
                  {leaveType.usageStatistics.pendingRequests > 0 && (
                    <div className="text-xs text-yellow-600">{leaveType.usageStatistics.pendingRequests} pending</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Chip
                    label={
                      leaveType.complianceInfo.complianceStatus.replace('_', ' ').charAt(0).toUpperCase() +
                      leaveType.complianceInfo.complianceStatus.replace('_', ' ').slice(1)
                    }
                    size="small"
                    color={
                      leaveType.complianceInfo.complianceStatus === 'compliant'
                        ? 'success'
                        : leaveType.complianceInfo.complianceStatus === 'pending_review'
                          ? 'warning'
                          : 'error'
                    }
                    variant="filled"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Last review: {new Date(leaveType.complianceInfo.lastComplianceReview).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(leaveType.status)}
                    <Chip
                      label={leaveType.status.charAt(0).toUpperCase() + leaveType.status.slice(1)}
                      size="small"
                      color={getStatusColor(leaveType.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary" title="View Details">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    {leaveType.permissions.canEdit && (
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Edit Leave Type">
                        <RxPencil1 className="w-4 h-4" />
                      </button>
                    )}
                    {leaveType.permissions.canArchive && (
                      <button className="p-1 hover:bg-gray-100 rounded text-yellow-600" title="Archive Leave Type">
                        <RxArchive className="w-4 h-4" />
                      </button>
                    )}
                    {leaveType.permissions.canDelete && (
                      <button className="p-1 hover:bg-gray-100 rounded text-red-600" title="Delete Leave Type">
                        <RxTrash className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1 hover:bg-gray-100 rounded" title="More Options">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Leave Types Master</h1>
            <p className="text-gray-600">
              Manage leave categories, policies, entitlements, and compliance requirements for comprehensive leave
              management
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
              <FaCalendarAlt className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Leave Types</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeaveTypes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Leave Types</p>
              <p className="text-2xl font-bold text-gray-900">{activeLeaveTypes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxPerson className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Eligible Employees</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalEligibleEmployees)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <FaHeartbeat className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Days Used</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalDaysConsumed)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leave types..."
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
          {/* Bulk Actions */}
          {selectedLeaveTypes.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedLeaveTypes.length} selected</span>
              <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200">
                Archive
              </button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200">Delete</button>
            </div>
          )}

          {/* Add Leave Type Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Add Leave Type</span>
          </button>

          {/* Export Button */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredLeaveTypes.length} of {totalLeaveTypes} leave types
        </p>
      </div>

      {/* Table Content */}
      <TableView />
    </div>
  );
};

export default LeaveTypesMaster;
