import React, { useEffect, useState } from 'react';
import {
  RxCalendar,
  RxCheckCircled,
  RxClock,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxGrid,
  RxLaptop,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPause,
  RxPencil1,
  RxPlay,
  RxPlus,
  RxRows,
  RxStopwatch,
  RxTarget,
} from 'react-icons/rx';

const Timesheet: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday.toISOString().split('T')[0];
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<{ [key: string]: number }>({});

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Update active timers
      if (activeTimer) {
        setTimerSeconds((prev) => ({
          ...prev,
          [activeTimer]: (prev[activeTimer] || 0) + 1,
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTimer]);

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

  // Mock timesheet data
  const timesheetData = [
    {
      id: 'TS001',
      employeeId: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      designation: 'Senior Developer',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      weeklyHours: '42h 30m',
      targetHours: '40h 00m',
      overtime: '2h 30m',
      status: 'Approved',
      projectHours: {
        'Project Alpha': '25h 15m',
        'Project Beta': '12h 45m',
        Meeting: '4h 30m',
      },
      dailyHours: {
        monday: '8h 30m',
        tuesday: '8h 15m',
        wednesday: '8h 45m',
        thursday: '8h 00m',
        friday: '9h 00m',
        saturday: '0h 00m',
        sunday: '0h 00m',
      },
      currentTask: 'Bug fixes for Alpha module',
      isActive: false,
    },
    {
      id: 'TS002',
      employeeId: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Human Resources',
      designation: 'HR Manager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      weeklyHours: '40h 00m',
      targetHours: '40h 00m',
      overtime: '0h 00m',
      status: 'Submitted',
      projectHours: {
        'HR Operations': '28h 00m',
        Recruitment: '8h 00m',
        Training: '4h 00m',
      },
      dailyHours: {
        monday: '8h 00m',
        tuesday: '8h 00m',
        wednesday: '8h 00m',
        thursday: '8h 00m',
        friday: '8h 00m',
        saturday: '0h 00m',
        sunday: '0h 00m',
      },
      currentTask: 'Employee onboarding documentation',
      isActive: true,
    },
    {
      id: 'TS003',
      employeeId: 'EMP003',
      name: 'Michael Chen',
      department: 'Finance',
      designation: 'Financial Analyst',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      weeklyHours: '38h 15m',
      targetHours: '40h 00m',
      overtime: '0h 00m',
      status: 'Draft',
      projectHours: {
        'Budget Planning': '20h 30m',
        'Financial Reports': '12h 45m',
        'Audit Support': '5h 00m',
      },
      dailyHours: {
        monday: '7h 30m',
        tuesday: '8h 00m',
        wednesday: '7h 45m',
        thursday: '8h 00m',
        friday: '7h 00m',
        saturday: '0h 00m',
        sunday: '0h 00m',
      },
      currentTask: 'Q4 budget analysis',
      isActive: false,
    },
    {
      id: 'TS004',
      employeeId: 'EMP004',
      name: 'Emily Davis',
      department: 'Marketing',
      designation: 'Marketing Specialist',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      weeklyHours: '44h 20m',
      targetHours: '40h 00m',
      overtime: '4h 20m',
      status: 'Approved',
      projectHours: {
        'Campaign Launch': '30h 00m',
        'Content Creation': '10h 20m',
        Analytics: '4h 00m',
      },
      dailyHours: {
        monday: '9h 00m',
        tuesday: '8h 30m',
        wednesday: '9h 15m',
        thursday: '8h 45m',
        friday: '8h 50m',
        saturday: '0h 00m',
        sunday: '0h 00m',
      },
      currentTask: 'Social media campaign setup',
      isActive: false,
    },
    {
      id: 'TS005',
      employeeId: 'EMP005',
      name: 'David Wilson',
      department: 'Operations',
      designation: 'Operations Manager',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      weeklyHours: '41h 45m',
      targetHours: '40h 00m',
      overtime: '1h 45m',
      status: 'Submitted',
      projectHours: {
        'Process Optimization': '25h 30m',
        'Team Management': '12h 15m',
        'Client Meetings': '4h 00m',
      },
      dailyHours: {
        monday: '8h 15m',
        tuesday: '8h 30m',
        wednesday: '8h 00m',
        thursday: '8h 30m',
        friday: '8h 30m',
        saturday: '0h 00m',
        sunday: '0h 00m',
      },
      currentTask: 'Weekly operations review',
      isActive: false,
    },
    {
      id: 'TS006',
      employeeId: 'EMP006',
      name: 'Lisa Anderson',
      department: 'Engineering',
      designation: 'UX Designer',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      weeklyHours: '39h 10m',
      targetHours: '40h 00m',
      overtime: '0h 00m',
      status: 'Draft',
      projectHours: {
        'UI Redesign': '22h 30m',
        'User Research': '10h 40m',
        'Design System': '6h 00m',
      },
      dailyHours: {
        monday: '8h 00m',
        tuesday: '7h 45m',
        wednesday: '8h 15m',
        thursday: '7h 30m',
        friday: '7h 40m',
        saturday: '0h 00m',
        sunday: '0h 00m',
      },
      currentTask: 'Mobile app wireframes',
      isActive: true,
    },
  ];

  const filteredTimesheets = timesheetData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Submitted':
        return 'warning';
      case 'Draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleTimerToggle = (timesheetId: string) => {
    if (activeTimer === timesheetId) {
      setActiveTimer(null);
    } else {
      setActiveTimer(timesheetId);
      if (!timerSeconds[timesheetId]) {
        setTimerSeconds((prev) => ({ ...prev, [timesheetId]: 0 }));
      }
    }
  };

  // Calculate statistics
  const totalEmployees = timesheetData.length;
  const totalHours = timesheetData.reduce((sum, emp) => {
    const hours = parseFloat(emp.weeklyHours.replace('h', '').replace('m', ''));
    return sum + hours;
  }, 0);
  const approvedTimesheets = timesheetData.filter((emp) => emp.status === 'Approved').length;
  const pendingTimesheets = timesheetData.filter((emp) => emp.status === 'Submitted').length;

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {filteredTimesheets.map((employee) => (
        <div
          key={employee.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-6">
            {/* Header with avatar and timer */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-500">{employee.employeeId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {employee.isActive && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
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

            {/* Current Task */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <RxTarget className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">Current Task</span>
              </div>
              <p className="text-sm text-gray-600">{employee.currentTask}</p>
              {activeTimer === employee.id && (
                <div className="mt-2 text-primary font-mono text-lg">
                  {formatTime(timerSeconds[employee.id] || 0)}
                </div>
              )}
            </div>

            {/* Weekly Hours Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Weekly Progress</span>
                <span className="text-sm font-medium text-gray-900">{employee.weeklyHours}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{
                    width: `${Math.min((parseFloat(employee.weeklyHours.replace('h', '').replace('m', '')) / 40) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0h</span>
                <span>Target: {employee.targetHours}</span>
              </div>
            </div>

            {/* Project Hours */}
            <div className="space-y-2 text-sm">
              <h4 className="font-medium text-gray-700">Project Hours</h4>
              {Object.entries(employee.projectHours).map(([project, hours]) => (
                <div key={project} className="flex items-center justify-between">
                  <span className="text-gray-600 truncate">{project}</span>
                  <span className="font-medium text-gray-900">{hours}</span>
                </div>
              ))}
            </div>

            {/* Timer Controls and Status */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleTimerToggle(employee.id)}
                  className={`p-2 rounded-full transition-colors ${
                    activeTimer === employee.id
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {activeTimer === employee.id ? (
                    <RxPause className="w-4 h-4" />
                  ) : (
                    <RxPlay className="w-4 h-4" />
                  )}
                </button>
                <Chip
                  label={employee.status}
                  size="small"
                  color={getStatusColor(employee.status)}
                  variant="filled"
                  className="text-xs"
                />
              </div>
              {employee.overtime !== '0h 00m' && (
                <Chip
                  label={`OT: ${employee.overtime}`}
                  size="small"
                  color="warning"
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
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weekly Hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overtime
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTimesheets.map((employee) => (
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
                        {employee.isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{employee.department}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {employee.currentTask}
                  </div>
                  {activeTimer === employee.id && (
                    <div className="text-primary font-mono text-sm">
                      {formatTime(timerSeconds[employee.id] || 0)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.weeklyHours}</div>
                  <div className="text-xs text-gray-500">Target: {employee.targetHours}</div>
                  <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className="h-1 rounded-full bg-primary"
                      style={{
                        width: `${Math.min((parseFloat(employee.weeklyHours.replace('h', '').replace('m', '')) / 40) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.overtime}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Chip
                    label={employee.status}
                    size="small"
                    color={getStatusColor(employee.status)}
                    variant="filled"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleTimerToggle(employee.id)}
                    className={`p-2 rounded-full transition-colors ${
                      activeTimer === employee.id
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {activeTimer === employee.id ? (
                      <RxPause className="w-4 h-4" />
                    ) : (
                      <RxPlay className="w-4 h-4" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Timesheet</h1>
            <p className="text-gray-600">Track project hours and manage timesheets</p>
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
              <RxLaptop className="w-6 h-6 text-blue-600" />
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
              <RxStopwatch className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{totalHours.toFixed(0)}h</p>
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
              <p className="text-2xl font-bold text-gray-900">{approvedTimesheets}</p>
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
              <p className="text-2xl font-bold text-gray-900">{pendingTimesheets}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Week Picker */}
          <div className="relative">
            <RxCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="week"
              value={`${new Date(selectedWeek).getFullYear()}-W${Math.ceil((new Date(selectedWeek).getDate() - new Date(selectedWeek).getDay() + 1) / 7)}`}
              onChange={(e) => {
                const [year, week] = e.target.value.split('-W');
                const firstDayOfYear = new Date(parseInt(year), 0, 1);
                const weekStart = new Date(
                  firstDayOfYear.getTime() + (parseInt(week) - 1) * 7 * 24 * 60 * 60 * 1000
                );
                setSelectedWeek(weekStart.toISOString().split('T')[0]);
              }}
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
          {/* Add New Entry */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-primary-400 rounded-lg hover:bg-primary-50 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Add Entry</span>
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
          Showing {filteredTimesheets.length} of {timesheetData.length} timesheets for week of{' '}
          {new Date(selectedWeek).toLocaleDateString()}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default Timesheet;
