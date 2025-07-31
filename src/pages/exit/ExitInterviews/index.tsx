import React, { useEffect, useState } from 'react';
import {
  RxBarChart,
  RxCalendar,
  RxChatBubble,
  RxCheckCircled,
  RxCross2,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxLightningBolt,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxRows,
  RxStar,
  RxStarFilled,
  RxUpdate,
  RxVideo,
} from 'react-icons/rx';

interface ExitInterview {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  lastWorkingDate: string;
  exitApplicationId: string;
  interviewType: 'structured' | 'semi_structured' | 'informal';
  interviewMode: 'in_person' | 'video_call' | 'phone' | 'survey_only';
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show' | 'rescheduled';
  interviewer: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    email: string;
  };
  location?: string;
  meetingLink?: string;
  priority: 'high' | 'medium' | 'low';

  // Interview Questions & Responses
  responses: {
    reasonForLeaving: {
      primary: string;
      secondary: string[];
      details: string;
    };
    jobSatisfaction: {
      rating: number;
      feedback: string;
    };
    managementFeedback: {
      rating: number;
      feedback: string;
    };
    workEnvironment: {
      rating: number;
      feedback: string;
    };
    careerDevelopment: {
      rating: number;
      feedback: string;
    };
    compensationBenefits: {
      rating: number;
      feedback: string;
    };
    workLifeBalance: {
      rating: number;
      feedback: string;
    };
    wouldRecommend: {
      rating: number;
      feedback: string;
    };
    improvements: string[];
    additionalComments: string;
  };

  // Analysis & Metrics
  overallScore: number;
  riskFactors: string[];
  positiveAspects: string[];
  actionItems: string[];
  followUpRequired: boolean;

  notes: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedDate: string;
  }>;
  createdDate: string;
  completedDate?: string;
  lastUpdated: string;
}

const ExitInterview: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [interviewModeFilter, setInterviewModeFilter] = useState<string>('all');
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

  // Mock exit interviews data
  const exitInterviews: ExitInterview[] = [
    {
      id: 'EI001',
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'rahul.sharma@company.com',
      phone: '+91-9876543210',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      joiningDate: '2022-03-15',
      lastWorkingDate: '2025-08-27',
      exitApplicationId: 'EXT001',
      interviewType: 'structured',
      interviewMode: 'video_call',
      scheduledDate: '2025-08-25',
      scheduledTime: '15:00',
      duration: 60,
      status: 'completed',
      interviewer: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
        email: 'anita.verma@company.com',
      },
      meetingLink: 'https://zoom.us/j/123456789',
      priority: 'high',
      responses: {
        reasonForLeaving: {
          primary: 'Better career opportunities',
          secondary: ['Higher compensation', 'Remote work flexibility'],
          details:
            'Found a senior role at a product company with better growth prospects and 40% salary increase',
        },
        jobSatisfaction: {
          rating: 4,
          feedback: 'Generally satisfied with work assignments and team collaboration',
        },
        managementFeedback: {
          rating: 3,
          feedback:
            'Manager was supportive but lacked technical guidance for senior-level challenges',
        },
        workEnvironment: {
          rating: 4,
          feedback: 'Great team culture and office facilities, but limited remote work options',
        },
        careerDevelopment: {
          rating: 2,
          feedback: 'Insufficient growth opportunities and unclear promotion criteria',
        },
        compensationBenefits: {
          rating: 3,
          feedback: 'Competitive salary but benefits package could be improved',
        },
        workLifeBalance: {
          rating: 4,
          feedback: 'Reasonable work hours with occasional overtime during releases',
        },
        wouldRecommend: {
          rating: 4,
          feedback: 'Would recommend for junior/mid-level positions but not for senior roles',
        },
        improvements: [
          'Clearer career progression paths',
          'Better remote work policies',
          'Enhanced learning and development budget',
          'More competitive compensation packages',
        ],
        additionalComments:
          'Great company culture and colleagues. Hope to see improvements in career growth opportunities for future employees.',
      },
      overallScore: 3.4,
      riskFactors: ['Career Development', 'Remote Work Policy', 'Compensation Structure'],
      positiveAspects: ['Team Culture', 'Work-Life Balance', 'Office Environment'],
      actionItems: [
        'Review promotion criteria and career paths',
        'Evaluate remote work policy flexibility',
        'Benchmark compensation against market rates',
      ],
      followUpRequired: true,
      notes: 'High-performing employee with valuable feedback on career development gaps',
      documents: [
        {
          id: 'DOC001',
          name: 'Exit Interview Form',
          type: 'PDF',
          uploadedDate: '2025-08-25',
        },
      ],
      createdDate: '2025-08-20',
      completedDate: '2025-08-25',
      lastUpdated: '2025-08-25',
    },
    {
      id: 'EI002',
      employeeId: 'EMP002',
      employeeName: 'Meera Patel',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'meera.patel@company.com',
      phone: '+91-8765432109',
      department: 'Marketing',
      designation: 'Marketing Manager',
      joiningDate: '2021-06-10',
      lastWorkingDate: '2025-08-09',
      exitApplicationId: 'EXT002',
      interviewType: 'semi_structured',
      interviewMode: 'in_person',
      scheduledDate: '2025-08-08',
      scheduledTime: '14:00',
      duration: 45,
      status: 'completed',
      interviewer: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
        email: 'anita.verma@company.com',
      },
      location: 'Conference Room B',
      priority: 'medium',
      responses: {
        reasonForLeaving: {
          primary: 'Relocation',
          secondary: ['Family reasons', 'Better location'],
          details: 'Moving to another city due to spouse job transfer and family considerations',
        },
        jobSatisfaction: {
          rating: 5,
          feedback: 'Extremely satisfied with role responsibilities and creative freedom',
        },
        managementFeedback: {
          rating: 5,
          feedback: 'Excellent manager who provided guidance and growth opportunities',
        },
        workEnvironment: {
          rating: 5,
          feedback: 'Outstanding team spirit and collaborative work culture',
        },
        careerDevelopment: {
          rating: 4,
          feedback: 'Good training opportunities and skill development programs',
        },
        compensationBenefits: {
          rating: 4,
          feedback: 'Fair compensation with good health benefits',
        },
        workLifeBalance: {
          rating: 5,
          feedback: 'Perfect balance with flexible working arrangements',
        },
        wouldRecommend: {
          rating: 5,
          feedback: 'Highly recommend this company to anyone in marketing field',
        },
        improvements: [
          'More international project exposure',
          'Additional conference and training budget',
        ],
        additionalComments:
          'Leaving with heavy heart. This is an excellent company with amazing people. Would love to return if opportunity arises.',
      },
      overallScore: 4.7,
      riskFactors: [],
      positiveAspects: [
        'Management Quality',
        'Work Culture',
        'Work-Life Balance',
        'Job Satisfaction',
      ],
      actionItems: [
        'Maintain contact for future opportunities',
        'Use as case study for positive work culture',
      ],
      followUpRequired: false,
      notes:
        'Excellent employee leaving for personal reasons. Strong advocate for company culture.',
      documents: [
        {
          id: 'DOC002',
          name: 'Exit Interview Form',
          type: 'PDF',
          uploadedDate: '2025-08-08',
        },
      ],
      createdDate: '2025-08-05',
      completedDate: '2025-08-08',
      lastUpdated: '2025-08-08',
    },
    {
      id: 'EI003',
      employeeId: 'EMP003',
      employeeName: 'Arjun Reddy',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      email: 'arjun.reddy@company.com',
      phone: '+91-7654321098',
      department: 'Finance',
      designation: 'Senior Financial Analyst',
      joiningDate: '2020-11-20',
      lastWorkingDate: '2025-08-29',
      exitApplicationId: 'EXT003',
      interviewType: 'structured',
      interviewMode: 'video_call',
      scheduledDate: '2025-08-27',
      scheduledTime: '11:00',
      duration: 60,
      status: 'scheduled',
      interviewer: {
        id: 'HR002',
        name: 'Priya Singh',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'HR Business Partner',
        email: 'priya.singh@company.com',
      },
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      priority: 'low',
      responses: {
        reasonForLeaving: {
          primary: 'Education',
          secondary: ['MBA program', 'Career change'],
          details: 'Pursuing MBA from top business school to transition into consulting',
        },
        jobSatisfaction: {
          rating: 0,
          feedback: '',
        },
        managementFeedback: {
          rating: 0,
          feedback: '',
        },
        workEnvironment: {
          rating: 0,
          feedback: '',
        },
        careerDevelopment: {
          rating: 0,
          feedback: '',
        },
        compensationBenefits: {
          rating: 0,
          feedback: '',
        },
        workLifeBalance: {
          rating: 0,
          feedback: '',
        },
        wouldRecommend: {
          rating: 0,
          feedback: '',
        },
        improvements: [],
        additionalComments: '',
      },
      overallScore: 0,
      riskFactors: [],
      positiveAspects: [],
      actionItems: [],
      followUpRequired: false,
      notes: 'Interview scheduled for next week',
      documents: [],
      createdDate: '2025-08-22',
      lastUpdated: '2025-08-22',
    },
    {
      id: 'EI004',
      employeeId: 'EMP004',
      employeeName: 'Lakshmi Nair',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'lakshmi.nair@company.com',
      phone: '+91-5432109876',
      department: 'Design',
      designation: 'UX Designer',
      joiningDate: '2023-01-15',
      lastWorkingDate: '2025-08-28',
      exitApplicationId: 'EXT005',
      interviewType: 'informal',
      interviewMode: 'in_person',
      scheduledDate: '2025-08-26',
      scheduledTime: '16:00',
      duration: 30,
      status: 'completed',
      interviewer: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
        email: 'anita.verma@company.com',
      },
      location: 'HR Office',
      priority: 'medium',
      responses: {
        reasonForLeaving: {
          primary: 'Entrepreneurship',
          secondary: ['Start own business', 'Creative freedom'],
          details:
            'Starting own design consultancy to work with diverse clients and have creative control',
        },
        jobSatisfaction: {
          rating: 4,
          feedback: 'Enjoyed the projects and creative challenges',
        },
        managementFeedback: {
          rating: 4,
          feedback: 'Good support from design director, appreciated creative freedom',
        },
        workEnvironment: {
          rating: 3,
          feedback: 'Good team but sometimes felt isolated in design decisions',
        },
        careerDevelopment: {
          rating: 3,
          feedback: 'Some learning opportunities but limited exposure to different industries',
        },
        compensationBenefits: {
          rating: 3,
          feedback: 'Fair package but could be more competitive for design roles',
        },
        workLifeBalance: {
          rating: 4,
          feedback: 'Good balance with flexible working hours',
        },
        wouldRecommend: {
          rating: 4,
          feedback: 'Would recommend for designers looking for stable environment',
        },
        improvements: [
          'More diverse project portfolio',
          'Better design tool subscriptions',
          'Cross-industry exposure opportunities',
        ],
        additionalComments:
          'Grateful for the experience and support. Hope to collaborate in future as a vendor.',
      },
      overallScore: 3.6,
      riskFactors: ['Creative Limitations', 'Industry Exposure'],
      positiveAspects: ['Work-Life Balance', 'Management Support', 'Project Quality'],
      actionItems: [
        'Consider vendor partnership opportunities',
        'Review design tool budget and subscriptions',
        'Explore diverse project assignments',
      ],
      followUpRequired: true,
      notes: 'Talented designer leaving for entrepreneurship. Potential future vendor partner.',
      documents: [
        {
          id: 'DOC003',
          name: 'Exit Interview Summary',
          type: 'PDF',
          uploadedDate: '2025-08-26',
        },
      ],
      createdDate: '2025-08-23',
      completedDate: '2025-08-26',
      lastUpdated: '2025-08-26',
    },
    {
      id: 'EI005',
      employeeId: 'EMP005',
      employeeName: 'Vikram Singh',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'vikram.singh@company.com',
      phone: '+91-4321098765',
      department: 'Sales',
      designation: 'Sales Manager',
      joiningDate: '2021-08-12',
      lastWorkingDate: '2025-08-15',
      exitApplicationId: 'EXT006',
      interviewType: 'structured',
      interviewMode: 'phone',
      scheduledDate: '2025-08-14',
      scheduledTime: '10:00',
      duration: 45,
      status: 'no_show',
      interviewer: {
        id: 'HR002',
        name: 'Priya Singh',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'HR Business Partner',
        email: 'priya.singh@company.com',
      },
      priority: 'high',
      responses: {
        reasonForLeaving: {
          primary: 'Performance issues',
          secondary: ['Involuntary termination'],
          details: 'Terminated due to consistent underperformance and policy violations',
        },
        jobSatisfaction: {
          rating: 0,
          feedback: '',
        },
        managementFeedback: {
          rating: 0,
          feedback: '',
        },
        workEnvironment: {
          rating: 0,
          feedback: '',
        },
        careerDevelopment: {
          rating: 0,
          feedback: '',
        },
        compensationBenefits: {
          rating: 0,
          feedback: '',
        },
        workLifeBalance: {
          rating: 0,
          feedback: '',
        },
        wouldRecommend: {
          rating: 0,
          feedback: '',
        },
        improvements: [],
        additionalComments: '',
      },
      overallScore: 0,
      riskFactors: [],
      positiveAspects: [],
      actionItems: ['Document termination reasons', 'Review sales performance management process'],
      followUpRequired: false,
      notes: 'Employee did not attend scheduled exit interview. Terminated for performance issues.',
      documents: [],
      createdDate: '2025-08-12',
      lastUpdated: '2025-08-14',
    },
  ];

  const statuses = ['all', 'scheduled', 'completed', 'cancelled', 'no_show', 'rescheduled'];
  const interviewModes = ['all', 'in_person', 'video_call', 'phone', 'survey_only'];

  // Filter exit interviews
  const filteredInterviews = exitInterviews.filter((interview) => {
    const matchesSearch =
      interview.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.responses.reasonForLeaving.primary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    const matchesInterviewMode =
      interviewModeFilter === 'all' || interview.interviewMode === interviewModeFilter;

    return matchesSearch && matchesStatus && matchesInterviewMode;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
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

  const getInterviewModeIcon = (mode: string) => {
    switch (mode) {
      case 'in_person':
        return <RxPerson className="w-4 h-4 text-green-500" />;
      case 'video_call':
        return <RxVideo className="w-4 h-4 text-blue-500" />;
      case 'phone':
        return <RxChatBubble className="w-4 h-4 text-purple-500" />;
      case 'survey_only':
        return <RxFileText className="w-4 h-4 text-orange-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderStars = (rating: number) => {
    if (rating === 0) return <span className="text-xs text-gray-400">Not rated</span>;
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
  const totalInterviews = exitInterviews.length;
  const scheduledInterviews = exitInterviews.filter((i) => i.status === 'scheduled').length;
  const completedInterviews = exitInterviews.filter((i) => i.status === 'completed').length;
  const avgOverallScore =
    completedInterviews > 0
      ? exitInterviews
          .filter((i) => i.status === 'completed')
          .reduce((sum, i) => sum + i.overallScore, 0) / completedInterviews
      : 0;

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
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(interview.priority)}`}></div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Header with employee info and status */}
          <div className="flex items-start justify-between mb-4 pr-8">
            <div className="flex items-center space-x-3">
              <img
                src={interview.avatar}
                alt={interview.employeeName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{interview.employeeName}</h3>
                <p className="text-sm text-gray-500">{interview.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">{getStatusIcon(interview.status)}</div>
          </div>

          {/* Department and Designation */}
          <div className="mb-4">
            <Chip label={interview.department} size="small" className="mb-2" variant="outlined" />
            <p className="text-sm text-gray-700 font-medium">{interview.designation}</p>
          </div>

          {/* Interview Details */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              {getInterviewModeIcon(interview.interviewMode)}
              <span className="text-sm font-medium text-gray-700 capitalize">
                {interview.interviewMode.replace('_', ' ')}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">
                  {new Date(interview.scheduledDate).toLocaleDateString()} at{' '}
                  {interview.scheduledTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{interview.duration} minutes</span>
              </div>
              {(interview.location || interview.meetingLink) && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-xs">{interview.location || 'Video Call'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Interviewer */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Interviewer</p>
            <div className="flex items-center space-x-2">
              <img
                src={interview.interviewer.avatar}
                alt={interview.interviewer.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{interview.interviewer.name}</p>
                <p className="text-xs text-gray-500">{interview.interviewer.title}</p>
              </div>
            </div>
          </div>

          {/* Reason for Leaving */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Primary Reason for Leaving</p>
            <p className="text-sm text-gray-900 font-medium">
              {interview.responses.reasonForLeaving.primary}
            </p>
            {interview.responses.reasonForLeaving.secondary.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {interview.responses.reasonForLeaving.secondary.slice(0, 2).map((reason, index) => (
                  <Chip
                    key={index}
                    label={reason}
                    size="small"
                    variant="outlined"
                    color="primary"
                    className="text-xs"
                  />
                ))}
                {interview.responses.reasonForLeaving.secondary.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{interview.responses.reasonForLeaving.secondary.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Overall Score */}
          {interview.status === 'completed' && interview.overallScore > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Overall Experience Score</span>
                <span className="text-sm font-bold text-gray-900">
                  {interview.overallScore.toFixed(1)}/5.0
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    interview.overallScore >= 4
                      ? 'bg-green-500'
                      : interview.overallScore >= 3
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${(interview.overallScore / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Key Insights */}
          {interview.status === 'completed' && (
            <div className="mb-4">
              {interview.riskFactors.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-red-600 font-medium mb-1">Risk Factors:</p>
                  <div className="flex flex-wrap gap-1">
                    {interview.riskFactors.slice(0, 2).map((risk, index) => (
                      <span
                        key={index}
                        className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded"
                      >
                        {risk}
                      </span>
                    ))}
                    {interview.riskFactors.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{interview.riskFactors.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {interview.positiveAspects.length > 0 && (
                <div>
                  <p className="text-xs text-green-600 font-medium mb-1">Positive Aspects:</p>
                  <div className="flex flex-wrap gap-1">
                    {interview.positiveAspects.slice(0, 2).map((aspect, index) => (
                      <span
                        key={index}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                      >
                        {aspect}
                      </span>
                    ))}
                    {interview.positiveAspects.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{interview.positiveAspects.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Follow-up Required */}
          {interview.followUpRequired && (
            <div className="mb-4 p-2 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <RxLightningBolt className="w-4 h-4 text-yellow-600" />
                <span className="text-xs text-yellow-700 font-medium">Follow-up Required</span>
              </div>
            </div>
          )}

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={
                interview.status.charAt(0).toUpperCase() +
                interview.status.slice(1).replace('_', ' ')
              }
              size="small"
              color={getStatusColor(interview.status)}
              variant="filled"
            />
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxFileText className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxCalendar className="w-4 h-4" />
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
                Employee
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interview Details
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leaving Reason
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overall Score
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Follow-up
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
                        src={interview.avatar}
                        alt={interview.employeeName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(interview.priority)}`}
                      ></div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {interview.employeeName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {interview.employeeId} • {interview.department}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {getInterviewModeIcon(interview.interviewMode)}
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {interview.interviewMode.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {interview.interviewType.charAt(0).toUpperCase() +
                      interview.interviewType.slice(1).replace('_', ' ')}
                  </div>
                  <div className="text-xs text-gray-500">{interview.duration} minutes</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    {new Date(interview.scheduledDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-900">{interview.scheduledTime}</div>
                  <div className="text-xs text-gray-500">{interview.interviewer.name}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {interview.responses.reasonForLeaving.primary}
                  </div>
                  {interview.responses.reasonForLeaving.secondary.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      +{interview.responses.reasonForLeaving.secondary.length} more reasons
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {interview.status === 'completed' && interview.overallScore > 0 ? (
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {interview.overallScore.toFixed(1)}/5.0
                      </div>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        {renderStars(Math.round(interview.overallScore))}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Not completed</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(interview.status)}
                    <Chip
                      label={
                        interview.status.charAt(0).toUpperCase() +
                        interview.status.slice(1).replace('_', ' ')
                      }
                      size="small"
                      color={getStatusColor(interview.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {interview.followUpRequired ? (
                    <div className="flex items-center justify-center space-x-1">
                      <RxLightningBolt className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-yellow-700 font-medium">Required</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">None</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxFileText className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxCalendar className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Exit Interviews</h1>
            <p className="text-gray-600">
              Conduct and manage exit interviews to gather valuable feedback
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
              <RxChatBubble className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Interviews</p>
              <p className="text-2xl font-bold text-gray-900">{totalInterviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxCalendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{scheduledInterviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedInterviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxStar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {avgOverallScore > 0 ? avgOverallScore.toFixed(1) : 'N/A'}
              </p>
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
            <RxPlus className="w-4 h-4" />
            <span>Schedule Interview</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxVideo className="w-4 h-4" />
            <span>Join Meeting</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>View Analytics</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxFileText className="w-4 h-4" />
            <span>Generate Report</span>
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

          {/* Interview Mode Filter */}
          <div className="relative">
            <select
              value={interviewModeFilter}
              onChange={(e) => setInterviewModeFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {interviewModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode === 'all'
                    ? 'All Modes'
                    : mode.charAt(0).toUpperCase() + mode.slice(1).replace('_', ' ')}
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
          Showing {filteredInterviews.length} of {exitInterviews.length} exit interviews
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default ExitInterview;
