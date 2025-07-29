import React, { useEffect, useState } from 'react';
import { RiCurrencyFill } from 'react-icons/ri';
import {
  RxCheckCircled,
  RxClock,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxMagnifyingGlass,
  RxPencil1,
  RxPerson,
  RxTimer,
  RxUpdate,
} from 'react-icons/rx';

interface SalaryComponent {
  id: string;
  name: string;
  type: 'earning' | 'deduction';
  category: 'basic' | 'allowance' | 'bonus' | 'tax' | 'contribution' | 'other';
  amount: number;
  isPercentage: boolean;
  isStatutory: boolean;
}

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  avatar: string;
  department: string;
  designation: string;
  joinDate: string;
  basicSalary: number;
  ctc: number;
  grossPay: number;
  netPay: number;
  totalEarnings: number;
  totalDeductions: number;
  status: 'processed' | 'pending' | 'hold' | 'error';
  lastProcessed: string;
  salaryComponents: SalaryComponent[];
}

const SalaryProcessing: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [processingMode, setProcessingMode] = useState<'preview' | 'process'>('preview');

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

  // Mock salary processing data
  const employees: Employee[] = [
    {
      id: 'EMP001',
      name: 'John Smith',
      employeeId: 'E001',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      designation: 'Senior Developer',
      joinDate: '2022-01-15',
      basicSalary: 50000,
      ctc: 720000,
      grossPay: 58500,
      netPay: 45230,
      totalEarnings: 58500,
      totalDeductions: 13270,
      status: 'processed',
      lastProcessed: '2025-07-30',
      salaryComponents: [
        {
          id: 'C001',
          name: 'Basic Salary',
          type: 'earning',
          category: 'basic',
          amount: 50000,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C002',
          name: 'HRA',
          type: 'earning',
          category: 'allowance',
          amount: 25000,
          isPercentage: true,
          isStatutory: false,
        },
        {
          id: 'C003',
          name: 'Special Allowance',
          type: 'earning',
          category: 'allowance',
          amount: 8500,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C004',
          name: 'PF Contribution',
          type: 'deduction',
          category: 'contribution',
          amount: 6000,
          isPercentage: false,
          isStatutory: true,
        },
        {
          id: 'C005',
          name: 'Income Tax',
          type: 'deduction',
          category: 'tax',
          amount: 7270,
          isPercentage: false,
          isStatutory: true,
        },
      ],
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      employeeId: 'E002',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      department: 'Human Resources',
      designation: 'HR Manager',
      joinDate: '2021-03-10',
      basicSalary: 75000,
      ctc: 1200000,
      grossPay: 95000,
      netPay: 72650,
      totalEarnings: 95000,
      totalDeductions: 22350,
      status: 'pending',
      lastProcessed: '2025-06-30',
      salaryComponents: [
        {
          id: 'C001',
          name: 'Basic Salary',
          type: 'earning',
          category: 'basic',
          amount: 75000,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C002',
          name: 'HRA',
          type: 'earning',
          category: 'allowance',
          amount: 37500,
          isPercentage: true,
          isStatutory: false,
        },
        {
          id: 'C003',
          name: 'Performance Bonus',
          type: 'earning',
          category: 'bonus',
          amount: 7500,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C004',
          name: 'PF Contribution',
          type: 'deduction',
          category: 'contribution',
          amount: 9000,
          isPercentage: false,
          isStatutory: true,
        },
        {
          id: 'C005',
          name: 'Income Tax',
          type: 'deduction',
          category: 'tax',
          amount: 13350,
          isPercentage: false,
          isStatutory: true,
        },
      ],
    },
    {
      id: 'EMP003',
      name: 'Michael Chen',
      employeeId: 'E003',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      department: 'Finance',
      designation: 'Financial Analyst',
      joinDate: '2023-06-01',
      basicSalary: 45000,
      ctc: 600000,
      grossPay: 52500,
      netPay: 41180,
      totalEarnings: 52500,
      totalDeductions: 11320,
      status: 'processed',
      lastProcessed: '2025-07-30',
      salaryComponents: [
        {
          id: 'C001',
          name: 'Basic Salary',
          type: 'earning',
          category: 'basic',
          amount: 45000,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C002',
          name: 'HRA',
          type: 'earning',
          category: 'allowance',
          amount: 22500,
          isPercentage: true,
          isStatutory: false,
        },
        {
          id: 'C003',
          name: 'Transport Allowance',
          type: 'earning',
          category: 'allowance',
          amount: 2000,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C004',
          name: 'PF Contribution',
          type: 'deduction',
          category: 'contribution',
          amount: 5400,
          isPercentage: false,
          isStatutory: true,
        },
        {
          id: 'C005',
          name: 'Income Tax',
          type: 'deduction',
          category: 'tax',
          amount: 5920,
          isPercentage: false,
          isStatutory: true,
        },
      ],
    },
    {
      id: 'EMP004',
      name: 'Emily Davis',
      employeeId: 'E004',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      department: 'Marketing',
      designation: 'Marketing Specialist',
      joinDate: '2022-09-15',
      basicSalary: 40000,
      ctc: 550000,
      grossPay: 47000,
      netPay: 36890,
      totalEarnings: 47000,
      totalDeductions: 10110,
      status: 'hold',
      lastProcessed: '2025-06-30',
      salaryComponents: [
        {
          id: 'C001',
          name: 'Basic Salary',
          type: 'earning',
          category: 'basic',
          amount: 40000,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C002',
          name: 'HRA',
          type: 'earning',
          category: 'allowance',
          amount: 20000,
          isPercentage: true,
          isStatutory: false,
        },
        {
          id: 'C003',
          name: 'Medical Allowance',
          type: 'earning',
          category: 'allowance',
          amount: 2000,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C004',
          name: 'PF Contribution',
          type: 'deduction',
          category: 'contribution',
          amount: 4800,
          isPercentage: false,
          isStatutory: true,
        },
        {
          id: 'C005',
          name: 'Income Tax',
          type: 'deduction',
          category: 'tax',
          amount: 5310,
          isPercentage: false,
          isStatutory: true,
        },
      ],
    },
    {
      id: 'EMP005',
      name: 'David Wilson',
      employeeId: 'E005',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      department: 'Operations',
      designation: 'Operations Manager',
      joinDate: '2020-11-20',
      basicSalary: 65000,
      ctc: 900000,
      grossPay: 78000,
      netPay: 59280,
      totalEarnings: 78000,
      totalDeductions: 18720,
      status: 'error',
      lastProcessed: '2025-07-29',
      salaryComponents: [
        {
          id: 'C001',
          name: 'Basic Salary',
          type: 'earning',
          category: 'basic',
          amount: 65000,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C002',
          name: 'HRA',
          type: 'earning',
          category: 'allowance',
          amount: 32500,
          isPercentage: true,
          isStatutory: false,
        },
        {
          id: 'C003',
          name: 'Leadership Allowance',
          type: 'earning',
          category: 'allowance',
          amount: 5000,
          isPercentage: false,
          isStatutory: false,
        },
        {
          id: 'C004',
          name: 'PF Contribution',
          type: 'deduction',
          category: 'contribution',
          amount: 7800,
          isPercentage: false,
          isStatutory: true,
        },
        {
          id: 'C005',
          name: 'Income Tax',
          type: 'deduction',
          category: 'tax',
          amount: 10920,
          isPercentage: false,
          isStatutory: true,
        },
      ],
    },
  ];

  const departments = ['all', ...Array.from(new Set(employees.map((emp) => emp.department)))];
  const statuses = ['all', 'processed', 'pending', 'hold', 'error'];
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

  // Filter employees
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'hold':
        return 'primary';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'hold':
        return <RxClock className="w-4 h-4 text-blue-500" />;
      case 'error':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  // Calculate statistics
  const totalEmployees = employees.length;
  const processedCount = employees.filter((e) => e.status === 'processed').length;
  const pendingCount = employees.filter((e) => e.status === 'pending').length;
  const totalPayroll = employees.reduce((sum, emp) => sum + emp.netPay, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Salary Processing</h1>
            <p className="text-gray-600">Process and manage employee salary payments</p>
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
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Processed</p>
              <p className="text-2xl font-bold text-gray-900">{processedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxTimer className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RiCurrencyFill className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalPayroll.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payroll Period</h3>
          <div className="flex items-center space-x-2">
            <Chip
              label={processingMode === 'preview' ? 'Preview Mode' : 'Processing Mode'}
              color={processingMode === 'preview' ? 'primary' : 'warning'}
              size="small"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value={2025}>2025</option>
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Processing Mode</label>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setProcessingMode('preview')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  processingMode === 'preview'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setProcessingMode('process')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  processingMode === 'process'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Process
              </button>
            </div>
          </div>

          <div className="flex items-end">
            <button
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors flex items-center justify-center space-x-2"
              disabled={processingMode === 'preview'}
            >
              <RxUpdate className="w-4 h-4" />
              <span>Run Payroll</span>
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
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Generate Payslips */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-primary-400 rounded-lg hover:bg-primary-50 transition-colors">
            <RxFileText className="w-4 h-4" />
            <span>Generate Payslips</span>
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
          Showing {filteredEmployees.length} of {employees.length} employees
          {departmentFilter !== 'all' && ` in ${departmentFilter}`}
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
          {` for ${months[selectedMonth]} ${selectedYear}`}
        </p>
      </div>

      {/* Salary Processing Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Pay
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Processed
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
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">
                          {employee.employeeId} • {employee.department}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-bold text-gray-900">
                      ₹{employee.basicSalary.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      CTC: ₹{employee.ctc.toLocaleString()}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-bold text-gray-900">
                      ₹{employee.grossPay.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Earnings: ₹{employee.totalEarnings.toLocaleString()}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-bold text-red-600">
                      ₹{employee.totalDeductions.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Tax + PF + Others</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-bold text-green-600">
                      ₹{employee.netPay.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Take Home</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {getStatusIcon(employee.status)}
                      <Chip
                        label={employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        size="small"
                        color={getStatusColor(employee.status)}
                        variant="filled"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">
                      {new Date(employee.lastProcessed).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.floor(
                        (currentTime.getTime() - new Date(employee.lastProcessed).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days ago
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded text-primary">
                        <RxEyeOpen className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                        <RxPencil1 className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                        <RxFileText className="w-4 h-4" />
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

export default SalaryProcessing;
