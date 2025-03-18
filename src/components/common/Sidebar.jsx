// src/components/common/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  DollarSign, 
  BarChart2, 
  Trophy, 
  Calendar, 
  Briefcase,
  Settings, 
  Dumbbell,
  Menu,
  X
} from 'lucide-react';
import { useGameContext } from '../../core/GameContext';

const Sidebar = ({ currentView, onNavigate }) => {
  const { state } = useGameContext();
  const { gameState } = state;
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Briefcase className="w-5 h-5" />, path: '/dashboard' },
    { id: 'players', label: 'My Players', icon: <User className="w-5 h-5" />, path: '/players' },
    { id: 'transfer-market', label: 'Transfer Market', icon: <DollarSign className="w-5 h-5" />, path: '/transfer-market' },
    { id: 'training', label: 'Training', icon: <Dumbbell className="w-5 h-5" />, path: '/training' },
    { id: 'simulation', label: 'Simulation', icon: <Calendar className="w-5 h-5" />, path: '/simulation' },
    { id: 'awards-statistics', label: 'Awards & Stats', icon: <Trophy className="w-5 h-5" />, path: '/awards-statistics' },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleNavigation = (id) => {
    onNavigate(id);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  // Mobile sidebar toggle button
  const MobileToggle = () => (
    <button 
      className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md touch-target"
      onClick={toggleSidebar}
      aria-label="Toggle menu"
    >
      {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
  
  // Sidebar overlay for mobile
  const SidebarOverlay = () => (
    isMobile && sidebarOpen && (
      <div 
        className="sidebar-overlay open"
        onClick={() => setSidebarOpen(false)}
      ></div>
    )
  );
  
  return (
    <>
      {isMobile && <MobileToggle />}
      <SidebarOverlay />
      
      <div className={`${isMobile ? 'sidebar-mobile shadow-lg' : 'w-64'} bg-white ${
        isMobile && sidebarOpen ? 'open' : ''
      }`}>
        <div className="p-4 border-b">
          <div className="font-bold text-lg">{gameState.agent.name || 'New Agent'}</div>
          <div className="text-sm text-gray-500">Football Agent</div>
        </div>
        
        <ul className="p-2">
          {menuItems.map(item => (
            <li key={item.id} className="mb-1">
              <Link
                to={item.path}
                className={`w-full text-left p-2 rounded flex items-center space-x-2 touch-target ${
                  currentView === item.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'hover:bg-blue-100 text-gray-700'
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Agent stats summary */}
        <div className="mt-4 p-4 border-t">
          <div className="text-xs text-gray-500 mb-2">AGENT STATS</div>
          <div className="flex justify-between text-sm mb-1">
            <span>Balance:</span>
            <span className="font-medium">€{((gameState.agent.balance || 0) / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Reputation:</span>
            <span className="font-medium">{gameState.agent.reputation || 0}/100</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Clients:</span>
            <span className="font-medium">{gameState.agent.clients?.length || 0}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;