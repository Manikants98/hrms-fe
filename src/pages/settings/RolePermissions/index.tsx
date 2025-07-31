import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { FaShieldAlt, FaUserShield } from 'react-icons/fa';
import {
  RxArchive,
  RxBackpack,
  RxCheckCircled,
  RxChevronDown,
  RxChevronRight,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxGear,
  RxIdCard,
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

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  category: 'read' | 'write' | 'delete' | 'admin' | 'system';
  isCore: boolean;
}

interface Role {
  id: string;
  roleCode: string;
  roleName: string;
  description: string;
  level: 'super_admin' | 'admin' | 'hr_manager' | 'manager' | 'employee' | 'guest' | 'custom';
  category: 'system' | 'departmental' | 'custom' | 'temporary';
  permissions: string[];
  userCount: number;
  isSystemRole: boolean;
  parentRole?: string;
  childRoles: string[];
  restrictions: {
    maxUsers: number;
    expiryDate?: string;
    ipRestrictions: string[];
    timeRestrictions: {
      allowedHours: string;
      allowedDays: string[];
    };
  };
  metaData: {
    createdDate: string;
    createdBy: string;
    lastModified: string;
    modifiedBy: string;
    version: string;
  };
  status: 'active' | 'inactive' | 'deprecated' | 'pending_approval';
  adminPermissions: {
    canEdit: boolean;
    canDelete: boolean;
    canClone: boolean;
    canAssignUsers: boolean;
  };
  tags: string[];
}

const RolePermissionsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('roleName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedModules, setExpandedModules] = useState<string[]>(['user_management', 'employee_management']);

  // Mock permissions data organized by modules
  const allPermissions: Permission[] = [
    // User Management Permissions
    {
      id: 'perm_001',
      name: 'View Users',
      description: 'View user profiles and basic information',
      module: 'User Management',
      category: 'read',
      isCore: true,
    },
    {
      id: 'perm_002',
      name: 'Create Users',
      description: 'Create new user accounts',
      module: 'User Management',
      category: 'write',
      isCore: true,
    },
    {
      id: 'perm_003',
      name: 'Edit Users',
      description: 'Modify user details and settings',
      module: 'User Management',
      category: 'write',
      isCore: true,
    },
    {
      id: 'perm_004',
      name: 'Delete Users',
      description: 'Remove users from the system',
      module: 'User Management',
      category: 'delete',
      isCore: true,
    },
    {
      id: 'perm_005',
      name: 'Manage User Roles',
      description: 'Assign and modify user roles',
      module: 'User Management',
      category: 'admin',
      isCore: true,
    },

    // Employee Management Permissions
    {
      id: 'perm_006',
      name: 'View Employees',
      description: 'View employee profiles and details',
      module: 'Employee Management',
      category: 'read',
      isCore: true,
    },
    {
      id: 'perm_007',
      name: 'Add Employees',
      description: 'Add new employees to the system',
      module: 'Employee Management',
      category: 'write',
      isCore: true,
    },
    {
      id: 'perm_008',
      name: 'Edit Employee Data',
      description: 'Modify employee information',
      module: 'Employee Management',
      category: 'write',
      isCore: true,
    },
    {
      id: 'perm_009',
      name: 'Terminate Employees',
      description: 'Process employee terminations',
      module: 'Employee Management',
      category: 'admin',
      isCore: true,
    },

    // Payroll Permissions
    {
      id: 'perm_010',
      name: 'View Payroll',
      description: 'View payroll information and reports',
      module: 'Payroll',
      category: 'read',
      isCore: true,
    },
    {
      id: 'perm_011',
      name: 'Process Payroll',
      description: 'Run payroll calculations and processing',
      module: 'Payroll',
      category: 'admin',
      isCore: true,
    },
    {
      id: 'perm_012',
      name: 'Approve Payroll',
      description: 'Approve processed payroll before disbursement',
      module: 'Payroll',
      category: 'admin',
      isCore: true,
    },

    // Leave Management Permissions
    {
      id: 'perm_013',
      name: 'View Leave Requests',
      description: 'View leave applications and history',
      module: 'Leave Management',
      category: 'read',
      isCore: true,
    },
    {
      id: 'perm_014',
      name: 'Apply Leave',
      description: 'Submit leave applications',
      module: 'Leave Management',
      category: 'write',
      isCore: false,
    },
    {
      id: 'perm_015',
      name: 'Approve Leave',
      description: 'Approve or reject leave requests',
      module: 'Leave Management',
      category: 'admin',
      isCore: true,
    },
    {
      id: 'perm_016',
      name: 'Manage Leave Types',
      description: 'Configure leave types and policies',
      module: 'Leave Management',
      category: 'admin',
      isCore: true,
    },

    // Reports Permissions
    {
      id: 'perm_017',
      name: 'View Reports',
      description: 'Access standard reports and analytics',
      module: 'Reports',
      category: 'read',
      isCore: true,
    },
    {
      id: 'perm_018',
      name: 'Generate Reports',
      description: 'Create and export custom reports',
      module: 'Reports',
      category: 'write',
      isCore: true,
    },
    {
      id: 'perm_019',
      name: 'Manage Report Templates',
      description: 'Create and modify report templates',
      module: 'Reports',
      category: 'admin',
      isCore: true,
    },

    // System Administration Permissions
    {
      id: 'perm_020',
      name: 'System Configuration',
      description: 'Modify system settings and configurations',
      module: 'System Administration',
      category: 'system',
      isCore: true,
    },
    {
      id: 'perm_021',
      name: 'Backup Management',
      description: 'Manage system backups and restoration',
      module: 'System Administration',
      category: 'system',
      isCore: true,
    },
    {
      id: 'perm_022',
      name: 'Audit Logs',
      description: 'View and manage system audit logs',
      module: 'System Administration',
      category: 'system',
      isCore: true,
    },
  ];

  // Mock roles data
  const roles: Role[] = [
    {
      id: 'role_001',
      roleCode: 'SUPER_ADMIN',
      roleName: 'Super Administrator',
      description: 'Full system access with all administrative privileges and system configuration rights',
      level: 'super_admin',
      category: 'system',
      permissions: allPermissions.map((p) => p.id),
      userCount: 2,
      isSystemRole: true,
      childRoles: ['role_002', 'role_003'],
      restrictions: {
        maxUsers: 5,
        ipRestrictions: ['10.0.0.0/8'],
        timeRestrictions: {
          allowedHours: '24/7',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
      },
      metaData: {
        createdDate: '2020-01-15T10:00:00Z',
        createdBy: 'System',
        lastModified: '2025-07-30T14:20:00Z',
        modifiedBy: 'Admin',
        version: '3.1',
      },
      status: 'active',
      adminPermissions: {
        canEdit: false,
        canDelete: false,
        canClone: true,
        canAssignUsers: true,
      },
      tags: ['system', 'admin', 'core'],
    },
    {
      id: 'role_002',
      roleCode: 'HR_MANAGER',
      roleName: 'HR Manager',
      description: 'Human resources management with employee lifecycle and policy administration capabilities',
      level: 'hr_manager',
      category: 'departmental',
      permissions: [
        'perm_001',
        'perm_002',
        'perm_003',
        'perm_006',
        'perm_007',
        'perm_008',
        'perm_009',
        'perm_010',
        'perm_013',
        'perm_015',
        'perm_016',
        'perm_017',
        'perm_018',
      ],
      userCount: 8,
      isSystemRole: false,
      parentRole: 'role_001',
      childRoles: ['role_004'],
      restrictions: {
        maxUsers: 15,
        ipRestrictions: [],
        timeRestrictions: {
          allowedHours: '08:00-20:00',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
      },
      metaData: {
        createdDate: '2020-03-20T11:30:00Z',
        createdBy: 'Admin',
        lastModified: '2025-07-28T11:15:00Z',
        modifiedBy: 'HR Admin',
        version: '2.3',
      },
      status: 'active',
      adminPermissions: {
        canEdit: true,
        canDelete: false,
        canClone: true,
        canAssignUsers: true,
      },
      tags: ['hr', 'manager', 'departmental'],
    },
    {
      id: 'role_003',
      roleCode: 'DEPT_MANAGER',
      roleName: 'Department Manager',
      description: 'Departmental management with team oversight and limited administrative functions',
      level: 'manager',
      category: 'departmental',
      permissions: ['perm_001', 'perm_006', 'perm_008', 'perm_013', 'perm_014', 'perm_015', 'perm_017'],
      userCount: 25,
      isSystemRole: false,
      parentRole: 'role_001',
      childRoles: ['role_005'],
      restrictions: {
        maxUsers: 50,
        ipRestrictions: [],
        timeRestrictions: {
          allowedHours: '08:00-19:00',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
      },
      metaData: {
        createdDate: '2020-05-10T09:15:00Z',
        createdBy: 'HR Admin',
        lastModified: '2025-07-25T16:30:00Z',
        modifiedBy: 'HR Manager',
        version: '1.8',
      },
      status: 'active',
      adminPermissions: {
        canEdit: true,
        canDelete: true,
        canClone: true,
        canAssignUsers: true,
      },
      tags: ['manager', 'departmental', 'leadership'],
    },
    {
      id: 'role_004',
      roleCode: 'HR_SPECIALIST',
      roleName: 'HR Specialist',
      description: 'HR operations specialist with employee management and reporting capabilities',
      level: 'employee',
      category: 'departmental',
      permissions: ['perm_001', 'perm_006', 'perm_007', 'perm_008', 'perm_013', 'perm_017'],
      userCount: 12,
      isSystemRole: false,
      parentRole: 'role_002',
      childRoles: [],
      restrictions: {
        maxUsers: 25,
        ipRestrictions: [],
        timeRestrictions: {
          allowedHours: '09:00-18:00',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
      },
      metaData: {
        createdDate: '2021-02-15T14:00:00Z',
        createdBy: 'HR Manager',
        lastModified: '2025-07-29T09:45:00Z',
        modifiedBy: 'HR Manager',
        version: '1.5',
      },
      status: 'active',
      adminPermissions: {
        canEdit: true,
        canDelete: true,
        canClone: true,
        canAssignUsers: true,
      },
      tags: ['hr', 'specialist', 'operations'],
    },
    {
      id: 'role_005',
      roleCode: 'EMPLOYEE',
      roleName: 'Employee',
      description: 'Standard employee access with self-service capabilities and basic system functions',
      level: 'employee',
      category: 'system',
      permissions: ['perm_001', 'perm_006', 'perm_013', 'perm_014', 'perm_017'],
      userCount: 1247,
      isSystemRole: true,
      parentRole: 'role_003',
      childRoles: [],
      restrictions: {
        maxUsers: 10000,
        ipRestrictions: [],
        timeRestrictions: {
          allowedHours: '24/7',
          allowedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
      },
      metaData: {
        createdDate: '2020-01-15T10:00:00Z',
        createdBy: 'System',
        lastModified: '2025-07-26T13:20:00Z',
        modifiedBy: 'HR Admin',
        version: '2.0',
      },
      status: 'active',
      adminPermissions: {
        canEdit: true,
        canDelete: false,
        canClone: true,
        canAssignUsers: true,
      },
      tags: ['employee', 'standard', 'self-service'],
    },
  ];

  // Group permissions by module
  const permissionsByModule = allPermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = [];
      }
      acc[permission.module].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  // Filter roles
  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.roleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Sort roles
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    const aValue = a[sortField as keyof Role];
    const bValue = b[sortField as keyof Role];

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
      case 'deprecated':
        return 'error';
      case 'pending_approval':
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
      case 'deprecated':
        return <RxArchive className="w-4 h-4 text-red-500" />;
      case 'pending_approval':
        return <RxGear className="w-4 h-4 text-blue-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getLevelColor = (level: string) => {
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

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'super_admin':
        return <FaShieldAlt className="w-4 h-4 text-red-500" />;
      case 'admin':
        return <RxIdCard className="w-4 h-4 text-orange-500" />;
      case 'hr_manager':
        return <FaUserShield className="w-4 h-4 text-blue-500" />;
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'read':
        return 'text-blue-600 bg-blue-100';
      case 'write':
        return 'text-green-600 bg-green-100';
      case 'delete':
        return 'text-red-600 bg-red-100';
      case 'admin':
        return 'text-purple-600 bg-purple-100';
      case 'system':
        return 'text-orange-600 bg-orange-100';
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
      setSelectedRoles(sortedRoles.map((role) => role.id));
    } else {
      setSelectedRoles([]);
    }
  };

  const handleSelectRole = (roleId: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, roleId]);
    } else {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
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

  const toggleModule = (module: string) => {
    setExpandedModules((prev) => (prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]));
  };

  const handlePermissionToggle = (roleId: string, permissionId: string, checked: boolean) => {
    // Here you would typically update the role's permissions
    console.log(`Toggle permission ${permissionId} for role ${roleId}: ${checked}`);
  };

  // Calculate statistics
  const totalRoles = roles.length;
  const activeRoles = roles.filter((r) => r.status === 'active').length;
  const systemRoles = roles.filter((r) => r.isSystemRole).length;
  const totalPermissions = allPermissions.length;

  // Roles List Component (Table)
  const RolesList = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">System Roles</h3>
            <p className="text-sm text-gray-500">Manage user roles and access levels</p>
          </div>
          <Chip
            label={`${selectedRole ? '1 role selected' : 'Select a role'}`}
            size="small"
            color={selectedRole ? 'primary' : 'default'}
            variant="outlined"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRoles.length === sortedRoles.length && sortedRoles.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('roleCode')}
              >
                <div className="flex whitespace-nowrap items-center">Code {getSortIcon('roleCode')}</div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('roleName')}
              >
                <div className="flex whitespace-nowrap items-center">Role {getSortIcon('roleName')}</div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('level')}
              >
                <div className="flex items-center justify-center">
                  Level
                  {getSortIcon('level')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('userCount')}
              >
                <div className="flex items-center justify-center">
                  Users
                  {getSortIcon('userCount')}
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
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
            {sortedRoles.map((role) => (
              <tr
                key={role.id}
                className={`hover:bg-gray-50 cursor-pointer ${selectedRole === role.id ? 'bg-blue-50 border-blue-200' : ''}`}
                onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectRole(role.id, e.target.checked);
                    }}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{role.roleCode}</div>
                  <div className="text-xs text-gray-500">v{role.metaData.version}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{role.roleName}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">{role.description}</div>
                  <div className="text-xs text-blue-600 mt-1 capitalize">{role.category}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">{getLevelIcon(role.level)}</div>
                  <Chip
                    label={role.level.replace('_', ' ').charAt(0).toUpperCase() + role.level.replace('_', ' ').slice(1)}
                    size="small"
                    color={getLevelColor(role.level)}
                    variant="outlined"
                  />
                  {role.isSystemRole && <div className="text-xs text-orange-600 mt-1">System Role</div>}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-lg font-bold text-gray-900">{formatNumber(role.userCount)}</div>
                  <div className="text-xs text-gray-500">Max: {formatNumber(role.restrictions.maxUsers)}</div>
                  {role.childRoles.length > 0 && (
                    <div className="text-xs text-blue-600">{role.childRoles.length} child roles</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{role.permissions.length} permissions</div>
                  <div className="text-xs text-gray-500">
                    {Math.round((role.permissions.length / allPermissions.length) * 100)}% coverage
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(role.status)}
                    <Chip
                      label={
                        role.status.replace('_', ' ').charAt(0).toUpperCase() + role.status.replace('_', ' ').slice(1)
                      }
                      size="small"
                      color={getStatusColor(role.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="p-1 hover:bg-gray-100 rounded text-primary"
                      title="View Details"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    {role.adminPermissions.canEdit && (
                      <button
                        className="p-1 hover:bg-gray-100 rounded text-gray-600"
                        title="Edit Role"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <RxPencil1 className="w-4 h-4" />
                      </button>
                    )}
                    {role.adminPermissions.canClone && (
                      <button
                        className="p-1 hover:bg-gray-100 rounded text-blue-600"
                        title="Clone Role"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <RxBackpack className="w-4 h-4" />
                      </button>
                    )}
                    {role.adminPermissions.canDelete && (
                      <button
                        className="p-1 hover:bg-gray-100 rounded text-red-600"
                        title="Delete Role"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <RxTrash className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      title="More Options"
                      onClick={(e) => e.stopPropagation()}
                    >
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

  // Permission Matrix Component
  const PermissionMatrix = () => {
    const selectedRoleData = selectedRole ? roles.find((r) => r.id === selectedRole) : null;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedRoleData ? `${selectedRoleData.roleName} Permissions` : 'Role Permissions'}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedRoleData
                  ? `Manage permissions for ${selectedRoleData.roleName} role`
                  : 'Select a role from the table above to manage its permissions'}
              </p>
            </div>
            {selectedRoleData && (
              <div className="flex items-center space-x-2">
                <Chip
                  label={`${selectedRoleData.permissions.length} permissions assigned`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {!selectedRoleData ? (
            <div className="text-center py-12">
              <RxIdCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Role</h3>
              <p className="text-gray-500">Click on a role from the table above to manage its permissions</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(permissionsByModule).map(([module, permissions]) => (
                <div key={module} className="border border-gray-200 rounded-lg">
                  <div
                    className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleModule(module)}
                  >
                    <div className="flex items-center space-x-3">
                      {expandedModules.includes(module) ? (
                        <RxChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <RxChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                      <h4 className="text-md font-medium text-gray-900">{module}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {permissions.filter((p) => selectedRoleData.permissions.includes(p.id)).length} /{' '}
                        {permissions.length}
                      </span>
                      <Chip label={`${permissions.length} permissions`} size="small" variant="outlined" />
                    </div>
                  </div>

                  {expandedModules.includes(module) && (
                    <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedRoleData.permissions.includes(permission.id)}
                              onChange={(e) =>
                                handlePermissionToggle(selectedRoleData.id, permission.id, e.target.checked)
                              }
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(permission.category)}`}
                                >
                                  {permission.category}
                                </span>
                                {permission.isCore && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-600">
                                    Core
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Role Permissions Management</h1>
            <p className="text-gray-600">
              Manage roles, assign permissions, and control user access across your HRMS system
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
              <FaShieldAlt className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Roles</p>
              <p className="text-2xl font-bold text-gray-900">{totalRoles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Roles</p>
              <p className="text-2xl font-bold text-gray-900">{activeRoles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxGear className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">System Roles</p>
              <p className="text-2xl font-bold text-gray-900">{systemRoles}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxIdCard className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Permissions</p>
              <p className="text-2xl font-bold text-gray-900">{totalPermissions}</p>
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
              placeholder="Search roles..."
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
          {selectedRoles.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedRoles.length} selected</span>
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200">
                Clone
              </button>
              <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200">
                Deactivate
              </button>
            </div>
          )}

          {/* Add Role Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Add Role</span>
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
          Showing {filteredRoles.length} of {totalRoles} roles • {totalPermissions} system permissions across{' '}
          {Object.keys(permissionsByModule).length} modules
        </p>
      </div>

      {/* Content - Roles Table Above, Permissions Below */}
      <div className="space-y-6">
        {/* Roles Table */}
        <RolesList />

        {/* Permissions Matrix */}
        <PermissionMatrix />
      </div>
    </div>
  );
};

export default RolePermissionsManagement;
