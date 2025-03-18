import React, { useState } from 'react';
import { ArrowUp, ArrowDown, TrendingUp, DollarSign, Activity, Calendar, Target, Award, UserPlus, RefreshCw } from 'lucide-react';

const PlayerManagement = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'

  // Example player data (in a real app, this would come from game state)
  const players = [
    {
      id: 1,
      name: 'Lucas Silva',
      age: 21,
      nationality: 'Brasil',
      position: 'Atacante',
      club: 'Flamengo',
      overall: 72,
      potential: 86,
      value: 2500000,
      salary: 120000,
      form: 65,
      moral: 80,
      stats: {
        goals: 3,
        assists: 1,
        matches: 7,
        yellowCards: 1,
        redCards: 0
      },
      attributes: {
        finishing: 75,
        passing: 68,
        dribbling: 80,
        defense: 42,
        speed: 86,
        physical: 73,
        technique: 76,
        goalkeeper: 12
      },
      personality: 'Ambicioso',
      contractEnds: 2026,
      transfer: {
        status: 'Listed',
        interestedClubs: ['Fluminense', 'Santos'],
        lastOffer: 2800000
      },
      developmentPlan: 'Finishing',
      image: 'player1.jpg'
    },
    {
      id: 2,
      name: 'Gabriel Oliveira',
      age: 19,
      nationality: 'Brasil',
      position: 'Meio-Campo',
      club: 'Corinthians',
      overall: 68,
      potential: 84,
      value: 1800000,
      salary: 85000,
      form: 70,
      moral: 75,
      stats: {
        goals: 1,
        assists: 4,
        matches: 9,
        yellowCards: 2,
        redCards: 0
      },
      attributes: {
        finishing: 65,
        passing: 78,
        dribbling: 75,
        defense: 60,
        speed: 73,
        physical: 68,
        technique: 79,
        goalkeeper: 15
      },
      personality: 'Disciplinado',
      contractEnds: 2025,
      transfer: {
        status: 'Not Listed',
        interestedClubs: [],
        lastOffer: 0
      },
      developmentPlan: 'Passing',
      image: 'player2.jpg'
    }
  ];

  // Function to calculate attribute color based on value
  const getAttributeColor = (value) => {
    if (value >= 85) return 'text-green-600';
    if (value >= 70) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Function to render attribute with colored value
  const renderAttribute = (name, value) => (
    <div className="flex justify-between items-center py-1">
      <span className="text-gray-600">{name}</span>
      <span className={`font-medium ${getAttributeColor(value)}`}>{value}</span>
    </div>
  );

  // Position-based styling
  const getPositionColor = (position) => {
    const colors = {
      'Goleiro': 'bg-yellow-100 text-yellow-800',
      'Defensor': 'bg-blue-100 text-blue-800',
      'Meio-Campo': 'bg-green-100 text-green-800',
      'Atacante': 'bg-red-100 text-red-800'
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setViewMode('details');
  };

  const getOverallColor = (overall) => {
    if (overall >= 85) return 'bg-green-600 text-white';
    if (overall >= 75) return 'bg-green-500 text-white';
    if (overall >= 65) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="container mx-auto p-6">
      {viewMode === 'list' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Your Clients</h1>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                <UserPlus className="w-4 h-4" />
                <span>Scout Players</span>
              </button>
              <button className="px-4 py-2 border rounded hover:bg-gray-50">Filter</button>
              <button className="px-4 py-2 border rounded hover:bg-gray-50">Sort</button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {players.map(player => (
                  <tr 
                    key={player.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handlePlayerClick(player)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold">
                          {player.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-gray-500">{player.nationality}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {player.age}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPositionColor(player.position)}`}>
                        {player.position}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm">{player.club}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${getOverallColor(player.overall)}`}>
                          {player.overall}
                        </span>
                        <span className="text-gray-400 text-xs">{player.potential}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">€{(player.value / 1000000).toFixed(1)}M</td>
                    <td className="py-4 px-4">
                      {player.transfer.status === 'Listed' ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Transfer Listed
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          In Development
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {selectedPlayer && (
            <div className="mb-4">
              <button 
                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
                onClick={() => setViewMode('list')}
              >
                <ArrowUp className="w-4 h-4 mr-1" /> Back to All Players
              </button>
              
              <div className="grid grid-cols-3 gap-6">
                {/* Left column - Player info */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6 pb-4 border-b">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedPlayer.name}</h2>
                        <div className="text-gray-600 flex items-center mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getPositionColor(selectedPlayer.position)} mr-2`}>
                            {selectedPlayer.position}
                          </span>
                          <span>{selectedPlayer.nationality}</span>
                          <span className="mx-2">•</span>
                          <span>{selectedPlayer.age} years</span>
                        </div>
                      </div>
                      <div className={`w-16 h-16 flex items-center justify-center rounded-full text-xl font-bold ${getOverallColor(selectedPlayer.overall)}`}>
                        {selectedPlayer.overall}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex mb-4">
                      <div className="w-1/2 pr-4 border-r">
                        <div className="text-sm font-medium text-gray-500 mb-1">Club</div>
                        <div className="font-medium">{selectedPlayer.club}</div>
                      </div>
                      <div className="w-1/2 pl-4">
                        <div className="text-sm font-medium text-gray-500 mb-1">Contract Until</div>
                        <div className="font-medium">{selectedPlayer.contractEnds}</div>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      <div className="w-1/2 pr-4 border-r">
                        <div className="text-sm font-medium text-gray-500 mb-1">Value</div>
                        <div className="font-medium">€{(selectedPlayer.value / 1000000).toFixed(1)}M</div>
                      </div>
                      <div className="w-1/2 pl-4">
                        <div className="text-sm font-medium text-gray-500 mb-1">Salary</div>
                        <div className="font-medium">€{(selectedPlayer.salary / 1000).toFixed(0)}K/week</div>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      <div className="w-1/2 pr-4 border-r">
                        <div className="text-sm font-medium text-gray-500 mb-1">Personality</div>
                        <div className="font-medium">{selectedPlayer.personality}</div>
                      </div>
                      <div className="w-1/2 pl-4">
                        <div className="text-sm font-medium text-gray-500 mb-1">Growth Potential</div>
                        <div className="flex items-center">
                          <span className="font-medium mr-1">{selectedPlayer.potential - selectedPlayer.overall}</span>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-gray-700 mb-2">Season Statistics</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-3 rounded text-center">
                          <div className="text-lg font-bold">{selectedPlayer.stats.matches}</div>
                          <div className="text-xs text-gray-500">Matches</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded text-center">
                          <div className="text-lg font-bold">{selectedPlayer.stats.goals}</div>
                          <div className="text-xs text-gray-500">Goals</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded text-center">
                          <div className="text-lg font-bold">{selectedPlayer.stats.assists}</div>
                          <div className="text-xs text-gray-500">Assists</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded text-center">
                          <div className="text-lg font-bold">{selectedPlayer.stats.yellowCards}</div>
                          <div className="text-xs text-gray-500">Cards</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Middle column - Attributes */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="font-medium">Player Attributes</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold ${getOverallColor(selectedPlayer.overall)}`}>
                          {selectedPlayer.overall}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-gray-500">Overall Rating</div>
                          <div className="text-xs text-gray-500">Potential: {selectedPlayer.potential}</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Form: {selectedPlayer.form}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Morale: {selectedPlayer.moral}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-6">
                      <div>
                        {renderAttribute('Finishing', selectedPlayer.attributes.finishing)}
                        {renderAttribute('Passing', selectedPlayer.attributes.passing)}
                        {renderAttribute('Dribbling', selectedPlayer.attributes.dribbling)}
                        {renderAttribute('Defense', selectedPlayer.attributes.defense)}
                      </div>
                      <div>
                        {renderAttribute('Speed', selectedPlayer.attributes.speed)}
                        {renderAttribute('Physical', selectedPlayer.attributes.physical)}
                        {renderAttribute('Technique', selectedPlayer.attributes.technique)}
                        {selectedPlayer.position === 'Goleiro' && 
                          renderAttribute('Goalkeeper', selectedPlayer.attributes.goalkeeper)}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-gray-700 mb-3">Development Plan</h3>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Focusing on: {selectedPlayer.developmentPlan}</div>
                            <div className="text-sm text-gray-600 mt-1">+2 points per month with training</div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                            <RefreshCw className="w-4 h-4 mr-1" /> Change Focus
                          </button>
                        </div>
                        
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Next attribute increase in 2 weeks</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right column - Actions */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Agent Actions</h3>
                    </div>
                    <div className="p-4">
                      <button className="w-full mb-2 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                        <DollarSign className="w-4 h-4" />
                        <span>Negotiate Transfer</span>
                      </button>
                      
                      <button className="w-full mb-2 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        <Target className="w-4 h-4" />
                        <span>Arrange Training</span>
                      </button>
                      
                      <button className="w-full mb-2 flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Meeting</span>
                      </button>
                    </div>
                  </div>
                  
                  {selectedPlayer.transfer.status === 'Listed' && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="p-4 border-b">
                        <h3 className="font-medium">Transfer Status</h3>
                      </div>
                      <div className="p-4">
                        <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
                          <div className="font-medium">Player Listed for Transfer</div>
                          <div className="text-sm text-gray-600 mt-1">Asking price: €{(selectedPlayer.value * 1.2 / 1000000).toFixed(1)}M</div>
                        </div>
                        
                        {selectedPlayer.transfer.interestedClubs.length > 0 && (
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">Interested Clubs:</div>
                            {selectedPlayer.transfer.interestedClubs.map((club, index) => (
                              <div key={index} className="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded">
                                <span>{club}</span>
                                <button className="text-xs text-blue-600 hover:text-blue-800">
                                  Contact
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Player Happiness</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${selectedPlayer.moral}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{selectedPlayer.moral}%</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedPlayer.moral >= 80 
                          ? "Player is very happy with their situation." 
                          : selectedPlayer.moral >= 60 
                          ? "Player is satisfied but wants more playing time."
                          : "Player is unhappy and considering options."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlayerManagement;