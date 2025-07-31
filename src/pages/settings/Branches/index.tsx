import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import {
  RxArchive,
  RxCheckCircled,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxGear,
  RxGlobe,
  RxHome,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPerson,
  RxPlus,
  RxTimer,
  RxTrash,
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';
import Clock from '../../../shared/clock';

interface Branch {
  id: string;
  branchCode: string;
  branchName: string;
  description: string;
  branchManager: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    landmark?: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    fax?: string;
    website?: string;
  };
  operationalDetails: {
    establishedDate: string;
    branchType: 'head_office' | 'regional' | 'local' | 'satellite' | 'virtual';
    timezone: string;
    currency: string;
    workingHours: {
      start: string;
      end: string;
      workingDays: string[];
    };
  };
  employeeCount: number;
  departmentCount: number;
  totalCapacity: number;
  currentOccupancy: number;
  budget: number;
  revenue: number;
  parentBranch?: string;
  childBranches: string[];
  status: 'active' | 'inactive' | 'under_construction' | 'closed';
  businessUnit: string;
  region: string;
  facilities: string[];
  lastModified: string;
  modifiedBy: string;
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canArchive: boolean;
  };
  createdDate: string;
  tags: string[];
  compliance: {
    licenses: string[];
    certifications: string[];
    regulatoryStatus: 'compliant' | 'pending' | 'non_compliant';
  };
  performance: {
    profitability: number;
    customerSatisfaction: number;
    efficiency: number;
    growth: number;
  };
}

const BranchesMaster: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('branchName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock branches data
  const branches: Branch[] = [
    {
      id: 'BR001',
      branchCode: 'HO-MUM',
      branchName: 'Mumbai Head Office',
      description:
        'Corporate headquarters and main operational center with executive offices and central administration',
      branchManager: {
        id: 'BM001',
        name: 'Rajesh Sharma',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        email: 'rajesh.sharma@company.com',
        phone: '+91 98765 43210',
      },
      address: {
        street: 'Tower A, Business District',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        postalCode: '400001',
        landmark: 'Near CST Railway Station',
      },
      contactInfo: {
        phone: '+91 22 1234 5678',
        email: 'mumbai.ho@company.com',
        fax: '+91 22 1234 5679',
        website: 'https://mumbai.company.com',
      },
      operationalDetails: {
        establishedDate: '2015-01-15',
        branchType: 'head_office',
        timezone: 'IST',
        currency: 'INR',
        workingHours: {
          start: '09:00',
          end: '18:00',
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
      },
      employeeCount: 1247,
      departmentCount: 8,
      totalCapacity: 1500,
      currentOccupancy: 1247,
      budget: 25000,
      revenue: 45000,
      parentBranch: undefined,
      childBranches: ['BR002', 'BR003', 'BR004', 'BR005'],
      status: 'active',
      businessUnit: 'Corporate',
      region: 'Western India',
      facilities: ['Cafeteria', 'Gym', 'Parking', 'Conference Rooms', 'Data Center', 'Medical Room'],
      lastModified: '2025-07-30T14:20:00Z',
      modifiedBy: 'Admin',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: false,
      },
      createdDate: '2015-01-15',
      tags: ['headquarters', 'corporate', 'main'],
      compliance: {
        licenses: ['ISO 9001', 'ISO 27001', 'GDPR Compliant'],
        certifications: ['Green Building', 'Fire Safety'],
        regulatoryStatus: 'compliant',
      },
      performance: {
        profitability: 92.5,
        customerSatisfaction: 87.3,
        efficiency: 89.1,
        growth: 15.2,
      },
    },
    {
      id: 'BR002',
      branchCode: 'REG-BLR',
      branchName: 'Bangalore Regional Office',
      description: 'Regional headquarters for South India operations with technology and development focus',
      branchManager: {
        id: 'BM002',
        name: 'Priya Nair',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        email: 'priya.nair@company.com',
        phone: '+91 98765 43211',
      },
      address: {
        street: 'Tech Park Phase 2',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        postalCode: '560001',
        landmark: 'Electronic City',
      },
      contactInfo: {
        phone: '+91 80 2345 6789',
        email: 'bangalore@company.com',
        website: 'https://bangalore.company.com',
      },
      operationalDetails: {
        establishedDate: '2016-06-20',
        branchType: 'regional',
        timezone: 'IST',
        currency: 'INR',
        workingHours: {
          start: '09:30',
          end: '18:30',
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
      },
      employeeCount: 845,
      departmentCount: 6,
      totalCapacity: 1000,
      currentOccupancy: 845,
      budget: 180000,
      revenue: 320000,
      parentBranch: 'BR001',
      childBranches: ['BR006', 'BR007'],
      status: 'active',
      businessUnit: 'Technology',
      region: 'South India',
      facilities: ['Cafeteria', 'Gym', 'Parking', 'Game Room', 'Library'],
      lastModified: '2025-07-28T11:15:00Z',
      modifiedBy: 'Regional Head',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2016-06-20',
      tags: ['regional', 'technology', 'development'],
      compliance: {
        licenses: ['ISO 9001', 'STPI Registration'],
        certifications: ['CMMI Level 5', 'Green Building'],
        regulatoryStatus: 'compliant',
      },
      performance: {
        profitability: 88.7,
        customerSatisfaction: 91.2,
        efficiency: 92.5,
        growth: 18.3,
      },
    },
    {
      id: 'BR003',
      branchCode: 'REG-DEL',
      branchName: 'Delhi Regional Office',
      description: 'North India regional center focusing on government relations and business development',
      branchManager: {
        id: 'BM003',
        name: 'Vikram Singh',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        email: 'vikram.singh@company.com',
        phone: '+91 98765 43212',
      },
      address: {
        street: 'Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        postalCode: '110001',
        landmark: 'Central Delhi',
      },
      contactInfo: {
        phone: '+91 11 3456 7890',
        email: 'delhi@company.com',
        website: 'https://delhi.company.com',
      },
      operationalDetails: {
        establishedDate: '2017-01-10',
        branchType: 'regional',
        timezone: 'IST',
        currency: 'INR',
        workingHours: {
          start: '09:00',
          end: '17:30',
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
      },
      employeeCount: 634,
      departmentCount: 5,
      totalCapacity: 750,
      currentOccupancy: 634,
      budget: 150000,
      revenue: 280000,
      parentBranch: 'BR001',
      childBranches: ['BR008'],
      status: 'active',
      businessUnit: 'Business Development',
      region: 'North India',
      facilities: ['Cafeteria', 'Parking', 'Conference Rooms', 'Guest House'],
      lastModified: '2025-07-25T16:30:00Z',
      modifiedBy: 'Business Head',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2017-01-10',
      tags: ['regional', 'government', 'business'],
      compliance: {
        licenses: ['ISO 9001', 'Government Contractor License'],
        certifications: ['Security Clearance', 'Fire Safety'],
        regulatoryStatus: 'compliant',
      },
      performance: {
        profitability: 85.2,
        customerSatisfaction: 83.7,
        efficiency: 86.9,
        growth: 12.8,
      },
    },
    {
      id: 'BR004',
      branchCode: 'LOC-HYD',
      branchName: 'Hyderabad Local Office',
      description: 'Local operations center serving Telangana and Andhra Pradesh markets',
      branchManager: {
        id: 'BM004',
        name: 'Kavya Reddy',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        email: 'kavya.reddy@company.com',
        phone: '+91 98765 43213',
      },
      address: {
        street: 'HITEC City',
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        postalCode: '500081',
        landmark: 'Cyber Towers',
      },
      contactInfo: {
        phone: '+91 40 4567 8901',
        email: 'hyderabad@company.com',
      },
      operationalDetails: {
        establishedDate: '2018-11-03',
        branchType: 'local',
        timezone: 'IST',
        currency: 'INR',
        workingHours: {
          start: '10:00',
          end: '19:00',
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
      },
      employeeCount: 287,
      departmentCount: 4,
      totalCapacity: 350,
      currentOccupancy: 287,
      budget: 850000,
      revenue: 1500000,
      parentBranch: 'BR002',
      childBranches: [],
      status: 'active',
      businessUnit: 'Technology',
      region: 'South India',
      facilities: ['Cafeteria', 'Parking', 'Recreation Area'],
      lastModified: '2025-07-29T09:45:00Z',
      modifiedBy: 'Local Manager',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2018-11-03',
      tags: ['local', 'technology', 'regional-market'],
      compliance: {
        licenses: ['ISO 9001', 'Local Business License'],
        certifications: ['Fire Safety'],
        regulatoryStatus: 'compliant',
      },
      performance: {
        profitability: 91.3,
        customerSatisfaction: 89.5,
        efficiency: 88.7,
        growth: 22.1,
      },
    },
    {
      id: 'BR005',
      branchCode: 'SAT-CHN',
      branchName: 'Chennai Satellite Office',
      description: 'Satellite office providing local support and customer service for Tamil Nadu region',
      branchManager: {
        id: 'BM005',
        name: 'Arjun Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        email: 'arjun.kumar@company.com',
        phone: '+91 98765 43214',
      },
      address: {
        street: 'OMR IT Corridor',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        postalCode: '600096',
        landmark: 'Sholinganallur',
      },
      contactInfo: {
        phone: '+91 44 5678 9012',
        email: 'chennai@company.com',
      },
      operationalDetails: {
        establishedDate: '2019-04-22',
        branchType: 'satellite',
        timezone: 'IST',
        currency: 'INR',
        workingHours: {
          start: '08:00',
          end: '17:00',
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
      },
      employeeCount: 145,
      departmentCount: 3,
      totalCapacity: 200,
      currentOccupancy: 145,
      budget: 45000000,
      revenue: 75000000,
      parentBranch: 'BR002',
      childBranches: [],
      status: 'active',
      businessUnit: 'Customer Support',
      region: 'South India',
      facilities: ['Cafeteria', 'Parking'],
      lastModified: '2025-07-26T13:20:00Z',
      modifiedBy: 'Support Head',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2019-04-22',
      tags: ['satellite', 'support', 'customer-service'],
      compliance: {
        licenses: ['Local Business License'],
        certifications: ['Fire Safety'],
        regulatoryStatus: 'compliant',
      },
      performance: {
        profitability: 76.8,
        customerSatisfaction: 94.2,
        efficiency: 82.3,
        growth: 8.7,
      },
    },
    {
      id: 'BR006',
      branchCode: 'VIR-RMT',
      branchName: 'Remote Virtual Office',
      description: 'Virtual branch supporting remote work operations and digital services',
      branchManager: {
        id: 'BM006',
        name: 'Sunita Mehta',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        email: 'sunita.mehta@company.com',
        phone: '+91 98765 43215',
      },
      address: {
        street: 'Cloud Infrastructure',
        city: 'Virtual',
        state: 'Digital',
        country: 'India',
        postalCode: '000000',
        landmark: 'Online Platform',
      },
      contactInfo: {
        phone: '+91 80 9876 5432',
        email: 'remote@company.com',
        website: 'https://remote.company.com',
      },
      operationalDetails: {
        establishedDate: '2020-03-15',
        branchType: 'virtual',
        timezone: 'IST',
        currency: 'INR',
        workingHours: {
          start: '00:00',
          end: '23:59',
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
      },
      employeeCount: 356,
      departmentCount: 5,
      totalCapacity: 500,
      currentOccupancy: 356,
      budget: 950000,
      revenue: 1850000,
      parentBranch: 'BR001',
      childBranches: [],
      status: 'active',
      businessUnit: 'Digital Services',
      region: 'Pan India',
      facilities: ['Cloud Infrastructure', 'VPN Access', 'Digital Collaboration Tools'],
      lastModified: '2025-07-31T10:00:00Z',
      modifiedBy: 'Digital Head',
      permissions: {
        canEdit: true,
        canDelete: false,
        canArchive: true,
      },
      createdDate: '2020-03-15',
      tags: ['virtual', 'remote', 'digital'],
      compliance: {
        licenses: ['Digital Services License', 'Data Protection Compliance'],
        certifications: ['ISO 27001', 'SOC 2'],
        regulatoryStatus: 'compliant',
      },
      performance: {
        profitability: 95.2,
        customerSatisfaction: 88.9,
        efficiency: 96.1,
        growth: 28.5,
      },
    },
    {
      id: 'BR007',
      branchCode: 'CON-KOL',
      branchName: 'Kolkata Construction Site',
      description: 'New branch under construction to serve Eastern India market',
      branchManager: {
        id: 'BM007',
        name: 'Rohit Ghosh',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        email: 'rohit.ghosh@company.com',
        phone: '+91 98765 43216',
      },
      address: {
        street: 'Salt Lake City',
        city: 'Kolkata',
        state: 'West Bengal',
        country: 'India',
        postalCode: '700091',
        landmark: 'Sector V',
      },
      contactInfo: {
        phone: '+91 33 6789 0123',
        email: 'kolkata@company.com',
      },
      operationalDetails: {
        establishedDate: '2025-12-01',
        branchType: 'regional',
        timezone: 'IST',
        currency: 'INR',
        workingHours: {
          start: '09:00',
          end: '18:00',
          workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
      },
      employeeCount: 0,
      departmentCount: 0,
      totalCapacity: 400,
      currentOccupancy: 0,
      budget: 1200000,
      revenue: 0,
      parentBranch: 'BR001',
      childBranches: [],
      status: 'under_construction',
      businessUnit: 'Expansion',
      region: 'East India',
      facilities: ['Under Construction'],
      lastModified: '2025-07-24T15:30:00Z',
      modifiedBy: 'Project Manager',
      permissions: {
        canEdit: true,
        canDelete: true,
        canArchive: true,
      },
      createdDate: '2025-01-15',
      tags: ['construction', 'expansion', 'eastern-market'],
      compliance: {
        licenses: ['Construction Permit', 'Environmental Clearance'],
        certifications: ['Pending'],
        regulatoryStatus: 'pending',
      },
      performance: {
        profitability: 0,
        customerSatisfaction: 0,
        efficiency: 0,
        growth: 0,
      },
    },
  ];

  // Filter branches
  const filteredBranches = branches.filter((branch) => {
    const matchesSearch =
      branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.branchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.branchManager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Sort branches
  const sortedBranches = [...filteredBranches].sort((a, b) => {
    const aValue = a[sortField as keyof Branch];
    const bValue = b[sortField as keyof Branch];

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
      case 'under_construction':
        return 'primary';
      case 'closed':
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
      case 'under_construction':
        return <RxGear className="w-4 h-4 text-blue-500" />;
      case 'closed':
        return <RxArchive className="w-4 h-4 text-red-500" />;
      default:
        return <RxGear className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBranchTypeColor = (type: string) => {
    switch (type) {
      case 'head_office':
        return 'error';
      case 'regional':
        return 'warning';
      case 'local':
        return 'primary';
      case 'satellite':
        return 'info';
      case 'virtual':
        return 'success';
      default:
        return 'default';
    }
  };

  const getBranchTypeIcon = (type: string) => {
    switch (type) {
      case 'head_office':
        return <FaBuilding className="w-4 h-4 text-red-500" />;
      case 'regional':
        return <FaBuilding className="w-4 h-4 text-yellow-500" />;
      case 'local':
        return <RxHome className="w-4 h-4 text-blue-500" />;
      case 'satellite':
        return <FaMapMarkerAlt className="w-4 h-4 text-purple-500" />;
      case 'virtual':
        return <RxGlobe className="w-4 h-4 text-green-500" />;
      default:
        return <FaBuilding className="w-4 h-4 text-gray-500" />;
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

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
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
      setSelectedBranches(sortedBranches.map((branch) => branch.id));
    } else {
      setSelectedBranches([]);
    }
  };

  const handleSelectBranch = (branchId: string, checked: boolean) => {
    if (checked) {
      setSelectedBranches([...selectedBranches, branchId]);
    } else {
      setSelectedBranches(selectedBranches.filter((id) => id !== branchId));
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
  const totalBranches = branches.length;
  const activeBranches = branches.filter((b) => b.status === 'active').length;
  const totalEmployees = branches.reduce((sum, b) => sum + b.employeeCount, 0);
  const totalRevenue = branches.reduce((sum, b) => sum + b.revenue, 0);

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
                  checked={selectedBranches.length === sortedBranches.length && sortedBranches.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('branchCode')}
              >
                <div className="flex whitespace-nowrap items-center">Code {getSortIcon('branchCode')}</div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('branchName')}
              >
                <div className="flex whitespace-nowrap items-center">Branch {getSortIcon('branchName')}</div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Branch Manager
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('operationalDetails.branchType')}
              >
                <div className="flex items-center justify-center">
                  Type
                  {getSortIcon('operationalDetails.branchType')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('employeeCount')}
              >
                <div className="flex items-center justify-center">
                  Employees
                  {getSortIcon('employeeCount')}
                </div>
              </th>
              <th
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center justify-center">
                  Revenue
                  {getSortIcon('revenue')}
                </div>
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
            {sortedBranches.map((branch) => (
              <tr key={branch.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedBranches.includes(branch.id)}
                    onChange={(e) => handleSelectBranch(branch.id, e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{branch.branchCode}</div>
                  <div className="text-xs text-gray-500">{branch.businessUnit}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{branch.branchName}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{branch.description}</div>
                  <div className="text-xs text-blue-600 mt-1">{branch.region}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={branch.branchManager.avatar}
                      alt={branch.branchManager.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{branch.branchManager.name}</div>
                      <div className="text-sm text-gray-500">{branch.branchManager.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{branch.address.city}</div>
                  <div className="text-xs text-gray-500">{branch.address.state}</div>
                  <div className="text-xs text-gray-500">{branch.address.country}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    {getBranchTypeIcon(branch.operationalDetails.branchType)}
                  </div>
                  <Chip
                    label={
                      branch.operationalDetails.branchType.replace('_', ' ').charAt(0).toUpperCase() +
                      branch.operationalDetails.branchType.replace('_', ' ').slice(1)
                    }
                    size="small"
                    color={getBranchTypeColor(branch.operationalDetails.branchType)}
                    variant="outlined"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-lg font-bold text-gray-900">{formatNumber(branch.employeeCount)}</div>
                  <div className="text-xs text-gray-500">{formatNumber(branch.totalCapacity)} capacity</div>
                  {branch.departmentCount > 0 && (
                    <div className="text-xs text-blue-600">{branch.departmentCount} departments</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(branch.revenue)}</div>
                  <div className="text-xs text-gray-500">Annual Revenue</div>
                  {branch.performance.profitability > 0 && (
                    <div className="text-xs text-green-600">
                      {formatPercentage(branch.performance.profitability)} profit
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(branch.status)}
                    <Chip
                      label={
                        branch.status.replace('_', ' ').charAt(0).toUpperCase() +
                        branch.status.replace('_', ' ').slice(1)
                      }
                      size="small"
                      color={getStatusColor(branch.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-primary" title="View Details">
                      <RxEyeOpen className="w-4 h-4" />
                    </button>
                    {branch.permissions.canEdit && (
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-600" title="Edit Branch">
                        <RxPencil1 className="w-4 h-4" />
                      </button>
                    )}
                    {branch.permissions.canArchive && (
                      <button className="p-1 hover:bg-gray-100 rounded text-yellow-600" title="Archive Branch">
                        <RxArchive className="w-4 h-4" />
                      </button>
                    )}
                    {branch.permissions.canDelete && (
                      <button className="p-1 hover:bg-gray-100 rounded text-red-600" title="Delete Branch">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Branches Master</h1>
            <p className="text-gray-600">
              Manage company branches, locations, and operational centers across different regions
            </p>
          </div>
          <Clock />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <FaBuilding className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Branches</p>
              <p className="text-2xl font-bold text-gray-900">{totalBranches}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <RxCheckCircled className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Branches</p>
              <p className="text-2xl font-bold text-gray-900">{activeBranches}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxPerson className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalEmployees)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <FaMapMarkerAlt className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
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
              placeholder="Search branches..."
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
          {selectedBranches.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedBranches.length} selected</span>
              <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200">
                Archive
              </button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200">Delete</button>
            </div>
          )}

          {/* Add Branch Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Add Branch</span>
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
          Showing {filteredBranches.length} of {totalBranches} branches
        </p>
      </div>

      {/* Table Content */}
      <TableView />
    </div>
  );
};

export default BranchesMaster;
