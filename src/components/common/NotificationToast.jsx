
// src/components/common/NotificationToast.jsx
import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';
import { useGameContext } from '../../core/GameContext';

const NotificationToast = ({ notification }) => {
  const { setNotification } = useGameContext();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [notification, setNotification]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className={`rounded-lg shadow-lg p-4 flex items-center ${
        notification.type === 'success' ? 'bg-green-100 border border-green-200' :
        notification.type === 'error' ? 'bg-red-100 border border-red-200' :
        'bg-blue-100 border border-blue-200'
      }`}>
        {notification.type === 'success' ? (
          <Check className="w-5 h-5 text-green-500 mr-2" />
        ) : notification.type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
        ) : (
          <AlertCircle className="w-5 h-5 text-blue-500 mr-2" />
        )}
        <span className={notification.type === 'success' ? 'text-green-800' : 
                        notification.type === 'error' ? 'text-red-800' : 'text-blue-800'}>
          {notification.message}
        </span>
        <button 
          className="ml-auto"
          onClick={() => setNotification(null)}
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;