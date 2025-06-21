import React from 'react';
import { AnimatedDots } from './AnimatedDots';
import { MainCardProps } from '@/types';

/**
 * Default text to display when no tab is selected
 */
const DEFAULT_TAB_LABEL = 'No Tab';

/**
 * MainCard component displays the main content area with animated elements
 * 
 * @param tabLabel - The label of the currently active tab
 * @returns A React component with the main card layout
 */
export const MainCard: React.FC<MainCardProps> = ({ tabLabel }) => {
  return (
    <div className="content-card-container">
      <div className="card-background" />
      <div className="card-glass" />
      
      <div className="main-card">
        <div className="card-content">
          <AnimatedDots variant="left" />
          
          <div className="tab-label-container">
            <span className="tab-label">
              {tabLabel || DEFAULT_TAB_LABEL}
            </span>
            <div className="shimmer-effect" />
          </div>
          
          <AnimatedDots variant="right" />
        </div>
        
        <div className="inner-glow" />
      </div>
    </div>
  );
}; 