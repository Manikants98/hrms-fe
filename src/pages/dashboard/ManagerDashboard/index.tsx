import React from 'react';
import {
  RxArrowRight,
  RxBarChart,
  RxCalendar,
  RxCheckCircled,
  RxClipboard,
  RxClock,
  RxCrossCircled,
  RxExclamationTriangle,
  RxPerson,
  RxTarget,
  RxTimer,
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';

const ManagerDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: 'Team Members',
      value: '28',
      change: '+2',
      trend: 'up',
      icon: <RxPerson className="w-6 h-6" />,
      color: 'primary',
    },
    {
      title: 'Active Projects',
      value: '12',
      change: '75%',
      trend: 'stable',
      icon: <RxClipboard className="w-6 h-6" />,
      color: 'green',
    },
    {
      title: 'Pending Tasks',
      value: '34',
      change: '-12%',
      trend: 'down',
      icon: <RxTimer className="w-6 h-6" />,
      color: 'orange',
    },
    {
      title: 'Team Performance',
      value: '94%',
      change: '+8%',
      trend: 'up',
      icon: <RxTarget className="w-6 h-6" />,
      color: 'purple',
    },
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'Project Budget',
      employee: 'Alex Thompson',
      project: 'Mobile App Redesign',
      date: '2024-01-15',
      status: 'pending',
      priority: 'high',
      amount: '$15,000',
    },
    {
      id: 2,
      type: 'Time Extension',
      employee: 'Maria Garcia',
      project: 'Website Migration',
      date: '2024-01-14',
      status: 'pending',
      priority: 'normal',
      amount: '2 weeks',
    },
    {
      id: 3,
      type: 'Resource Request',
      employee: 'James Wilson',
      project: 'API Development',
      date: '2024-01-13',
      status: 'pending',
      priority: 'high',
      amount: '2 developers',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Project milestone completed',
      employee: 'Sarah Kim',
      project: 'E-commerce Platform',
      time: '1 hour ago',
      type: 'success',
    },
    {
      id: 2,
      action: 'Task deadline approaching',
      employee: 'Robert Chen',
      project: 'Data Analytics',
      time: '3 hours ago',
      type: 'warning',
    },
    {
      id: 3,
      action: 'New team member assigned',
      employee: 'Emma Davis',
      project: 'Customer Portal',
      time: '5 hours ago',
      type: 'info',
    },
  ];

  const projectStats = [
    { name: 'E-commerce Platform', progress: 85, team: 8, status: 'On Track', deadline: '2024-02-15' },
    { name: 'Mobile App Redesign', progress: 62, team: 5, status: 'At Risk', deadline: '2024-01-30' },
    { name: 'API Development', progress: 90, team: 4, status: 'On Track', deadline: '2024-01-25' },
    { name: 'Website Migration', progress: 45, team: 6, status: 'Delayed', deadline: '2024-02-10' },
    { name: 'Data Analytics', progress: 78, team: 3, status: 'On Track', deadline: '2024-02-05' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      primary: 'bg-blue-500 text-blue-600 bg-primary-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <RxTriangleUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <RxTriangleDown className="w-4 h-4 text-red-500" />;
    return <RxBarChart className="w-4 h-4 text-gray-500" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'On Track') return 'text-green-600 bg-green-50';
    if (status === 'At Risk') return 'text-orange-600 bg-orange-50';
    if (status === 'Delayed') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
        <p className="text-gray-600">Track your team's progress and manage projects effectively.</p>
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
                      stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
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
        {/* Project Progress */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Project Progress</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <RxArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {projectStats.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">
                      {project.team} team members • Due {project.deadline}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <div className="w-32">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          project.progress >= 80
                            ? 'bg-green-500'
                            : project.progress >= 60
                              ? 'bg-blue-500'
                              : 'bg-orange-500'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <RxClipboard className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-900">Create New Project</span>
              </div>
              <RxArrowRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <RxPerson className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Assign Tasks</span>
              </div>
              <RxArrowRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <RxTriangleUp className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">Performance Review</span>
              </div>
              <RxArrowRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <RxCalendar className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900">Schedule Meeting</span>
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
                      {approval.employee} • {approval.project}
                    </p>
                    <p className="text-xs text-gray-500">
                      {approval.date} • {approval.amount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {approval.priority === 'high' && <RxExclamationTriangle className="w-4 h-4 text-red-500" />}
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
          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-primary-50 rounded-lg font-medium transition-colors">
            View All Approvals
          </button>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {activity.employee.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.employee} • {activity.project}
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

export default ManagerDashboard;
