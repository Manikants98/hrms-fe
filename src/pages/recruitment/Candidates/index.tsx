import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  RxBadge,
  RxBarChart,
  RxCalendar,
  RxCheckCircled,
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
  RxPlus,
  RxRows,
  RxShare1,
  RxStar,
  RxStarFilled,
  RxTarget,
  RxTimer,
} from 'react-icons/rx';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  currentJobTitle: string;
  currentEmployer: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  experienceYears: number;
  expectedSalary: number;
  currentSalary: number;
  skills: string[];
  education: string;
  applicationDate: string;
  lastInteractionDate: string;
  source: 'linkedin' | 'job_board' | 'referral' | 'career_page' | 'social_media';
  status: 'new' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected' | 'on_hold';
  appliedPosition: string;
  department: string;
  hiringManager: {
    name: string;
    avatar: string;
    title: string;
  };
  rating: number;
  notes: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  isStarred: boolean;
  priority: 'high' | 'medium' | 'low';
  interviewStage: string;
  nextAction: string;
  nextActionDate: string;
}

const Candidates: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock candidates data
  const candidates: Candidate[] = [
    {
      id: 'CAND001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+91-9876543210',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
      currentJobTitle: 'Senior Frontend Developer',
      currentEmployer: 'Microsoft India',
      location: {
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
      },
      experienceYears: 6,
      expectedSalary: 2800000,
      currentSalary: 2200000,
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      education: 'B.Tech Computer Science',
      applicationDate: '2025-07-28',
      lastInteractionDate: '2025-07-29',
      source: 'linkedin',
      status: 'interviewing',
      appliedPosition: 'Senior Frontend Developer',
      department: 'Engineering',
      hiringManager: {
        name: 'Raj Patel',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        title: 'Engineering Manager',
      },
      rating: 4.5,
      notes: 'Strong technical skills, great communication. Moving to final round.',
      resumeUrl: '#',
      linkedinUrl: '#',
      portfolioUrl: '#',
      isStarred: true,
      priority: 'high',
      interviewStage: 'Technical Round 2',
      nextAction: 'Final Interview',
      nextActionDate: '2025-08-02',
    },
    {
      id: 'CAND002',
      firstName: 'Arjun',
      lastName: 'Kumar',
      email: 'arjun.kumar@email.com',
      phone: '+91-8765432109',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      currentJobTitle: 'Product Manager',
      currentEmployer: 'Flipkart',
      location: {
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
      },
      experienceYears: 5,
      expectedSalary: 2500000,
      currentSalary: 1800000,
      skills: ['Product Strategy', 'Data Analysis', 'Agile', 'SQL', 'Figma'],
      education: 'MBA from IIM Bangalore',
      applicationDate: '2025-07-26',
      lastInteractionDate: '2025-07-28',
      source: 'referral',
      status: 'offer',
      appliedPosition: 'Senior Product Manager',
      department: 'Product',
      hiringManager: {
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'VP Product',
      },
      rating: 4.8,
      notes: 'Excellent product sense and leadership skills. Offer extended.',
      resumeUrl: '#',
      linkedinUrl: '#',
      isStarred: true,
      priority: 'high',
      interviewStage: 'Completed',
      nextAction: 'Awaiting Response',
      nextActionDate: '2025-08-05',
    },
    {
      id: 'CAND003',
      firstName: 'Meera',
      lastName: 'Patel',
      email: 'meera.patel@email.com',
      phone: '+91-7654321098',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      currentJobTitle: 'UX Designer',
      currentEmployer: 'Swiggy',
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
      },
      experienceYears: 4,
      expectedSalary: 1800000,
      currentSalary: 1400000,
      skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      education: 'Bachelor of Design',
      applicationDate: '2025-07-25',
      lastInteractionDate: '2025-07-27',
      source: 'job_board',
      status: 'screening',
      appliedPosition: 'Senior UX Designer',
      department: 'Design',
      hiringManager: {
        name: 'Lisa Anderson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        title: 'Design Director',
      },
      rating: 4.2,
      notes: 'Strong portfolio, scheduling technical interview.',
      resumeUrl: '#',
      linkedinUrl: '#',
      portfolioUrl: '#',
      isStarred: false,
      priority: 'medium',
      interviewStage: 'Portfolio Review',
      nextAction: 'Technical Interview',
      nextActionDate: '2025-08-01',
    },
    {
      id: 'CAND004',
      firstName: 'Vikram',
      lastName: 'Singh',
      email: 'vikram.singh@email.com',
      phone: '+91-6543210987',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      currentJobTitle: 'Data Scientist',
      currentEmployer: 'Paytm',
      location: {
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
      },
      experienceYears: 3,
      expectedSalary: 2000000,
      currentSalary: 1500000,
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
      education: 'M.Tech in Data Science',
      applicationDate: '2025-07-24',
      lastInteractionDate: '2025-07-26',
      source: 'career_page',
      status: 'new',
      appliedPosition: 'Data Scientist',
      department: 'Analytics',
      hiringManager: {
        name: 'Dr. Anita Verma',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Head of Analytics',
      },
      rating: 0,
      notes: 'New application, need to review resume.',
      resumeUrl: '#',
      linkedinUrl: '#',
      isStarred: false,
      priority: 'low',
      interviewStage: 'Application Review',
      nextAction: 'Initial Screening',
      nextActionDate: '2025-07-31',
    },
    {
      id: 'CAND005',
      firstName: 'Kavya',
      lastName: 'Reddy',
      email: 'kavya.reddy@email.com',
      phone: '+91-5432109876',
      avatar: 'https://i.pinimg.com/736x/f7/d6/8e/f7d68ecbb1ebfac8c35c20ff9acfbf0f.jpg',
      currentJobTitle: 'Marketing Manager',
      currentEmployer: 'Zomato',
      location: {
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
      },
      experienceYears: 7,
      expectedSalary: 2200000,
      currentSalary: 1700000,
      skills: ['Digital Marketing', 'SEO/SEM', 'Social Media', 'Analytics', 'Campaign Management'],
      education: 'MBA Marketing',
      applicationDate: '2025-07-22',
      lastInteractionDate: '2025-07-25',
      source: 'social_media',
      status: 'rejected',
      appliedPosition: 'Senior Marketing Manager',
      department: 'Marketing',
      hiringManager: {
        name: 'Rohit Sharma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        title: 'Marketing Director',
      },
      rating: 3.2,
      notes: 'Good experience but looking for different skill set.',
      resumeUrl: '#',
      linkedinUrl: '#',
      isStarred: false,
      priority: 'low',
      interviewStage: 'Completed',
      nextAction: 'Rejection Email Sent',
      nextActionDate: '2025-07-25',
    },
    {
      id: 'CAND006',
      firstName: 'Rahul',
      lastName: 'Gupta',
      email: 'rahul.gupta@email.com',
      phone: '+91-4321098765',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      currentJobTitle: 'DevOps Engineer',
      currentEmployer: 'Freshworks',
      location: {
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
      },
      experienceYears: 4,
      expectedSalary: 2100000,
      currentSalary: 1600000,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
      education: 'B.E. Computer Science',
      applicationDate: '2025-07-27',
      lastInteractionDate: '2025-07-29',
      source: 'linkedin',
      status: 'on_hold',
      appliedPosition: 'Senior DevOps Engineer',
      department: 'Engineering',
      hiringManager: {
        name: 'Suresh Kumar',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        title: 'DevOps Lead',
      },
      rating: 4.0,
      notes: 'Strong technical skills, on hold due to budget approval.',
      resumeUrl: '#',
      linkedinUrl: '#',
      isStarred: false,
      priority: 'medium',
      interviewStage: 'Technical Round Completed',
      nextAction: 'Budget Approval',
      nextActionDate: '2025-08-10',
    },
  ];

  const statuses = ['all', 'new', 'screening', 'interviewing', 'offer', 'hired', 'rejected', 'on_hold'];
  const sources = ['all', 'linkedin', 'job_board', 'referral', 'career_page', 'social_media'];

  // Filter candidates
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.currentJobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.currentEmployer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || candidate.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'primary';
      case 'screening':
        return 'warning';
      case 'interviewing':
        return 'warning';
      case 'offer':
        return 'success';
      case 'hired':
        return 'success';
      case 'rejected':
        return 'error';
      case 'on_hold':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <RxPlus className="w-4 h-4 text-blue-500" />;
      case 'screening':
        return <RxEyeOpen className="w-4 h-4 text-yellow-500" />;
      case 'interviewing':
        return <RxPerson className="w-4 h-4 text-orange-500" />;
      case 'offer':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'hired':
        return <RxBadge className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'on_hold':
        return <RxTimer className="w-4 h-4 text-blue-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'linkedin':
        return <RxShare1 className="w-4 h-4 text-blue-600" />;
      case 'job_board':
        return <RxFileText className="w-4 h-4 text-green-600" />;
      case 'referral':
        return <RxPerson className="w-4 h-4 text-purple-600" />;
      case 'career_page':
        return <RxHome className="w-4 h-4 text-orange-600" />;
      case 'social_media':
        return <RxTarget className="w-4 h-4 text-pink-600" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
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

  // Calculate statistics
  const totalCandidates = candidates.length;
  const newCandidates = candidates.filter((c) => c.status === 'new').length;
  const interviewingCandidates = candidates.filter((c) => c.status === 'interviewing').length;
  const offersExtended = candidates.filter((c) => c.status === 'offer').length;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredCandidates.map((candidate) => (
        <div
          key={candidate.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority and Star Indicator */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            {candidate.isStarred && <RxStarFilled className="w-4 h-4 text-yellow-400" />}
            <div
              className={`w-2 h-2 rounded-full ${
                candidate.priority === 'high'
                  ? 'bg-red-500'
                  : candidate.priority === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
              }`}
            ></div>
          </div>

          {/* Header with candidate info and status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={candidate.avatar}
                alt={`${candidate.firstName} ${candidate.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {candidate.firstName} {candidate.lastName}
                </h3>
                <p className="text-sm text-gray-500">{candidate.currentJobTitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(candidate.status)}
              <button className="p-1 hover:bg-gray-100 rounded">
                <RxDotsVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Employment */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Current:</span>
              <span className="text-sm font-medium text-gray-900">{candidate.currentEmployer}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Location:</span>
              <span className="text-sm text-gray-900">
                {candidate.location.city}, {candidate.location.state}
              </span>
            </div>
          </div>

          {/* Applied Position */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <RxTarget className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Applied For</span>
            </div>
            <p className="text-sm font-bold text-gray-900">{candidate.appliedPosition}</p>
            <p className="text-xs text-gray-500">{candidate.department} Department</p>
          </div>

          {/* Experience and Salary */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">Experience</p>
              <p className="text-sm font-bold text-gray-900">{candidate.experienceYears} years</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Expected Salary</p>
              <p className="text-sm font-bold text-gray-900">₹{(candidate.expectedSalary / 100000).toFixed(1)}L</p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Key Skills</p>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 4).map((skill, index) => (
                <Chip key={index} label={skill} size="small" variant="outlined" color="primary" className="text-xs" />
              ))}
              {candidate.skills.length > 4 && (
                <span className="text-xs text-gray-500">+{candidate.skills.length - 4} more</span>
              )}
            </div>
          </div>

          {/* Rating */}
          {candidate.rating > 0 && (
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Rating:</span>
                <div className="flex items-center space-x-1">
                  {renderStars(candidate.rating)}
                  <span className="text-xs text-gray-600">({candidate.rating.toFixed(1)})</span>
                </div>
              </div>
            </div>
          )}

          {/* Source and Application Date */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              {getSourceIcon(candidate.source)}
              <span className="capitalize">{candidate.source.replace('_', ' ')}</span>
            </div>
            <div>Applied: {new Date(candidate.applicationDate).toLocaleDateString()}</div>
          </div>

          {/* Next Action */}
          <div className="mb-4 p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700 font-medium">{candidate.nextAction}</span>
              <span className="text-xs text-blue-600">{new Date(candidate.nextActionDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1).replace('_', ' ')}
              size="small"
              color={getStatusColor(candidate.status)}
              variant="filled"
            />
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxEnvelopeClosed className="w-4 h-4" />
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
                Candidate
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Position
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
                Status
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
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={candidate.avatar}
                        alt={`${candidate.firstName} ${candidate.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {candidate.isStarred && (
                        <RxStarFilled className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                        <span>
                          {candidate.firstName} {candidate.lastName}
                        </span>
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(candidate.priority).replace('text-', 'bg-')}`}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {candidate.currentJobTitle} at {candidate.currentEmployer}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{candidate.appliedPosition}</div>
                  <div className="text-xs text-gray-500">{candidate.department}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">{candidate.experienceYears} years</div>
                  <div className="text-xs text-gray-500">{candidate.education}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    ₹{(candidate.expectedSalary / 100000).toFixed(1)}L
                  </div>
                  <div className="text-xs text-gray-500">
                    Current: ₹{(candidate.currentSalary / 100000).toFixed(1)}L
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {candidate.rating > 0 ? (
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(candidate.rating)}
                      <span className="text-xs text-gray-600 ml-1">({candidate.rating.toFixed(1)})</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Not rated</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(candidate.status)}
                    <Chip
                      label={candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1).replace('_', ' ')}
                      size="small"
                      color={getStatusColor(candidate.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1">
                    {getSourceIcon(candidate.source)}
                    <span className="text-sm text-gray-900 capitalize">{candidate.source.replace('_', ' ')}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Applied: {new Date(candidate.applicationDate).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{candidate.nextAction}</div>
                  <div className="text-xs text-gray-500">{new Date(candidate.nextActionDate).toLocaleDateString()}</div>
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Candidates</h1>
            <p className="text-gray-600">Track and manage candidate applications throughout the hiring process</p>
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
            <div className="p-3 rounded-full bg-green-100">
              <RxPlus className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">New Applications</p>
              <p className="text-2xl font-bold text-gray-900">{newCandidates}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxPerson className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Interviewing</p>
              <p className="text-2xl font-bold text-gray-900">{interviewingCandidates}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxCheckCircled className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Offers Extended</p>
              <p className="text-2xl font-bold text-gray-900">{offersExtended}</p>
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
            <span>Add Candidate</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxDownload className="w-4 h-4" />
            <span>Import Candidates</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxCalendar className="w-4 h-4" />
            <span>Schedule Interview</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>View Analytics</span>
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
          Showing {filteredCandidates.length} of {candidates.length} candidates
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default Candidates;
