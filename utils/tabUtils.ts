import { v4 as uuidv4 } from 'uuid';
import { Tab, TabIconType, TabOperationResult } from '@/types';
import { TAB_DEFAULTS, VALIDATION } from '@/constants';

/**
 * Utility functions for tab operations
 */
export const tabUtils = {
  /**
   * Creates a new tab with the given label and icon
   * @param label - The label for the new tab
   * @param icon - The icon type for the new tab (defaults to FileText)
   * @returns A new Tab object
   */
  createNewTab: (label: string, icon: TabIconType = TAB_DEFAULTS.ICON): Tab => {
    if (!label.trim()) {
      throw new Error('Tab label cannot be empty');
    }

    if (label.length > VALIDATION.MAX_TAB_LABEL_LENGTH) {
      throw new Error(`Tab label cannot exceed ${VALIDATION.MAX_TAB_LABEL_LENGTH} characters`);
    }

    return {
      id: uuidv4(),
      label: label.trim(),
      icon,
    };
  },

  /**
   * Moves a tab to the first position in the tabs array
   * @param tabs - The current tabs array
   * @param tabId - The ID of the tab to move
   * @returns A new array with the tab moved to the first position
   */
  moveToFirst: (tabs: readonly Tab[], tabId: string): Tab[] => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    
    if (tabIndex === -1) {
      throw new Error(`Tab with ID ${tabId} not found`);
    }
    
    if (tabIndex <= 0) {
      return [...tabs]; // Already at first position or not found
    }
    
    const newTabs = [...tabs];
    const [movedTab] = newTabs.splice(tabIndex, 1);
    newTabs.unshift(movedTab);
    
    return newTabs;
  },

  /**
   * Inserts a new tab at the specified index
   * @param tabs - The current tabs array
   * @param newTab - The tab to insert
   * @param index - The index where to insert the tab
   * @returns A new array with the tab inserted at the specified index
   */
  insertAt: (tabs: readonly Tab[], newTab: Tab, index: number): Tab[] => {
    if (index < 0 || index > tabs.length) {
      throw new Error(`Invalid index: ${index}. Must be between 0 and ${tabs.length}`);
    }

    const newTabs = [...tabs];
    newTabs.splice(index, 0, newTab);
    
    return newTabs;
  },

  /**
   * Duplicates a tab and inserts it after the original
   * @param tabs - The current tabs array
   * @param tabId - The ID of the tab to duplicate
   * @returns An object containing the new tabs array and the new tab ID
   */
  duplicate: (tabs: readonly Tab[], tabId: string): TabOperationResult => {
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    
    if (tabIndex === -1) {
      throw new Error(`Tab with ID ${tabId} not found`);
    }

    const originalTab = tabs[tabIndex];
    const duplicatedTab: Tab = {
      ...originalTab,
      id: uuidv4(),
      label: `${originalTab.label}${TAB_DEFAULTS.COPY_SUFFIX}`,
    };

    const newTabs = [...tabs];
    newTabs.splice(tabIndex + 1, 0, duplicatedTab);
    
    return { 
      tabs: newTabs, 
      newTabId: duplicatedTab.id 
    };
  },

  /**
   * Removes a tab from the tabs array
   * @param tabs - The current tabs array
   * @param tabId - The ID of the tab to remove
   * @returns An object containing the new tabs array and the next active tab ID
   */
  remove: (tabs: readonly Tab[], tabId: string): TabOperationResult => {
    if (tabs.length <= TAB_DEFAULTS.MIN_TAB_LENGTH) {
      return { 
        tabs: [...tabs], 
        nextActiveId: tabs[0]?.id || null 
      };
    }

    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    
    if (tabIndex === -1) {
      throw new Error(`Tab with ID ${tabId} not found`);
    }

    const newTabs = tabs.filter(tab => tab.id !== tabId);
    const nextActiveTab = newTabs[tabIndex] || newTabs[tabIndex - 1] || newTabs[0];
    
    return { 
      tabs: newTabs, 
      nextActiveId: nextActiveTab?.id || null 
    };
  },

  /**
   * Updates the label of a tab
   * @param tabs - The current tabs array
   * @param tabId - The ID of the tab to update
   * @param newLabel - The new label for the tab
   * @returns A new array with the updated tab
   */
  updateLabel: (tabs: readonly Tab[], tabId: string, newLabel: string): Tab[] => {
    const trimmedLabel = newLabel.trim();
    
    if (trimmedLabel.length < VALIDATION.MIN_TAB_LABEL_LENGTH) {
      throw new Error(`Tab label must be at least ${VALIDATION.MIN_TAB_LABEL_LENGTH} character long`);
    }
    
    if (trimmedLabel.length > VALIDATION.MAX_TAB_LABEL_LENGTH) {
      throw new Error(`Tab label cannot exceed ${VALIDATION.MAX_TAB_LABEL_LENGTH} characters`);
    }

    const tabExists = tabs.some(tab => tab.id === tabId);
    if (!tabExists) {
      throw new Error(`Tab with ID ${tabId} not found`);
    }

    return tabs.map(tab =>
      tab.id === tabId ? { ...tab, label: trimmedLabel } : tab
    );
  },

  /**
   * Validates if a tab ID exists in the tabs array
   * @param tabs - The tabs array to check
   * @param tabId - The tab ID to validate
   * @returns True if the tab exists, false otherwise
   */
  isValidTabId: (tabs: readonly Tab[], tabId: string): boolean => {
    return tabs.some(tab => tab.id === tabId);
  },

  /**
   * Gets a tab by its ID
   * @param tabs - The tabs array to search
   * @param tabId - The tab ID to find
   * @returns The tab if found, undefined otherwise
   */
  getTabById: (tabs: readonly Tab[], tabId: string): Tab | undefined => {
    return tabs.find(tab => tab.id === tabId);
  },
};

