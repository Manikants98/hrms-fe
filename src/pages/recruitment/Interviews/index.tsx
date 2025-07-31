import { Chip } from '@mui/material';
import React, { useState } from 'react';
import {
  RxBadge,
  RxBarChart,
  RxCalendar,
  RxChatBubble,
  RxCheckCircled,
  RxCross2,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEnvelopeClosed,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxHome,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxRows,
  RxStar,
  RxStarFilled,
  RxTarget,
  RxTimer,
  RxUpdate,
  RxVideo,
} from 'react-icons/rx';
import Clock from '../../../shared/clock';

interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  candidateEmail: string;
  candidatePhone: string;
  appliedPosition: string;
  department: string;
  interviewType: 'screening' | 'technical' | 'hr' | 'managerial' | 'final' | 'panel';
  interviewRound: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  timezone: string;
  location: {
    type: 'office' | 'video' | 'phone';
    details: string;
    meetingLink?: string;
  };
  interviewers: Array<{
    id: string;
    name: string;
    avatar: string;
    title: string;
    email: string;
  }>;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'no_show' | 'rescheduled';
  priority: 'high' | 'medium' | 'low';
  notes: string;
  feedback?: string;
  rating?: number;
  result?: 'pass' | 'fail' | 'pending';
  nextStep?: string;
  rescheduleReason?: string;
  createdDate: string;
  lastUpdated: string;
}

const Interviews: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [interviewTypeFilter, setInterviewTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const interviews: Interview[] = [
    {
      id: 'INT001',
      candidateId: 'CAND001',
      candidateName: 'Sarah Johnson',
      candidateAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      candidateEmail: 'sarah.johnson@email.com',
      candidatePhone: '+91-9876543210',
      appliedPosition: 'Senior Frontend Developer',
      department: 'Engineering',
      interviewType: 'technical',
      interviewRound: 'Technical Round 2',
      scheduledDate: '2025-08-02',
      scheduledTime: '10:00',
      duration: 60,
      timezone: 'IST',
      location: {
        type: 'video',
        details: 'Zoom Meeting',
        meetingLink: 'https://zoom.us/j/123456789',
      },
      interviewers: [
        {
          id: 'EMP001',
          name: 'Raj Patel',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          title: 'Engineering Manager',
          email: 'raj.patel@company.com',
        },
        {
          id: 'EMP002',
          name: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          title: 'Senior Tech Lead',
          email: 'priya.sharma@company.com',
        },
      ],
      status: 'scheduled',
      priority: 'high',
      notes: 'Focus on React, TypeScript, and system design. Candidate has strong portfolio.',
      createdDate: '2025-07-28',
      lastUpdated: '2025-07-30',
    },
    {
      id: 'INT002',
      candidateId: 'CAND002',
      candidateName: 'Michael Chen',
      candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      candidateEmail: 'michael.chen@email.com',
      candidatePhone: '+91-8765432109',
      appliedPosition: 'Product Manager',
      department: 'Product',
      interviewType: 'hr',
      interviewRound: 'HR Round',
      scheduledDate: '2025-08-01',
      scheduledTime: '14:00',
      duration: 45,
      timezone: 'IST',
      location: {
        type: 'office',
        details: 'Conference Room 3B',
      },
      interviewers: [
        {
          id: 'EMP003',
          name: 'Anita Verma',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          title: 'HR Manager',
          email: 'anita.verma@company.com',
        },
      ],
      status: 'completed',
      priority: 'medium',
      notes: 'Assess cultural fit and leadership experience.',
      feedback: 'Excellent communication skills and strong product sense. Recommended for next round.',
      rating: 4.5,
      result: 'pass',
      nextStep: 'Final Interview with VP',
      createdDate: '2025-07-25',
      lastUpdated: '2025-08-01',
    },
    {
      id: 'INT003',
      candidateId: 'CAND003',
      candidateName: 'Emily Davis',
      candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      candidateEmail: 'emily.davis@email.com',
      candidatePhone: '+91-7654321098',
      appliedPosition: 'UX Designer',
      department: 'Design',
      interviewType: 'technical',
      interviewRound: 'Portfolio Review',
      scheduledDate: '2025-08-03',
      scheduledTime: '11:00',
      duration: 90,
      timezone: 'IST',
      location: {
        type: 'video',
        details: 'Google Meet',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
      },
      interviewers: [
        {
          id: 'EMP004',
          name: 'Lisa Anderson',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          title: 'Design Director',
          email: 'lisa.anderson@company.com',
        },
      ],
      status: 'scheduled',
      priority: 'medium',
      notes: 'Review portfolio and discuss design process. Focus on user research methodologies.',
      createdDate: '2025-07-26',
      lastUpdated: '2025-07-29',
    },
    {
      id: 'INT004',
      candidateId: 'CAND004',
      candidateName: 'David Wilson',
      candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      candidateEmail: 'david.wilson@email.com',
      candidatePhone: '+91-6543210987',
      appliedPosition: 'DevOps Engineer',
      department: 'Engineering',
      interviewType: 'technical',
      interviewRound: 'Technical Assessment',
      scheduledDate: '2025-08-04',
      scheduledTime: '15:30',
      duration: 75,
      timezone: 'IST',
      location: {
        type: 'video',
        details: 'Microsoft Teams',
        meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      },
      interviewers: [
        {
          id: 'EMP005',
          name: 'Suresh Kumar',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          title: 'DevOps Lead',
          email: 'suresh.kumar@company.com',
        },
      ],
      status: 'cancelled',
      priority: 'low',
      notes: 'Assess AWS, Kubernetes, and Infrastructure as Code skills.',
      rescheduleReason: 'Candidate requested reschedule due to personal emergency',
      createdDate: '2025-07-27',
      lastUpdated: '2025-07-30',
    },
    {
      id: 'INT005',
      candidateId: 'CAND005',
      candidateName: 'Priya Mehta',
      candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      candidateEmail: 'priya.mehta@email.com',
      candidatePhone: '+91-5432109876',
      appliedPosition: 'Data Scientist',
      department: 'Analytics',
      interviewType: 'screening',
      interviewRound: 'Initial Screening',
      scheduledDate: '2025-08-01',
      scheduledTime: '09:00',
      duration: 30,
      timezone: 'IST',
      location: {
        type: 'phone',
        details: 'Phone Interview',
      },
      interviewers: [
        {
          id: 'EMP006',
          name: 'Dr. Anita Verma',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          title: 'Head of Analytics',
          email: 'anita.verma@company.com',
        },
      ],
      status: 'ongoing',
      priority: 'high',
      notes: 'Initial screening to assess background and interest level.',
      createdDate: '2025-07-29',
      lastUpdated: '2025-08-01',
    },
    {
      id: 'INT006',
      candidateId: 'CAND006',
      candidateName: 'Arjun Singh',
      candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      candidateEmail: 'arjun.singh@email.com',
      candidatePhone: '+91-4321098765',
      appliedPosition: 'Sales Manager',
      department: 'Sales',
      interviewType: 'final',
      interviewRound: 'Final Interview',
      scheduledDate: '2025-07-30',
      scheduledTime: '16:00',
      duration: 60,
      timezone: 'IST',
      location: {
        type: 'office',
        details: 'CEO Office',
      },
      interviewers: [
        {
          id: 'EMP007',
          name: 'Rajesh Kumar',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          title: 'CEO',
          email: 'rajesh.kumar@company.com',
        },
      ],
      status: 'no_show',
      priority: 'high',
      notes: 'Final interview with CEO to assess leadership potential.',
      rescheduleReason: 'Candidate did not attend the scheduled interview',
      createdDate: '2025-07-28',
      lastUpdated: '2025-07-30',
    },
  ];

  const statuses = ['all', 'scheduled', 'ongoing', 'completed', 'cancelled', 'no_show', 'rescheduled'];
  const interviewTypes = ['all', 'screening', 'technical', 'hr', 'managerial', 'final', 'panel'];

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.appliedPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.interviewRound.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.interviewers.some((interviewer) => interviewer.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    const matchesInterviewType = interviewTypeFilter === 'all' || interview.interviewType === interviewTypeFilter;

    return matchesSearch && matchesStatus && matchesInterviewType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'ongoing':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'no_show':
        return 'error';
      case 'rescheduled':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <RxCalendar className="w-4 h-4 text-blue-500" />;
      case 'ongoing':
        return <RxTimer className="w-4 h-4 text-orange-500" />;
      case 'completed':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'no_show':
        return <RxCross2 className="w-4 h-4 text-red-600" />;
      case 'rescheduled':
        return <RxUpdate className="w-4 h-4 text-yellow-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case 'screening':
        return <RxEyeOpen className="w-4 h-4 text-blue-500" />;
      case 'technical':
        return <RxGear className="w-4 h-4 text-purple-500" />;
      case 'hr':
        return <RxPerson className="w-4 h-4 text-green-500" />;
      case 'managerial':
        return <RxBadge className="w-4 h-4 text-orange-500" />;
      case 'final':
        return <RxTarget className="w-4 h-4 text-red-500" />;
      case 'panel':
        return <RxChatBubble className="w-4 h-4 text-pink-500" />;
      default:
        return <RxFileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getLocationIcon = (locationType: string) => {
    switch (locationType) {
      case 'video':
        return <RxVideo className="w-4 h-4 text-blue-500" />;
      case 'office':
        return <RxHome className="w-4 h-4 text-green-500" />;
      case 'phone':
        return <RxChatBubble className="w-4 h-4 text-purple-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <RxStarFilled key={i} className="w-3 h-3 text-yellow-400" />
        ) : (
          <RxStar key={i} className="w-3 h-3 text-gray-300" />
        )
      );
    }
    return stars;
  };

  // Calculate statistics
  const totalInterviews = interviews.length;
  const scheduledInterviews = interviews.filter((i) => i.status === 'scheduled').length;
  const completedInterviews = interviews.filter((i) => i.status === 'completed').length;
  const ongoingInterviews = interviews.filter((i) => i.status === 'ongoing').length;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredInterviews.map((interview) => (
        <div
          key={interview.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority Indicator */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                interview.priority === 'high'
                  ? 'bg-red-500'
                  : interview.priority === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
              }`}
            ></div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Header with candidate info and status */}
          <div className="flex items-start justify-between mb-4 pr-8">
            <div className="flex items-center space-x-3">
              <img
                src={interview.candidateAvatar}
                alt={interview.candidateName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{interview.candidateName}</h3>
                <p className="text-sm text-gray-500">{interview.appliedPosition}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">{getStatusIcon(interview.status)}</div>
          </div>

          {/* Interview Details */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              {getInterviewTypeIcon(interview.interviewType)}
              <span className="text-sm font-medium text-gray-700">{interview.interviewRound}</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Date & Time:</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date(interview.scheduledDate).toLocaleDateString()} at {interview.scheduledTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Duration:</span>
              <span className="text-sm text-gray-900">{interview.duration} minutes</span>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-1">
              {getLocationIcon(interview.location.type)}
              <span className="text-sm font-medium text-gray-700 capitalize">{interview.location.type}</span>
            </div>
            <p className="text-sm text-gray-600">{interview.location.details}</p>
            {interview.location.meetingLink && (
              <button className="text-xs text-blue-600 hover:underline mt-1">Join Meeting</button>
            )}
          </div>

          {/* Interviewers */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Interviewer(s)</p>
            <div className="space-y-2">
              {interview.interviewers.map((interviewer, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <img src={interviewer.avatar} alt={interviewer.name} className="w-6 h-6 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{interviewer.name}</p>
                    <p className="text-xs text-gray-500">{interviewer.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rating (if completed) */}
          {interview.rating && (
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Rating:</span>
                <div className="flex items-center space-x-1">
                  {renderStars(interview.rating)}
                  <span className="text-xs text-gray-600">({interview.rating.toFixed(1)})</span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Notes</p>
            <p className="text-sm text-gray-600 line-clamp-2">{interview.notes}</p>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={interview.status.charAt(0).toUpperCase() + interview.status.slice(1).replace('_', ' ')}
              size="small"
              color={getStatusColor(interview.status)}
              variant="filled"
            />
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxCalendar className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxEnvelopeClosed className="w-4 h-4" />
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
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interview Details
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interviewer(s)
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInterviews.map((interview) => (
              <tr key={interview.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={interview.candidateAvatar}
                        alt={interview.candidateName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`w-2 h-2 rounded-full absolute -top-1 -right-1 ${
                          interview.priority === 'high'
                            ? 'bg-red-500'
                            : interview.priority === 'medium'
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                        }`}
                      ></div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{interview.candidateName}</div>
                      <div className="text-sm text-gray-500">{interview.appliedPosition}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {getInterviewTypeIcon(interview.interviewType)}
                    <span className="text-sm font-medium text-gray-900 capitalize">{interview.interviewType}</span>
                  </div>
                  <div className="text-xs text-gray-500">{interview.interviewRound}</div>
                  <div className="text-xs text-gray-500">{interview.department}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    {new Date(interview.scheduledDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-900">{interview.scheduledTime}</div>
                  <div className="text-xs text-gray-500">{interview.duration} min</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1">
                    {interview.interviewers.slice(0, 2).map((interviewer, index) => (
                      <img
                        key={index}
                        src={interviewer.avatar}
                        alt={interviewer.name}
                        className="w-6 h-6 rounded-full object-cover"
                        title={interviewer.name}
                      />
                    ))}
                    {interview.interviewers.length > 2 && (
                      <span className="text-xs text-gray-500">+{interview.interviewers.length - 2}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {interview.interviewers[0]?.name}
                    {interview.interviewers.length > 1 && ` +${interview.interviewers.length - 1}`}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1">
                    {getLocationIcon(interview.location.type)}
                    <span className="text-sm text-gray-900 capitalize">{interview.location.type}</span>
                  </div>
                  <div className="text-xs text-gray-500">{interview.location.details}</div>
                  {interview.location.meetingLink && (
                    <button className="text-xs text-blue-600 hover:underline">Join</button>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(interview.status)}
                    <Chip
                      label={interview.status.charAt(0).toUpperCase() + interview.status.slice(1).replace('_', ' ')}
                      size="small"
                      color={getStatusColor(interview.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {interview.rating ? (
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(interview.rating)}
                      <span className="text-xs text-gray-600 ml-1">({interview.rating.toFixed(1)})</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Not rated</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxCalendar className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxEnvelopeClosed className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Interviews</h1>
            <p className="text-gray-600">Schedule and manage candidate interviews throughout the hiring process</p>
          </div>
          <Clock />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <RxCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Interviews</p>
              <p className="text-2xl font-bold text-gray-900">{totalInterviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{scheduledInterviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxTimer className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ongoing</p>
              <p className="text-2xl font-bold text-gray-900">{ongoingInterviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxBadge className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedInterviews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxCalendar className="w-4 h-4" />
            <span>Schedule Interview</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxVideo className="w-4 h-4" />
            <span>Join Meeting</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxFileText className="w-4 h-4" />
            <span>Feedback Forms</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>Interview Analytics</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
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
                    : status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Interview Type Filter */}
          <div className="relative">
            <select
              value={interviewTypeFilter}
              onChange={(e) => setInterviewTypeFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {interviewTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search interviews..."
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
                viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <RxGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'
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
          Showing {filteredInterviews.length} of {interviews.length} interviews
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default Interviews;
