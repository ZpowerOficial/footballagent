import React, { useState, useEffect } from 'react';
import { DollarSign, User, Shield, TrendingUp, Calendar, Check, X, Clock, Info, AlertCircle, Award } from 'lucide-react';

const NegotiationSystem = () => {
  const [negotiationStage, setNegotiationStage] = useState('club-selection'); // stages: club-selection, fee-negotiation, contract-negotiation, complete
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [feeOffer, setFeeOffer] = useState(0);
  const [salaryOffer, setSalaryOffer] = useState(0);
  const [contractLength, setContractLength] = useState(3);
  const [releaseClause, setReleaseClause] = useState(0);
  const [agentFee, setAgentFee] = useState(0);
  const [negotiationResult, setNegotiationResult] = useState(null);
  const [negotiationMessage, setNegotiationMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Example player data (in a real application, this would come from props or context)
  const player = {
    id: 6,
    name: 'Gabriel Martins',
    position: 'Meio-Campo',
    age: 26,
    nationality: 'Brasil',
    club: 'Flamengo',
    overall: 85,
    potential: 88,
    value: 42000000, // €42M
    salary: 120000, // Weekly
    contract: {
      remainingYears: 3,
      releaseClause: 65000000 // €65M
    },
    agent: 'John Mendes', // Current player's agent (you)
    attributes: {
      passing: 87,
      technique: 86,
      dribbling: 84,
      pace: 82,
      shooting: 80,
      physical: 78,
      defending: 75
    },
    dreamClub: 'Barcelona',
    rivalClubs: ['Real Madrid', 'Atletico Madrid'],
    stats: {
      appearances: 28,
      goals: 12,
      assists: 15,
      rating: 8.2
    },
    form: 'Excellent',
    morale: 85,
    marketTrend: 'rising' // rising, stable, declining
  };
  
  // Example interested clubs
  const interestedClubs = [
    { 
      id: 1, 
      name: 'Barcelona', 
      league: 'España 1ª Divisão', 
      logo: 'barcelona.png',
      budget: 120000000,
      prestige: 9,
      style: 'Posse de Bola',
      interestLevel: 85, // 0-100
      initialOffer: 45000000,
      maxOffer: 53000000,
      salaryBudget: 180000 // Max weekly salary they'd offer
    },
    { 
      id: 2, 
      name: 'Manchester City', 
      league: 'Inglaterra 1ª Divisão', 
      logo: 'mancity.png',
      budget: 200000000,
      prestige: 8,
      style: 'Posse de Bola',
      interestLevel: 75,
      initialOffer: 48000000,
      maxOffer: 55000000,
      salaryBudget: 200000
    },
    { 
      id: 3, 
      name: 'Paris Saint-Germain', 
      league: 'França 1ª Divisão', 
      logo: 'psg.png',
      budget: 180000000,
      prestige: 7,
      style: 'Contra-Ataque',
      interestLevel: 70,
      initialOffer: 42000000,
      maxOffer: 50000000,
      salaryBudget: 220000
    }
  ];
  
  // Agent data (in a real app, this would come from context/state)
  const agent = {
    name: 'John Mendes',
    reputation: 65, // 0-100
    negotiationSkill: 72, // 0-100
    commission: 0.08, // 8%
    balance: 2500000
  };
  
  // Function to format currency
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `€${(amount / 1000).toFixed(1)}K`;
    } else {
      return `€${amount.toFixed(0)}`;
    }
  };
  
  // Initialize negotiations
  useEffect(() => {
    setSelectedPlayer(player);
    setFeeOffer(player.value);
    setSalaryOffer(player.salary * 1.2); // Initial salary offer 20% higher
    setReleaseClause(player.value * 1.5);
    setAgentFee(player.value * agent.commission);
  }, []);
  
  // Update agent fee when fee offer changes
  useEffect(() => {
    setAgentFee(feeOffer * agent.commission);
  }, [feeOffer]);
  
  // Handle club selection
  const handleSelectClub = (club) => {
    setSelectedClub(club);
    setFeeOffer(club.initialOffer);
    setSalaryOffer(player.salary * 1.25); // 25% salary increase
    setNegotiationStage('fee-negotiation');
  };
  
  // Submit fee offer
  const submitFeeOffer = () => {
    setLoading(true);
    
    // Simulate API call / processing
    setTimeout(() => {
      const club = selectedClub;
      const maxOffer = club.maxOffer;
      
      // Check if offer is acceptable
      if (feeOffer >= maxOffer * 0.9) {
        // Club accepts
        setNegotiationMessage({
          type: 'success',
          title: 'Offer Accepted!',
          message: `${club.name} has accepted your transfer fee of ${formatCurrency(feeOffer)}.`
        });
        setNegotiationStage('contract-negotiation');
      } else if (feeOffer >= maxOffer * 0.8) {
        // Club counters
        const counterOffer = Math.min(maxOffer, Math.round(feeOffer * 1.1));
        setNegotiationMessage({
          type: 'info',
          title: 'Counter Offer',
          message: `${club.name} counters with ${formatCurrency(counterOffer)}.`,
          counterOffer
        });
      } else {
        // Club rejects
        setNegotiationMessage({
          type: 'error',
          title: 'Offer Rejected',
          message: `${club.name} has rejected your offer of ${formatCurrency(feeOffer)}. They expect a significantly higher fee.`
        });
      }
      
      setLoading(false);
    }, 1500);
  };
  
  // Accept counter offer
  const acceptCounterOffer = () => {
    setFeeOffer(negotiationMessage.counterOffer);
    setNegotiationMessage(null);
    setNegotiationStage('contract-negotiation');
  };
  
  // Submit contract terms
  const submitContract = () => {
    setLoading(true);
    
    // Simulate API call / processing
    setTimeout(() => {
      const club = selectedClub;
      const maxSalary = club.salaryBudget;
      
      // Check if salary is acceptable for both club and player
      if (salaryOffer <= maxSalary && salaryOffer >= player.salary * 1.1) {
        // Both accept
        setNegotiationResult({
          success: true,
          fee: feeOffer,
          agentFee: agentFee,
          salary: salaryOffer,
          contractLength,
          releaseClause,
          player: player.name,
          fromClub: player.club,
          toClub: club.name
        });
        setNegotiationStage('complete');
      } else if (salaryOffer > maxSalary) {
        // Club cannot afford
        setNegotiationMessage({
          type: 'error',
          title: 'Salary Too High',
          message: `${club.name} cannot afford a salary of ${formatCurrency(salaryOffer)} per week. They can offer up to ${formatCurrency(maxSalary)}.`,
          counterSalary: maxSalary
        });
      } else if (salaryOffer < player.salary * 1.1) {
        // Player not satisfied
        const minSalary = Math.round(player.salary * 1.15);
        setNegotiationMessage({
          type: 'error',
          title: 'Player Unsatisfied',
          message: `${player.name} expects at least a 15% salary increase. Minimum acceptable salary: ${formatCurrency(minSalary)} per week.`,
          counterSalary: minSalary
        });
      }
      
      setLoading(false);
    }, 1500);
  };
  
  // Accept salary counter
  const acceptSalaryCounter = () => {
    setSalaryOffer(negotiationMessage.counterSalary);
    setNegotiationMessage(null);
  };
  
  // Get prestige stars for display
  const getPrestigeStars = (prestige) => {
    const stars = [];
    const fullStars = Math.floor(prestige);
    const halfStar = prestige % 1 >= 0.5;
    
    for (let i = 0; i < 10; i++) {
      if (i < fullStars) {
        stars.push(<Award key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
      } else if (i === fullStars && halfStar) {
        stars.push(<Award key={i} className="w-4 h-4 text-yellow-500" />);
      } else {
        stars.push(<Award key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return stars;
  };
  
  // Calculate negotiation chance of success
  const calculateSuccessChance = () => {
    if (!selectedClub) return 0;
    
    // Factors affecting success
    const fee = feeOffer / selectedClub.maxOffer; // How close to max offer
    const interest = selectedClub.interestLevel / 100; // Club interest level
    const skill = agent.negotiationSkill / 100; // Agent skill
    
    let chance = fee * 0.4 + interest * 0.4 + skill * 0.2;
    
    // Dream club bonus
    if (selectedClub.name === player.dreamClub) {
      chance += 0.1;
    }
    
    // Rival club penalty
    if (player.rivalClubs.includes(selectedClub.name)) {
      chance -= 0.2;
    }
    
    return Math.min(0.99, Math.max(0.01, chance)).toFixed(2) * 100;
  };
  
  // Calculate completion percentage for progress bar
  const getCompletionPercentage = () => {
    switch (negotiationStage) {
      case 'club-selection':
        return 25;
      case 'fee-negotiation':
        return 50;
      case 'contract-negotiation':
        return 75;
      case 'complete':
        return 100;
      default:
        return 0;
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      {/* Header with progress bar */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Transfer Negotiation</h1>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Club Selection</span>
          <span>Fee Negotiation</span>
          <span>Contract Terms</span>
          <span>Complete</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player info panel */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-500">
            <h2 className="font-bold text-white">Player Details</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                {player.name.charAt(0)}
              </div>
              <div>
                <div className="text-xl font-bold">{player.name}</div>
                <div className="text-gray-600 flex items-center text-sm">
                  <span className="mr-2">{player.nationality}</span>
                  <span className="mr-2">•</span>
                  <span>{player.age} years</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {player.position}
                  </span>
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                    {player.overall} OVR
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Current Club</div>
                <div className="font-medium">{player.club}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Market Value</div>
                <div className="font-medium">{formatCurrency(player.value)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Current Salary</div>
                <div className="font-medium">{formatCurrency(player.salary)}/week</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Contract Until</div>
                <div className="font-medium">{player.contract.remainingYears} years</div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">Key Attributes</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(player.attributes)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 6)
                  .map(([attr, value]) => (
                    <div key={attr} className="flex justify-between items-center">
                      <span className="capitalize text-sm">{attr}</span>
                      <span className={`font-medium ${
                        value >= 85 ? 'text-green-600' : 
                        value >= 75 ? 'text-green-500' : 
                        value >= 65 ? 'text-yellow-500' : 
                        'text-red-500'
                      }`}>{value}</span>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-2">Season Statistics</div>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-lg font-bold">{player.stats.appearances}</div>
                  <div className="text-xs text-gray-500">Matches</div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-lg font-bold">{player.stats.goals}</div>
                  <div className="text-xs text-gray-500">Goals</div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-lg font-bold">{player.stats.assists}</div>
                  <div className="text-xs text-gray-500">Assists</div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-lg font-bold">{player.stats.rating}</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Negotiation panel */}
        <div className="lg:col-span-2">
          {negotiationStage === 'club-selection' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-medium">Select Interested Club</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Several clubs have expressed interest in {player.name}. Select a club to start negotiations.
                </p>
                
                <div className="space-y-4">
                  {interestedClubs.map(club => (
                    <div 
                      key={club.id}
                      className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                      onClick={() => handleSelectClub(club)}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="font-bold text-lg">{club.name}</div>
                        <div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {club.league}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-500">Transfer Budget</div>
                          <div className="font-medium">{formatCurrency(club.budget)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Playing Style</div>
                          <div className="font-medium">{club.style}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Initial Offer</div>
                          <div className="font-medium text-green-600">{formatCurrency(club.initialOffer)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Interest Level</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${club.interestLevel}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="text-sm text-gray-500 mr-2">Prestige:</div>
                        <div className="flex">
                          {getPrestigeStars(club.prestige)}
                        </div>
                      </div>
                      
                      {club.name === player.dreamClub && (
                        <div className="mt-2 text-sm text-green-600 flex items-center">
                          <Info className="w-4 h-4 mr-1" />
                          Dream club for {player.name}
                        </div>
                      )}
                      
                      {player.rivalClubs.includes(club.name) && (
                        <div className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Rival club - player may be reluctant
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {negotiationStage === 'fee-negotiation' && selectedClub && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-medium">Negotiate Transfer Fee with {selectedClub.name}</h2>
              </div>
              <div className="p-6">
                {negotiationMessage && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    negotiationMessage.type === 'success' ? 'bg-green-100 border border-green-200' :
                    negotiationMessage.type === 'error' ? 'bg-red-100 border border-red-200' :
                    'bg-blue-100 border border-blue-200'
                  }`}>
                    <div className="font-medium mb-1">{negotiationMessage.title}</div>
                    <div className="text-sm">{negotiationMessage.message}</div>
                    
                    {negotiationMessage.counterOffer && (
                      <div className="mt-3 flex space-x-2">
                        <button 
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          onClick={acceptCounterOffer}
                        >
                          Accept Counter
                        </button>
                        <button 
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
                          onClick={() => setNegotiationMessage(null)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Club Valuation</div>
                    <div className="bg-gray-50 p-4 rounded">
                      <div className="font-medium mb-1">Player Market Value</div>
                      <div className="text-2xl font-bold">{formatCurrency(player.value)}</div>
                      
                      <div className="flex items-center mt-2 text-sm">
                        <span className="text-gray-500 mr-2">Market Trend:</span>
                        {player.marketTrend === 'rising' ? (
                          <span className="text-green-600 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" /> Rising
                          </span>
                        ) : player.marketTrend === 'stable' ? (
                          <span className="text-blue-600">Stable</span>
                        ) : (
                          <span className="text-red-600">Declining</span>
                        )}
                      </div>
                      
                      <div className="mt-3 border-t pt-3">
                        <div className="font-medium mb-1">Current Release Clause</div>
                        <div className="text-lg">{formatCurrency(player.contract.releaseClause)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Club Budget & Interest</div>
                    <div className="bg-gray-50 p-4 rounded">
                      <div className="font-medium mb-1">{selectedClub.name}'s Transfer Budget</div>
                      <div className="text-2xl font-bold">{formatCurrency(selectedClub.budget)}</div>
                      
                      <div className="mt-3">
                        <div className="font-medium mb-1 flex justify-between">
                          <span>Interest Level</span>
                          <span>{selectedClub.interestLevel}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${selectedClub.interestLevel}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="font-medium mb-1 flex justify-between">
                          <span>Success Chance</span>
                          <span>{calculateSuccessChance()}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${calculateSuccessChance()}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Transfer Fee Offer
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      min={player.value * 0.7}
                      max={player.value * 2}
                      value={feeOffer}
                      onChange={(e) => setFeeOffer(parseInt(e.target.value, 10))}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-20 py-3 sm:text-lg border-gray-300 rounded-md"
                      placeholder="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      EUR
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Minimum: {formatCurrency(player.value * 0.7)}</span>
                    <span>Starting Offer: {formatCurrency(selectedClub.initialOffer)}</span>
                  </div>
                </div>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-blue-800 mb-1">Agent Commission</div>
                      <div className="text-sm text-gray-700">
                        Your commission will be {(agent.commission * 100).toFixed(1)}% of the transfer fee.
                        Based on your current offer, you'll earn <span className="font-medium text-green-700">{formatCurrency(agentFee)}</span>.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    onClick={() => setNegotiationStage('club-selection')}
                  >
                    Back
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                    onClick={submitFeeOffer}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Negotiating...
                      </>
                    ) : (
                      'Submit Offer'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {negotiationStage === 'contract-negotiation' && selectedClub && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-medium">Negotiate Contract Terms</h2>
              </div>
              <div className="p-6">
                {negotiationMessage && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    negotiationMessage.type === 'success' ? 'bg-green-100 border border-green-200' :
                    negotiationMessage.type === 'error' ? 'bg-red-100 border border-red-200' :
                    'bg-blue-100 border border-blue-200'
                  }`}>
                    <div className="font-medium mb-1">{negotiationMessage.title}</div>
                    <div className="text-sm">{negotiationMessage.message}</div>
                    
                    {negotiationMessage.counterSalary && (
                      <div className="mt-3 flex space-x-2">
                        <button 
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          onClick={acceptSalaryCounter}
                        >
                          Accept Counter
                        </button>
                        <button 
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
                          onClick={() => setNegotiationMessage(null)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="text-gray-600 mb-4">
                    <p>
                      The fee of {formatCurrency(feeOffer)} has been agreed with {selectedClub.name}.
                      Now negotiate contract terms for {player.name}.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weekly Salary
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          min={player.salary}
                          max={player.salary * 3}
                          value={salaryOffer}
                          onChange={(e) => setSalaryOffer(parseInt(e.target.value, 10))}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-16 py-2 border-gray-300 rounded-md"
                          placeholder="0"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                          /week
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>Current: {formatCurrency(player.salary)}/week</span>
                        <span>+{Math.round((salaryOffer / player.salary - 1) * 100)}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contract Length
                      </label>
                      <select
                        value={contractLength}
                        onChange={(e) => setContractLength(parseInt(e.target.value, 10))}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={1}>1 Year</option>
                        <option value={2}>2 Years</option>
                        <option value={3}>3 Years</option>
                        <option value={4}>4 Years</option>
                        <option value={5}>5 Years</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Release Clause
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      min={feeOffer}
                      value={releaseClause}
                      onChange={(e) => setReleaseClause(parseInt(e.target.value, 10))}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 border-gray-300 rounded-md"
                      placeholder="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      EUR
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Suggested: {formatCurrency(feeOffer * 1.5)} (1.5x transfer fee)
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-3">Contract Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Transfer Fee</div>
                      <div className="font-medium">{formatCurrency(feeOffer)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Club</div>
                      <div className="font-medium">{selectedClub.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Salary</div>
                      <div className="font-medium">{formatCurrency(salaryOffer)}/week</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Contract Length</div>
                      <div className="font-medium">{contractLength} {contractLength === 1 ? 'year' : 'years'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Agent Commission</div>
                      <div className="font-medium text-green-600">{formatCurrency(agentFee)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Release Clause</div>
                      <div className="font-medium">{formatCurrency(releaseClause)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    onClick={() => setNegotiationStage('fee-negotiation')}
                  >
                    Back
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                    onClick={submitContract}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Finalizing...
                      </>
                    ) : (
                      'Submit Contract'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {negotiationStage === 'complete' && negotiationResult && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b bg-gradient-to-r from-green-600 to-green-500">
                <h2 className="font-bold text-white">Transfer Complete!</h2>
              </div>
              <div className="p-6">
                <div className="bg-green-50 border border-green-100 p-4 rounded-lg mb-6 flex items-start">
                  <Check className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800">
                      Transfer successfully completed!
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      {player.name} has signed a {contractLength}-year contract with {selectedClub.name}.
                      Both the club and player are happy with the agreement.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Transfer Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Player</span>
                        <span className="font-medium">{player.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">From</span>
                        <span className="font-medium">{player.club}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">To</span>
                        <span className="font-medium">{selectedClub.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transfer Fee</span>
                        <span className="font-medium">{formatCurrency(feeOffer)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Contract Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="font-medium">{formatCurrency(salaryOffer)}/week</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contract Length</span>
                        <span className="font-medium">{contractLength} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Release Clause</span>
                        <span className="font-medium">{formatCurrency(releaseClause)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Agent Fee</span>
                        <span className="font-medium text-green-600">{formatCurrency(agentFee)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-blue-800 mb-2">Your Commission</h3>
                  <div className="text-3xl font-bold text-blue-800 mb-2">{formatCurrency(agentFee)}</div>
                  <p className="text-sm text-gray-700">
                    This commission has been added to your agency account. You'll also gain reputation from successfully completing this high-profile transfer.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NegotiationSystem;