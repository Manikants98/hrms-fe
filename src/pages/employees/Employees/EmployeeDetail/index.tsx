import React, { useState } from 'react';
import {
  RxArrowLeft,
  RxBackpack,
  RxCalendar,
  RxDotsVertical,
  RxEnvelopeClosed,
  RxHome,
  RxMobile,
  RxPencil1,
  RxPerson,
  RxStar,
} from 'react-icons/rx';
import { useParams } from 'react-router-dom';

const EmployeeDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'timeoff' | 'documents'>(
    'overview'
  );

  // Mock employee data
  const employee = {
    id: id,
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    designation: 'Senior Developer',
    location: 'New York',
    joinDate: '2023-01-15',
    status: 'Active',
    manager: 'Sarah Johnson',
    employeeType: 'Full-time',
    workLocation: 'Hybrid',
    address: '123 Main St, New York, NY 10001',
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
    },
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    salary: '$95,000',
    birthday: '1990-06-15',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
  };

  const performanceData = {
    currentRating: 4.2,
    goals: [
      { id: 1, title: 'Complete React Migration', progress: 85, status: 'on-track' },
      { id: 2, title: 'Mentor Junior Developers', progress: 60, status: 'on-track' },
      { id: 3, title: 'API Performance Optimization', progress: 30, status: 'behind' },
    ],
    achievements: [
      { id: 1, title: 'Employee of the Month - March 2024', date: '2024-03-01' },
      { id: 2, title: 'Successfully led team project', date: '2024-01-15' },
    ],
  };

  const timeOffData = {
    totalLeave: 20,
    usedLeave: 8,
    pendingRequests: 2,
    recentRequests: [
      {
        id: 1,
        type: 'Annual Leave',
        startDate: '2024-02-15',
        endDate: '2024-02-19',
        days: 5,
        status: 'approved',
        reason: 'Family vacation',
      },
      {
        id: 2,
        type: 'Sick Leave',
        startDate: '2024-01-22',
        endDate: '2024-01-23',
        days: 2,
        status: 'approved',
        reason: 'Medical appointment',
      },
      {
        id: 3,
        type: 'Personal Leave',
        startDate: '2024-03-10',
        endDate: '2024-03-10',
        days: 1,
        status: 'pending',
        reason: 'Personal matters',
      },
    ],
  };

  const documents = [
    { id: 1, name: 'Employment Contract', type: 'PDF', uploadDate: '2023-01-15', size: '2.4 MB' },
    { id: 2, name: 'ID Verification', type: 'PDF', uploadDate: '2023-01-15', size: '1.2 MB' },
    {
      id: 3,
      name: 'Performance Review 2024',
      type: 'PDF',
      uploadDate: '2024-01-10',
      size: '856 KB',
    },
    { id: 4, name: 'Training Certificate', type: 'PDF', uploadDate: '2023-11-20', size: '1.8 MB' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'rejected':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'on-track':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'behind':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'completed':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'timeoff', label: 'Time Off' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
          <RxArrowLeft className="w-4 h-4" />
          <span>Back to Employees</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{employee.name}</h1>
                <p className="text-lg text-gray-600 mb-2">{employee.designation}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{employee.department}</span>
                  <span>•</span>
                  <span>{employee.id}</span>
                  <span>•</span>
                  <span>Joined {employee.joinDate}</span>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(employee.status.toLowerCase())}`}
                  >
                    {employee.status}
                  </span>
                  <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                    {employee.employeeType}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-primary-400 rounded-lg hover:bg-gray-50 transition-colors">
                <RxPencil1 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="p-3 border border-primary-400 rounded-lg hover:bg-gray-50 transition-colors">
                <RxDotsVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 outline-none duration-400 rounded-md text-sm font-medium  ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-600 border border-primary-300'
                    : 'text-gray-600 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <RxEnvelopeClosed className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{employee.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RxMobile className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{employee.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RxCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Birthday</p>
                      <p className="font-medium text-gray-900">{employee.birthday}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <RxHome className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">{employee.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RxPerson className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Manager</p>
                      <p className="font-medium text-gray-900">{employee.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RxBackpack className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Work Location</p>
                      <p className="font-medium text-gray-900">{employee.workLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{employee.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Relationship</p>
                  <p className="font-medium text-gray-900">
                    {employee.emergencyContact.relationship}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{employee.emergencyContact.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full border border-primary-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Performance Rating</span>
                  <div className="flex items-center space-x-1">
                    <RxStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{performanceData.currentRating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Leave Used</span>
                  <span className="font-medium">
                    {timeOffData.usedLeave}/{timeOffData.totalLeave} days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Salary</span>
                  <span className="font-medium">{employee.salary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Goals</h2>
            <div className="space-y-4">
              {performanceData.goals.map((goal) => (
                <div key={goal.id} className="p-4 border border-primary-300 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{goal.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(goal.status)}`}
                    >
                      {goal.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          goal.progress >= 80
                            ? 'bg-green-500'
                            : goal.progress >= 50
                              ? 'bg-blue-500'
                              : 'bg-yellow-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h2>
            <div className="space-y-4">
              {performanceData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <RxStar className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeoff' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leave Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Leave Summary</h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {timeOffData.totalLeave - timeOffData.usedLeave}
                </div>
                <p className="text-sm text-gray-600">Days Remaining</p>
              </div>
              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Allocated</span>
                  <span className="font-medium">{timeOffData.totalLeave} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Used</span>
                  <span className="font-medium">{timeOffData.usedLeave} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-medium">{timeOffData.pendingRequests} requests</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Leave Requests</h2>
            <div className="space-y-4">
              {timeOffData.recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary-200 rounded-lg">
                      <RxCalendar className="w-4 h-4 text-primary-900" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{request.type}</h3>
                      <p className="text-sm text-gray-600">
                        {request.startDate} - {request.endDate} ({request.days} days)
                      </p>
                      <p className="text-xs text-gray-500">{request.reason}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(request.status)}`}
                  >
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-900 transition-colors">
              Upload Document
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 border border-primary-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-primary-200 rounded-lg">
                    <RxBackpack className="w-5 h-5 text-primary-800" />
                  </div>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <RxDotsVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{doc.name}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Type: {doc.type}</p>
                  <p>Size: {doc.size}</p>
                  <p>Uploaded: {doc.uploadDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;
