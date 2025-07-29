import React, { useState } from 'react';
import {
  RxChevronDown,
  RxChevronRight,
  RxDotsVertical,
  RxEnvelopeClosed,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxMobile,
  RxPerson,
  RxPlus,
  RxReset,
  RxTarget,
  RxZoomIn,
  RxZoomOut,
  RxEnterFullScreen,
  RxExitFullScreen,
} from 'react-icons/rx';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  subordinates?: Employee[];
  isExpanded?: boolean;
}

const OrganizationChart: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if document is in fullscreen mode
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Mock organization data
  const [orgData, setOrgData] = useState<Employee>({
    id: 'CEO001',
    name: 'Robert Johnson',
    position: 'Chief Executive Officer',
    department: 'Executive',
    email: 'robert.johnson@company.com',
    phone: '+1 (555) 100-0001',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isExpanded: true,
    subordinates: [
      {
        id: 'CTO001',
        name: 'Sarah Mitchell',
        position: 'Chief Technology Officer',
        department: 'Technology',
        email: 'sarah.mitchell@company.com',
        phone: '+1 (555) 200-0001',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        isExpanded: true,
        subordinates: [
          {
            id: 'EMP001',
            name: 'John Smith',
            position: 'Senior Developer',
            department: 'Engineering',
            email: 'john.smith@company.com',
            phone: '+1 (555) 123-4567',
            avatar:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            isExpanded: false,
            subordinates: [
              {
                id: 'EMP007',
                name: 'Mark Thompson',
                position: 'Junior Developer',
                department: 'Engineering',
                email: 'mark.thompson@company.com',
                phone: '+1 (555) 789-0123',
                avatar:
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
              },
            ],
          },
          {
            id: 'EMP006',
            name: 'Lisa Anderson',
            position: 'UX Designer',
            department: 'Design',
            email: 'lisa.anderson@company.com',
            phone: '+1 (555) 678-9012',
            avatar:
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            isExpanded: false,
          },
        ],
      },
      {
        id: 'CFO001',
        name: 'Michael Chen',
        position: 'Chief Financial Officer',
        department: 'Finance',
        email: 'michael.chen@company.com',
        phone: '+1 (555) 300-0001',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isExpanded: true,
        subordinates: [
          {
            id: 'EMP003',
            name: 'Jennifer Wilson',
            position: 'Financial Analyst',
            department: 'Finance',
            email: 'jennifer.wilson@company.com',
            phone: '+1 (555) 345-6789',
            avatar:
              'https://images.unsplash.com/photo-1494790108755-2616c4ecc5dd?w=150&h=150&fit=crop&crop=face',
            isExpanded: false,
          },
        ],
      },
      {
        id: 'CHRO001',
        name: 'Sarah Johnson',
        position: 'Chief Human Resources Officer',
        department: 'Human Resources',
        email: 'sarah.johnson@company.com',
        phone: '+1 (555) 400-0001',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
        isExpanded: true,
        subordinates: [
          {
            id: 'EMP004',
            name: 'Emily Davis',
            position: 'HR Specialist',
            department: 'Human Resources',
            email: 'emily.davis@company.com',
            phone: '+1 (555) 456-7890',
            avatar:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            isExpanded: false,
          },
        ],
      },
      {
        id: 'CMO001',
        name: 'David Wilson',
        position: 'Chief Marketing Officer',
        department: 'Marketing',
        email: 'david.wilson@company.com',
        phone: '+1 (555) 500-0001',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        isExpanded: false,
        subordinates: [
          {
            id: 'EMP005',
            name: 'Amanda Rodriguez',
            position: 'Marketing Manager',
            department: 'Marketing',
            email: 'amanda.rodriguez@company.com',
            phone: '+1 (555) 567-8901',
            avatar:
              'https://images.unsplash.com/photo-1494790108755-2616c4ecc5dd?w=150&h=150&fit=crop&crop=face',
            isExpanded: false,
          },
        ],
      },
    ],
  });

  const toggleEmployee = (employeeId: string) => {
    const toggleInTree = (employee: Employee): Employee => {
      if (employee.id === employeeId) {
        return { ...employee, isExpanded: !employee.isExpanded };
      }
      if (employee.subordinates) {
        return {
          ...employee,
          subordinates: employee.subordinates.map(toggleInTree),
        };
      }
      return employee;
    };
    setOrgData(toggleInTree(orgData));
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      Executive: 'bg-purple-50 border-purple-200 text-purple-700',
      Technology: 'bg-blue-50 border-blue-200 text-blue-700',
      Engineering: 'bg-blue-50 border-blue-200 text-blue-700',
      Design: 'bg-green-50 border-green-200 text-green-700',
      Finance: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      'Human Resources': 'bg-pink-50 border-pink-200 text-pink-700',
      Marketing: 'bg-orange-50 border-orange-200 text-orange-700',
    };
    return colors[department as keyof typeof colors] || 'bg-gray-50 border-gray-200 text-gray-700';
  };

  const EmployeeCard: React.FC<{ employee: Employee; level: number }> = ({ employee, level }) => {
    const hasSubordinates = employee.subordinates && employee.subordinates.length > 0;
    const isExpanded = employee.isExpanded;
    const cardWidth = 280;

    return (
      <div className="flex flex-col items-center relative">
        {/* Vertical line from parent (positioned above the card) */}
        {level > 0 && <div className="w-0.5 h-8 bg-gray-400 mb-0"></div>}

        {/* Employee Card */}
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer relative ${
            selectedEmployee?.id === employee.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
          }`}
          onClick={() => setSelectedEmployee(employee)}
          style={{ width: `${cardWidth}px`, minHeight: '120px' }}
        >
          <div className="p-4">
            {/* Header with avatar and expand button */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{employee.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{employee.position}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0">
                {hasSubordinates && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEmployee(employee.id);
                    }}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {isExpanded ? (
                      <RxChevronDown className="w-4 h-4 text-gray-600" />
                    ) : (
                      <RxChevronRight className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                )}
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <RxDotsVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Department */}
            <div className="mb-3">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getDepartmentColor(employee.department)}`}
              >
                {employee.department}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <RxEnvelopeClosed className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <RxMobile className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{employee.phone}</span>
              </div>
            </div>

            {/* Subordinate count */}
            {hasSubordinates && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Team Members:</span>
                  <span className="font-medium">{employee.subordinates!.length}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Subordinates */}
        {hasSubordinates && isExpanded && (
          <div className="mt-0 relative">
            {/* Vertical line down from parent card */}
            <div className="w-0.5 h-8 bg-gray-400 mx-auto"></div>

            <div className="flex justify-center items-start relative" style={{ gap: '96px' }}>
              {/* Horizontal line connecting all subordinates */}
              {employee.subordinates!.length > 1 && (
                <div
                  className="absolute top-0 h-0.5 bg-gray-400"
                  style={{
                    left: `${cardWidth / 2}px`,
                    right: `${cardWidth / 2}px`,
                    width: `${(employee.subordinates!.length - 1) * 96}px`,
                    transform: 'translateX(-50%)',
                  }}
                ></div>
              )}

              {employee.subordinates!.map((subordinate) => (
                <div key={subordinate.id} className="relative">
                  {/* Vertical line to each subordinate */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-400"></div>

                  <div className="pt-8">
                    <EmployeeCard employee={subordinate} level={level + 1} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in' && zoomLevel < 150) {
      setZoomLevel(zoomLevel + 10);
    } else if (direction === 'out' && zoomLevel > 50) {
      setZoomLevel(zoomLevel - 10);
    } else if (direction === 'reset') {
      setZoomLevel(100);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        await document.documentElement.requestFullscreen();
      } else {
        // Exit fullscreen
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  return (
    <div
      className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-50' : ''} p-6 bg-gray-50 min-h-screen`}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Organization Chart</h1>
        <p className="text-gray-600">Visualize your company's organizational structure</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-400 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-50 transition-colors">
            <RxMixerHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Zoom Controls */}
          <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => handleZoom('out')}
              className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors"
              disabled={zoomLevel <= 50}
            >
              <RxZoomOut className="w-4 h-4 text-gray-600" />
            </button>
            <span className="px-3 py-2 text-sm font-medium text-gray-700 border-x border-gray-200">
              {zoomLevel}%
            </span>
            <button
              onClick={() => handleZoom('in')}
              className="p-2 hover:bg-gray-50 transition-colors"
              disabled={zoomLevel >= 150}
            >
              <RxZoomIn className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => handleZoom('reset')}
              className="p-2 hover:bg-gray-50 transition-colors border-l border-gray-200"
            >
              <RxReset className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors border-l border-gray-200"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <RxExitFullScreen className="w-4 h-4 text-gray-600" />
              ) : (
                <RxEnterFullScreen className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>

          {/* Add Employee Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Organization Chart */}
      <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-auto ${isFullscreen ? 'h-[calc(100vh-160px)]' : ''}`}
      >
        <div
          className="p-8 min-w-max flex justify-center"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center top' }}
        >
          <EmployeeCard employee={orgData} level={0} />
        </div>
      </div>

      {/* Employee Details Sidebar */}
      {selectedEmployee && !isFullscreen && (
        <div className="fixed right-6 top-6 bottom-6 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Employee Details</h2>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Employee Info */}
            <div className="space-y-6">
              <div className="text-center">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {selectedEmployee.name}
                </h3>
                <p className="text-gray-600 mb-2">{selectedEmployee.position}</p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getDepartmentColor(selectedEmployee.department)}`}
                >
                  {selectedEmployee.department}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <RxEnvelopeClosed className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RxMobile className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RxPerson className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.id}</p>
                  </div>
                </div>
                {selectedEmployee.subordinates && selectedEmployee.subordinates.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <RxTarget className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Direct Reports</p>
                      <p className="font-medium text-gray-900">
                        {selectedEmployee.subordinates.length} team members
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Employee Details (overlay) */}
      {selectedEmployee && isFullscreen && (
        <div className="fixed top-6 right-6 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-[calc(100vh-48px)] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Employee Details</h2>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Employee Info */}
            <div className="space-y-6">
              <div className="text-center">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {selectedEmployee.name}
                </h3>
                <p className="text-gray-600 mb-2">{selectedEmployee.position}</p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getDepartmentColor(selectedEmployee.department)}`}
                >
                  {selectedEmployee.department}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <RxEnvelopeClosed className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RxMobile className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RxPerson className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.id}</p>
                  </div>
                </div>
                {selectedEmployee.subordinates && selectedEmployee.subordinates.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <RxTarget className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Direct Reports</p>
                      <p className="font-medium text-gray-900">
                        {selectedEmployee.subordinates.length} team members
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationChart;
