import React, { useEffect, useState } from 'react';
import { RiCurrencyLine } from 'react-icons/ri';
import {
  RxBackpack,
  RxBarChart,
  RxCalendar,
  RxCheckCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxHeart,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxRows,
  RxTimer,
} from 'react-icons/rx';

interface TaxRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  designation: string;
  taxYear: number;
  taxMonth: string;
  grossSalary: number;
  taxableIncome: number;
  incomeTax: number;
  professionalTax: number;
  esi: number;
  pf: number;
  totalTax: number;
  tdsDeducted: number;
  pan: string;
  status: 'calculated' | 'filed' | 'paid' | 'pending';
  filedDate?: string;
  paidDate?: string;
  dueDate: string;
}

interface TaxSummary {
  id: string;
  taxType: 'income_tax' | 'professional_tax' | 'esi' | 'pf' | 'tds';
  name: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  status: 'current' | 'overdue' | 'paid';
  employeeCount: number;
}

const TaxManagement: React.FC = () => {
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

  // Mock tax records data
  const taxRecords: TaxRecord[] = [
    {
      id: 'TX001',
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      department: 'Engineering',
      designation: 'Senior Developer',
      taxYear: 2025,
      taxMonth: 'July',
      grossSalary: 83500,
      taxableIncome: 75000,
      incomeTax: 8500,
      professionalTax: 200,
      esi: 750,
      pf: 6000,
      totalTax: 15450,
      tdsDeducted: 8500,
      pan: 'ABCDE1234F',
      status: 'paid',
      filedDate: '2025-07-28',
      paidDate: '2025-07-30',
      dueDate: '2025-08-07',
    },
    {
      id: 'TX002',
      employeeId: 'EMP002',
      employeeName: 'Sarah Johnson',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      department: 'Human Resources',
      designation: 'HR Manager',
      taxYear: 2025,
      taxMonth: 'July',
      grossSalary: 127000,
      taxableIncome: 115000,
      incomeTax: 15200,
      professionalTax: 500,
      esi: 1270,
      pf: 9000,
      totalTax: 25970,
      tdsDeducted: 15200,
      pan: 'FGHIJ5678K',
      status: 'filed',
      filedDate: '2025-07-29',
      dueDate: '2025-08-07',
    },
    {
      id: 'TX003',
      employeeId: 'EMP003',
      employeeName: 'Michael Chen',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      department: 'Finance',
      designation: 'Financial Analyst',
      taxYear: 2025,
      taxMonth: 'July',
      grossSalary: 74000,
      taxableIncome: 68000,
      incomeTax: 7100,
      professionalTax: 200,
      esi: 740,
      pf: 5400,
      totalTax: 13440,
      tdsDeducted: 7100,
      pan: 'LMNOP9012Q',
      status: 'calculated',
      dueDate: '2025-08-07',
    },
    {
      id: 'TX004',
      employeeId: 'EMP004',
      employeeName: 'Emily Davis',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      department: 'Marketing',
      designation: 'Marketing Specialist',
      taxYear: 2025,
      taxMonth: 'July',
      grossSalary: 66000,
      taxableIncome: 60000,
      incomeTax: 5800,
      professionalTax: 200,
      esi: 660,
      pf: 4800,
      totalTax: 11460,
      tdsDeducted: 5800,
      pan: 'RSTUV3456W',
      status: 'pending',
      dueDate: '2025-08-07',
    },
    {
      id: 'TX005',
      employeeId: 'EMP005',
      employeeName: 'David Wilson',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      department: 'Operations',
      designation: 'Operations Manager',
      taxYear: 2025,
      taxMonth: 'July',
      grossSalary: 110000,
      taxableIncome: 100000,
      incomeTax: 12500,
      professionalTax: 500,
      esi: 1100,
      pf: 7800,
      totalTax: 21900,
      tdsDeducted: 12500,
      pan: 'XYZAB7890C',
      status: 'pending',
      dueDate: '2025-08-07',
    },
  ];

  // Mock tax summary data
  const taxSummaries: TaxSummary[] = [
    {
      id: 'TS001',
      taxType: 'income_tax',
      name: 'Income Tax (TDS)',
      totalAmount: 49100,
      paidAmount: 23700,
      pendingAmount: 25400,
      dueDate: '2025-08-07',
      status: 'current',
      employeeCount: 5,
    },
    {
      id: 'TS002',
      taxType: 'professional_tax',
      name: 'Professional Tax',
      totalAmount: 1600,
      paidAmount: 700,
      pendingAmount: 900,
      dueDate: '2025-08-07',
      status: 'current',
      employeeCount: 5,
    },
    {
      id: 'TS003',
      taxType: 'esi',
      name: 'Employee State Insurance',
      totalAmount: 4520,
      paidAmount: 2020,
      pendingAmount: 2500,
      dueDate: '2025-08-15',
      status: 'current',
      employeeCount: 5,
    },
    {
      id: 'TS004',
      taxType: 'pf',
      name: 'Provident Fund',
      totalAmount: 33000,
      paidAmount: 14500,
      pendingAmount: 18500,
      dueDate: '2025-08-15',
      status: 'current',
      employeeCount: 5,
    },
  ];

  const departments = [
    'all',
    ...Array.from(new Set(taxRecords.map((record) => record.department))),
  ];
  const statuses = ['all', 'calculated', 'filed', 'paid', 'pending'];
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

  // Filter tax records
  const filteredRecords = taxRecords.filter((record) => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.pan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesMonth = monthFilter === 'all' || record.taxMonth === months[parseInt(monthFilter)];
    const matchesYear = yearFilter === 'all' || record.taxYear.toString() === yearFilter;

    return matchesSearch && matchesDepartment && matchesStatus && matchesMonth && matchesYear;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'calculated':
        return 'primary';
      case 'filed':
        return 'warning';
      case 'paid':
        return 'success';
      case 'pending':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'calculated':
        return <RxBarChart className="w-4 h-4 text-blue-500" />;
      case 'filed':
        return <RxFileText className="w-4 h-4 text-yellow-500" />;
      case 'paid':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <RxTimer className="w-4 h-4 text-red-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTaxTypeIcon = (taxType: string) => {
    switch (taxType) {
      case 'income_tax':
        return <RiCurrencyLine className="w-5 h-5 text-purple-500" />;
      case 'professional_tax':
        return <RxFileText className="w-5 h-5 text-blue-500" />;
      case 'esi':
        return <RxHeart className="w-5 h-5 text-red-500" />;
      case 'pf':
        return <RxBackpack className="w-5 h-5 text-green-500" />;
      default:
        return <RxGear className="w-5 h-5 text-gray-500" />;
    }
  };

  // Calculate statistics
  const totalRecords = taxRecords.length;
  const filedRecords = taxRecords.filter((r) => r.status === 'filed').length;
  const paidRecords = taxRecords.filter((r) => r.status === 'paid').length;
  const totalTaxAmount = taxRecords.reduce((sum, record) => sum + record.totalTax, 0);

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredRecords.map((record) => (
        <div
          key={record.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          {/* Header with employee info and status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={record.avatar}
                alt={record.employeeName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                <p className="text-sm text-gray-500">{record.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(record.status)}
              <button className="p-1 hover:bg-gray-100 rounded">
                <RxDotsVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Department and Designation */}
          <div className="mb-4">
            <Chip label={record.department} size="small" className="mb-2" variant="outlined" />
            <p className="text-sm text-gray-700 font-medium">{record.designation}</p>
          </div>

          {/* Tax Period */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <RxCalendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Tax Period</span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {record.taxMonth} {record.taxYear}
            </p>
            <p className="text-xs text-gray-500">PAN: {record.pan}</p>
          </div>

          {/* Tax Breakdown */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Taxable Income:</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{record.taxableIncome.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Income Tax:</span>
              <span className="text-sm font-medium text-purple-600">
                ₹{record.incomeTax.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">PF Contribution:</span>
              <span className="text-sm font-medium text-green-600">
                ₹{record.pf.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-700">Total Tax:</span>
              <span className="text-lg font-bold text-red-600">
                ₹{record.totalTax.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Due Date */}
          <div className="mb-4 p-2 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Due Date:</span>
              <span className="text-xs font-medium text-yellow-700">
                {new Date(record.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              size="small"
              color={getStatusColor(record.status)}
              variant="filled"
            />
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxDownload className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxFileText className="w-4 h-4" />
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
                Tax Period
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taxable Income
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Income Tax
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Tax
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={record.avatar}
                      alt={record.employeeName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                      <div className="text-sm text-gray-500">
                        {record.employeeId} • PAN: {record.pan}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {record.taxMonth} {record.taxYear}
                  </div>
                  <div className="text-xs text-gray-500">{record.department}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    ₹{record.taxableIncome.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Gross: ₹{record.grossSalary.toLocaleString()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-purple-600">
                    ₹{record.incomeTax.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">TDS Deducted</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-red-600">
                    ₹{record.totalTax.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">All Taxes</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(record.status)}
                    <Chip
                      label={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      size="small"
                      color={getStatusColor(record.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">
                    {new Date(record.dueDate).toLocaleDateString()}
                  </div>
                  {record.filedDate && (
                    <div className="text-xs text-gray-500">
                      Filed: {new Date(record.filedDate).toLocaleDateString()}
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
                      <RxFileText className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Tax Management</h1>
            <p className="text-gray-600">
              Manage employee tax calculations, filings and compliance
            </p>
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
              <p className="text-sm font-medium text-gray-500">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{totalRecords}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-gray-900">{paidRecords}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxFileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Filed</p>
              <p className="text-2xl font-bold text-gray-900">{filedRecords}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RiCurrencyLine className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Tax</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalTaxAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Summary Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Summary by Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {taxSummaries.map((summary) => (
            <div
              key={summary.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getTaxTypeIcon(summary.taxType)}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{summary.name}</h3>
                    <p className="text-xs text-gray-500">{summary.employeeCount} employees</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Total Amount:</span>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{summary.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Paid:</span>
                  <span className="text-sm font-medium text-green-600">
                    ₹{summary.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Pending:</span>
                  <span className="text-sm font-medium text-red-600">
                    ₹{summary.pendingAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{
                    width: `${(summary.paidAmount / summary.totalAmount) * 100}%`,
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Due: {new Date(summary.dueDate).toLocaleDateString()}
                </span>
                <Chip
                  label={
                    summary.status === 'current'
                      ? 'Current'
                      : summary.status === 'overdue'
                        ? 'Overdue'
                        : 'Paid'
                  }
                  color={
                    summary.status === 'current'
                      ? 'primary'
                      : summary.status === 'overdue'
                        ? 'error'
                        : 'success'
                  }
                  size="small"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Processing Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Tax Processing</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Month</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax Year</label>
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
              <RxBarChart className="w-4 h-4" />
              <span>Calculate Tax</span>
            </button>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2">
              <RxFileText className="w-4 h-4" />
              <span>File Returns</span>
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
              placeholder="Search tax records..."
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
          Showing {filteredRecords.length} of {taxRecords.length} tax records
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

export default TaxManagement;
