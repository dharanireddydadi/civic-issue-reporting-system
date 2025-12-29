import React, { useState, useEffect } from 'react';
import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon, CloseIcon } from '../icons/DashboardIcons';
import { Notification } from '../../App';

interface ToastProps {
  notification: Notification;
  onClose: () => void;
}

const icons = {
  info: <BellIcon className="w-6 h-6 text-blue-400" />,
  success: <CheckCircleIcon className="w-6 h-6 text-green-400" />,
  error: <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />,
};

const borderColors = {
  info: 'border-blue-500/50',
  success: 'border-green-500/50',
  error: 'border-red-500/50',
};


const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    // Wait for animation to finish before calling parent's onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const { type, message } = notification;

  return (
    <div
      className={`w-full max-w-sm bg-black/50 backdrop-blur-xl border-l-4 rounded-lg shadow-2xl shadow-black/30 flex items-start p-4 space-x-4 ${borderColors[type]} ${isExiting ? 'animate-fadeOutRight' : 'animate-fadeInRight'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <div className="flex-1">
        <p className="font-semibold">Notification</p>
        <p className="text-sm text-gray-300">{message}</p>
      </div>
      <div className="flex-shrink-0">
        <button onClick={handleClose} className="p-1 rounded-full hover:bg-white/10" aria-label="Close notification">
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
