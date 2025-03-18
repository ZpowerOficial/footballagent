import React, { useState } from 'react';
import { Shield, MapPin, Clock, DollarSign, Star, Users, TrendingUp, Award, User, Briefcase, Activity, Layers } from 'lucide-react';

const ClubView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Example club data (in a real implementation, this would come from props or context)
  const club = {
    id: 1,
    name: 'Flamengo',
    country: 'Brasil',
    league: 'Brasil 1ª Divisão',
    budget: 85000000,
    originalBudget: 100000000,
    spent: 15000000,
    fame: 8,
    strength: 82,
    position: 1,
    points: 72,
    goalsFor: 68,
    goalsAgainst: 24,
    matches: 34,
    wins: 22,
    draws: 6,
    losses: 6,
    staff: {
      coach: 'Experiente',
      assistantCoach: 'Bom',
      manager: 'Eficiente',
      scouts: 4,
      physios: 3,
      psychologists: 2,
      fitnessCoaches: 3,
      marketingManager: 'Expert'
    },
    facilities: {
      stadium: 5,
      trainingCenter: 4,
      medicalCenter: 4,
      youthAcademy: 4,
    },
    playStyle: 'Posse de Bola',
    formation: '4-3-3',
    popularity: 92,
    lastResults: ['W', 'W', 'D', 'W', 'L']
  };
  
  // Example squad data (would come from filtered player data in real app)
  const squad = [
    { id: 1, name: 'Hugo Silva', position: 'Goleiro', overall: 84, age: 27, nationality: 'Brasil', value: 28000000, contract: 3, agent: 'CPU' },
    { id: 2, name: 'Rafael Santos', position: 'Defensor', overall: 82, age: 29, nationality: 'Brasil', value: 24000000, contract: 2, agent: 'CPU' },
    { id: 3, name: 'Eduardo Costa', position: 'Defensor', overall: 81, age: 25, nationality: 'Brasil', value: 26000000, contract: 3, agent: 'CPU' },
    { id: 4, name: 'Carlos Oliveira', position: 'Defensor', overall: 80, age: 31, nationality: 'Brasil', value: 18000000, contract: 1, agent: 'CPU' },
    { id: 5, name: 'Lucas Ferreira', position: 'Defensor', overall: 78, age: 24, nationality: 'Brasil', value: 15000000, contract: 4, agent: 'CPU' },
    { id: 6, name: 'Gabriel Martins', position: 'Meio-Campo', overall: 85, age: 26, nationality: 'Brasil', value: 42000000, contract: 4, agent: 'John Mendes' },
    { id: 7, name: 'João Almeida', position: 'Meio-Campo', overall: 83, age: 23, nationality: 'Brasil', value: 35000000, contract: 5, agent: 'CPU' },
    { id: 8, name: 'Miguel Souza', position: 'Meio-Campo', overall: 80, age: 22, nationality: 'Brasil', value: 28000000, contract: 3, agent: 'CPU' },
    { id: 9, name: 'Pedro Rodrigues', position: 'Meio-Campo', overall: 79, age: 21, nationality: 'Brasil', value: 22000000, contract: 4, agent: 'CPU' },
    { id: 10, name: 'Carlos Eduardo', position: 'Atacante', overall: 88, age: 26, nationality: 'Brasil', value: 65000000, contract: 3, agent: 'CPU' },
    { id: 11, name: 'André Luiz', position: 'Atacante', overall: 84, age: 25, nationality: 'Brasil', value: 45000000, contract: 2, agent: 'CPU' },
    { id: 12, name: 'Roberto Silva', position: 'Atacante', overall: 82, age: 24, nationality: 'Brasil', value: 38000000, contract: 3, agent: 'John Mendes' }
  ];
  
  // Example transfer history
  const transferHistory = [
    { id: 1, playerName: 'Marcos Paulo', position: 'Meio-Campo', type: 'in', fromTo: 'Santos', fee: 12000000, season: 'Current Season' },
    { id: 2, playerName: 'Thiago Neves', position: 'Atacante', type: 'out', fromTo: 'São Paulo', fee: 18000000, season: 'Current Season' },
    { id: 3, playerName: 'Gustavo Lima', position: 'Defensor', type: 'in', fromTo: 'Palmeiras', fee: 8500000, season: 'Last Season' },
    { id: 4, playerName: 'Felipe Melo', position: 'Meio-Campo', type: 'out', fromTo: 'Internacional', fee: 6200000, season: 'Last Season' }
  ];
  
  // Render facility rating with stars
  const renderFacilityRating = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            className={`w-4 h-4 ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };
  
  // Get position color
  const getPositionColor = (position) => {
    const colors = {
      'Goleiro': 'bg-yellow-100 text-yellow-800',
      'Defensor': 'bg-blue-100 text-blue-800',
      'Meio-Campo': 'bg-green-100 text-green-800',
      'Atacante': 'bg-red-100 text-red-800'
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };
  
  // Get overall rating color
  const getOverallColor = (overall) => {
    if (overall >= 85) return 'bg-green-600 text-white';
    if (overall >= 75) return 'bg-green-500 text-white';
    if (overall >= 65) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };
  
  // Format currency in millions
  const formatCurrency = (value) => {
    return `€${(value / 1000000).toFixed(1)}M`;
  };
  
  return (
    <div className="container mx-auto p-6">
      {/* Club header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-20 w-20 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-4">
              {club.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{club.name}</h1>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{club.country}</span>
                <span className="mx-2">•</span>
                <span>{club.league}</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium mr-2">
                  {club.playStyle}
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                  {club.formation}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">Position</div>
              <div className="text-lg font-bold">{club.position}<span className="text-sm text-gray-500">/20</span></div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Points</div>
              <div className="text-lg font-bold">{club.points}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Goals</div>
              <div className="text-lg font-bold">{club.goalsFor}:{club.goalsAgainst}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Form</div>
              <div className="flex justify-center">
                {club.lastResults.map((result, index) => (
                  <span 
                    key={index} 
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold mx-0.5 ${
                      result === 'W' ? 'bg-green-500' : 
                      result === 'D' ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b overflow-x-auto">
          <button 
            className={`px-4 py-3 whitespace-nowrap font-medium flex items-center ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('overview')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Overview
          </button>
          <button 
            className={`px-4 py-3 whitespace-nowrap font-medium flex items-center ${activeTab === 'squad' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('squad')}
          >
            <Users className="w-4 h-4 mr-2" />
            Squad
          </button>
          <button 
            className={`px-4 py-3 whitespace-nowrap font-medium flex items-center ${activeTab === 'transfers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('transfers')}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Transfers
          </button>
          <button 
            className={`px-4 py-3 whitespace-nowrap font-medium flex items-center ${activeTab === 'facilities' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('facilities')}
          >
            <Layers className="w-4 h-4 mr-2" />
            Facilities
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Club stats */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="font-medium">Club Statistics</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Matches</div>
                  <div className="font-medium">{club.matches}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">League Position</div>
                  <div className="font-medium">{club.position}<span className="text-xs text-gray-500">/20</span></div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Record</div>
                  <div className="font-medium">{club.wins}W - {club.draws}D - {club.losses}L</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Goal Difference</div>
                  <div className="font-medium">{club.goalsFor - club.goalsAgainst}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="text-sm text-gray-500 mb-1">Team Strength</div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mr-2 ${getOverallColor(club.strength)}`}>
                    {club.strength}
                  </div>
                  <div className="text-sm text-gray-600">Rated {club.strength}/100</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-sm text-gray-500 mb-1">Popularity</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${club.popularity}%` }}></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">{club.popularity}%</div>
              </div>
            </div>
          </div>
          
          {/* Finances */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="font-medium">Financial Overview</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Transfer Budget</div>
                <div className="font-bold text-xl text-green-600">{formatCurrency(club.budget)}</div>
                <div className="text-xs text-gray-500">Original budget: {formatCurrency(club.originalBudget)}</div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Spent This Season</div>
                <div className="font-medium text-red-600">{formatCurrency(club.spent)}</div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Fame & Prestige</div>
                <div className="flex">
                  {[...Array(10)].map((_, index) => (
                    <Star 
                      key={index} 
                      className={`w-4 h-4 ${index < club.fame ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800 mb-1">Financial Status</div>
                <div className="text-sm text-gray-600">
                  {club.budget > club.originalBudget * 0.5 
                    ? 'This club has a healthy financial situation and may be open to significant transfers.'
                    : club.budget > club.originalBudget * 0.2
                    ? 'The club has spent moderately and might be cautious with future transfers.'
                    : 'The club has limited funds available and is unlikely to make major signings.'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Players */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="font-medium">Key Players</h3>
            </div>
            <div className="divide-y">
              {squad
                .sort((a, b) => b.overall - a.overall)
                .slice(0, 5)
                .map(player => (
                <div key={player.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold mr-3">
                      {player.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="flex items-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getPositionColor(player.position)} mr-2`}>
                          {player.position}
                        </span>
                        <span className="text-sm text-gray-500">{player.age} years</span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${getOverallColor(player.overall)}`}>
                    {player.overall}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center w-full">
                View Full Squad
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'squad' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {squad.map(player => (
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
                  <td className="py-4 px-4 text-sm">{player.age}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPositionColor(player.position)}`}>
                      {player.position}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${getOverallColor(player.overall)}`}>
                      {player.overall}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm">{formatCurrency(player.value)}</td>
                  <td className="py-4 px-4 text-sm">
                    {player.contract} {player.contract === 1 ? 'year' : 'years'}
                  </td>
                  <td className="py-4 px-4">
                    {player.agent === 'John Mendes' ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Your Client
                      </span>
                    ) : (
                      <span className="text-sm">{player.agent}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'transfers' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Transfer Activity</h3>
          </div>
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From/To</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transferHistory.map(transfer => (
                <tr key={transfer.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium">{transfer.playerName}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPositionColor(transfer.position)}`}>
                      {transfer.position}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${transfer.type === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {transfer.type === 'in' ? 'Incoming' : 'Outgoing'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">{transfer.fromTo}</td>
                  <td className="py-4 px-4 font-medium">{formatCurrency(transfer.fee)}</td>
                  <td className="py-4 px-4 text-sm">{transfer.season}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'facilities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Facilities */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="font-medium">Club Facilities</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Stadium</div>
                    <div className="text-sm text-gray-500">Capacity and quality</div>
                  </div>
                  {renderFacilityRating(club.facilities.stadium)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Training Center</div>
                    <div className="text-sm text-gray-500">Player development facilities</div>
                  </div>
                  {renderFacilityRating(club.facilities.trainingCenter)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Medical Center</div>
                    <div className="text-sm text-gray-500">Injury treatment and prevention</div>
                  </div>
                  {renderFacilityRating(club.facilities.medicalCenter)}
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Youth Academy</div>
                    <div className="text-sm text-gray-500">Young talent development</div>
                  </div>
                  {renderFacilityRating(club.facilities.youthAcademy)}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800 mb-1">Facility Impact</div>
                <div className="text-sm text-gray-600">
                  {(club.facilities.trainingCenter + club.facilities.medicalCenter) / 2 >= 4 
                    ? 'This club has excellent facilities for player development, making it attractive for young talent.'
                    : (club.facilities.trainingCenter + club.facilities.medicalCenter) / 2 >= 3
                    ? 'The club offers good facilities that can support player development adequately.'
                    : 'The club has limited facilities that may hinder optimal player development.'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Staff */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="font-medium">Club Staff</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Head Coach</div>
                    <div className="text-sm text-gray-500">Team leadership</div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{club.staff.coach}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Assistant Coach</div>
                    <div className="text-sm text-gray-500">Tactical support</div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{club.staff.assistantCoach}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Director of Football</div>
                    <div className="text-sm text-gray-500">Transfer strategy</div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{club.staff.manager}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Scouts</div>
                    <div className="text-sm text-gray-500">Talent identification</div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{club.staff.scouts} staff</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Medical Staff</div>
                    <div className="text-sm text-gray-500">Physios and doctors</div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{club.staff.physios} physios, {club.staff.psychologists} psychologists</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800 mb-1">Staff Assessment</div>
                <div className="text-sm text-gray-600">
                  {club.staff.coach === 'Experiente' && club.staff.scouts >= 3
                    ? 'The club has an experienced coaching team and strong scouting network, making it a good destination for players.'
                    : 'The club could benefit from improvements in their coaching and scouting departments for better player development.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubView;