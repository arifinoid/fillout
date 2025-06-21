import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreVertical } from 'lucide-react';
import { SortableTabProps, MenuAction } from '@/types';
import { TabIcon } from './TabIcon';
import { TabContextMenu } from './TabContextMenu';
import { tabUtils } from '@/utils/tabUtils';
import { cn } from '@/lib/utils';
import { TAB_DEFAULTS } from '@/constants';

/**
 * SortableTab component provides drag-and-drop functionality for tabs
 * 
 * @param tab - The tab data to display
 * @param isActive - Whether this tab is currently active
 * @param onClick - Callback when the tab is clicked
 * @param tabs - Array of all tabs
 * @param setTabs - Function to update tabs
 * @param setActiveTabId - Function to set the active tab ID
 * @param disableDrag - Whether to disable drag functionality
 * @returns A React component with sortable tab functionality
 */
export const SortableTab: React.FC<SortableTabProps> = ({
  tab,
  isActive,
  onClick,
  tabs,
  setTabs,
  setActiveTabId,
  disableDrag = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(tab.label);
  
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when renaming starts
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isRenaming]);

  // Handle clicks outside menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuButtonRef.current &&
        menuRef.current &&
        !menuButtonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsRenaming(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleRename = useCallback(() => {
    setIsRenaming(true);
    setRenameValue(tab.label);
    setIsMenuOpen(false);
  }, [tab.label]);

  const handleRenameSave = useCallback(() => {
    try {
      if (renameValue.trim() && renameValue !== tab.label) {
        const updatedTabs = tabUtils.updateLabel(tabs, tab.id, renameValue);
        setTabs(updatedTabs);
      }
    } catch (error) {
      console.error('Failed to update tab label:', error);
      // Reset to original value on error
      setRenameValue(tab.label);
    } finally {
      setIsRenaming(false);
    }
  }, [renameValue, tab.label, tab.id, tabs, setTabs]);

  const handleRenameKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleRenameSave();
    } else if (event.key === 'Escape') {
      setIsRenaming(false);
      setRenameValue(tab.label);
    }
  }, [handleRenameSave, tab.label]);

  const handleMenuClose = useCallback((action?: MenuAction) => {
    if (action === 'rename') {
      handleRename();
    } else {
      setIsMenuOpen(false);
      setIsRenaming(false);
    }
  }, [handleRename]);

  const handleMenuToggle = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMenuOpen(prev => !prev);
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const inputWidth = Math.max(TAB_DEFAULTS.MIN_INPUT_WIDTH, renameValue.length) + 'ch';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center mx-3 relative group"
    >
      {/* Enhanced drag handle with visual feedback */}
      {!disableDrag && (
        <div
          {...listeners}
          {...attributes}
          className="absolute left-0 top-0 w-3 h-full cursor-grab z-10 
                   hover:bg-gradient-to-r hover:from-orange-200/30 hover:to-pink-200/30 
                   rounded-l-lg active:cursor-grabbing transition-all duration-200
                   group-hover:bg-gray-100/50"
          aria-label="Drag tab"
          tabIndex={-1}
        />
      )}
      
      {/* Tab content with enhanced styling */}
      <div
        className={cn(
          "sortable-tab-container sortable-tab-container-hover group",
          isActive ? "sortable-tab-container-active" : "sortable-tab-container-inactive"
        )}
        style={{ paddingLeft: disableDrag ? '12px' : '12px' }}
      >
        <button
          onClick={onClick}
          type="button"
          className={cn(
            "sortable-tab-button sortable-tab-button-hover",
            isActive ? "sortable-tab-button-active" : "sortable-tab-button-inactive"
          )}
        >
          <TabIcon iconName={tab.icon} isActive={isActive} />
          
          {isRenaming ? (
            <input
              ref={inputRef}
              className="sortable-tab-input"
              value={renameValue}
              onChange={(event) => setRenameValue(event.target.value)}
              onBlur={handleRenameSave}
              onKeyDown={handleRenameKeyDown}
              style={{ width: inputWidth }}
            />
          ) : (
            <span className="sortable-tab-label">
              {tab.label}
            </span>
          )}
        </button>
        
        {/* Enhanced menu button for active tab */}
        {isActive && (
          <div className="relative" ref={menuRef}>
            <button
              ref={menuButtonRef}
              onClick={handleMenuToggle}
              className="sortable-tab-menu-button"
              aria-label="Open tab settings"
              type="button"
            >
              <MoreVertical className="sortable-tab-menu-icon" />
            </button>
            
            {isMenuOpen && (
              <TabContextMenu
                tab={tab}
                tabs={tabs}
                setTabs={setTabs}
                setActiveTabId={setActiveTabId}
                onClose={handleMenuClose}
              />
            )}
          </div>
        )}
      </div>
      
      {/* Subtle glow effect for active tab */}
      {isActive && (
        <div className="sortable-tab-glow" />
      )}
    </div>
  );
};

