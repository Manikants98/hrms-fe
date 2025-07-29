import React from 'react';
import {
  RxArrowRight,
  RxBarChart,
  RxBell,
  RxCalendar,
  RxCheckCircled,
  RxTarget,
  RxTimer,
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';

const EmployeeDashboard: React.FC = () => {
  // Mock employee data
  const employeeInfo = {
    name: 'Sarah Johnson',
    id: 'EMP-001247',
    department: 'Marketing',
    position: 'Senior Marketing Specialist',
    manager: 'Michael Davis',
    avatar: 'SJ',
  };

  const stats = [
    {
      title: 'Hours This Week',
      value: '38.5',
      change: '+2.5h',
      trend: 'up',
      icon: <RxTimer className="w-6 h-6" />,
      color: 'blue',
    },
    {
      title: 'Tasks Completed',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: <RxCheckCircled className="w-6 h-6" />,
      color: 'green',
    },
    {
      title: 'Leave Balance',
      value: '18',
      change: '5 pending',
      trend: 'stable',
      icon: <RxCalendar className="w-6 h-6" />,
      color: 'orange',
    },
    {
      title: 'Goal Progress',
      value: '73%',
      change: '+12%',
      trend: 'up',
      icon: <RxTarget className="w-6 h-6" />,
      color: 'purple',
    },
  ];

  const myTasks = [
    {
      id: 1,
      title: 'Complete Q1 Marketing Report',
      dueDate: '2024-01-16',
      priority: 'high',
      status: 'in-progress',
      progress: 75,
    },
    {
      id: 2,
      title: 'Review Campaign Analytics',
      dueDate: '2024-01-15',
      priority: 'medium',
      status: 'pending',
      progress: 0,
    },
    {
      id: 3,
      title: 'Team Meeting Preparation',
      dueDate: '2024-01-14',
      priority: 'low',
      status: 'completed',
      progress: 100,
    },
    {
      id: 4,
      title: 'Update Client Presentation',
      dueDate: '2024-01-17',
      priority: 'medium',
      status: 'in-progress',
      progress: 45,
    },
  ];

  const leaveRequests = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2024-01-22',
      endDate: '2024-01-26',
      days: 5,
      status: 'pending',
      reason: 'Family vacation',
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2024-01-10',
      endDate: '2024-01-10',
      days: 1,
      status: 'approved',
      reason: 'Medical appointment',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Stand-up',
      time: '9:00 AM',
      type: 'meeting',
      location: 'Conference Room A',
    },
    {
      id: 2,
      title: 'Client Presentation',
      time: '2:00 PM',
      type: 'presentation',
      location: 'Virtual',
    },
    {
      id: 3,
      title: 'Marketing Workshop',
      time: '4:00 PM',
      type: 'training',
      location: 'Training Room B',
    },
  ];

  const notifications = [
    {
      id: 1,
      message: 'Your leave request has been approved',
      time: '30 minutes ago',
      type: 'success',
      read: false,
    },
    {
      id: 2,
      message: 'New policy update available',
      time: '2 hours ago',
      type: 'info',
      read: false,
    },
    {
      id: 3,
      message: 'Payroll processed successfully',
      time: '1 day ago',
      type: 'info',
      read: true,
    },
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'approved':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {employeeInfo.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Here's your workspace overview for today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <RxBell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </div>
          <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium">
              {employeeInfo.avatar}
            </div>
            <div>
              <p className="font-medium text-gray-900">{employeeInfo.name}</p>
              <p className="text-sm text-gray-600">{employeeInfo.position}</p>
            </div>
          </div>
        </div>
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
                  <span className="text-sm text-gray-500">this week</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* My Tasks */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <RxArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {myTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-primary-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.status === 'completed'
                        ? 'bg-green-500'
                        : task.status === 'in-progress'
                          ? 'bg-blue-500'
                          : 'bg-gray-400'
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900 font-medium">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            task.progress === 100
                              ? 'bg-green-500'
                              : task.progress > 50
                                ? 'bg-blue-500'
                                : 'bg-yellow-500'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Schedule</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-primary-50"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-medium">
                  {event.time.split(':')[0]}
                  <span className="text-xs">{event.time.includes('AM') ? 'AM' : 'PM'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                      event.type === 'meeting'
                        ? 'bg-blue-50 text-blue-600'
                        : event.type === 'presentation'
                          ? 'bg-purple-50 text-purple-600'
                          : 'bg-green-50 text-green-600'
                    }`}
                  >
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
            View Full Calendar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leave Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Leave Requests</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors">
              Request Leave
            </button>
          </div>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-primary-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <RxCalendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{request.type}</h3>
                    <p className="text-sm text-gray-600">
                      {request.startDate} - {request.endDate} ({request.days} days)
                    </p>
                    <p className="text-xs text-gray-500">{request.reason}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Mark All Read
            </button>
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 p-3 rounded-lg ${
                  !notification.read
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'hover:bg-primary-50'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}
                  >
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
