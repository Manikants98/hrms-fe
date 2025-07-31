import { Chip } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { FaBackward, FaDatabase, FaServer, FaShieldAlt } from 'react-icons/fa';
import {
  RxBell,
  RxChevronDown,
  RxChevronRight,
  RxGear,
  RxGlobe,
  RxLockClosed,
  RxPencil1,
  RxReload,
  RxUpdate,
} from 'react-icons/rx';
import * as Yup from 'yup';
import Clock from '../../../shared/clock';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category:
    | 'database'
    | 'security'
    | 'integration'
    | 'backup'
    | 'notification'
    | 'performance'
    | 'audit'
    | 'maintenance';
  isExpanded: boolean;
  settings: Setting[];
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface Setting {
  id: string;
  name: string;
  description: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'date' | 'time' | 'password' | 'textarea';
  value: any;
  options?: { label: string; value: string | number }[];
  validation?: any;
  isRequired?: boolean;
  isDisabled?: boolean;
  helpText?: string;
  isAdvanced?: boolean;
  restartRequired?: boolean;
}

const SystemSettings: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['database', 'security']);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // System Settings organized by sections
  const settingSections: SettingSection[] = [
    {
      id: 'database',
      title: 'Database Configuration',
      description: 'Database connection, performance, and optimization settings',
      icon: <FaDatabase className="w-5 h-5 text-blue-500" />,
      category: 'database',
      priority: 'critical',
      isExpanded: expandedSections.includes('database'),
      settings: [
        {
          id: 'dbHost',
          name: 'Database Host',
          description: 'Primary database server hostname or IP address',
          type: 'text',
          value: 'localhost',
          isRequired: true,
          validation: Yup.string()
            .required('Database host is required')
            .matches(/^[a-zA-Z0-9.-]+$/, 'Invalid hostname format'),
          restartRequired: true,
        },
        {
          id: 'dbPort',
          name: 'Database Port',
          description: 'Database server port number',
          type: 'number',
          value: 5432,
          isRequired: true,
          validation: Yup.number()
            .required('Database port is required')
            .min(1, 'Port must be greater than 0')
            .max(65535, 'Port must be less than 65536'),
          restartRequired: true,
        },
        {
          id: 'dbName',
          name: 'Database Name',
          description: 'Name of the HRMS database',
          type: 'text',
          value: 'hrms_production',
          isRequired: true,
          validation: Yup.string()
            .required('Database name is required')
            .matches(/^[a-zA-Z0-9_-]+$/, 'Invalid database name format'),
          restartRequired: true,
        },
        {
          id: 'dbConnectionPool',
          name: 'Connection Pool Size',
          description: 'Maximum number of concurrent database connections',
          type: 'number',
          value: 20,
          isAdvanced: true,
          validation: Yup.number()
            .required('Connection pool size is required')
            .min(5, 'Minimum 5 connections')
            .max(100, 'Maximum 100 connections'),
          helpText: 'Higher values improve performance but consume more memory',
        },
        {
          id: 'dbTimeout',
          name: 'Query Timeout (seconds)',
          description: 'Maximum time to wait for database queries',
          type: 'number',
          value: 30,
          isAdvanced: true,
          validation: Yup.number()
            .required('Query timeout is required')
            .min(5, 'Minimum 5 seconds')
            .max(300, 'Maximum 300 seconds'),
        },
      ],
    },
    {
      id: 'security',
      title: 'Security & Authentication',
      description: 'User authentication, session management, and security policies',
      icon: <RxLockClosed className="w-5 h-5 text-red-500" />,
      category: 'security',
      priority: 'critical',
      isExpanded: expandedSections.includes('security'),
      settings: [
        {
          id: 'sessionTimeout',
          name: 'Session Timeout (minutes)',
          description: 'Automatic logout time for inactive user sessions',
          type: 'number',
          value: 60,
          isRequired: true,
          validation: Yup.number()
            .required('Session timeout is required')
            .min(5, 'Minimum 5 minutes')
            .max(480, 'Maximum 8 hours'),
        },
        {
          id: 'passwordPolicy',
          name: 'Password Complexity',
          description: 'Minimum password security requirements',
          type: 'select',
          value: 'strong',
          options: [
            { label: 'Basic (8+ characters)', value: 'basic' },
            { label: 'Medium (8+ chars, mixed case)', value: 'medium' },
            { label: 'Strong (8+ chars, mixed case, numbers, symbols)', value: 'strong' },
            { label: 'Very Strong (12+ chars, all requirements)', value: 'very_strong' },
          ],
          isRequired: true,
        },
        {
          id: 'mfaRequired',
          name: 'Require Multi-Factor Authentication',
          description: 'Force all users to enable 2FA for enhanced security',
          type: 'boolean',
          value: false,
          helpText: 'Highly recommended for admin users',
        },
        {
          id: 'maxLoginAttempts',
          name: 'Max Login Attempts',
          description: 'Number of failed login attempts before account lockout',
          type: 'number',
          value: 5,
          validation: Yup.number()
            .required('Max login attempts is required')
            .min(3, 'Minimum 3 attempts')
            .max(10, 'Maximum 10 attempts'),
        },
        {
          id: 'ipWhitelist',
          name: 'IP Address Whitelist',
          description: 'Comma-separated list of allowed IP addresses (optional)',
          type: 'textarea',
          value: '',
          isAdvanced: true,
          helpText: 'Leave empty to allow all IPs. Format: 192.168.1.1, 10.0.0.0/24',
        },
      ],
    },
    {
      id: 'backup',
      title: 'Backup & Recovery',
      description: 'Automated backup schedules and disaster recovery settings',
      icon: <FaBackward className="w-5 h-5 text-green-500" />,
      category: 'backup',
      priority: 'high',
      isExpanded: expandedSections.includes('backup'),
      settings: [
        {
          id: 'autoBackup',
          name: 'Enable Automatic Backup',
          description: 'Automatically backup system data on schedule',
          type: 'boolean',
          value: true,
          isRequired: true,
        },
        {
          id: 'backupSchedule',
          name: 'Backup Schedule',
          description: 'When to perform automatic backups',
          type: 'select',
          value: 'daily',
          options: [
            { label: 'Every 6 hours', value: '6hours' },
            { label: 'Daily at 2:00 AM', value: 'daily' },
            { label: 'Weekly on Sunday', value: 'weekly' },
            { label: 'Monthly on 1st', value: 'monthly' },
          ],
          isRequired: true,
        },
        {
          id: 'backupRetention',
          name: 'Backup Retention (days)',
          description: 'How long to keep backup files',
          type: 'number',
          value: 30,
          validation: Yup.number()
            .required('Backup retention is required')
            .min(7, 'Minimum 7 days')
            .max(365, 'Maximum 365 days'),
        },
        {
          id: 'backupLocation',
          name: 'Backup Storage Location',
          description: 'Where to store backup files',
          type: 'select',
          value: 'local',
          options: [
            { label: 'Local Server', value: 'local' },
            { label: 'AWS S3', value: 'aws_s3' },
            { label: 'Google Cloud Storage', value: 'gcs' },
            { label: 'Azure Blob Storage', value: 'azure' },
          ],
          isRequired: true,
        },
        {
          id: 'backupEncryption',
          name: 'Encrypt Backup Files',
          description: 'Use AES-256 encryption for backup files',
          type: 'boolean',
          value: true,
          isAdvanced: true,
          helpText: 'Recommended for compliance and security',
        },
      ],
    },
    {
      id: 'performance',
      title: 'Performance & Caching',
      description: 'System performance optimization and caching configuration',
      icon: <FaServer className="w-5 h-5 text-purple-500" />,
      category: 'performance',
      priority: 'medium',
      isExpanded: expandedSections.includes('performance'),
      settings: [
        {
          id: 'cacheEnabled',
          name: 'Enable Application Cache',
          description: 'Use Redis/Memcached for improved performance',
          type: 'boolean',
          value: true,
          restartRequired: true,
        },
        {
          id: 'cacheExpiry',
          name: 'Cache Expiry (minutes)',
          description: 'How long to keep cached data',
          type: 'number',
          value: 15,
          validation: Yup.number()
            .required('Cache expiry is required')
            .min(1, 'Minimum 1 minute')
            .max(1440, 'Maximum 24 hours'),
        },
        {
          id: 'maxConcurrentUsers',
          name: 'Max Concurrent Users',
          description: 'Maximum number of simultaneous active users',
          type: 'number',
          value: 500,
          isAdvanced: true,
          validation: Yup.number()
            .required('Max concurrent users is required')
            .min(10, 'Minimum 10 users')
            .max(10000, 'Maximum 10,000 users'),
        },
        {
          id: 'compressionEnabled',
          name: 'Enable GZIP Compression',
          description: 'Compress HTTP responses to reduce bandwidth',
          type: 'boolean',
          value: true,
          isAdvanced: true,
        },
      ],
    },
    {
      id: 'integration',
      title: 'External Integrations',
      description: 'Third-party service connections and API configurations',
      icon: <RxGlobe className="w-5 h-5 text-indigo-500" />,
      category: 'integration',
      priority: 'medium',
      isExpanded: expandedSections.includes('integration'),
      settings: [
        {
          id: 'ssoEnabled',
          name: 'Enable Single Sign-On',
          description: 'Allow users to login with corporate SSO',
          type: 'boolean',
          value: false,
        },
        {
          id: 'ssoProvider',
          name: 'SSO Provider',
          description: 'Identity provider for SSO authentication',
          type: 'select',
          value: 'azure_ad',
          options: [
            { label: 'Azure Active Directory', value: 'azure_ad' },
            { label: 'Google Workspace', value: 'google' },
            { label: 'Okta', value: 'okta' },
            { label: 'Auth0', value: 'auth0' },
            { label: 'Custom SAML', value: 'saml' },
          ],
        },
        {
          id: 'apiRateLimit',
          name: 'API Rate Limit (requests/minute)',
          description: 'Maximum API requests per minute per user',
          type: 'number',
          value: 100,
          isAdvanced: true,
          validation: Yup.number()
            .required('API rate limit is required')
            .min(10, 'Minimum 10 requests/minute')
            .max(1000, 'Maximum 1000 requests/minute'),
        },
        {
          id: 'webhookEnabled',
          name: 'Enable Webhooks',
          description: 'Allow external systems to receive event notifications',
          type: 'boolean',
          value: false,
          isAdvanced: true,
        },
      ],
    },
    {
      id: 'notifications',
      title: 'System Notifications',
      description: 'Email, SMS, and push notification configurations',
      icon: <RxBell className="w-5 h-5 text-yellow-500" />,
      category: 'notification',
      priority: 'medium',
      isExpanded: expandedSections.includes('notifications'),
      settings: [
        {
          id: 'smtpHost',
          name: 'SMTP Server Host',
          description: 'Email server hostname for sending notifications',
          type: 'text',
          value: 'smtp.gmail.com',
          validation: Yup.string()
            .required('SMTP host is required')
            .matches(/^[a-zA-Z0-9.-]+$/, 'Invalid hostname format'),
        },
        {
          id: 'smtpPort',
          name: 'SMTP Port',
          description: 'Email server port (usually 587 for TLS, 465 for SSL)',
          type: 'number',
          value: 587,
          validation: Yup.number()
            .required('SMTP port is required')
            .min(1, 'Invalid port number')
            .max(65535, 'Invalid port number'),
        },
        {
          id: 'smtpSecurity',
          name: 'Email Security',
          description: 'Email encryption method',
          type: 'select',
          value: 'tls',
          options: [
            { label: 'None', value: 'none' },
            { label: 'TLS', value: 'tls' },
            { label: 'SSL', value: 'ssl' },
          ],
          isRequired: true,
        },
        {
          id: 'fromEmail',
          name: 'From Email Address',
          description: 'Default sender email address for system notifications',
          type: 'text',
          value: 'noreply@company.com',
          validation: Yup.string().email('Invalid email format').required('From email is required'),
        },
        {
          id: 'emailQueueSize',
          name: 'Email Queue Size',
          description: 'Maximum number of emails in send queue',
          type: 'number',
          value: 1000,
          isAdvanced: true,
          validation: Yup.number()
            .required('Email queue size is required')
            .min(10, 'Minimum 10 emails')
            .max(10000, 'Maximum 10,000 emails'),
        },
      ],
    },
    {
      id: 'audit',
      title: 'Audit & Logging',
      description: 'System audit trails, logging levels, and compliance settings',
      icon: <FaShieldAlt className="w-5 h-5 text-orange-500" />,
      category: 'audit',
      priority: 'high',
      isExpanded: expandedSections.includes('audit'),
      settings: [
        {
          id: 'auditEnabled',
          name: 'Enable Audit Logging',
          description: 'Log all user actions and system events',
          type: 'boolean',
          value: true,
          isRequired: true,
        },
        {
          id: 'logLevel',
          name: 'System Logging Level',
          description: 'Minimum level of events to log',
          type: 'select',
          value: 'info',
          options: [
            { label: 'Error Only', value: 'error' },
            { label: 'Warning & Above', value: 'warn' },
            { label: 'Info & Above', value: 'info' },
            { label: 'Debug (All Events)', value: 'debug' },
          ],
          isRequired: true,
        },
        {
          id: 'auditRetention',
          name: 'Audit Log Retention (days)',
          description: 'How long to keep audit trail records',
          type: 'number',
          value: 365,
          validation: Yup.number()
            .required('Audit retention is required')
            .min(30, 'Minimum 30 days for compliance')
            .max(2555, 'Maximum 7 years'),
        },
        {
          id: 'sensitiveDataMasking',
          name: 'Mask Sensitive Data in Logs',
          description: 'Hide passwords, SSNs, and other sensitive information',
          type: 'boolean',
          value: true,
          isRequired: true,
          helpText: 'Required for GDPR and other privacy regulations',
        },
      ],
    },
    {
      id: 'maintenance',
      title: 'System Maintenance',
      description: 'Automated maintenance tasks and system health monitoring',
      icon: <RxUpdate className="w-5 h-5 text-teal-500" />,
      category: 'maintenance',
      priority: 'low',
      isExpanded: expandedSections.includes('maintenance'),
      settings: [
        {
          id: 'maintenanceMode',
          name: 'Maintenance Mode',
          description: 'Put system in maintenance mode for updates',
          type: 'boolean',
          value: false,
          helpText: 'Users will see maintenance message when enabled',
        },
        {
          id: 'maintenanceWindow',
          name: 'Maintenance Window',
          description: 'Preferred time for automated maintenance tasks',
          type: 'time',
          value: '02:00',
        },
        {
          id: 'autoUpdates',
          name: 'Enable Automatic Updates',
          description: 'Automatically install security patches',
          type: 'boolean',
          value: false,
          isAdvanced: true,
          helpText: 'Only security updates, major updates require manual approval',
        },
        {
          id: 'healthCheckInterval',
          name: 'Health Check Interval (minutes)',
          description: 'How often to check system health',
          type: 'number',
          value: 5,
          isAdvanced: true,
          validation: Yup.number()
            .required('Health check interval is required')
            .min(1, 'Minimum 1 minute')
            .max(60, 'Maximum 60 minutes'),
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
    console.log('Saving system settings:', values);
    setEditingSection(null);
    // Here you would typically save to your backend
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
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
    if (!showAdvanced && setting.isAdvanced) {
      return null;
    }

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

      case 'password':
        return <Field {...fieldProps} type="password" />;

      case 'number':
        return <Field {...fieldProps} type="number" />;

      case 'date':
        return <Field {...fieldProps} type="date" />;

      case 'time':
        return <Field {...fieldProps} type="time" />;

      case 'textarea':
        return <Field {...fieldProps} as="textarea" rows={3} />;

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

  // Calculate statistics
  const totalSettings = settingSections.reduce((sum, section) => sum + section.settings.length, 0);
  const criticalSettings = settingSections.filter((s) => s.priority === 'critical').length;
  const advancedSettings = settingSections.reduce(
    (sum, section) => sum + section.settings.filter((s) => s.isAdvanced).length,
    0
  );
  const restartRequiredSettings = settingSections.reduce(
    (sum, section) => sum + section.settings.filter((s) => s.restartRequired).length,
    0
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
            <p className="text-gray-600">
              Configure system-level settings, security policies, and technical parameters for optimal performance
            </p>
          </div>
          <Clock />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <RxGear className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Settings</p>
              <p className="text-2xl font-bold text-gray-900">{totalSettings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <FaShieldAlt className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Critical Sections</p>
              <p className="text-2xl font-bold text-gray-900">{criticalSettings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <FaServer className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Advanced Settings</p>
              <p className="text-2xl font-bold text-gray-900">{advancedSettings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <RxUpdate className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Restart Required</p>
              <p className="text-2xl font-bold text-gray-900">{restartRequiredSettings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showAdvanced}
              onChange={(e) => setShowAdvanced(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Show Advanced Settings</span>
          </label>
        </div>
        <div className="text-sm text-gray-500">
          {showAdvanced
            ? `Showing all ${totalSettings} settings`
            : `Showing ${totalSettings - advancedSettings} basic settings`}
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
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(section.priority)}`}>
                    {section.priority.toUpperCase()}
                  </span>
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
                      {section.settings.map((setting) => {
                        const shouldShow = showAdvanced || !setting.isAdvanced;
                        if (!shouldShow) return null;

                        return (
                          <div key={setting.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label htmlFor={setting.id} className="block text-sm font-medium text-gray-700">
                                {setting.name}
                                {setting.isRequired && <span className="text-red-500 ml-1">*</span>}
                                {setting.isAdvanced && (
                                  <span className="ml-2 text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded">
                                    Advanced
                                  </span>
                                )}
                                {setting.restartRequired && (
                                  <span className="ml-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded">
                                    Restart Required
                                  </span>
                                )}
                              </label>
                            </div>

                            {renderField(setting)}

                            <ErrorMessage name={setting.id} component="div" className="text-red-500 text-sm" />

                            {setting.description && <p className="text-sm text-gray-500">{setting.description}</p>}

                            {setting.helpText && (
                              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                                <p className="text-sm text-blue-700">{setting.helpText}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}

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

      {/* Footer Warning */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <RxGear className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Changes to system settings can affect system performance and security. Some settings require a system
                restart to take effect. Always test changes in a staging environment before applying to production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
