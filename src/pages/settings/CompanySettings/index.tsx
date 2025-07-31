import { Chip } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { FaBuilding, FaCalculator } from 'react-icons/fa';
import {
  RxCalendar,
  RxChevronDown,
  RxChevronRight,
  RxEnvelopeClosed,
  RxIdCard,
  RxPencil1,
  RxReload,
} from 'react-icons/rx';
import * as Yup from 'yup';
import Clock from '../../../shared/clock';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'general' | 'payroll' | 'leave' | 'attendance' | 'security' | 'compliance' | 'integration' | 'notification';
  isExpanded: boolean;
  settings: Setting[];
}

interface Setting {
  id: string;
  name: string;
  description: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'date' | 'time';
  value: any;
  options?: { label: string; value: string | number }[];
  validation?: any;
  isRequired?: boolean;
  isDisabled?: boolean;
  helpText?: string;
}

const CompanySettings: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['general', 'payroll']);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Company Settings organized by sections
  const settingSections: SettingSection[] = [
    {
      id: 'general',
      title: 'General Information',
      description: 'Basic company details and identity settings',
      icon: <FaBuilding className="w-5 h-5 text-blue-500" />,
      category: 'general',
      isExpanded: expandedSections.includes('general'),
      settings: [
        {
          id: 'companyName',
          name: 'Company Name',
          description: 'Official registered name as it appears in legal documents',
          type: 'text',
          value: 'TechVision Solutions Pvt. Ltd.',
          isRequired: true,
          validation: Yup.string()
            .required('Company name is required')
            .max(200, 'Company name must be less than 200 characters'),
        },
        {
          id: 'companyEmail',
          name: 'Company Email',
          description: 'Primary contact email for official communications',
          type: 'text',
          value: 'contact@techvision.com',
          isRequired: true,
          validation: Yup.string().email('Invalid email format').required('Company email is required'),
        },
        {
          id: 'timezone',
          name: 'Default Timezone',
          description: 'Primary timezone for all system operations',
          type: 'select',
          value: 'Asia/Kolkata',
          options: [
            { label: 'India Standard Time (IST)', value: 'Asia/Kolkata' },
            { label: 'Coordinated Universal Time (UTC)', value: 'UTC' },
            { label: 'Eastern Standard Time (EST)', value: 'America/New_York' },
            { label: 'Pacific Standard Time (PST)', value: 'America/Los_Angeles' },
          ],
          isRequired: true,
        },
      ],
    },
    {
      id: 'payroll',
      title: 'Payroll Configuration',
      description: 'Salary processing and payment settings',
      icon: <FaCalculator className="w-5 h-5 text-green-500" />,
      category: 'payroll',
      isExpanded: expandedSections.includes('payroll'),
      settings: [
        {
          id: 'payrollFrequency',
          name: 'Payroll Frequency',
          description: 'How often employees are paid',
          type: 'select',
          value: 'monthly',
          options: [
            { label: 'Weekly', value: 'weekly' },
            { label: 'Bi-weekly', value: 'bi-weekly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Quarterly', value: 'quarterly' },
          ],
          isRequired: true,
          helpText: 'Changing this will affect all future payroll cycles',
        },
        {
          id: 'defaultCurrency',
          name: 'Default Currency',
          description: 'Primary currency for all financial calculations',
          type: 'select',
          value: 'INR',
          options: [
            { label: 'Indian Rupee (INR)', value: 'INR' },
            { label: 'US Dollar (USD)', value: 'USD' },
            { label: 'Euro (EUR)', value: 'EUR' },
            { label: 'British Pound (GBP)', value: 'GBP' },
          ],
          isRequired: true,
        },
      ],
    },
    {
      id: 'attendance',
      title: 'Attendance & Working Hours',
      description: 'Work schedule and attendance tracking settings',
      icon: <RxCalendar className="w-5 h-5 text-purple-500" />,
      category: 'attendance',
      isExpanded: expandedSections.includes('attendance'),
      settings: [
        {
          id: 'workingDays',
          name: 'Working Days Per Week',
          description: 'Standard number of working days',
          type: 'number',
          value: 5,
          isRequired: true,
          validation: Yup.number()
            .required('Working days is required')
            .min(1, 'Minimum 1 day')
            .max(7, 'Maximum 7 days'),
        },
        {
          id: 'workingHours',
          name: 'Working Hours Per Day',
          description: 'Standard daily working hours for attendance calculation',
          type: 'number',
          value: 8,
          isRequired: true,
          validation: Yup.number()
            .required('Working hours is required')
            .min(1, 'Minimum 1 hour')
            .max(12, 'Maximum 12 hours'),
        },
        {
          id: 'overtimeEnabled',
          name: 'Enable Overtime Tracking',
          description: 'Track and calculate overtime hours',
          type: 'boolean',
          value: true,
        },
      ],
    },
    {
      id: 'leave',
      title: 'Leave Management',
      description: 'Leave policies and calculation settings',
      icon: <RxCalendar className="w-5 h-5 text-yellow-500" />,
      category: 'leave',
      isExpanded: expandedSections.includes('leave'),
      settings: [
        {
          id: 'leaveYearStart',
          name: 'Leave Year Start Date',
          description: 'Annual leave cycle beginning date',
          type: 'date',
          value: '2025-01-01',
          isRequired: true,
        },
        {
          id: 'carryForwardEnabled',
          name: 'Allow Leave Carry Forward',
          description: 'Enable carrying forward unused leave to next year',
          type: 'boolean',
          value: true,
        },
      ],
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Email and system notification preferences',
      icon: <RxEnvelopeClosed className="w-5 h-5 text-indigo-500" />,
      category: 'notification',
      isExpanded: expandedSections.includes('notifications'),
      settings: [
        {
          id: 'emailNotifications',
          name: 'Email Notifications',
          description: 'Send email notifications for system events',
          type: 'boolean',
          value: true,
        },
        {
          id: 'smsNotifications',
          name: 'SMS Notifications',
          description: 'Send SMS notifications for critical events',
          type: 'boolean',
          value: false,
        },
      ],
    },
    {
      id: 'security',
      title: 'Security & Backup',
      description: 'Data protection and backup settings',
      icon: <RxIdCard className="w-5 h-5 text-red-500" />,
      category: 'security',
      isExpanded: expandedSections.includes('security'),
      settings: [
        {
          id: 'autoBackup',
          name: 'Automatic Backup',
          description: 'Enable daily automatic data backup',
          type: 'boolean',
          value: true,
          helpText: 'Backups are performed daily at 2:00 AM',
        },
        {
          id: 'sessionTimeout',
          name: 'Session Timeout (minutes)',
          description: 'Automatic logout time for inactive sessions',
          type: 'number',
          value: 60,
          validation: Yup.number()
            .required('Session timeout is required')
            .min(5, 'Minimum 5 minutes')
            .max(480, 'Maximum 8 hours'),
        },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const handleEdit = (sectionId: string) => {
    setEditingSection(sectionId);
  };

  const handleCancel = () => {
    setEditingSection(null);
  };

  const handleSave = (values: any) => {
    console.log('Saving settings:', values);
    setEditingSection(null);
    // Here you would typically save to your backend
  };

  // Create validation schema for the current editing section
  const createValidationSchema = (section: SettingSection) => {
    const schemaObject: any = {};
    section.settings.forEach((setting) => {
      if (setting.validation) {
        schemaObject[setting.id] = setting.validation;
      }
    });
    return Yup.object().shape(schemaObject);
  };

  // Get initial values for the form
  const getInitialValues = (section: SettingSection) => {
    const values: any = {};
    section.settings.forEach((setting) => {
      values[setting.id] = setting.value;
    });
    return values;
  };

  const renderField = (setting: Setting) => {
    const fieldProps = {
      name: setting.id,
      id: setting.id,
      disabled: setting.isDisabled || editingSection !== setting.id.split('.')[0],
      className:
        'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500',
    };

    switch (setting.type) {
      case 'text':
        return <Field {...fieldProps} type="text" />;

      case 'number':
        return <Field {...fieldProps} type="number" />;

      case 'date':
        return <Field {...fieldProps} type="date" />;

      case 'time':
        return <Field {...fieldProps} type="time" />;

      case 'boolean':
        return (
          <Field name={setting.id}>
            {({ field }: any) => (
              <div className="flex items-center">
                <input
                  {...field}
                  id={setting.id}
                  type="checkbox"
                  checked={field.value}
                  disabled={setting.isDisabled || editingSection !== setting.id.split('.')[0]}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor={setting.id} className="ml-2 block text-sm text-gray-900">
                  {field.value ? 'Enabled' : 'Disabled'}
                </label>
              </div>
            )}
          </Field>
        );

      case 'select':
        return (
          <Field {...fieldProps} as="select">
            {setting.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
        );

      default:
        return <Field {...fieldProps} type="text" />;
    }
  };

  return (
    <div className="p-6 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Settings</h1>
            <p className="text-gray-600">Configure your organization's policies, preferences, and system behavior</p>
          </div>
          <Clock />
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Section Header */}
            <div
              className="px-6 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {section.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Chip
                    label={section.category.charAt(0).toUpperCase() + section.category.slice(1)}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  {editingSection !== section.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(section.id);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      title="Edit Settings"
                    >
                      <RxPencil1 className="w-4 h-4" />
                    </button>
                  )}
                  {section.isExpanded ? (
                    <RxChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <RxChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Section Content */}
            {section.isExpanded && (
              <div className="px-6 py-4">
                <Formik
                  initialValues={getInitialValues(section)}
                  validationSchema={createValidationSchema(section)}
                  onSubmit={handleSave}
                  enableReinitialize
                >
                  {({ isSubmitting, dirty }) => (
                    <Form className="space-y-6">
                      {section.settings.map((setting) => (
                        <div key={setting.id} className="space-y-2">
                          <label htmlFor={setting.id} className="block text-sm font-medium text-gray-700">
                            {setting.name}
                            {setting.isRequired && <span className="text-red-500 ml-1">*</span>}
                          </label>

                          {renderField(setting)}

                          <ErrorMessage name={setting.id} component="div" className="text-red-500 text-sm" />

                          {setting.description && <p className="text-sm text-gray-500">{setting.description}</p>}

                          {setting.helpText && (
                            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                              <p className="text-sm text-blue-700">{setting.helpText}</p>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Action Buttons */}
                      {editingSection === section.id && (
                        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting || !dirty}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center">
                                <RxReload className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                              </div>
                            ) : (
                              'Save Changes'
                            )}
                          </button>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySettings;
