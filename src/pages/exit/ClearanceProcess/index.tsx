import React, { useEffect, useState } from 'react';
import {
  RxBarChart,
  RxCheck,
  RxCheckCircled,
  RxClock,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEnvelopeClosed,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxHome,
  RxIdCard,
  RxLaptop,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxRows,
  RxShare1,
  RxTimer,
} from 'react-icons/rx';

interface ClearanceItem {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  designation: string;
  exitApplicationId: string;
  lastWorkingDate: string;
  clearanceDepartment: 'it' | 'finance' | 'admin' | 'hr' | 'security' | 'facilities';
  clearanceType:
    | 'asset_return'
    | 'financial_clearance'
    | 'access_revocation'
    | 'document_handover'
    | 'knowledge_transfer'
    | 'exit_formalities';
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'on_hold';
  priority: 'high' | 'medium' | 'low';
  assignedTo: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    email: string;
  };
  dueDate: string;
  completedDate?: string;
  items: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    status: 'pending' | 'completed' | 'not_applicable';
    completedDate?: string;
    notes?: string;
  }>;
  comments: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedDate: string;
    uploadedBy: string;
  }>;
  createdDate: string;
  lastUpdated: string;
}

interface ClearanceDepartment {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  manager: {
    name: string;
    avatar: string;
    email: string;
  };
  totalItems: number;
  pendingItems: number;
  completedItems: number;
  avgProcessingTime: number;
}

const ClearanceProcess: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [clearanceDeptFilter, setClearanceDeptFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid'); // Removed 'kanban'

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

  // Mock clearance departments data
  const clearanceDepartments: ClearanceDepartment[] = [
    {
      id: 'it',
      name: 'IT Department',
      description: 'Asset return, access revocation, and data security clearance',
      icon: <RxLaptop className="w-6 h-6" />,
      color: 'bg-blue-500',
      manager: {
        name: 'Rajesh Kumar',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        email: 'rajesh.kumar@company.com',
      },
      totalItems: 12,
      pendingItems: 4,
      completedItems: 8,
      avgProcessingTime: 2.5,
    },
    {
      id: 'finance',
      name: 'Finance Department',
      description: 'Final settlement, loan clearance, and expense reconciliation',
      icon: <RxBarChart className="w-6 h-6" />,
      color: 'bg-green-500',
      manager: {
        name: 'Priya Sharma',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        email: 'priya.sharma@company.com',
      },
      totalItems: 8,
      pendingItems: 3,
      completedItems: 5,
      avgProcessingTime: 3.2,
    },
    {
      id: 'admin',
      name: 'Admin Department',
      description: 'Document handover, facility access, and administrative clearance',
      icon: <RxFileText className="w-6 h-6" />,
      color: 'bg-purple-500',
      manager: {
        name: 'Amit Singh',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        email: 'amit.singh@company.com',
      },
      totalItems: 6,
      pendingItems: 2,
      completedItems: 4,
      avgProcessingTime: 1.8,
    },
    {
      id: 'hr',
      name: 'HR Department',
      description: 'Exit interviews, policy clearance, and final documentation',
      icon: <RxPerson className="w-6 h-6" />,
      color: 'bg-orange-500',
      manager: {
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        email: 'anita.verma@company.com',
      },
      totalItems: 10,
      pendingItems: 5,
      completedItems: 5,
      avgProcessingTime: 2.1,
    },
    {
      id: 'security',
      name: 'Security Department',
      description: 'Access card return, security clearance, and premises access revocation',
      icon: <RxIdCard className="w-6 h-6" />,
      color: 'bg-red-500',
      manager: {
        name: 'Vikram Reddy',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        email: 'vikram.reddy@company.com',
      },
      totalItems: 5,
      pendingItems: 1,
      completedItems: 4,
      avgProcessingTime: 0.5,
    },
    {
      id: 'facilities',
      name: 'Facilities Department',
      description: 'Parking pass return, locker clearance, and facility access management',
      icon: <RxHome className="w-6 h-6" />,
      color: 'bg-teal-500',
      manager: {
        name: 'Deepika Iyer',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        email: 'deepika.iyer@company.com',
      },
      totalItems: 4,
      pendingItems: 1,
      completedItems: 3,
      avgProcessingTime: 1.2,
    },
  ];

  // Mock clearance items data
  const clearanceItems: ClearanceItem[] = [
    {
      id: 'CLR001',
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      exitApplicationId: 'EXT001',
      lastWorkingDate: '2025-08-27',
      clearanceDepartment: 'it',
      clearanceType: 'asset_return',
      status: 'in_progress',
      priority: 'high',
      assignedTo: {
        id: 'IT001',
        name: 'Rajesh Kumar',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        title: 'IT Manager',
        email: 'rajesh.kumar@company.com',
      },
      dueDate: '2025-08-25',
      items: [
        {
          id: 'ITM001',
          name: 'MacBook Pro 16"',
          category: 'Laptop',
          description: 'Company issued MacBook Pro with accessories',
          status: 'completed',
          completedDate: '2025-07-29',
          notes: 'Returned in good condition with charger and bag',
        },
        {
          id: 'ITM002',
          name: 'iPhone 13',
          category: 'Mobile Device',
          description: 'Company mobile phone with accessories',
          status: 'pending',
          notes: 'Pending return - scheduled for tomorrow',
        },
        {
          id: 'ITM003',
          name: 'Software Access',
          category: 'Access Rights',
          description: 'Revoke access to development tools and repositories',
          status: 'completed',
          completedDate: '2025-07-30',
        },
      ],
      comments: 'Priority clearance due to critical project handover',
      documents: [
        {
          id: 'DOC001',
          name: 'Asset Return Form',
          type: 'PDF',
          uploadedDate: '2025-07-29',
          uploadedBy: 'Rajesh Kumar',
        },
      ],
      createdDate: '2025-07-28',
      lastUpdated: '2025-07-30',
    },
    {
      id: 'CLR002',
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      exitApplicationId: 'EXT001',
      lastWorkingDate: '2025-08-27',
      clearanceDepartment: 'finance',
      clearanceType: 'financial_clearance',
      status: 'pending',
      priority: 'high',
      assignedTo: {
        id: 'FIN001',
        name: 'Priya Sharma',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Finance Manager',
        email: 'priya.sharma@company.com',
      },
      dueDate: '2025-08-26',
      items: [
        {
          id: 'FIN001',
          name: 'Final Settlement Calculation',
          category: 'Settlement',
          description: 'Calculate final dues including salary, bonus, and leave encashment',
          status: 'pending',
        },
        {
          id: 'FIN002',
          name: 'Expense Reimbursement',
          category: 'Expenses',
          description: 'Process pending expense claims',
          status: 'pending',
        },
        {
          id: 'FIN003',
          name: 'Loan Clearance',
          category: 'Loans',
          description: 'Verify and clear any outstanding loans',
          status: 'not_applicable',
        },
      ],
      comments: 'Pending expense verification from employee',
      documents: [],
      createdDate: '2025-07-28',
      lastUpdated: '2025-07-30',
    },
    {
      id: 'CLR003',
      employeeId: 'EMP002',
      employeeName: 'Meera Patel',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      department: 'Marketing',
      designation: 'Marketing Manager',
      exitApplicationId: 'EXT002',
      lastWorkingDate: '2025-08-09',
      clearanceDepartment: 'hr',
      clearanceType: 'exit_formalities',
      status: 'approved',
      priority: 'medium',
      assignedTo: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
        email: 'anita.verma@company.com',
      },
      dueDate: '2025-08-08',
      completedDate: '2025-08-08',
      items: [
        {
          id: 'HR001',
          name: 'Exit Interview',
          category: 'Interview',
          description: 'Conduct comprehensive exit interview',
          status: 'completed',
          completedDate: '2025-08-08',
          notes: 'Positive feedback, constructive suggestions provided',
        },
        {
          id: 'HR002',
          name: 'Policy Acknowledgment',
          category: 'Documentation',
          description: 'Confirm understanding of post-employment obligations',
          status: 'completed',
          completedDate: '2025-08-08',
        },
        {
          id: 'HR003',
          name: 'Experience Letter',
          category: 'Documentation',
          description: 'Issue experience and relieving letter',
          status: 'completed',
          completedDate: '2025-08-09',
        },
      ],
      comments: 'All formalities completed successfully',
      documents: [
        {
          id: 'DOC002',
          name: 'Exit Interview Form',
          type: 'PDF',
          uploadedDate: '2025-08-08',
          uploadedBy: 'Anita Verma',
        },
        {
          id: 'DOC003',
          name: 'Experience Letter',
          type: 'PDF',
          uploadedDate: '2025-08-09',
          uploadedBy: 'Anita Verma',
        },
      ],
      createdDate: '2025-07-25',
      lastUpdated: '2025-08-09',
    },
    {
      id: 'CLR004',
      employeeId: 'EMP003',
      employeeName: 'Arjun Reddy',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      department: 'Finance',
      designation: 'Senior Financial Analyst',
      exitApplicationId: 'EXT003',
      lastWorkingDate: '2025-08-29',
      clearanceDepartment: 'admin',
      clearanceType: 'document_handover',
      status: 'pending',
      priority: 'low',
      assignedTo: {
        id: 'ADM001',
        name: 'Amit Singh',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        title: 'Admin Manager',
        email: 'amit.singh@company.com',
      },
      dueDate: '2025-08-28',
      items: [
        {
          id: 'ADM001',
          name: 'Project Files Handover',
          category: 'Documents',
          description: 'Transfer all project-related documents and files',
          status: 'pending',
        },
        {
          id: 'ADM002',
          name: 'Client Information Transfer',
          category: 'Confidential',
          description: 'Secure handover of client data and contacts',
          status: 'pending',
        },
        {
          id: 'ADM003',
          name: 'Physical File Return',
          category: 'Physical Documents',
          description: 'Return physical files and documents from desk',
          status: 'pending',
        },
      ],
      comments: 'New application, waiting for document preparation',
      documents: [],
      createdDate: '2025-07-30',
      lastUpdated: '2025-07-30',
    },
    {
      id: 'CLR005',
      employeeId: 'EMP004',
      employeeName: 'Sanjay Kumar',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      department: 'Operations',
      designation: 'Operations Lead',
      exitApplicationId: 'EXT004',
      lastWorkingDate: '2025-08-10',
      clearanceDepartment: 'security',
      clearanceType: 'access_revocation',
      status: 'approved',
      priority: 'high',
      assignedTo: {
        id: 'SEC001',
        name: 'Vikram Reddy',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        title: 'Security Manager',
        email: 'vikram.reddy@company.com',
      },
      dueDate: '2025-08-10',
      completedDate: '2025-08-10',
      items: [
        {
          id: 'SEC001',
          name: 'Access Card Return',
          category: 'Physical Access',
          description: 'Return building access card and parking pass',
          status: 'completed',
          completedDate: '2025-08-10',
        },
        {
          id: 'SEC002',
          name: 'System Access Revocation',
          category: 'Digital Access',
          description: 'Disable all system access and credentials',
          status: 'completed',
          completedDate: '2025-08-10',
        },
        {
          id: 'SEC003',
          name: 'Visitor Badge Collection',
          category: 'Physical Access',
          description: 'Collect any outstanding visitor badges',
          status: 'not_applicable',
        },
      ],
      comments: 'Urgent clearance completed due to immediate termination',
      documents: [
        {
          id: 'DOC004',
          name: 'Access Revocation Report',
          type: 'PDF',
          uploadedDate: '2025-08-10',
          uploadedBy: 'Vikram Reddy',
        },
      ],
      createdDate: '2025-07-26',
      lastUpdated: '2025-08-10',
    },
  ];

  const statuses = ['all', 'pending', 'in_progress', 'approved', 'rejected', 'on_hold'];
  const clearanceDepts = ['all', 'it', 'finance', 'admin', 'hr', 'security', 'facilities'];

  // Filter clearance items
  const filteredItems = clearanceItems.filter((item) => {
    const matchesSearch =
      item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.comments.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesClearanceDept =
      clearanceDeptFilter === 'all' || item.clearanceDepartment === clearanceDeptFilter;

    return matchesSearch && matchesStatus && matchesClearanceDept;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'primary';
      case 'in_progress':
        return 'warning';
      case 'approved':
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
      case 'pending':
        return <RxClock className="w-4 h-4 text-blue-500" />;
      case 'in_progress':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'on_hold':
        return <RxTimer className="w-4 h-4 text-blue-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getClearanceTypeIcon = (type: string) => {
    switch (type) {
      case 'asset_return':
        return <RxLaptop className="w-4 h-4 text-blue-500" />;
      case 'financial_clearance':
        return <RxBarChart className="w-4 h-4 text-green-500" />;
      case 'access_revocation':
        return <RxIdCard className="w-4 h-4 text-red-500" />;
      case 'document_handover':
        return <RxFileText className="w-4 h-4 text-purple-500" />;
      case 'knowledge_transfer':
        return <RxShare1 className="w-4 h-4 text-orange-500" />;
      case 'exit_formalities':
        return <RxPerson className="w-4 h-4 text-pink-500" />;
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

  const getItemProgress = (items: any[]) => {
    const total = items.length;
    const completed = items.filter((item) => item.status === 'completed').length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getItemStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'not_applicable':
        return 'text-gray-500';
      default:
        return 'text-gray-600';
    }
  };

  // Calculate statistics
  const totalItems = clearanceItems.length;
  const pendingItems = clearanceItems.filter(
    (item) => item.status === 'pending' || item.status === 'in_progress'
  ).length;
  const completedItems = clearanceItems.filter((item) => item.status === 'approved').length;
  const overdue = clearanceItems.filter(
    (item) => new Date(item.dueDate) < currentTime && item.status !== 'approved'
  ).length;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority Indicator */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`}></div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Header with employee info and status */}
          <div className="flex items-start justify-between mb-4 pr-8">
            <div className="flex items-center space-x-3">
              <img
                src={item.avatar}
                alt={item.employeeName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{item.employeeName}</h3>
                <p className="text-sm text-gray-500">{item.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">{getStatusIcon(item.status)}</div>
          </div>

          {/* Department and Designation */}
          <div className="mb-4">
            <Chip label={item.department} size="small" className="mb-2" variant="outlined" />
            <p className="text-sm text-gray-700 font-medium">{item.designation}</p>
          </div>

          {/* Clearance Details */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              {getClearanceTypeIcon(item.clearanceType)}
              <span className="text-sm font-medium text-gray-700 capitalize">
                {item.clearanceType.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Department:</span>
              <span className="text-sm font-medium text-gray-900 capitalize">
                {item.clearanceDepartment.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Due Date:</span>
              <span
                className={`text-sm font-medium ${
                  new Date(item.dueDate) < currentTime && item.status !== 'approved'
                    ? 'text-red-600'
                    : 'text-gray-900'
                }`}
              >
                {new Date(item.dueDate).toLocaleDateString()}
              </span>
            </div>
            {item.completedDate && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Completed:</span>
                <span className="text-sm text-green-600 font-medium">
                  {new Date(item.completedDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {/* Assigned To */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Assigned To</p>
            <div className="flex items-center space-x-2">
              <img
                src={item.assignedTo.avatar}
                alt={item.assignedTo.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.assignedTo.name}</p>
                <p className="text-xs text-gray-500">{item.assignedTo.title}</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-gray-700">
                {getItemProgress(item.items).toFixed(0)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${getItemProgress(item.items)}%` }}
              ></div>
            </div>
            <div className="space-y-1">
              {item.items.slice(0, 3).map((subItem, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{subItem.name}</span>
                  <span className={`font-medium ${getItemStatusColor(subItem.status)}`}>
                    {subItem.status === 'not_applicable'
                      ? 'N/A'
                      : subItem.status === 'completed'
                        ? '✓'
                        : '○'}
                  </span>
                </div>
              ))}
              {item.items.length > 3 && (
                <p className="text-xs text-gray-500">+{item.items.length - 3} more items</p>
              )}
            </div>
          </div>

          {/* Comments */}
          {item.comments && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Comments</p>
              <p className="text-sm text-gray-600 line-clamp-2">{item.comments}</p>
            </div>
          )}

          {/* Documents */}
          {item.documents.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Documents ({item.documents.length})</p>
              <div className="flex items-center space-x-2">
                <RxFileText className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                  View Documents
                </span>
              </div>
            </div>
          )}

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}
              size="small"
              color={getStatusColor(item.status)}
              variant="filled"
            />
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxPencil1 className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxEnvelopeClosed className="w-4 h-4" />
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
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clearance Type
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={item.avatar}
                        alt={item.employeeName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`}
                      ></div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.employeeName}</div>
                      <div className="text-sm text-gray-500">
                        {item.employeeId} • {item.department}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1">
                    {getClearanceTypeIcon(item.clearanceType)}
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {item.clearanceType.replace('_', ' ')}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-sm text-gray-900 capitalize">
                    {item.clearanceDepartment.replace('_', ' ')}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <img
                      src={item.assignedTo.avatar}
                      alt={item.assignedTo.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {item.assignedTo.name}
                      </div>
                      <div className="text-xs text-gray-500">{item.assignedTo.title}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mx-auto mb-1">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${getItemProgress(item.items)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {item.items.filter((i) => i.status === 'completed').length}/{item.items.length}{' '}
                    items
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div
                    className={`text-sm font-medium ${
                      new Date(item.dueDate) < currentTime && item.status !== 'approved'
                        ? 'text-red-600'
                        : 'text-gray-900'
                    }`}
                  >
                    {new Date(item.dueDate).toLocaleDateString()}
                  </div>
                  {new Date(item.dueDate) < currentTime && item.status !== 'approved' && (
                    <div className="text-xs text-red-500">Overdue</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(item.status)}
                    <Chip
                      label={
                        item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')
                      }
                      size="small"
                      color={getStatusColor(item.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxPencil1 className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxEnvelopeClosed className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxCheck className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Clearance Process</h1>
            <p className="text-gray-600">Manage departmental clearances for exiting employees</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-500">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
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
              <p className="text-sm font-medium text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxTimer className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingItems}</p>
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
              <p className="text-2xl font-bold text-gray-900">{completedItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <RxCrossCircled className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{overdue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clearanceDepartments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full text-white ${dept.color}`}>{dept.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                    <p className="text-sm text-gray-500">{dept.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{dept.totalItems}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{dept.pendingItems}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{dept.completedItems}</p>
                  <p className="text-xs text-gray-500">Done</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(dept.completedItems / dept.totalItems) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={dept.manager.avatar}
                    alt={dept.manager.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700">{dept.manager.name}</span>
                </div>
                <span className="text-xs text-gray-500">Avg: {dept.avgProcessingTime} days</span>
              </div>
            </div>
          ))}
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

          {/* Clearance Department Filter */}
          <div className="relative">
            <select
              value={clearanceDeptFilter}
              onChange={(e) => setClearanceDeptFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {clearanceDepts.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all'
                    ? 'All Clearance Depts'
                    : dept.charAt(0).toUpperCase() + dept.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clearance items..."
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
          {/* View Toggle - Only Grid and Table */}
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
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredItems.length} of {clearanceItems.length} clearance items
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content - Only Grid and Table Views */}
      <div className="relative">
        {viewMode === 'grid' && <GridView />}
        {viewMode === 'table' && <TableView />}
      </div>
    </div>
  );
};

export default ClearanceProcess;
