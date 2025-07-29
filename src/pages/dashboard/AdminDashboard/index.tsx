import React from 'react';
import {
  RxArrowRight,
  RxBarChart,
  RxCalendar,
  RxCheckCircled,
  RxClock,
  RxCrossCircled,
  RxDashboard,
  RxExclamationTriangle,
  RxPerson,
  RxTimer,
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';
// Using custom components instead of MUI

const HRAdminDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: 'Total Employees',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: <RxPerson className="w-6 h-6" />,
      color: 'blue',
    },
    {
      title: 'Present Today',
      value: '1,156',
      change: '92.7%',
      trend: 'stable',
      icon: <RxTimer className="w-6 h-6" />,
      color: 'green',
    },
    {
      title: 'On Leave',
      value: '47',
      change: '-8%',
      trend: 'down',
      icon: <RxCalendar className="w-6 h-6" />,
      color: 'orange',
    },
    {
      title: 'New Hires (MTD)',
      value: '23',
      change: '+35%',
      trend: 'up',
      icon: <RxTriangleUp className="w-6 h-6" />,
      color: 'purple',
    },
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'Leave Request',
      employee: 'Sarah Johnson',
      department: 'Marketing',
      date: '2024-01-15',
      status: 'pending',
      priority: 'normal',
    },
    {
      id: 2,
      type: 'Expense Claim',
      employee: 'Michael Chen',
      department: 'Engineering',
      date: '2024-01-14',
      status: 'pending',
      priority: 'high',
    },
    {
      id: 3,
      type: 'Time Off',
      employee: 'Emily Davis',
      department: 'HR',
      date: '2024-01-13',
      status: 'pending',
      priority: 'normal',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New employee onboarded',
      employee: 'David Wilson',
      department: 'Sales',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: 2,
      action: 'Leave request approved',
      employee: 'Lisa Anderson',
      department: 'Finance',
      time: '4 hours ago',
      type: 'info',
    },
    {
      id: 3,
      action: 'Performance review submitted',
      employee: 'John Smith',
      department: 'Engineering',
      time: '6 hours ago',
      type: 'warning',
    },
  ];

  const departmentStats = [
    { name: 'Engineering', employees: 324, present: 298, percentage: 92 },
    { name: 'Sales', employees: 187, present: 172, percentage: 92 },
    { name: 'Marketing', employees: 145, present: 134, percentage: 92 },
    { name: 'HR', employees: 67, present: 61, percentage: 91 },
    { name: 'Finance', employees: 98, present: 89, percentage: 91 },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <RxTriangleUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <RxTriangleDown className="w-4 h-4 text-red-500" />;
    return <RxBarChart className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening in your organization today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const colorClasses = getColorClasses(stat.color).split(' ');
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[2]}`}>
                  <div className={`${colorClasses[1]}`}>{stat.icon}</div>
                </div>
                {getTrendIcon(stat.trend)}
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === 'up'
                        ? 'text-green-600'
                        : stat.trend === 'down'
                          ? 'text-red-600'
                          : 'text-gray-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">vs last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Department Attendance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Department Attendance</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <RxArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-primary-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-600">
                      {dept.present}/{dept.employees} present
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{dept.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          dept.percentage >= 92
                            ? 'bg-green-500'
                            : dept.percentage >= 90
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${dept.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">
                    {dept.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <RxPerson className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Add New Employee</span>
              </div>
              <RxArrowRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <RxCalendar className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Process Payroll</span>
              </div>
              <RxArrowRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <RxBarChart className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">Generate Reports</span>
              </div>
              <RxArrowRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <RxDashboard className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900">System Settings</span>
              </div>
              <RxArrowRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
              {pendingApprovals.length} pending
            </span>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div
                key={approval.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-primary-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <RxClock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{approval.type}</h3>
                    <p className="text-sm text-gray-600">
                      {approval.employee} • {approval.department}
                    </p>
                    <p className="text-xs text-gray-500">{approval.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {approval.priority === 'high' && (
                    <RxExclamationTriangle className="w-4 h-4 text-red-500" />
                  )}
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <RxCheckCircled className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <RxCrossCircled className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
            View All Approvals
          </button>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {activity.employee.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.employee} • {activity.department}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success'
                      ? 'bg-green-500'
                      : activity.type === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRAdminDashboard;
