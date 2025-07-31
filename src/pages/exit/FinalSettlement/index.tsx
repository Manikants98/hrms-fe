import React, { useEffect, useState } from 'react';
import { FaCalculator, FaDollarSign } from 'react-icons/fa';
import {
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
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxRows,
  RxTimer,
} from 'react-icons/rx';

interface FinalSettlement {
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

  // Salary Information
  basicSalary: number;
  hra: number;
  allowances: number;
  totalMonthlyGross: number;

  // Settlement Components
  salaryComponents: {
    basicPay: {
      amount: number;
      days: number;
      description: string;
    };
    hra: {
      amount: number;
      days: number;
      description: string;
    };
    allowances: {
      amount: number;
      days: number;
      description: string;
    };
    overtime: {
      amount: number;
      hours: number;
      description: string;
    };
    bonus: {
      amount: number;
      type: 'performance' | 'annual' | 'joining' | 'other';
      description: string;
    };
  };

  leaveEncashment: {
    totalEarnedLeaves: number;
    leavesUsed: number;
    leavesBalance: number;
    perDayRate: number;
    encashmentAmount: number;
    description: string;
  };

  gratuity: {
    isEligible: boolean;
    yearsOfService: number;
    amount: number;
    calculation: string;
    description: string;
  };

  deductions: {
    noticePeriodShortfall: {
      amount: number;
      shortfallDays: number;
      description: string;
    };
    loans: {
      amount: number;
      loanType: string;
      description: string;
    };
    advances: {
      amount: number;
      description: string;
    };
    damages: {
      amount: number;
      description: string;
    };
    providentFund: {
      amount: number;
      description: string;
    };
    tax: {
      amount: number;
      description: string;
    };
    other: {
      amount: number;
      description: string;
    };
  };

  // Summary
  grossSettlement: number;
  totalDeductions: number;
  netSettlement: number;

  // Process Information
  status: 'pending' | 'calculated' | 'approved' | 'paid' | 'disputed' | 'on_hold';
  calculatedBy: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    email: string;
  };
  approvedBy?: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    email: string;
  };

  paymentMethod: 'bank_transfer' | 'cheque' | 'cash';
  paymentDate?: string;
  paymentReference?: string;

  priority: 'high' | 'medium' | 'low';
  notes: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedDate: string;
    uploadedBy: string;
  }>;

  createdDate: string;
  calculatedDate?: string;
  approvedDate?: string;
  paidDate?: string;
  lastUpdated: string;
}

const FinalSettlement: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
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

  // Mock final settlements data
  const finalSettlements: FinalSettlement[] = [
    {
      id: 'FS001',
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
      basicSalary: 80000,
      hra: 32000,
      allowances: 15000,
      totalMonthlyGross: 127000,
      salaryComponents: {
        basicPay: {
          amount: 80000,
          days: 27,
          description: 'Basic salary for working days in August',
        },
        hra: {
          amount: 28800,
          days: 27,
          description: 'HRA for working days in August',
        },
        allowances: {
          amount: 13500,
          days: 27,
          description: 'Special allowances for working days',
        },
        overtime: {
          amount: 5000,
          hours: 10,
          description: 'Overtime for project completion',
        },
        bonus: {
          amount: 25000,
          type: 'performance',
          description: 'Q2 performance bonus',
        },
      },
      leaveEncashment: {
        totalEarnedLeaves: 48,
        leavesUsed: 28,
        leavesBalance: 20,
        perDayRate: 4200,
        encashmentAmount: 84000,
        description: '20 days leave encashment at daily rate',
      },
      gratuity: {
        isEligible: true,
        yearsOfService: 3.5,
        amount: 156000,
        calculation: '(80000 * 15 * 3.5) / 26',
        description: 'Gratuity for 3.5 years of service',
      },
      deductions: {
        noticePeriodShortfall: {
          amount: 0,
          shortfallDays: 0,
          description: 'Full notice period served',
        },
        loans: {
          amount: 0,
          loanType: '',
          description: 'No outstanding loans',
        },
        advances: {
          amount: 15000,
          description: 'Outstanding salary advance',
        },
        damages: {
          amount: 0,
          description: 'No damages applicable',
        },
        providentFund: {
          amount: 8000,
          description: 'PF deduction for current month',
        },
        tax: {
          amount: 12000,
          description: 'TDS deduction',
        },
        other: {
          amount: 2500,
          description: 'Cafeteria dues',
        },
      },
      grossSettlement: 397300,
      totalDeductions: 37500,
      netSettlement: 359800,
      status: 'calculated',
      calculatedBy: {
        id: 'FIN001',
        name: 'Priya Sharma',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Finance Manager',
        email: 'priya.sharma@company.com',
      },
      paymentMethod: 'bank_transfer',
      priority: 'high',
      notes: 'All calculations verified. Ready for approval.',
      documents: [
        {
          id: 'DOC001',
          name: 'Final Settlement Calculation',
          type: 'PDF',
          uploadedDate: '2025-08-25',
          uploadedBy: 'Priya Sharma',
        },
      ],
      createdDate: '2025-08-20',
      calculatedDate: '2025-08-25',
      lastUpdated: '2025-08-25',
    },
    {
      id: 'FS002',
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
      basicSalary: 75000,
      hra: 30000,
      allowances: 12000,
      totalMonthlyGross: 117000,
      salaryComponents: {
        basicPay: {
          amount: 22500,
          days: 9,
          description: 'Basic salary for 9 working days in August',
        },
        hra: {
          amount: 9000,
          days: 9,
          description: 'HRA for 9 working days in August',
        },
        allowances: {
          amount: 3600,
          days: 9,
          description: 'Allowances for 9 working days',
        },
        overtime: {
          amount: 0,
          hours: 0,
          description: 'No overtime',
        },
        bonus: {
          amount: 35000,
          type: 'annual',
          description: 'Annual bonus (prorated)',
        },
      },
      leaveEncashment: {
        totalEarnedLeaves: 72,
        leavesUsed: 45,
        leavesBalance: 27,
        perDayRate: 3900,
        encashmentAmount: 105300,
        description: '27 days leave encashment',
      },
      gratuity: {
        isEligible: true,
        yearsOfService: 4.2,
        amount: 193000,
        calculation: '(75000 * 15 * 4.2) / 26',
        description: 'Gratuity for 4.2 years of service',
      },
      deductions: {
        noticePeriodShortfall: {
          amount: 0,
          shortfallDays: 0,
          description: 'Full notice period served',
        },
        loans: {
          amount: 0,
          loanType: '',
          description: 'No outstanding loans',
        },
        advances: {
          amount: 0,
          description: 'No advances',
        },
        damages: {
          amount: 0,
          description: 'No damages',
        },
        providentFund: {
          amount: 2250,
          description: 'PF deduction for working days',
        },
        tax: {
          amount: 8500,
          description: 'TDS deduction',
        },
        other: {
          amount: 0,
          description: 'No other deductions',
        },
      },
      grossSettlement: 368400,
      totalDeductions: 10750,
      netSettlement: 357650,
      status: 'paid',
      calculatedBy: {
        id: 'FIN001',
        name: 'Priya Sharma',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Finance Manager',
        email: 'priya.sharma@company.com',
      },
      approvedBy: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
        email: 'anita.verma@company.com',
      },
      paymentMethod: 'bank_transfer',
      paymentDate: '2025-08-09',
      paymentReference: 'TXN123456789',
      priority: 'medium',
      notes: 'Settlement paid on last working day as requested.',
      documents: [
        {
          id: 'DOC002',
          name: 'Final Settlement Calculation',
          type: 'PDF',
          uploadedDate: '2025-08-08',
          uploadedBy: 'Priya Sharma',
        },
        {
          id: 'DOC003',
          name: 'Payment Receipt',
          type: 'PDF',
          uploadedDate: '2025-08-09',
          uploadedBy: 'Finance Team',
        },
      ],
      createdDate: '2025-08-05',
      calculatedDate: '2025-08-08',
      approvedDate: '2025-08-08',
      paidDate: '2025-08-09',
      lastUpdated: '2025-08-09',
    },
    {
      id: 'FS003',
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
      basicSalary: 70000,
      hra: 28000,
      allowances: 10000,
      totalMonthlyGross: 108000,
      salaryComponents: {
        basicPay: {
          amount: 70000,
          days: 29,
          description: 'Full month basic salary',
        },
        hra: {
          amount: 28000,
          days: 29,
          description: 'Full month HRA',
        },
        allowances: {
          amount: 10000,
          days: 29,
          description: 'Full month allowances',
        },
        overtime: {
          amount: 0,
          hours: 0,
          description: 'No overtime',
        },
        bonus: {
          amount: 0,
          type: 'other',
          description: 'No bonus applicable',
        },
      },
      leaveEncashment: {
        totalEarnedLeaves: 96,
        leavesUsed: 58,
        leavesBalance: 38,
        perDayRate: 3600,
        encashmentAmount: 136800,
        description: '38 days leave encashment',
      },
      gratuity: {
        isEligible: true,
        yearsOfService: 4.8,
        amount: 215000,
        calculation: '(70000 * 15 * 4.8) / 26',
        description: 'Gratuity for 4.8 years of service',
      },
      deductions: {
        noticePeriodShortfall: {
          amount: 0,
          shortfallDays: 0,
          description: 'Full notice period served',
        },
        loans: {
          amount: 0,
          loanType: '',
          description: 'No outstanding loans',
        },
        advances: {
          amount: 0,
          description: 'No advances',
        },
        damages: {
          amount: 0,
          description: 'No damages',
        },
        providentFund: {
          amount: 7000,
          description: 'PF deduction for August',
        },
        tax: {
          amount: 15000,
          description: 'TDS deduction',
        },
        other: {
          amount: 0,
          description: 'No other deductions',
        },
      },
      grossSettlement: 459800,
      totalDeductions: 22000,
      netSettlement: 437800,
      status: 'pending',
      calculatedBy: {
        id: 'FIN001',
        name: 'Priya Sharma',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Finance Manager',
        email: 'priya.sharma@company.com',
      },
      paymentMethod: 'bank_transfer',
      priority: 'low',
      notes: 'Calculation pending verification of leave balance.',
      documents: [],
      createdDate: '2025-08-22',
      lastUpdated: '2025-08-22',
    },
    {
      id: 'FS004',
      employeeId: 'EMP004',
      employeeName: 'Sanjay Kumar',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'sanjay.kumar@company.com',
      phone: '+91-6543210987',
      department: 'Operations',
      designation: 'Operations Lead',
      joiningDate: '2019-08-05',
      lastWorkingDate: '2025-08-10',
      exitApplicationId: 'EXT004',
      basicSalary: 85000,
      hra: 34000,
      allowances: 18000,
      totalMonthlyGross: 137000,
      salaryComponents: {
        basicPay: {
          amount: 27419,
          days: 10,
          description: 'Basic salary for 10 working days',
        },
        hra: {
          amount: 10968,
          days: 10,
          description: 'HRA for 10 working days',
        },
        allowances: {
          amount: 5806,
          days: 10,
          description: 'Allowances for 10 working days',
        },
        overtime: {
          amount: 0,
          hours: 0,
          description: 'No overtime',
        },
        bonus: {
          amount: 0,
          type: 'other',
          description: 'Bonus forfeited due to termination',
        },
      },
      leaveEncashment: {
        totalEarnedLeaves: 120,
        leavesUsed: 85,
        leavesBalance: 35,
        perDayRate: 4467,
        encashmentAmount: 156345,
        description: '35 days leave encashment',
      },
      gratuity: {
        isEligible: true,
        yearsOfService: 6.0,
        amount: 293000,
        calculation: '(85000 * 15 * 6) / 26',
        description: 'Gratuity for 6 years of service',
      },
      deductions: {
        noticePeriodShortfall: {
          amount: 91333,
          shortfallDays: 20,
          description: 'Notice period shortfall deduction',
        },
        loans: {
          amount: 45000,
          loanType: 'Personal Loan',
          description: 'Outstanding personal loan',
        },
        advances: {
          amount: 0,
          description: 'No advances',
        },
        damages: {
          amount: 15000,
          description: 'Equipment damage charges',
        },
        providentFund: {
          amount: 2742,
          description: 'PF deduction for working days',
        },
        tax: {
          amount: 8000,
          description: 'TDS deduction',
        },
        other: {
          amount: 5000,
          description: 'Security deposit forfeited',
        },
      },
      grossSettlement: 493538,
      totalDeductions: 167075,
      netSettlement: 326463,
      status: 'disputed',
      calculatedBy: {
        id: 'FIN001',
        name: 'Priya Sharma',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Finance Manager',
        email: 'priya.sharma@company.com',
      },
      paymentMethod: 'bank_transfer',
      priority: 'high',
      notes: 'Employee has disputed notice period shortfall and damage charges.',
      documents: [
        {
          id: 'DOC004',
          name: 'Settlement Calculation',
          type: 'PDF',
          uploadedDate: '2025-08-12',
          uploadedBy: 'Priya Sharma',
        },
        {
          id: 'DOC005',
          name: 'Dispute Letter',
          type: 'PDF',
          uploadedDate: '2025-08-15',
          uploadedBy: 'Sanjay Kumar',
        },
      ],
      createdDate: '2025-08-10',
      calculatedDate: '2025-08-12',
      lastUpdated: '2025-08-15',
    },
    {
      id: 'FS005',
      employeeId: 'EMP005',
      employeeName: 'Lakshmi Nair',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      email: 'lakshmi.nair@company.com',
      phone: '+91-5432109876',
      department: 'Design',
      designation: 'UX Designer',
      joiningDate: '2023-01-15',
      lastWorkingDate: '2025-08-28',
      exitApplicationId: 'EXT005',
      basicSalary: 65000,
      hra: 26000,
      allowances: 8000,
      totalMonthlyGross: 99000,
      salaryComponents: {
        basicPay: {
          amount: 58710,
          days: 28,
          description: 'Basic salary for 28 working days',
        },
        hra: {
          amount: 23484,
          days: 28,
          description: 'HRA for 28 working days',
        },
        allowances: {
          amount: 7226,
          days: 28,
          description: 'Allowances for 28 working days',
        },
        overtime: {
          amount: 3000,
          hours: 6,
          description: 'Overtime for project delivery',
        },
        bonus: {
          amount: 15000,
          type: 'performance',
          description: 'Project completion bonus',
        },
      },
      leaveEncashment: {
        totalEarnedLeaves: 36,
        leavesUsed: 18,
        leavesBalance: 18,
        perDayRate: 3194,
        encashmentAmount: 57492,
        description: '18 days leave encashment',
      },
      gratuity: {
        isEligible: false,
        yearsOfService: 2.6,
        amount: 0,
        calculation: 'Not eligible (less than 5 years)',
        description: 'Gratuity not applicable',
      },
      deductions: {
        noticePeriodShortfall: {
          amount: 0,
          shortfallDays: 0,
          description: 'Full notice period served',
        },
        loans: {
          amount: 0,
          loanType: '',
          description: 'No loans',
        },
        advances: {
          amount: 8000,
          description: 'Travel advance adjustment',
        },
        damages: {
          amount: 0,
          description: 'No damages',
        },
        providentFund: {
          amount: 5871,
          description: 'PF deduction for working days',
        },
        tax: {
          amount: 6500,
          description: 'TDS deduction',
        },
        other: {
          amount: 1200,
          description: 'Software license dues',
        },
      },
      grossSettlement: 164912,
      totalDeductions: 21571,
      netSettlement: 143341,
      status: 'approved',
      calculatedBy: {
        id: 'FIN001',
        name: 'Priya Sharma',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Finance Manager',
        email: 'priya.sharma@company.com',
      },
      approvedBy: {
        id: 'HR001',
        name: 'Anita Verma',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b69a2c96?w=150&h=150&fit=crop&crop=face',
        title: 'HR Manager',
        email: 'anita.verma@company.com',
      },
      paymentMethod: 'bank_transfer',
      priority: 'medium',
      notes: 'Approved for payment. Schedule for next payment cycle.',
      documents: [
        {
          id: 'DOC006',
          name: 'Final Settlement Calculation',
          type: 'PDF',
          uploadedDate: '2025-08-26',
          uploadedBy: 'Priya Sharma',
        },
      ],
      createdDate: '2025-08-23',
      calculatedDate: '2025-08-26',
      approvedDate: '2025-08-27',
      lastUpdated: '2025-08-27',
    },
  ];

  const departments = [
    'all',
    ...Array.from(new Set(finalSettlements.map((settlement) => settlement.department))),
  ];
  const statuses = ['all', 'pending', 'calculated', 'approved', 'paid', 'disputed', 'on_hold'];
  const priorities = ['all', 'high', 'medium', 'low'];

  // Filter final settlements
  const filteredSettlements = finalSettlements.filter((settlement) => {
    const matchesSearch =
      settlement.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.notes.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'all' || settlement.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || settlement.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || settlement.priority === priorityFilter;

    return matchesSearch && matchesDepartment && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'primary';
      case 'calculated':
        return 'warning';
      case 'approved':
        return 'success';
      case 'paid':
        return 'success';
      case 'disputed':
        return 'error';
      case 'on_hold':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <RxClock className="w-4 h-4 text-blue-500" />;
      case 'calculated':
        return <FaCalculator className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <RxCheckCircled className="w-4 h-4 text-green-500" />;
      case 'paid':
        return <FaDollarSign className="w-4 h-4 text-green-600" />;
      case 'disputed':
        return <RxCrossCircled className="w-4 h-4 text-red-500" />;
      case 'on_hold':
        return <RxTimer className="w-4 h-4 text-blue-500" />;
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate statistics
  const totalSettlements = finalSettlements.length;
  const pendingSettlements = finalSettlements.filter(
    (s) => s.status === 'pending' || s.status === 'calculated'
  ).length;
  const paidSettlements = finalSettlements.filter((s) => s.status === 'paid').length;
  const totalAmount = finalSettlements
    .filter((s) => s.status === 'paid')
    .reduce((sum, s) => sum + s.netSettlement, 0);

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredSettlements.map((settlement) => (
        <div
          key={settlement.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
        >
          {/* Priority Indicator */}
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(settlement.priority)}`}></div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <RxDotsVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Header with employee info and status */}
          <div className="flex items-start justify-between mb-4 pr-8">
            <div className="flex items-center space-x-3">
              <img
                src={settlement.avatar}
                alt={settlement.employeeName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{settlement.employeeName}</h3>
                <p className="text-sm text-gray-500">{settlement.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">{getStatusIcon(settlement.status)}</div>
          </div>

          {/* Department and Designation */}
          <div className="mb-4">
            <Chip label={settlement.department} size="small" className="mb-2" variant="outlined" />
            <p className="text-sm text-gray-700 font-medium">{settlement.designation}</p>
          </div>

          {/* Service Period */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Joining Date:</span>
                <span className="font-medium">
                  {new Date(settlement.joiningDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Working Date:</span>
                <span className="font-medium">
                  {new Date(settlement.lastWorkingDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Years of Service:</span>
                <span className="font-medium">{settlement.gratuity.yearsOfService} years</span>
              </div>
            </div>
          </div>

          {/* Settlement Summary */}
          <div className="mb-4">
            <div className="bg-green-50 rounded-lg p-4 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-700 font-medium">Gross Settlement</span>
                <span className="text-lg font-bold text-green-800">
                  {formatCurrency(settlement.grossSettlement)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-red-700 font-medium">Total Deductions</span>
                <span className="text-sm font-bold text-red-800">
                  -{formatCurrency(settlement.totalDeductions)}
                </span>
              </div>
              <div className="border-t border-green-200 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700 font-bold">Net Settlement</span>
                  <span className="text-xl font-bold text-green-900">
                    {formatCurrency(settlement.netSettlement)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Components */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Key Components</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-600">Salary:</span>
                <span className="font-medium ml-1">
                  {formatCurrency(
                    settlement.salaryComponents.basicPay.amount +
                      settlement.salaryComponents.hra.amount +
                      settlement.salaryComponents.allowances.amount
                  )}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Leave Encash:</span>
                <span className="font-medium ml-1">
                  {formatCurrency(settlement.leaveEncashment.encashmentAmount)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Gratuity:</span>
                <span className="font-medium ml-1">
                  {formatCurrency(settlement.gratuity.amount)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Bonus:</span>
                <span className="font-medium ml-1">
                  {formatCurrency(settlement.salaryComponents.bonus.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Calculated By */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Calculated By</p>
            <div className="flex items-center space-x-2">
              <img
                src={settlement.calculatedBy.avatar}
                alt={settlement.calculatedBy.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{settlement.calculatedBy.name}</p>
                <p className="text-xs text-gray-500">{settlement.calculatedBy.title}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          {settlement.paymentDate && (
            <div className="mb-4 p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-700 font-medium">Paid on</span>
                <span className="text-sm font-bold text-blue-900">
                  {new Date(settlement.paymentDate).toLocaleDateString()}
                </span>
              </div>
              {settlement.paymentReference && (
                <div className="text-xs text-blue-600 mt-1">Ref: {settlement.paymentReference}</div>
              )}
            </div>
          )}

          {/* Status and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Chip
              label={settlement.status.charAt(0).toUpperCase() + settlement.status.slice(1)}
              size="small"
              color={getStatusColor(settlement.status)}
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
                <FaCalculator className="w-4 h-4" />
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
                Service Period
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gross Settlement
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Settlement
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Info
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSettlements.map((settlement) => (
              <tr key={settlement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={settlement.avatar}
                        alt={settlement.employeeName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(settlement.priority)}`}
                      ></div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {settlement.employeeName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {settlement.employeeId} • {settlement.department}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">
                    {new Date(settlement.joiningDate).toLocaleDateString()} to
                  </div>
                  <div className="text-sm text-gray-900">
                    {new Date(settlement.lastWorkingDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {settlement.gratuity.yearsOfService} years
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-gray-900">
                    {formatCurrency(settlement.grossSettlement)}
                  </div>
                  <div className="text-xs text-gray-500">Gross Amount</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-red-600">
                    -{formatCurrency(settlement.totalDeductions)}
                  </div>
                  <div className="text-xs text-gray-500">Total Deductions</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(settlement.netSettlement)}
                  </div>
                  <div className="text-xs text-gray-500">Net Payable</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(settlement.status)}
                    <Chip
                      label={settlement.status.charAt(0).toUpperCase() + settlement.status.slice(1)}
                      size="small"
                      color={getStatusColor(settlement.status)}
                      variant="filled"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {settlement.paymentDate ? (
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(settlement.paymentDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {settlement.paymentMethod.replace('_', ' ').toUpperCase()}
                      </div>
                      {settlement.paymentReference && (
                        <div className="text-xs text-blue-600">{settlement.paymentReference}</div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm text-gray-500">
                        {settlement.paymentMethod.replace('_', ' ').toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">Payment Pending</div>
                    </div>
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
                      <FaCalculator className="w-4 h-4" />
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Final Settlement</h1>
            <p className="text-gray-600">
              Calculate and manage final settlements for departing employees
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
              <FaCalculator className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Settlements</p>
              <p className="text-2xl font-bold text-gray-900">{totalSettlements}</p>
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
              <p className="text-2xl font-bold text-gray-900">{pendingSettlements}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <FaDollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-gray-900">{paidSettlements}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <RxBarChart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Paid</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
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
            <FaCalculator className="w-4 h-4" />
            <span>Calculate Settlement</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxCheckCircled className="w-4 h-4" />
            <span>Bulk Approvals</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <FaDollarSign className="w-4 h-4" />
            <span>Process Payments</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-400 text-primary rounded-lg hover:bg-primary-50 transition-colors">
            <RxBarChart className="w-4 h-4" />
            <span>Settlement Reports</span>
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
              placeholder="Search settlements..."
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
          Showing {filteredSettlements.length} of {finalSettlements.length} final settlements
          {departmentFilter !== 'all' && ` in ${departmentFilter}`}
          {statusFilter !== 'all' && ` with ${statusFilter} status`}
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default FinalSettlement;
