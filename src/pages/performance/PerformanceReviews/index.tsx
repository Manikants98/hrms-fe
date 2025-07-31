import React, { useEffect, useState } from 'react';
import {
  RxBadge,
  RxBarChart,
  RxCalendar,
  RxCheckCircled,
  RxCross2,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
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

interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;

  // Review Information
  reviewPeriod: {
    startDate: string;
    endDate: string;
    type: 'quarterly' | 'annual' | 'mid_year' | 'probation' | 'project_based';
  };

  reviewType: 'self' | 'manager' | '360_degree' | 'peer' | 'upward';
  status: 'scheduled' | 'in_progress' | 'submitted' | 'completed' | 'overdue' | 'cancelled';

  // Reviewer Information
  reviewers: Array<{
    id: string;
    name: string;
    avatar: string;
    role: 'manager' | 'peer' | 'subordinate' | 'self';
    status: 'pending' | 'completed';
    submittedDate?: string;
  }>;

  // Goals and Objectives
  goals: Array<{
    id: string;
    title: string;
    description: string;
    category: 'performance' | 'development' | 'behavioral' | 'technical';
    targetValue: string;
    achievedValue: string;
    status: 'exceeded' | 'met' | 'partially_met' | 'not_met';
    weight: number;
    score: number;
  }>;

  // Core Competencies Assessment
  competencies: Array<{
    id: string;
    name: string;
    category: 'technical' | 'leadership' | 'communication' | 'teamwork' | 'problem_solving';
    rating: number; // 1-5 scale
    feedback: string;
    examples: string[];
  }>;

  // Performance Metrics
  metrics: {
    overallRating: number;
    categoryRatings: {
      qualityOfWork: number;
      productivity: number;
      communication: number;
      teamwork: number;
      leadership: number;
      initiative: number;
      reliability: number;
    };
    improvementAreas: string[];
    strengths: string[];
  };

  // Feedback and Comments
  feedback: {
    selfAssessment: string;
    managerFeedback: string;
    peerFeedback: string[];
    developmentSuggestions: string[];
    recognitions: string[];
  };

  // Development Planning
  developmentPlan: {
    careerGoals: string[];
    skillGaps: string[];
    trainingNeeds: string[];
    mentoringRequired: boolean;
    nextRoleReadiness: 'ready' | 'partially_ready' | 'needs_development';
    timelineForGrowth: string;
  };

  // Administrative
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completedDate?: string;
  notes: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedDate: string;
    uploadedBy: string;
  }>;

  createdDate: string;
  lastUpdated: string;
}

const PerformanceReviews: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [reviewTypeFilter, setReviewTypeFilter] = useState<string>('all');
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

  // Mock performance reviews data
  const performanceReviews: PerformanceReview[] = [
    {
      id: 'PR001',
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'rahul.sharma@company.com',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      joiningDate: '2022-03-15',
      reviewPeriod: {
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        type: 'quarterly',
      },
      reviewType: '360_degree',
      status: 'completed',
      reviewers: [
        {
          id: 'REV001',
          name: 'Priya Singh',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          role: 'manager',
          status: 'completed',
          submittedDate: '2025-07-15',
        },
        {
          id: 'REV002',
          name: 'Arjun Kumar',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          role: 'peer',
          status: 'completed',
          submittedDate: '2025-07-12',
        },
        {
          id: 'REV003',
          name: 'Rahul Sharma',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          role: 'self',
          status: 'completed',
          submittedDate: '2025-07-10',
        },
      ],
      goals: [
        {
          id: 'G001',
          title: 'Complete React Migration Project',
          description: 'Lead the migration of legacy components to React',
          category: 'performance',
          targetValue: '100% migration',
          achievedValue: '95% migration',
          status: 'partially_met',
          weight: 30,
          score: 4.2,
        },
        {
          id: 'G002',
          title: 'Improve Code Review Quality',
          description: 'Enhance code review process and reduce bug count',
          category: 'technical',
          targetValue: '< 5 bugs per sprint',
          achievedValue: '3 bugs per sprint',
          status: 'exceeded',
          weight: 25,
          score: 4.8,
        },
        {
          id: 'G003',
          title: 'Mentor Junior Developers',
          description: 'Guide and mentor 2 junior developers',
          category: 'development',
          targetValue: '2 developers',
          achievedValue: '3 developers',
          status: 'exceeded',
          weight: 20,
          score: 5.0,
        },
      ],
      competencies: [
        {
          id: 'C001',
          name: 'Technical Expertise',
          category: 'technical',
          rating: 4.5,
          feedback: 'Excellent technical skills with strong problem-solving abilities',
          examples: ['Led complex migration project', 'Implemented innovative solutions'],
        },
        {
          id: 'C002',
          name: 'Communication',
          category: 'communication',
          rating: 4.2,
          feedback: 'Clear communicator with good presentation skills',
          examples: ['Effective in team meetings', 'Great at explaining technical concepts'],
        },
        {
          id: 'C003',
          name: 'Leadership',
          category: 'leadership',
          rating: 4.0,
          feedback: 'Shows strong leadership potential in mentoring others',
          examples: ['Mentored junior developers successfully', 'Takes initiative in projects'],
        },
      ],
      metrics: {
        overallRating: 4.3,
        categoryRatings: {
          qualityOfWork: 4.5,
          productivity: 4.2,
          communication: 4.2,
          teamwork: 4.0,
          leadership: 4.0,
          initiative: 4.5,
          reliability: 4.3,
        },
        improvementAreas: ['Project deadline management', 'Cross-team collaboration'],
        strengths: ['Technical expertise', 'Mentoring skills', 'Problem-solving'],
      },
      feedback: {
        selfAssessment:
          'I believe I have made significant contributions to the team and have grown in my leadership capabilities.',
        managerFeedback:
          'Rahul is a high performer with excellent technical skills. He should focus on improving project timeline management.',
        peerFeedback: [
          'Great team player and always willing to help',
          'Strong technical knowledge and problem-solving skills',
        ],
        developmentSuggestions: ['Project management training', 'Advanced leadership workshop'],
        recognitions: ['Q2 Technical Excellence Award', 'Mentor of the Quarter'],
      },
      developmentPlan: {
        careerGoals: ['Team Lead role', 'Technical Architect position'],
        skillGaps: ['Project management', 'Strategic planning'],
        trainingNeeds: ['PMP certification', 'Leadership development program'],
        mentoringRequired: true,
        nextRoleReadiness: 'partially_ready',
        timelineForGrowth: '12-18 months',
      },
      priority: 'high',
      dueDate: '2025-07-31',
      completedDate: '2025-07-15',
      notes: 'High performer ready for advancement with some additional development',
      documents: [
        {
          id: 'DOC001',
          name: 'Q2 Performance Review',
          type: 'PDF',
          uploadedDate: '2025-07-15',
          uploadedBy: 'Priya Singh',
        },
      ],
      createdDate: '2025-07-01',
      lastUpdated: '2025-07-15',
    },
    {
      id: 'PR002',
      employeeId: 'EMP002',
      employeeName: 'Meera Patel',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'meera.patel@company.com',
      department: 'Marketing',
      designation: 'Marketing Manager',
      joiningDate: '2021-06-10',
      reviewPeriod: {
        startDate: '2025-01-01',
        endDate: '2025-06-30',
        type: 'mid_year',
      },
      reviewType: 'manager',
      status: 'completed',
      reviewers: [
        {
          id: 'REV004',
          name: 'Rohit Kumar',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          role: 'manager',
          status: 'completed',
          submittedDate: '2025-07-20',
        },
        {
          id: 'REV005',
          name: 'Meera Patel',
          avatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          role: 'self',
          status: 'completed',
          submittedDate: '2025-07-18',
        },
      ],
      goals: [
        {
          id: 'G004',
          title: 'Increase Brand Awareness',
          description: 'Improve brand visibility through digital campaigns',
          category: 'performance',
          targetValue: '25% increase',
          achievedValue: '32% increase',
          status: 'exceeded',
          weight: 35,
          score: 4.7,
        },
        {
          id: 'G005',
          title: 'Lead Generation',
          description: 'Generate qualified leads through marketing initiatives',
          category: 'performance',
          targetValue: '1000 leads',
          achievedValue: '1250 leads',
          status: 'exceeded',
          weight: 30,
          score: 4.8,
        },
      ],
      competencies: [
        {
          id: 'C004',
          name: 'Strategic Thinking',
          category: 'leadership',
          rating: 4.6,
          feedback: 'Excellent strategic planning and execution capabilities',
          examples: [
            'Developed comprehensive marketing strategy',
            'Successfully launched new campaigns',
          ],
        },
        {
          id: 'C005',
          name: 'Creative Problem Solving',
          category: 'problem_solving',
          rating: 4.5,
          feedback: 'Innovative approach to marketing challenges',
          examples: [
            'Created viral social media campaign',
            'Developed cost-effective marketing solutions',
          ],
        },
      ],
      metrics: {
        overallRating: 4.6,
        categoryRatings: {
          qualityOfWork: 4.7,
          productivity: 4.5,
          communication: 4.8,
          teamwork: 4.4,
          leadership: 4.6,
          initiative: 4.7,
          reliability: 4.5,
        },
        improvementAreas: ['Data analytics skills', 'Team delegation'],
        strengths: ['Creative thinking', 'Strategic planning', 'Campaign execution'],
      },
      feedback: {
        selfAssessment:
          'I am proud of exceeding my targets and delivering innovative campaigns that drove significant business growth.',
        managerFeedback:
          'Meera is an exceptional performer who consistently delivers outstanding results. Ready for senior leadership role.',
        peerFeedback: [
          'Inspiring leader and creative thinker',
          'Always delivers high-quality work',
        ],
        developmentSuggestions: ['Advanced analytics training', 'Executive leadership program'],
        recognitions: ['H1 Marketing Excellence Award', 'Campaign of the Year'],
      },
      developmentPlan: {
        careerGoals: ['Marketing Director role', 'Head of Digital Marketing'],
        skillGaps: ['Advanced data analytics', 'Budget management'],
        trainingNeeds: ['Google Analytics certification', 'Finance for non-finance managers'],
        mentoringRequired: false,
        nextRoleReadiness: 'ready',
        timelineForGrowth: '6-12 months',
      },
      priority: 'high',
      dueDate: '2025-07-31',
      completedDate: '2025-07-20',
      notes: 'Top performer ready for promotion to senior role',
      documents: [
        {
          id: 'DOC002',
          name: 'Mid-Year Performance Review',
          type: 'PDF',
          uploadedDate: '2025-07-20',
          uploadedBy: 'Rohit Kumar',
        },
      ],
      createdDate: '2025-07-05',
      lastUpdated: '2025-07-20',
    },
    {
      id: 'PR003',
      employeeId: 'EMP003',
      employeeName: 'Arjun Reddy',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      email: 'arjun.reddy@company.com',
      department: 'Finance',
      designation: 'Financial Analyst',
      joiningDate: '2023-01-15',
      reviewPeriod: {
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        type: 'quarterly',
      },
      reviewType: 'manager',
      status: 'in_progress',
      reviewers: [
        {
          id: 'REV006',
          name: 'Deepika Iyer',
          avatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          role: 'manager',
          status: 'pending',
        },
        {
          id: 'REV007',
          name: 'Arjun Reddy',
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          role: 'self',
          status: 'completed',
          submittedDate: '2025-07-25',
        },
      ],
      goals: [
        {
          id: 'G006',
          title: 'Financial Reporting Automation',
          description: 'Automate monthly financial reporting process',
          category: 'performance',
          targetValue: '50% time reduction',
          achievedValue: 'In progress',
          status: 'partially_met',
          weight: 40,
          score: 3.5,
        },
        {
          id: 'G007',
          title: 'Professional Development',
          description: 'Complete CFA Level 1 certification',
          category: 'development',
          targetValue: 'Pass CFA Level 1',
          achievedValue: 'Studying - exam in Dec',
          status: 'partially_met',
          weight: 30,
          score: 3.8,
        },
      ],
      competencies: [
        {
          id: 'C006',
          name: 'Analytical Skills',
          category: 'technical',
          rating: 4.0,
          feedback: 'Strong analytical capabilities with attention to detail',
          examples: ['Identified cost-saving opportunities', 'Improved forecast accuracy'],
        },
        {
          id: 'C007',
          name: 'Attention to Detail',
          category: 'technical',
          rating: 4.2,
          feedback: 'Excellent accuracy in financial analysis and reporting',
          examples: ['Zero errors in monthly reports', 'Thorough variance analysis'],
        },
      ],
      metrics: {
        overallRating: 3.8,
        categoryRatings: {
          qualityOfWork: 4.0,
          productivity: 3.8,
          communication: 3.5,
          teamwork: 3.7,
          leadership: 3.2,
          initiative: 3.8,
          reliability: 4.0,
        },
        improvementAreas: ['Communication skills', 'Leadership presence', 'Time management'],
        strengths: ['Analytical thinking', 'Attention to detail', 'Technical skills'],
      },
      feedback: {
        selfAssessment:
          'I have focused on improving my technical skills and am working towards completing my CFA certification.',
        managerFeedback: 'Pending manager review',
        peerFeedback: [],
        developmentSuggestions: ['Communication skills workshop', 'Time management training'],
        recognitions: ['Accuracy Award - Q1'],
      },
      developmentPlan: {
        careerGoals: ['Senior Financial Analyst', 'Finance Manager'],
        skillGaps: ['Leadership skills', 'Communication', 'Strategic thinking'],
        trainingNeeds: ['Leadership fundamentals', 'Presentation skills', 'Strategic finance'],
        mentoringRequired: true,
        nextRoleReadiness: 'needs_development',
        timelineForGrowth: '18-24 months',
      },
      priority: 'medium',
      dueDate: '2025-08-31',
      notes: 'Solid performer with strong technical skills, needs development in soft skills',
      documents: [],
      createdDate: '2025-07-20',
      lastUpdated: '2025-07-25',
    },
    {
      id: 'PR004',
      employeeId: 'EMP004',
      employeeName: 'Kavya Nair',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'kavya.nair@company.com',
      department: 'Design',
      designation: 'UX Designer',
      joiningDate: '2024-02-20',
      reviewPeriod: {
        startDate: '2025-05-20',
        endDate: '2025-08-20',
        type: 'probation',
      },
      reviewType: 'manager',
      status: 'scheduled',
      reviewers: [
        {
          id: 'REV008',
          name: 'Lisa Anderson',
          avatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          role: 'manager',
          status: 'pending',
        },
      ],
      goals: [
        {
          id: 'G008',
          title: 'Learn Design System',
          description: 'Master company design system and guidelines',
          category: 'development',
          targetValue: 'Full proficiency',
          achievedValue: 'Not started',
          status: 'not_met',
          weight: 30,
          score: 0,
        },
        {
          id: 'G009',
          title: 'Complete 3 Projects',
          description: 'Successfully deliver 3 design projects',
          category: 'performance',
          targetValue: '3 projects',
          achievedValue: 'Not started',
          status: 'not_met',
          weight: 40,
          score: 0,
        },
      ],
      competencies: [],
      metrics: {
        overallRating: 0,
        categoryRatings: {
          qualityOfWork: 0,
          productivity: 0,
          communication: 0,
          teamwork: 0,
          leadership: 0,
          initiative: 0,
          reliability: 0,
        },
        improvementAreas: [],
        strengths: [],
      },
      feedback: {
        selfAssessment: '',
        managerFeedback: '',
        peerFeedback: [],
        developmentSuggestions: [],
        recognitions: [],
      },
      developmentPlan: {
        careerGoals: ['Become proficient UX Designer', 'Contribute to major projects'],
        skillGaps: ['Company design system', 'Collaboration tools', 'Project workflow'],
        trainingNeeds: ['Design system training', 'Tool proficiency', 'Company culture'],
        mentoringRequired: true,
        nextRoleReadiness: 'needs_development',
        timelineForGrowth: '6-12 months',
      },
      priority: 'high',
      dueDate: '2025-08-20',
      notes: 'New employee - probation review pending',
      documents: [],
      createdDate: '2025-07-30',
      lastUpdated: '2025-07-30',
    },
    {
      id: 'PR005',
      employeeId: 'EMP005',
      employeeName: 'Vikram Singh',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'vikram.singh@company.com',
      department: 'Sales',
      designation: 'Sales Manager',
      joiningDate: '2020-09-10',
      reviewPeriod: {
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        type: 'quarterly',
      },
      reviewType: '360_degree',
      status: 'overdue',
      reviewers: [
        {
          id: 'REV009',
          name: 'Rajesh Kumar',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          role: 'manager',
          status: 'pending',
        },
        {
          id: 'REV010',
          name: 'Amit Sharma',
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          role: 'subordinate',
          status: 'pending',
        },
      ],
      goals: [
        {
          id: 'G010',
          title: 'Achieve Sales Target',
          description: 'Meet Q2 sales targets for the team',
          category: 'performance',
          targetValue: '₹50L revenue',
          achievedValue: 'TBD',
          status: 'not_met',
          weight: 50,
          score: 0,
        },
      ],
      competencies: [],
      metrics: {
        overallRating: 0,
        categoryRatings: {
          qualityOfWork: 0,
          productivity: 0,
          communication: 0,
          teamwork: 0,
          leadership: 0,
          initiative: 0,
          reliability: 0,
        },
        improvementAreas: [],
        strengths: [],
      },
      feedback: {
        selfAssessment: '',
        managerFeedback: '',
        peerFeedback: [],
        developmentSuggestions: [],
        recognitions: [],
      },
      developmentPlan: {
        careerGoals: [],
        skillGaps: [],
        trainingNeeds: [],
        mentoringRequired: false,
        nextRoleReadiness: 'needs_development',
        timelineForGrowth: '',
      },
      priority: 'high',
      dueDate: '2025-07-15',
      notes: 'Review overdue - requires immediate attention',
      documents: [],
      createdDate: '2025-07-01',
      lastUpdated: '2025-07-01',
    },
  ];

  const departments = [
    'all',
    ...Array.from(new Set(performanceReviews.map((review) => review.department))),
  ];
  const statuses = [
    'all',
    'scheduled',
    'in_progress',
    'submitted',
    'completed',
    'overdue',
    'cancelled',
  ];
  const reviewTypes = ['all', 'self', 'manager', '360_degree', 'peer', 'upward'];

  // Filter performance reviews
  const filteredReviews = performanceReviews.filter((review) => {
    const matchesSearch =
      review.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.notes.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === 'all' || review.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesReviewType = reviewTypeFilter === 'all' || review.reviewType === reviewTypeFilter;

    return matchesSearch && matchesDepartment && matchesStatus && matchesReviewType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'in_progress':
        return 'warning';
      case 'submitted':
        return 'primary';
      case 'completed':
        return 'success';
      case 'overdue':
        return 'error';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <RxCalendar className="w-4 h-4 text-blue-500" />;
      case 'in_progress':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'submitted':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'overdue':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'cancelled':
        return <RxCross2 className="w-4 h-4 text-red-600" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getReviewTypeIcon = (type: string) => {
    switch (type) {
      case 'self':
        return <RxPerson className="w-4 h-4 text-green-500" />;
      case 'manager':
        return <RxBadge className="w-4 h-4 text-blue-500" />;
      case '360_degree':
        return <RxTarget className="w-4 h-4 text-purple-500" />;
      case 'peer':
        return <RxShare1 className="w-4 h-4 text-orange-500" />;
      case 'upward':
        return <RxTriangleUp className="w-4 h-4 text-pink-500" />;
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

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'exceeded':
        return 'text-green-600';
      case 'met':
        return 'text-blue-600';
      case 'partially_met':
        return 'text-yellow-600';
      case 'not_met':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Calculate statistics
  const totalReviews = performanceReviews.length;
  const scheduledReviews = performanceReviews.filter(
    (r) => r.status === 'scheduled' || r.status === 'in_progress'
  ).length;
  const completedReviews = performanceReviews.filter((r) => r.status === 'completed').length;
  const overdueReviews = performanceReviews.filter((r) => r.status === 'overdue').length;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredReviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority Indicator */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(review.priority)}`}></div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Header with employee info and status */}
          <div className="flex items-start justify-between mb-4 pr-8">
            <div className="flex items-center space-x-3">
              <img
                src={review.avatar}
                alt={review.employeeName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{review.employeeName}</h3>
                <p className="text-sm text-gray-500">{review.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">{getStatusIcon(review.status)}</div>
          </div>

          {/* Department and Designation */}
          <div className="mb-4">
            <Chip label={review.department} size="small" className="mb-2" variant="outlined" />
            <p className="text-sm text-gray-700 font-medium">{review.designation}</p>
          </div>

          {/* Review Period & Type */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              {getReviewTypeIcon(review.reviewType)}
              <span className="text-sm font-medium text-gray-700 capitalize">
                {review.reviewType.replace('_', ' ')} Review
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Period:</span>
                <span className="font-medium capitalize">
                  {review.reviewPeriod.type.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span
                  className={`font-medium ${
                    new Date(review.dueDate) < currentTime && review.status !== 'completed'
                      ? 'text-red-600'
                      : 'text-gray-900'
                  }`}
                >
                  {new Date(review.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Rating */}
          {review.status === 'completed' && review.metrics.overallRating > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Overall Rating</span>
                <span className="text-sm font-bold text-gray-900">
                  {review.metrics.overallRating.toFixed(1)}/5.0
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${
                    review.metrics.overallRating >= 4
                      ? 'bg-green-500'
                      : review.metrics.overallRating >= 3
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${(review.metrics.overallRating / 5) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(Math.round(review.metrics.overallRating))}
              </div>
            </div>
          )}

          {/* Goals Progress */}
          {review.goals.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Goals Progress</p>
              <div className="space-y-1">
                {review.goals.slice(0, 2).map((goal, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 truncate">{goal.title}</span>
                    <span className={`font-medium ${getGoalStatusColor(goal.status)}`}>
                      {goal.status === 'exceeded'
                        ? '↗'
                        : goal.status === 'met'
                          ? '✓'
                          : goal.status === 'partially_met'
                            ? '~'
                            : '✗'}
                    </span>
                  </div>
                ))}
                {review.goals.length > 2 && (
                  <p className="text-xs text-gray-500">+{review.goals.length - 2} more goals</p>
                )}
              </div>
            </div>
          )}

          {/* Reviewers Status */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Review Progress</p>
            <div className="flex items-center space-x-2">
              {review.reviewers.map((reviewer, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <img
                    src={reviewer.avatar}
                    alt={reviewer.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span
                    className={`text-xs ${
                      reviewer.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {reviewer.status === 'completed' ? '✓' : '○'}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {review.reviewers.filter((r) => r.status === 'completed').length}/
              {review.reviewers.length} completed
            </div>
          </div>

          {/* Key Insights */}
          {review.status === 'completed' && (
            <div className="mb-4">
              {review.metrics.strengths.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-green-600 font-medium mb-1">Key Strengths:</p>
                  <div className="flex flex-wrap gap-1">
                    {review.metrics.strengths.slice(0, 2).map((strength, index) => (
                      <span
                        key={index}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                      >
                        {strength}
                      </span>
                    ))}
                    {review.metrics.strengths.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{review.metrics.strengths.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {review.metrics.improvementAreas.length > 0 && (
                <div>
                  <p className="text-xs text-orange-600 font-medium mb-1">Improvement Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {review.metrics.improvementAreas.slice(0, 2).map((area, index) => (
                      <span
                        key={index}
                        className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded"
                      >
                        {area}
                      </span>
                    ))}
                    {review.metrics.improvementAreas.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{review.metrics.improvementAreas.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Next Role Readiness */}
          {review.developmentPlan.nextRoleReadiness && (
            <div className="mb-4 p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-700 font-medium">Next Role Readiness</span>
                <Chip
                  label={
                    review.developmentPlan.nextRoleReadiness
                      .replace('_', ' ')
                      .charAt(0)
                      .toUpperCase() +
                    review.developmentPlan.nextRoleReadiness.replace('_', ' ').slice(1)
                  }
                  size="small"
                  color={
                    review.developmentPlan.nextRoleReadiness === 'ready'
                      ? 'success'
                      : review.developmentPlan.nextRoleReadiness === 'partially_ready'
                        ? 'warning'
                        : 'error'
                  }
                />
              </div>
            </div>
          )}

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={
                review.status.charAt(0).toUpperCase() + review.status.slice(1).replace('_', ' ')
              }
              size="small"
              color={getStatusColor(review.status)}
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
                <RxPencil1 className="w-4 h-4" />
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
                Review Details
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period & Due Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overall Rating
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Role Ready
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={review.avatar}
                        alt={review.employeeName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(review.priority)}`}
                      ></div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{review.employeeName}</div>
                      <div className="text-sm text-gray-500">
                        {review.employeeId} • {review.department}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {getReviewTypeIcon(review.reviewType)}
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {review.reviewType.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {review.reviewPeriod.type.replace('_', ' ')} Review
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">
                    {new Date(review.reviewPeriod.startDate).toLocaleDateString()} -
                  </div>
                  <div className="text-sm text-gray-900">
                    {new Date(review.reviewPeriod.endDate).toLocaleDateString()}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      new Date(review.dueDate) < currentTime && review.status !== 'completed'
                        ? 'text-red-600'
                        : 'text-gray-500'
                    }`}
                  >
                    Due: {new Date(review.dueDate).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    {review.reviewers.filter((r) => r.status === 'completed').length}/
                    {review.reviewers.length}
                  </div>
                  <div className="text-xs text-gray-500">Reviews</div>
                  {review.goals.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {
                        review.goals.filter((g) => g.status === 'exceeded' || g.status === 'met')
                          .length
                      }
                      /{review.goals.length} Goals
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {review.status === 'completed' && review.metrics.overallRating > 0 ? (
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {review.metrics.overallRating.toFixed(1)}/5.0
                      </div>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        {renderStars(Math.round(review.metrics.overallRating))}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Not completed</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(review.status)}
                    <Chip
                      label={
                        review.status.charAt(0).toUpperCase() +
                        review.status.slice(1).replace('_', ' ')
                      }
                      size="small"
                      color={getStatusColor(review.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {review.developmentPlan.nextRoleReadiness ? (
                    <Chip
                      label={
                        review.developmentPlan.nextRoleReadiness
                          .replace('_', ' ')
                          .charAt(0)
                          .toUpperCase() +
                        review.developmentPlan.nextRoleReadiness.replace('_', ' ').slice(1)
                      }
                      size="small"
                      color={
                        review.developmentPlan.nextRoleReadiness === 'ready'
                          ? 'success'
                          : review.developmentPlan.nextRoleReadiness === 'partially_ready'
                            ? 'warning'
                            : 'error'
                      }
                      variant="filled"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">TBD</span>
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
                      <RxPencil1 className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxBarChart className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Performance Reviews</h1>
            <p className="text-gray-600">
              Evaluate employee performance and drive career development
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
              <p className="text-sm font-medium text-gray-500">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxTimer className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{scheduledReviews}</p>
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
              <p className="text-2xl font-bold text-gray-900">{completedReviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <RxCrossCircled className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{overdueReviews}</p>
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
            <span>New Review</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxTarget className="w-4 h-4" />
            <span>Bulk Reviews</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxFileText className="w-4 h-4" />
            <span>Review Templates</span>
          </button>
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
                    : status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Review Type Filter */}
          <div className="relative">
            <select
              value={reviewTypeFilter}
              onChange={(e) => setReviewTypeFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {reviewTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'All Types'
                    : type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reviews..."
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
          Showing {filteredReviews.length} of {performanceReviews.length} performance reviews
          {departmentFilter !== 'all' && ` in ${departmentFilter}`}
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default PerformanceReviews;
