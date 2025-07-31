import React, { useEffect, useState } from 'react';
import {
  RxBackpack,
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
  RxLightningBolt,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxRows,
  RxTarget,
  RxTimer,
  RxTriangleUp,
} from 'react-icons/rx';

interface Goal {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  email: string;
  department: string;
  designation: string;
  managerId: string;
  managerName: string;

  // Goal Information
  title: string;
  description: string;
  category: 'performance' | 'development' | 'behavioral' | 'technical' | 'leadership' | 'innovation';
  type: 'individual' | 'team' | 'departmental' | 'organizational';

  // SMART Criteria
  smart: {
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
  };

  // Progress and Measurement
  targetValue: string;
  currentValue: string;
  unit: string;
  progressPercentage: number;
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    targetDate: string;
    completedDate?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  }>;

  // Timeline
  startDate: string;
  endDate: string;
  reviewDates: string[];
  lastReviewDate?: string;
  nextReviewDate?: string;

  // Status and Priority
  status: 'draft' | 'active' | 'on_track' | 'at_risk' | 'behind' | 'completed' | 'cancelled' | 'paused';
  priority: 'high' | 'medium' | 'low';
  weight: number; // Percentage weight in overall performance

  // Achievement
  achievementLevel: 'exceeded' | 'met' | 'partially_met' | 'not_met' | 'pending';
  score: number; // 1-5 scale

  // Alignment
  alignedWith: {
    companyGoals: string[];
    departmentGoals: string[];
    teamGoals: string[];
  };

  // Support and Resources
  requiredResources: string[];
  supportNeeded: string[];
  trainingRequired: string[];

  // Feedback and Updates
  updates: Array<{
    id: string;
    date: string;
    author: string;
    authorRole: 'employee' | 'manager' | 'hr';
    content: string;
    progressUpdate?: number;
  }>;

  feedback: {
    employeeFeedback: string;
    managerFeedback: string;
    challenges: string[];
    suggestions: string[];
  };

  // Administrative
  createdBy: string;
  createdDate: string;
  lastModified: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedDate: string;
    uploadedBy: string;
  }>;

  tags: string[];
  notes: string;
}

const GoalSetting: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
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

  // Mock goals data
  const goals: Goal[] = [
    {
      id: 'GOAL001',
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'rahul.sharma@company.com',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      managerId: 'MGR001',
      managerName: 'Priya Singh',
      title: 'Complete React Migration Project',
      description:
        'Lead the migration of legacy components to React framework to improve application performance and maintainability',
      category: 'performance',
      type: 'individual',
      smart: {
        specific: 'Migrate all 50 legacy JavaScript components to React framework',
        measurable: '50 components migrated with 95% test coverage',
        achievable: 'Based on current team capacity and 6-month timeline',
        relevant: 'Aligns with company tech stack modernization strategy',
        timeBound: 'Complete by December 31, 2025',
      },
      targetValue: '50',
      currentValue: '47',
      unit: 'components',
      progressPercentage: 94,
      milestones: [
        {
          id: 'M001',
          title: 'Planning and Architecture',
          description: 'Define migration strategy and component prioritization',
          targetDate: '2025-08-15',
          completedDate: '2025-08-10',
          status: 'completed',
        },
        {
          id: 'M002',
          title: 'Core Components Migration',
          description: 'Migrate 30 core components',
          targetDate: '2025-10-15',
          completedDate: '2025-10-12',
          status: 'completed',
        },
        {
          id: 'M003',
          title: 'Testing and QA',
          description: 'Complete testing for all migrated components',
          targetDate: '2025-11-30',
          status: 'in_progress',
        },
        {
          id: 'M004',
          title: 'Production Deployment',
          description: 'Deploy all migrated components to production',
          targetDate: '2025-12-31',
          status: 'pending',
        },
      ],
      startDate: '2025-07-01',
      endDate: '2025-12-31',
      reviewDates: ['2025-08-31', '2025-10-31', '2025-12-31'],
      lastReviewDate: '2025-10-31',
      nextReviewDate: '2025-12-31',
      status: 'on_track',
      priority: 'high',
      weight: 40,
      achievementLevel: 'pending',
      score: 0,
      alignedWith: {
        companyGoals: ['Technology Modernization', 'Performance Improvement'],
        departmentGoals: ['Frontend Architecture Upgrade'],
        teamGoals: ['React Adoption'],
      },
      requiredResources: ['React training materials', 'Additional testing tools', 'Code review time'],
      supportNeeded: ['Architecture guidance', 'QA support'],
      trainingRequired: ['Advanced React patterns', 'Testing best practices'],
      updates: [
        {
          id: 'U001',
          date: '2025-10-31',
          author: 'Rahul Sharma',
          authorRole: 'employee',
          content: 'Completed 47 out of 50 components. On track to finish by deadline.',
          progressUpdate: 94,
        },
        {
          id: 'U002',
          date: '2025-10-15',
          author: 'Priya Singh',
          authorRole: 'manager',
          content: 'Excellent progress. Quality of migrated components is very high.',
        },
      ],
      feedback: {
        employeeFeedback: 'Project is going well. Need more QA support for final testing phase.',
        managerFeedback: 'Outstanding technical execution. Leadership in this project has been exemplary.',
        challenges: ['Legacy code complexity', 'Limited QA resources'],
        suggestions: ['Add more automated testing', 'Create migration documentation'],
      },
      createdBy: 'Priya Singh',
      createdDate: '2025-07-01',
      lastModified: '2025-10-31',
      documents: [
        {
          id: 'DOC001',
          name: 'Migration Strategy Document',
          type: 'PDF',
          uploadedDate: '2025-07-15',
          uploadedBy: 'Rahul Sharma',
        },
      ],
      tags: ['React', 'Migration', 'Frontend'],
      notes: 'Key project for Q4 delivery',
    },
    {
      id: 'GOAL002',
      employeeId: 'EMP002',
      employeeName: 'Meera Patel',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'meera.patel@company.com',
      department: 'Marketing',
      designation: 'Marketing Manager',
      managerId: 'MGR002',
      managerName: 'Rohit Kumar',
      title: 'Increase Brand Awareness Through Digital Campaigns',
      description:
        'Develop and execute comprehensive digital marketing campaigns to increase brand visibility and engagement across all digital channels',
      category: 'performance',
      type: 'individual',
      smart: {
        specific: 'Increase brand awareness metrics through targeted digital campaigns',
        measurable: '25% increase in brand awareness score and 40% growth in social media engagement',
        achievable: 'Based on current marketing budget and team resources',
        relevant: 'Directly supports company growth and market expansion goals',
        timeBound: 'Achieve targets by December 31, 2025',
      },
      targetValue: '25',
      currentValue: '32',
      unit: '% increase',
      progressPercentage: 128,
      milestones: [
        {
          id: 'M005',
          title: 'Campaign Strategy Development',
          description: 'Create comprehensive digital marketing strategy',
          targetDate: '2025-08-01',
          completedDate: '2025-07-28',
          status: 'completed',
        },
        {
          id: 'M006',
          title: 'Q3 Campaign Launch',
          description: 'Launch major brand awareness campaign',
          targetDate: '2025-09-01',
          completedDate: '2025-08-30',
          status: 'completed',
        },
        {
          id: 'M007',
          title: 'Mid-Campaign Analysis',
          description: 'Analyze campaign performance and optimize',
          targetDate: '2025-10-31',
          completedDate: '2025-10-25',
          status: 'completed',
        },
        {
          id: 'M008',
          title: 'Year-End Assessment',
          description: 'Final campaign assessment and reporting',
          targetDate: '2025-12-31',
          status: 'pending',
        },
      ],
      startDate: '2025-07-01',
      endDate: '2025-12-31',
      reviewDates: ['2025-09-30', '2025-12-31'],
      lastReviewDate: '2025-09-30',
      nextReviewDate: '2025-12-31',
      status: 'on_track',
      priority: 'high',
      weight: 35,
      achievementLevel: 'exceeded',
      score: 4.8,
      alignedWith: {
        companyGoals: ['Market Expansion', 'Brand Growth'],
        departmentGoals: ['Digital Marketing Excellence'],
        teamGoals: ['Brand Awareness'],
      },
      requiredResources: ['Marketing automation tools', 'Creative design support', 'Analytics platform'],
      supportNeeded: ['Creative team collaboration', 'Data analytics support'],
      trainingRequired: ['Advanced analytics', 'Marketing automation'],
      updates: [
        {
          id: 'U003',
          date: '2025-10-30',
          author: 'Meera Patel',
          authorRole: 'employee',
          content: 'Exceeded brand awareness target by 7%. Campaigns performing better than expected.',
          progressUpdate: 128,
        },
      ],
      feedback: {
        employeeFeedback: 'Campaigns are performing exceptionally well. Ready to expand to new channels.',
        managerFeedback: 'Outstanding results. Meera has exceeded all expectations.',
        challenges: ['Scaling creative content production'],
        suggestions: ['Expand to video marketing', 'Explore influencer partnerships'],
      },
      createdBy: 'Rohit Kumar',
      createdDate: '2025-07-01',
      lastModified: '2025-10-30',
      documents: [
        {
          id: 'DOC002',
          name: 'Digital Marketing Strategy',
          type: 'PDF',
          uploadedDate: '2025-07-28',
          uploadedBy: 'Meera Patel',
        },
      ],
      tags: ['Digital Marketing', 'Brand Awareness', 'Campaigns'],
      notes: 'Exceeding expectations - consider stretch goals',
    },
    {
      id: 'GOAL003',
      employeeId: 'EMP003',
      employeeName: 'Arjun Reddy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      email: 'arjun.reddy@company.com',
      department: 'Finance',
      designation: 'Financial Analyst',
      managerId: 'MGR003',
      managerName: 'Deepika Iyer',
      title: 'Automate Financial Reporting Process',
      description:
        'Implement automation solutions to streamline monthly financial reporting and reduce manual effort by 50%',
      category: 'technical',
      type: 'individual',
      smart: {
        specific: 'Automate monthly financial reports using Python and Excel VBA',
        measurable: '50% reduction in reporting time from 40 hours to 20 hours per month',
        achievable: 'Have programming skills and management support',
        relevant: 'Improves efficiency and reduces errors in financial reporting',
        timeBound: 'Complete automation by November 30, 2025',
      },
      targetValue: '50',
      currentValue: '30',
      unit: '% time reduction',
      progressPercentage: 60,
      milestones: [
        {
          id: 'M009',
          title: 'Process Analysis',
          description: 'Analyze current reporting process and identify automation opportunities',
          targetDate: '2025-08-15',
          completedDate: '2025-08-12',
          status: 'completed',
        },
        {
          id: 'M010',
          title: 'Automation Development',
          description: 'Develop Python scripts for data processing',
          targetDate: '2025-10-15',
          status: 'in_progress',
        },
        {
          id: 'M011',
          title: 'Testing and Validation',
          description: 'Test automation scripts with real data',
          targetDate: '2025-11-15',
          status: 'pending',
        },
        {
          id: 'M012',
          title: 'Production Implementation',
          description: 'Deploy automation to production environment',
          targetDate: '2025-11-30',
          status: 'pending',
        },
      ],
      startDate: '2025-08-01',
      endDate: '2025-11-30',
      reviewDates: ['2025-09-30', '2025-11-30'],
      lastReviewDate: '2025-09-30',
      nextReviewDate: '2025-11-30',
      status: 'behind',
      priority: 'medium',
      weight: 25,
      achievementLevel: 'pending',
      score: 0,
      alignedWith: {
        companyGoals: ['Process Efficiency', 'Digital Transformation'],
        departmentGoals: ['Financial Operations Excellence'],
        teamGoals: ['Automation Initiative'],
      },
      requiredResources: ['Python development environment', 'Database access', 'Training time'],
      supportNeeded: ['IT support for system access', 'Additional Python training'],
      trainingRequired: ['Advanced Python programming', 'Database management'],
      updates: [
        {
          id: 'U004',
          date: '2025-10-31',
          author: 'Arjun Reddy',
          authorRole: 'employee',
          content: 'Progress slower than expected due to data complexity. May need timeline extension.',
          progressUpdate: 60,
        },
      ],
      feedback: {
        employeeFeedback: 'Learning curve steeper than expected. Need more technical support.',
        managerFeedback: 'Good effort but timeline may need adjustment. Consider additional resources.',
        challenges: ['Complex data structures', 'Limited programming experience'],
        suggestions: ['Pair programming with senior developer', 'Extended timeline'],
      },
      createdBy: 'Deepika Iyer',
      createdDate: '2025-08-01',
      lastModified: '2025-10-31',
      documents: [],
      tags: ['Automation', 'Python', 'Finance'],
      notes: 'May need timeline adjustment and additional support',
    },
    {
      id: 'GOAL004',
      employeeId: 'EMP004',
      employeeName: 'Kavya Nair',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'kavya.nair@company.com',
      department: 'Design',
      designation: 'UX Designer',
      managerId: 'MGR004',
      managerName: 'Lisa Anderson',
      title: 'Master Company Design System',
      description:
        'Become proficient in company design system and contribute to design consistency across all digital products',
      category: 'development',
      type: 'individual',
      smart: {
        specific: 'Learn and apply company design system to all design projects',
        measurable: 'Complete design system certification and apply to 5 projects',
        achievable: 'With dedicated learning time and mentor support',
        relevant: 'Essential for role effectiveness and design quality',
        timeBound: 'Achieve proficiency by December 15, 2025',
      },
      targetValue: '5',
      currentValue: '2',
      unit: 'projects',
      progressPercentage: 40,
      milestones: [
        {
          id: 'M013',
          title: 'Design System Training',
          description: 'Complete comprehensive design system training course',
          targetDate: '2025-09-15',
          completedDate: '2025-09-10',
          status: 'completed',
        },
        {
          id: 'M014',
          title: 'First Project Application',
          description: 'Apply design system to first assigned project',
          targetDate: '2025-10-15',
          completedDate: '2025-10-12',
          status: 'completed',
        },
        {
          id: 'M015',
          title: 'Design System Certification',
          description: 'Pass design system proficiency assessment',
          targetDate: '2025-11-30',
          status: 'in_progress',
        },
        {
          id: 'M016',
          title: 'Advanced Application',
          description: 'Lead design system implementation in complex project',
          targetDate: '2025-12-15',
          status: 'pending',
        },
      ],
      startDate: '2025-08-20',
      endDate: '2025-12-15',
      reviewDates: ['2025-10-31', '2025-12-15'],
      lastReviewDate: '2025-10-31',
      nextReviewDate: '2025-12-15',
      status: 'on_track',
      priority: 'high',
      weight: 30,
      achievementLevel: 'pending',
      score: 0,
      alignedWith: {
        companyGoals: ['Design Excellence', 'Product Quality'],
        departmentGoals: ['Design Consistency'],
        teamGoals: ['Design System Adoption'],
      },
      requiredResources: ['Design system documentation', 'Figma advanced features', 'Mentor time'],
      supportNeeded: ['Senior designer mentorship', 'Regular feedback sessions'],
      trainingRequired: ['Design system best practices', 'Advanced Figma techniques'],
      updates: [
        {
          id: 'U005',
          date: '2025-10-31',
          author: 'Kavya Nair',
          authorRole: 'employee',
          content: 'Completed training and first project. Working on certification assessment.',
          progressUpdate: 40,
        },
      ],
      feedback: {
        employeeFeedback: 'Learning a lot and enjoying the systematic approach to design.',
        managerFeedback: 'Good progress. Design quality has improved significantly.',
        challenges: ['Complex component interactions', 'Balancing creativity with system constraints'],
        suggestions: ['More hands-on practice', 'Collaborative design sessions'],
      },
      createdBy: 'Lisa Anderson',
      createdDate: '2025-08-20',
      lastModified: '2025-10-31',
      documents: [
        {
          id: 'DOC003',
          name: 'Design System Guide',
          type: 'PDF',
          uploadedDate: '2025-08-25',
          uploadedBy: 'Lisa Anderson',
        },
      ],
      tags: ['Design System', 'Learning', 'UX'],
      notes: 'New team member showing good progress',
    },
    {
      id: 'GOAL005',
      employeeId: 'EMP005',
      employeeName: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'vikram.singh@company.com',
      department: 'Sales',
      designation: 'Sales Manager',
      managerId: 'MGR005',
      managerName: 'Rajesh Kumar',
      title: 'Achieve Q4 Sales Target',
      description:
        'Drive sales team to achieve aggressive Q4 revenue targets and establish foundation for next year growth',
      category: 'performance',
      type: 'team',
      smart: {
        specific: 'Achieve ₹2.5 crore in Q4 sales revenue with team of 8 sales representatives',
        measurable: '₹2.5 crore revenue with 15% increase from Q3',
        achievable: 'Based on pipeline analysis and market conditions',
        relevant: 'Critical for annual revenue goals and team bonus eligibility',
        timeBound: 'Complete by December 31, 2025',
      },
      targetValue: '2.5',
      currentValue: '1.8',
      unit: 'crore ₹',
      progressPercentage: 72,
      milestones: [
        {
          id: 'M017',
          title: 'Q4 Strategy Planning',
          description: 'Develop comprehensive Q4 sales strategy and territory assignments',
          targetDate: '2025-10-05',
          completedDate: '2025-10-03',
          status: 'completed',
        },
        {
          id: 'M018',
          title: 'October Targets',
          description: 'Achieve ₹80 lakh in October sales',
          targetDate: '2025-10-31',
          completedDate: '2025-10-31',
          status: 'completed',
        },
        {
          id: 'M019',
          title: 'November Targets',
          description: 'Achieve ₹85 lakh in November sales',
          targetDate: '2025-11-30',
          status: 'in_progress',
        },
        {
          id: 'M020',
          title: 'December Sprint',
          description: 'Achieve ₹85 lakh in December to meet Q4 target',
          targetDate: '2025-12-31',
          status: 'pending',
        },
      ],
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      reviewDates: ['2025-10-31', '2025-11-30', '2025-12-31'],
      lastReviewDate: '2025-10-31',
      nextReviewDate: '2025-11-30',
      status: 'at_risk',
      priority: 'high',
      weight: 50,
      achievementLevel: 'pending',
      score: 0,
      alignedWith: {
        companyGoals: ['Revenue Growth', 'Market Expansion'],
        departmentGoals: ['Sales Excellence'],
        teamGoals: ['Q4 Revenue Target'],
      },
      requiredResources: ['CRM system access', 'Marketing support', 'Sales training materials'],
      supportNeeded: ['Marketing lead generation', 'Product demo support'],
      trainingRequired: ['Advanced sales techniques', 'Product knowledge update'],
      updates: [
        {
          id: 'U006',
          date: '2025-10-31',
          author: 'Vikram Singh',
          authorRole: 'employee',
          content: 'October target achieved. November looking challenging due to market conditions.',
          progressUpdate: 72,
        },
      ],
      feedback: {
        employeeFeedback: 'Market conditions tougher than expected. Need more marketing support.',
        managerFeedback: 'Good October performance. Need to intensify efforts for November.',
        challenges: ['Market saturation', 'Long sales cycles', 'Competition'],
        suggestions: ['Focus on existing clients', 'Accelerate pipeline conversion'],
      },
      createdBy: 'Rajesh Kumar',
      createdDate: '2025-10-01',
      lastModified: '2025-10-31',
      documents: [
        {
          id: 'DOC004',
          name: 'Q4 Sales Strategy',
          type: 'PDF',
          uploadedDate: '2025-10-05',
          uploadedBy: 'Vikram Singh',
        },
      ],
      tags: ['Sales', 'Revenue', 'Q4'],
      notes: 'Critical goal for year-end performance',
    },
  ];

  const statuses = ['all', 'draft', 'active', 'on_track', 'at_risk', 'behind', 'completed', 'cancelled', 'paused'];
  const categories = ['all', 'performance', 'development', 'behavioral', 'technical', 'leadership', 'innovation'];

  // Filter goals
  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || goal.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || goal.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'primary';
      case 'active':
        return 'primary';
      case 'on_track':
        return 'success';
      case 'at_risk':
        return 'warning';
      case 'behind':
        return 'error';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'paused':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      case 'active':
        return <RxTarget className="w-4 h-4 text-blue-500" />;
      case 'on_track':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'at_risk':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'behind':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'completed':
        return <RxBadge className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <RxCross2 className="w-4 h-4 text-red-600" />;
      case 'paused':
        return <RxTimer className="w-4 h-4 text-orange-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance':
        return <RxTriangleUp className="w-4 h-4 text-blue-500" />;
      case 'development':
        return <RxBackpack className="w-4 h-4 text-green-500" />;
      case 'behavioral':
        return <RxPerson className="w-4 h-4 text-purple-500" />;
      case 'technical':
        return <RxGear className="w-4 h-4 text-orange-500" />;
      case 'leadership':
        return <RxBadge className="w-4 h-4 text-red-500" />;
      case 'innovation':
        return <RxLightningBolt className="w-4 h-4 text-pink-500" />;
      default:
        return <RxTarget className="w-4 h-4 text-gray-500" />;
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

  const getProgressColor = (progress: number, status: string) => {
    if (status === 'completed') return 'bg-green-500';
    if (status === 'behind' || status === 'at_risk') return 'bg-red-500';
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'at_risk':
        return 'text-yellow-600';
      case 'overdue':
        return 'text-red-600';
      case 'pending':
        return 'text-gray-500';
      default:
        return 'text-gray-600';
    }
  };

  // Calculate statistics
  const totalGoals = goals.length;
  const activeGoals = goals.filter(
    (g) => g.status === 'active' || g.status === 'on_track' || g.status === 'at_risk' || g.status === 'behind'
  ).length;
  const completedGoals = goals.filter((g) => g.status === 'completed').length;
  const atRiskGoals = goals.filter((g) => g.status === 'at_risk' || g.status === 'behind').length;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredGoals.map((goal) => (
        <div
          key={goal.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority Indicator */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(goal.priority)}`}></div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Header with employee info and status */}
          <div className="flex items-start justify-between mb-4 pr-8">
            <div className="flex items-center space-x-3">
              <img src={goal.avatar} alt={goal.employeeName} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{goal.employeeName}</h3>
                <p className="text-sm text-gray-500">{goal.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">{getStatusIcon(goal.status)}</div>
          </div>

          {/* Department and Designation */}
          <div className="mb-4">
            <Chip label={goal.department} size="small" className="mb-2" variant="outlined" />
            <p className="text-sm text-gray-700 font-medium">{goal.designation}</p>
          </div>

          {/* Goal Title and Category */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              {getCategoryIcon(goal.category)}
              <span className="text-xs text-gray-500 capitalize">{goal.category}</span>
            </div>
            <h4 className="font-semibold text-gray-900 text-base mb-2">{goal.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{goal.description}</p>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-sm font-bold text-gray-900">{goal.progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(goal.progressPercentage, goal.status)}`}
                style={{ width: `${Math.min(goal.progressPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-1 text-xs text-gray-600">
              <span>
                {goal.currentValue} of {goal.targetValue} {goal.unit}
              </span>
              <span className="font-medium">Weight: {goal.weight}%</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{new Date(goal.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">End Date:</span>
                <span
                  className={`font-medium ${
                    new Date(goal.endDate) < currentTime && goal.status !== 'completed'
                      ? 'text-red-600'
                      : 'text-gray-900'
                  }`}
                >
                  {new Date(goal.endDate).toLocaleDateString()}
                </span>
              </div>
              {goal.nextReviewDate && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Review:</span>
                  <span className="font-medium">{new Date(goal.nextReviewDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Milestones */}
          {goal.milestones.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">
                Milestones ({goal.milestones.filter((m) => m.status === 'completed').length}/{goal.milestones.length})
              </p>
              <div className="space-y-1">
                {goal.milestones.slice(0, 3).map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 truncate">{milestone.title}</span>
                    <span className={`font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                      {milestone.status === 'completed'
                        ? '✓'
                        : milestone.status === 'in_progress'
                          ? '●'
                          : milestone.status === 'pending'
                            ? '!'
                            : milestone.status === 'overdue'
                              ? '✗'
                              : '○'}
                    </span>
                  </div>
                ))}
                {goal.milestones.length > 3 && (
                  <p className="text-xs text-gray-500">+{goal.milestones.length - 3} more milestones</p>
                )}
              </div>
            </div>
          )}

          {/* Alignment */}
          {goal.alignedWith.companyGoals.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Aligned with Company Goals</p>
              <div className="flex flex-wrap gap-1">
                {goal.alignedWith.companyGoals.slice(0, 2).map((companyGoal, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {companyGoal}
                  </span>
                ))}
                {goal.alignedWith.companyGoals.length > 2 && (
                  <span className="text-xs text-gray-500">+{goal.alignedWith.companyGoals.length - 2}</span>
                )}
              </div>
            </div>
          )}

          {/* Achievement Level */}
          {goal.achievementLevel !== 'pending' && (
            <div className="mb-4 p-2 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-700 font-medium">Achievement</span>
                <div className="flex items-center space-x-2">
                  <Chip
                    label={
                      goal.achievementLevel.charAt(0).toUpperCase() + goal.achievementLevel.slice(1).replace('_', ' ')
                    }
                    size="small"
                    color={
                      goal.achievementLevel === 'exceeded'
                        ? 'success'
                        : goal.achievementLevel === 'met'
                          ? 'success'
                          : goal.achievementLevel === 'partially_met'
                            ? 'warning'
                            : 'error'
                    }
                  />
                  {goal.score > 0 && (
                    <span className="text-sm font-bold text-green-900">{goal.score.toFixed(1)}/5.0</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={goal.status.charAt(0).toUpperCase() + goal.status.slice(1).replace('_', ' ')}
              size="small"
              color={getStatusColor(goal.status)}
              variant="filled"
            />
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxPencil1 className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxBarChart className="w-4 h-4" />
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
                Employee & Goal
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category & Type
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress & Timeline
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target vs Current
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Milestones
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Achievement
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGoals.map((goal) => (
              <tr key={goal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative">
                      <img src={goal.avatar} alt={goal.employeeName} className="w-10 h-10 rounded-full object-cover" />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(goal.priority)}`}
                      ></div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{goal.employeeName}</div>
                      <div className="text-sm text-gray-500">{goal.title}</div>
                      <div className="text-xs text-gray-400">{goal.department}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {getCategoryIcon(goal.category)}
                    <span className="text-sm font-medium text-gray-900 capitalize">{goal.category}</span>
                  </div>
                  <div className="text-xs text-gray-500 capitalize">{goal.type} Goal</div>
                  <div className="text-xs text-gray-500">Weight: {goal.weight}%</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mx-auto mb-1">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(goal.progressPercentage, goal.status)}`}
                      style={{ width: `${Math.min(goal.progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{goal.progressPercentage}%</div>
                  <div className="text-xs text-gray-500">{new Date(goal.startDate).toLocaleDateString()} -</div>
                  <div
                    className={`text-xs ${
                      new Date(goal.endDate) < currentTime && goal.status !== 'completed'
                        ? 'text-red-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {new Date(goal.endDate).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    {goal.currentValue} / {goal.targetValue}
                  </div>
                  <div className="text-xs text-gray-500">{goal.unit}</div>
                  <div className="text-xs text-gray-400">{goal.smart.measurable.substring(0, 30)}...</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    {goal.milestones.filter((m) => m.status === 'completed').length}/{goal.milestones.length}
                  </div>
                  <div className="text-xs text-gray-500">Completed</div>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {goal.milestones.slice(0, 4).map((milestone, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          milestone.status === 'completed'
                            ? 'bg-green-500'
                            : milestone.status === 'in_progress'
                              ? 'bg-blue-500'
                              : milestone.status === 'pending'
                                ? 'bg-yellow-500'
                                : milestone.status === 'overdue'
                                  ? 'bg-red-500'
                                  : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(goal.status)}
                    <Chip
                      label={goal.status.charAt(0).toUpperCase() + goal.status.slice(1).replace('_', ' ')}
                      size="small"
                      color={getStatusColor(goal.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {goal.achievementLevel !== 'pending' ? (
                    <div>
                      <Chip
                        label={
                          goal.achievementLevel.charAt(0).toUpperCase() +
                          goal.achievementLevel.slice(1).replace('_', ' ')
                        }
                        size="small"
                        color={
                          goal.achievementLevel === 'exceeded'
                            ? 'success'
                            : goal.achievementLevel === 'met'
                              ? 'success'
                              : goal.achievementLevel === 'partially_met'
                                ? 'warning'
                                : 'error'
                        }
                        variant="filled"
                      />
                      {goal.score > 0 && <div className="text-xs text-gray-600 mt-1">{goal.score.toFixed(1)}/5.0</div>}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">In Progress</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxPencil1 className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxBarChart className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                      <RxCalendar className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Goal Setting</h1>
            <p className="text-gray-600">Set, track, and achieve SMART goals to drive performance and growth[2][5]</p>
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
              <RxTarget className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Goals</p>
              <p className="text-2xl font-bold text-gray-900">{totalGoals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxTriangleUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Goals</p>
              <p className="text-2xl font-bold text-gray-900">{activeGoals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxCheckCircled className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedGoals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <RxTimer className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">At Risk</p>
              <p className="text-2xl font-bold text-gray-900">{atRiskGoals}</p>
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
            <span>New Goal</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxTarget className="w-4 h-4" />
            <span>Goal Templates</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>Progress Review</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxFileText className="w-4 h-4" />
            <span>SMART Builder</span>
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

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search goals..."
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
          Showing {filteredGoals.length} of {goals.length} goals
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default GoalSetting;
