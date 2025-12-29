import React from 'react';
import { useApp } from '../../App';
import Toast from './Toast';

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-24 right-6 z-[100] w-full max-w-sm space-y-3">
        {notifications.map(notif => (
            <Toast key={notif.id} notification={notif} onClose={() => removeNotification(notif.id)} />
        ))}
    </div>
  );
};

export default NotificationContainer;
