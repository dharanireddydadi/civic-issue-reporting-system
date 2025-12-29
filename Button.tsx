
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, className = '', ...props }) => {
  const baseClasses = 'px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0b1020]';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30 focus:ring-purple-500',
    secondary: 'bg-white/10 text-white hover:bg-white/20 focus:ring-gray-400',
  };

  const fullWidthClass = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseClasses} ${variants[variant]} ${fullWidthClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
