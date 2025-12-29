
import React from 'react';
import SocialButton from './SocialButton';
import EmailForm from './EmailForm';
import { GoogleIcon } from '../icons/GoogleIcon';
import { AppleIcon } from '../icons/AppleIcon';

interface LoginCardProps {
  onLogin: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLogin }) => {
  return (
    <div className="bg-black/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10">
      <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center animate-fadeInUp">
        Welcome to Samyak Civic Issuing Platform
      </h1>
      <p className="text-center text-gray-300 mt-4 mb-8 text-lg animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        Report issues, share feedback, and build better communities together.
      </p>

      <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <SocialButton
          icon={<GoogleIcon />}
          text="Sign in with Google"
          variant="google"
          onClick={onLogin}
          aria-label="Sign in with your Google account"
        />
        <SocialButton
          icon={<AppleIcon />}
          text="Sign in with Apple ID"
          variant="apple"
          onClick={onLogin}
          aria-label="Sign in with your Apple ID"
        />
      </div>

      <div className="flex items-center my-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
        <div className="flex-grow border-t border-gray-500/30"></div>
        <span className="mx-4 text-sm font-medium text-gray-400">or continue with</span>
        <div className="flex-grow border-t border-gray-500/30"></div>
      </div>

      <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <EmailForm onLogin={onLogin} />
      </div>

      <p className="text-center text-sm text-gray-400 mt-6 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
        Don’t have an account?{' '}
        <a href="#" className="font-semibold text-purple-400 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginCard;
