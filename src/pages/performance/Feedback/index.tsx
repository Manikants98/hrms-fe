import React, { useEffect, useState } from 'react';
import {
  RxArrowRight,
  RxBackpack,
  RxBadge,
  RxBarChart,
  RxCalendar,
  RxChatBubble,
  RxCheckCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxHeart,
  RxIdCard,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxRows,
  RxShare1,
  RxStar,
  RxStarFilled,
  RxTarget,
  RxTimer,
  RxTriangleUp,
} from 'react-icons/rx';

interface Feedback {
  id: string;

  // Feedback Participants
  feedbackGiver: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    department: string;
    designation: string;
  };

  feedbackReceiver: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    department: string;
    designation: string;
  };

  // Feedback Type and Context
  feedbackType: 'performance' | 'behavioral' | 'project' | 'skills' | 'leadership' | 'peer' | 'upward' | 'customer';
  feedbackCategory: 'positive' | 'constructive' | 'development' | 'recognition' | 'concern';

  relationshipType:
    | 'manager_to_subordinate'
    | 'subordinate_to_manager'
    | 'peer_to_peer'
    | 'cross_department'
    | 'customer_to_employee';

  context: {
    projectId?: string;
    projectName?: string;
    reviewCycle?: string;
    incident?: string;
    goalId?: string;
    skillArea?: string;
  };

  // Feedback Content
  title: string;
  description: string;

  feedbackAreas: Array<{
    area: string;
    rating: number; // 1-5 scale
    comments: string;
    examples: string[];
    suggestions: string[];
  }>;

  // Structured Feedback
  strengths: string[];
  improvementAreas: string[];
  specificExamples: string[];
  recommendations: string[];
  futureExpectations: string[];

  // Ratings and Scores
  overallRating: number;
  categoryRatings: {
    communication: number;
    teamwork: number;
    quality: number;
    initiative: number;
    reliability: number;
    leadership: number;
    problemSolving: number;
    adaptability: number;
  };

  // Feedback Status and Timeline
  status: 'draft' | 'pending_review' | 'submitted' | 'acknowledged' | 'discussed' | 'action_planned' | 'closed';
  priority: 'high' | 'medium' | 'low';

  isAnonymous: boolean;
  isConfidential: boolean;
  requiresResponse: boolean;

  // Response and Actions
  response?: {
    id: string;
    content: string;
    submittedBy: string;
    submittedDate: string;
    actionItems: string[];
    developmentPlan: string;
  };

  actionItems: Array<{
    id: string;
    description: string;
    owner: string;
    dueDate: string;
    status: 'pending' | 'in_progress' | 'completed';
    notes: string;
  }>;

  // Timeline and Tracking
  submittedDate: string;
  acknowledgedDate?: string;
  discussedDate?: string;
  followUpDate?: string;

  // Effectiveness and Impact
  helpfulnessRating?: number; // Rated by receiver
  actionTaken: boolean;
  impactMeasured: boolean;
  followUpRequired: boolean;

  // Administrative
  visibility: 'private' | 'manager_only' | 'hr_visible' | 'team_visible';
  tags: string[];
  relatedFeedback: string[];

  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedDate: string;
  }>;

  createdDate: string;
  lastUpdated: string;
  notes: string;
}

const FeedbackSystem: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
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
      <span className={`inline-flex items-center rounded-full font-medium ${getColorClasses()} ${className}`}>
        {label}
      </span>
    );
  };

  // Mock feedback data
  const feedbackList: Feedback[] = [
    {
      id: 'FB001',
      feedbackGiver: {
        id: 'MGR001',
        name: 'Priya Singh',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        email: 'priya.singh@company.com',
        department: 'Engineering',
        designation: 'Engineering Manager',
      },
      feedbackReceiver: {
        id: 'EMP001',
        name: 'Rahul Sharma',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        email: 'rahul.sharma@company.com',
        department: 'Engineering',
        designation: 'Senior Software Engineer',
      },
      feedbackType: 'performance',
      feedbackCategory: 'positive',
      relationshipType: 'manager_to_subordinate',
      context: {
        projectName: 'React Migration Project',
        reviewCycle: 'Q3 2025',
      },
      title: 'Outstanding Performance in React Migration',
      description:
        'Exceptional leadership and technical execution in the React migration project with outstanding mentoring skills.',
      feedbackAreas: [
        {
          area: 'Technical Leadership',
          rating: 5,
          comments: 'Demonstrated excellent technical decision-making throughout the project',
          examples: [
            'Led architecture decisions',
            'Implemented best practices',
            'Resolved complex technical challenges',
          ],
          suggestions: ['Continue leading major technical initiatives'],
        },
        {
          area: 'Team Mentoring',
          rating: 5,
          comments: 'Exceptionally effective at mentoring junior developers',
          examples: [
            'Mentored 3 junior developers successfully',
            'Created learning materials',
            'Conducted knowledge transfer sessions',
          ],
          suggestions: ['Consider taking on more mentoring responsibilities'],
        },
      ],
      strengths: [
        'Technical expertise and problem-solving',
        'Leadership in complex projects',
        'Effective mentoring and knowledge sharing',
        'Excellent code quality and standards',
      ],
      improvementAreas: ['Cross-team collaboration', 'Time management for multiple priorities'],
      specificExamples: [
        'Successfully migrated 47 out of 50 components ahead of schedule',
        'Maintained zero critical bugs during migration',
        'Mentored 3 junior developers who all received positive feedback',
      ],
      recommendations: [
        'Consider promotion to Technical Lead role',
        'Lead the next major architecture initiative',
        'Develop formal mentoring program',
      ],
      futureExpectations: [
        'Continue technical leadership excellence',
        'Expand cross-functional collaboration',
        'Drive technical standards across teams',
      ],
      overallRating: 4.8,
      categoryRatings: {
        communication: 4.5,
        teamwork: 4.0,
        quality: 5.0,
        initiative: 4.8,
        reliability: 4.7,
        leadership: 4.8,
        problemSolving: 5.0,
        adaptability: 4.5,
      },
      status: 'acknowledged',
      priority: 'high',
      isAnonymous: false,
      isConfidential: false,
      requiresResponse: true,
      response: {
        id: 'RESP001',
        content:
          'Thank you for the positive feedback. I am committed to continuing this level of performance and taking on more leadership responsibilities.',
        submittedBy: 'Rahul Sharma',
        submittedDate: '2025-07-20',
        actionItems: [
          'Prepare for Technical Lead transition',
          'Develop structured mentoring approach',
          'Improve cross-team collaboration',
        ],
        developmentPlan:
          'Focus on expanding leadership skills and cross-functional collaboration while maintaining technical excellence.',
      },
      actionItems: [
        {
          id: 'AI001',
          description: 'Complete leadership training program',
          owner: 'Rahul Sharma',
          dueDate: '2025-09-30',
          status: 'in_progress',
          notes: 'Enrolled in program, starting next month',
        },
        {
          id: 'AI002',
          description: 'Create formal mentoring framework',
          owner: 'Rahul Sharma',
          dueDate: '2025-08-31',
          status: 'pending',
          notes: 'Planning phase',
        },
      ],
      submittedDate: '2025-07-15',
      acknowledgedDate: '2025-07-18',
      discussedDate: '2025-07-19',
      helpfulnessRating: 5,
      actionTaken: true,
      impactMeasured: false,
      followUpRequired: true,
      visibility: 'hr_visible',
      tags: ['technical-leadership', 'mentoring', 'high-performer'],
      relatedFeedback: [],
      documents: [],
      createdDate: '2025-07-15',
      lastUpdated: '2025-07-20',
      notes: 'Excellent employee ready for advancement',
    },
    {
      id: 'FB002',
      feedbackGiver: {
        id: 'EMP003',
        name: 'Arjun Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        email: 'arjun.kumar@company.com',
        department: 'Engineering',
        designation: 'Software Engineer',
      },
      feedbackReceiver: {
        id: 'EMP001',
        name: 'Rahul Sharma',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        email: 'rahul.sharma@company.com',
        department: 'Engineering',
        designation: 'Senior Software Engineer',
      },
      feedbackType: 'peer',
      feedbackCategory: 'positive',
      relationshipType: 'peer_to_peer',
      context: {
        projectName: 'React Migration Project',
      },
      title: 'Excellent Peer Support and Collaboration',
      description: 'Rahul has been an outstanding peer mentor and collaborator throughout our project work.',
      feedbackAreas: [
        {
          area: 'Peer Support',
          rating: 5,
          comments: 'Always available to help and provide guidance',
          examples: ['Helped debug complex issues', 'Shared knowledge generously', 'Patient with questions'],
          suggestions: ['Continue being a great team player'],
        },
      ],
      strengths: ['Technical knowledge sharing', 'Patient and helpful mentoring', 'Collaborative team spirit'],
      improvementAreas: [],
      specificExamples: [
        'Helped me resolve a complex state management issue',
        'Conducted informal knowledge sharing sessions',
        'Always responsive to help requests',
      ],
      recommendations: ['Continue peer mentoring approach', 'Consider leading peer learning sessions'],
      futureExpectations: ['Maintain supportive peer relationships'],
      overallRating: 4.9,
      categoryRatings: {
        communication: 4.8,
        teamwork: 5.0,
        quality: 4.8,
        initiative: 4.7,
        reliability: 5.0,
        leadership: 4.5,
        problemSolving: 4.9,
        adaptability: 4.6,
      },
      status: 'submitted',
      priority: 'medium',
      isAnonymous: false,
      isConfidential: false,
      requiresResponse: false,
      actionItems: [],
      submittedDate: '2025-07-22',
      helpfulnessRating: undefined,
      actionTaken: false,
      impactMeasured: false,
      followUpRequired: false,
      visibility: 'team_visible',
      tags: ['peer-feedback', 'collaboration', 'mentoring'],
      relatedFeedback: ['FB001'],
      documents: [],
      createdDate: '2025-07-22',
      lastUpdated: '2025-07-22',
      notes: 'Positive peer feedback reinforcing leadership qualities',
    },
    {
      id: 'FB003',
      feedbackGiver: {
        id: 'MGR002',
        name: 'Deepika Iyer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        email: 'deepika.iyer@company.com',
        department: 'Finance',
        designation: 'Finance Manager',
      },
      feedbackReceiver: {
        id: 'EMP004',
        name: 'Arjun Reddy',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        email: 'arjun.reddy@company.com',
        department: 'Finance',
        designation: 'Financial Analyst',
      },
      feedbackType: 'performance',
      feedbackCategory: 'constructive',
      relationshipType: 'manager_to_subordinate',
      context: {
        reviewCycle: 'Q3 2025',
      },
      title: 'Performance Improvement Areas - Communication & Initiative',
      description:
        'While technical skills are strong, there are opportunities for improvement in communication and taking initiative.',
      feedbackAreas: [
        {
          area: 'Communication Skills',
          rating: 3,
          comments: 'Needs improvement in presenting ideas and updates clearly',
          examples: ['Difficulty explaining complex analysis', 'Limited participation in meetings'],
          suggestions: [
            'Join communication skills workshop',
            'Practice presentation skills',
            'Prepare talking points for meetings',
          ],
        },
        {
          area: 'Initiative Taking',
          rating: 3,
          comments: 'Tends to wait for instructions rather than proactively identifying opportunities',
          examples: ['Waits for detailed requirements', "Doesn't suggest process improvements"],
          suggestions: ['Identify one improvement opportunity per month', 'Propose solutions along with problems'],
        },
      ],
      strengths: ['Strong analytical skills', 'Attention to detail', 'Technical accuracy'],
      improvementAreas: [
        'Verbal communication and presentation skills',
        'Proactive initiative taking',
        'Leadership presence in meetings',
      ],
      specificExamples: [
        'Accurate financial reports but unclear explanations',
        'Good analysis but needs prompting to share insights',
        'Solid work quality but limited process suggestions',
      ],
      recommendations: [
        'Enroll in communication skills training',
        'Practice presenting monthly reports',
        'Take on a small improvement project',
      ],
      futureExpectations: [
        'More confident communication',
        'Proactive suggestion of improvements',
        'Greater participation in team discussions',
      ],
      overallRating: 3.5,
      categoryRatings: {
        communication: 3.0,
        teamwork: 3.5,
        quality: 4.0,
        initiative: 3.0,
        reliability: 4.0,
        leadership: 2.8,
        problemSolving: 3.8,
        adaptability: 3.2,
      },
      status: 'discussed',
      priority: 'medium',
      isAnonymous: false,
      isConfidential: false,
      requiresResponse: true,
      response: {
        id: 'RESP002',
        content:
          'I understand the feedback and am committed to improving my communication skills and being more proactive.',
        submittedBy: 'Arjun Reddy',
        submittedDate: '2025-07-28',
        actionItems: [
          'Enroll in communication workshop',
          'Prepare weekly update presentations',
          'Identify monthly improvement suggestions',
        ],
        developmentPlan:
          'Focus on building confidence in communication and developing proactive mindset for continuous improvement.',
      },
      actionItems: [
        {
          id: 'AI003',
          description: 'Complete communication skills workshop',
          owner: 'Arjun Reddy',
          dueDate: '2025-09-15',
          status: 'pending',
          notes: 'Researching available workshops',
        },
        {
          id: 'AI004',
          description: 'Present monthly financial summary to team',
          owner: 'Arjun Reddy',
          dueDate: '2025-08-31',
          status: 'in_progress',
          notes: 'Preparing first presentation',
        },
      ],
      submittedDate: '2025-07-25',
      acknowledgedDate: '2025-07-26',
      discussedDate: '2025-07-27',
      followUpDate: '2025-09-25',
      helpfulnessRating: 4,
      actionTaken: true,
      impactMeasured: false,
      followUpRequired: true,
      visibility: 'manager_only',
      tags: ['development-needed', 'communication', 'initiative'],
      relatedFeedback: [],
      documents: [
        {
          id: 'DOC001',
          name: 'Development Plan',
          type: 'PDF',
          uploadedDate: '2025-07-28',
        },
      ],
      createdDate: '2025-07-25',
      lastUpdated: '2025-07-28',
      notes: 'Good potential with focused development needed in soft skills',
    },
    {
      id: 'FB004',
      feedbackGiver: {
        id: 'CLIENT001',
        name: 'Rajesh Patel',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        email: 'rajesh.patel@client.com',
        department: 'External',
        designation: 'Client Project Manager',
      },
      feedbackReceiver: {
        id: 'EMP005',
        name: 'Meera Patel',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        email: 'meera.patel@company.com',
        department: 'Marketing',
        designation: 'Marketing Manager',
      },
      feedbackType: 'customer',
      feedbackCategory: 'positive',
      relationshipType: 'customer_to_employee',
      context: {
        projectName: 'Brand Campaign Q3',
      },
      title: 'Exceptional Client Service and Campaign Results',
      description: 'Outstanding work on our Q3 brand campaign with exceptional results and professional service.',
      feedbackAreas: [
        {
          area: 'Client Communication',
          rating: 5,
          comments: 'Always responsive and clear in communications',
          examples: ['Prompt responses to queries', 'Clear project updates', 'Proactive communication'],
          suggestions: ['Continue excellent communication approach'],
        },
        {
          area: 'Campaign Results',
          rating: 5,
          comments: 'Exceeded all campaign objectives significantly',
          examples: ['32% brand awareness increase vs 25% target', '125% lead generation vs 100% target'],
          suggestions: ['Apply successful strategies to future campaigns'],
        },
      ],
      strengths: [
        'Exceptional client service',
        'Outstanding campaign results',
        'Professional and responsive communication',
        'Creative and strategic thinking',
      ],
      improvementAreas: [],
      specificExamples: [
        'Delivered campaign 2 weeks ahead of schedule',
        'Exceeded all KPI targets significantly',
        'Provided weekly detailed progress reports',
        'Quick resolution of all client concerns',
      ],
      recommendations: [
        'Continue as primary contact for strategic accounts',
        'Share best practices with team',
        'Consider expanding role in client management',
      ],
      futureExpectations: ['Maintain high service standards', 'Continue innovative campaign approaches'],
      overallRating: 4.9,
      categoryRatings: {
        communication: 5.0,
        teamwork: 4.8,
        quality: 5.0,
        initiative: 4.8,
        reliability: 5.0,
        leadership: 4.7,
        problemSolving: 4.8,
        adaptability: 4.9,
      },
      status: 'acknowledged',
      priority: 'high',
      isAnonymous: false,
      isConfidential: false,
      requiresResponse: false,
      actionItems: [],
      submittedDate: '2025-07-30',
      acknowledgedDate: '2025-07-31',
      helpfulnessRating: 5,
      actionTaken: false,
      impactMeasured: true,
      followUpRequired: false,
      visibility: 'hr_visible',
      tags: ['client-feedback', 'exceptional-performance', 'campaign-success'],
      relatedFeedback: [],
      documents: [
        {
          id: 'DOC002',
          name: 'Campaign Results Report',
          type: 'PDF',
          uploadedDate: '2025-07-30',
        },
      ],
      createdDate: '2025-07-30',
      lastUpdated: '2025-07-31',
      notes: 'Exceptional client feedback highlighting outstanding performance',
    },
    {
      id: 'FB005',
      feedbackGiver: {
        id: 'EMP006',
        name: 'Kavya Nair',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        email: 'kavya.nair@company.com',
        department: 'Design',
        designation: 'UX Designer',
      },
      feedbackReceiver: {
        id: 'MGR003',
        name: 'Lisa Anderson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        email: 'lisa.anderson@company.com',
        department: 'Design',
        designation: 'Design Manager',
      },
      feedbackType: 'upward',
      feedbackCategory: 'development',
      relationshipType: 'subordinate_to_manager',
      context: {
        reviewCycle: 'Q3 2025',
      },
      title: 'Request for More Structured Feedback and Growth Opportunities',
      description:
        'While appreciating the supportive environment, would benefit from more structured feedback and clear growth path.',
      feedbackAreas: [
        {
          area: 'Feedback Frequency',
          rating: 3,
          comments: 'Would appreciate more regular structured feedback sessions',
          examples: ['Monthly 1:1s could be more focused', 'Project feedback often delayed'],
          suggestions: ['Schedule bi-weekly focused feedback sessions', 'Provide immediate project feedback'],
        },
        {
          area: 'Career Development',
          rating: 3,
          comments: 'Need clearer guidance on career progression path',
          examples: ['Unclear promotion criteria', 'Limited visibility into growth opportunities'],
          suggestions: ['Create clear development roadmap', 'Discuss specific skill targets'],
        },
      ],
      strengths: ['Supportive and encouraging', 'Good technical guidance', 'Approachable and available'],
      improvementAreas: [
        'More structured feedback approach',
        'Clearer career development planning',
        'Regular goal-setting sessions',
      ],
      specificExamples: [
        'Great support during design system learning',
        'Helpful in project prioritization',
        'Could use more specific skill development guidance',
      ],
      recommendations: [
        'Implement structured 1:1 format',
        'Create individual development plans',
        'Set quarterly skill development goals',
      ],
      futureExpectations: [
        'Regular structured feedback',
        'Clear growth path guidance',
        'More skill-specific mentoring',
      ],
      overallRating: 3.8,
      categoryRatings: {
        communication: 4.0,
        teamwork: 4.2,
        quality: 3.8,
        initiative: 3.5,
        reliability: 4.0,
        leadership: 3.5,
        problemSolving: 3.8,
        adaptability: 3.7,
      },
      status: 'pending_review',
      priority: 'medium',
      isAnonymous: false,
      isConfidential: true,
      requiresResponse: true,
      actionItems: [],
      submittedDate: '2025-07-28',
      helpfulnessRating: undefined,
      actionTaken: false,
      impactMeasured: false,
      followUpRequired: true,
      visibility: 'manager_only',
      tags: ['upward-feedback', 'development-request', 'manager-improvement'],
      relatedFeedback: [],
      documents: [],
      createdDate: '2025-07-28',
      lastUpdated: '2025-07-28',
      notes: 'Constructive upward feedback requesting more structured development approach',
    },
  ];

  const statuses = [
    'all',
    'draft',
    'pending_review',
    'submitted',
    'acknowledged',
    'discussed',
    'action_planned',
    'closed',
  ];
  const types = ['all', 'performance', 'behavioral', 'project', 'skills', 'leadership', 'peer', 'upward', 'customer'];

  // Filter feedback
  const filteredFeedback = feedbackList.filter((feedback) => {
    const matchesSearch =
      feedback.feedbackReceiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.feedbackGiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    const matchesType = typeFilter === 'all' || feedback.feedbackType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'primary';
      case 'pending_review':
        return 'warning';
      case 'submitted':
        return 'primary';
      case 'acknowledged':
        return 'success';
      case 'discussed':
        return 'success';
      case 'action_planned':
        return 'warning';
      case 'closed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      case 'pending_review':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'submitted':
        return <RxShare1 className="w-4 h-4 text-blue-500" />;
      case 'acknowledged':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'discussed':
        return <RxChatBubble className="w-4 h-4 text-green-500" />;
      case 'action_planned':
        return <RxTarget className="w-4 h-4 text-yellow-500" />;
      case 'closed':
        return <RxBadge className="w-4 h-4 text-green-600" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'positive':
        return 'success';
      case 'constructive':
        return 'warning';
      case 'development':
        return 'primary';
      case 'recognition':
        return 'success';
      case 'concern':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return <RxTarget className="w-4 h-4 text-blue-500" />;
      case 'behavioral':
        return <RxPerson className="w-4 h-4 text-purple-500" />;
      case 'project':
        return <RxBackpack className="w-4 h-4 text-green-500" />;
      case 'skills':
        return <RxGear className="w-4 h-4 text-orange-500" />;
      case 'leadership':
        return <RxBadge className="w-4 h-4 text-red-500" />;
      case 'peer':
        return <RxShare1 className="w-4 h-4 text-teal-500" />;
      case 'upward':
        return <RxTriangleUp className="w-4 h-4 text-pink-500" />;
      case 'customer':
        return <RxHeart className="w-4 h-4 text-yellow-500" />;
      default:
        return <RxChatBubble className="w-4 h-4 text-gray-500" />;
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

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  // Calculate statistics
  const totalFeedback = feedbackList.length;
  const pendingFeedback = feedbackList.filter(
    (f) => f.status === 'draft' || f.status === 'pending_review' || f.status === 'submitted'
  ).length;
  const positiveFeedback = feedbackList.filter(
    (f) => f.feedbackCategory === 'positive' || f.feedbackCategory === 'recognition'
  ).length;
  const avgRating = feedbackList.reduce((sum, f) => sum + f.overallRating, 0) / feedbackList.length;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredFeedback.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority and Confidential Indicators */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(feedback.priority)}`}></div>
            {feedback.isConfidential && <RxIdCard className="w-4 h-4 text-orange-500" title="Confidential" />}
            {feedback.isAnonymous && <RxPerson className="w-4 h-4 text-gray-500" title="Anonymous" />}
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Feedback Participants */}
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={feedback.feedbackGiver.avatar}
                alt={feedback.feedbackGiver.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <RxArrowRight className="w-4 h-4 text-gray-400" />
              <img
                src={feedback.feedbackReceiver.avatar}
                alt={feedback.feedbackReceiver.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex items-center space-x-2">{getStatusIcon(feedback.status)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                From: {feedback.isAnonymous ? 'Anonymous' : feedback.feedbackGiver.name}
              </p>
              <p className="text-sm font-medium text-gray-900">To: {feedback.feedbackReceiver.name}</p>
              <p className="text-xs text-gray-500">{feedback.feedbackReceiver.department}</p>
            </div>
          </div>

          {/* Feedback Type and Category */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              {getTypeIcon(feedback.feedbackType)}
              <Chip
                label={feedback.feedbackType.charAt(0).toUpperCase() + feedback.feedbackType.slice(1)}
                size="small"
                variant="outlined"
              />
              <Chip
                label={feedback.feedbackCategory.charAt(0).toUpperCase() + feedback.feedbackCategory.slice(1)}
                size="small"
                color={getCategoryColor(feedback.feedbackCategory)}
              />
            </div>
          </div>

          {/* Feedback Title and Description */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 text-base mb-2">{feedback.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{feedback.description}</p>
          </div>

          {/* Overall Rating */}
          {feedback.overallRating > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Overall Rating</span>
                <span className={`text-sm font-bold ${getRatingColor(feedback.overallRating)}`}>
                  {feedback.overallRating.toFixed(1)}/5.0
                </span>
              </div>
              <div className="flex items-center space-x-1">{renderStars(Math.round(feedback.overallRating))}</div>
            </div>
          )}

          {/* Context Information */}
          {feedback.context && Object.keys(feedback.context).length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Context</p>
              {feedback.context.projectName && (
                <p className="text-sm text-gray-700">Project: {feedback.context.projectName}</p>
              )}
              {feedback.context.reviewCycle && (
                <p className="text-sm text-gray-700">Review: {feedback.context.reviewCycle}</p>
              )}
            </div>
          )}

          {/* Key Areas */}
          {feedback.feedbackAreas.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Key Areas ({feedback.feedbackAreas.length})</p>
              <div className="space-y-1">
                {feedback.feedbackAreas.slice(0, 2).map((area, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{area.area}</span>
                    <div className="flex items-center space-x-1">{renderStars(area.rating)}</div>
                  </div>
                ))}
                {feedback.feedbackAreas.length > 2 && (
                  <p className="text-xs text-gray-500">+{feedback.feedbackAreas.length - 2} more areas</p>
                )}
              </div>
            </div>
          )}

          {/* Action Items */}
          {feedback.actionItems.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Action Items ({feedback.actionItems.length})</p>
              <div className="space-y-1">
                {feedback.actionItems.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === 'completed'
                          ? 'bg-green-500'
                          : item.status === 'in_progress'
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                      }`}
                    ></div>
                    <span className="text-gray-600 truncate">{item.description}</span>
                  </div>
                ))}
                {feedback.actionItems.length > 2 && (
                  <p className="text-xs text-gray-500">+{feedback.actionItems.length - 2} more</p>
                )}
              </div>
            </div>
          )}

          {/* Response Status */}
          {feedback.requiresResponse && (
            <div className="mb-4 p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {feedback.response ? (
                  <>
                    <RxCheckCircled className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-700 font-medium">Response Submitted</span>
                  </>
                ) : (
                  <>
                    <RxTimer className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-blue-700 font-medium">Response Required</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Helpfulness Rating */}
          {feedback.helpfulnessRating && (
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Helpfulness</span>
                <div className="flex items-center space-x-1">{renderStars(feedback.helpfulnessRating)}</div>
              </div>
            </div>
          )}

          {/* Tags */}
          {feedback.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {feedback.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
                {feedback.tags.length > 3 && <span className="text-xs text-gray-500">+{feedback.tags.length - 3}</span>}
              </div>
            </div>
          )}

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1).replace('_', ' ')}
              size="small"
              color={getStatusColor(feedback.status)}
              variant="filled"
            />
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxChatBubble className="w-4 h-4" />
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
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feedback Flow
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Category
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title & Context
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating & Areas
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status & Response
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions & Follow-up
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFeedback.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <img
                        src={feedback.feedbackGiver.avatar}
                        alt={feedback.feedbackGiver.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <RxArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="relative">
                        <img
                          src={feedback.feedbackReceiver.avatar}
                          alt={feedback.feedbackReceiver.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(feedback.priority)}`}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-gray-500">
                        {feedback.isAnonymous ? 'Anonymous' : feedback.feedbackGiver.name}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{feedback.feedbackReceiver.name}</div>
                      <div className="text-xs text-gray-500">{feedback.feedbackReceiver.department}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {getTypeIcon(feedback.feedbackType)}
                    <span className="text-sm font-medium text-gray-900 capitalize">{feedback.feedbackType}</span>
                  </div>
                  <Chip
                    label={feedback.feedbackCategory.charAt(0).toUpperCase() + feedback.feedbackCategory.slice(1)}
                    size="small"
                    color={getCategoryColor(feedback.feedbackCategory)}
                    variant="filled"
                  />
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {feedback.isConfidential && <RxIdCard className="w-3 h-3 text-orange-500" title="Confidential" />}
                    {feedback.isAnonymous && <RxPerson className="w-3 h-3 text-gray-500" title="Anonymous" />}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900 line-clamp-2">{feedback.title}</div>
                  {feedback.context?.projectName && (
                    <div className="text-xs text-blue-600 mt-1">{feedback.context.projectName}</div>
                  )}
                  {feedback.context?.reviewCycle && (
                    <div className="text-xs text-gray-500">{feedback.context.reviewCycle}</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {feedback.overallRating > 0 ? (
                    <div>
                      <div className={`text-lg font-bold ${getRatingColor(feedback.overallRating)}`}>
                        {feedback.overallRating.toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        {renderStars(Math.round(feedback.overallRating))}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No rating</span>
                  )}
                  <div className="text-xs text-gray-500 mt-1">{feedback.feedbackAreas.length} areas</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {getStatusIcon(feedback.status)}
                    <Chip
                      label={feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1).replace('_', ' ')}
                      size="small"
                      color={getStatusColor(feedback.status)}
                      variant="filled"
                    />
                  </div>
                  {feedback.requiresResponse && (
                    <div className="flex items-center justify-center space-x-1">
                      {feedback.response ? (
                        <RxCheckCircled className="w-4 h-4 text-green-500" />
                      ) : (
                        <RxTimer className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-xs text-gray-600">
                        {feedback.response ? 'Responded' : 'Response Needed'}
                      </span>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{feedback.actionItems.length} actions</div>
                  {feedback.actionItems.length > 0 && (
                    <div className="text-xs text-gray-500">
                      {feedback.actionItems.filter((a) => a.status === 'completed').length} completed
                    </div>
                  )}
                  {feedback.followUpRequired && (
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <RxCalendar className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-600">Follow-up</span>
                    </div>
                  )}
                  {feedback.helpfulnessRating && (
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <RxHeart className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-gray-600">{feedback.helpfulnessRating}/5</span>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxChatBubble className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Feedback System</h1>
            <p className="text-gray-600">
              Comprehensive feedback management for continuous improvement and development
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{currentTime.toLocaleTimeString()}</div>
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
              <p className="text-sm font-medium text-gray-500">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{totalFeedback}</p>
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
              <p className="text-2xl font-bold text-gray-900">{pendingFeedback}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxHeart className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Positive</p>
              <p className="text-2xl font-bold text-gray-900">{positiveFeedback}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxStar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
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
            <span>Give Feedback</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxChatBubble className="w-4 h-4" />
            <span>360° Feedback</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxFileText className="w-4 h-4" />
            <span>Templates</span>
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

          {/* Type Filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {types.map((type) => (
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
              placeholder="Search feedback..."
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
          Showing {filteredFeedback.length} of {feedbackList.length} feedback entries
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default FeedbackSystem;
