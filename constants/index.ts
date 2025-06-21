import { v4 as uuidv4 } from 'uuid';
import { Tab, TabIconType, MenuAction } from '@/types';

/**
 * Application constants
 */

/**
 * Initial tabs configuration for the application
 */
export const INITIAL_TABS: readonly Tab[] = [
  { id: uuidv4(), label: 'Info', icon: 'Info' },
  { id: uuidv4(), label: 'Details', icon: 'Details' },
  { id: uuidv4(), label: 'Other', icon: 'Other' },
  { id: uuidv4(), label: 'Ending', icon: 'Ending' },
] as const;

/**
 * Available tab icons mapping
 */
export const TAB_ICONS: Record<TabIconType, TabIconType> = {
  Info: 'Info',
  Details: 'Details',
  Other: 'Other',
  Ending: 'Ending',
  FileText: 'FileText',
} as const;

/**
 * Menu action constants for tab context menu
 */
export const MENU_ACTIONS: Record<string, MenuAction> = {
  SET_FIRST: 'set_first',
  RENAME: 'rename',
  COPY: 'copy',
  DUPLICATE: 'duplicate',
  DELETE: 'delete',
} as const;

/**
 * Animation delay constants for staggered animations
 */
export const ANIMATION_DELAYS = {
  DOT_1: '0.2s',
  DOT_2: '0.4s',
  DOT_3: '0.6s',
  DOT_4: '0.8s',
  DOT_5: '1s',
} as const;

/**
 * Default values for tab operations
 */
export const TAB_DEFAULTS = {
  ICON: 'FileText' as const,
  COPY_SUFFIX: ' (copy)',
  MIN_TAB_LENGTH: 1,
  MIN_INPUT_WIDTH: 6,
} as const;

/**
 * Validation constants
 */
export const VALIDATION = {
  MIN_TAB_LABEL_LENGTH: 1,
  MAX_TAB_LABEL_LENGTH: 50,
} as const;

