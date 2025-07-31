import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';
import {
  RxArchive,
  RxBackpack,
  RxCheckCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxGear,
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

interface Department {
  id: string;
  departmentCode: string;
  departmentName: string;
  description: string;
  headOfDepartment: {
    id: string;
    name: string;
    avatar: string;
    email: string;
  };
  location: string;
  costCenter: string;
  budget: number;
  employeeCount: number;
  parentDepartment?: string;
  subDepartments: string[];
  status: 'active' | 'inactive' | 'archived';
  establishedDate: string;
  lastModified: string;
  modifiedBy: string;
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canArchive: boolean;
  };
  businessUnit: string;
  emailDomain: string;
  phoneExtension: string;
  address: {
    building: string;
    floor: string;
    office: string;
  };
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
  tags: string[];
}

const DepartmentsMaster: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('departmentName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock departments data
  const departments: Department[] = [
    {
      id: 'DEPT001',
      departmentCode: 'ENG',
      departmentName: 'Engineering',
      description: 'Software development, system architecture, and technical operations',
      headOfDepartment: {
        id: 'HOD001',
        name: 'Rajesh Kumar',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        email: 'rajesh.kumar@company.com',
      },
      location: 'Mumbai',
      costCenter: 'CC001',
      budget: 15000000,
      employeeCount: 487,
      parentDepartment: undefined,
      subDepartments: ['DEPT011', 'DEPT012', 'DEPT013'],
      status: 'active',
      establishedDate: '2018-03-15',
      lastModified: '2025-07-28T14:30:00Z',
      modifiedBy: 'Admin User',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: true,
      },
      businessUnit: 'Technology',
      emailDomain: 'eng.company.com',
      phoneExtension: '1000',
      address: {
        building: 'Tech Tower',
        floor: '5th Floor',
        office: 'East Wing',
      },
      workingHours: {
        start: '09:00',
        end: '18:00',
        timezone: 'IST',
      },
      tags: ['technology', 'development', 'core'],
    },
    {
      id: 'DEPT002',
      departmentCode: 'MKT',
      departmentName: 'Marketing',
      description: 'Brand management, digital marketing, and customer acquisition',
      headOfDepartment: {
        id: 'HOD002',
        name: 'Sunita Mehta',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        email: 'sunita.mehta@company.com',
      },
      location: 'Bangalore',
      costCenter: 'CC002',
      budget: 8500000,
      employeeCount: 234,
      parentDepartment: undefined,
      subDepartments: ['DEPT021', 'DEPT022'],
      status: 'active',
      establishedDate: '2018-06-20',
      lastModified: '2025-07-25T10:15:00Z',
      modifiedBy: 'HR Manager',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      businessUnit: 'Business',
      emailDomain: 'marketing.company.com',
      phoneExtension: '2000',
      address: {
        building: 'Corporate Plaza',
        floor: '3rd Floor',
        office: 'North Wing',
      },
      workingHours: {
        start: '09:30',
        end: '18:30',
        timezone: 'IST',
      },
      tags: ['marketing', 'business', 'customer'],
    },
    {
      id: 'DEPT003',
      departmentCode: 'FIN',
      departmentName: 'Finance',
      description: 'Financial planning, accounting, budgeting, and audit management',
      headOfDepartment: {
        id: 'HOD003',
        name: 'Deepika Iyer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        email: 'deepika.iyer@company.com',
      },
      location: 'Delhi',
      costCenter: 'CC003',
      budget: 5600000,
      employeeCount: 156,
      parentDepartment: undefined,
      subDepartments: ['DEPT031'],
      status: 'active',
      establishedDate: '2018-01-10',
      lastModified: '2025-07-30T16:45:00Z',
      modifiedBy: 'Finance Head',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: true,
      },
      businessUnit: 'Corporate',
      emailDomain: 'finance.company.com',
      phoneExtension: '3000',
      address: {
        building: 'Finance Centre',
        floor: '2nd Floor',
        office: 'Central Block',
      },
      workingHours: {
        start: '09:00',
        end: '17:30',
        timezone: 'IST',
      },
      tags: ['finance', 'accounting', 'compliance'],
    },
    {
      id: 'DEPT004',
      departmentCode: 'OPS',
      departmentName: 'Operations',
      description: 'Business operations, process optimization, and logistics management',
      headOfDepartment: {
        id: 'HOD004',
        name: 'Vikram Joshi',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        email: 'vikram.joshi@company.com',
      },
      location: 'Mumbai',
      costCenter: 'CC004',
      budget: 7200000,
      employeeCount: 198,
      parentDepartment: undefined,
      subDepartments: ['DEPT041', 'DEPT042'],
      status: 'active',
      establishedDate: '2019-05-12',
      lastModified: '2025-07-26T11:20:00Z',
      modifiedBy: 'Operations Head',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      businessUnit: 'Operations',
      emailDomain: 'ops.company.com',
      phoneExtension: '4000',
      address: {
        building: 'Operations Hub',
        floor: '1st Floor',
        office: 'West Wing',
      },
      workingHours: {
        start: '08:30',
        end: '17:30',
        timezone: 'IST',
      },
      tags: ['operations', 'logistics', 'processes'],
    },
    {
      id: 'DEPT005',
      departmentCode: 'HR',
      departmentName: 'Human Resources',
      description: 'Talent acquisition, employee relations, and organizational development',
      headOfDepartment: {
        id: 'HOD005',
        name: 'Anita Verma',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        email: 'anita.verma@company.com',
      },
      location: 'Bangalore',
      costCenter: 'CC005',
      budget: 4800000,
      employeeCount: 89,
      parentDepartment: undefined,
      subDepartments: [],
      status: 'active',
      establishedDate: '2018-02-28',
      lastModified: '2025-07-29T09:10:00Z',
      modifiedBy: 'CHRO',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: false,
      },
      businessUnit: 'Corporate',
      emailDomain: 'hr.company.com',
      phoneExtension: '5000',
      address: {
        building: 'Corporate Plaza',
        floor: '4th Floor',
        office: 'South Wing',
      },
      workingHours: {
        start: '09:00',
        end: '18:00',
        timezone: 'IST',
      },
      tags: ['hr', 'people', 'talent'],
    },
    {
      id: 'DEPT006',
      departmentCode: 'SLS',
      departmentName: 'Sales',
      description: 'Revenue generation, client relationships, and market expansion',
      headOfDepartment: {
        id: 'HOD006',
        name: 'Rohit Sharma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        email: 'rohit.sharma@company.com',
      },
      location: 'Delhi',
      costCenter: 'CC006',
      budget: 9200000,
      employeeCount: 83,
      parentDepartment: undefined,
      subDepartments: [],
      status: 'active',
      establishedDate: '2019-08-15',
      lastModified: '2025-07-27T13:55:00Z',
      modifiedBy: 'Sales Director',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      businessUnit: 'Business',
      emailDomain: 'sales.company.com',
      phoneExtension: '6000',
      address: {
        building: 'Business Centre',
        floor: '6th Floor',
        office: 'Premium Suite',
      },
      workingHours: {
        start: '09:00',
        end: '19:00',
        timezone: 'IST',
      },
      tags: ['sales', 'revenue', 'client'],
    },
    {
      id: 'DEPT007',
      departmentCode: 'R&D',
      departmentName: 'Research & Development',
      description: 'Innovation, product research, and experimental development projects',
      headOfDepartment: {
        id: 'HOD007',
        name: 'Dr. Kavya Nair',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        email: 'kavya.nair@company.com',
      },
      location: 'Hyderabad',
      costCenter: 'CC007',
      budget: 12000000,
      employeeCount: 67,
      parentDepartment: 'DEPT001',
      subDepartments: [],
      status: 'active',
      establishedDate: '2020-11-03',
      lastModified: '2025-07-31T08:30:00Z',
      modifiedBy: 'CTO',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      businessUnit: 'Technology',
      emailDomain: 'rd.company.com',
      phoneExtension: '7000',
      address: {
        building: 'Innovation Lab',
        floor: '7th Floor',
        office: 'Research Wing',
      },
      workingHours: {
        start: '10:00',
        end: '19:00',
        timezone: 'IST',
      },
      tags: ['research', 'innovation', 'development'],
    },
    {
      id: 'DEPT008',
      departmentCode: 'IT',
      departmentName: 'Information Technology',
      description: 'IT infrastructure, system administration, and technical support',
      headOfDepartment: {
        id: 'HOD008',
        name: 'Arjun Reddy',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        email: 'arjun.reddy@company.com',
      },
      location: 'Chennai',
      costCenter: 'CC008',
      budget: 6800000,
      employeeCount: 45,
      parentDepartment: undefined,
      subDepartments: [],
      status: 'inactive',
      establishedDate: '2019-04-22',
      lastModified: '2025-07-20T15:40:00Z',
      modifiedBy: 'CIO',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: true,
      },
      businessUnit: 'Technology',
      emailDomain: 'it.company.com',
      phoneExtension: '8000',
      address: {
        building: 'IT Complex',
        floor: '3rd Floor',
        office: 'Server Room Adjacent',
      },
      workingHours: {
        start: '08:00',
        end: '17:00',
        timezone: 'IST',
      },
      tags: ['it', 'infrastructure', 'support'],
    },
  ];

  // Filter departments
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.departmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.headOfDepartment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Sort departments
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    const aValue = a[sortField as keyof Department];
    const bValue = b[sortField as keyof Department];

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
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
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
      setSelectedDepartments(sortedDepartments.map((dept) => dept.id));
    } else {
      setSelectedDepartments([]);
    }
  };

  const handleSelectDepartment = (deptId: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, deptId]);
    } else {
      setSelectedDepartments(selectedDepartments.filter((id) => id !== deptId));
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
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter((d) => d.status === 'active').length;
  const totalEmployees = departments.reduce((sum, d) => sum + d.employeeCount, 0);
  const totalBudget = departments.reduce((sum, d) => sum + d.budget, 0);

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
                  checked={selectedDepartments.length === sortedDepartments.length && sortedDepartments.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('departmentCode')}
              >
                <div className="flex whitespace-nowrap items-center">Code {getSortIcon('departmentCode')}</div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('departmentName')}
              >
                <div className="flex whitespace-nowrap items-center">Department {getSortIcon('departmentName')}</div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Head of Department
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center justify-center">
                  Location
                  {getSortIcon('location')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('employeeCount')}
              >
                <div className="flex items-center justify-center">
                  Employees
                  {getSortIcon('employeeCount')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('budget')}
              >
                <div className="flex items-center justify-center">
                  Budget
                  {getSortIcon('budget')}
                </div>
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
            {sortedDepartments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept.id)}
                    onChange={(e) => handleSelectDepartment(dept.id, e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {dept.departmentCode}
                    {dept.costCenter}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{dept.departmentName}</span>
                  <span className="text-sm text-gray-500 line-clamp-1">{dept.description}</span>
                  <span className="text-xs text-blue-600 mt-1">{dept.businessUnit}</span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={dept.headOfDepartment.avatar}
                      alt={dept.headOfDepartment.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{dept.headOfDepartment.name}</div>
                      <div className="text-sm text-gray-500">{dept.headOfDepartment.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{dept.location}</div>
                  <div className="text-xs text-gray-500">{dept.address.building}</div>
                  <div className="text-xs text-gray-500">{dept.address.floor}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-lg font-bold text-gray-900">{formatNumber(dept.employeeCount)}</div>
                  {dept.subDepartments.length > 0 && (
                    <div className="text-xs text-blue-600">{dept.subDepartments.length} sub-depts</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(dept.budget)}</div>
                  <div className="text-xs text-gray-500">Annual Budget</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(dept.status)}
                    <Chip
                      label={dept.status.charAt(0).toUpperCase() + dept.status.slice(1)}
                      size="small"
                      color={getStatusColor(dept.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary" title="View Details">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    {dept.permissions.canEdit && (
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Edit Department">
                        <RxPencil1 className="w-4 h-4" />
                      </button>
                    )}
                    {dept.permissions.canArchive && (
                      <button className="p-1 hover:bg-gray-100 rounded text-yellow-600" title="Archive Department">
                        <RxArchive className="w-4 h-4" />
                      </button>
                    )}
                    {dept.permissions.canDelete && (
                      <button className="p-1 hover:bg-gray-100 rounded text-red-600" title="Delete Department">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Departments Master</h1>
            <p className="text-gray-600">Manage organizational departments, hierarchies, and administrative settings</p>
          </div>
          <Clock />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <RxBackpack className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Departments</p>
              <p className="text-2xl font-bold text-gray-900">{totalDepartments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Departments</p>
              <p className="text-2xl font-bold text-gray-900">{activeDepartments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxPerson className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalEmployees)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <FaCalculator className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
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
              placeholder="Search departments..."
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
          {selectedDepartments.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedDepartments.length} selected</span>
              <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200">
                Archive
              </button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200">Delete</button>
            </div>
          )}

          {/* Add Department Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Add Department</span>
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
          Showing {filteredDepartments.length} of {totalDepartments} departments
        </p>
      </div>

      {/* Table Content */}
      <TableView />
    </div>
  );
};

export default DepartmentsMaster;
