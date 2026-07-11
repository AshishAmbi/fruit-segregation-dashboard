import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  label?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 32,
  color = '#3B82F6',
  label,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        style={{
          width: size,
          height: size,
          border: `2px solid rgba(59,130,246,0.15)`,
          borderTopColor: color,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {label && (
        <span style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: '0.05em' }}>
          {label}
        </span>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LoadingSpinner;
