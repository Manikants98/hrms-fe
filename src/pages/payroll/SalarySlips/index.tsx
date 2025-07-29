import React, { useEffect, useState } from 'react';
import { RiCurrencyFill } from 'react-icons/ri';
import {
  RxCalendar,
  RxCheckCircled,
  RxDotsVertical,
  RxDownload,
  RxEnvelopeClosed,
  RxEyeOpen,
  RxFileText,
  RxGrid,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxRows,
  RxShare1,
  RxTimer,
} from 'react-icons/rx';

interface SalarySlip {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  designation: string;
  payPeriod: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: {
    hra: number;
    transport: number;
    medical: number;
    special: number;
  };
  grossSalary: number;
  deductions: {
    pf: number;
    tax: number;
    esi: number;
    professional: number;
  };
  totalDeductions: number;
  netSalary: number;
  status: 'generated' | 'sent' | 'downloaded' | 'pending';
  generatedDate: string;
  sentDate?: string;
  downloadCount: number;
}

const SalarySlips: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<string>(new Date().getMonth().toString());
  const [yearFilter, setYearFilter] = useState<string>(new Date().getFullYear().toString());
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

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

  // Mock salary slips data
  const salarySlips: SalarySlip[] = [
    {
      id: 'SS001',
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      designation: 'Senior Developer',
      payPeriod: 'July 2025',
      month: 'July',
      year: 2025,
      basicSalary: 50000,
      allowances: {
        hra: 25000,
        transport: 2000,
        medical: 1500,
        special: 5000,
      },
      grossSalary: 83500,
      deductions: {
        pf: 6000,
        tax: 8500,
        esi: 750,
        professional: 200,
      },
      totalDeductions: 15450,
      netSalary: 68050,
      status: 'sent',
      generatedDate: '2025-07-28',
      sentDate: '2025-07-29',
      downloadCount: 3,
    },
    {
      id: 'SS002',
      employeeId: 'EMP002',
      employeeName: 'Sarah Johnson',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      department: 'Human Resources',
      designation: 'HR Manager',
      payPeriod: 'July 2025',
      month: 'July',
      year: 2025,
      basicSalary: 75000,
      allowances: {
        hra: 37500,
        transport: 2500,
        medical: 2000,
        special: 10000,
      },
      grossSalary: 127000,
      deductions: {
        pf: 9000,
        tax: 15200,
        esi: 1270,
        professional: 500,
      },
      totalDeductions: 25970,
      netSalary: 101030,
      status: 'generated',
      generatedDate: '2025-07-30',
      downloadCount: 0,
    },
    {
      id: 'SS003',
      employeeId: 'EMP003',
      employeeName: 'Michael Chen',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      department: 'Finance',
      designation: 'Financial Analyst',
      payPeriod: 'July 2025',
      month: 'July',
      year: 2025,
      basicSalary: 45000,
      allowances: {
        hra: 22500,
        transport: 2000,
        medical: 1500,
        special: 3000,
      },
      grossSalary: 74000,
      deductions: {
        pf: 5400,
        tax: 7100,
        esi: 740,
        professional: 200,
      },
      totalDeductions: 13440,
      netSalary: 60560,
      status: 'downloaded',
      generatedDate: '2025-07-28',
      sentDate: '2025-07-29',
      downloadCount: 2,
    },
    {
      id: 'SS004',
      employeeId: 'EMP004',
      employeeName: 'Emily Davis',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      department: 'Marketing',
      designation: 'Marketing Specialist',
      payPeriod: 'July 2025',
      month: 'July',
      year: 2025,
      basicSalary: 40000,
      allowances: {
        hra: 20000,
        transport: 2000,
        medical: 1500,
        special: 2500,
      },
      grossSalary: 66000,
      deductions: {
        pf: 4800,
        tax: 5800,
        esi: 660,
        professional: 200,
      },
      totalDeductions: 11460,
      netSalary: 54540,
      status: 'sent',
      generatedDate: '2025-07-28',
      sentDate: '2025-07-29',
      downloadCount: 1,
    },
    {
      id: 'SS005',
      employeeId: 'EMP005',
      employeeName: 'David Wilson',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      department: 'Operations',
      designation: 'Operations Manager',
      payPeriod: 'July 2025',
      month: 'July',
      year: 2025,
      basicSalary: 65000,
      allowances: {
        hra: 32500,
        transport: 2500,
        medical: 2000,
        special: 8000,
      },
      grossSalary: 110000,
      deductions: {
        pf: 7800,
        tax: 12500,
        esi: 1100,
        professional: 500,
      },
      totalDeductions: 21900,
      netSalary: 88100,
      status: 'pending',
      generatedDate: '2025-07-30',
      downloadCount: 0,
    },
    {
      id: 'SS006',
      employeeId: 'EMP006',
      employeeName: 'Lisa Anderson',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      designation: 'UX Designer',
      payPeriod: 'July 2025',
      month: 'July',
      year: 2025,
      basicSalary: 48000,
      allowances: {
        hra: 24000,
        transport: 2000,
        medical: 1500,
        special: 4000,
      },
      grossSalary: 79500,
      deductions: {
        pf: 5760,
        tax: 7800,
        esi: 795,
        professional: 200,
      },
      totalDeductions: 14555,
      netSalary: 64945,
      status: 'downloaded',
      generatedDate: '2025-07-28',
      sentDate: '2025-07-29',
      downloadCount: 4,
    },
  ];

  const departments = ['all', ...Array.from(new Set(salarySlips.map((slip) => slip.department)))];
  const statuses = ['all', 'generated', 'sent', 'downloaded', 'pending'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Filter salary slips
  const filteredSlips = salarySlips.filter((slip) => {
    const matchesSearch =
      slip.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slip.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slip.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slip.designation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === 'all' || slip.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || slip.status === statusFilter;
    const matchesMonth = monthFilter === 'all' || slip.month === months[parseInt(monthFilter)];
    const matchesYear = yearFilter === 'all' || slip.year.toString() === yearFilter;

    return matchesSearch && matchesDepartment && matchesStatus && matchesMonth && matchesYear;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated':
        return 'primary';
      case 'sent':
        return 'success';
      case 'downloaded':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'generated':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      case 'sent':
        return <RxEnvelopeClosed className="w-4 h-4 text-green-500" />;
      case 'downloaded':
        return <RxDownload className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      default:
        return <RxFileText className="w-4 h-4 text-gray-500" />;
    }
  };

  // Calculate statistics
  const totalSlips = salarySlips.length;
  const generatedSlips = salarySlips.filter((s) => s.status === 'generated').length;
  const sentSlips = salarySlips.filter((s) => s.status === 'sent').length;
  const totalPayroll = salarySlips.reduce((sum, slip) => sum + slip.netSalary, 0);

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredSlips.map((slip) => (
        <div
          key={slip.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          {/* Header with employee info and status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={slip.avatar}
                alt={slip.employeeName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{slip.employeeName}</h3>
                <p className="text-sm text-gray-500">{slip.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(slip.status)}
              <button className="p-1 hover:bg-gray-100 rounded">
                <RxDotsVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Department and Designation */}
          <div className="mb-4">
            <Chip label={slip.department} size="small" className="mb-2" variant="outlined" />
            <p className="text-sm text-gray-700 font-medium">{slip.designation}</p>
          </div>

          {/* Pay Period */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <RxCalendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Pay Period</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{slip.payPeriod}</p>
          </div>

          {/* Salary Breakdown */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Gross Salary:</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{slip.grossSalary.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Deductions:</span>
              <span className="text-sm font-medium text-red-600">
                ₹{slip.totalDeductions.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-700">Net Salary:</span>
              <span className="text-lg font-bold text-green-600">
                ₹{slip.netSalary.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <Chip
                label={slip.status.charAt(0).toUpperCase() + slip.status.slice(1)}
                size="small"
                color={getStatusColor(slip.status)}
                variant="filled"
              />
              {slip.downloadCount > 0 && (
                <span className="text-xs text-gray-500">{slip.downloadCount} downloads</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxDownload className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxShare1 className="w-4 h-4" />
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
                Pay Period
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gross Salary
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Salary
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSlips.map((slip) => (
              <tr key={slip.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={slip.avatar}
                      alt={slip.employeeName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{slip.employeeName}</div>
                      <div className="text-sm text-gray-500">
                        {slip.employeeId} • {slip.department}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{slip.payPeriod}</div>
                  <div className="text-xs text-gray-500">{slip.designation}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    ₹{slip.grossSalary.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Basic: ₹{slip.basicSalary.toLocaleString()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-red-600">
                    ₹{slip.totalDeductions.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Tax + PF + Others</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-green-600">
                    ₹{slip.netSalary.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Take Home</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(slip.status)}
                    <Chip
                      label={slip.status.charAt(0).toUpperCase() + slip.status.slice(1)}
                      size="small"
                      color={getStatusColor(slip.status)}
                      variant="filled"
                    />
                  </div>
                  {slip.downloadCount > 0 && (
                    <div className="text-xs text-gray-500 mt-1">{slip.downloadCount} downloads</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">
                    {new Date(slip.generatedDate).toLocaleDateString()}
                  </div>
                  {slip.sentDate && (
                    <div className="text-xs text-gray-500">
                      Sent: {new Date(slip.sentDate).toLocaleDateString()}
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxDownload className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxShare1 className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Salary Slips</h1>
            <p className="text-gray-600">Generate, manage and distribute employee salary slips</p>
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
              <p className="text-sm font-medium text-gray-500">Total Slips</p>
              <p className="text-2xl font-bold text-gray-900">{totalSlips}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxEnvelopeClosed className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sent</p>
              <p className="text-2xl font-bold text-gray-900">{sentSlips}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxCheckCircled className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Generated</p>
              <p className="text-2xl font-bold text-gray-900">{generatedSlips}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RiCurrencyFill className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalPayroll.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Bulk Actions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors flex items-center justify-center space-x-2">
              <RxFileText className="w-4 h-4" />
              <span>Generate All</span>
            </button>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2">
              <RxEnvelopeClosed className="w-4 h-4" />
              <span>Send All</span>
            </button>
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
              placeholder="Search salary slips..."
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
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredSlips.length} of {salarySlips.length} salary slips
          {departmentFilter !== 'all' && ` in ${departmentFilter}`}
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
          {` for ${months[parseInt(monthFilter)]} ${yearFilter}`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default SalarySlips;
