import React, { useEffect, useState } from 'react';
import {
  RxBackpack,
  RxCalendar,
  RxCheck,
  RxCheckCircled,
  RxCross2,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxHeart,
  RxHome,
  RxMagnifyingGlass,
  RxPencil1,
  RxPerson,
  RxPlus,
} from 'react-icons/rx';

interface LeavePolicy {
  id: string;
  name: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'bereavement' | 'emergency';
  entitlement: number;
  carryForward: number;
  maxCarryForward: number;
  probationPeriod: number;
  accrualRate: string;
  encashment: boolean;
  isActive: boolean;
  applicableFrom: string;
  description: string;
  rules: string[];
}

const LeavePolicies: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [policyTypeFilter, setPolicyTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

  // Mock leave policies data
  const leavePolicies: LeavePolicy[] = [
    {
      id: 'POL001',
      name: 'Annual Leave Policy',
      type: 'annual',
      entitlement: 25,
      carryForward: 5,
      maxCarryForward: 10,
      probationPeriod: 90,
      accrualRate: '2.08 days per month',
      encashment: true,
      isActive: true,
      applicableFrom: '2025-01-01',
      description: 'Annual vacation leave for all full-time employees',
      rules: [
        'Minimum 3 days advance notice required',
        'Maximum 10 consecutive days without approval',
        'Blackout dates apply during peak seasons',
        'Unused leave can be carried forward up to 5 days',
      ],
    },
    {
      id: 'POL002',
      name: 'Sick Leave Policy',
      type: 'sick',
      entitlement: 12,
      carryForward: 3,
      maxCarryForward: 6,
      probationPeriod: 0,
      accrualRate: '1 day per month',
      encashment: false,
      isActive: true,
      applicableFrom: '2025-01-01',
      description: 'Medical leave for illness and health appointments',
      rules: [
        'Medical certificate required for 3+ consecutive days',
        'Immediate notification required for emergency sick leave',
        'Can be used for family medical emergencies',
        'Unused leave carries forward annually',
      ],
    },
    {
      id: 'POL003',
      name: 'Maternity Leave Policy',
      type: 'maternity',
      entitlement: 180,
      carryForward: 0,
      maxCarryForward: 0,
      probationPeriod: 180,
      accrualRate: 'One-time allocation',
      encashment: false,
      isActive: true,
      applicableFrom: '2025-01-01',
      description: 'Maternity leave for expecting mothers',
      rules: [
        '6 months advance notice preferred',
        'Medical certification required',
        '6 weeks pre-delivery, 12 weeks post-delivery minimum',
        'Job protection guaranteed during leave period',
      ],
    },
    {
      id: 'POL004',
      name: 'Paternity Leave Policy',
      type: 'paternity',
      entitlement: 15,
      carryForward: 0,
      maxCarryForward: 0,
      probationPeriod: 90,
      accrualRate: 'One-time allocation',
      encashment: false,
      isActive: true,
      applicableFrom: '2025-01-01',
      description: 'Paternity leave for new fathers',
      rules: [
        'Must be taken within 6 months of birth/adoption',
        'Birth certificate required',
        'Can be taken intermittently',
        'Advance notice of 30 days required',
      ],
    },
    {
      id: 'POL005',
      name: 'Personal Leave Policy',
      type: 'personal',
      entitlement: 10,
      carryForward: 2,
      maxCarryForward: 5,
      probationPeriod: 60,
      accrualRate: '0.83 days per month',
      encashment: true,
      isActive: true,
      applicableFrom: '2025-01-01',
      description: 'Personal time off for individual needs',
      rules: [
        '24 hours advance notice minimum',
        'Subject to business requirements',
        'Can be taken in half-day increments',
        'Manager approval required',
      ],
    },
    {
      id: 'POL006',
      name: 'Bereavement Leave Policy',
      type: 'bereavement',
      entitlement: 5,
      carryForward: 0,
      maxCarryForward: 0,
      probationPeriod: 0,
      accrualRate: 'As needed basis',
      encashment: false,
      isActive: true,
      applicableFrom: '2025-01-01',
      description: 'Compassionate leave for family loss',
      rules: [
        'Immediate family: 5 days, Extended family: 3 days',
        'Death certificate required',
        'Additional unpaid leave available if needed',
        'No advance notice required for emergencies',
      ],
    },
  ];

  const policyTypes = [
    'all',
    'annual',
    'sick',
    'personal',
    'maternity',
    'paternity',
    'bereavement',
  ];
  const statuses = ['all', 'active', 'inactive'];

  // Filter policies
  const filteredPolicies = leavePolicies.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = policyTypeFilter === 'all' || policy.type === policyTypeFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && policy.isActive) ||
      (statusFilter === 'inactive' && !policy.isActive);

    return matchesSearch && matchesType && matchesStatus;
  });

  const getLeaveTypeIcon = (leaveType: string) => {
    switch (leaveType) {
      case 'annual':
        return <RxBackpack className="w-5 h-5 text-blue-500" />;
      case 'sick':
        return <RxHeart className="w-5 h-5 text-red-500" />;
      case 'personal':
        return <RxPerson className="w-5 h-5 text-purple-500" />;
      case 'maternity':
      case 'paternity':
        return <RxHome className="w-5 h-5 text-pink-500" />;
      case 'bereavement':
        return <RxHeart className="w-5 h-5 text-gray-500" />;
      default:
        return <RxFileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getLeaveTypeColor = (leaveType: string) => {
    switch (leaveType) {
      case 'annual':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sick':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'personal':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'maternity':
      case 'paternity':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'bereavement':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate statistics
  const totalPolicies = leavePolicies.length;
  const activePolicies = leavePolicies.filter((p) => p.isActive).length;
  const totalEntitlement = leavePolicies.reduce((sum, p) => sum + p.entitlement, 0);
  const policiesWithEncashment = leavePolicies.filter((p) => p.encashment).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Leave Policies</h1>
            <p className="text-gray-600">Manage and configure employee leave policies</p>
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
              <p className="text-sm font-medium text-gray-500">Total Policies</p>
              <p className="text-2xl font-bold text-gray-900">{totalPolicies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Policies</p>
              <p className="text-2xl font-bold text-gray-900">{activePolicies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxCalendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Entitlements</p>
              <p className="text-2xl font-bold text-gray-900">{totalEntitlement}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxGear className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Encashment Enabled</p>
              <p className="text-2xl font-bold text-gray-900">{policiesWithEncashment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Policy Type Filter */}
          <div className="relative">
            <select
              value={policyTypeFilter}
              onChange={(e) => setPolicyTypeFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {policyTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'All Policy Types'
                    : type.charAt(0).toUpperCase() + type.slice(1)}
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
                  {status === 'all'
                    ? 'All Statuses'
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Add Policy */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-primary-400 rounded-lg hover:bg-primary-50 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Add Policy</span>
          </button>

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
          Showing {filteredPolicies.length} of {leavePolicies.length} policies
          {policyTypeFilter !== 'all' && ` for ${policyTypeFilter} leave`}
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {filteredPolicies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getLeaveTypeIcon(policy.type)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{policy.name}</h3>
                  <p className="text-sm text-gray-500">{policy.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Chip
                  label={policy.isActive ? 'Active' : 'Inactive'}
                  color={policy.isActive ? 'success' : 'error'}
                  size="small"
                />
                <button className="p-1 hover:bg-gray-100 rounded">
                  <RxDotsVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entitlement
                </p>
                <p className="text-xl font-bold text-gray-900">{policy.entitlement} days</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carry Forward
                </p>
                <p className="text-xl font-bold text-gray-900">{policy.carryForward} days</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Probation
                </p>
                <p className="text-xl font-bold text-gray-900">{policy.probationPeriod} days</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Encashment
                </p>
                <div className="flex items-center space-x-1">
                  {policy.encashment ? (
                    <RxCheck className="w-5 h-5 text-green-500" />
                  ) : (
                    <RxCross2 className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-sm font-medium text-gray-900">
                    {policy.encashment ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Accrual Rate
              </p>
              <p className="text-sm text-gray-900">{policy.accrualRate}</p>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Key Rules
              </p>
              <ul className="space-y-1">
                {policy.rules.slice(0, 2).map((rule, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {rule}
                  </li>
                ))}
                {policy.rules.length > 2 && (
                  <li className="text-sm text-gray-500">+{policy.rules.length - 2} more rules</li>
                )}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Applicable from: {new Date(policy.applicableFrom).toLocaleDateString()}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded text-primary">
                  <RxEyeOpen className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                  <RxPencil1 className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                  <RxGear className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Policies Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Policy Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 whitespace-nowrap">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Policy Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entitlement
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carry Forward
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Probation
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Encashment
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
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getLeaveTypeIcon(policy.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{policy.name}</div>
                        <div className="text-sm text-gray-500">{policy.description}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLeaveTypeColor(policy.type)}`}
                    >
                      {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-bold text-gray-900">{policy.entitlement}</div>
                    <div className="text-xs text-gray-500">days</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-bold text-gray-900">{policy.carryForward}</div>
                    <div className="text-xs text-gray-500">max {policy.maxCarryForward}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-bold text-gray-900">{policy.probationPeriod}</div>
                    <div className="text-xs text-gray-500">days</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {policy.encashment ? (
                      <RxCheck className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <RxCross2 className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Chip
                      label={policy.isActive ? 'Active' : 'Inactive'}
                      color={policy.isActive ? 'success' : 'error'}
                      size="small"
                    />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded text-primary">
                        <RxEyeOpen className="w-4 h-4" />
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
    </div>
  );
};

export default LeavePolicies;
