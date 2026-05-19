import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ className = '', children, title }) => {
  return (
    <div className={`bg-notion-bg-card border border-notion-border rounded-lg card-hover p-5 ${className}`}>
      {title && (
        <h3 className="text-base font-semibold mb-4 text-notion-text">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;
