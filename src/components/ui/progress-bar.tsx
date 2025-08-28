import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-medium text-foreground">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};