
import React, { useState } from 'react';

// NOTE: In a real application, use an icon library like react-icons
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

interface EmailFormProps {
    onLogin: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add real form validation (e.g., with Zod or Yup)
    console.log({ email, password });
    // In a real app, call your auth service here.
    // Example: firebase.auth().signInWithEmailAndPassword(email, password);
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <EmailIcon />
        </div>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 pl-10 bg-white/5 border border-white/10 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          placeholder="Email address"
        />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LockIcon />
        </div>
        <input
          id="password-input"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 pl-10 bg-white/5 border border-white/10 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          placeholder="Password"
        />
         <div className="text-right mt-2">
            <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Forgot password?</a>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0b1020] focus:ring-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
      >
        Sign In
      </button>
    </form>
  );
};

export default EmailForm;
