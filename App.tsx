import React, { useState, createContext, useContext, useMemo, useCallback } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginCard from './components/auth/LoginCard';

// MOCK DATA AND API
const mockUser = {
  id: 'user-001',
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/40?img=1',
  credits: 1250,
  linkedAccounts: {
    upi: 'johndoe@upi'
  }
};

const mockIssues = [
  { id: 'ISS-001', title: 'Massive Pothole on Elm Street', description: 'A very large and dangerous pothole has formed near the intersection of Elm and Oak. It poses a significant risk to vehicles, especially at night. Several cars have reported tire damage.', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc182f6?q=80&w=2070&auto=format&fit=crop', status: 'In Progress', userId: 'user-001', upvotes: 128, comments: 15, reporter: { name: 'Jane S.', avatar: 'https://i.pravatar.cc/40?img=3' }, date: '2 days ago', severity: 'High', category: 'Roads', escalated: false },
  { id: 'ISS-002', title: 'Garbage not collected for 3 days', description: 'The garbage bins in the residential area of Willow Creek are overflowing. This is attracting pests and creating a very unpleasant smell for the residents.', image: 'https://images.unsplash.com/photo-1574716474199-653e3a473e34?q=80&w=1974&auto=format&fit=crop', status: 'Pending', userId: 'user-001', upvotes: 95, comments: 8, reporter: { name: 'Sam W.', avatar: 'https://i.pravatar.cc/40?img=4' }, date: '1 day ago', severity: 'Medium', category: 'Garbage', escalated: false },
  { id: 'ISS-003', title: 'Streetlight out near park', description: 'The main streetlight at the corner of the park on 5th Ave has been out for over a week, making the area very dark and unsafe for people walking at night.', image: 'https://images.pexels.com/photos/1089333/pexels-photo-1089333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', status: 'Resolved', userId: 'user-001', upvotes: 72, comments: 4, reporter: { name: 'Emily B.', avatar: 'https://i.pravatar.cc/40?img=5' }, date: '5 days ago', severity: 'Low', category: 'Streetlights', escalated: false },
  { id: 'ISS-004', title: 'Broken Park Bench', description: 'A wooden bench near the playground is broken and has sharp edges, posing a danger to children playing in the area.', image: 'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?q=80&w=2070&auto=format&fit=crop', status: 'In Progress', userId: 'user-002', upvotes: 45, comments: 3, reporter: { name: 'Mike T.', avatar: 'https://i.pravatar.cc/40?img=6' }, date: '3 days ago', severity: 'Medium', category: 'Parks', escalated: false },
];

const mockTransactions = [
    { id: 'txn-1', description: 'Resolved Issue #ISS-003', amount: 100, type: 'credit', date: new Date().toISOString() },
    { id: 'txn-2', description: 'Reported new issue', amount: 50, type: 'credit', date: new Date(Date.now() - 86400000).toISOString() },
    { id: 'txn-3', description: 'Community Upvote', amount: 10, type: 'credit', date: new Date(Date.now() - 172800000).toISOString() },
];

const mockApi = {
  getIssues: async ({ userId }: { userId: string }) => {
    console.log(`Fetching issues for ${userId}`);
    await new Promise(res => setTimeout(res, 500));
    return mockIssues.filter(issue => issue.userId === userId);
  },
  getTransactions: async (userId: string) => {
    console.log(`Fetching transactions for ${userId}`);
    await new Promise(res => setTimeout(res, 500));
    return mockTransactions;
  },
  getAllIssues: async () => {
    await new Promise(res => setTimeout(res, 500));
    return mockIssues;
  }
};

// APP CONTEXT
export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface AppContextType {
  user: typeof mockUser | null;
  login: () => void;
  logout: () => void;
  api: typeof mockApi;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: number) => void;
}

const AppContext = createContext<AppContextType>(null!);

export const useApp = () => useContext(AppContext);

// MAIN APP COMPONENT
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const newNotification = { ...notification, id: Date.now() };
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const onLogin = () => {
    setIsAuthenticated(true);
    // Persist login state
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
  };

  // Check for persisted login state on initial load
  useState(() => {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  });

  const appValue = useMemo(() => ({
    user: isAuthenticated ? mockUser : null,
    login: onLogin,
    logout: onLogout,
    api: mockApi,
    notifications,
    addNotification,
    removeNotification,
  }), [isAuthenticated, notifications, addNotification, removeNotification]);


  if (!isAuthenticated) {
    return (
      <AppContext.Provider value={appValue}>
        <div className="relative min-h-screen bg-[#0b1020] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute top-0 -left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 -right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
          <LoginCard onLogin={onLogin} />
        </div>
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={appValue}>
      <DashboardLayout />
    </AppContext.Provider>
  );
};

export default App;
