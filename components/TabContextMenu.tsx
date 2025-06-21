import React, { useCallback } from 'react';
import {
  Flag,
  Pencil,
  Clipboard,
  Copy,
  Trash2,
} from 'lucide-react';
import { TabContextMenuProps, MenuAction } from '@/types';
import { MENU_ACTIONS } from '@/constants';
import { tabUtils } from '@/utils/tabUtils';

/**
 * TabContextMenu component provides a context menu for tab operations
 * 
 * @param tab - The tab for which the menu is displayed
 * @param tabs - Array of all tabs
 * @param setTabs - Function to update tabs
 * @param setActiveTabId - Function to set the active tab ID
 * @param onClose - Callback when the menu is closed
 * @returns A React component with tab context menu functionality
 */
export const TabContextMenu: React.FC<TabContextMenuProps> = ({
  tab,
  tabs,
  setTabs,
  setActiveTabId,
  onClose,
}) => {
  const isLastTab = tabs.length <= 1;

  const handleAction = useCallback(async (action: MenuAction) => {
    try {
      // Prevent delete action if it's the last tab
      if (action === MENU_ACTIONS.DELETE && isLastTab) {
        return;
      }

      switch (action) {
        case MENU_ACTIONS.SET_FIRST: {
          const newTabs = tabUtils.moveToFirst(tabs, tab.id);
          setTabs(newTabs);
          setActiveTabId(tab.id);
          break;
        }
        
        case MENU_ACTIONS.RENAME: {
          // This will be handled by the parent component (SortableTab)
          // We need to pass this action up to trigger rename mode
          onClose();
          // Trigger rename mode in parent component
          if (onClose) {
            // Pass the rename action to parent
            (onClose as (action?: MenuAction) => void)('rename');
          }
          return; // Don't close the menu yet, let parent handle it
        }
        
        case MENU_ACTIONS.COPY: {
          await navigator.clipboard.writeText(tab.label);
          break;
        }
        
        case MENU_ACTIONS.DUPLICATE: {
          const { tabs: newTabs, newTabId } = tabUtils.duplicate(tabs, tab.id);
          setTabs(newTabs);
          if (newTabId) {
            setActiveTabId(newTabId);
          }
          break;
        }
        
        case MENU_ACTIONS.DELETE: {
          const { tabs: newTabs, nextActiveId } = tabUtils.remove(tabs, tab.id);
          setTabs(newTabs);
          if (nextActiveId) {
            setActiveTabId(nextActiveId);
          }
          break;
        }
        
        default: {
          console.warn(`Unknown menu action: ${action}`);
          break;
        }
      }
    } catch (error) {
      console.error(`Failed to execute menu action ${action}:`, error);
      // You could add user notification here
    } finally {
      onClose();
    }
  }, [tab, tabs, setTabs, setActiveTabId, onClose, isLastTab]);

  const handleSetFirst = useCallback(() => handleAction(MENU_ACTIONS.SET_FIRST), [handleAction]);
  const handleRename = useCallback(() => handleAction(MENU_ACTIONS.RENAME), [handleAction]);
  const handleCopy = useCallback(() => handleAction(MENU_ACTIONS.COPY), [handleAction]);
  const handleDuplicate = useCallback(() => handleAction(MENU_ACTIONS.DUPLICATE), [handleAction]);
  const handleDelete = useCallback(() => handleAction(MENU_ACTIONS.DELETE), [handleAction]);

  return (
    <div className="context-menu">
      {/* Header */}
      <div className="context-menu-header">
        <div className="context-menu-header-content">
          <div className="context-menu-header-dot" />
          Settings
        </div>
      </div>
      
      {/* Menu items */}
      <div className="context-menu-items">
        <button
          className="context-menu-button context-menu-button-primary group"
          onClick={handleSetFirst}
        >
          <Flag className="context-menu-button-icon context-menu-button-icon-primary group-hover:scale-110" />
          <span className="context-menu-button-text">Set as first page</span>
        </button>
        
        <button
          className="context-menu-button context-menu-button-secondary group"
          onClick={handleRename}
        >
          <Pencil className="context-menu-button-icon context-menu-button-icon-secondary group-hover:scale-110 group-hover:text-gray-700" />
          <span className="context-menu-button-text">Rename</span>
        </button>
        
        <button
          className="context-menu-button context-menu-button-secondary group"
          onClick={handleCopy}
        >
          <Clipboard className="context-menu-button-icon context-menu-button-icon-secondary group-hover:scale-110 group-hover:text-gray-700" />
          <span className="context-menu-button-text">Copy</span>
        </button>
        
        <button
          className="context-menu-button context-menu-button-secondary group"
          onClick={handleDuplicate}
        >
          <Copy className="context-menu-button-icon context-menu-button-icon-secondary group-hover:scale-110 group-hover:text-gray-700" />
          <span className="context-menu-button-text">Duplicate</span>
        </button>
        
        {/* Separator */}
        <div className="context-menu-separator" />
        
        <button
          className={`context-menu-button context-menu-button-icon ${isLastTab 
            ? 'context-menu-button-disabled' 
            : 'context-menu-button-danger'}`}
          onClick={handleDelete}
          disabled={isLastTab}
        >
          <Trash2 className={`context-menu-button-icon ${!isLastTab ? 'context-menu-button-icon-danger' : ''}`} />
          <span className="context-menu-button-text">Delete</span>
        </button>
      </div>
    </div>
  );
};

