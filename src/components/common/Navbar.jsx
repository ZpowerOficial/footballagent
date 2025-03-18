// src/components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Bell, Save, Settings } from 'lucide-react';
import { useGameContext } from '../../core/GameContext';

const Navbar = () => {
  const { state, saveCurrentGame } = useGameContext();
  const { gameState } = state;
  
  const handleSave = () => {
    saveCurrentGame();
  };
  
  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="font-bold text-xl">⚽ Football Agent Simulator</Link>
          <span className="text-xs bg-blue-700 px-2 py-1 rounded">
            Season {gameState?.currentSeason || 1}
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-1">
            <Calendar className="w-5 h-5" />
            <span>Week {gameState?.currentWeek || 1}/38</span>
          </button>
          <button className="flex items-center space-x-1 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {gameState?.notifications?.filter(n => !n.read)?.length || 0}
            </span>
          </button>
          <button 
            className="flex items-center space-x-1"
            onClick={handleSave}
          >
            <Save className="w-5 h-5" />
          </button>
          <Link to="/settings" className="flex items-center space-x-1">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;