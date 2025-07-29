import React, { useEffect, useState } from 'react';
import { RiCurrencyFill } from 'react-icons/ri';
import {
  RxBarChart,
  RxCheckCircled,
  RxClock,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxMagnifyingGlass,
  RxMinus,
  RxPencil1,
  RxPieChart,
  RxRows,
  RxTarget,
  RxTimer,
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';

interface PayrollReport {
  id: string;
  name: string;
  type: 'summary' | 'detailed' | 'tax' | 'compliance' | 'analytics' | 'custom';
  category: 'monthly' | 'quarterly' | 'yearly' | 'adhoc';
  description: string;
  lastGenerated: string;
  generatedBy: string;
  status: 'ready' | 'generating' | 'error' | 'scheduled';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'ondemand';
  recipients: string[];
  fileSize: string;
  recordCount: number;
}

interface PayrollMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  target?: number;
  category: 'cost' | 'time' | 'accuracy' | 'compliance';
}

const PayrollReports: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
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

  // Mock payroll reports data
  const payrollReports: PayrollReport[] = [
    {
      id: 'RPT001',
      name: 'Monthly Payroll Summary',
      type: 'summary',
      category: 'monthly',
      description:
        'Comprehensive monthly payroll overview including earnings, deductions, and net pay',
      lastGenerated: '2025-07-30',
      generatedBy: 'Sarah Johnson',
      status: 'ready',
      frequency: 'monthly',
      recipients: ['hr@company.com', 'finance@company.com'],
      fileSize: '2.4 MB',
      recordCount: 156,
    },
    {
      id: 'RPT002',
      name: 'Tax Liability Report',
      type: 'tax',
      category: 'quarterly',
      description: 'Federal and state tax withholdings and employer contributions',
      lastGenerated: '2025-07-29',
      generatedBy: 'Michael Chen',
      status: 'ready',
      frequency: 'quarterly',
      recipients: ['tax@company.com', 'finance@company.com'],
      fileSize: '1.8 MB',
      recordCount: 98,
    },
    {
      id: 'RPT003',
      name: 'Department Wise Cost Analysis',
      type: 'analytics',
      category: 'monthly',
      description: 'Payroll cost breakdown by departments and cost centers',
      lastGenerated: '2025-07-28',
      generatedBy: 'Emily Davis',
      status: 'generating',
      frequency: 'monthly',
      recipients: ['managers@company.com'],
      fileSize: '3.1 MB',
      recordCount: 245,
    },
    {
      id: 'RPT004',
      name: 'Overtime Analysis Report',
      type: 'detailed',
      category: 'adhoc',
      description: 'Weekly overtime hours and costs by employee and department',
      lastGenerated: '2025-07-26',
      generatedBy: 'David Wilson',
      status: 'ready',
      frequency: 'weekly',
      recipients: ['operations@company.com'],
      fileSize: '890 KB',
      recordCount: 67,
    },
    {
      id: 'RPT005',
      name: 'Compliance Audit Report',
      type: 'compliance',
      category: 'quarterly',
      description: 'Payroll compliance check including labor law adherence',
      lastGenerated: '2025-07-15',
      generatedBy: 'Legal Team',
      status: 'error',
      frequency: 'quarterly',
      recipients: ['legal@company.com', 'compliance@company.com'],
      fileSize: '1.2 MB',
      recordCount: 178,
    },
    {
      id: 'RPT006',
      name: 'Year-End Payroll Summary',
      type: 'summary',
      category: 'yearly',
      description: 'Annual payroll summary for tax filing and audit purposes',
      lastGenerated: '2024-12-31',
      generatedBy: 'Finance Team',
      status: 'scheduled',
      frequency: 'yearly',
      recipients: ['auditors@company.com'],
      fileSize: '15.6 MB',
      recordCount: 1856,
    },
  ];

  // Mock payroll metrics data
  const payrollMetrics: PayrollMetric[] = [
    {
      id: 'M001',
      name: 'Payroll Processing Time',
      value: 4.2,
      previousValue: 5.1,
      unit: 'hours',
      trend: 'down',
      target: 4.0,
      category: 'time',
    },
    {
      id: 'M002',
      name: 'Payroll Accuracy Rate',
      value: 99.2,
      previousValue: 98.8,
      unit: '%',
      trend: 'up',
      target: 99.5,
      category: 'accuracy',
    },
    {
      id: 'M003',
      name: 'Cost Per Employee',
      value: 125,
      previousValue: 118,
      unit: '₹',
      trend: 'up',
      target: 120,
      category: 'cost',
    },
    {
      id: 'M004',
      name: 'Error Resolution Time',
      value: 2.8,
      previousValue: 3.5,
      unit: 'hours',
      trend: 'down',
      target: 2.5,
      category: 'time',
    },
    {
      id: 'M005',
      name: 'Compliance Score',
      value: 96.5,
      previousValue: 94.2,
      unit: '%',
      trend: 'up',
      target: 98.0,
      category: 'compliance',
    },
    {
      id: 'M006',
      name: 'Overtime Cost Ratio',
      value: 12.3,
      previousValue: 15.7,
      unit: '%',
      trend: 'down',
      target: 10.0,
      category: 'cost',
    },
  ];

  const reportTypes = ['all', 'summary', 'detailed', 'tax', 'compliance', 'analytics', 'custom'];
  const categories = ['all', 'monthly', 'quarterly', 'yearly', 'adhoc'];
  const statuses = ['all', 'ready', 'generating', 'error', 'scheduled'];

  // Filter reports
  const filteredReports = payrollReports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = reportTypeFilter === 'all' || report.type === reportTypeFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'success';
      case 'generating':
        return 'warning';
      case 'error':
        return 'error';
      case 'scheduled':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'generating':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'scheduled':
        return <RxClock className="w-4 h-4 text-blue-500" />;
      default:
        return <RxFileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'summary':
        return <RxBarChart className="w-5 h-5 text-blue-500" />;
      case 'detailed':
        return <RxFileText className="w-5 h-5 text-green-500" />;
      case 'tax':
        return <RiCurrencyFill className="w-5 h-5 text-purple-500" />;
      case 'compliance':
        return <RxTarget className="w-5 h-5 text-red-500" />;
      case 'analytics':
        return <RxPieChart className="w-5 h-5 text-orange-500" />;
      case 'custom':
        return <RxGear className="w-5 h-5 text-gray-500" />;
      default:
        return <RxFileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <RxTriangleDown className="w-4 h-4 text-green-500" />;
      case 'down':
        return <RxTriangleUp className="w-4 h-4 text-red-500" />;
      case 'stable':
        return <RxMinus className="w-4 h-4 text-gray-500" />;
      default:
        return <RxMinus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (metric: PayrollMetric) => {
    const isGoodTrend =
      metric.category === 'accuracy' || metric.category === 'compliance'
        ? metric.trend === 'up'
        : metric.category === 'cost' || metric.category === 'time'
          ? metric.trend === 'down'
          : metric.trend === 'stable';

    return isGoodTrend ? 'text-green-600' : 'text-red-600';
  };

  // Calculate statistics
  const totalReports = payrollReports.length;
  const readyReports = payrollReports.filter((r) => r.status === 'ready').length;
  const generatingReports = payrollReports.filter((r) => r.status === 'generating').length;
  const scheduledReports = payrollReports.filter((r) => r.status === 'scheduled').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payroll Reports</h1>
            <p className="text-gray-600">
              Generate and analyze comprehensive payroll reports and metrics
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
              <RxFileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ready Reports</p>
              <p className="text-2xl font-bold text-gray-900">{readyReports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxTimer className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Generating</p>
              <p className="text-2xl font-bold text-gray-900">{generatingReports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxClock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{scheduledReports}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Report Type Filter */}
          <div className="relative">
            <select
              value={reportTypeFilter}
              onChange={(e) => setReportTypeFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {reportTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'All Report Types'
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all'
                    ? 'All Categories'
                    : category.charAt(0).toUpperCase() + category.slice(1)}
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
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
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
          Showing {viewMode === 'table' ? filteredReports.length : payrollMetrics.length} {viewMode}
          {reportTypeFilter !== 'all' && ` of type ${reportTypeFilter}`}
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Reports View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Records
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Generated
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getReportTypeIcon(report.type)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-500">{report.description}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm text-gray-900 capitalize">{report.type}</span>
                      <div className="text-xs text-gray-500">{report.frequency}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm text-gray-900 capitalize">{report.category}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-bold text-gray-900">
                        {report.recordCount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">{report.fileSize}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {getStatusIcon(report.status)}
                        <Chip
                          label={report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          size="small"
                          color={getStatusColor(report.status)}
                          variant="filled"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {new Date(report.lastGenerated).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">by {report.generatedBy}</div>
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
      )}

      {/* Metrics View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {payrollMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{metric.category} metric</p>
                </div>
                <div className="flex items-center space-x-1">{getTrendIcon(metric.trend)}</div>
              </div>

              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {metric.unit === '%' || metric.unit === '₹' ? '' : ''}
                  {metric.value.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">{metric.unit}</span>
                {metric.target && (
                  <span className="text-xs text-gray-400">/ {metric.target} target</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Previous:</span>
                  <span className="text-xs font-medium text-gray-700">
                    {metric.previousValue.toFixed(1)} {metric.unit}
                  </span>
                </div>
                <div
                  className={`flex items-center space-x-1 text-xs font-medium ${getTrendColor(metric)}`}
                >
                  {getTrendIcon(metric.trend)}
                  <span>
                    {Math.abs(
                      ((metric.value - metric.previousValue) / metric.previousValue) * 100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>

              {metric.target && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress to Target</span>
                    <span>{((metric.value / metric.target) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metric.value >= metric.target ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PayrollReports;
