
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'bg-m3-primary' }) => (
  <span className={`px-2 py-0.5 rounded-m3-full text-[10px] font-bold text-white uppercase ${color}`}>
    {children}
  </span>
);
