import React from 'react';
import { AnimatedDotsProps } from '@/types';
import { ANIMATION_DELAYS } from '@/constants';

/**
 * AnimatedDots component displays animated dots with staggered animation delays
 * 
 * @param variant - The variant of dots to display ('left' or 'right')
 * @returns A React component with animated dots
 */
export const AnimatedDots: React.FC<AnimatedDotsProps> = ({ 
  variant = 'left' 
}) => {
  if (variant === 'left') {
    return (
      <div className="animated-dots">
        <div className="animated-dot dot-orange" />
        <div 
          className="animated-dot dot-pink" 
          style={{ animationDelay: ANIMATION_DELAYS.DOT_1 }} 
        />
        <div 
          className="animated-dot dot-purple" 
          style={{ animationDelay: ANIMATION_DELAYS.DOT_2 }} 
        />
      </div>
    );
  }

  return (
    <div className="animated-dots">
      <div 
        className="animated-dot dot-blue" 
        style={{ animationDelay: ANIMATION_DELAYS.DOT_3 }} 
      />
      <div 
        className="animated-dot dot-green" 
        style={{ animationDelay: ANIMATION_DELAYS.DOT_4 }} 
      />
      <div 
        className="animated-dot dot-yellow" 
        style={{ animationDelay: ANIMATION_DELAYS.DOT_5 }} 
      />
    </div>
  );
}; 