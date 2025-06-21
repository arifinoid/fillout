import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AddPageButtonProps } from '@/types';

/**
 * AddPageButton component provides functionality to add new pages/tabs
 * 
 * @param onClick - Callback function when the button is clicked
 * @param position - Position of the button ('between' tabs or 'end')
 * @returns A React component with add page functionality
 */
export const AddPageButton: React.FC<AddPageButtonProps> = ({ 
  onClick, 
  position = 'end' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (position === 'between') {
    return (
      <div
        className="add-page-button-container group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="add-page-button-divider group-hover:opacity-80" />
        {isHovered && (
          <button
            onClick={onClick}
            className="add-page-button-between"
            type="button"
            aria-label="Add page between tabs"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="add-page-button-main group"
      type="button"
      aria-label="Add new page"
    >
      {/* Subtle background animation */}
      <div className="add-page-button-background group-hover:opacity-100" />
      
      <Plus className="add-page-button-icon group-hover:text-orange-500 group-hover:rotate-90" />
      <span className="add-page-button-text">Add page</span>
    </button>
  );
};

