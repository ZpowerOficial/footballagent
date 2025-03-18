import React, { useState } from 'react';
import { Calendar, Play, FastForward, ChevronsRight, PauseCircle, Clock, Award, User, Trophy } from 'lucide-react';

const SimulationScreen = () => {
  const [simulating, setSimulating] = useState(false);
  const [simSpeed, setSimSpeed] = useState('normal');
  const [showMatchResult, setShowMatchResult] = useState(false);
  
  // Example game state data (this would come from context/props in real app)
  const gameState = {
    currentWeek: 12,
    currentSeason: 1,
    transferWindow: false,
    isTransferWindowSoon: true,
    upcomingEvents: [
      { week: 13, type: 'clientMatch', description: 'Gabriel Martins playing vs Barcelona' },
      { week: 14, type: 'transferWindow', description: 'Winter transfer window opens' },
      { week: 15, type: 'contractExpiry', description: 'Roberto Silva contract expires in 4 weeks' }
    ]
  };
  
  // Example fixtures data
  const fixtures = [
    { id: 1, league: 'España 1ª Divisão', home: 'Barcelona', away: 'Real Madrid', score: '2-1', played: true },
    { id: 2, league: 'España 1ª Divisão', home: 'Atlético Madrid', away: 'Sevilla', score: '0-0', played: true },
    { id: 3, league: 'Inglaterra 1ª Divisão', home: 'Manchester United', away: 'Liverpool', score: '1-2', played: true },
    { id: 4, league: 'Inglaterra 1ª Divisão', home: 'Arsenal', away: 'Chelsea', score: '3-1', played: true },
    { id: 5, league: 'Brasil 1ª Divisão', home: 'Flamengo', away: 'São Paulo', score: null, played: false },
    { id: 6, league: 'Brasil 1ª Divisão', home: 'Palmeiras', away: 'Santos', score: null, played: false },
  ];
  
  // Example current match result data (when showing a match)
  const currentMatch = {
    league: 'Brasil 1ª Divisão',
    home: {
      name: 'Flamengo',
      score: 2,
      scorers: [
        { name: 'Carlos Eduardo', minute: 23, assist: 'Gabriel Martins' },
        { name: 'Gabriel Martins', minute: 67, assist: null },
      ]
    },
    away: {
      name: 'São Paulo',
      score: 1,
      scorers: [
        { name: 'Ricardo Oliveira', minute: 52, assist: 'Marcos Santos' },
      ]
    },
    events: [
      { type: 'goal', team: 'home', player: 'Carlos Eduardo', minute: 23, assist: 'Gabriel Martins' },
      { type: 'yellowCard', team: 'away', player: 'Luiz Silva', minute: 35 },
      { type: 'goal', team: 'away', player: 'Ricardo Oliveira', minute: 52, assist: 'Marcos Santos' },
      { type: 'goal', team: 'home', player: 'Gabriel Martins', minute: 67 },
      { type: 'yellowCard', team: 'home', player: 'Rafael Santos', minute: 78 },
      { type: 'redCard', team: 'away', player: 'Pedro Almeida', minute: 83 },
    ],
    clientPerformances: [
      { id: 6, name: 'Gabriel Martins', rating: 8.7, goals: 1, assists: 1, team: 'Flamengo' }
    ]
  };
  
  // Example latest league tables
  const leagueTables = {
    'Brasil 1ª Divisão': [
      { position: 1, club: 'Flamengo', matches: 12, wins: 8, draws: 2, losses: 2, gf: 28, ga: 10, points: 26 },
      { position: 2, club: 'São Paulo', matches: 12, wins: 7, draws: 3, losses: 2, gf: 22, ga: 12, points: 24 },
      { position: 3, club: 'Palmeiras', matches: 12, wins: 7, draws: 2, losses: 3, gf: 24, ga: 14, points: 23 },
      { position: 4, club: 'Santos', matches: 12, wins: 6, draws: 3, losses: 3, gf: 20, ga: 15, points: 21 },
      { position: 5, club: 'Corinthians', matches: 12, wins: 5, draws: 4, losses: 3, gf: 18, ga: 16, points: 19 },
    ]
  };
  
  // Function to start/stop simulation
  const toggleSimulation = () => {
    if (!simulating) {
      setSimulating(true);
      // In a real app, this would trigger the simulation process
      setTimeout(() => {
        setSimulating(false);
        setShowMatchResult(true);
      }, 2000);
    } else {
      setSimulating(false);
    }
  };
  
  // Handle simulation speed change
  const handleSpeedChange = (speed) => {
    setSimSpeed(speed);
  };
  
  // Close match result and continue
  const handleContinue = () => {
    setShowMatchResult(false);
  };
  
  // Get icon color for event type
  const getEventIconColor = (type) => {
    switch (type) {
      case 'clientMatch':
        return 'text-blue-500';
      case 'transferWindow':
        return 'text-green-500';
      case 'contractExpiry':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };
  
  // Get icon for event type
  const getEventIcon = (type) => {
    switch (type) {
      case 'clientMatch':
        return <User className={`w-5 h-5 ${getEventIconColor(type)}`} />;
      case 'transferWindow':
        return <Calendar className={`w-5 h-5 ${getEventIconColor(type)}`} />;
      case 'contractExpiry':
        return <Clock className={`w-5 h-5 ${getEventIconColor(type)}`} />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      {/* Page header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Simulation</h1>
        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <div>
            <span className="font-medium">Season {gameState.currentSeason}</span>
            <span className="mx-2">•</span>
            <span className="font-medium">Week {gameState.currentWeek}/38</span>
          </div>
        </div>
      </div>
      
      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Simulation controls */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h3 className="font-medium">Simulation Controls</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="mb-4 md:mb-0">
                  <div className="text-sm text-gray-500 mb-1">Current Week</div>
                  <div className="font-bold text-xl">Week {gameState.currentWeek}</div>
                </div>
                
                <div className="mb-4 md:mb-0">
                  <div className="text-sm text-gray-500 mb-1">Transfer Window</div>
                  <div className={`font-medium ${gameState.transferWindow ? 'text-green-600' : 'text-red-600'}`}>
                    {gameState.transferWindow ? 'Open' : 'Closed'}
                    {gameState.isTransferWindowSoon && !gameState.transferWindow && 
                      <span className="ml-2 text-yellow-600">(Opens soon)</span>
                    }
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Simulation Speed</div>
                  <div className="flex space-x-1">
                    <button 
                      className={`px-3 py-1 text-sm rounded ${simSpeed === 'slow' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      onClick={() => handleSpeedChange('slow')}
                    >
                      Slow
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm rounded ${simSpeed === 'normal' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      onClick={() => handleSpeedChange('normal')}
                    >
                      Normal
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm rounded ${simSpeed === 'fast' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      onClick={() => handleSpeedChange('fast')}
                    >
                      Fast
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <button 
                  className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 flex items-center justify-center"
                  onClick={toggleSimulation}
                  disabled={showMatchResult}
                >
                  {simulating ? (
                    <>
                      <PauseCircle className="w-5 h-5 mr-2" />
                      <span>Pause Simulation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      <span>Simulate Next Week</span>
                    </>
                  )}
                </button>
                <button 
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded hover:bg-gray-300 flex items-center justify-center"
                  disabled={simulating || showMatchResult}
                >
                  <FastForward className="w-5 h-5 mr-2" />
                  <span>Until Transfer Window</span>
                </button>
                <button 
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded hover:bg-gray-300 flex items-center justify-center"
                  disabled={simulating || showMatchResult}
                >
                  <ChevronsRight className="w-5 h-5 mr-2" />
                  <span>End of Season</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Fixtures */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h3 className="font-medium">This Week's Fixtures</h3>
            </div>
            <div className="divide-y">
              {fixtures.map(fixture => (
                <div key={fixture.id} className="p-4 flex flex-col md:flex-row justify-between">
                  <div className="mb-2 md:mb-0 text-sm text-gray-500">{fixture.league}</div>
                  <div className="flex items-center justify-center space-x-4">
                    <span className="font-medium text-right w-32 md:w-40 truncate">{fixture.home}</span>
                    {fixture.played ? (
                      <span className="font-bold">{fixture.score}</span>
                    ) : (
                      <span className="text-gray-500">vs</span>
                    )}
                    <span className="font-medium text-left w-32 md:w-40 truncate">{fixture.away}</span>
                  </div>
                  <div className="hidden md:block w-24">
                    {fixture.played ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Completed
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* League Tables */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">League Table</h3>
              <select className="bg-gray-50 border border-gray-300 rounded px-3 py-1 text-sm">
                <option>Brasil 1ª Divisão</option>
                <option>España 1ª Divisão</option>
                <option>Inglaterra 1ª Divisão</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MP</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GF</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GA</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leagueTables['Brasil 1ª Divisão'].map(team => (
                    <tr key={team.club} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap">
                        {team.position <= 4 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full">
                            {team.position}
                          </span>
                        ) : team.position >= 17 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-800 rounded-full">
                            {team.position}
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-800 rounded-full">
                            {team.position}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-medium">{team.club}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{team.matches}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{team.wins}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{team.draws}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{team.losses}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{team.gf}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{team.ga}</td>
                      <td className="py-3 px-4 whitespace-nowrap font-bold">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h3 className="font-medium">Upcoming Events</h3>
            </div>
            <div className="divide-y">
              {gameState.upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 flex items-start">
                  <div className="bg-gray-100 rounded-full p-2 mr-3">
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <div className="font-medium">{event.description}</div>
                    <div className="text-sm text-gray-500">Week {event.week}</div>
                  </div>
                </div>
              ))}
              {gameState.upcomingEvents.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No upcoming events
                </div>
              )}
            </div>
          </div>
          
          {/* Top Scorers */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h3 className="font-medium">Top Scorers</h3>
            </div>
            <div className="divide-y">
              {[
                { position: 1, name: 'Carlos Eduardo', club: 'Flamengo', goals: 14 },
                { position: 2, name: 'Roberto Silva', club: 'Flamengo', goals: 10 },
                { position: 3, name: 'Luis Hernandez', club: 'Barcelona', goals: 9 },
                { position: 4, name: 'John Smith', club: 'Manchester United', goals: 8 },
                { position: 5, name: 'Ricardo Oliveira', club: 'São Paulo', goals: 7 }
              ].map(scorer => (
                <div key={scorer.position} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                      scorer.position === 1 ? 'bg-yellow-500 text-white' : 
                      scorer.position === 2 ? 'bg-gray-300 text-gray-800' : 
                      scorer.position === 3 ? 'bg-yellow-700 text-white' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {scorer.position}
                    </span>
                    <div>
                      <div className="font-medium">{scorer.name}</div>
                      <div className="text-sm text-gray-500">{scorer.club}</div>
                    </div>
                  </div>
                  <div className="font-bold">{scorer.goals}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Client Performances */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="font-medium">Your Clients</h3>
            </div>
            <div className="divide-y">
              {[
                { id: 6, name: 'Gabriel Martins', position: 'Meio-Campo', club: 'Flamengo', overall: 85, form: 'Good', lastRating: 8.7 },
                { id: 12, name: 'Roberto Silva', position: 'Atacante', club: 'Flamengo', overall: 82, form: 'Excellent', lastRating: 9.2 }
              ].map(client => (
                <div key={client.id} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{client.name}</div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {client.position}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-gray-500">{client.club}</div>
                    <div className={`text-sm ${
                      client.form === 'Excellent' ? 'text-green-600' : 
                      client.form === 'Good' ? 'text-blue-600' : 
                      client.form === 'Average' ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {client.form}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(client.lastRating / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-medium">{client.lastRating.toFixed(1)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Match Result Modal */}
      {showMatchResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Match Result</h2>
              <div className="text-sm text-gray-500">{currentMatch.league}</div>
            </div>
            
            <div className="p-6">
              {/* Score */}
              <div className="flex justify-center items-center mb-6">
                <div className="text-center w-1/3">
                  <div className="text-xl font-bold mb-2">{currentMatch.home.name}</div>
                  <div className="text-sm text-gray-500">Home</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {currentMatch.home.score} - {currentMatch.away.score}
                  </div>
                  <div className="text-sm text-gray-500">Final Score</div>
                </div>
                <div className="text-center w-1/3">
                  <div className="text-xl font-bold mb-2">{currentMatch.away.name}</div>
                  <div className="text-sm text-gray-500">Away</div>
                </div>
              </div>
              
              {/* Match Events */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Match Events</h3>
                <div className="space-y-2">
                  {currentMatch.events.map((event, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-12 text-right font-medium">{event.minute}'</div>
                      <div className="mx-3">
                        {event.type === 'goal' && <div className="w-5 h-5 bg-green-500 rounded-full"></div>}
                        {event.type === 'yellowCard' && <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>}
                        {event.type === 'redCard' && <div className="w-5 h-5 bg-red-500 rounded-full"></div>}
                      </div>
                      <div>
                        <span className="font-medium mr-1">{event.player}</span>
                        {event.type === 'goal' && (
                          <>
                            (Goal)
                            {event.assist && (
                              <span className="ml-1 text-gray-500">
                                Assist: {event.assist}
                              </span>
                            )}
                          </>
                        )}
                        {event.type === 'yellowCard' && <span>(Yellow Card)</span>}
                        {event.type === 'redCard' && <span>(Red Card)</span>}
                      </div>
                      <div className="ml-auto text-gray-500">
                        {event.team === 'home' ? currentMatch.home.name : currentMatch.away.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Client Performances */}
              {currentMatch.clientPerformances.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium mb-3">Your Clients' Performances</h3>
                  <div className="space-y-3">
                    {currentMatch.clientPerformances.map(client => (
                      <div key={client.id} className="bg-white rounded p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.team}</div>
                        </div>
                        <div>
                          <div className="font-medium">Rating: {client.rating.toFixed(1)}</div>
                          <div className="text-sm text-gray-500">
                            {client.goals > 0 && `${client.goals} ${client.goals === 1 ? 'goal' : 'goals'}`}
                            {client.goals > 0 && client.assists > 0 && ', '}
                            {client.assists > 0 && `${client.assists} ${client.assists === 1 ? 'assist' : 'assists'}`}
                            {client.goals === 0 && client.assists === 0 && 'No goal contributions'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationScreen;