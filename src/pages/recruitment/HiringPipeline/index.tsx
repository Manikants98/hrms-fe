import React, { useEffect, useState } from 'react';
import {
  RxArrowRight,
  RxCalendar,
  RxCheckCircled,
  RxDotsVertical,
  RxDownload,
  RxEnvelopeClosed,
  RxEyeOpen,
  RxFileText,
  RxGear,
  RxHome,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxShare1,
  RxStar,
  RxStarFilled,
  RxTarget,
  RxTimer,
} from 'react-icons/rx';

interface PipelineCandidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  appliedPosition: string;
  department: string;
  currentStage: string;
  stageUpdatedDate: string;
  source: 'linkedin' | 'job_board' | 'referral' | 'career_page' | 'social_media';
  priority: 'high' | 'medium' | 'low';
  rating: number;
  experienceYears: number;
  expectedSalary: number;
  skills: string[];
  nextAction: string;
  nextActionDate: string;
  stageHistory: Array<{
    stage: string;
    enteredDate: string;
    duration: number;
  }>;
}

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  order: number;
  color: string;
  isActive: boolean;
  candidates: PipelineCandidate[];
}

interface PipelineMetrics {
  totalCandidates: number;
  avgTimeToHire: number;
  conversionRate: number;
  topSources: Array<{
    source: string;
    count: number;
    percentage: number;
  }>;
  stageMetrics: Array<{
    stage: string;
    count: number;
    avgDuration: number;
    conversionRate: number;
  }>;
}

const HiringPipeline: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'pipeline' | 'table' | 'metrics'>('pipeline');

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

  // Mock pipeline data
  const pipelineStages: PipelineStage[] = [
    {
      id: 'stage1',
      name: 'Sourcing',
      description: 'Candidates are being identified and attracted',
      order: 1,
      color: 'bg-blue-500',
      isActive: true,
      candidates: [
        {
          id: 'CAND001',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+91-9876543210',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
          appliedPosition: 'Senior Frontend Developer',
          department: 'Engineering',
          currentStage: 'Sourcing',
          stageUpdatedDate: '2025-07-30',
          source: 'linkedin',
          priority: 'high',
          rating: 0,
          experienceYears: 6,
          expectedSalary: 2800000,
          skills: ['React', 'TypeScript', 'Node.js'],
          nextAction: 'Initial Contact',
          nextActionDate: '2025-08-01',
          stageHistory: [],
        },
        {
          id: 'CAND002',
          firstName: 'Raj',
          lastName: 'Patel',
          email: 'raj.patel@email.com',
          phone: '+91-8765432109',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          appliedPosition: 'Data Scientist',
          department: 'Analytics',
          currentStage: 'Sourcing',
          stageUpdatedDate: '2025-07-29',
          source: 'job_board',
          priority: 'medium',
          rating: 0,
          experienceYears: 4,
          expectedSalary: 2200000,
          skills: ['Python', 'Machine Learning', 'SQL'],
          nextAction: 'Review Profile',
          nextActionDate: '2025-07-31',
          stageHistory: [],
        },
      ],
    },
    {
      id: 'stage2',
      name: 'Applied',
      description: 'Candidates have submitted their applications',
      order: 2,
      color: 'bg-green-500',
      isActive: true,
      candidates: [
        {
          id: 'CAND003',
          firstName: 'Priya',
          lastName: 'Sharma',
          email: 'priya.sharma@email.com',
          phone: '+91-7654321098',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          appliedPosition: 'Product Manager',
          department: 'Product',
          currentStage: 'Applied',
          stageUpdatedDate: '2025-07-28',
          source: 'referral',
          priority: 'high',
          rating: 0,
          experienceYears: 5,
          expectedSalary: 2500000,
          skills: ['Product Strategy', 'Analytics', 'Agile'],
          nextAction: 'Application Review',
          nextActionDate: '2025-08-02',
          stageHistory: [{ stage: 'Sourcing', enteredDate: '2025-07-25', duration: 3 }],
        },
        {
          id: 'CAND004',
          firstName: 'Amit',
          lastName: 'Kumar',
          email: 'amit.kumar@email.com',
          phone: '+91-6543210987',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          appliedPosition: 'UX Designer',
          department: 'Design',
          currentStage: 'Applied',
          stageUpdatedDate: '2025-07-27',
          source: 'career_page',
          priority: 'medium',
          rating: 0,
          experienceYears: 3,
          expectedSalary: 1800000,
          skills: ['Figma', 'User Research', 'Prototyping'],
          nextAction: 'Portfolio Review',
          nextActionDate: '2025-08-01',
          stageHistory: [{ stage: 'Sourcing', enteredDate: '2025-07-24', duration: 3 }],
        },
      ],
    },
    {
      id: 'stage3',
      name: 'Screening',
      description: 'Initial screening and qualification assessment',
      order: 3,
      color: 'bg-yellow-500',
      isActive: true,
      candidates: [
        {
          id: 'CAND005',
          firstName: 'Meera',
          lastName: 'Singh',
          email: 'meera.singh@email.com',
          phone: '+91-5432109876',
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          appliedPosition: 'DevOps Engineer',
          department: 'Engineering',
          currentStage: 'Screening',
          stageUpdatedDate: '2025-07-26',
          source: 'social_media',
          priority: 'high',
          rating: 3.5,
          experienceYears: 4,
          expectedSalary: 2100000,
          skills: ['AWS', 'Kubernetes', 'Docker'],
          nextAction: 'Phone Interview',
          nextActionDate: '2025-08-03',
          stageHistory: [
            { stage: 'Sourcing', enteredDate: '2025-07-20', duration: 4 },
            { stage: 'Applied', enteredDate: '2025-07-24', duration: 2 },
          ],
        },
      ],
    },
    {
      id: 'stage4',
      name: 'Interviewing',
      description: 'Technical and behavioral interviews in progress',
      order: 4,
      color: 'bg-purple-500',
      isActive: true,
      candidates: [
        {
          id: 'CAND006',
          firstName: 'Vikram',
          lastName: 'Reddy',
          email: 'vikram.reddy@email.com',
          phone: '+91-4321098765',
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          appliedPosition: 'Backend Developer',
          department: 'Engineering',
          currentStage: 'Interviewing',
          stageUpdatedDate: '2025-07-25',
          source: 'linkedin',
          priority: 'high',
          rating: 4.2,
          experienceYears: 5,
          expectedSalary: 2400000,
          skills: ['Java', 'Spring Boot', 'Microservices'],
          nextAction: 'Final Interview',
          nextActionDate: '2025-08-04',
          stageHistory: [
            { stage: 'Sourcing', enteredDate: '2025-07-15', duration: 5 },
            { stage: 'Applied', enteredDate: '2025-07-20', duration: 3 },
            { stage: 'Screening', enteredDate: '2025-07-23', duration: 2 },
          ],
        },
        {
          id: 'CAND007',
          firstName: 'Kavya',
          lastName: 'Nair',
          email: 'kavya.nair@email.com',
          phone: '+91-3210987654',
          avatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          appliedPosition: 'Marketing Manager',
          department: 'Marketing',
          currentStage: 'Interviewing',
          stageUpdatedDate: '2025-07-24',
          source: 'referral',
          priority: 'medium',
          rating: 3.8,
          experienceYears: 6,
          expectedSalary: 2000000,
          skills: ['Digital Marketing', 'Analytics', 'SEO'],
          nextAction: 'Panel Interview',
          nextActionDate: '2025-08-05',
          stageHistory: [
            { stage: 'Sourcing', enteredDate: '2025-07-10', duration: 7 },
            { stage: 'Applied', enteredDate: '2025-07-17', duration: 4 },
            { stage: 'Screening', enteredDate: '2025-07-21', duration: 3 },
          ],
        },
      ],
    },
    {
      id: 'stage5',
      name: 'Offer',
      description: 'Job offers extended to candidates',
      order: 5,
      color: 'bg-orange-500',
      isActive: true,
      candidates: [
        {
          id: 'CAND008',
          firstName: 'Arjun',
          lastName: 'Gupta',
          email: 'arjun.gupta@email.com',
          phone: '+91-2109876543',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          appliedPosition: 'Senior Product Manager',
          department: 'Product',
          currentStage: 'Offer',
          stageUpdatedDate: '2025-07-29',
          source: 'linkedin',
          priority: 'high',
          rating: 4.7,
          experienceYears: 8,
          expectedSalary: 3200000,
          skills: ['Product Strategy', 'Leadership', 'Data Analysis'],
          nextAction: 'Awaiting Response',
          nextActionDate: '2025-08-05',
          stageHistory: [
            { stage: 'Sourcing', enteredDate: '2025-07-05', duration: 7 },
            { stage: 'Applied', enteredDate: '2025-07-12', duration: 5 },
            { stage: 'Screening', enteredDate: '2025-07-17', duration: 4 },
            { stage: 'Interviewing', enteredDate: '2025-07-21', duration: 8 },
          ],
        },
      ],
    },
    {
      id: 'stage6',
      name: 'Hired',
      description: 'Successfully hired candidates',
      order: 6,
      color: 'bg-green-600',
      isActive: true,
      candidates: [
        {
          id: 'CAND009',
          firstName: 'Deepika',
          lastName: 'Iyer',
          email: 'deepika.iyer@email.com',
          phone: '+91-1098765432',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          appliedPosition: 'QA Engineer',
          department: 'Engineering',
          currentStage: 'Hired',
          stageUpdatedDate: '2025-07-28',
          source: 'job_board',
          priority: 'medium',
          rating: 4.5,
          experienceYears: 4,
          expectedSalary: 1600000,
          skills: ['Selenium', 'Automation Testing', 'API Testing'],
          nextAction: 'Onboarding',
          nextActionDate: '2025-08-01',
          stageHistory: [
            { stage: 'Sourcing', enteredDate: '2025-06-20', duration: 10 },
            { stage: 'Applied', enteredDate: '2025-06-30', duration: 5 },
            { stage: 'Screening', enteredDate: '2025-07-05', duration: 7 },
            { stage: 'Interviewing', enteredDate: '2025-07-12', duration: 10 },
            { stage: 'Offer', enteredDate: '2025-07-22', duration: 6 },
          ],
        },
      ],
    },
  ];

  // Mock metrics data
  const pipelineMetrics: PipelineMetrics = {
    totalCandidates: 9,
    avgTimeToHire: 32,
    conversionRate: 11.1,
    topSources: [
      { source: 'LinkedIn', count: 4, percentage: 44.4 },
      { source: 'Job Boards', count: 2, percentage: 22.2 },
      { source: 'Referrals', count: 2, percentage: 22.2 },
      { source: 'Career Page', count: 1, percentage: 11.1 },
    ],
    stageMetrics: [
      { stage: 'Sourcing', count: 2, avgDuration: 3.5, conversionRate: 100 },
      { stage: 'Applied', count: 2, avgDuration: 3, conversionRate: 50 },
      { stage: 'Screening', count: 1, avgDuration: 3, conversionRate: 100 },
      { stage: 'Interviewing', count: 2, avgDuration: 5.5, conversionRate: 50 },
      { stage: 'Offer', count: 1, avgDuration: 7, conversionRate: 100 },
      { stage: 'Hired', count: 1, avgDuration: 38, conversionRate: 100 },
    ],
  };

  // Get all candidates for filtering
  const allCandidates = pipelineStages.flatMap((stage) => stage.candidates);

  const departments = [
    'all',
    ...Array.from(new Set(allCandidates.map((candidate) => candidate.department))),
  ];
  const sources = ['all', 'linkedin', 'job_board', 'referral', 'career_page', 'social_media'];
  const priorities = ['all', 'high', 'medium', 'low'];

  // Filter candidates
  const filterCandidates = (candidates: PipelineCandidate[]) => {
    return candidates.filter((candidate) => {
      const matchesSearch =
        candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.appliedPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDepartment =
        departmentFilter === 'all' || candidate.department === departmentFilter;
      const matchesSource = sourceFilter === 'all' || candidate.source === sourceFilter;
      const matchesPriority = priorityFilter === 'all' || candidate.priority === priorityFilter;

      return matchesSearch && matchesDepartment && matchesSource && matchesPriority;
    });
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'linkedin':
        return <RxShare1 className="w-3 h-3 text-blue-600" />;
      case 'job_board':
        return <RxFileText className="w-3 h-3 text-green-600" />;
      case 'referral':
        return <RxPerson className="w-3 h-3 text-purple-600" />;
      case 'career_page':
        return <RxHome className="w-3 h-3 text-orange-600" />;
      case 'social_media':
        return <RxTarget className="w-3 h-3 text-pink-600" />;
      default:
        return <RxGear className="w-3 h-3 text-gray-500" />;
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
  const totalCandidates = allCandidates.length;
  const activeCandidates = allCandidates.filter((c) => c.currentStage !== 'Hired').length;
  const hiredCandidates = allCandidates.filter((c) => c.currentStage === 'Hired').length;

  // Pipeline View Component
  const PipelineView = () => (
    <div className="overflow-x-auto">
      <div className="flex space-x-6 min-w-max pb-6">
        {pipelineStages.map((stage, index) => {
          const filteredCandidates = filterCandidates(stage.candidates);

          return (
            <div key={stage.id} className="flex flex-col min-w-80">
              {/* Stage Header */}
              <div className={`rounded-t-lg p-4 text-white ${stage.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{stage.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm font-bold">
                      {filteredCandidates.length}
                    </span>
                    <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
                      <RxDotsVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm opacity-90">{stage.description}</p>
              </div>

              {/* Candidates List */}
              <div className="bg-gray-50 rounded-b-lg min-h-96 max-h-96 overflow-y-auto">
                <div className="p-4 space-y-4">
                  {filteredCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      {/* Candidate Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={candidate.avatar}
                              alt={`${candidate.firstName} ${candidate.lastName}`}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(candidate.priority)}`}
                            ></div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {candidate.firstName} {candidate.lastName}
                            </h4>
                            <p className="text-sm text-gray-500">{candidate.appliedPosition}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getSourceIcon(candidate.source)}
                        </div>
                      </div>

                      {/* Candidate Details */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Experience:</span>
                          <span className="font-medium">{candidate.experienceYears} years</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Expected:</span>
                          <span className="font-medium">
                            ₹{(candidate.expectedSalary / 100000).toFixed(1)}L
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Rating:</span>
                          <div className="flex items-center space-x-1">
                            {renderStars(candidate.rating)}
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{candidate.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Next Action */}
                      <div className="bg-yellow-50 rounded p-2 mb-3">
                        <p className="text-xs text-yellow-700 font-medium">
                          {candidate.nextAction}
                        </p>
                        <p className="text-xs text-yellow-600">
                          Due: {new Date(candidate.nextActionDate).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-gray-500">
                          Updated{' '}
                          {Math.floor(
                            (currentTime.getTime() -
                              new Date(candidate.stageUpdatedDate).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          days ago
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded text-primary">
                            <RxEyeOpen className="w-3 h-3" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                            <RxEnvelopeClosed className="w-3 h-3" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                            <RxCalendar className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredCandidates.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <RxPerson className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No candidates in this stage</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stage Arrows */}
              {index < pipelineStages.length - 1 && (
                <div className="absolute right-0 top-1/2 transform translate-x-3 -translate-y-1/2 z-10">
                  <div className="bg-white border-2 border-gray-300 rounded-full p-2">
                    <RxArrowRight className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
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
                Position
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stage
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expected Salary
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Action
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allCandidates
              .filter((candidate) => {
                const matchesStage =
                  stageFilter === 'all' || candidate.currentStage === stageFilter;
                return matchesStage && filterCandidates([candidate]).length > 0;
              })
              .map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 relative">
                        <img
                          src={candidate.avatar}
                          alt={`${candidate.firstName} ${candidate.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(candidate.priority)}`}
                        ></div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {candidate.firstName} {candidate.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{candidate.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.appliedPosition}
                    </div>
                    <div className="text-xs text-gray-500">{candidate.department}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Chip
                      label={candidate.currentStage}
                      size="small"
                      color="primary"
                      variant="filled"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.floor(
                        (currentTime.getTime() - new Date(candidate.stageUpdatedDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-bold text-gray-900">
                      {candidate.experienceYears} years
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-bold text-gray-900">
                      ₹{(candidate.expectedSalary / 100000).toFixed(1)}L
                    </div>
                    <div className="text-xs text-gray-500">per annum</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(candidate.rating)}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getSourceIcon(candidate.source)}
                      <span className="text-sm text-gray-900 capitalize">
                        {candidate.source.replace('_', ' ')}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">{candidate.nextAction}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(candidate.nextActionDate).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded text-primary">
                        <RxEyeOpen className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                        <RxEnvelopeClosed className="w-4 h-4" />
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

  // Metrics View Component
  const MetricsView = () => (
    <div className="space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <RxPerson className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-900">{pipelineMetrics.totalCandidates}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxTimer className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Time to Hire</p>
              <p className="text-2xl font-bold text-gray-900">
                {pipelineMetrics.avgTimeToHire} days
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxTarget className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {pipelineMetrics.conversionRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Sources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Candidate Sources</h3>
          <div className="space-y-4">
            {pipelineMetrics.topSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getSourceIcon(source.source.toLowerCase().replace(' ', '_'))}
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">
                    {source.count} ({source.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stage Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                    Stage
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                    Count
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                    Avg Duration
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pipelineMetrics.stageMetrics.map((stage, index) => (
                  <tr key={index}>
                    <td className="py-3 text-sm font-medium text-gray-900">{stage.stage}</td>
                    <td className="py-3 text-center text-sm text-gray-900">{stage.count}</td>
                    <td className="py-3 text-center text-sm text-gray-900">
                      {stage.avgDuration.toFixed(1)} days
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          stage.conversionRate >= 75
                            ? 'bg-green-100 text-green-800'
                            : stage.conversionRate >= 50
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {stage.conversionRate.toFixed(0)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Hiring Pipeline</h1>
            <p className="text-gray-600">
              Track and manage candidates throughout the recruitment process
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
              <RxPerson className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-900">{totalCandidates}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxTimer className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Candidates</p>
              <p className="text-2xl font-bold text-gray-900">{activeCandidates}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Hired</p>
              <p className="text-2xl font-bold text-gray-900">{hiredCandidates}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxTarget className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {((hiredCandidates / totalCandidates) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Stage Filter (for table view) */}
          {viewMode === 'table' && (
            <div className="relative">
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="all">All Stages</option>
                {pipelineStages.map((stage) => (
                  <option key={stage.id} value={stage.name}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Source Filter */}
          <div className="relative">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source === 'all'
                    ? 'All Sources'
                    : source.charAt(0).toUpperCase() + source.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority === 'all'
                    ? 'All Priorities'
                    : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search candidates..."
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
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-2 rounded-md transition-colors text-sm ${
                viewMode === 'pipeline'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 rounded-md transition-colors text-sm ${
                viewMode === 'table'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('metrics')}
              className={`px-3 py-2 rounded-md transition-colors text-sm ${
                viewMode === 'metrics'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Metrics
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {viewMode === 'pipeline' && <PipelineView />}
        {viewMode === 'table' && <TableView />}
        {viewMode === 'metrics' && <MetricsView />}
      </div>
    </div>
  );
};

export default HiringPipeline;
