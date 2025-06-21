'use client';

import React, { useState } from 'react';
import { INITIAL_TABS } from '@/constants';
import { BottomNav } from '@/components/BottomNav';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { MainCard } from '@/components/MainCard';
import { EmptyState } from '@/components/EmptyState';

export default function Home() {
  const [tabs, setTabs] = useState(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState(tabs.length > 0 ? tabs[0].id : '');

  const activeTab = tabs.find(tab => tab.id === activeTabId) ?? (tabs.length > 0 ? tabs[0] : null);

  if (tabs.length === 0) {
    return (
      <EmptyState
        tabs={tabs}
        setTabs={setTabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
    );
  }

  return (
    <div className="page-container">
      <FloatingOrbs />
      
      <div className="main-content">
        <MainCard tabLabel={activeTab?.label} />
      </div>
      
      <BottomNav
        tabs={tabs}
        setTabs={setTabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
    </div>
  );
}

