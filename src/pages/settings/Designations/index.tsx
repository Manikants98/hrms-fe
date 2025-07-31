import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import {
  RxArchive,
  RxBackpack,
  RxCheckCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxGear,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxTimer,
  RxTrash,
  RxTriangleDown,
  RxTriangleUp,
  RxStar,
} from 'react-icons/rx';
import Clock from '../../../shared/clock';

interface Designation {
  id: string;
  designationCode: string;
  designationTitle: string;
  description: string;
  department: {
    id: string;
    name: string;
    code: string;
  };
  level: number;
  category: 'junior' | 'senior' | 'lead' | 'manager' | 'director' | 'executive';
  reportingTo?: {
    id: string;
    title: string;
    code: string;
  };
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  employeeCount: number;
  vacantPositions: number;
  totalPositions: number;
  status: 'active' | 'inactive' | 'archived';
  skillsRequired: string[];
  qualifications: {
    education: string[];
    experience: string;
    certifications: string[];
  };
  responsibilities: string[];
  lastModified: string;
  modifiedBy: string;
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canArchive: boolean;
  };
  createdDate: string;
  jobFamily: string;
  gradeLevel: string;
  businessUnit: string;
  tags: string[];
}

const DesignationsMaster: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDesignations, setSelectedDesignations] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('designationTitle');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock designations data
  const designations: Designation[] = [
    {
      id: 'DSG001',
      designationCode: 'SSE',
      designationTitle: 'Senior Software Engineer',
      description:
        'Responsible for developing and maintaining software applications with focus on scalability and performance',
      department: {
        id: 'DEPT001',
        name: 'Engineering',
        code: 'ENG',
      },
      level: 4,
      category: 'senior',
      reportingTo: {
        id: 'DSG015',
        title: 'Technical Lead',
        code: 'TL',
      },
      salaryRange: {
        min: 1200000,
        max: 1800000,
        currency: 'INR',
      },
      employeeCount: 45,
      vacantPositions: 8,
      totalPositions: 53,
      status: 'active',
      skillsRequired: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
      qualifications: {
        education: ['B.Tech/B.E in Computer Science', 'MCA'],
        experience: '3-5 years',
        certifications: ['AWS Certified Developer', 'React Certification'],
      },
      responsibilities: [
        'Develop and maintain web applications',
        'Code review and mentoring junior developers',
        'Participate in architecture decisions',
        'Ensure code quality and best practices',
      ],
      lastModified: '2025-07-30T14:20:00Z',
      modifiedBy: 'HR Manager',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: true,
      },
      createdDate: '2020-03-15',
      jobFamily: 'Engineering',
      gradeLevel: 'L4',
      businessUnit: 'Technology',
      tags: ['engineering', 'development', 'senior'],
    },
    {
      id: 'DSG002',
      designationCode: 'MM',
      designationTitle: 'Marketing Manager',
      description:
        'Lead marketing initiatives, brand management, and digital marketing campaigns to drive business growth',
      department: {
        id: 'DEPT002',
        name: 'Marketing',
        code: 'MKT',
      },
      level: 6,
      category: 'manager',
      reportingTo: {
        id: 'DSG020',
        title: 'Marketing Director',
        code: 'MD',
      },
      salaryRange: {
        min: 1500000,
        max: 2500000,
        currency: 'INR',
      },
      employeeCount: 12,
      vacantPositions: 2,
      totalPositions: 14,
      status: 'active',
      skillsRequired: ['Digital Marketing', 'Brand Management', 'Analytics', 'SEO/SEM', 'Content Strategy'],
      qualifications: {
        education: ['MBA in Marketing', 'B.Com/BBA'],
        experience: '5-8 years',
        certifications: ['Google Ads', 'HubSpot Marketing', 'Facebook Blueprint'],
      },
      responsibilities: [
        'Develop and execute marketing strategies',
        'Manage marketing team and campaigns',
        'Analyze market trends and competitors',
        'Budget management and ROI optimization',
      ],
      lastModified: '2025-07-28T11:15:00Z',
      modifiedBy: 'Marketing Head',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2019-06-20',
      jobFamily: 'Marketing',
      gradeLevel: 'M2',
      businessUnit: 'Business',
      tags: ['marketing', 'management', 'strategy'],
    },
    {
      id: 'DSG003',
      designationCode: 'FA',
      designationTitle: 'Financial Analyst',
      description: 'Analyze financial data, prepare reports, and support strategic decision-making processes',
      department: {
        id: 'DEPT003',
        name: 'Finance',
        code: 'FIN',
      },
      level: 3,
      category: 'junior',
      reportingTo: {
        id: 'DSG025',
        title: 'Finance Manager',
        code: 'FM',
      },
      salaryRange: {
        min: 800000,
        max: 1200000,
        currency: 'INR',
      },
      employeeCount: 18,
      vacantPositions: 3,
      totalPositions: 21,
      status: 'active',
      skillsRequired: ['Excel', 'Financial Modeling', 'SAP', 'PowerBI', 'SQL'],
      qualifications: {
        education: ['CA', 'CFA', 'MBA Finance', 'B.Com'],
        experience: '2-4 years',
        certifications: ['CFA Level 1', 'SAP FICO', 'Advanced Excel'],
      },
      responsibilities: [
        'Financial data analysis and reporting',
        'Budget preparation and variance analysis',
        'Support month-end and year-end closing',
        'Assist in audit and compliance activities',
      ],
      lastModified: '2025-07-25T16:30:00Z',
      modifiedBy: 'Finance Head',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2020-01-10',
      jobFamily: 'Finance',
      gradeLevel: 'L3',
      businessUnit: 'Corporate',
      tags: ['finance', 'analysis', 'junior'],
    },
    {
      id: 'DSG004',
      designationCode: 'OM',
      designationTitle: 'Operations Manager',
      description:
        'Oversee daily operations, process optimization, and team management to ensure operational excellence',
      department: {
        id: 'DEPT004',
        name: 'Operations',
        code: 'OPS',
      },
      level: 7,
      category: 'manager',
      reportingTo: {
        id: 'DSG030',
        title: 'Operations Director',
        code: 'OD',
      },
      salaryRange: {
        min: 1800000,
        max: 2800000,
        currency: 'INR',
      },
      employeeCount: 8,
      vacantPositions: 1,
      totalPositions: 9,
      status: 'active',
      skillsRequired: ['Operations Management', 'Lean Six Sigma', 'Project Management', 'ERP Systems'],
      qualifications: {
        education: ['MBA Operations', 'B.Tech/B.E', 'PGDM'],
        experience: '6-10 years',
        certifications: ['Six Sigma Black Belt', 'PMP', 'Lean Management'],
      },
      responsibilities: [
        'Manage daily operations and workflows',
        'Lead process improvement initiatives',
        'Team management and performance tracking',
        'Vendor and supplier relationship management',
      ],
      lastModified: '2025-07-29T09:45:00Z',
      modifiedBy: 'Operations Head',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: true,
      },
      createdDate: '2019-05-12',
      jobFamily: 'Operations',
      gradeLevel: 'M3',
      businessUnit: 'Operations',
      tags: ['operations', 'management', 'processes'],
    },
    {
      id: 'DSG005',
      designationCode: 'HRS',
      designationTitle: 'HR Specialist',
      description: 'Handle HR operations including recruitment, employee relations, and policy implementation',
      department: {
        id: 'DEPT005',
        name: 'Human Resources',
        code: 'HR',
      },
      level: 4,
      category: 'senior',
      reportingTo: {
        id: 'DSG035',
        title: 'HR Manager',
        code: 'HRM',
      },
      salaryRange: {
        min: 1000000,
        max: 1500000,
        currency: 'INR',
      },
      employeeCount: 6,
      vacantPositions: 1,
      totalPositions: 7,
      status: 'active',
      skillsRequired: ['HRMS', 'Recruitment', 'Employee Relations', 'Labor Laws', 'Training & Development'],
      qualifications: {
        education: ['MBA HR', 'MSW', 'PGDM HR'],
        experience: '3-6 years',
        certifications: ['SHRM-CP', 'PHR', 'CHRP'],
      },
      responsibilities: [
        'Talent acquisition and recruitment',
        'Employee onboarding and orientation',
        'Policy development and implementation',
        'Employee engagement and retention',
      ],
      lastModified: '2025-07-26T13:20:00Z',
      modifiedBy: 'CHRO',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: false,
      },
      createdDate: '2020-02-28',
      jobFamily: 'Human Resources',
      gradeLevel: 'L4',
      businessUnit: 'Corporate',
      tags: ['hr', 'recruitment', 'people'],
    },
    {
      id: 'DSG006',
      designationCode: 'SE',
      designationTitle: 'Sales Executive',
      description: 'Drive sales growth through client acquisition, relationship management, and revenue generation',
      department: {
        id: 'DEPT006',
        name: 'Sales',
        code: 'SLS',
      },
      level: 3,
      category: 'junior',
      reportingTo: {
        id: 'DSG040',
        title: 'Sales Manager',
        code: 'SM',
      },
      salaryRange: {
        min: 600000,
        max: 1000000,
        currency: 'INR',
      },
      employeeCount: 25,
      vacantPositions: 5,
      totalPositions: 30,
      status: 'active',
      skillsRequired: ['Sales', 'CRM', 'Negotiation', 'Lead Generation', 'Customer Relationship'],
      qualifications: {
        education: ['Any Graduate', 'MBA Sales & Marketing'],
        experience: '1-3 years',
        certifications: ['Salesforce Certified', 'HubSpot Sales'],
      },
      responsibilities: [
        'Generate leads and convert prospects',
        'Maintain customer relationships',
        'Achieve sales targets and KPIs',
        'Prepare sales reports and forecasts',
      ],
      lastModified: '2025-07-31T10:00:00Z',
      modifiedBy: 'Sales Director',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2021-08-15',
      jobFamily: 'Sales',
      gradeLevel: 'L3',
      businessUnit: 'Business',
      tags: ['sales', 'revenue', 'client'],
    },
    {
      id: 'DSG007',
      designationCode: 'RS',
      designationTitle: 'Research Scientist',
      description: 'Conduct advanced research, innovation projects, and develop new technologies and solutions',
      department: {
        id: 'DEPT007',
        name: 'Research & Development',
        code: 'R&D',
      },
      level: 8,
      category: 'lead',
      reportingTo: {
        id: 'DSG045',
        title: 'R&D Director',
        code: 'RDD',
      },
      salaryRange: {
        min: 2000000,
        max: 3500000,
        currency: 'INR',
      },
      employeeCount: 4,
      vacantPositions: 2,
      totalPositions: 6,
      status: 'active',
      skillsRequired: ['Research', 'Innovation', 'Data Science', 'Machine Learning', 'Patent Writing'],
      qualifications: {
        education: ['PhD', 'M.Tech', 'MS/M.S'],
        experience: '5-10 years',
        certifications: ['Research Publications', 'Patents', 'Industry Recognition'],
      },
      responsibilities: [
        'Lead research projects and innovation',
        'Publish research papers and patents',
        'Collaborate with academic institutions',
        'Mentor junior researchers',
      ],
      lastModified: '2025-07-24T15:30:00Z',
      modifiedBy: 'CTO',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2020-11-03',
      jobFamily: 'Research',
      gradeLevel: 'L8',
      businessUnit: 'Technology',
      tags: ['research', 'innovation', 'leadership'],
    },
    {
      id: 'DSG008',
      designationCode: 'SA',
      designationTitle: 'System Administrator',
      description: 'Manage IT infrastructure, system maintenance, security, and technical support operations',
      department: {
        id: 'DEPT008',
        name: 'Information Technology',
        code: 'IT',
      },
      level: 5,
      category: 'senior',
      reportingTo: {
        id: 'DSG050',
        title: 'IT Manager',
        code: 'ITM',
      },
      salaryRange: {
        min: 900000,
        max: 1400000,
        currency: 'INR',
      },
      employeeCount: 3,
      vacantPositions: 0,
      totalPositions: 3,
      status: 'inactive',
      skillsRequired: ['Linux', 'Windows Server', 'VMware', 'Networking', 'Security'],
      qualifications: {
        education: ['B.Tech IT/CS', 'MCA', 'Diploma IT'],
        experience: '4-7 years',
        certifications: ['RHCE', 'MCSE', 'VMware VCP', 'CISSP'],
      },
      responsibilities: [
        'Server and network administration',
        'System security and backup management',
        'User support and troubleshooting',
        'Infrastructure monitoring and maintenance',
      ],
      lastModified: '2025-07-20T12:15:00Z',
      modifiedBy: 'CIO',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: true,
      },
      createdDate: '2019-04-22',
      jobFamily: 'Information Technology',
      gradeLevel: 'L5',
      businessUnit: 'Technology',
      tags: ['it', 'infrastructure', 'administration'],
    },
  ];

  // Filter designations
  const filteredDesignations = designations.filter((designation) => {
    const matchesSearch =
      designation.designationTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.designationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.skillsRequired.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      designation.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Sort designations
  const sortedDesignations = [...filteredDesignations].sort((a, b) => {
    const aValue = a[sortField as keyof Designation];
    const bValue = b[sortField as keyof Designation];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'archived':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <RxTimer className="w-4 h-4 text-yellow-500" />;
      case 'archived':
        return <RxArchive className="w-4 h-4 text-red-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'executive':
        return 'error';
      case 'director':
        return 'warning';
      case 'manager':
        return 'primary';
      case 'lead':
        return 'info';
      case 'senior':
        return 'success';
      case 'junior':
        return 'default';
      default:
        return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'executive':
        return <RxStar className="w-4 h-4 text-red-500" />;
      case 'director':
        return <RxStar className="w-4 h-4 text-yellow-500" />;
      case 'manager':
        return <FaUserTie className="w-4 h-4 text-blue-500" />;
      case 'lead':
        return <RxBackpack className="w-4 h-4 text-purple-500" />;
      case 'senior':
        return <RxPerson className="w-4 h-4 text-green-500" />;
      case 'junior':
        return <RxPerson className="w-4 h-4 text-gray-500" />;
      default:
        return <RxPerson className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDesignations(sortedDesignations.map((designation) => designation.id));
    } else {
      setSelectedDesignations([]);
    }
  };

  const handleSelectDesignation = (designationId: string, checked: boolean) => {
    if (checked) {
      setSelectedDesignations([...selectedDesignations, designationId]);
    } else {
      setSelectedDesignations(selectedDesignations.filter((id) => id !== designationId));
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <RxTriangleUp className="w-4 h-4 ml-1" />
    ) : (
      <RxTriangleDown className="w-4 h-4 ml-1" />
    );
  };

  // Calculate statistics
  const totalDesignations = designations.length;
  const activeDesignations = designations.filter((d) => d.status === 'active').length;
  const totalPositions = designations.reduce((sum, d) => sum + d.totalPositions, 0);
  const vacantPositions = designations.reduce((sum, d) => sum + d.vacantPositions, 0);

  // Table View Component
  const TableView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedDesignations.length === sortedDesignations.length && sortedDesignations.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('designationCode')}
              >
                <div className="flex whitespace-nowrap items-center">Code {getSortIcon('designationCode')}</div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('designationTitle')}
              >
                <div className="flex whitespace-nowrap items-center">Designation {getSortIcon('designationTitle')}</div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('level')}
              >
                <div className="flex items-center justify-center">
                  Level & Category
                  {getSortIcon('level')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('employeeCount')}
              >
                <div className="flex items-center justify-center">
                  Positions
                  {getSortIcon('employeeCount')}
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary Range
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center justify-center">
                  Status
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedDesignations.map((designation) => (
              <tr key={designation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedDesignations.includes(designation.id)}
                    onChange={(e) => handleSelectDesignation(designation.id, e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{designation.designationCode}</div>
                  <div className="text-xs text-gray-500">{designation.gradeLevel}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{designation.designationTitle}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{designation.description}</div>
                  <div className="text-xs text-blue-600 mt-1">{designation.jobFamily}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{designation.department.name}</div>
                  <div className="text-xs text-gray-500">{designation.department.code}</div>
                  <div className="text-xs text-blue-600">{designation.businessUnit}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    {getCategoryIcon(designation.category)}
                    <span className="text-sm font-medium text-gray-900">L{designation.level}</span>
                  </div>
                  <Chip
                    label={designation.category.charAt(0).toUpperCase() + designation.category.slice(1)}
                    size="small"
                    color={getCategoryColor(designation.category)}
                    variant="outlined"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-lg font-bold text-gray-900">{formatNumber(designation.employeeCount)}</div>
                  <div className="text-xs text-gray-500">{formatNumber(designation.totalPositions)} total</div>
                  {designation.vacantPositions > 0 && (
                    <div className="text-xs text-red-600">{designation.vacantPositions} vacant</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(designation.salaryRange.min)}</div>
                  <div className="text-xs text-gray-500">to</div>
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(designation.salaryRange.max)}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(designation.status)}
                    <Chip
                      label={designation.status.charAt(0).toUpperCase() + designation.status.slice(1)}
                      size="small"
                      color={getStatusColor(designation.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary" title="View Details">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    {designation.permissions.canEdit && (
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Edit Designation">
                        <RxPencil1 className="w-4 h-4" />
                      </button>
                    )}
                    {designation.permissions.canArchive && (
                      <button className="p-1 hover:bg-gray-100 rounded text-yellow-600" title="Archive Designation">
                        <RxArchive className="w-4 h-4" />
                      </button>
                    )}
                    {designation.permissions.canDelete && (
                      <button className="p-1 hover:bg-gray-100 rounded text-red-600" title="Delete Designation">
                        <RxTrash className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1 hover:bg-gray-100 rounded" title="More Options">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Designations Master</h1>
            <p className="text-gray-600">Manage job roles, hierarchies, salary ranges, and organizational structure</p>
          </div>
          <Clock />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <FaUserTie className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Designations</p>
              <p className="text-2xl font-bold text-gray-900">{totalDesignations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Designations</p>
              <p className="text-2xl font-bold text-gray-900">{activeDesignations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxPerson className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Positions</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalPositions)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <RxBackpack className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Vacant Positions</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(vacantPositions)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search designations..."
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
          {/* Bulk Actions */}
          {selectedDesignations.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedDesignations.length} selected</span>
              <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200">
                Archive
              </button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200">Delete</button>
            </div>
          )}

          {/* Add Designation Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Add Designation</span>
          </button>

          {/* Export Button */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxDownload className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredDesignations.length} of {totalDesignations} designations
        </p>
      </div>

      {/* Table Content */}
      <TableView />
    </div>
  );
};

export default DesignationsMaster;
