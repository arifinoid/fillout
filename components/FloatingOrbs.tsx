import React from 'react';

export const FloatingOrbs: React.FC = () => {
  return (
    <div className="animated-background">
      <div className="floating-orb floating-orb-orange" style={{ top: '25%', left: '25%' }} />
      <div className="floating-orb floating-orb-blue" style={{ top: '75%', right: '25%', animationDelay: '1s' }} />
      <div className="floating-orb floating-orb-green" style={{ top: '50%', left: '50%', width: '16rem', height: '16rem', animationDelay: '2s' }} />
    </div>
  );
}; 