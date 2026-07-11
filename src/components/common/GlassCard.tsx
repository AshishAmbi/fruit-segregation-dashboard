import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
};

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  style,
  onClick,
  hover = true,
  padding = 'md',
}) => {
  return (
    <div
      className={`glass-card ${paddingMap[padding]} ${hover ? 'hover:scale-[1.002]' : ''} ${className}`}
      style={{ transition: 'transform 200ms ease, box-shadow 300ms ease, border-color 300ms ease', ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
