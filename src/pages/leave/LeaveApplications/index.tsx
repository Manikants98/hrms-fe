import React, { useEffect, useState } from 'react';
import {
  RxBackpack,
  RxCalendar,
  RxChatBubble,
  RxCheck,
  RxCheckCircled,
  RxCross1,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxGrid,
  RxHeart,
  RxHome,
  RxInfoCircled,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxRows,
  RxStopwatch,
} from 'react-icons/rx';

const LeaveApplications: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
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

  // Mock leave applications data
  const leaveApplications = [
    {
      id: 'LA001',
      employeeId: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      designation: 'Senior Developer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      leaveType: 'Annual Leave',
      startDate: '2025-08-15',
      endDate: '2025-08-19',
      days: 5,
      reason: 'Family vacation to Europe. Planning to visit multiple countries with family.',
      status: 'Pending',
      appliedDate: '2025-07-28',
      approvedBy: null,
      approvedDate: null,
      remainingLeave: 12,
      totalLeave: 20,
      urgency: 'Normal',
    },
    {
      id: 'LA002',
      employeeId: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Human Resources',
      designation: 'HR Manager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      leaveType: 'Sick Leave',
      startDate: '2025-08-01',
      endDate: '2025-08-03',
      days: 3,
      reason: 'Medical appointment and recovery time needed.',
      status: 'Approved',
      appliedDate: '2025-07-30',
      approvedBy: 'David Wilson',
      approvedDate: '2025-07-30',
      remainingLeave: 8,
      totalLeave: 12,
      urgency: 'High',
    },
    {
      id: 'LA003',
      employeeId: 'EMP003',
      name: 'Michael Chen',
      department: 'Finance',
      designation: 'Financial Analyst',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      leaveType: 'Personal Leave',
      startDate: '2025-08-20',
      endDate: '2025-08-22',
      days: 3,
      reason: 'Personal matters that require immediate attention.',
      status: 'Rejected',
      appliedDate: '2025-07-25',
      approvedBy: 'David Wilson',
      approvedDate: '2025-07-26',
      remainingLeave: 5,
      totalLeave: 10,
      urgency: 'Normal',
    },
    {
      id: 'LA004',
      employeeId: 'EMP004',
      name: 'Emily Davis',
      department: 'Marketing',
      designation: 'Marketing Specialist',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      leaveType: 'Maternity Leave',
      startDate: '2025-09-01',
      endDate: '2025-11-30',
      days: 90,
      reason: 'Maternity leave for childbirth and initial childcare.',
      status: 'Approved',
      appliedDate: '2025-07-15',
      approvedBy: 'David Wilson',
      approvedDate: '2025-07-16',
      remainingLeave: 90,
      totalLeave: 90,
      urgency: 'High',
    },
    {
      id: 'LA005',
      employeeId: 'EMP005',
      name: 'David Wilson',
      department: 'Operations',
      designation: 'Operations Manager',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      leaveType: 'Annual Leave',
      startDate: '2025-08-10',
      endDate: '2025-08-14',
      days: 5,
      reason: 'Annual family trip to the mountains.',
      status: 'Pending',
      appliedDate: '2025-07-29',
      approvedBy: null,
      approvedDate: null,
      remainingLeave: 15,
      totalLeave: 25,
      urgency: 'Normal',
    },
    {
      id: 'LA006',
      employeeId: 'EMP006',
      name: 'Lisa Anderson',
      department: 'Engineering',
      designation: 'UX Designer',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      leaveType: 'Sick Leave',
      startDate: '2025-08-05',
      endDate: '2025-08-07',
      days: 3,
      reason: 'Flu symptoms and need for rest and recovery.',
      status: 'Approved',
      appliedDate: '2025-08-04',
      approvedBy: 'David Wilson',
      approvedDate: '2025-08-04',
      remainingLeave: 6,
      totalLeave: 12,
      urgency: 'High',
    },
  ];

  const filteredApplications = leaveApplications.filter((application) => {
    const matchesSearch =
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.reason.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <RxCheckCircled className="w-4 h-4" />;
      case 'Rejected':
        return <RxCrossCircled className="w-4 h-4" />;
      case 'Pending':
        return <RxStopwatch className="w-4 h-4" />;
      default:
        return <RxStopwatch className="w-4 h-4" />;
    }
  };

  const getLeaveTypeIcon = (leaveType: string) => {
    switch (leaveType) {
      case 'Annual Leave':
        return <RxBackpack className="w-4 h-4 text-blue-500" />;
      case 'Sick Leave':
        return <RxHeart className="w-4 h-4 text-red-500" />;
      case 'Personal Leave':
        return <RxPerson className="w-4 h-4 text-purple-500" />;
      case 'Maternity Leave':
        return <RxHome className="w-4 h-4 text-pink-500" />;
      default:
        return <RxCalendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'text-red-500';
      case 'Normal':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  // Calculate statistics
  const totalApplications = leaveApplications.length;
  const pendingApplications = leaveApplications.filter((app) => app.status === 'Pending').length;
  const approvedApplications = leaveApplications.filter((app) => app.status === 'Approved').length;
  const rejectedApplications = leaveApplications.filter((app) => app.status === 'Rejected').length;

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {filteredApplications.map((application) => (
        <div
          key={application.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-6">
            {/* Header with avatar and status */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={application.avatar}
                  alt={application.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{application.name}</h3>
                  <p className="text-sm text-gray-500">{application.employeeId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(application.status)}
                <button className="p-1 hover:bg-gray-100 rounded">
                  <RxDotsVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Department and Designation */}
            <div className="mb-4">
              <Chip
                label={application.department}
                size="small"
                className="mb-2"
                variant="outlined"
              />
              <p className="text-sm text-gray-700 font-medium">{application.designation}</p>
            </div>

            {/* Leave Type and Duration */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                {getLeaveTypeIcon(application.leaveType)}
                <span className="text-sm font-medium text-gray-700">{application.leaveType}</span>
                <div className={`ml-auto ${getUrgencyColor(application.urgency)}`}>
                  <RxInfoCircled className="w-4 h-4" />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center justify-between mb-1">
                  <span>Duration:</span>
                  <span className="font-medium">{application.days} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dates:</span>
                  <span className="font-medium text-xs">
                    {new Date(application.startDate).toLocaleDateString()} -{' '}
                    {new Date(application.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Reason</h4>
              <p className="text-sm text-gray-600 line-clamp-3">{application.reason}</p>
            </div>

            {/* Leave Balance */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Leave Balance</span>
                <span className="text-sm font-medium text-gray-900">
                  {application.remainingLeave}/{application.totalLeave}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{
                    width: `${(application.remainingLeave / application.totalLeave) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Application Details */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Applied:</span>
                <span className="font-medium">
                  {new Date(application.appliedDate).toLocaleDateString()}
                </span>
              </div>
              {application.approvedBy && (
                <div className="flex items-center justify-between">
                  <span>Approved by:</span>
                  <span className="font-medium">{application.approvedBy}</span>
                </div>
              )}
            </div>

            {/* Status and Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <Chip
                label={application.status}
                size="small"
                color={getStatusColor(application.status)}
                variant="filled"
                className="text-xs"
              />
              <div className="flex items-center space-x-2">
                {application.status === 'Pending' && (
                  <>
                    <button className="p-1 hover:bg-green-100 rounded text-green-600">
                      <RxCheck className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-red-100 rounded text-red-600">
                      <RxCross1 className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button className="p-1 hover:bg-gray-100 rounded text-primary">
                  <RxEyeOpen className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const TableView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={application.avatar}
                      alt={application.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{application.name}</div>
                      <div className="text-sm text-gray-500">{application.department}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getLeaveTypeIcon(application.leaveType)}
                    <span className="text-sm text-gray-900">{application.leaveType}</span>
                    <div className={getUrgencyColor(application.urgency)}>
                      <RxInfoCircled className="w-3 h-3" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{application.days} days</div>
                  <div className="text-xs text-gray-500">
                    Balance: {application.remainingLeave}/{application.totalLeave}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(application.startDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    to {new Date(application.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(application.status)}
                    <Chip
                      label={application.status}
                      size="small"
                      color={getStatusColor(application.status)}
                      variant="filled"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </div>
                  {application.approvedBy && (
                    <div className="text-xs text-gray-500">by {application.approvedBy}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {application.status === 'Pending' && (
                      <>
                        <button className="p-1 hover:bg-green-100 rounded text-green-600">
                          <RxCheck className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-red-100 rounded text-red-600">
                          <RxCross1 className="w-4 h-4" />
                        </button>
                      </>
                    )}
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
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Leave Applications</h1>
            <p className="text-gray-600">Manage and approve employee leave requests</p>
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
              <RxChatBubble className="w-6 h-6 text-blue-600" />
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
              <RxStopwatch className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{approvedApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <RxCrossCircled className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{rejectedApplications}</p>
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
              placeholder="Search applications..."
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
          {/* Add New Application */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-primary-400 rounded-lg hover:bg-primary-50 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>New Application</span>
          </button>

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
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredApplications.length} of {leaveApplications.length} leave applications
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default LeaveApplications;
