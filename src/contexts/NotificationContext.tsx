import { createContext, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';
import { Bell, Gift, MapPin, MessageCircle, TrendingUp } from 'lucide-react';

interface NotificationContextType {
  showNewListingNotification: (title: string, city: string) => void;
  showRequestNotification: (title: string) => void;
  showSuccessNotification: (message: string) => void;
  showInfoNotification: (message: string) => void;
  showErrorNotification: (message: string) => void;
  showWelcomeNotification: (name: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  // Simulate real-time notifications for demo
  useEffect(() => {
    const notifications = [
      { delay: 10000, message: 'New food listing in Gaborone!', type: 'listing' },
      { delay: 25000, message: '5 new listings added in your area', type: 'info' },
      { delay: 40000, message: 'Someone just shared vegetables in Maun!', type: 'listing' },
    ];

    const timers = notifications.map(({ delay, message, type }) => 
      setTimeout(() => {
        if (type === 'listing') {
          toast(message, {
            icon: <Gift className="w-5 h-5 text-green-600" />,
            duration: 4000,
            className: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200',
          });
        } else {
          toast.info(message, {
            icon: <Bell className="w-5 h-5 text-blue-600" />,
            duration: 4000,
          });
        }
      }, delay)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const showNewListingNotification = (title: string, city: string) => {
    toast.success('Food Listed Successfully!', {
      description: `"${title}" is now available in ${city}`,
      icon: <Gift className="w-5 h-5" />,
      duration: 5000,
      className: 'bg-gradient-to-r from-green-50 to-emerald-50',
    });
  };

  const showRequestNotification = (title: string) => {
    toast.success('Request Sent!', {
      description: `Your request for "${title}" has been sent. You'll receive contact details soon.`,
      icon: <MessageCircle className="w-5 h-5" />,
      duration: 5000,
      className: 'bg-gradient-to-r from-blue-50 to-cyan-50',
    });
  };

  const showSuccessNotification = (message: string) => {
    toast.success(message, {
      icon: <TrendingUp className="w-5 h-5" />,
      duration: 4000,
    });
  };

  const showInfoNotification = (message: string) => {
    toast.info(message, {
      icon: <Bell className="w-5 h-5" />,
      duration: 4000,
    });
  };

  const showErrorNotification = (message: string) => {
    toast.error(message, {
      duration: 4000,
    });
  };

  const showWelcomeNotification = (name: string) => {
    toast.success(`Welcome to Moraka, ${name}!`, {
      description: 'Start browsing available food or share your surplus',
      icon: <span className="text-2xl">🌾</span>,
      duration: 5000,
      className: 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200',
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        showNewListingNotification,
        showRequestNotification,
        showSuccessNotification,
        showInfoNotification,
        showErrorNotification,
        showWelcomeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
