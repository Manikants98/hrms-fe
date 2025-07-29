import React, { useEffect, useState } from 'react';
import {
  RxBackpack,
  RxCalendar,
  RxCheckCircled,
  RxClock,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxHeart,
  RxHome,
  RxMagnifyingGlass,
  RxMinus,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';

const LeaveBalance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      <span
        className={`inline-flex items-center rounded-full font-medium ${getColorClasses()} ${className}`}
      >
        {label}
      </span>
    );
  };

  // Mock leave balance data
  const leaveBalanceData = [
    {
      id: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      designation: 'Senior Developer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      joinDate: '2022-01-15',
      leaveTypes: {
        annual: { allocated: 20, used: 8, remaining: 12, pending: 0 },
        sick: { allocated: 12, used: 4, remaining: 8, pending: 0 },
        personal: { allocated: 10, used: 3, remaining: 7, pending: 0 },
        maternity: { allocated: 0, used: 0, remaining: 0, pending: 0 },
      },
      totalAllocated: 42,
      totalUsed: 15,
      totalRemaining: 27,
      totalPending: 0,
      usageRate: 35.7,
      lastLeave: '2025-07-15',
      trend: 'normal',
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Human Resources',
      designation: 'HR Manager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      joinDate: '2021-03-10',
      leaveTypes: {
        annual: { allocated: 25, used: 15, remaining: 10, pending: 0 },
        sick: { allocated: 12, used: 8, remaining: 4, pending: 0 },
        personal: { allocated: 10, used: 6, remaining: 4, pending: 0 },
        maternity: { allocated: 0, used: 0, remaining: 0, pending: 0 },
      },
      totalAllocated: 47,
      totalUsed: 29,
      totalRemaining: 18,
      totalPending: 0,
      usageRate: 61.7,
      lastLeave: '2025-07-20',
      trend: 'high',
    },
    {
      id: 'EMP003',
      name: 'Michael Chen',
      department: 'Finance',
      designation: 'Financial Analyst',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      joinDate: '2023-06-01',
      leaveTypes: {
        annual: { allocated: 15, used: 3, remaining: 12, pending: 0 },
        sick: { allocated: 12, used: 2, remaining: 10, pending: 0 },
        personal: { allocated: 8, used: 1, remaining: 7, pending: 0 },
        maternity: { allocated: 0, used: 0, remaining: 0, pending: 0 },
      },
      totalAllocated: 35,
      totalUsed: 6,
      totalRemaining: 29,
      totalPending: 0,
      usageRate: 17.1,
      lastLeave: '2025-06-10',
      trend: 'low',
    },
    {
      id: 'EMP004',
      name: 'Emily Davis',
      department: 'Marketing',
      designation: 'Marketing Specialist',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      joinDate: '2022-09-15',
      leaveTypes: {
        annual: { allocated: 20, used: 12, remaining: 8, pending: 5 },
        sick: { allocated: 12, used: 6, remaining: 6, pending: 3 },
        personal: { allocated: 10, used: 4, remaining: 6, pending: 0 },
        maternity: { allocated: 90, used: 0, remaining: 90, pending: 90 },
      },
      totalAllocated: 132,
      totalUsed: 22,
      totalRemaining: 110,
      totalPending: 98,
      usageRate: 16.7,
      lastLeave: '2025-07-25',
      trend: 'pending',
    },
    {
      id: 'EMP005',
      name: 'David Wilson',
      department: 'Operations',
      designation: 'Operations Manager',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      joinDate: '2020-11-20',
      leaveTypes: {
        annual: { allocated: 25, used: 10, remaining: 15, pending: 5 },
        sick: { allocated: 12, used: 3, remaining: 9, pending: 0 },
        personal: { allocated: 12, used: 5, remaining: 7, pending: 0 },
        maternity: { allocated: 0, used: 0, remaining: 0, pending: 0 },
      },
      totalAllocated: 49,
      totalUsed: 18,
      totalRemaining: 31,
      totalPending: 5,
      usageRate: 36.7,
      lastLeave: '2025-07-28',
      trend: 'normal',
    },
    {
      id: 'EMP006',
      name: 'Lisa Anderson',
      department: 'Engineering',
      designation: 'UX Designer',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      joinDate: '2023-02-01',
      leaveTypes: {
        annual: { allocated: 18, used: 5, remaining: 13, pending: 3 },
        sick: { allocated: 12, used: 7, remaining: 5, pending: 3 },
        personal: { allocated: 8, used: 2, remaining: 6, pending: 0 },
        maternity: { allocated: 0, used: 0, remaining: 0, pending: 0 },
      },
      totalAllocated: 38,
      totalUsed: 14,
      totalRemaining: 24,
      totalPending: 6,
      usageRate: 36.8,
      lastLeave: '2025-08-04',
      trend: 'normal',
    },
  ];

  const departments = [
    'all',
    ...Array.from(new Set(leaveBalanceData.map((emp) => emp.department))),
  ];

  const filteredEmployees = leaveBalanceData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'all' || employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const getLeaveTypeIcon = (leaveType: string) => {
    switch (leaveType) {
      case 'annual':
        return <RxBackpack className="w-4 h-4 text-blue-500" />;
      case 'sick':
        return <RxHeart className="w-4 h-4 text-red-500" />;
      case 'personal':
        return <RxPerson className="w-4 h-4 text-purple-500" />;
      case 'maternity':
        return <RxHome className="w-4 h-4 text-pink-500" />;
      default:
        return <RxCalendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'high':
        return <RxTriangleUp className="w-4 h-4 text-red-500" />;
      case 'low':
        return <RxTriangleDown className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <RxClock className="w-4 h-4 text-yellow-500" />;
      case 'normal':
      default:
        return <RxMinus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUsageRateColor = (rate: number) => {
    if (rate >= 80) return 'error';
    if (rate >= 60) return 'warning';
    if (rate >= 40) return 'primary';
    return 'success';
  };

  // Calculate statistics
  const totalEmployees = leaveBalanceData.length;
  const totalAllocatedDays = leaveBalanceData.reduce((sum, emp) => sum + emp.totalAllocated, 0);
  const totalUsedDays = leaveBalanceData.reduce((sum, emp) => sum + emp.totalUsed, 0);
  const totalPendingDays = leaveBalanceData.reduce((sum, emp) => sum + emp.totalPending, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Leave Balance</h1>
            <p className="text-gray-600">Track and manage employee leave balances</p>
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
              <RxPerson className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCalendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Allocated</p>
              <p className="text-2xl font-bold text-gray-900">{totalAllocatedDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <RxCheckCircled className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Used</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsedDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxClock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{totalPendingDays}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Department Filter */}
          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selector */}
          <div className="relative">
            <RxCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none pl-10 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees..."
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
          Showing {filteredEmployees.length} of {leaveBalanceData.length} employees (
          {departmentFilter === 'all' ? 'All departments' : departmentFilter}) for {selectedYear}
        </p>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 whitespace-nowrap">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual Leave
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sick Leave
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Personal Leave
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maternity Leave
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage Rate
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Leave
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                          <span>{employee.name}</span>
                          {getTrendIcon(employee.trend)}
                        </div>
                        <div className="text-sm text-gray-500">{employee.department}</div>
                      </div>
                    </div>
                  </td>

                  {/* Annual Leave */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {getLeaveTypeIcon('annual')}
                      <span className="text-sm font-medium text-gray-900">
                        {employee.leaveTypes.annual.remaining}/
                        {employee.leaveTypes.annual.allocated}
                      </span>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mx-auto">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{
                          width: `${(employee.leaveTypes.annual.used / employee.leaveTypes.annual.allocated) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Used: {employee.leaveTypes.annual.used}
                      {employee.leaveTypes.annual.pending > 0 &&
                        ` | Pending: ${employee.leaveTypes.annual.pending}`}
                    </div>
                  </td>

                  {/* Sick Leave */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {getLeaveTypeIcon('sick')}
                      <span className="text-sm font-medium text-gray-900">
                        {employee.leaveTypes.sick.remaining}/{employee.leaveTypes.sick.allocated}
                      </span>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mx-auto">
                      <div
                        className="h-2 rounded-full bg-red-500"
                        style={{
                          width: `${(employee.leaveTypes.sick.used / employee.leaveTypes.sick.allocated) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Used: {employee.leaveTypes.sick.used}
                      {employee.leaveTypes.sick.pending > 0 &&
                        ` | Pending: ${employee.leaveTypes.sick.pending}`}
                    </div>
                  </td>

                  {/* Personal Leave */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {getLeaveTypeIcon('personal')}
                      <span className="text-sm font-medium text-gray-900">
                        {employee.leaveTypes.personal.remaining}/
                        {employee.leaveTypes.personal.allocated}
                      </span>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mx-auto">
                      <div
                        className="h-2 rounded-full bg-purple-500"
                        style={{
                          width: `${(employee.leaveTypes.personal.used / employee.leaveTypes.personal.allocated) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Used: {employee.leaveTypes.personal.used}
                      {employee.leaveTypes.personal.pending > 0 &&
                        ` | Pending: ${employee.leaveTypes.personal.pending}`}
                    </div>
                  </td>

                  {/* Maternity Leave */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {employee.leaveTypes.maternity.allocated > 0 ? (
                      <>
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          {getLeaveTypeIcon('maternity')}
                          <span className="text-sm font-medium text-gray-900">
                            {employee.leaveTypes.maternity.remaining}/
                            {employee.leaveTypes.maternity.allocated}
                          </span>
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mx-auto">
                          <div
                            className="h-2 rounded-full bg-pink-500"
                            style={{
                              width: `${(employee.leaveTypes.maternity.used / employee.leaveTypes.maternity.allocated) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Used: {employee.leaveTypes.maternity.used}
                          {employee.leaveTypes.maternity.pending > 0 &&
                            ` | Pending: ${employee.leaveTypes.maternity.pending}`}
                        </div>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </td>

                  {/* Usage Rate */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-sm font-bold text-gray-900">
                        {employee.usageRate.toFixed(1)}%
                      </span>
                    </div>
                    <Chip
                      label={`${employee.totalUsed}/${employee.totalAllocated}`}
                      size="small"
                      color={getUsageRateColor(employee.usageRate)}
                      variant="filled"
                      className="text-xs"
                    />
                    {employee.totalPending > 0 && (
                      <div className="text-xs text-yellow-600 mt-1">
                        Pending: {employee.totalPending}
                      </div>
                    )}
                  </td>

                  {/* Last Leave */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">
                      {new Date(employee.lastLeave).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.floor(
                        (currentTime.getTime() - new Date(employee.lastLeave).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days ago
                    </div>
                  </td>

                  {/* Actions */}
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

export default LeaveBalance;
