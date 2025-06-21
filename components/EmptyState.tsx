import React from 'react';
import { BottomNav } from './BottomNav';
import { EmptyStateProps } from '@/types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  tabs,
  setTabs,
  activeTabId,
  setActiveTabId,
}) => {
  return (
    <div className="page-container">
      <div className="main-content">
        <div className="empty-state">
          <h1 className="empty-state-title">No tabs available</h1>
          <p className="empty-state-message">Add a new tab to get started</p>
        </div>
      </div>
      <BottomNav
        tabs={tabs}
        setTabs={setTabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
    </div>
  );
}; 