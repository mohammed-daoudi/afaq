import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-sage-light overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: CardProps) {
  return <div className={`px-6 py-4 border-b border-sage-light ${className}`} {...props}>{children}</div>;
}

export function CardTitle({ className = '', children, ...props }: CardProps) {
  return <h3 className={`text-xl font-heading font-semibold text-teal-deep ${className}`} {...props}>{children}</h3>;
}

export function CardContent({ className = '', children, ...props }: CardProps) {
  return <div className={`px-6 py-4 ${className}`} {...props}>{children}</div>;
}

export function CardFooter({ className = '', children, ...props }: CardProps) {
  return <div className={`px-6 py-4 border-t border-sage-light flex items-center ${className}`} {...props}>{children}</div>;
}
