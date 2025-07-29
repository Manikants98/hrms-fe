import React, { useState } from 'react';
import {
  RxArchive,
  RxDotsVertical,
  RxDownload,
  RxEyeOpen,
  RxFile,
  RxFileText,
  RxGrid,
  RxImage,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil1,
  RxPlus,
  RxRows,
  RxTrash,
  RxVideo,
} from 'react-icons/rx';

const EmployeeAttachments: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock attachment data
  const attachments = [
    {
      id: 'ATT001',
      fileName: 'Employment_Contract_John_Smith.pdf',
      employeeName: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      documentType: 'Contract',
      fileSize: '2.4 MB',
      uploadDate: '2023-01-15',
      uploadedBy: 'HR Team',
      status: 'Active',
      fileType: 'pdf',
      category: 'Legal',
      description: 'Original employment contract with terms and conditions',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 'ATT002',
      fileName: 'ID_Verification_Sarah_Johnson.pdf',
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Human Resources',
      documentType: 'ID Verification',
      fileSize: '1.2 MB',
      uploadDate: '2022-03-20',
      uploadedBy: 'Sarah Johnson',
      status: 'Active',
      fileType: 'pdf',
      category: 'Identity',
      description: 'Government issued ID verification document',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMXuj9caIZi7mzePjf1ZESJNUhzfRGDPeJA&s',
    },
    {
      id: 'ATT003',
      fileName: 'Performance_Review_2024_Michael_Chen.xlsx',
      employeeName: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Finance',
      documentType: 'Performance Review',
      fileSize: '856 KB',
      uploadDate: '2024-01-10',
      uploadedBy: 'Manager',
      status: 'Active',
      fileType: 'excel',
      category: 'Performance',
      description: 'Annual performance review and evaluation',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 'ATT004',
      fileName: 'Training_Certificate_Emily_Davis.jpg',
      employeeName: 'Emily Davis',
      employeeId: 'EMP004',
      department: 'Marketing',
      documentType: 'Certificate',
      fileSize: '1.8 MB',
      uploadDate: '2023-11-20',
      uploadedBy: 'Emily Davis',
      status: 'Active',
      fileType: 'image',
      category: 'Training',
      description: 'Digital marketing certification from Google',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 'ATT005',
      fileName: 'Medical_Certificate_David_Wilson.pdf',
      employeeName: 'David Wilson',
      employeeId: 'EMP005',
      department: 'Operations',
      documentType: 'Medical Certificate',
      fileSize: '950 KB',
      uploadDate: '2023-08-15',
      uploadedBy: 'David Wilson',
      status: 'Archived',
      fileType: 'pdf',
      category: 'Medical',
      description: 'Medical clearance certificate for workplace safety',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 'ATT006',
      fileName: 'Resume_Lisa_Anderson.docx',
      employeeName: 'Lisa Anderson',
      employeeId: 'EMP006',
      department: 'Engineering',
      documentType: 'Resume',
      fileSize: '340 KB',
      uploadDate: '2023-02-25',
      uploadedBy: 'HR Team',
      status: 'Active',
      fileType: 'word',
      category: 'Recruitment',
      description: 'Updated professional resume and portfolio',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    },
  ];

  const filteredAttachments = attachments.filter(
    (attachment) =>
      attachment.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attachment.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attachment.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attachment.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <RxFileText className="w-5 h-5 text-red-600" />;
      case 'image':
        return <RxImage className="w-5 h-5 text-green-600" />;
      case 'video':
        return <RxVideo className="w-5 h-5 text-purple-600" />;
      case 'excel':
        return <RxArchive className="w-5 h-5 text-green-700" />;
      case 'word':
        return <RxFile className="w-5 h-5 text-blue-600" />;
      default:
        return <RxFile className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'Archived':
        return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Legal: 'bg-red-50 text-red-600 border-red-200',
      Identity: 'bg-blue-50 text-blue-600 border-blue-200',
      Performance: 'bg-purple-50 text-purple-600 border-purple-200',
      Training: 'bg-green-50 text-green-600 border-green-200',
      Medical: 'bg-orange-50 text-orange-600 border-orange-200',
      Recruitment: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {filteredAttachments.map((attachment) => (
        <div
          key={attachment.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
        >
          <div className="p-4">
            {/* Header with file icon and actions */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center w-[80%] space-x-3">
                <div className="p-3 bg-gray-50 rounded-lg">{getFileIcon(attachment.fileType)}</div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-gray-900 text-sm truncate"
                    title={attachment.fileName}
                  >
                    {attachment.fileName}
                  </h3>
                  <p className="text-xs text-gray-500">{attachment.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <RxEyeOpen className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <RxDotsVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Employee Info */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={attachment.avatar}
                alt={attachment.employeeName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {attachment.employeeName}
                </p>
                <p className="text-xs text-gray-500">
                  {attachment.employeeId} • {attachment.department}
                </p>
              </div>
            </div>

            {/* Document Type and Category */}
            <div className="mb-4 space-y-2">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(attachment.category)}`}
              >
                {attachment.category}
              </span>
              <p className="text-sm text-gray-700 font-medium">{attachment.documentType}</p>
            </div>

            {/* File Info */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center justify-between">
                <span>Size:</span>
                <span className="font-medium">{attachment.fileSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Uploaded:</span>
                <span className="font-medium">{attachment.uploadDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>By:</span>
                <span className="font-medium truncate">{attachment.uploadedBy}</span>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(attachment.status)}`}
              >
                {attachment.status}
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-blue-50 rounded" title="Download">
                  <RxDownload className="w-4 h-4 text-blue-600" />
                </button>
                <button className="p-1 hover:bg-green-50 rounded" title="Edit">
                  <RxPencil1 className="w-4 h-4 text-green-600" />
                </button>
                <button className="p-1 hover:bg-red-50 rounded" title="Delete">
                  <RxTrash className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const TableView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upload Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAttachments.map((attachment) => (
              <tr key={attachment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-50 rounded-lg mr-3">
                      {getFileIcon(attachment.fileType)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-sm font-medium text-gray-900 truncate max-w-xs"
                        title={attachment.fileName}
                      >
                        {attachment.fileName}
                      </div>
                      <div className="text-sm text-gray-500">{attachment.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={attachment.avatar}
                      alt={attachment.employeeName}
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {attachment.employeeName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {attachment.employeeId} • {attachment.department}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900">{attachment.documentType}</div>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(attachment.category)}`}
                    >
                      {attachment.category}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{attachment.fileSize}</div>
                  <div className="text-sm text-gray-500 capitalize">{attachment.fileType} file</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{attachment.uploadDate}</div>
                  <div className="text-sm text-gray-500">by {attachment.uploadedBy}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(attachment.status)}`}
                  >
                    {attachment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1 hover:bg-blue-50 rounded" title="View">
                      <RxEyeOpen className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-green-50 rounded" title="Download">
                      <RxDownload className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-1 hover:bg-yellow-50 rounded" title="Edit">
                      <RxPencil1 className="w-4 h-4 text-yellow-600" />
                    </button>
                    <button className="p-1 hover:bg-red-50 rounded" title="Delete">
                      <RxTrash className="w-4 h-4 text-red-600" />
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Employee Attachments</h1>
        <p className="text-gray-600">Manage documents and files for all employees</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <RxMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search attachments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-primary-400 outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-64"
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

          {/* Upload Document Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary cursor-pointer text-white rounded-lg hover:bg-primary-950 transition-colors">
            <RxPlus className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredAttachments.length} of {attachments.length} attachments
        </p>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? <GridView /> : <TableView />}
    </div>
  );
};

export default EmployeeAttachments;
