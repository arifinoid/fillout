/**
 * Core application types and interfaces
 */

/**
 * Represents a tab in the application
 */
export interface Tab {
  readonly id: string;
  label: string;
  icon: TabIconType;
}

/**
 * Available tab icon types
 */
export type TabIconType = 'Info' | 'Details' | 'Other' | 'Ending' | 'FileText';

/**
 * Position options for the add page button
 */
export type AddPageButtonPosition = 'between' | 'end';

/**
 * Available menu actions for tab context menu
 */
export type MenuAction = 'set_first' | 'rename' | 'copy' | 'duplicate' | 'delete';

/**
 * Props for the TabContextMenu component
 */
export interface TabContextMenuProps {
  tab: Tab;
  tabs: readonly Tab[];
  setTabs: (tabs: readonly Tab[]) => void;
  setActiveTabId: (id: string) => void;
  onClose: (action?: MenuAction) => void;
}

/**
 * Props for the BottomNav component
 */
export interface BottomNavProps {
  tabs: readonly Tab[];
  setTabs: (tabs: readonly Tab[]) => void;
  activeTabId: string;
  setActiveTabId: (id: string) => void;
}

/**
 * Props for the AddPageButton component
 */
export interface AddPageButtonProps {
  onClick: () => void;
  position?: AddPageButtonPosition;
}

/**
 * Props for the SortableTab component
 */
export interface SortableTabProps {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
  tabs: readonly Tab[];
  setTabs: (tabs: readonly Tab[]) => void;
  setActiveTabId: (id: string) => void;
  disableDrag?: boolean;
}

/**
 * Props for the TabIcon component
 */
export interface TabIconProps {
  iconName: TabIconType;
  isActive: boolean;
  className?: string;
}

/**
 * Props for the MainCard component
 */
export interface MainCardProps {
  tabLabel?: string;
}

/**
 * Props for the AnimatedDots component
 */
export interface AnimatedDotsProps {
  variant?: 'left' | 'right';
}

/**
 * Props for the EmptyState component
 */
export interface EmptyStateProps {
  tabs: readonly Tab[];
  setTabs: (tabs: readonly Tab[]) => void;
  activeTabId: string;
  setActiveTabId: (id: string) => void;
}

/**
 * Result type for tab operations that return new tabs and additional data
 */
export interface TabOperationResult {
  tabs: Tab[];
  newTabId?: string;
  nextActiveId?: string | null;
}

