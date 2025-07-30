import React, { useEffect, useState } from 'react';
import {
  RxBadge,
  RxBarChart,
  RxCalendar,
  RxCheckCircled,
  RxClock,
  RxCross2,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxExit,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxHome,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPlus,
  RxRows,
  RxShare1,
  RxTimer,
} from 'react-icons/rx';
import Clock from '../../../shared/clock';

type resignationType = 'voluntary' | 'involuntary' | 'retirement' | 'mutual_separation';
type Status =
  | 'submitted'
  | 'approved'
  | 'processing'
  | 'clearance_pending'
  | 'completed'
  | 'rejected'
  | 'on_hold';
interface ExitApplication {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  resignationDate: string;
  lastWorkingDate: string;
  noticePeriod: number;
  actualNoticePeriod: number;
  resignationType: resignationType;
  resignationReason: string;
  status: Status;
  reportingManager: {
    id: string;
    name: string;
    avatar: string;
    title: string;
  };
  hrApprover: {
    id: string;
    name: string;
    avatar: string;
    title: string;
  };
  clearanceStatus: {
    it: 'pending' | 'approved' | 'rejected';
    finance: 'pending' | 'approved' | 'rejected';
    admin: 'pending' | 'approved' | 'rejected';
    hr: 'pending' | 'approved' | 'rejected';
  };
  assetsToReturn: Array<{
    id: string;
    name: string;
    category: string;
    returned: boolean;
    returnDate?: string;
  }>;
  exitInterviewScheduled: boolean;
  exitInterviewDate?: string;
  exitInterviewCompleted: boolean;
  fullFinalSettlement: {
    status: 'pending' | 'calculated' | 'approved' | 'paid';
    amount?: number;
    details?: string;
  };
  replacementStatus: 'not_required' | 'in_progress' | 'completed';
  knowledgeTransfer: {
    status: 'pending' | 'in_progress' | 'completed';
    documents: string[];
    handoverTo?: string;
  };
  priority: 'high' | 'medium' | 'low';
  comments: string;
  createdDate: string;
  lastUpdated: string;
}

const ExitApplications: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [resignationTypeFilter, setResignationTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      <span
        className={`inline-flex items-center rounded-full font-medium ${getColorClasses()} ${className}`}
      >
        {label}
      </span>
    );
  };

  // Mock exit applications data
  const exitApplications: ExitApplication[] = [
    {
      id: 'EXT001',
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'rahul.sharma@company.com',
      phone: '+91-9876543210',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      joiningDate: '2022-03-15',
      resignationDate: '2025-07-28',
      lastWorkingDate: '2025-08-27',
      noticePeriod: 30,
      actualNoticePeriod: 30,
      resignationType: 'voluntary',
      resignationReason: 'Better career opportunity in a product company with higher compensation',
      status: 'processing',
      reportingManager: {
        id: 'MGR001',
        name: 'Priya Singh',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Engineering Manager',
      },
      hrApprover: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
      },
      clearanceStatus: {
        it: 'approved',
        finance: 'pending',
        admin: 'approved',
        hr: 'pending',
      },
      assetsToReturn: [
        {
          id: 'AST001',
          name: 'MacBook Pro',
          category: 'IT Equipment',
          returned: true,
          returnDate: '2025-07-29',
        },
        { id: 'AST002', name: 'iPhone 13', category: 'Mobile Device', returned: false },
        {
          id: 'AST003',
          name: 'Access Card',
          category: 'Security',
          returned: true,
          returnDate: '2025-07-29',
        },
      ],
      exitInterviewScheduled: true,
      exitInterviewDate: '2025-08-25',
      exitInterviewCompleted: false,
      fullFinalSettlement: {
        status: 'calculated',
        amount: 245000,
        details: 'Includes salary, bonus, and leave encashment',
      },
      replacementStatus: 'in_progress',
      knowledgeTransfer: {
        status: 'in_progress',
        documents: ['Project Documentation', 'Code Handover', 'Client Information'],
        handoverTo: 'Vikram Kumar',
      },
      priority: 'high',
      comments: 'Key developer, ensure smooth knowledge transfer',
      createdDate: '2025-07-28',
      lastUpdated: '2025-07-30',
    },
    {
      id: 'EXT002',
      employeeId: 'EMP002',
      employeeName: 'Meera Patel',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'meera.patel@company.com',
      phone: '+91-8765432109',
      department: 'Marketing',
      designation: 'Marketing Manager',
      joiningDate: '2021-06-10',
      resignationDate: '2025-07-25',
      lastWorkingDate: '2025-08-09',
      noticePeriod: 15,
      actualNoticePeriod: 15,
      resignationType: 'voluntary',
      resignationReason: 'Relocation to another city due to family reasons',
      status: 'completed',
      reportingManager: {
        id: 'MGR002',
        name: 'Rohit Kumar',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        title: 'Marketing Director',
      },
      hrApprover: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
      },
      clearanceStatus: {
        it: 'approved',
        finance: 'approved',
        admin: 'approved',
        hr: 'approved',
      },
      assetsToReturn: [
        {
          id: 'AST004',
          name: 'Dell Laptop',
          category: 'IT Equipment',
          returned: true,
          returnDate: '2025-08-09',
        },
        {
          id: 'AST005',
          name: 'Marketing Materials',
          category: 'Documents',
          returned: true,
          returnDate: '2025-08-09',
        },
      ],
      exitInterviewScheduled: true,
      exitInterviewDate: '2025-08-08',
      exitInterviewCompleted: true,
      fullFinalSettlement: {
        status: 'paid',
        amount: 189000,
        details: 'Final settlement paid on last working day',
      },
      replacementStatus: 'completed',
      knowledgeTransfer: {
        status: 'completed',
        documents: ['Campaign Strategies', 'Client Contacts', 'Budget Reports'],
        handoverTo: 'Kavya Nair',
      },
      priority: 'medium',
      comments: 'Smooth exit process, good handover completed',
      createdDate: '2025-07-25',
      lastUpdated: '2025-08-09',
    },
    {
      id: 'EXT003',
      employeeId: 'EMP003',
      employeeName: 'Arjun Reddy',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      email: 'arjun.reddy@company.com',
      phone: '+91-7654321098',
      department: 'Finance',
      designation: 'Senior Financial Analyst',
      joiningDate: '2020-11-20',
      resignationDate: '2025-07-30',
      lastWorkingDate: '2025-08-29',
      noticePeriod: 30,
      actualNoticePeriod: 30,
      resignationType: 'voluntary',
      resignationReason: 'Pursuing higher education - MBA program',
      status: 'submitted',
      reportingManager: {
        id: 'MGR003',
        name: 'Deepika Iyer',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        title: 'Finance Director',
      },
      hrApprover: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
      },
      clearanceStatus: {
        it: 'pending',
        finance: 'pending',
        admin: 'pending',
        hr: 'pending',
      },
      assetsToReturn: [
        { id: 'AST006', name: 'ThinkPad Laptop', category: 'IT Equipment', returned: false },
        {
          id: 'AST007',
          name: 'Financial Calculator',
          category: 'Office Equipment',
          returned: false,
        },
        { id: 'AST008', name: 'Access Card', category: 'Security', returned: false },
      ],
      exitInterviewScheduled: false,
      exitInterviewCompleted: false,
      fullFinalSettlement: {
        status: 'pending',
      },
      replacementStatus: 'not_required',
      knowledgeTransfer: {
        status: 'pending',
        documents: [],
      },
      priority: 'low',
      comments: 'New resignation, pending manager approval',
      createdDate: '2025-07-30',
      lastUpdated: '2025-07-30',
    },
    {
      id: 'EXT004',
      employeeId: 'EMP004',
      employeeName: 'Sanjay Kumar',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'sanjay.kumar@company.com',
      phone: '+91-6543210987',
      department: 'Operations',
      designation: 'Operations Lead',
      joiningDate: '2019-08-05',
      resignationDate: '2025-07-26',
      lastWorkingDate: '2025-08-10',
      noticePeriod: 15,
      actualNoticePeriod: 15,
      resignationType: 'involuntary',
      resignationReason: 'Performance issues and policy violations',
      status: 'clearance_pending',
      reportingManager: {
        id: 'MGR004',
        name: 'Rajesh Gupta',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        title: 'Operations Director',
      },
      hrApprover: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
      },
      clearanceStatus: {
        it: 'approved',
        finance: 'rejected',
        admin: 'approved',
        hr: 'pending',
      },
      assetsToReturn: [
        {
          id: 'AST009',
          name: 'Desktop Computer',
          category: 'IT Equipment',
          returned: true,
          returnDate: '2025-08-10',
        },
        { id: 'AST010', name: 'Office Keys', category: 'Security', returned: false },
        {
          id: 'AST011',
          name: 'Company Handbook',
          category: 'Documents',
          returned: true,
          returnDate: '2025-08-10',
        },
      ],
      exitInterviewScheduled: false,
      exitInterviewCompleted: false,
      fullFinalSettlement: {
        status: 'pending',
        details: 'Pending due to finance clearance issues',
      },
      replacementStatus: 'in_progress',
      knowledgeTransfer: {
        status: 'completed',
        documents: ['Process Documentation', 'Vendor Contacts'],
        handoverTo: 'Amit Sharma',
      },
      priority: 'high',
      comments: 'Finance clearance pending due to outstanding dues',
      createdDate: '2025-07-26',
      lastUpdated: '2025-07-30',
    },
    {
      id: 'EXT005',
      employeeId: 'EMP005',
      employeeName: 'Lakshmi Nair',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'lakshmi.nair@company.com',
      phone: '+91-5432109876',
      department: 'Design',
      designation: 'UX Designer',
      joiningDate: '2023-01-15',
      resignationDate: '2025-07-29',
      lastWorkingDate: '2025-08-28',
      noticePeriod: 30,
      actualNoticePeriod: 30,
      resignationType: 'voluntary',
      resignationReason: 'Starting own design consultancy',
      status: 'approved',
      reportingManager: {
        id: 'MGR005',
        name: 'Lisa Anderson',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        title: 'Design Director',
      },
      hrApprover: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
      },
      clearanceStatus: {
        it: 'pending',
        finance: 'approved',
        admin: 'pending',
        hr: 'approved',
      },
      assetsToReturn: [
        { id: 'AST012', name: 'MacBook Air', category: 'IT Equipment', returned: false },
        { id: 'AST013', name: 'Design Tablet', category: 'IT Equipment', returned: false },
        {
          id: 'AST014',
          name: 'Office Supplies',
          category: 'Stationery',
          returned: true,
          returnDate: '2025-07-29',
        },
      ],
      exitInterviewScheduled: true,
      exitInterviewDate: '2025-08-26',
      exitInterviewCompleted: false,
      fullFinalSettlement: {
        status: 'calculated',
        amount: 167000,
        details: 'Salary and leave encashment',
      },
      replacementStatus: 'in_progress',
      knowledgeTransfer: {
        status: 'in_progress',
        documents: ['Design Guidelines', 'Project Files', 'Client Feedback'],
        handoverTo: 'Pooja Mehta',
      },
      priority: 'medium',
      comments: 'Creative professional, ensure design files are transferred properly',
      createdDate: '2025-07-29',
      lastUpdated: '2025-07-30',
    },
  ];

  const statuses = [
    'all',
    'submitted',
    'approved',
    'processing',
    'clearance_pending',
    'completed',
    'rejected',
    'on_hold',
  ];
  const resignationTypes = ['all', 'voluntary', 'involuntary', 'retirement', 'mutual_separation'];

  // Filter exit applications
  const filteredApplications = exitApplications.filter((app) => {
    const matchesSearch =
      app.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.resignationReason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesResignationType =
      resignationTypeFilter === 'all' || app.resignationType === resignationTypeFilter;

    return matchesSearch && matchesStatus && matchesResignationType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'primary';
      case 'approved':
        return 'success';
      case 'processing':
        return 'warning';
      case 'clearance_pending':
        return 'warning';
      case 'completed':
        return 'success';
      case 'rejected':
        return 'error';
      case 'on_hold':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      case 'approved':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'clearance_pending':
        return <RxClock className="w-4 h-4 text-orange-500" />;
      case 'completed':
        return <RxBadge className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'on_hold':
        return <RxTimer className="w-4 h-4 text-blue-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getResignationTypeIcon = (type: string) => {
    switch (type) {
      case 'voluntary':
        return <RxExit className="w-4 h-4 text-green-500" />;
      case 'involuntary':
        return <RxCross2 className="w-4 h-4 text-red-500" />;
      case 'retirement':
        return <RxHome className="w-4 h-4 text-blue-500" />;
      case 'mutual_separation':
        return <RxShare1 className="w-4 h-4 text-purple-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
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

  const getClearanceProgress = (clearanceStatus: any) => {
    const total = Object.keys(clearanceStatus).length;
    const approved = Object.values(clearanceStatus).filter(
      (status) => status === 'approved'
    ).length;
    return (approved / total) * 100;
  };

  const getClearanceStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  // Calculate statistics
  const totalApplications = exitApplications.length;
  const pendingApplications = exitApplications.filter(
    (app) => app.status === 'submitted' || app.status === 'approved' || app.status === 'processing'
  ).length;
  const completedApplications = exitApplications.filter((app) => app.status === 'completed').length;
  const pendingClearances = exitApplications.filter(
    (app) => app.status === 'clearance_pending'
  ).length;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredApplications.map((application) => (
        <div
          key={application.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority Indicator */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(application.priority)}`}></div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Header with employee info and status */}
          <div className="flex items-start justify-between mb-4 pr-8">
            <div className="flex items-center space-x-3">
              <img
                src={application.avatar}
                alt={application.employeeName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{application.employeeName}</h3>
                <p className="text-sm text-gray-500">{application.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">{getStatusIcon(application.status)}</div>
          </div>

          {/* Department and Designation */}
          <div className="mb-4">
            <Chip label={application.department} size="small" className="mb-2" variant="outlined" />
            <p className="text-sm text-gray-700 font-medium">{application.designation}</p>
          </div>

          {/* Resignation Details */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              {getResignationTypeIcon(application.resignationType)}
              <span className="text-sm font-medium text-gray-700 capitalize">
                {application.resignationType.replace('_', ' ')} Resignation
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Resignation Date:</span>
                <span className="font-medium">
                  {new Date(application.resignationDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Working Day:</span>
                <span className="font-medium">
                  {new Date(application.lastWorkingDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Notice Period:</span>
                <span className="font-medium">{application.actualNoticePeriod} days</span>
              </div>
            </div>
          </div>

          {/* Resignation Reason */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Reason for Resignation</p>
            <p className="text-sm text-gray-600 line-clamp-2">{application.resignationReason}</p>
          </div>

          {/* Clearance Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Clearance Progress</span>
              <span className="text-xs font-medium text-gray-700">
                {getClearanceProgress(application.clearanceStatus).toFixed(0)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${getClearanceProgress(application.clearanceStatus)}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-4 gap-1 text-xs">
              <div
                className={`text-center ${getClearanceStatusColor(application.clearanceStatus.it)}`}
              >
                IT
              </div>
              <div
                className={`text-center ${getClearanceStatusColor(application.clearanceStatus.finance)}`}
              >
                Finance
              </div>
              <div
                className={`text-center ${getClearanceStatusColor(application.clearanceStatus.admin)}`}
              >
                Admin
              </div>
              <div
                className={`text-center ${getClearanceStatusColor(application.clearanceStatus.hr)}`}
              >
                HR
              </div>
            </div>
          </div>

          {/* Assets to Return */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Assets to Return</span>
              <span className="text-xs font-medium text-gray-700">
                {application.assetsToReturn.filter((asset) => asset.returned).length}/
                {application.assetsToReturn.length}
              </span>
            </div>
            <div className="space-y-1">
              {application.assetsToReturn.slice(0, 2).map((asset, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{asset.name}</span>
                  <span
                    className={`font-medium ${asset.returned ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {asset.returned ? 'Returned' : 'Pending'}
                  </span>
                </div>
              ))}
              {application.assetsToReturn.length > 2 && (
                <p className="text-xs text-gray-500">
                  +{application.assetsToReturn.length - 2} more items
                </p>
              )}
            </div>
          </div>

          {/* Full & Final Settlement */}
          {application.fullFinalSettlement.amount && (
            <div className="mb-4 p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-700 font-medium">Full & Final Settlement</span>
                <span className="text-sm font-bold text-blue-900">
                  ₹{application.fullFinalSettlement.amount.toLocaleString()}
                </span>
              </div>
              <Chip
                label={
                  application.fullFinalSettlement.status.charAt(0).toUpperCase() +
                  application.fullFinalSettlement.status.slice(1)
                }
                size="small"
                color={application.fullFinalSettlement.status === 'paid' ? 'success' : 'warning'}
                className="mt-1"
              />
            </div>
          )}

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={
                application.status.charAt(0).toUpperCase() +
                application.status.slice(1).replace('_', ' ')
              }
              size="small"
              color={getStatusColor(application.status)}
              variant="filled"
            />
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxFileText className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxCalendar className="w-4 h-4" />
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
                Employee
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resignation Details
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Working Day
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clearance Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assets Return
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Settlement
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={application.avatar}
                        alt={application.employeeName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(application.priority)}`}
                      ></div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.employeeName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.employeeId} • {application.department}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {getResignationTypeIcon(application.resignationType)}
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {application.resignationType.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Applied: {new Date(application.resignationDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Notice: {application.actualNoticePeriod} days
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    {new Date(application.lastWorkingDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.ceil(
                      (new Date(application.lastWorkingDate).getTime() - currentTime.getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{' '}
                    days left
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mx-auto mb-1">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${getClearanceProgress(application.clearanceStatus)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {getClearanceProgress(application.clearanceStatus).toFixed(0)}% Complete
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    {application.assetsToReturn.filter((asset) => asset.returned).length}/
                    {application.assetsToReturn.length}
                  </div>
                  <div className="text-xs text-gray-500">Assets</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(application.status)}
                    <Chip
                      label={
                        application.status.charAt(0).toUpperCase() +
                        application.status.slice(1).replace('_', ' ')
                      }
                      size="small"
                      color={getStatusColor(application.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {application.fullFinalSettlement.amount ? (
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        ₹{application.fullFinalSettlement.amount.toLocaleString()}
                      </div>
                      <Chip
                        label={
                          application.fullFinalSettlement.status.charAt(0).toUpperCase() +
                          application.fullFinalSettlement.status.slice(1)
                        }
                        size="small"
                        color={
                          application.fullFinalSettlement.status === 'paid' ? 'success' : 'warning'
                        }
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Pending</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxFileText className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxCalendar className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxPencil1 className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Exit Applications</h1>
            <p className="text-gray-600">Manage employee resignations and exit processes</p>
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
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxTimer className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Process</p>
              <p className="text-2xl font-bold text-gray-900">{pendingApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <RxClock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Clearance Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingClearances}</p>
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
              <p className="text-2xl font-bold text-gray-900">{completedApplications}</p>
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
            <span>New Exit Application</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxCheckCircled className="w-4 h-4" />
            <span>Bulk Approvals</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>Exit Analytics</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxFileText className="w-4 h-4" />
            <span>Generate Reports</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all'
                    ? 'All Statuses'
                    : status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Resignation Type Filter */}
          <div className="relative">
            <select
              value={resignationTypeFilter}
              onChange={(e) => setResignationTypeFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {resignationTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'All Types'
                    : type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search exit applications..."
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
                viewMode === 'grid'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <RxGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
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
          Showing {filteredApplications.length} of {exitApplications.length} exit applications
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default ExitApplications;
