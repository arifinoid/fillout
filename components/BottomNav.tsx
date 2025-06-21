'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BottomNavProps } from '@/types';
import { SortableTab } from './SortableTab';
import { AddPageButton } from './AddPageButton';
import { tabUtils } from '@/utils/tabUtils';
import { TAB_DEFAULTS } from '@/constants';

/**
 * BottomNav component provides the bottom navigation with drag-and-drop functionality
 * 
 * @param tabs - Array of all tabs
 * @param setTabs - Function to update tabs
 * @param activeTabId - ID of the currently active tab
 * @param setActiveTabId - Function to set the active tab ID
 * @returns A React component with bottom navigation functionality
 */
export const BottomNav: React.FC<BottomNavProps> = ({
  tabs,
  setTabs,
  activeTabId,
  setActiveTabId,
}) => {
  const [isClient, setIsClient] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = tabs.findIndex(tab => tab.id === active.id);
      const newIndex = tabs.findIndex(tab => tab.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        setTabs(arrayMove([...tabs], oldIndex, newIndex));
      }
    }
  }, [tabs, setTabs]);

  const handleAddPage = useCallback((index: number) => {
    try {
      const newLabel = `Page ${tabs.length + 1}`;
      const newTab = tabUtils.createNewTab(newLabel, TAB_DEFAULTS.ICON);
      
      const newTabs = tabUtils.insertAt(tabs, newTab, index);
      setTabs(newTabs);
      setActiveTabId(newTab.id);
    } catch (error) {
      console.error('Failed to add new page:', error);
      // You could add user notification here
    }
  }, [tabs, setTabs, setActiveTabId]);

  const handleTabClick = useCallback((tabId: string) => {
    if (tabUtils.isValidTabId(tabs, tabId)) {
      setActiveTabId(tabId);
    }
  }, [tabs, setActiveTabId]);

  // Server-side render without drag-and-drop
  if (!isClient) {
    return (
      <nav className="bottom-nav">
        <div className="bottom-nav-content">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              <SortableTab
                tab={tab}
                isActive={activeTabId === tab.id}
                onClick={() => handleTabClick(tab.id)}
                tabs={tabs}
                setTabs={setTabs}
                setActiveTabId={setActiveTabId}
                disableDrag={true}
              />
              
              {index < tabs.length - 1 && (
                <AddPageButton
                  onClick={() => handleAddPage(index + 1)}
                  position="between"
                />
              )}
              
              {index === tabs.length - 1 && (
                <div className="bottom-nav-divider" />
              )}
            </React.Fragment>
          ))}
          
          <AddPageButton onClick={() => handleAddPage(tabs.length)} />
        </div>
      </nav>
    );
  }

  // Client-side render with drag-and-drop
  return (
    <nav className="bottom-nav">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tabs.map(tab => tab.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="bottom-nav-content">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <SortableTab
                  tab={tab}
                  isActive={activeTabId === tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  tabs={tabs}
                  setTabs={setTabs}
                  setActiveTabId={setActiveTabId}
                  disableDrag={false}
                />
                
                {index < tabs.length - 1 && (
                  <AddPageButton
                    onClick={() => handleAddPage(index + 1)}
                    position="between"
                  />
                )}
                
                {index === tabs.length - 1 && (
                  <div className="bottom-nav-divider" />
                )}
              </React.Fragment>
            ))}
            
            <AddPageButton onClick={() => handleAddPage(tabs.length)} />
          </div>
        </SortableContext>
      </DndContext>
    </nav>
  );
};

