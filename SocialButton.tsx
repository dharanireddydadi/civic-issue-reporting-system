
import React from 'react';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text: string;
  variant: 'google' | 'apple';
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, text, variant, ...props }) => {
  const baseClasses =
    'w-full flex items-center justify-center p-3 rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0b1020] focus:ring-blue-500 transform hover:scale-105';

  const variants = {
    google:
      'bg-white text-gray-800 border border-gray-300 hover:shadow-lg hover:shadow-blue-500/20',
    apple: 'bg-black text-white hover:shadow-lg hover:shadow-white/10',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default SocialButton;
