import React, { useState, useEffect } from 'react';
import {
  RxCalendar,
  RxClock,
  RxDotsVertical,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxGrid,
  RxRows,
  RxDownload,
  RxCheckCircled,
  RxCrossCircled,
  RxQuestionMarkCircled,
  RxStopwatch,
  RxEnter,
  RxExit,
} from 'react-icons/rx';

const DailyAttendance: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
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

  // Mock attendance data
  const attendanceData = [
    {
      id: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      designation: 'Senior Developer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      status: 'Present',
      workingHours: '9h 15m',
      breakTime: '45m',
      overtime: '30m',
      location: 'Office',
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Human Resources',
      designation: 'HR Manager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      status: 'Present',
      workingHours: '9h 00m',
      breakTime: '60m',
      overtime: '0m',
      location: 'Office',
    },
    {
      id: 'EMP003',
      name: 'Michael Chen',
      department: 'Finance',
      designation: 'Financial Analyst',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      checkIn: '09:30 AM',
      checkOut: null,
      status: 'Present',
      workingHours: '7h 45m',
      breakTime: '30m',
      overtime: '0m',
      location: 'Remote',
    },
    {
      id: 'EMP004',
      name: 'Emily Davis',
      department: 'Marketing',
      designation: 'Marketing Specialist',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      checkIn: null,
      checkOut: null,
      status: 'Absent',
      workingHours: '0h 00m',
      breakTime: '0m',
      overtime: '0m',
      location: '-',
    },
    {
      id: 'EMP005',
      name: 'David Wilson',
      department: 'Operations',
      designation: 'Operations Manager',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      checkIn: '08:45 AM',
      checkOut: '05:45 PM',
      status: 'Present',
      workingHours: '9h 00m',
      breakTime: '60m',
      overtime: '0m',
      location: 'Office',
    },
    {
      id: 'EMP006',
      name: 'Lisa Anderson',
      department: 'Engineering',
      designation: 'UX Designer',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      checkIn: '10:00 AM',
      checkOut: null,
      status: 'Late',
      workingHours: '5h 15m',
      breakTime: '15m',
      overtime: '0m',
      location: 'Office',
    },
  ];

  const filteredAttendance = attendanceData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'success';
      case 'Absent':
        return 'error';
      case 'Late':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <RxCheckCircled className="w-4 h-4" />;
      case 'Absent':
        return <RxCrossCircled className="w-4 h-4" />;
      case 'Late':
        return <RxQuestionMarkCircled className="w-4 h-4" />;
      default:
        return <RxQuestionMarkCircled className="w-4 h-4" />;
    }
  };

  // Calculate statistics
  const totalEmployees = attendanceData.length;
  const presentEmployees = attendanceData.filter(
    (emp) => emp.status === 'Present' || emp.status === 'Late'
  ).length;
  const absentEmployees = attendanceData.filter((emp) => emp.status === 'Absent').length;
  const lateEmployees = attendanceData.filter((emp) => emp.status === 'Late').length;

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAttendance.map((employee) => (
        <div
          key={employee.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-6">
            {/* Header with avatar and status */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-500">{employee.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(employee.status)}
                <button className="p-1 hover:bg-gray-100 rounded">
                  <RxDotsVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Department and Designation */}
            <div className="mb-4">
              <Chip label={employee.department} size="small" className="mb-2" variant="outlined" />
              <p className="text-sm text-gray-700 font-medium">{employee.designation}</p>
            </div>

            {/* Attendance Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RxEnter className="w-4 h-4 text-green-500" />
                  <span>Check In:</span>
                </div>
                <span className="font-medium">{employee.checkIn || 'Not checked in'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RxExit className="w-4 h-4 text-red-500" />
                  <span>Check Out:</span>
                </div>
                <span className="font-medium">{employee.checkOut || 'Not checked out'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RxStopwatch className="w-4 h-4" />
                  <span>Working Hours:</span>
                </div>
                <span className="font-medium">{employee.workingHours}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Location:</span>
                <span className="font-medium">{employee.location}</span>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <Chip
                label={employee.status}
                size="small"
                color={getStatusColor(employee.status)}
                variant="filled"
                className="text-xs"
              />
              {employee.overtime !== '0m' && (
                <Chip
                  label={`OT: ${employee.overtime}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  className="text-xs"
                />
              )}
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
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Working Hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAttendance.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.department}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <RxEnter className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900">
                      {employee.checkIn || 'Not checked in'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <RxExit className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-900">
                      {employee.checkOut || 'Not checked out'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.workingHours}</div>
                  {employee.overtime !== '0m' && (
                    <div className="text-xs text-primary">OT: {employee.overtime}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(employee.status)}
                    <Chip
                      label={employee.status}
                      size="small"
                      color={getStatusColor(employee.status)}
                      variant="filled"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <RxDotsVertical className="w-4 h-4" />
                  </button>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daily Attendance</h1>
            <p className="text-gray-600">Track and manage employee attendance</p>
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
              <RxClock className="w-6 h-6 text-blue-600" />
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
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Present</p>
              <p className="text-2xl font-bold text-gray-900">{presentEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <RxCrossCircled className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Absent</p>
              <p className="text-2xl font-bold text-gray-900">{absentEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxQuestionMarkCircled className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Late</p>
              <p className="text-2xl font-bold text-gray-900">{lateEmployees}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Date Picker */}
          <div className="relative">
            <RxCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
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
          Showing {filteredAttendance.length} of {attendanceData.length} employees for{' '}
          {new Date(selectedDate).toLocaleDateString()}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default DailyAttendance;
