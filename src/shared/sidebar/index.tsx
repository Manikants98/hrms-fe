import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import {
  RxBackpack,
  RxBarChart,
  RxCalendar,
  RxChevronRight,
  RxClipboard,
  RxDashboard,
  RxExit,
  RxGear,
  RxMagicWand,
  RxPerson,
  RxTimer,
} from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

/**
 * Sidebar navigation sub-item type.
 */
interface SidebarSubItem {
  key: string;
  label: string;
}

/**
 * Sidebar navigation item type, supporting optional sub-items.
 */
interface SidebarItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  subItems?: SidebarSubItem[];
}

/**
 * Sidebar items for CRM system navigation, with optional sub-items.
 * @example
 * // Usage in Sidebar component
 * {sidebarItems.map(item => ...)}
 */
export const sidebarItems: SidebarItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <RxDashboard size={20} />,
    subItems: [
      { key: 'admin-dashboard', label: 'Admin Dashboard' },
      { key: 'employee-dashboard', label: 'Employee Dashboard' },
      { key: 'manager-dashboard', label: 'Manager Dashboard' },
    ],
  },
  {
    key: 'employees',
    label: 'Employees',
    icon: <RxPerson size={20} />,
    subItems: [
      { key: 'all-employees', label: 'All Employees' },
      { key: 'attachments', label: 'Attachments' },
      { key: 'organizational-chart', label: 'Org Chart' },
    ],
  },
  {
    key: 'attendance',
    label: 'Attendance',
    icon: <RxTimer size={20} />,
    subItems: [
      { key: 'daily-attendance', label: 'Daily Attendance' },
      { key: 'attendance-reports', label: 'Reports' },
      { key: 'timesheet', label: 'Timesheet' },
      { key: 'attendance-settings', label: 'Settings' },
    ],
  },
  {
    key: 'leave-management',
    label: 'Leave Management',
    icon: <RxCalendar size={20} />,
    subItems: [
      { key: 'leave-applications', label: 'Leave Applications' },
      { key: 'leave-balance', label: 'Leave Balance' },
      { key: 'leave-calendar', label: 'Leave Calendar' },
      { key: 'leave-policies', label: 'Leave Policies' },
    ],
  },
  {
    key: 'payroll',
    label: 'Payroll',
    icon: <RxBarChart size={20} />,
    subItems: [
      { key: 'salary-processing', label: 'Salary Processing' },
      { key: 'payroll-reports', label: 'Payroll Reports' },
      { key: 'salary-slips', label: 'Salary Slips' },
      { key: 'tax-management', label: 'Tax Management' },
    ],
  },
  {
    key: 'recruitment',
    label: 'Recruitment',
    icon: <RxBackpack size={20} />,
    subItems: [
      { key: 'job-postings', label: 'Job Postings' },
      { key: 'candidates', label: 'Candidates' },
      { key: 'interviews', label: 'Interviews' },
      { key: 'hiring-pipeline', label: 'Hiring Pipeline' },
    ],
  },
  {
    key: 'exit-management',
    label: 'Exit Management',
    icon: <RxExit size={20} />,
    subItems: [
      { key: 'exit-applications', label: 'Exit Applications' },
      { key: 'clearance-process', label: 'Clearance Process' },
      { key: 'exit-interviews', label: 'Exit Interviews' },
      { key: 'final-settlement', label: 'Final Settlement' },
    ],
  },
  {
    key: 'performance',
    label: 'Performance',
    icon: <RxMagicWand size={20} />,
    subItems: [
      { key: 'performance-reviews', label: 'Performance Reviews' },
      { key: 'goal-setting', label: 'Goal Setting' },
      { key: 'appraisals', label: 'Appraisals' },
      { key: 'feedback', label: 'Feedback' },
    ],
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: <RxClipboard size={20} />,
    subItems: [
      { key: 'employee-reports', label: 'Employee Reports' },
      { key: 'attendance-reports', label: 'Attendance Reports' },
      { key: 'payroll-reports', label: 'Payroll Reports' },
      { key: 'leave-reports', label: 'Leave Reports' },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <RxGear size={20} />,
    subItems: [
      { key: 'departments', label: 'Departments' },
      { key: 'designations', label: 'Designations' },
      { key: 'branches', label: 'Branches' },
      { key: 'leave-types', label: 'Leave Types' },
      { key: 'company-settings', label: 'Company Settings' },
      { key: 'user-management', label: 'User Management' },
      { key: 'role-permissions', label: 'Role & Permissions' },
      { key: 'system-settings', label: 'System Settings' },
    ],
  },
];

/**
 * SidebarSubmenu component with collapsible effect for submenus.
 * @param props.parentKey - The key of the parent sidebar item.
 * @param props.subItems - The sub-items to display.
 * @param props.isOpen - Whether the submenu is open.
 * @param props.isItemSelected - Function to check if a sub-item is selected.
 * @param props.handleSubItemClick - Function to handle sub-item click.
 * @example
 * <SidebarSubmenu
 *   parentKey="contacts"
 *   subItems={[{key: "all-contacts", label: "All Contacts"}]}
 *   isOpen={true}
 *   isItemSelected={isItemSelected}
 *   handleSubItemClick={handleSubItemClick}
 * />
 */
const SidebarSubmenu: React.FC<{
  parentKey: string;
  subItems: SidebarSubItem[];
  isOpen: boolean;
  isItemSelected: (itemKey: string, subKey?: string) => boolean;
  handleSubItemClick: (parentKey: string, subKey: string) => void;
}> = ({ parentKey, subItems, isOpen, isItemSelected, handleSubItemClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, subItems]);

  return (
    <div
      style={{
        maxHeight: isOpen ? `${height}px` : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      aria-hidden={!isOpen}
    >
      <div ref={contentRef} className="ml-2 mb-1">
        {subItems.map((sub) => {
          const subActive = isItemSelected(parentKey, sub.key);
          return (
            <div
              key={sub.key}
              className={classNames(
                'flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all duration-300 mb-1 group',
                { 'bg-primary-100': subActive }
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleSubItemClick(parentKey, sub.key);
              }}
            >
              <span
                className={classNames('w-2 h-2 transition-all duration-300 rounded-full mr-2', {
                  'bg-primary': subActive,
                  'bg-gray-300 group-hover:bg-primary': !subActive,
                })}
              />
              <span
                className={classNames('text-sm transition-all duration-300', {
                  'text-primary': subActive,
                  'text-black group-hover:text-primary': !subActive,
                })}
              >
                {sub.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Sidebar component for CRM navigation, supporting sub-items and theme color customization.
 *
 * Only one item or submenu can be open at a time.
 *
 * @example
 * <Sidebar />
 */
const Sidebar: React.FC = () => {
  const [selected, setSelected] = useState<string>('dashboard');
  // Only one submenu can be open at a time, so store the open submenu key or null
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navigate = useNavigate();

  /**
   * Handles sidebar item click.
   * If the item has sub-items, toggles its submenu (only one open at a time).
   * Otherwise, selects the item and closes any open submenu.
   * @param key - The key of the clicked sidebar item.
   * @param hasSubItems - Whether the item has sub-items.
   * @example
   * handleItemClick("contacts", true);
   */
  const handleItemClick = (key: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      setOpenSubmenu((prev) => (prev === key ? null : key));
    } else {
      setSelected(key);
      setOpenSubmenu(null);
    }
  };

  /**
   * Handles sub-item click.
   * @param parentKey - The key of the parent sidebar item.
   * @param subKey - The key of the clicked sub-item.
   * @example
   * handleSubItemClick("contacts", "all-contacts");
   */
  const handleSubItemClick = (parentKey: string, subKey: string) => {
    setSelected(`${parentKey}:${subKey}`);
    navigate(`/${parentKey}/${subKey}`);
  };

  /**
   * Checks if a sidebar item or its sub-item is selected.
   * @param itemKey - The key of the sidebar item.
   * @param subKey - The key of the sub-item (optional).
   * @returns {boolean}
   * @example
   * isItemSelected("contacts", "all-contacts");
   */
  const isItemSelected = (itemKey: string, subKey?: string): boolean => {
    if (subKey) {
      return selected === `${itemKey}:${subKey}`;
    }
    // If no subKey, check if selected is the itemKey and no sub-item is selected
    return selected === itemKey;
  };

  return (
    <div className="w-72 h-screen bg-white relative">
      <div className="h-20 border-b border-gray-200 flex items-center pr-4">
        <div className="flex items-center space-x-3 bg-white px-4 py-2">
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium">
            MK
          </div>
          <div>
            <p className="font-medium text-gray-900">Sara Johnson</p>
            <p className="text-sm text-gray-600">Human Resource</p>
          </div>
        </div>
      </div>
      <div className="p-1 overflow-y-auto h-[calc(100vh-80px)]">
        {sidebarItems.map((item) => {
          const hasSubItems = !!item.subItems && item.subItems.length > 0;
          const isActive = isItemSelected(item.key) || (hasSubItems && openSubmenu === item.key);
          return (
            <div key={item.key}>
              <div
                className={classNames(
                  '!flex !items-center justify-between transition-all duration-300 rounded-md !gap-3 group p-2 cursor-pointer mb-1',
                  { 'bg-primary-200': isActive }
                )}
                onClick={() => handleItemClick(item.key, hasSubItems)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={classNames(
                      'flex flex-col rounded-md transition-all duration-300 p-1.5',
                      isActive ? 'bg-primary' : 'bg-transparent'
                    )}
                  >
                    {React.cloneElement(item.icon as React.ReactElement<{ className: string }>, {
                      className: classNames('transition-all duration-300', {
                        'text-white': isActive,
                        'text-black group-hover:text-primary': !isActive,
                      }),
                    })}
                  </div>
                  <p
                    className={classNames('transition-all duration-300', {
                      'text-primary': isActive,
                      'text-black group-hover:text-primary': !isActive,
                    })}
                  >
                    {item.label}
                  </p>
                </div>
                {hasSubItems ? (
                  <RxChevronRight
                    size={20}
                    className={classNames('transition-all duration-300', {
                      'text-primary rotate-90': openSubmenu === item.key,
                      'text-black group-hover:text-primary': openSubmenu !== item.key,
                    })}
                  />
                ) : (
                  <RxChevronRight
                    size={20}
                    className={classNames('transition-all duration-300 opacity-0')}
                  />
                )}
              </div>
              {hasSubItems && (
                <SidebarSubmenu
                  parentKey={item.key}
                  subItems={item.subItems!}
                  isOpen={openSubmenu === item.key}
                  isItemSelected={isItemSelected}
                  handleSubItemClick={handleSubItemClick}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
