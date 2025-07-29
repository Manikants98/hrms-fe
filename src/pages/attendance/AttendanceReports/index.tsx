import React, { useState, useEffect } from 'react';
import {
  RxCalendar,
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
  RxBarChart,
  RxPieChart,
  RxEyeOpen,
  RxTriangleUp,
  RxTriangleDown,
} from 'react-icons/rx';

const AttendanceReports: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [reportType] = useState<'monthly' | 'weekly' | 'daily'>('monthly');
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

  // Mock report data
  const reportData = [
    {
      id: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      designation: 'Senior Developer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      totalDays: 30,
      presentDays: 28,
      absentDays: 2,
      lateDays: 5,
      totalHours: '252h 30m',
      avgHours: '8h 25m',
      overtime: '15h 30m',
      attendanceRate: 93.3,
      trend: 'up',
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Human Resources',
      designation: 'HR Manager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      totalDays: 30,
      presentDays: 30,
      absentDays: 0,
      lateDays: 1,
      totalHours: '240h 00m',
      avgHours: '8h 00m',
      overtime: '8h 00m',
      attendanceRate: 100,
      trend: 'up',
    },
    {
      id: 'EMP003',
      name: 'Michael Chen',
      department: 'Finance',
      designation: 'Financial Analyst',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      totalDays: 30,
      presentDays: 25,
      absentDays: 5,
      lateDays: 3,
      totalHours: '195h 15m',
      avgHours: '7h 48m',
      overtime: '5h 15m',
      attendanceRate: 83.3,
      trend: 'down',
    },
    {
      id: 'EMP004',
      name: 'Emily Davis',
      department: 'Marketing',
      designation: 'Marketing Specialist',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      totalDays: 30,
      presentDays: 22,
      absentDays: 8,
      lateDays: 4,
      totalHours: '168h 45m',
      avgHours: '7h 40m',
      overtime: '2h 45m',
      attendanceRate: 73.3,
      trend: 'down',
    },
    {
      id: 'EMP005',
      name: 'David Wilson',
      department: 'Operations',
      designation: 'Operations Manager',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      totalDays: 30,
      presentDays: 29,
      absentDays: 1,
      lateDays: 2,
      totalHours: '248h 30m',
      avgHours: '8h 33m',
      overtime: '18h 30m',
      attendanceRate: 96.7,
      trend: 'up',
    },
    {
      id: 'EMP006',
      name: 'Lisa Anderson',
      department: 'Engineering',
      designation: 'UX Designer',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      totalDays: 30,
      presentDays: 26,
      absentDays: 4,
      lateDays: 7,
      totalHours: '205h 20m',
      avgHours: '7h 54m',
      overtime: '9h 20m',
      attendanceRate: 86.7,
      trend: 'up',
    },
  ];

  const filteredReports = reportData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceRateColor = (rate: number) => {
    if (rate >= 95) return 'success';
    if (rate >= 85) return 'warning';
    return 'error';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <RxTriangleUp className="w-4 h-4 text-green-500" />
    ) : (
      <RxTriangleDown className="w-4 h-4 text-red-500" />
    );
  };

  // Calculate statistics
  const totalEmployees = reportData.length;
  const avgAttendanceRate = (
    reportData.reduce((sum, emp) => sum + emp.attendanceRate, 0) / totalEmployees
  ).toFixed(1);
  const totalPresentDays = reportData.reduce((sum, emp) => sum + emp.presentDays, 0);
  const totalAbsentDays = reportData.reduce((sum, emp) => sum + emp.absentDays, 0);

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {filteredReports.map((employee) => (
        <div
          key={employee.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-6">
            {/* Header with avatar and trend */}
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
                {getTrendIcon(employee.trend)}
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

            {/* Attendance Rate */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Attendance Rate</span>
                <span className="text-lg font-bold text-gray-900">{employee.attendanceRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    employee.attendanceRate >= 95
                      ? 'bg-green-500'
                      : employee.attendanceRate >= 85
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${employee.attendanceRate}%` }}
                ></div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RxCheckCircled className="w-4 h-4 text-green-500" />
                  <span>Present:</span>
                </div>
                <span className="font-medium">{employee.presentDays} days</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RxCrossCircled className="w-4 h-4 text-red-500" />
                  <span>Absent:</span>
                </div>
                <span className="font-medium">{employee.absentDays} days</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RxQuestionMarkCircled className="w-4 h-4 text-yellow-500" />
                  <span>Late:</span>
                </div>
                <span className="font-medium">{employee.lateDays} days</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RxStopwatch className="w-4 h-4" />
                  <span>Total Hours:</span>
                </div>
                <span className="font-medium">{employee.totalHours}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <Chip
                label={`${employee.attendanceRate}%`}
                size="small"
                color={getAttendanceRateColor(employee.attendanceRate)}
                variant="filled"
                className="text-xs"
              />
              <button className="flex items-center space-x-1 text-primary hover:text-primary-600 transition-colors">
                <RxEyeOpen className="w-4 h-4" />
                <span className="text-xs">Details</span>
              </button>
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
                Attendance Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Present Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Absent Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Late Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.map((employee) => (
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
                  <div className="flex items-center space-x-3">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          employee.attendanceRate >= 95
                            ? 'bg-green-500'
                            : employee.attendanceRate >= 85
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${employee.attendanceRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {employee.attendanceRate}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <RxCheckCircled className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900">{employee.presentDays}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <RxCrossCircled className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-900">{employee.absentDays}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <RxQuestionMarkCircled className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-900">{employee.lateDays}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.totalHours}</div>
                  <div className="text-xs text-gray-500">Avg: {employee.avgHours}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getTrendIcon(employee.trend)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary">
                      <RxEyeOpen className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Reports</h1>
            <p className="text-gray-600">Analyze and track employee attendance patterns</p>
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
              <RxBarChart className="w-6 h-6 text-blue-600" />
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
              <RxPieChart className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{avgAttendanceRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Present</p>
              <p className="text-2xl font-bold text-gray-900">{totalPresentDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <RxCrossCircled className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Absent</p>
              <p className="text-2xl font-bold text-gray-900">{totalAbsentDays}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Date Range */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <RxCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={selectedDateRange.start}
                onChange={(e) =>
                  setSelectedDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
                className="pl-10 pr-4 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="relative">
              <RxCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={selectedDateRange.end}
                onChange={(e) => setSelectedDateRange((prev) => ({ ...prev, end: e.target.value }))}
                className="pl-10 pr-4 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
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
          Showing {filteredReports.length} of {reportData.length} employees for {reportType} report
          ({new Date(selectedDateRange.start).toLocaleDateString()} -{' '}
          {new Date(selectedDateRange.end).toLocaleDateString()})
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default AttendanceReports;
