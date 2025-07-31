import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { FaShieldAlt, FaUserTie } from 'react-icons/fa';
import {
  RxBackpack,
  RxCalendar,
  RxCheckCircled,
  RxCross2,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxGear,
  RxIdCard,
  RxLockClosed,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxTimer,
  RxTrash,
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';
import Clock from '../../../shared/clock';

interface User {
  id: string;
  userCode: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  profileImage: string;
  employeeId?: string;
  department: {
    id: string;
    name: string;
    code: string;
  };
  designation: {
    id: string;
    title: string;
    code: string;
  };
  userRole: {
    id: string;
    name: string;
    level: 'super_admin' | 'admin' | 'hr_manager' | 'manager' | 'employee' | 'guest';
    permissions: string[];
  };
  accessLevel: 'full' | 'limited' | 'restricted' | 'view_only';
  accountStatus: 'active' | 'inactive' | 'suspended' | 'locked' | 'pending_activation';
  authentication: {
    loginMethod: 'password' | 'sso' | 'ldap' | 'multi_factor';
    lastLogin: string;
    loginAttempts: number;
    passwordLastChanged: string;
    twoFactorEnabled: boolean;
    sessionTimeout: number;
  };
  permissions: {
    modules: Array<{
      moduleName: string;
      access: 'read' | 'write' | 'admin' | 'none';
    }>;
    dataAccess: {
      ownData: boolean;
      departmentData: boolean;
      allData: boolean;
      reportingTeam: boolean;
    };
    systemAccess: {
      canCreateUsers: boolean;
      canManageRoles: boolean;
      canAccessReports: boolean;
      canManageSettings: boolean;
    };
  };
  contactInfo: {
    phone: string;
    alternateEmail?: string;
    emergencyContact: string;
  };
  organizationalInfo: {
    reportingManager: {
      id: string;
      name: string;
      email: string;
    };
    directReports: number;
    location: string;
    employmentType: 'permanent' | 'contract' | 'intern' | 'consultant';
    joinDate: string;
  };
  securityInfo: {
    ipRestrictions: string[];
    deviceRestrictions: string[];
    timeRestrictions: {
      allowedHours: string;
      allowedDays: string[];
    };
    complianceFlags: string[];
  };
  activityLog: {
    totalLogins: number;
    lastActivity: string;
    frequentActions: string[];
    suspiciousActivity: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      inApp: boolean;
      sms: boolean;
    };
    theme: 'light' | 'dark' | 'auto';
  };
  metaData: {
    createdDate: string;
    createdBy: string;
    lastModified: string;
    modifiedBy: string;
    version: string;
  };
  adminPermissions: {
    canEdit: boolean;
    canDelete: boolean;
    canSuspend: boolean;
    canResetPassword: boolean;
  };
  tags: string[];
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('displayName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock users data
  const users: User[] = [
    {
      id: 'USR001',
      userCode: 'ADMIN001',
      username: 'rajesh.kumar',
      email: 'rajesh.kumar@company.com',
      firstName: 'Rajesh',
      lastName: 'Kumar',
      displayName: 'Rajesh Kumar',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      employeeId: 'EMP001',
      department: {
        id: 'DEPT001',
        name: 'Engineering',
        code: 'ENG',
      },
      designation: {
        id: 'DSG001',
        title: 'Engineering Manager',
        code: 'EM',
      },
      userRole: {
        id: 'ROLE001',
        name: 'Department Manager',
        level: 'manager',
        permissions: ['user_management', 'team_reports', 'budget_view', 'performance_management'],
      },
      accessLevel: 'full',
      accountStatus: 'active',
      authentication: {
        loginMethod: 'multi_factor',
        lastLogin: '2025-08-01T08:30:00Z',
        loginAttempts: 0,
        passwordLastChanged: '2025-07-15T10:20:00Z',
        twoFactorEnabled: true,
        sessionTimeout: 480,
      },
      permissions: {
        modules: [
          { moduleName: 'Employee Management', access: 'admin' },
          { moduleName: 'Payroll', access: 'read' },
          { moduleName: 'Leave Management', access: 'write' },
          { moduleName: 'Performance', access: 'admin' },
          { moduleName: 'Reports', access: 'read' },
        ],
        dataAccess: {
          ownData: true,
          departmentData: true,
          allData: false,
          reportingTeam: true,
        },
        systemAccess: {
          canCreateUsers: true,
          canManageRoles: false,
          canAccessReports: true,
          canManageSettings: false,
        },
      },
      contactInfo: {
        phone: '+91 98765 43210',
        alternateEmail: 'r.kumar@gmail.com',
        emergencyContact: '+91 98765 43211',
      },
      organizationalInfo: {
        reportingManager: {
          id: 'USR005',
          name: 'Vikram Mehta',
          email: 'vikram.mehta@company.com',
        },
        directReports: 15,
        location: 'Mumbai',
        employmentType: 'permanent',
        joinDate: '2020-03-15',
      },
      securityInfo: {
        ipRestrictions: ['192.168.1.0/24'],
        deviceRestrictions: ['laptop', 'mobile'],
        timeRestrictions: {
          allowedHours: '08:00-20:00',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        complianceFlags: ['sox_compliant', 'gdpr_compliant'],
      },
      activityLog: {
        totalLogins: 1247,
        lastActivity: '2025-08-01T10:15:00Z',
        frequentActions: ['view_reports', 'approve_leave', 'manage_team'],
        suspiciousActivity: false,
      },
      preferences: {
        language: 'English',
        timezone: 'Asia/Kolkata',
        notifications: {
          email: true,
          inApp: true,
          sms: false,
        },
        theme: 'light',
      },
      metaData: {
        createdDate: '2020-03-15T09:00:00Z',
        createdBy: 'System Admin',
        lastModified: '2025-07-30T14:20:00Z',
        modifiedBy: 'HR Admin',
        version: '2.1',
      },
      adminPermissions: {
        canEdit: true,
        canDelete: false,
        canSuspend: true,
        canResetPassword: true,
      },
      tags: ['manager', 'engineering', 'team-lead'],
    },
    {
      id: 'USR002',
      userCode: 'EMP002',
      username: 'priya.sharma',
      email: 'priya.sharma@company.com',
      firstName: 'Priya',
      lastName: 'Sharma',
      displayName: 'Priya Sharma',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      employeeId: 'EMP002',
      department: {
        id: 'DEPT005',
        name: 'Human Resources',
        code: 'HR',
      },
      designation: {
        id: 'DSG005',
        title: 'HR Manager',
        code: 'HRM',
      },
      userRole: {
        id: 'ROLE002',
        name: 'HR Manager',
        level: 'hr_manager',
        permissions: ['employee_management', 'payroll_access', 'leave_management', 'reports', 'user_management'],
      },
      accessLevel: 'full',
      accountStatus: 'active',
      authentication: {
        loginMethod: 'multi_factor',
        lastLogin: '2025-08-01T09:15:00Z',
        loginAttempts: 0,
        passwordLastChanged: '2025-07-20T16:30:00Z',
        twoFactorEnabled: true,
        sessionTimeout: 480,
      },
      permissions: {
        modules: [
          { moduleName: 'Employee Management', access: 'admin' },
          { moduleName: 'Payroll', access: 'admin' },
          { moduleName: 'Leave Management', access: 'admin' },
          { moduleName: 'Performance', access: 'admin' },
          { moduleName: 'Reports', access: 'admin' },
        ],
        dataAccess: {
          ownData: true,
          departmentData: true,
          allData: true,
          reportingTeam: true,
        },
        systemAccess: {
          canCreateUsers: true,
          canManageRoles: true,
          canAccessReports: true,
          canManageSettings: true,
        },
      },
      contactInfo: {
        phone: '+91 98765 43212',
        emergencyContact: '+91 98765 43213',
      },
      organizationalInfo: {
        reportingManager: {
          id: 'USR006',
          name: 'Anita Verma',
          email: 'anita.verma@company.com',
        },
        directReports: 8,
        location: 'Bangalore',
        employmentType: 'permanent',
        joinDate: '2019-06-20',
      },
      securityInfo: {
        ipRestrictions: [],
        deviceRestrictions: [],
        timeRestrictions: {
          allowedHours: '24/7',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        complianceFlags: ['hr_certified', 'data_privacy_trained'],
      },
      activityLog: {
        totalLogins: 2156,
        lastActivity: '2025-08-01T11:30:00Z',
        frequentActions: ['employee_management', 'payroll_processing', 'report_generation'],
        suspiciousActivity: false,
      },
      preferences: {
        language: 'English',
        timezone: 'Asia/Kolkata',
        notifications: {
          email: true,
          inApp: true,
          sms: true,
        },
        theme: 'light',
      },
      metaData: {
        createdDate: '2019-06-20T10:30:00Z',
        createdBy: 'System Admin',
        lastModified: '2025-07-28T11:15:00Z',
        modifiedBy: 'Super Admin',
        version: '2.3',
      },
      adminPermissions: {
        canEdit: true,
        canDelete: false,
        canSuspend: true,
        canResetPassword: true,
      },
      tags: ['hr', 'manager', 'admin'],
    },
    {
      id: 'USR003',
      userCode: 'EMP003',
      username: 'amit.patel',
      email: 'amit.patel@company.com',
      firstName: 'Amit',
      lastName: 'Patel',
      displayName: 'Amit Patel',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      employeeId: 'EMP003',
      department: {
        id: 'DEPT001',
        name: 'Engineering',
        code: 'ENG',
      },
      designation: {
        id: 'DSG002',
        title: 'Senior Software Engineer',
        code: 'SSE',
      },
      userRole: {
        id: 'ROLE003',
        name: 'Employee',
        level: 'employee',
        permissions: ['self_service', 'team_collaboration', 'basic_reports'],
      },
      accessLevel: 'limited',
      accountStatus: 'active',
      authentication: {
        loginMethod: 'password',
        lastLogin: '2025-08-01T09:45:00Z',
        loginAttempts: 0,
        passwordLastChanged: '2025-07-10T14:20:00Z',
        twoFactorEnabled: false,
        sessionTimeout: 240,
      },
      permissions: {
        modules: [
          { moduleName: 'Employee Management', access: 'read' },
          { moduleName: 'Payroll', access: 'read' },
          { moduleName: 'Leave Management', access: 'write' },
          { moduleName: 'Performance', access: 'write' },
          { moduleName: 'Reports', access: 'none' },
        ],
        dataAccess: {
          ownData: true,
          departmentData: false,
          allData: false,
          reportingTeam: false,
        },
        systemAccess: {
          canCreateUsers: false,
          canManageRoles: false,
          canAccessReports: false,
          canManageSettings: false,
        },
      },
      contactInfo: {
        phone: '+91 98765 43214',
        emergencyContact: '+91 98765 43215',
      },
      organizationalInfo: {
        reportingManager: {
          id: 'USR001',
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@company.com',
        },
        directReports: 0,
        location: 'Mumbai',
        employmentType: 'permanent',
        joinDate: '2021-08-15',
      },
      securityInfo: {
        ipRestrictions: [],
        deviceRestrictions: [],
        timeRestrictions: {
          allowedHours: '08:00-18:00',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        complianceFlags: ['security_training_completed'],
      },
      activityLog: {
        totalLogins: 956,
        lastActivity: '2025-08-01T12:00:00Z',
        frequentActions: ['self_service', 'leave_application', 'timesheet_submission'],
        suspiciousActivity: false,
      },
      preferences: {
        language: 'English',
        timezone: 'Asia/Kolkata',
        notifications: {
          email: true,
          inApp: true,
          sms: false,
        },
        theme: 'dark',
      },
      metaData: {
        createdDate: '2021-08-15T11:00:00Z',
        createdBy: 'HR Admin',
        lastModified: '2025-07-25T16:30:00Z',
        modifiedBy: 'HR Admin',
        version: '1.8',
      },
      adminPermissions: {
        canEdit: true,
        canDelete: true,
        canSuspend: true,
        canResetPassword: true,
      },
      tags: ['employee', 'engineering', 'developer'],
    },
    {
      id: 'USR004',
      userCode: 'ADMIN002',
      username: 'system.admin',
      email: 'admin@company.com',
      firstName: 'System',
      lastName: 'Administrator',
      displayName: 'System Administrator',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      department: {
        id: 'DEPT008',
        name: 'Information Technology',
        code: 'IT',
      },
      designation: {
        id: 'DSG008',
        title: 'System Administrator',
        code: 'SA',
      },
      userRole: {
        id: 'ROLE004',
        name: 'Super Administrator',
        level: 'super_admin',
        permissions: ['full_access', 'system_administration', 'user_management', 'security_management'],
      },
      accessLevel: 'full',
      accountStatus: 'active',
      authentication: {
        loginMethod: 'multi_factor',
        lastLogin: '2025-08-01T07:00:00Z',
        loginAttempts: 0,
        passwordLastChanged: '2025-07-25T09:30:00Z',
        twoFactorEnabled: true,
        sessionTimeout: 720,
      },
      permissions: {
        modules: [
          { moduleName: 'Employee Management', access: 'admin' },
          { moduleName: 'Payroll', access: 'admin' },
          { moduleName: 'Leave Management', access: 'admin' },
          { moduleName: 'Performance', access: 'admin' },
          { moduleName: 'Reports', access: 'admin' },
        ],
        dataAccess: {
          ownData: true,
          departmentData: true,
          allData: true,
          reportingTeam: true,
        },
        systemAccess: {
          canCreateUsers: true,
          canManageRoles: true,
          canAccessReports: true,
          canManageSettings: true,
        },
      },
      contactInfo: {
        phone: '+91 98765 43216',
        emergencyContact: '+91 98765 43217',
      },
      organizationalInfo: {
        reportingManager: {
          id: 'USR007',
          name: 'Chief Technology Officer',
          email: 'cto@company.com',
        },
        directReports: 3,
        location: 'Chennai',
        employmentType: 'permanent',
        joinDate: '2018-01-10',
      },
      securityInfo: {
        ipRestrictions: ['10.0.0.0/8'],
        deviceRestrictions: ['laptop', 'secure_mobile'],
        timeRestrictions: {
          allowedHours: '24/7',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        complianceFlags: ['security_certified', 'admin_trained', 'incident_response_trained'],
      },
      activityLog: {
        totalLogins: 3456,
        lastActivity: '2025-08-01T13:45:00Z',
        frequentActions: ['system_administration', 'user_management', 'security_monitoring'],
        suspiciousActivity: false,
      },
      preferences: {
        language: 'English',
        timezone: 'Asia/Kolkata',
        notifications: {
          email: true,
          inApp: true,
          sms: true,
        },
        theme: 'dark',
      },
      metaData: {
        createdDate: '2018-01-10T10:00:00Z',
        createdBy: 'System',
        lastModified: '2025-07-31T10:00:00Z',
        modifiedBy: 'System',
        version: '3.2',
      },
      adminPermissions: {
        canEdit: true,
        canDelete: false,
        canSuspend: false,
        canResetPassword: true,
      },
      tags: ['admin', 'system', 'security'],
    },
    {
      id: 'USR005',
      userCode: 'TMP001',
      username: 'john.doe',
      email: 'john.doe@company.com',
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'John Doe',
      profileImage: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      employeeId: 'TMP001',
      department: {
        id: 'DEPT002',
        name: 'Marketing',
        code: 'MKT',
      },
      designation: {
        id: 'DSG009',
        title: 'Marketing Intern',
        code: 'MI',
      },
      userRole: {
        id: 'ROLE005',
        name: 'Temporary User',
        level: 'guest',
        permissions: ['limited_access', 'basic_self_service'],
      },
      accessLevel: 'restricted',
      accountStatus: 'pending_activation',
      authentication: {
        loginMethod: 'password',
        lastLogin: '2025-07-30T16:00:00Z',
        loginAttempts: 2,
        passwordLastChanged: '2025-07-28T10:00:00Z',
        twoFactorEnabled: false,
        sessionTimeout: 120,
      },
      permissions: {
        modules: [
          { moduleName: 'Employee Management', access: 'read' },
          { moduleName: 'Payroll', access: 'none' },
          { moduleName: 'Leave Management', access: 'read' },
          { moduleName: 'Performance', access: 'none' },
          { moduleName: 'Reports', access: 'none' },
        ],
        dataAccess: {
          ownData: true,
          departmentData: false,
          allData: false,
          reportingTeam: false,
        },
        systemAccess: {
          canCreateUsers: false,
          canManageRoles: false,
          canAccessReports: false,
          canManageSettings: false,
        },
      },
      contactInfo: {
        phone: '+91 98765 43218',
        emergencyContact: '+91 98765 43219',
      },
      organizationalInfo: {
        reportingManager: {
          id: 'USR008',
          name: 'Marketing Manager',
          email: 'marketing.manager@company.com',
        },
        directReports: 0,
        location: 'Bangalore',
        employmentType: 'intern',
        joinDate: '2025-07-01',
      },
      securityInfo: {
        ipRestrictions: ['192.168.100.0/24'],
        deviceRestrictions: ['laptop'],
        timeRestrictions: {
          allowedHours: '09:00-17:00',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        complianceFlags: ['orientation_pending'],
      },
      activityLog: {
        totalLogins: 15,
        lastActivity: '2025-07-31T14:30:00Z',
        frequentActions: ['profile_setup', 'orientation_materials'],
        suspiciousActivity: false,
      },
      preferences: {
        language: 'English',
        timezone: 'Asia/Kolkata',
        notifications: {
          email: true,
          inApp: false,
          sms: false,
        },
        theme: 'auto',
      },
      metaData: {
        createdDate: '2025-07-01T09:00:00Z',
        createdBy: 'HR Admin',
        lastModified: '2025-07-30T15:45:00Z',
        modifiedBy: 'HR Admin',
        version: '1.0',
      },
      adminPermissions: {
        canEdit: true,
        canDelete: true,
        canSuspend: true,
        canResetPassword: true,
      },
      tags: ['intern', 'marketing', 'temporary'],
    },
  ];

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.designation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userRole.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField as keyof User];
    const bValue = b[sortField as keyof User];

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
      case 'suspended':
        return 'error';
      case 'locked':
        return 'error';
      case 'pending_activation':
        return 'primary';
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
      case 'suspended':
        return <RxCross2 className="w-4 h-4 text-red-500" />;
      case 'locked':
        return <RxLockClosed className="w-4 h-4 text-red-500" />;
      case 'pending_activation':
        return <RxGear className="w-4 h-4 text-blue-500" />;
      default:
        return <RxPerson className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleColor = (level: string) => {
    switch (level) {
      case 'super_admin':
        return 'error';
      case 'admin':
        return 'warning';
      case 'hr_manager':
        return 'primary';
      case 'manager':
        return 'info';
      case 'employee':
        return 'success';
      case 'guest':
        return 'default';
      default:
        return 'default';
    }
  };

  const getRoleIcon = (level: string) => {
    switch (level) {
      case 'super_admin':
        return <FaShieldAlt className="w-4 h-4 text-red-500" />;
      case 'admin':
        return <RxIdCard className="w-4 h-4 text-orange-500" />;
      case 'hr_manager':
        return <FaUserTie className="w-4 h-4 text-blue-500" />;
      case 'manager':
        return <RxBackpack className="w-4 h-4 text-purple-500" />;
      case 'employee':
        return <RxPerson className="w-4 h-4 text-green-500" />;
      case 'guest':
        return <RxPerson className="w-4 h-4 text-gray-500" />;
      default:
        return <RxPerson className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'full':
        return 'text-green-600 bg-green-100';
      case 'limited':
        return 'text-yellow-600 bg-yellow-100';
      case 'restricted':
        return 'text-orange-600 bg-orange-100';
      case 'view_only':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
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
      setSelectedUsers(sortedUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
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
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.accountStatus === 'active').length;
  const adminUsers = users.filter((u) => u.userRole.level === 'admin' || u.userRole.level === 'super_admin').length;
  const recentLogins = users.filter((u) => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(u.authentication.lastLogin) > twentyFourHoursAgo;
  }).length;

  // Table View Component
  const TableView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === sortedUsers.length && sortedUsers.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('userCode')}
              >
                <div className="flex whitespace-nowrap items-center">Code {getSortIcon('userCode')}</div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('displayName')}
              >
                <div className="flex whitespace-nowrap items-center">User {getSortIcon('displayName')}</div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department & Role
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('userRole.level')}
              >
                <div className="flex items-center justify-center">
                  User Role
                  {getSortIcon('userRole.level')}
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Access & Security
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('accountStatus')}
              >
                <div className="flex items-center justify-center">
                  Status
                  {getSortIcon('accountStatus')}
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.userCode}</div>
                  <div className="text-xs text-gray-500">{user.username}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={user.profileImage}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      {user.employeeId && <div className="text-xs text-blue-600">ID: {user.employeeId}</div>}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.department.name}</div>
                  <div className="text-sm text-gray-500">{user.designation.title}</div>
                  <div className="text-xs text-purple-600">{user.organizationalInfo.location}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    {getRoleIcon(user.userRole.level)}
                  </div>
                  <Chip
                    label={user.userRole.name}
                    size="small"
                    color={getRoleColor(user.userRole.level)}
                    variant="outlined"
                  />
                  <div className="text-xs text-gray-500 mt-1 capitalize">{user.userRole.level.replace('_', ' ')}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className={`text-xs px-2 py-1 rounded-full mb-1 ${getAccessLevelColor(user.accessLevel)}`}>
                    {user.accessLevel.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    {user.authentication.twoFactorEnabled && (
                      <div className="text-xs text-green-600 flex items-center">
                        <RxCheckCircled className="w-3 h-3 mr-1" />
                        2FA
                      </div>
                    )}
                    {user.authentication.loginMethod === 'multi_factor' && (
                      <div className="text-xs text-blue-600 flex items-center">
                        <RxLockClosed className="w-3 h-3 mr-1" />
                        MFA
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {formatNumber(user.activityLog.totalLogins)} logins
                  </div>
                  <div className="text-xs text-gray-500">
                    Last: {new Date(user.authentication.lastLogin).toLocaleDateString()}
                  </div>
                  {user.activityLog.suspiciousActivity && (
                    <div className="text-xs text-red-600 mt-1">⚠️ Suspicious Activity</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(user.accountStatus)}
                    <Chip
                      label={
                        user.accountStatus.replace('_', ' ').charAt(0).toUpperCase() +
                        user.accountStatus.replace('_', ' ').slice(1)
                      }
                      size="small"
                      color={getStatusColor(user.accountStatus)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary" title="View Details">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    {user.adminPermissions.canEdit && (
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Edit User">
                        <RxPencil1 className="w-4 h-4" />
                      </button>
                    )}
                    {user.adminPermissions.canResetPassword && (
                      <button className="p-1 hover:bg-gray-100 rounded text-blue-600" title="Reset Password">
                        <RxGear className="w-4 h-4" />
                      </button>
                    )}
                    {user.adminPermissions.canSuspend && user.accountStatus === 'active' && (
                      <button className="p-1 hover:bg-gray-100 rounded text-yellow-600" title="Suspend User">
                        <RxTimer className="w-4 h-4" />
                      </button>
                    )}
                    {user.adminPermissions.canDelete && (
                      <button className="p-1 hover:bg-gray-100 rounded text-red-600" title="Delete User">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">
              Manage system users, roles, permissions, and access controls for comprehensive security and
              administration[1][2][5]
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
              <RxPerson className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <FaShieldAlt className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Admin Users</p>
              <p className="text-2xl font-bold text-gray-900">{adminUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxCalendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Recent Logins</p>
              <p className="text-2xl font-bold text-gray-900">{recentLogins}</p>
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
              placeholder="Search users..."
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
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedUsers.length} selected</span>
              <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200">
                Suspend
              </button>
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200">
                Reset Password
              </button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200">Delete</button>
            </div>
          )}

          {/* Add User Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Add User</span>
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
          Showing {filteredUsers.length} of {totalUsers} users
        </p>
      </div>

      {/* Table Content */}
      <TableView />
    </div>
  );
};

export default UserManagement;
