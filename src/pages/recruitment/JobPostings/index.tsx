import React, { useEffect, useState } from 'react';
import { RiMoneyCnyBoxLine } from 'react-icons/ri';
import {
  RxBackpack,
  RxBadge,
  RxBarChart,
  RxCheckCircled,
  RxClock,
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
  RxShare1,
  RxTimer,
} from 'react-icons/rx';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  closingDate: string;
  status: 'active' | 'paused' | 'closed' | 'draft';
  applicationsCount: number;
  viewsCount: number;
  hiringManager: {
    name: string;
    avatar: string;
    title: string;
  };
  isUrgent: boolean;
  isRemote: boolean;
}

const JobPostings: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState<string>('all');
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

  // Mock job postings data
  const jobPostings: JobPosting[] = [
    {
      id: 'JP001',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Bangalore, India',
      employmentType: 'full-time',
      experienceLevel: 'senior',
      salaryRange: {
        min: 1500000,
        max: 2500000,
        currency: 'INR',
      },
      description:
        'We are looking for a Senior Frontend Developer to join our growing engineering team. You will be responsible for building scalable web applications using React, TypeScript, and modern frontend technologies.',
      requirements: [
        '5+ years of React.js experience',
        'Strong TypeScript skills',
        'Experience with state management (Redux/Zustand)',
        'Knowledge of testing frameworks (Jest, Cypress)',
        "Bachelor's degree in Computer Science or related field",
      ],
      responsibilities: [
        'Build responsive web applications',
        'Collaborate with design and backend teams',
        'Write clean, maintainable code',
        'Mentor junior developers',
        'Participate in code reviews',
      ],
      benefits: [
        'Health insurance',
        'Flexible working hours',
        'Remote work options',
        'Learning budget',
        'Stock options',
      ],
      postedDate: '2025-07-25',
      closingDate: '2025-08-25',
      status: 'active',
      applicationsCount: 47,
      viewsCount: 234,
      hiringManager: {
        name: 'Sarah Johnson',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
        title: 'Engineering Manager',
      },
      isUrgent: true,
      isRemote: true,
    },
    {
      id: 'JP002',
      title: 'Product Marketing Manager',
      department: 'Marketing',
      location: 'Mumbai, India',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      salaryRange: {
        min: 1200000,
        max: 1800000,
        currency: 'INR',
      },
      description:
        'Join our marketing team as a Product Marketing Manager to drive go-to-market strategies and product positioning for our enterprise solutions.',
      requirements: [
        '3-5 years in product marketing',
        'B2B SaaS experience preferred',
        'Strong analytical skills',
        'MBA or equivalent experience',
        'Excellent communication skills',
      ],
      responsibilities: [
        'Develop go-to-market strategies',
        'Create marketing collateral',
        'Conduct market research',
        'Work with sales teams',
        'Track marketing metrics',
      ],
      benefits: [
        'Health insurance',
        'Performance bonuses',
        'Travel allowances',
        'Professional development',
        'Flexible PTO',
      ],
      postedDate: '2025-07-22',
      closingDate: '2025-08-22',
      status: 'active',
      applicationsCount: 28,
      viewsCount: 156,
      hiringManager: {
        name: 'Michael Chen',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        title: 'Head of Marketing',
      },
      isUrgent: false,
      isRemote: false,
    },
    {
      id: 'JP003',
      title: 'Data Scientist',
      department: 'Analytics',
      location: 'Hyderabad, India',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      salaryRange: {
        min: 1400000,
        max: 2200000,
        currency: 'INR',
      },
      description:
        "We're seeking a Data Scientist to help us derive insights from large datasets and build machine learning models to improve our products.",
      requirements: [
        '3+ years in data science',
        'Python/R proficiency',
        'Machine learning expertise',
        'SQL and database knowledge',
        'Masters in Statistics/CS preferred',
      ],
      responsibilities: [
        'Build predictive models',
        'Analyze customer data',
        'Create data visualizations',
        'Collaborate with product teams',
        'Present findings to stakeholders',
      ],
      benefits: [
        'Health insurance',
        'Learning stipend',
        'Conference attendance',
        'Flexible hours',
        'Stock options',
      ],
      postedDate: '2025-07-20',
      closingDate: '2025-08-20',
      status: 'active',
      applicationsCount: 62,
      viewsCount: 312,
      hiringManager: {
        name: 'Dr. Priya Sharma',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Head of Analytics',
      },
      isUrgent: false,
      isRemote: true,
    },
    {
      id: 'JP004',
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Pune, India',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      salaryRange: {
        min: 1300000,
        max: 2000000,
        currency: 'INR',
      },
      description:
        'Looking for a DevOps Engineer to help scale our infrastructure and improve our deployment processes using modern cloud technologies.',
      requirements: [
        '3+ years DevOps experience',
        'AWS/Azure cloud expertise',
        'Docker & Kubernetes',
        'CI/CD pipeline experience',
        'Infrastructure as Code',
      ],
      responsibilities: [
        'Manage cloud infrastructure',
        'Automate deployment processes',
        'Monitor system performance',
        'Ensure security compliance',
        'Troubleshoot production issues',
      ],
      benefits: [
        'Health insurance',
        'On-call compensation',
        'Cloud certifications',
        'Flexible work',
        'Performance bonuses',
      ],
      postedDate: '2025-07-18',
      closingDate: '2025-08-18',
      status: 'paused',
      applicationsCount: 35,
      viewsCount: 189,
      hiringManager: {
        name: 'David Wilson',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        title: 'VP Engineering',
      },
      isUrgent: true,
      isRemote: true,
    },
    {
      id: 'JP005',
      title: 'UX Designer',
      department: 'Design',
      location: 'Delhi, India',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      salaryRange: {
        min: 1000000,
        max: 1600000,
        currency: 'INR',
      },
      description:
        'Join our design team to create exceptional user experiences for our enterprise software products used by millions of users worldwide.',
      requirements: [
        '3-5 years UX design experience',
        'Portfolio of B2B products',
        'Figma/Sketch proficiency',
        'User research experience',
        'Design systems knowledge',
      ],
      responsibilities: [
        'Design user interfaces',
        'Conduct user research',
        'Create design systems',
        'Prototype interactions',
        'Collaborate with developers',
      ],
      benefits: [
        'Health insurance',
        'Design tools budget',
        'Conference tickets',
        'Flexible hours',
        'Creative sabbaticals',
      ],
      postedDate: '2025-07-15',
      closingDate: '2025-08-15',
      status: 'active',
      applicationsCount: 42,
      viewsCount: 278,
      hiringManager: {
        name: 'Lisa Anderson',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        title: 'Design Director',
      },
      isUrgent: false,
      isRemote: true,
    },
    {
      id: 'JP006',
      title: 'Sales Development Representative',
      department: 'Sales',
      location: 'Gurgaon, India',
      employmentType: 'full-time',
      experienceLevel: 'entry',
      salaryRange: {
        min: 600000,
        max: 1000000,
        currency: 'INR',
      },
      description:
        "We're looking for energetic SDRs to help us expand our customer base by generating qualified leads and building relationships with prospects.",
      requirements: [
        '1-2 years sales experience',
        'Strong communication skills',
        'CRM experience (Salesforce)',
        'Goal-oriented mindset',
        "Bachelor's degree preferred",
      ],
      responsibilities: [
        'Generate qualified leads',
        'Cold outreach campaigns',
        'Schedule product demos',
        'Maintain CRM data',
        'Meet monthly quotas',
      ],
      benefits: [
        'Base + commission',
        'Health insurance',
        'Sales training',
        'Career growth path',
        'Team outings',
      ],
      postedDate: '2025-07-28',
      closingDate: '2025-08-28',
      status: 'draft',
      applicationsCount: 0,
      viewsCount: 0,
      hiringManager: {
        name: 'Raj Patel',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        title: 'Sales Manager',
      },
      isUrgent: false,
      isRemote: false,
    },
  ];

  const departments = ['all', ...Array.from(new Set(jobPostings.map((job) => job.department)))];
  const statuses = ['all', 'active', 'paused', 'closed', 'draft'];
  const employmentTypes = ['all', 'full-time', 'part-time', 'contract', 'internship'];

  // Filter job postings
  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesEmploymentType =
      employmentTypeFilter === 'all' || job.employmentType === employmentTypeFilter;

    return matchesSearch && matchesDepartment && matchesStatus && matchesEmploymentType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'closed':
        return 'error';
      case 'draft':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'paused':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'closed':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'draft':
        return <RxFileText className="w-4 h-4 text-blue-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getEmploymentTypeIcon = (type: string) => {
    switch (type) {
      case 'full-time':
        return <RxBadge className="w-4 h-4 text-blue-500" />;
      case 'part-time':
        return <RxClock className="w-4 h-4 text-green-500" />;
      case 'contract':
        return <RxFileText className="w-4 h-4 text-purple-500" />;
      case 'internship':
        return <RxBackpack className="w-4 h-4 text-orange-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case 'entry':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'mid':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'senior':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'executive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate statistics
  const totalJobs = jobPostings.length;
  const activeJobs = jobPostings.filter((j) => j.status === 'active').length;
  const totalApplications = jobPostings.reduce((sum, job) => sum + job.applicationsCount, 0);
  const avgApplicationsPerJob = totalApplications > 0 ? totalApplications / totalJobs : 0;

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredJobs.map((job) => (
        <div
          key={job.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Urgent Badge */}
          {job.isUrgent && (
            <div className="absolute top-3 right-3">
              <Chip label="Urgent" color="error" size="small" className="text-xs" />
            </div>
          )}

          {/* Header with title and status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">{job.title}</h3>
              <p className="text-sm text-gray-500">
                {job.department} • {job.location}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(job.status)}
              <button className="p-1 hover:bg-gray-100 rounded">
                <RxDotsVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Employment Type and Experience Level */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              {getEmploymentTypeIcon(job.employmentType)}
              <span className="text-sm text-gray-600 capitalize">
                {job.employmentType.replace('-', ' ')}
              </span>
            </div>
            <span className="text-gray-300">•</span>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getExperienceLevelColor(job.experienceLevel)}`}
            >
              {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)} Level
            </span>
          </div>

          {/* Salary Range */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <RiMoneyCnyBoxLine className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Salary Range</span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              ₹{(job.salaryRange.min / 100000).toFixed(1)}L - ₹
              {(job.salaryRange.max / 100000).toFixed(1)}L
            </p>
            <p className="text-xs text-gray-500">per annum</p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
          </div>

          {/* Key Requirements */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Key Requirements</h4>
            <div className="space-y-1">
              {job.requirements.slice(0, 3).map((req, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-primary text-xs mt-1">•</span>
                  <span className="text-xs text-gray-600">{req}</span>
                </div>
              ))}
              {job.requirements.length > 3 && (
                <p className="text-xs text-gray-500">
                  +{job.requirements.length - 3} more requirements
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center space-x-2 mb-4">
            {job.isRemote && (
              <Chip label="Remote" color="primary" size="small" variant="outlined" />
            )}
            <Chip label={job.department} size="small" variant="outlined" />
          </div>

          {/* Hiring Manager */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={job.hiringManager.avatar}
              alt={job.hiringManager.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{job.hiringManager.name}</p>
              <p className="text-xs text-gray-500">{job.hiringManager.title}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">{job.applicationsCount}</span> applications
            </div>
            <div>
              <span className="font-medium">{job.viewsCount}</span> views
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <Chip
                label={job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                size="small"
                color={getStatusColor(job.status)}
                variant="filled"
              />
              <span className="text-xs text-gray-500">
                Closes: {new Date(job.closingDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded text-primary">
                <RxEyeOpen className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                <RxPencil1 className="w-4 h-4" />
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
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary Range
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applications
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Closing Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">{getEmploymentTypeIcon(job.employmentType)}</div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                        <span>{job.title}</span>
                        {job.isUrgent && <RxLightningBolt className="w-4 h-4 text-red-500" />}
                        {job.isRemote && <span className="text-xs text-blue-600">Remote</span>}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}{' '}
                        Level
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{job.department}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {job.employmentType.replace('-', ' ')}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{job.location}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    ₹{(job.salaryRange.min / 100000).toFixed(1)}L - ₹
                    {(job.salaryRange.max / 100000).toFixed(1)}L
                  </div>
                  <div className="text-xs text-gray-500">per annum</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">{job.applicationsCount}</div>
                  <div className="text-xs text-gray-500">{job.viewsCount} views</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(job.status)}
                    <Chip
                      label={job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      size="small"
                      color={getStatusColor(job.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">
                    {new Date(job.closingDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </div>
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
                      <RxShare1 className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Postings</h1>
            <p className="text-gray-600">Create and manage job openings for your organization</p>
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
              <p className="text-sm font-medium text-gray-500">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{activeJobs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxPerson className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxBarChart className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Applications</p>
              <p className="text-2xl font-bold text-gray-900">{avgApplicationsPerJob.toFixed(1)}</p>
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
            <span>Create New Job</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxFileText className="w-4 h-4" />
            <span>Job Templates</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxDownload className="w-4 h-4" />
            <span>Bulk Actions</span>
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
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type Filter */}
          <div className="relative">
            <select
              value={employmentTypeFilter}
              onChange={(e) => setEmploymentTypeFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {employmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'All Types'
                    : type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search job postings..."
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
          Showing {filteredJobs.length} of {jobPostings.length} job postings
          {departmentFilter !== 'all' && ` in ${departmentFilter}`}
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default JobPostings;
