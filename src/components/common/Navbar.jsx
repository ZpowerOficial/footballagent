// src/components/common/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Bell, Save, Settings, ChevronDown, LogOut } from 'lucide-react';
import { useGameContext } from '../../core/GameContext';

const Navbar = () => {
  const { state, saveCurrentGame } = useGameContext();
  const { gameState } = state;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSave = () => {
    saveCurrentGame();
  };
  
  // Get unread notifications count
  const unreadCount = gameState?.notifications?.filter(n => !n.read)?.length || 0;
  
  // Format notifications for display
  const getFormattedNotifications = () => {
    if (!gameState?.notifications) return [];
    
    return gameState.notifications
      .slice(0, 5) // Show only the latest 5
      .map(notification => ({
        ...notification,
        // Format the timestamp
        formattedTime: new Date(notification.timestamp || Date.now()).toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
  };
  
  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Logo and Season */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="font-bold text-xl hidden sm:block">⚽ Football Agent</Link>
          <Link to="/" className="font-bold text-xl sm:hidden">⚽ FAS</Link>
          <span className="text-xs bg-blue-700 px-2 py-1 rounded">
            S{gameState?.currentSeason || 1}
          </span>
        </div>
        
        {/* Right Side - Controls */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Week display */}
          <button className="flex items-center space-x-1">
            <Calendar className="w-5 h-5" />
            <span className="hidden xs:inline">Week</span> {gameState?.currentWeek || 1}/{38}
          </button>
          
          {/* Notifications dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button 
              className="flex items-center space-x-1 relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-200">
                  <div className="font-medium text-gray-800">Notifications</div>
                </div>
                
                {getFormattedNotifications().length > 0 ? (
                  getFormattedNotifications().map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${notification.read ? 'opacity-60' : ''}`}
                    >
                      <div className="flex justify-between">
                        <div className="font-medium text-sm text-gray-800">{notification.type}</div>
                        <div className="text-xs text-gray-500">{notification.formattedTime}</div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    No notifications
                  </div>
                )}
                
                {getFormattedNotifications().length > 0 && (
                  <div className="px-4 py-2 text-center">
                    <Link 
                      to="/notifications" 
                      className="text-blue-600 text-sm hover:text-blue-800"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Save button */}
          <button 
            className="flex items-center space-x-1"
            onClick={handleSave}
            aria-label="Save game"
          >
            <Save className="w-5 h-5" />
          </button>
          
          {/* Settings dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center space-x-1"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-label="Settings menu"
            >
              <Settings className="w-5 h-5" />
              <ChevronDown className="w-4 h-4 hidden sm:block" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link 
                  to="/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Game Settings
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Agent Profile
                </Link>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleSave}
                >
                  Save Game
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  onClick={() => {
                    if (confirm('Are you sure you want to quit? Unsaved progress will be lost.')) {
                      window.location.reload();
                    }
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Quit Game
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;