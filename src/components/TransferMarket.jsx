import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, DollarSign, Star, ChevronDown, Info, Clock, ArrowRight } from 'lucide-react';

const TransferMarket = () => {
  const [selectedLeague, setSelectedLeague] = useState('All Leagues');
  const [selectedClub, setSelectedClub] = useState(null);
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  // Example data for the transfer market
  const availablePlayers = [
    {
      id: 1,
      name: 'Eduardo Santos',
      age: 24,
      nationality: 'Brasil',
      position: 'Meio-Campo',
      club: 'Santos',
      overall: 81,
      potential: 87,
      value: 18500000,
      salary: 85000,
      askingPrice: 22000000,
      expiryDate: '2 days',
      agent: 'CPU',
      status: 'Transfer Listed'
    },
    {
      id: 2,
      name: 'Luis Hernandez',
      age: 28,
      nationality: 'Espanha',
      position: 'Atacante',
      club: 'Sevilla',
      overall: 84,
      potential: 85,
      value: 35000000,
      salary: 120000,
      askingPrice: 40000000,
      expiryDate: '3 days',
      agent: 'CPU',
      status: 'Transfer Listed'
    },
    {
      id: 3,
      name: 'James Wilson',
      age: 23,
      nationality: 'Inglaterra',
      position: 'Defensor',
      club: 'Everton',
      overall: 78,
      potential: 85, 
      value: 14000000,
      salary: 60000,
      askingPrice: 16500000,
      expiryDate: '1 day',
      agent: 'CPU',
      status: 'Contract Expiring'
    },
    {
      id: 4,
      name: 'Rafael Gomes',
      age: 19,
      nationality: 'Brasil',
      position: 'Atacante',
      club: 'São Paulo',
      overall: 72,
      potential: 88,
      value: 8500000,
      salary: 45000,
      askingPrice: 12000000,
      expiryDate: '4 days',
      agent: 'CPU',
      status: 'Unhappy'
    },
    {
      id: 5,
      name: 'Matheus Almeida',
      age: 21,
      nationality: 'Brasil',
      position: 'Defensor',
      club: 'Palmeiras',
      overall: 74,
      potential: 83,
      value: 9500000,
      salary: 50000,
      askingPrice: 11000000,
      expiryDate: '5 days',
      agent: 'CPU',
      status: 'Transfer Listed'
    }
  ];
  
  const leagues = ['All Leagues', 'Brasil', 'Espanha', 'Inglaterra'];
  const positionFilters = ['All Positions', 'Goleiro', 'Defensor', 'Meio-Campo', 'Atacante'];
  
  // Filtering logic would go here in a real implementation
  const filteredPlayers = availablePlayers;
  
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
  
  const getOverallColor = (overall) => {
    if (overall >= 85) return 'bg-green-600 text-white';
    if (overall >= 75) return 'bg-green-500 text-white';
    if (overall >= 65) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };
  
  const getStatusBadge = (status) => {
    const styles = {
      'Transfer Listed': 'bg-blue-100 text-blue-800',
      'Contract Expiring': 'bg-orange-100 text-orange-800',
      'Unhappy': 'bg-red-100 text-red-800',
      'Wants to Leave': 'bg-purple-100 text-purple-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };
  
  const handleNegotiateClick = (player) => {
    setSelectedPlayer(player);
    setShowNegotiationModal(true);
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Transfer Market</h1>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="relative">
              <select 
                className="appearance-none bg-gray-50 border border-gray-300 rounded px-4 py-2 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
              >
                {leagues.map(league => (
                  <option key={league} value={league}>{league}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            
            <div className="relative">
              <select 
                className="appearance-none bg-gray-50 border border-gray-300 rounded px-4 py-2 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {positionFilters.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            
            <button className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort</span>
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search players..."
              className="bg-gray-50 border border-gray-300 rounded pl-10 pr-4 py-2 w-full md:w-80 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
      
      {/* Transfer Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-500 mb-1">Active Transfer Listings</h3>
          <div className="text-2xl font-bold">248</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-500 mb-1">Total Market Value</h3>
          <div className="text-2xl font-bold">€2.7B</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-500 mb-1">Transfer Window Status</h3>
          <div className="text-2xl font-bold text-green-600">Open</div>
          <div className="text-xs text-gray-500">Closes in 14 days</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-500 mb-1">Your Transfer Budget</h3>
          <div className="text-2xl font-bold">€2.4M</div>
          <div className="text-xs text-gray-500">Available for negotiations</div>
        </div>
      </div>
      
      {/* Player Listings */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OVR</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPlayers.map(player => (
              <tr key={player.id} className="hover:bg-gray-50">
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
                <td className="py-4 px-4 text-sm">
                  <div>€{(player.value / 1000000).toFixed(1)}M</div>
                  <div className="text-xs text-gray-500">Asking: €{(player.askingPrice / 1000000).toFixed(1)}M</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(player.status)}`}>
                      {player.status}
                    </span>
                    <div className="flex items-center ml-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {player.expiryDate}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button 
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    onClick={() => handleNegotiateClick(player)}
                  >
                    Negotiate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Negotiation Modal */}
      {showNegotiationModal && selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Transfer Negotiation</h2>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
                    {selectedPlayer.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-xl font-bold">{selectedPlayer.name}</div>
                    <div className="text-gray-600">
                      {selectedPlayer.age} years • {selectedPlayer.nationality} • 
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${getPositionColor(selectedPlayer.position)}`}>
                        {selectedPlayer.position}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold">
                    <span className={`inline-block w-10 h-10 flex items-center justify-center rounded-full mr-2 ${getOverallColor(selectedPlayer.overall)}`}>
                      {selectedPlayer.overall}
                    </span>
                    Overall Rating
                  </div>
                  <div className="text-sm text-gray-500">Potential: {selectedPlayer.potential}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Current Situation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Current Club</span>
                      <span className="font-medium">{selectedPlayer.club}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Current Salary</span>
                      <span className="font-medium">€{(selectedPlayer.salary / 1000).toFixed(0)}K/week</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Market Value</span>
                      <span className="font-medium">€{(selectedPlayer.value / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Asking Price</span>
                      <span className="font-medium">€{(selectedPlayer.askingPrice / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Make Your Offer</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Select Client</label>
                      <select className="w-full p-2 border border-gray-300 rounded">
                        <option>Choose a client to represent...</option>
                        <option>Lucas Silva (Attackante, 72 OVR)</option>
                        <option>Gabriel Oliveira (Meio-Campo, 68 OVR)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Target Club</label>
                      <select className="w-full p-2 border border-gray-300 rounded">
                        <option>Select club to negotiate with...</option>
                        <option>Manchester United (Inglaterra)</option>
                        <option>Barcelona (Espanha)</option>
                        <option>Flamengo (Brasil)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Transfer Fee (€{(selectedPlayer.askingPrice / 1000000).toFixed(1)}M asking)
                      </label>
                      <input 
                        type="range" 
                        min={(selectedPlayer.value * 0.7)} 
                        max={(selectedPlayer.askingPrice * 1.3)}
                        step={1000000}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        defaultValue={selectedPlayer.askingPrice}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>€{(selectedPlayer.value * 0.7 / 1000000).toFixed(1)}M</span>
                        <span className="font-medium">€{(selectedPlayer.askingPrice / 1000000).toFixed(1)}M</span>
                        <span>€{(selectedPlayer.askingPrice * 1.3 / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Salary Offer (€{(selectedPlayer.salary / 1000).toFixed(0)}K current)
                      </label>
                      <input 
                        type="range" 
                        min={(selectedPlayer.salary * 0.9)} 
                        max={(selectedPlayer.salary * 1.5)}
                        step={5000}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        defaultValue={selectedPlayer.salary * 1.1}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>€{(selectedPlayer.salary * 0.9 / 1000).toFixed(0)}K</span>
                        <span className="font-medium">€{(selectedPlayer.salary * 1.1 / 1000).toFixed(0)}K</span>
                        <span>€{(selectedPlayer.salary * 1.5 / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700">
                      The success of this negotiation depends on your reputation ({selectedPlayer.agent}'s agent is handling the player's side), 
                      the appeal of the target club, and how fair your offer is. Your commission will be 8% of the transfer fee.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => setShowNegotiationModal(false)}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
                  <span>Submit Offer</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferMarket;