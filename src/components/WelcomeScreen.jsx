// src/components/WelcomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { useGameContext } from '../core/GameContext';
import { Upload, Save } from 'lucide-react';

const WelcomeScreen = () => {
  const { startNewGame, loadSavedGame } = useGameContext();
  const [agentName, setAgentName] = useState('');
  const [difficulty, setDifficulty] = useState('normal');
  const [showNewGame, setShowNewGame] = useState(true);
  const [savedGames, setSavedGames] = useState([]);
  const [selectedSave, setSelectedSave] = useState(null);
  
  // Load saved games from localStorage
  useEffect(() => {
    try {
      const savedGamesData = localStorage.getItem('footballAgentSaves');
      if (savedGamesData) {
        const parsedGames = JSON.parse(savedGamesData);
        setSavedGames(parsedGames);
      }
    } catch (error) {
      console.error('Failed to load saved games:', error);
    }
  }, []);
  
  const handleStartNewGame = () => {
    if (!agentName.trim()) {
      alert('Please enter your agent name');
      return;
    }
    
    startNewGame(agentName, difficulty);
  };
  
  const handleLoadGame = () => {
    if (!selectedSave) {
      alert('Please select a saved game');
      return;
    }
    
    loadSavedGame(selectedSave);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">
        <div className="md:flex">
          {/* Left side - Game logo and info */}
          <div className="md:w-1/2 bg-blue-900 text-white p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">⚽ Football Agent Simulator</h1>
            <p className="text-blue-200 mb-6">
              Build your career as a football agent. Discover talented players, negotiate transfers, and become the most influential agent in the world of football.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>Manage players and develop their careers</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>Negotiate contracts and transfers</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>Build your reputation and agency empire</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>Compete across multiple leagues and seasons</span>
              </div>
            </div>
          </div>
          
          {/* Right side - New Game / Load Game */}
          <div className="md:w-1/2 p-8">
            <div className="flex justify-center mb-6">
              <button 
                className={`px-4 py-2 ${showNewGame ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-l`}
                onClick={() => setShowNewGame(true)}
              >
                New Career
              </button>
              <button 
                className={`px-4 py-2 ${!showNewGame ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-r`}
                onClick={() => setShowNewGame(false)}
              >
                Load Career
              </button>
            </div>
            
            {showNewGame ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Start Your Agent Career</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Agent Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    placeholder="Enter your name"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <div className="grid grid-cols-3 gap-2">
                    <div 
                      className={`border rounded p-2 text-center cursor-pointer ${difficulty === 'easy' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={() => setDifficulty('easy')}
                    >
                      <div className="font-bold">Beginner</div>
                      <div className="text-xs">Start with €250K</div>
                    </div>
                    <div 
                      className={`border rounded p-2 text-center cursor-pointer ${difficulty === 'normal' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={() => setDifficulty('normal')}
                    >
                      <div className="font-bold">Regular</div>
                      <div className="text-xs">Start with €100K</div>
                    </div>
                    <div 
                      className={`border rounded p-2 text-center cursor-pointer ${difficulty === 'hard' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={() => setDifficulty('hard')}
                    >
                      <div className="font-bold">Expert</div>
                      <div className="text-xs">Start with €50K</div>
                    </div>
                  </div>
                </div>
                <button 
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center"
                  onClick={handleStartNewGame}
                >
                  <Save className="w-5 h-5 mr-2" />
                  Start Career
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Load Saved Career</h2>
                
                {savedGames.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-6">
                    {savedGames
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map(save => (
                        <div 
                          key={save.id}
                          className={`border rounded p-3 cursor-pointer ${
                            selectedSave?.id === save.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedSave(save)}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="font-medium">{save.name}</div>
                            <div className="text-xs text-gray-500">{formatDate(save.date)}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">Agent:</span> {save.details.agent}
                            </div>
                            <div>
                              <span className="text-gray-500">Season:</span> {save.details.season}
                            </div>
                            <div>
                              <span className="text-gray-500">Week:</span> {save.details.week}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-8 mb-6">
                    <Save className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No saved games found.</p>
                  </div>
                )}
                
                <button 
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center"
                  onClick={handleLoadGame}
                  disabled={!selectedSave || savedGames.length === 0}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Load Career
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;