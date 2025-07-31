import React, { useEffect, useState } from 'react';
import {
  RxBadge,
  RxBarChart,
  RxCheckCircled,
  RxCrossCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxGrid,
  RxLightningBolt,
  RxMagnifyingGlass,
  RxMinus,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxRows,
  RxStar,
  RxStarFilled,
  RxTimer,
  RxTriangleUp,
} from 'react-icons/rx';

interface Appraisal {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  currentGrade: string;
  currentSalary: number;

  // Appraisal Cycle Information
  appraisalCycle: {
    id: string;
    name: string;
    period: 'annual' | 'quarterly' | 'half_yearly';
    startDate: string;
    endDate: string;
    type: 'promotion' | 'increment' | 'bonus' | 'comprehensive';
  };

  // Performance Metrics
  performanceMetrics: {
    overallRating: number; // 1-5 scale
    goalAchievement: number; // percentage
    competencyRating: number; // 1-5 scale
    behavioralRating: number; // 1-5 scale

    categoryRatings: {
      qualityOfWork: number;
      productivity: number;
      initiative: number;
      teamwork: number;
      communication: number;
      leadership: number;
      problemSolving: number;
      reliability: number;
    };

    kpiScores: Array<{
      id: string;
      name: string;
      target: number;
      achieved: number;
      score: number;
      weight: number;
    }>;
  };

  // Appraisal Recommendations
  recommendations: {
    salaryIncrease: {
      recommended: boolean;
      currentSalary: number;
      proposedSalary: number;
      increasePercentage: number;
      increaseAmount: number;
      effectiveDate: string;
      justification: string;
    };

    promotion: {
      recommended: boolean;
      currentGrade: string;
      proposedGrade: string;
      currentDesignation: string;
      proposedDesignation: string;
      effectiveDate: string;
      justification: string;
    };

    bonus: {
      recommended: boolean;
      bonusType: 'performance' | 'annual' | 'special' | 'retention';
      amount: number;
      percentage: number;
      justification: string;
    };

    developmentPlan: {
      trainingRequired: string[];
      skillGaps: string[];
      careerPath: string;
      mentoringNeeded: boolean;
      timeline: string;
    };
  };

  // Appraisal Process
  status: 'draft' | 'self_assessment' | 'manager_review' | 'hr_review' | 'approved' | 'rejected' | 'finalized';
  priority: 'high' | 'medium' | 'low';

  approvalWorkflow: Array<{
    level: number;
    approverRole: 'direct_manager' | 'department_head' | 'hr_manager' | 'ceo';
    approverName: string;
    approverId: string;
    status: 'pending' | 'approved' | 'rejected';
    comments: string;
    approvedDate?: string;
  }>;

  // Feedback and Comments
  feedback: {
    managerFeedback: string;
    hrFeedback: string;
    strengths: string[];
    improvementAreas: string[];
    achievements: string[];
    goals: string[];
  };

  // Comparative Analysis
  benchmarking: {
    departmentAverage: number;
    gradeAverage: number;
    companyAverage: number;
    percentileRank: number;
    topPerformer: boolean;
  };

  // Historical Data
  previousAppraisals: Array<{
    year: string;
    rating: number;
    salaryIncrease: number;
    promoted: boolean;
  }>;

  // Administrative
  conductedBy: {
    managerId: string;
    managerName: string;
    hrId: string;
    hrName: string;
  };

  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedDate: string;
    uploadedBy: string;
  }>;

  createdDate: string;
  reviewDate: string;
  finalizedDate?: string;
  lastUpdated: string;
  notes: string;
}

const Appraisals: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cycleFilter, setCycleFilter] = useState<string>('all');
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

  // Mock appraisals data
  const appraisals: Appraisal[] = [
    {
      id: 'APR001',
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'rahul.sharma@company.com',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      joiningDate: '2022-03-15',
      currentGrade: 'L4',
      currentSalary: 1200000,
      appraisalCycle: {
        id: 'CYCLE2025',
        name: 'Annual Appraisal 2025',
        period: 'annual',
        startDate: '2025-04-01',
        endDate: '2025-03-31',
        type: 'comprehensive',
      },
      performanceMetrics: {
        overallRating: 4.3,
        goalAchievement: 94,
        competencyRating: 4.5,
        behavioralRating: 4.2,
        categoryRatings: {
          qualityOfWork: 4.5,
          productivity: 4.2,
          initiative: 4.5,
          teamwork: 4.0,
          communication: 4.2,
          leadership: 4.0,
          problemSolving: 4.7,
          reliability: 4.3,
        },
        kpiScores: [
          {
            id: 'KPI001',
            name: 'Code Quality Score',
            target: 90,
            achieved: 95,
            score: 4.8,
            weight: 25,
          },
          {
            id: 'KPI002',
            name: 'Project Delivery',
            target: 100,
            achieved: 94,
            score: 4.2,
            weight: 30,
          },
          {
            id: 'KPI003',
            name: 'Team Mentoring',
            target: 2,
            achieved: 3,
            score: 5.0,
            weight: 20,
          },
        ],
      },
      recommendations: {
        salaryIncrease: {
          recommended: true,
          currentSalary: 1200000,
          proposedSalary: 1380000,
          increasePercentage: 15,
          increaseAmount: 180000,
          effectiveDate: '2025-08-01',
          justification:
            'Exceptional performance with 94% goal achievement and strong leadership in React migration project',
        },
        promotion: {
          recommended: true,
          currentGrade: 'L4',
          proposedGrade: 'L5',
          currentDesignation: 'Senior Software Engineer',
          proposedDesignation: 'Technical Lead',
          effectiveDate: '2025-08-01',
          justification: 'Demonstrated technical leadership and successfully mentored 3 junior developers',
        },
        bonus: {
          recommended: true,
          bonusType: 'performance',
          amount: 120000,
          percentage: 10,
          justification: 'Outstanding project delivery and exceeding all KPI targets',
        },
        developmentPlan: {
          trainingRequired: ['Executive Leadership Program', 'System Architecture'],
          skillGaps: ['People Management', 'Strategic Planning'],
          careerPath: 'Technical Lead → Engineering Manager → Director',
          mentoringNeeded: true,
          timeline: '12-18 months',
        },
      },
      status: 'approved',
      priority: 'high',
      approvalWorkflow: [
        {
          level: 1,
          approverRole: 'direct_manager',
          approverName: 'Priya Singh',
          approverId: 'MGR001',
          status: 'approved',
          comments: 'Excellent performance. Strongly recommend for promotion.',
          approvedDate: '2025-07-15',
        },
        {
          level: 2,
          approverRole: 'department_head',
          approverName: 'Rajesh Kumar',
          approverId: 'DEPT001',
          status: 'approved',
          comments: 'Top performer in the department. Approve all recommendations.',
          approvedDate: '2025-07-18',
        },
        {
          level: 3,
          approverRole: 'hr_manager',
          approverName: 'Anita Verma',
          approverId: 'HR001',
          status: 'approved',
          comments: 'Salary increase and promotion aligned with company guidelines.',
          approvedDate: '2025-07-20',
        },
      ],
      feedback: {
        managerFeedback:
          'Rahul has been exceptional this year. His technical expertise and leadership in the React migration project have been outstanding.',
        hrFeedback: 'Strong candidate for promotion. Compensation increase is well-justified based on performance.',
        strengths: ['Technical expertise', 'Mentoring skills', 'Problem-solving', 'Project leadership'],
        improvementAreas: ['Cross-functional collaboration', 'Time management'],
        achievements: ['React migration leadership', 'Mentored 3 developers', 'Zero critical bugs'],
        goals: ['Lead architecture decisions', 'Develop team management skills', 'Drive technical standards'],
      },
      benchmarking: {
        departmentAverage: 3.8,
        gradeAverage: 3.9,
        companyAverage: 3.7,
        percentileRank: 92,
        topPerformer: true,
      },
      previousAppraisals: [
        {
          year: '2024',
          rating: 4.1,
          salaryIncrease: 12,
          promoted: false,
        },
        {
          year: '2023',
          rating: 3.9,
          salaryIncrease: 10,
          promoted: true,
        },
      ],
      conductedBy: {
        managerId: 'MGR001',
        managerName: 'Priya Singh',
        hrId: 'HR001',
        hrName: 'Anita Verma',
      },
      documents: [
        {
          id: 'DOC001',
          name: 'Performance Review Document',
          type: 'PDF',
          uploadedDate: '2025-07-20',
          uploadedBy: 'Priya Singh',
        },
      ],
      createdDate: '2025-07-01',
      reviewDate: '2025-07-15',
      finalizedDate: '2025-07-20',
      lastUpdated: '2025-07-20',
      notes: 'Exceptional performer ready for next level responsibilities',
    },
    {
      id: 'APR002',
      employeeId: 'EMP002',
      employeeName: 'Meera Patel',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'meera.patel@company.com',
      department: 'Marketing',
      designation: 'Marketing Manager',
      joiningDate: '2021-06-10',
      currentGrade: 'M3',
      currentSalary: 1000000,
      appraisalCycle: {
        id: 'CYCLE2025',
        name: 'Annual Appraisal 2025',
        period: 'annual',
        startDate: '2025-04-01',
        endDate: '2025-03-31',
        type: 'comprehensive',
      },
      performanceMetrics: {
        overallRating: 4.6,
        goalAchievement: 128,
        competencyRating: 4.7,
        behavioralRating: 4.5,
        categoryRatings: {
          qualityOfWork: 4.7,
          productivity: 4.5,
          initiative: 4.8,
          teamwork: 4.4,
          communication: 4.8,
          leadership: 4.6,
          problemSolving: 4.5,
          reliability: 4.5,
        },
        kpiScores: [
          {
            id: 'KPI004',
            name: 'Brand Awareness Growth',
            target: 25,
            achieved: 32,
            score: 5.0,
            weight: 40,
          },
          {
            id: 'KPI005',
            name: 'Lead Generation',
            target: 1000,
            achieved: 1250,
            score: 4.8,
            weight: 35,
          },
          {
            id: 'KPI006',
            name: 'Campaign ROI',
            target: 300,
            achieved: 385,
            score: 4.9,
            weight: 25,
          },
        ],
      },
      recommendations: {
        salaryIncrease: {
          recommended: true,
          currentSalary: 1000000,
          proposedSalary: 1200000,
          increasePercentage: 20,
          increaseAmount: 200000,
          effectiveDate: '2025-08-01',
          justification: 'Exceeded all targets by significant margins. Ready for senior management role.',
        },
        promotion: {
          recommended: true,
          currentGrade: 'M3',
          proposedGrade: 'M4',
          currentDesignation: 'Marketing Manager',
          proposedDesignation: 'Senior Marketing Manager',
          effectiveDate: '2025-08-01',
          justification: 'Outstanding results with 128% goal achievement and exceptional leadership',
        },
        bonus: {
          recommended: true,
          bonusType: 'performance',
          amount: 150000,
          percentage: 15,
          justification: 'Exceptional performance with highest rating in department',
        },
        developmentPlan: {
          trainingRequired: ['Strategic Marketing Leadership', 'Digital Transformation'],
          skillGaps: ['Data Science', 'Advanced Analytics'],
          careerPath: 'Senior Marketing Manager → Marketing Director → CMO',
          mentoringNeeded: false,
          timeline: '6-12 months',
        },
      },
      status: 'finalized',
      priority: 'high',
      approvalWorkflow: [
        {
          level: 1,
          approverRole: 'direct_manager',
          approverName: 'Rohit Kumar',
          approverId: 'MGR002',
          status: 'approved',
          comments: 'Outstanding performer. Highest rating I have given.',
          approvedDate: '2025-07-16',
        },
        {
          level: 2,
          approverRole: 'department_head',
          approverName: 'Sunita Mehta',
          approverId: 'DEPT002',
          status: 'approved',
          comments: 'Exceptional results. Ready for senior leadership role.',
          approvedDate: '2025-07-19',
        },
        {
          level: 3,
          approverRole: 'hr_manager',
          approverName: 'Anita Verma',
          approverId: 'HR001',
          status: 'approved',
          comments: 'Well-deserved promotion and salary increase.',
          approvedDate: '2025-07-22',
        },
      ],
      feedback: {
        managerFeedback:
          'Meera has exceeded all expectations. Her strategic thinking and execution have been phenomenal.',
        hrFeedback: 'Top talent retention priority. Excellent candidate for accelerated growth.',
        strengths: ['Strategic thinking', 'Creative execution', 'Team leadership', 'Results delivery'],
        improvementAreas: ['Technical skills', 'Data analysis'],
        achievements: ['32% brand awareness growth', '25% increase in leads', 'Award-winning campaigns'],
        goals: ['Lead digital transformation', 'Develop data analytics skills', 'Mentor junior managers'],
      },
      benchmarking: {
        departmentAverage: 3.9,
        gradeAverage: 4.0,
        companyAverage: 3.7,
        percentileRank: 95,
        topPerformer: true,
      },
      previousAppraisals: [
        {
          year: '2024',
          rating: 4.2,
          salaryIncrease: 15,
          promoted: false,
        },
        {
          year: '2023',
          rating: 4.0,
          salaryIncrease: 12,
          promoted: true,
        },
      ],
      conductedBy: {
        managerId: 'MGR002',
        managerName: 'Rohit Kumar',
        hrId: 'HR001',
        hrName: 'Anita Verma',
      },
      documents: [
        {
          id: 'DOC002',
          name: 'Performance Review Document',
          type: 'PDF',
          uploadedDate: '2025-07-22',
          uploadedBy: 'Rohit Kumar',
        },
      ],
      createdDate: '2025-07-01',
      reviewDate: '2025-07-16',
      finalizedDate: '2025-07-22',
      lastUpdated: '2025-07-22',
      notes: 'Star performer with exceptional potential for senior leadership',
    },
    {
      id: 'APR003',
      employeeId: 'EMP003',
      employeeName: 'Arjun Reddy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      email: 'arjun.reddy@company.com',
      department: 'Finance',
      designation: 'Financial Analyst',
      joiningDate: '2023-01-15',
      currentGrade: 'A2',
      currentSalary: 800000,
      appraisalCycle: {
        id: 'CYCLE2025',
        name: 'Annual Appraisal 2025',
        period: 'annual',
        startDate: '2025-04-01',
        endDate: '2025-03-31',
        type: 'comprehensive',
      },
      performanceMetrics: {
        overallRating: 3.8,
        goalAchievement: 75,
        competencyRating: 4.0,
        behavioralRating: 3.7,
        categoryRatings: {
          qualityOfWork: 4.0,
          productivity: 3.8,
          initiative: 3.5,
          teamwork: 3.7,
          communication: 3.5,
          leadership: 3.2,
          problemSolving: 4.2,
          reliability: 4.0,
        },
        kpiScores: [
          {
            id: 'KPI007',
            name: 'Report Accuracy',
            target: 98,
            achieved: 99,
            score: 4.5,
            weight: 30,
          },
          {
            id: 'KPI008',
            name: 'Process Automation',
            target: 50,
            achieved: 30,
            score: 3.0,
            weight: 40,
          },
          {
            id: 'KPI009',
            name: 'Training Completion',
            target: 100,
            achieved: 85,
            score: 3.8,
            weight: 30,
          },
        ],
      },
      recommendations: {
        salaryIncrease: {
          recommended: true,
          currentSalary: 800000,
          proposedSalary: 880000,
          increasePercentage: 10,
          increaseAmount: 80000,
          effectiveDate: '2025-08-01',
          justification: 'Solid performance with good technical skills. Room for improvement in soft skills.',
        },
        promotion: {
          recommended: false,
          currentGrade: 'A2',
          proposedGrade: 'A2',
          currentDesignation: 'Financial Analyst',
          proposedDesignation: 'Financial Analyst',
          effectiveDate: '',
          justification: 'Needs to improve communication and leadership skills before promotion',
        },
        bonus: {
          recommended: true,
          bonusType: 'annual',
          amount: 40000,
          percentage: 5,
          justification: 'Standard performance bonus for meeting basic expectations',
        },
        developmentPlan: {
          trainingRequired: ['Communication Skills', 'Leadership Fundamentals', 'Advanced Excel'],
          skillGaps: ['Presentation skills', 'Team leadership', 'Strategic thinking'],
          careerPath: 'Financial Analyst → Senior Analyst → Finance Manager',
          mentoringNeeded: true,
          timeline: '18-24 months',
        },
      },
      status: 'hr_review',
      priority: 'medium',
      approvalWorkflow: [
        {
          level: 1,
          approverRole: 'direct_manager',
          approverName: 'Deepika Iyer',
          approverId: 'MGR003',
          status: 'approved',
          comments: 'Good technical skills but needs development in soft skills.',
          approvedDate: '2025-07-25',
        },
        {
          level: 2,
          approverRole: 'department_head',
          approverName: 'Vikram Joshi',
          approverId: 'DEPT003',
          status: 'approved',
          comments: 'Agree with manager assessment. Focus on development.',
          approvedDate: '2025-07-28',
        },
        {
          level: 3,
          approverRole: 'hr_manager',
          approverName: 'Anita Verma',
          approverId: 'HR001',
          status: 'pending',
          comments: '',
          approvedDate: undefined,
        },
      ],
      feedback: {
        managerFeedback: 'Arjun has strong analytical skills but needs to work on communication and taking initiative.',
        hrFeedback: 'Pending HR review',
        strengths: ['Analytical thinking', 'Attention to detail', 'Technical accuracy'],
        improvementAreas: ['Communication', 'Leadership presence', 'Initiative taking'],
        achievements: ['99% report accuracy', 'CFA Level 1 progress', 'Error reduction'],
        goals: ['Improve presentation skills', 'Lead a project', 'Complete CFA Level 1'],
      },
      benchmarking: {
        departmentAverage: 3.6,
        gradeAverage: 3.7,
        companyAverage: 3.7,
        percentileRank: 65,
        topPerformer: false,
      },
      previousAppraisals: [
        {
          year: '2024',
          rating: 3.5,
          salaryIncrease: 8,
          promoted: false,
        },
      ],
      conductedBy: {
        managerId: 'MGR003',
        managerName: 'Deepika Iyer',
        hrId: 'HR001',
        hrName: 'Anita Verma',
      },
      documents: [],
      createdDate: '2025-07-20',
      reviewDate: '2025-07-25',
      lastUpdated: '2025-07-28',
      notes: 'Solid performer with development potential. Focus on soft skills.',
    },
    {
      id: 'APR004',
      employeeId: 'EMP004',
      employeeName: 'Kavya Nair',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      email: 'kavya.nair@company.com',
      department: 'Design',
      designation: 'UX Designer',
      joiningDate: '2024-02-20',
      currentGrade: 'D1',
      currentSalary: 700000,
      appraisalCycle: {
        id: 'CYCLE2025',
        name: 'Annual Appraisal 2025',
        period: 'annual',
        startDate: '2025-04-01',
        endDate: '2025-03-31',
        type: 'comprehensive',
      },
      performanceMetrics: {
        overallRating: 4.1,
        goalAchievement: 85,
        competencyRating: 4.0,
        behavioralRating: 4.2,
        categoryRatings: {
          qualityOfWork: 4.2,
          productivity: 3.9,
          initiative: 4.0,
          teamwork: 4.3,
          communication: 4.1,
          leadership: 3.8,
          problemSolving: 4.0,
          reliability: 4.2,
        },
        kpiScores: [
          {
            id: 'KPI010',
            name: 'Design System Mastery',
            target: 80,
            achieved: 90,
            score: 4.5,
            weight: 35,
          },
          {
            id: 'KPI011',
            name: 'Project Completion',
            target: 100,
            achieved: 85,
            score: 3.8,
            weight: 40,
          },
          {
            id: 'KPI012',
            name: 'User Satisfaction',
            target: 4.0,
            achieved: 4.2,
            score: 4.3,
            weight: 25,
          },
        ],
      },
      recommendations: {
        salaryIncrease: {
          recommended: true,
          currentSalary: 700000,
          proposedSalary: 805000,
          increasePercentage: 15,
          increaseAmount: 105000,
          effectiveDate: '2025-08-01',
          justification: 'Strong performance for a junior designer with good growth potential',
        },
        promotion: {
          recommended: false,
          currentGrade: 'D1',
          proposedGrade: 'D1',
          currentDesignation: 'UX Designer',
          proposedDesignation: 'UX Designer',
          effectiveDate: '',
          justification: 'Needs more experience and advanced skill development',
        },
        bonus: {
          recommended: true,
          bonusType: 'performance',
          amount: 70000,
          percentage: 10,
          justification: 'Good performance with strong learning curve',
        },
        developmentPlan: {
          trainingRequired: ['Advanced UX Research', 'Design Leadership', 'Prototyping Tools'],
          skillGaps: ['Research methodology', 'Design strategy', 'Stakeholder management'],
          careerPath: 'UX Designer → Senior UX Designer → Lead Designer',
          mentoringNeeded: true,
          timeline: '12-18 months',
        },
      },
      status: 'manager_review',
      priority: 'medium',
      approvalWorkflow: [
        {
          level: 1,
          approverRole: 'direct_manager',
          approverName: 'Lisa Anderson',
          approverId: 'MGR004',
          status: 'pending',
          comments: '',
          approvedDate: undefined,
        },
        {
          level: 2,
          approverRole: 'department_head',
          approverName: 'David Chen',
          approverId: 'DEPT004',
          status: 'pending',
          comments: '',
          approvedDate: undefined,
        },
        {
          level: 3,
          approverRole: 'hr_manager',
          approverName: 'Anita Verma',
          approverId: 'HR001',
          status: 'pending',
          comments: '',
          approvedDate: undefined,
        },
      ],
      feedback: {
        managerFeedback:
          'Kavya shows good potential with strong design skills. Needs to develop research capabilities.',
        hrFeedback: 'Pending HR review',
        strengths: ['Design aesthetics', 'User empathy', 'Learning agility', 'Team collaboration'],
        improvementAreas: ['UX research', 'Design strategy', 'Stakeholder communication'],
        achievements: ['Design system proficiency', 'Positive user feedback', 'Quick adaptation'],
        goals: ['Master UX research', 'Lead a design project', 'Develop design strategy skills'],
      },
      benchmarking: {
        departmentAverage: 3.8,
        gradeAverage: 3.6,
        companyAverage: 3.7,
        percentileRank: 78,
        topPerformer: false,
      },
      previousAppraisals: [],
      conductedBy: {
        managerId: 'MGR004',
        managerName: 'Lisa Anderson',
        hrId: 'HR001',
        hrName: 'Anita Verma',
      },
      documents: [],
      createdDate: '2025-07-25',
      reviewDate: '2025-07-30',
      lastUpdated: '2025-07-30',
      notes: 'Promising designer with good growth trajectory',
    },
    {
      id: 'APR005',
      employeeId: 'EMP005',
      employeeName: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'vikram.singh@company.com',
      department: 'Sales',
      designation: 'Sales Manager',
      joiningDate: '2020-09-10',
      currentGrade: 'S3',
      currentSalary: 1100000,
      appraisalCycle: {
        id: 'CYCLE2025',
        name: 'Annual Appraisal 2025',
        period: 'annual',
        startDate: '2025-04-01',
        endDate: '2025-03-31',
        type: 'comprehensive',
      },
      performanceMetrics: {
        overallRating: 2.8,
        goalAchievement: 68,
        competencyRating: 3.2,
        behavioralRating: 2.5,
        categoryRatings: {
          qualityOfWork: 3.0,
          productivity: 2.8,
          initiative: 2.5,
          teamwork: 2.7,
          communication: 3.2,
          leadership: 2.8,
          problemSolving: 3.0,
          reliability: 2.5,
        },
        kpiScores: [
          {
            id: 'KPI013',
            name: 'Revenue Target',
            target: 10000000,
            achieved: 6800000,
            score: 2.7,
            weight: 50,
          },
          {
            id: 'KPI014',
            name: 'Team Performance',
            target: 90,
            achieved: 72,
            score: 2.9,
            weight: 30,
          },
          {
            id: 'KPI015',
            name: 'Customer Satisfaction',
            target: 4.5,
            achieved: 4.1,
            score: 3.2,
            weight: 20,
          },
        ],
      },
      recommendations: {
        salaryIncrease: {
          recommended: false,
          currentSalary: 1100000,
          proposedSalary: 1100000,
          increasePercentage: 0,
          increaseAmount: 0,
          effectiveDate: '',
          justification: 'Below expectations performance. No salary increase recommended.',
        },
        promotion: {
          recommended: false,
          currentGrade: 'S3',
          proposedGrade: 'S3',
          currentDesignation: 'Sales Manager',
          proposedDesignation: 'Sales Manager',
          effectiveDate: '',
          justification: 'Performance improvement required before considering promotion',
        },
        bonus: {
          recommended: false,
          bonusType: 'performance',
          amount: 0,
          percentage: 0,
          justification: 'Did not meet minimum performance criteria for bonus eligibility',
        },
        developmentPlan: {
          trainingRequired: ['Sales Performance Improvement', 'Leadership Skills', 'Customer Relationship Management'],
          skillGaps: ['Sales strategy', 'Team motivation', 'Performance management'],
          careerPath: 'Performance Improvement Plan → Sales Manager → Senior Sales Manager',
          mentoringNeeded: true,
          timeline: '6-12 months PIP',
        },
      },
      status: 'rejected',
      priority: 'high',
      approvalWorkflow: [
        {
          level: 1,
          approverRole: 'direct_manager',
          approverName: 'Rajesh Kumar',
          approverId: 'MGR005',
          status: 'approved',
          comments: 'Performance has been consistently below expectations. Recommend PIP.',
          approvedDate: '2025-07-22',
        },
        {
          level: 2,
          approverRole: 'department_head',
          approverName: 'Amit Gupta',
          approverId: 'DEPT005',
          status: 'approved',
          comments: 'Agree with manager assessment. Performance improvement critical.',
          approvedDate: '2025-07-25',
        },
        {
          level: 3,
          approverRole: 'hr_manager',
          approverName: 'Anita Verma',
          approverId: 'HR001',
          status: 'approved',
          comments: 'Recommend Performance Improvement Plan with clear milestones.',
          approvedDate: '2025-07-28',
        },
      ],
      feedback: {
        managerFeedback: 'Vikram has struggled to meet targets consistently. Needs immediate performance improvement.',
        hrFeedback: 'Recommend Performance Improvement Plan with clear expectations and timeline.',
        strengths: ['Product knowledge', 'Customer relationships'],
        improvementAreas: ['Sales execution', 'Team leadership', 'Goal achievement', 'Time management'],
        achievements: ['Maintained key client accounts', 'Product training completion'],
        goals: ['Achieve 90% of sales target', 'Improve team performance', 'Complete leadership training'],
      },
      benchmarking: {
        departmentAverage: 3.5,
        gradeAverage: 3.4,
        companyAverage: 3.7,
        percentileRank: 25,
        topPerformer: false,
      },
      previousAppraisals: [
        {
          year: '2024',
          rating: 3.2,
          salaryIncrease: 5,
          promoted: false,
        },
        {
          year: '2023',
          rating: 3.5,
          salaryIncrease: 8,
          promoted: false,
        },
      ],
      conductedBy: {
        managerId: 'MGR005',
        managerName: 'Rajesh Kumar',
        hrId: 'HR001',
        hrName: 'Anita Verma',
      },
      documents: [
        {
          id: 'DOC003',
          name: 'Performance Improvement Plan',
          type: 'PDF',
          uploadedDate: '2025-07-28',
          uploadedBy: 'Anita Verma',
        },
      ],
      createdDate: '2025-07-18',
      reviewDate: '2025-07-22',
      finalizedDate: '2025-07-28',
      lastUpdated: '2025-07-28',
      notes: 'Performance concerns require immediate attention and structured improvement plan',
    },
  ];

  const statuses = [
    'all',
    'draft',
    'self_assessment',
    'manager_review',
    'hr_review',
    'approved',
    'rejected',
    'finalized',
  ];
  const cycles = ['all', 'annual', 'quarterly', 'half_yearly'];

  // Filter appraisals
  const filteredAppraisals = appraisals.filter((appraisal) => {
    const matchesSearch =
      appraisal.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.notes.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || appraisal.status === statusFilter;
    const matchesCycle = cycleFilter === 'all' || appraisal.appraisalCycle.period === cycleFilter;

    return matchesSearch && matchesStatus && matchesCycle;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'primary';
      case 'self_assessment':
        return 'primary';
      case 'manager_review':
        return 'warning';
      case 'hr_review':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'finalized':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      case 'self_assessment':
        return <RxPerson className="w-4 h-4 text-blue-500" />;
      case 'manager_review':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'hr_review':
        return <RxBadge className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'finalized':
        return <RxBadge className="w-4 h-4 text-green-600" />;
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

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRatingBgColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-blue-500';
    if (rating >= 3.5) return 'bg-yellow-500';
    if (rating >= 3.0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const renderStars = (rating: number) => {
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate statistics
  const totalAppraisals = appraisals.length;
  const pendingAppraisals = appraisals.filter(
    (a) =>
      a.status === 'draft' ||
      a.status === 'self_assessment' ||
      a.status === 'manager_review' ||
      a.status === 'hr_review'
  ).length;
  const completedAppraisals = appraisals.filter((a) => a.status === 'approved' || a.status === 'finalized').length;
  const avgRating = appraisals.reduce((sum, a) => sum + a.performanceMetrics.overallRating, 0) / appraisals.length;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredAppraisals.map((appraisal) => (
        <div
          key={appraisal.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority Indicator */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(appraisal.priority)}`}></div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Header with employee info and status */}
          <div className="flex items-start justify-between mb-4 pr-8">
            <div className="flex items-center space-x-3">
              <img
                src={appraisal.avatar}
                alt={appraisal.employeeName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{appraisal.employeeName}</h3>
                <p className="text-sm text-gray-500">{appraisal.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">{getStatusIcon(appraisal.status)}</div>
          </div>

          {/* Department and Designation */}
          <div className="mb-4">
            <Chip label={appraisal.department} size="small" className="mb-2" variant="outlined" />
            <p className="text-sm text-gray-700 font-medium">{appraisal.designation}</p>
            <p className="text-xs text-gray-500">
              Grade: {appraisal.currentGrade} • {formatCurrency(appraisal.currentSalary)}
            </p>
          </div>

          {/* Performance Rating */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Overall Performance</span>
              <span className={`text-sm font-bold ${getRatingColor(appraisal.performanceMetrics.overallRating)}`}>
                {appraisal.performanceMetrics.overallRating.toFixed(1)}/5.0
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full ${getRatingBgColor(appraisal.performanceMetrics.overallRating)}`}
                style={{ width: `${(appraisal.performanceMetrics.overallRating / 5) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center space-x-1">
              {renderStars(Math.round(appraisal.performanceMetrics.overallRating))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Goal Achievement:</span>
                <span
                  className={`font-medium ml-1 ${
                    appraisal.performanceMetrics.goalAchievement >= 100
                      ? 'text-green-600'
                      : appraisal.performanceMetrics.goalAchievement >= 80
                        ? 'text-blue-600'
                        : appraisal.performanceMetrics.goalAchievement >= 60
                          ? 'text-yellow-600'
                          : 'text-red-600'
                  }`}
                >
                  {appraisal.performanceMetrics.goalAchievement}%
                </span>
              </div>
              <div>
                <span className="text-gray-600">Competency:</span>
                <span className={`font-medium ml-1 ${getRatingColor(appraisal.performanceMetrics.competencyRating)}`}>
                  {appraisal.performanceMetrics.competencyRating.toFixed(1)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Behavioral:</span>
                <span className={`font-medium ml-1 ${getRatingColor(appraisal.performanceMetrics.behavioralRating)}`}>
                  {appraisal.performanceMetrics.behavioralRating.toFixed(1)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Percentile:</span>
                <span className="font-medium ml-1 text-purple-600">{appraisal.benchmarking.percentileRank}th</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Recommendations</p>
            <div className="space-y-2">
              {appraisal.recommendations.salaryIncrease.recommended && (
                <div className="flex items-center space-x-2">
                  <RxTriangleUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">
                    Salary Increase: {appraisal.recommendations.salaryIncrease.increasePercentage}%
                  </span>
                </div>
              )}
              {appraisal.recommendations.promotion.recommended && (
                <div className="flex items-center space-x-2">
                  <RxBadge className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-700">
                    Promotion: {appraisal.recommendations.promotion.proposedDesignation}
                  </span>
                </div>
              )}
              {appraisal.recommendations.bonus.recommended && (
                <div className="flex items-center space-x-2">
                  <RxLightningBolt className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-700">
                    Bonus: {formatCurrency(appraisal.recommendations.bonus.amount)}
                  </span>
                </div>
              )}
              {!appraisal.recommendations.salaryIncrease.recommended &&
                !appraisal.recommendations.promotion.recommended &&
                !appraisal.recommendations.bonus.recommended && (
                  <div className="flex items-center space-x-2">
                    <RxMinus className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">No monetary recommendations</span>
                  </div>
                )}
            </div>
          </div>

          {/* Top Performer Badge */}
          {appraisal.benchmarking.topPerformer && (
            <div className="mb-4 p-2 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <RxStar className="w-4 h-4 text-yellow-600" />
                <span className="text-xs text-yellow-700 font-medium">Top Performer</span>
              </div>
            </div>
          )}

          {/* Approval Progress */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Approval Progress</p>
            <div className="flex items-center space-x-2">
              {appraisal.approvalWorkflow.map((approval, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      approval.status === 'approved'
                        ? 'bg-green-500'
                        : approval.status === 'rejected'
                          ? 'bg-red-500'
                          : 'bg-gray-300'
                    }`}
                  ></div>
                  {index < appraisal.approvalWorkflow.length - 1 && <div className="w-2 h-0.5 bg-gray-300"></div>}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {appraisal.approvalWorkflow.filter((a) => a.status === 'approved').length}/
              {appraisal.approvalWorkflow.length} approvals
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={appraisal.status.charAt(0).toUpperCase() + appraisal.status.slice(1).replace('_', ' ')}
              size="small"
              color={getStatusColor(appraisal.status)}
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
          <thead className="bg-gray-50 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Role & Salary
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance Rating
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Goal Achievement
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recommendations
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status & Approval
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Benchmarking
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppraisals.map((appraisal) => (
              <tr key={appraisal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={appraisal.avatar}
                        alt={appraisal.employeeName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(appraisal.priority)}`}
                      ></div>
                      {appraisal.benchmarking.topPerformer && (
                        <div className="absolute -top-1 -right-1">
                          <RxStar className="w-4 h-4 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{appraisal.employeeName}</div>
                      <div className="text-sm text-gray-500">
                        {appraisal.employeeId} • {appraisal.department}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{appraisal.designation}</div>
                  <div className="text-sm text-gray-500">Grade: {appraisal.currentGrade}</div>
                  <div className="text-sm font-bold text-green-600">{formatCurrency(appraisal.currentSalary)}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className={`text-lg font-bold ${getRatingColor(appraisal.performanceMetrics.overallRating)}`}>
                    {appraisal.performanceMetrics.overallRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {renderStars(Math.round(appraisal.performanceMetrics.overallRating))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    C: {appraisal.performanceMetrics.competencyRating.toFixed(1)} | B:{' '}
                    {appraisal.performanceMetrics.behavioralRating.toFixed(1)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div
                    className={`text-lg font-bold ${
                      appraisal.performanceMetrics.goalAchievement >= 100
                        ? 'text-green-600'
                        : appraisal.performanceMetrics.goalAchievement >= 80
                          ? 'text-blue-600'
                          : appraisal.performanceMetrics.goalAchievement >= 60
                            ? 'text-yellow-600'
                            : 'text-red-600'
                    }`}
                  >
                    {appraisal.performanceMetrics.goalAchievement}%
                  </div>
                  <div className="w-12 bg-gray-200 rounded-full h-1.5 mx-auto mt-1">
                    <div
                      className={`h-1.5 rounded-full ${
                        appraisal.performanceMetrics.goalAchievement >= 100
                          ? 'bg-green-500'
                          : appraisal.performanceMetrics.goalAchievement >= 80
                            ? 'bg-blue-500'
                            : appraisal.performanceMetrics.goalAchievement >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(appraisal.performanceMetrics.goalAchievement, 100)}%` }}
                    ></div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="space-y-1">
                    {appraisal.recommendations.salaryIncrease.recommended && (
                      <div className="text-xs text-green-600 font-medium">
                        +{appraisal.recommendations.salaryIncrease.increasePercentage}% Salary
                      </div>
                    )}
                    {appraisal.recommendations.promotion.recommended && (
                      <div className="text-xs text-blue-600 font-medium">Promotion</div>
                    )}
                    {appraisal.recommendations.bonus.recommended && (
                      <div className="text-xs text-yellow-600 font-medium">
                        {formatCurrency(appraisal.recommendations.bonus.amount)} Bonus
                      </div>
                    )}
                    {!appraisal.recommendations.salaryIncrease.recommended &&
                      !appraisal.recommendations.promotion.recommended &&
                      !appraisal.recommendations.bonus.recommended && <div className="text-xs text-gray-500">None</div>}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {getStatusIcon(appraisal.status)}
                    <Chip
                      label={appraisal.status.charAt(0).toUpperCase() + appraisal.status.slice(1).replace('_', ' ')}
                      size="small"
                      color={getStatusColor(appraisal.status)}
                      variant="filled"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {appraisal.approvalWorkflow.filter((a) => a.status === 'approved').length}/
                    {appraisal.approvalWorkflow.length} approvals
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-purple-600">
                    {appraisal.benchmarking.percentileRank}th percentile
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Dept: {appraisal.benchmarking.departmentAverage.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Company: {appraisal.benchmarking.companyAverage.toFixed(1)}
                  </div>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Employee Appraisals</h1>
            <p className="text-gray-600">Comprehensive performance evaluation and compensation review system</p>
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
              <RxFileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Appraisals</p>
              <p className="text-2xl font-bold text-gray-900">{totalAppraisals}</p>
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
              <p className="text-2xl font-bold text-gray-900">{pendingAppraisals}</p>
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
              <p className="text-2xl font-bold text-gray-900">{completedAppraisals}</p>
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
            <span>New Appraisal</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBadge className="w-4 h-4" />
            <span>Bulk Actions</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxFileText className="w-4 h-4" />
            <span>Reports</span>
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

          {/* Cycle Filter */}
          <div className="relative">
            <select
              value={cycleFilter}
              onChange={(e) => setCycleFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {cycles.map((cycle) => (
                <option key={cycle} value={cycle}>
                  {cycle === 'all' ? 'All Cycles' : cycle.charAt(0).toUpperCase() + cycle.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search appraisals..."
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
          Showing {filteredAppraisals.length} of {appraisals.length} appraisals
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default Appraisals;
