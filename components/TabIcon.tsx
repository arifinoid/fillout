import React from 'react';
import {
  Info,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { TabIconProps, TabIconType } from '@/types';
import { TAB_ICONS } from '@/constants';

/**
 * Icon mapping for different tab types
 */
const ICON_MAP: Record<TabIconType, React.ReactNode> = {
  Info: <Info className="tab-icon" />,
  Details: <FileText className="tab-icon" />,
  Other: <FileText className="tab-icon" />,
  Ending: <CheckCircle2 className="tab-icon" />,
  FileText: <FileText className="tab-icon" />,
};

/**
 * TabIcon component displays an icon for a tab based on its type
 * 
 * @param iconName - The type of icon to display
 * @param isActive - Whether the tab is currently active
 * @param className - Additional CSS classes to apply
 * @returns A React component with the appropriate icon
 */
export const TabIcon: React.FC<TabIconProps> = ({ 
  iconName, 
  isActive, 
  className = '' 
}) => {
  const icon = ICON_MAP[iconName] || ICON_MAP[TAB_ICONS.FileText];
  
  return (
    <span 
      className={`${isActive ? 'tab-icon-active' : 'tab-icon-inactive'} ${className}`}
    >
      {icon}
    </span>
  );
};

