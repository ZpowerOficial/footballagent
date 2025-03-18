import React, { useState, useEffect } from 'react';
import { Bell, User, Trophy, DollarSign, Calendar, BarChart, Settings, Save, ThumbsUp } from 'lucide-react';

const MainDashboard = () => {
  const [gameState, setGameState] = useState({
    currentView: 'dashboard',
    agent: {
      name: 'New Agent',
      balance: 100000,
      reputation: 15,
      clients: [],
      offeredPlayers: []
    },
    currentWeek: 1,
    currentSeason: 1,
    notifications: [
      {
        id: 1,
        type: 'welcome',
        message: 'Welcome to your new career as a football agent! Start by recruiting your first clients.',
        read: false
      }
    ]
  });

  const [showNewGameModal, setShowNewGameModal] = useState(true);

  // Demo data for UI mockup
  const agentStats = [
    { name: 'Clients', value: gameState.agent.clients.length, icon: <User className="w-5 h-5 text-blue-500" /> },
    { name: 'Reputation', value: gameState.agent.reputation, icon: <ThumbsUp className="w-5 h-5 text-green-500" /> },
    { name: 'Bank Balance', value: `€${(gameState.agent.balance/1000).toFixed(1)}K`, icon: <DollarSign className="w-5 h-5 text-yellow-500" /> },
    { name: 'Season', value: gameState.currentSeason, icon: <Calendar className="w-5 h-5 text-purple-500" /> }
  ];

  const startNewGame = (agentName) => {
    setGameState(prev => ({
      ...prev,
      agent: {
        ...prev.agent,
        name: agentName
      }
    }));
    setShowNewGameModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* New Game Modal */}
      {showNewGameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Start Your Agent Career</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Agent Name</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="Enter your name"
                defaultValue={gameState.agent.name}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="border rounded p-2 text-center hover:bg-blue-50 cursor-pointer">
                <div className="font-bold">Beginner</div>
                <div className="text-xs">Start with €100K</div>
              </div>
              <div className="border rounded p-2 text-center hover:bg-blue-50 cursor-pointer">
                <div className="font-bold">Regular</div>
                <div className="text-xs">Start with €250K</div>
              </div>
              <div className="border rounded p-2 text-center hover:bg-blue-50 cursor-pointer">
                <div className="font-bold">Expert</div>
                <div className="text-xs">Start with €500K</div>
              </div>
            </div>
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => startNewGame("John Mendes")}
            >
              Start Career
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <nav className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">⚽ Football Agent Simulator</span>
            <span className="text-xs bg-blue-700 px-2 py-1 rounded">Season {gameState.currentSeason}</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-1">
              <Calendar className="w-5 h-5" />
              <span>Week {gameState.currentWeek}/38</span>
            </button>
            <button className="flex items-center space-x-1 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {gameState.notifications.filter(n => !n.read).length}
              </span>
            </button>
            <button className="flex items-center space-x-1">
              <Save className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-1">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4 border-b">
            <div className="font-bold text-lg">{gameState.agent.name}</div>
            <div className="text-sm text-gray-500">Football Agent</div>
          </div>
          <ul className="p-2">
            <li className="mb-1">
              <button className="w-full text-left p-2 rounded hover:bg-blue-100 flex items-center space-x-2 bg-blue-50 text-blue-700">
                <User className="w-5 h-5" />
                <span>My Players</span>
              </button>
            </li>
            <li className="mb-1">
              <button className="w-full text-left p-2 rounded hover:bg-blue-100 flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Transfer Market</span>
              </button>
            </li>
            <li className="mb-1">
              <button className="w-full text-left p-2 rounded hover:bg-blue-100 flex items-center space-x-2">
                <BarChart className="w-5 h-5" />
                <span>League Tables</span>
              </button>
            </li>
            <li className="mb-1">
              <button className="w-full text-left p-2 rounded hover:bg-blue-100 flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Awards & Stats</span>
              </button>
            </li>
          </ul>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Agent Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {agentStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
                <div className="rounded-full bg-gray-100 p-2">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-sm text-gray-500">{stat.name}</div>
                  <div className="font-bold text-xl">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Client List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b font-medium flex justify-between items-center">
                <span>Your Clients</span>
                <button className="text-sm text-blue-600 hover:text-blue-800">Find New Clients</button>
              </div>
              {gameState.agent.clients.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="text-gray-400 mb-2">You have no clients yet</div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Scout for Players
                  </button>
                </div>
              ) : (
                <ul className="divide-y">
                  {/* This would be populated with actual clients */}
                </ul>
              )}
            </div>
            
            {/* Opportunities */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b font-medium">Opportunities</div>
              <div className="p-4">
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-4">
                  <div className="font-medium">Upcoming Transfer Window</div>
                  <div className="text-sm text-gray-600 mb-2">Prepare your strategy for the January transfer window</div>
                  <div className="text-xs text-gray-500">Opens in 4 weeks</div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="font-medium">Player Available</div>
                  <div className="text-sm text-gray-600 mb-2">Carlos Silva (78 OVR) is looking for an agent</div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Top prospect</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Contact Player</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Game Controls */}
          <div className="mt-6 bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">Advance Game</div>
              <div className="text-sm text-gray-500">Current week: {gameState.currentWeek}</div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                1 Week
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                Until Transfer Window
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
                Until Next Client Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;