import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withShimmer?: boolean;
}

export function Button({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  withShimmer = false,
  children, 
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-teal-deep text-white hover:bg-opacity-95 focus:ring-teal-deep",
    secondary: "bg-gold-soft text-white hover:bg-opacity-90 focus:ring-gold-soft",
    outline: "border border-teal-deep text-teal-deep hover:bg-sage-light focus:ring-teal-deep",
    ghost: "text-teal-deep hover:bg-sage-light focus:ring-teal-deep"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const shimmerClass = withShimmer ? 'shimmer-effect' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${shimmerClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
