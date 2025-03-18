import React, { useState } from 'react';
import { Trophy, Medal, Star, BarChart2, Goal, UserPlus, Clock, Award, Scissors, Shield, Zap, TrendingUp, Users } from 'lucide-react';

const AwardsStatistics = () => {
  const [activeTab, setActiveTab] = useState('awards');
  const [selectedSeason, setSelectedSeason] = useState('Current Season');
  const [selectedLeague, setSelectedLeague] = useState('All Leagues');
  
  // Example seasons for the dropdown
  const seasons = ['Current Season', 'Season 1', 'Season 2', 'Season 3'];
  
  // Example leagues for the dropdown
  const leagues = ['All Leagues', 'Brasil 1ª Divisão', 'Espanha 1ª Divisão', 'Inglaterra 1ª Divisão'];
  
  // Example award winners data
  const awardWinners = {
    goldenBall: {
      name: 'Luis Hernandez',
      club: 'Sevilla',
      nationality: 'Espanha',
      position: 'Atacante',
      rating: 88,
      stats: '32 goals, 12 assists',
      image: 'player1.jpg',
      agentName: 'CPU'
    },
    goldenBoot: {
      name: 'Carlos Eduardo',
      club: 'Flamengo',
      nationality: 'Brasil',
      position: 'Atacante',
      rating: 85,
      stats: '38 goals',
      image: 'player2.jpg',
      agentName: 'CPU'
    },
    goldenGlove: {
      name: 'David Thompson',
      club: 'Manchester United',
      nationality: 'Inglaterra',
      position: 'Goleiro',
      rating: 87,
      stats: '22 clean sheets',
      image: 'player3.jpg',
      agentName: 'CPU'
    },
    bestYoungPlayer: {
      name: 'Rafael Gomes',
      club: 'São Paulo',
      nationality: 'Brasil',
      position: 'Atacante',
      rating: 79,
      stats: '18 goals, 7 assists',
      image: 'player4.jpg',
      agentName: 'CPU'
    },
    mostAssists: {
      name: 'Miguel Martinez',
      club: 'Barcelona',
      nationality: 'Espanha',
      position: 'Meio-Campo',
      rating: 86,
      stats: '24 assists',
      image: 'player5.jpg',
      agentName: 'John Mendes'
    },
    bestDefender: {
      name: 'William Parker',
      club: 'Chelsea',
      nationality: 'Inglaterra',
      position: 'Defensor',
      rating: 84,
      stats: '18 clean sheets, 4 goals',
      image: 'player6.jpg',
      agentName: 'CPU'
    }
  };
  
  // Example top scorers data
  const topScorers = [
    { rank: 1, name: 'Carlos Eduardo', club: 'Flamengo', goals: 38, matches: 36 },
    { rank: 2, name: 'Luis Hernandez', club: 'Sevilla', goals: 32, matches: 38 },
    { rank: 3, name: 'John Smith', club: 'Liverpool', goals: 29, matches: 37 },
    { rank: 4, name: 'Rafael Gomes', club: 'São Paulo', goals: 26, matches: 38 },
    { rank: 5, name: 'Diego Lopez', club: 'Atletico Madrid', goals: 24, matches: 35 },
    { rank: 6, name: 'Thomas Wilson', club: 'Arsenal', goals: 22, matches: 37 },
    { rank: 7, name: 'Gabriel Silva', club: 'Palmeiras', goals: 21, matches: 38 },
    { rank: 8, name: 'Lucas Ferreira', club: 'Santos', goals: 19, matches: 34 },
    { rank: 9, name: 'Roberto Carlos', club: 'Real Madrid', goals: 18, matches: 38 },
    { rank: 10, name: 'David Williams', club: 'Manchester City', goals: 17, matches: 36 }
  ];
  
  // Example league table data
  const leagueTables = {
    'Brasil 1ª Divisão': [
      { position: 1, club: 'Flamengo', matches: 38, wins: 26, draws: 8, losses: 4, gf: 85, ga: 24, points: 86 },
      { position: 2, club: 'São Paulo', matches: 38, wins: 23, draws: 10, losses: 5, gf: 72, ga: 32, points: 79 },
      { position: 3, club: 'Palmeiras', matches: 38, wins: 22, draws: 9, losses: 7, gf: 68, ga: 35, points: 75 },
      { position: 4, club: 'Santos', matches: 38, wins: 20, draws: 10, losses: 8, gf: 66, ga: 40, points: 70 },
      { position: 5, club: 'Corinthians', matches: 38, wins: 19, draws: 10, losses: 9, gf: 58, ga: 42, points: 67 }
    ],
    'Espanha 1ª Divisão': [
      { position: 1, club: 'Barcelona', matches: 38, wins: 29, draws: 6, losses: 3, gf: 94, ga: 22, points: 93 },
      { position: 2, club: 'Real Madrid', matches: 38, wins: 27, draws: 7, losses: 4, gf: 89, ga: 28, points: 88 },
      { position: 3, club: 'Atletico Madrid', matches: 38, wins: 23, draws: 9, losses: 6, gf: 72, ga: 32, points: 78 },
      { position: 4, club: 'Sevilla', matches: 38, wins: 22, draws: 7, losses: 9, gf: 68, ga: 38, points: 73 },
      { position: 5, club: 'Valencia', matches: 38, wins: 18, draws: 11, losses: 9, gf: 62, ga: 43, points: 65 }
    ],
    'Inglaterra 1ª Divisão': [
      { position: 1, club: 'Manchester City', matches: 38, wins: 28, draws: 5, losses: 5, gf: 92, ga: 26, points: 89 },
      { position: 2, club: 'Liverpool', matches: 38, wins: 26, draws: 8, losses: 4, gf: 84, ga: 29, points: 86 },
      { position: 3, club: 'Chelsea', matches: 38, wins: 24, draws: 7, losses: 7, gf: 76, ga: 32, points: 79 },
      { position: 4, club: 'Manchester United', matches: 38, wins: 21, draws: 9, losses: 8, gf: 71, ga: 36, points: 72 },
      { position: 5, club: 'Arsenal', matches: 38, wins: 20, draws: 8, losses: 10, gf: 68, ga: 42, points: 68 }
    ]
  };
  
  // Example transfer records
  const transferRecords = [
    { player: 'Neymar Jr.', fromClub: 'Santos', toClub: 'Barcelona', fee: '€88M', season: 'Season 1' },
    { player: 'Antoine Griezmann', fromClub: 'Atletico Madrid', toClub: 'Barcelona', fee: '€120M', season: 'Season 2' },
    { player: 'Eden Hazard', fromClub: 'Chelsea', toClub: 'Real Madrid', fee: '€100M', season: 'Season 2' },
    { player: 'João Félix', fromClub: 'Benfica', toClub: 'Atletico Madrid', fee: '€126M', season: 'Season 3' },
    { player: 'Harry Kane', fromClub: 'Tottenham', toClub: 'Manchester City', fee: '€110M', season: 'Current Season' }
  ];
  
  const displayLeagueTable = () => {
    let tableData = [];
    
    if (selectedLeague === 'All Leagues') {
      // When "All Leagues" is selected, show the top teams from each league
      Object.keys(leagueTables).forEach(league => {
        // Just take the top 3 from each league
        const topTeams = leagueTables[league].slice(0, 3);
        topTeams.forEach(team => {
          tableData.push({
            ...team,
            league
          });
        });
      });
    } else {
      // Show the full table for the selected league
      tableData = leagueTables[selectedLeague] || [];
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
              {selectedLeague !== 'All Leagues' && (
                <>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MP</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GF</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GA</th>
                </>
              )}
              {selectedLeague === 'All Leagues' && (
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">League</th>
              )}
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tableData.map((team, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap">
                  {team.position}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="font-medium">{team.club}</div>
                </td>
                {selectedLeague !== 'All Leagues' && (
                  <>
                    <td className="py-3 px-4 whitespace-nowrap">{team.matches}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{team.wins}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{team.draws}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{team.losses}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{team.gf}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{team.ga}</td>
                  </>
                )}
                {selectedLeague === 'All Leagues' && (
                  <td className="py-3 px-4 whitespace-nowrap">{team.league}</td>
                )}
                <td className="py-3 px-4 whitespace-nowrap font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  const renderAwardCard = (award, title, icon) => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-300 flex items-center">
          {icon}
          <h3 className="font-bold text-white ml-2">{title}</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center">
            <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold">
              {award.name.charAt(0)}
            </div>
            <div className="ml-4">
              <div className="text-xl font-bold">{award.name}</div>
              <div className="text-gray-600">{award.club} • {award.nationality}</div>
              <div className="mt-1">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">
                  {award.position}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {award.rating} OVR
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600">{award.stats}</div>
            <div className="mt-2 flex justify-between items-center text-sm">
              <span>Agent: {award.agentName}</span>
              {award.agentName === 'John Mendes' && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Your Client
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Awards & Statistics</h1>
        
        <div className="flex space-x-3">
          <select 
            className="bg-white border border-gray-300 rounded px-3 py-1"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            {seasons.map(season => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
          
          {activeTab === 'tables' && (
            <select 
              className="bg-white border border-gray-300 rounded px-3 py-1"
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
            >
              {leagues.map(league => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b">
          <button 
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'awards' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('awards')}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Awards
          </button>
          <button 
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'tables' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('tables')}
          >
            <BarChart2 className="w-4 h-4 mr-2" />
            League Tables
          </button>
          <button 
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'topScorers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('topScorers')}
          >
            <Goal className="w-4 h-4 mr-2" />
            Top Scorers
          </button>
          <button 
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'transfers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('transfers')}
          >
            <Users className="w-4 h-4 mr-2" />
            Transfers
          </button>
        </div>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'awards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderAwardCard(awardWinners.goldenBall, "Golden Ball", <Trophy className="w-5 h-5 text-white" />)}
          {renderAwardCard(awardWinners.goldenBoot, "Golden Boot", <Goal className="w-5 h-5 text-white" />)}
          {renderAwardCard(awardWinners.goldenGlove, "Golden Glove", <Shield className="w-5 h-5 text-white" />)}
          {renderAwardCard(awardWinners.bestYoungPlayer, "Best Young Player", <Star className="w-5 h-5 text-white" />)}
          {renderAwardCard(awardWinners.mostAssists, "Most Assists", <UserPlus className="w-5 h-5 text-white" />)}
          {renderAwardCard(awardWinners.bestDefender, "Best Defender", <Shield className="w-5 h-5 text-white" />)}
        </div>
      )}
      
      {activeTab === 'tables' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {displayLeagueTable()}
        </div>
      )}
      
      {activeTab === 'topScorers' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goals</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matches</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topScorers.map((player, index) => (
                <tr key={index} className={`hover:bg-gray-50 ${index < 3 ? 'bg-yellow-50' : ''}`}>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full ${
                      index === 0 ? 'bg-yellow-500 text-white' : 
                      index === 1 ? 'bg-gray-300 text-gray-800' : 
                      index === 2 ? 'bg-yellow-700 text-white' : 
                      'bg-gray-100'
                    }`}>
                      {player.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-medium">{player.name}</div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{player.club}</td>
                  <td className="py-3 px-4 whitespace-nowrap font-bold">{player.goals}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{player.matches}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{(player.goals / player.matches).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'transfers' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transferRecords.map((transfer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap font-medium">{transfer.player}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{transfer.fromClub}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{transfer.toClub}</td>
                  <td className="py-3 px-4 whitespace-nowrap font-bold text-green-700">{transfer.fee}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{transfer.season}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AwardsStatistics;