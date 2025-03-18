import React, { useState, useEffect } from 'react';
import { Dumbbell, Target, TrendingUp, AlertCircle, Zap, User, BarChart2, Clock, Check, Award, ArrowUp, Clipboard, Calendar } from 'lucide-react';

const TrainingDevelopment = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedTrainingType, setSelectedTrainingType] = useState('standard');
  const [trainingIntensity, setTrainingIntensity] = useState('normal');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Example player data (in a real app, this would come from props/context)
  const players = [
    {
      id: 1,
      name: 'Gabriel Martins',
      position: 'Meio-Campo',
      club: 'Flamengo',
      age: 26,
      overall: 85,
      potential: 89,
      developmentProgress: 65, // Percentage to next attribute increase
      attributes: {
        passing: 87,
        technique: 86,
        dribbling: 84,
        pace: 82,
        shooting: 80,
        physical: 78,
        defending: 75
      },
      form: 'Excellent',
      morale: 85,
      developmentPlan: 'passing',
      fitness: 92,
      trainingPoints: 3, // Available training points
      weeklyFocus: 'technique'
    },
    {
      id: 2,
      name: 'Roberto Silva',
      position: 'Atacante',
      club: 'Flamengo',
      age: 24,
      overall: 82,
      potential: 87,
      developmentProgress: 30,
      attributes: {
        shooting: 86,
        pace: 85,
        dribbling: 83,
        technique: 81,
        passing: 78,
        physical: 76,
        defending: 65
      },
      form: 'Excellent',
      morale: 80,
      developmentPlan: 'shooting',
      fitness: 95,
      trainingPoints: 2,
      weeklyFocus: 'dribbling'
    }
  ];
  
  // Training options
  const trainingOptions = [
    {
      id: 'standard',
      name: 'Standard Training',
      description: 'Regular training sessions improve selected attributes gradually.',
      cost: 10000,
      effectiveness: 1, // Base effectiveness multiplier
      duration: 'Weekly',
      risk: 'None',
      icon: <Dumbbell className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'specialized',
      name: 'Specialized Coach',
      description: 'Hire a specialist coach to focus on specific skills.',
      cost: 25000,
      effectiveness: 1.5,
      duration: 'Biweekly',
      risk: 'Low',
      icon: <Target className="w-6 h-6 text-green-500" />
    },
    {
      id: 'intensive',
      name: 'Intensive Camp',
      description: 'High-intensity training camp for rapid improvement. Higher injury risk.',
      cost: 60000,
      effectiveness: 2,
      duration: 'Month-long',
      risk: 'Medium',
      icon: <Zap className="w-6 h-6 text-purple-500" />
    },
    {
      id: 'elite',
      name: 'Elite Development',
      description: 'World-class trainers and facilities for maximum improvement.',
      cost: 100000,
      effectiveness: 3,
      duration: 'Season-long',
      risk: 'Low',
      icon: <Award className="w-6 h-6 text-yellow-500" />
    }
  ];
  
  // Training intensity options
  const intensityOptions = [
    {
      id: 'light',
      name: 'Light',
      effectiveness: 0.8,
      fitnessLoss: 5,
      injuryRisk: 0.01,
      costMultiplier: 0.8
    },
    {
      id: 'normal',
      name: 'Normal',
      effectiveness: 1,
      fitnessLoss: 10,
      injuryRisk: 0.03,
      costMultiplier: 1
    },
    {
      id: 'high',
      name: 'High',
      effectiveness: 1.3,
      fitnessLoss: 20,
      injuryRisk: 0.08,
      costMultiplier: 1.2
    }
  ];
  
  // Agent data (in a real app, this would come from context/state)
  const agent = {
    balance: 2500000,
    reputation: 65
  };
  
  useEffect(() => {
    // Pre-select the first player and attribute
    if (players.length > 0 && !selectedPlayer) {
      setSelectedPlayer(players[0]);
      setSelectedAttribute(Object.keys(players[0].attributes)[0]);
    }
  }, []);
  
  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `€${(amount / 1000).toFixed(1)}K`;
    } else {
      return `€${amount.toFixed(0)}`;
    }
  };
  
  // Get attribute label (capitalize)
  const getAttributeLabel = (attr) => {
    return attr.charAt(0).toUpperCase() + attr.slice(1);
  };
  
  // Get attribute rating color
  const getAttributeColor = (value) => {
    if (value >= 85) return 'text-green-600';
    if (value >= 75) return 'text-green-500';
    if (value >= 65) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Get selected training option
  const getSelectedTraining = () => {
    return trainingOptions.find(option => option.id === selectedTrainingType);
  };
  
  // Get selected intensity
  const getSelectedIntensity = () => {
    return intensityOptions.find(option => option.id === trainingIntensity);
  };
  
  // Calculate training cost
  const calculateCost = () => {
    const training = getSelectedTraining();
    const intensity = getSelectedIntensity();
    return Math.round(training.cost * intensity.costMultiplier);
  };
  
  // Calculate attribute gain
  const calculateAttributeGain = () => {
    const training = getSelectedTraining();
    const intensity = getSelectedIntensity();
    const baseGain = training.effectiveness * intensity.effectiveness;
    
    // Adjust based on player age, potential, and current value
    const player = selectedPlayer;
    const currentValue = player.attributes[selectedAttribute];
    
    // Younger players develop faster
    const ageFactor = player.age < 24 ? 1.2 : player.age < 30 ? 1 : 0.7;
    
    // Higher potential means more room to grow
    const potentialRoom = player.potential - player.overall;
    const potentialFactor = potentialRoom > 5 ? 1.1 : potentialRoom > 0 ? 1 : 0.8;
    
    // Diminishing returns for high attribute values
    const valueFactor = currentValue < 75 ? 1.2 : currentValue < 85 ? 1 : currentValue < 90 ? 0.8 : 0.5;
    
    // Random factor for variability
    const randomFactor = 0.9 + (Math.random() * 0.2);
    
    // Calculate final gain (between 1-3 points typically)
    const gain = baseGain * ageFactor * potentialFactor * valueFactor * randomFactor;
    
    return Math.max(1, Math.min(3, Math.round(gain)));
  };
  
  // Handle training confirmation
  const handleConfirmTraining = () => {
    setLoading(true);
    
    // Simulate API call / processing delay
    setTimeout(() => {
      const attributeGain = calculateAttributeGain();
      const cost = calculateCost();
      const intensity = getSelectedIntensity();
      
      // Generate training result
      const trainingResult = {
        attribute: selectedAttribute,
        oldValue: selectedPlayer.attributes[selectedAttribute],
        newValue: selectedPlayer.attributes[selectedAttribute] + attributeGain,
        cost: cost,
        fitnessLoss: intensity.fitnessLoss,
        success: true,
        injury: Math.random() < intensity.injuryRisk
      };
      
      setResult(trainingResult);
      setLoading(false);
      setShowConfirmation(false);
    }, 1500);
  };
  
  // Handle training plan completion
  const handleCompleteTraining = () => {
    // In a real app, this would update the player state, deduct money, etc.
    setResult(null);
  };
  
  // Get message based on player's development potential
  const getDevelopmentMessage = (player) => {
    const ageMessage = player.age < 23 
      ? 'Young and highly trainable. Development will be fast.'
      : player.age < 28
      ? 'Prime age for development. Good balance of experience and potential.'
      : player.age < 32
      ? 'Approaching career peak. Development will be slower.'
      : 'Late career stage. Limited development potential remains.';
      
    const potentialMessage = player.potential - player.overall > 7
      ? 'Has significant untapped potential.'
      : player.potential - player.overall > 3
      ? 'Still has room to develop further.'
      : 'Close to reaching full potential.';
      
    return `${ageMessage} ${potentialMessage}`;
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Player Training & Development</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Players selection & details */}
        <div>
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h2 className="font-medium">Your Clients</h2>
            </div>
            <div className="divide-y">
              {players.map(player => (
                <div 
                  key={player.id}
                  className={`p-4 flex items-center hover:bg-gray-50 cursor-pointer ${selectedPlayer?.id === player.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedPlayer(player)}
                >
                  <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                    {player.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <span className="mr-2">{player.position}</span>
                      <span className="mr-2">•</span>
                      <span>{player.club}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{player.overall}</div>
                    <div className="text-xs text-gray-500">OVR</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedPlayer && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-medium">Development Status</h2>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Current Rating</span>
                      <span className="font-medium">{selectedPlayer.overall}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(selectedPlayer.overall / selectedPlayer.potential) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedPlayer.potential}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                      <span>Current</span>
                      <span>Potential</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Development Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${selectedPlayer.developmentProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {selectedPlayer.developmentProgress}% to next attribute increase
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Current Development Focus</div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="font-medium capitalize">{selectedPlayer.developmentPlan || 'None'}</div>
                    <div className="text-sm text-gray-600 mt-1">Set by club coach</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Weekly Training Focus</div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="font-medium capitalize">{selectedPlayer.weeklyFocus || 'None'}</div>
                    <div className="text-sm text-gray-600 mt-1">Current training emphasis</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 rounded p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Age</div>
                    <div className="font-medium">{selectedPlayer.age}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Form</div>
                    <div className="font-medium">{selectedPlayer.form}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2 text-center">
                    <div className="text-xs text-gray-500 mb-1">Fitness</div>
                    <div className="font-medium">{selectedPlayer.fitness}%</div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                  <div className="flex">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                      {getDevelopmentMessage(selectedPlayer)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Training options and attribute selection */}
        <div className="lg:col-span-2">
          {selectedPlayer ? (
            <>
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b">
                  <h2 className="font-medium">Attribute Selection</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Select an attribute to focus on during training. The training will primarily improve this attribute, with smaller improvements to related attributes.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(selectedPlayer.attributes).map(([attr, value]) => (
                      <div 
                        key={attr}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedAttribute === attr 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedAttribute(attr)}
                      >
                        <div className="font-medium mb-1 capitalize">{attr}</div>
                        <div className={`text-xl font-bold ${getAttributeColor(value)}`}>
                          {value}
                        </div>
                        
                        {attr === selectedPlayer.developmentPlan && (
                          <div className="text-xs text-blue-600 mt-1 flex items-center">
                            <Target className="w-3 h-3 mr-1" />
                            Club focus
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {selectedAttribute && (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                      <div className="font-medium mb-2 capitalize">{selectedAttribute} Development Analysis</div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Current:</span>
                          <span className={`font-bold ${getAttributeColor(selectedPlayer.attributes[selectedAttribute])}`}>
                            {selectedPlayer.attributes[selectedAttribute]}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Potential:</span>
                          <span className="font-bold text-blue-600">
                            {Math.min(99, selectedPlayer.attributes[selectedAttribute] + 8)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Growth Rate:</span>
                          <span className={`font-bold ${
                            selectedPlayer.age < 24 ? 'text-green-600' : 
                            selectedPlayer.age < 28 ? 'text-blue-600' : 
                            selectedPlayer.age < 32 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {selectedPlayer.age < 24 ? 'Fast' : 
                             selectedPlayer.age < 28 ? 'Normal' : 
                             selectedPlayer.age < 32 ? 'Slow' :
                             'Very Slow'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h2 className="font-medium">Training Program</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Training Method
                      </label>
                      <div className="space-y-2">
                        {trainingOptions.map(option => (
                          <div 
                            key={option.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                              selectedTrainingType === option.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedTrainingType(option.id)}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <div className="font-medium flex items-center">
                                {option.icon}
                                <span className="ml-2">{option.name}</span>
                              </div>
                              <div className="text-blue-600 font-medium">
                                {formatCurrency(option.cost)}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{option.description}</p>
                            <div className="flex text-xs text-gray-500 space-x-4">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {option.duration}
                              </div>
                              <div className="flex items-center">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Injury risk: {option.risk}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Training Intensity
                      </label>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-4">
                          {intensityOptions.map(option => (
                            <button
                              key={option.id}
                              className={`px-4 py-2 rounded ${
                                trainingIntensity === option.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                              }`}
                              onClick={() => setTrainingIntensity(option.id)}
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Effectiveness</span>
                            <span className="font-medium">{getSelectedIntensity().effectiveness}x</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Fitness Impact</span>
                            <span className="font-medium">-{getSelectedIntensity().fitnessLoss}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Injury Risk</span>
                            <span className="font-medium">{getSelectedIntensity().injuryRisk * 100}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Cost Multiplier</span>
                            <span className="font-medium">{getSelectedIntensity().costMultiplier}x</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-medium mb-2">Estimated Results</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Current {getAttributeLabel(selectedAttribute)}</span>
                            <span className="font-medium">{selectedPlayer.attributes[selectedAttribute]}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Expected Gain</span>
                            <span className="text-green-600 font-medium">+{calculateAttributeGain()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">New Rating</span>
                            <span className="font-bold">{selectedPlayer.attributes[selectedAttribute] + calculateAttributeGain()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Cost</span>
                            <span className="font-bold">{formatCurrency(calculateCost())}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <div className="text-sm text-gray-500">Your Balance</div>
                          <div className="font-bold text-lg">{formatCurrency(agent.balance)}</div>
                        </div>
                        
                        <button 
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                          onClick={() => setShowConfirmation(true)}
                          disabled={calculateCost() > agent.balance}
                        >
                          <Dumbbell className="w-5 h-5 mr-2" />
                          Start Training
                        </button>
                      </div>
                      
                      {calculateCost() > agent.balance && (
                        <div className="text-sm text-red-600">
                          Insufficient funds for this training program.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Player Selected</h3>
              <p className="text-gray-500">
                Please select a player from the list to view training options.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b">
              <h2 className="font-medium">Confirm Training</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to start the following training program?
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Player</span>
                  <span className="font-medium">{selectedPlayer.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Focus Attribute</span>
                  <span className="font-medium capitalize">{selectedAttribute}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Training Type</span>
                  <span className="font-medium">{getSelectedTraining().name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Intensity</span>
                  <span className="font-medium">{getSelectedIntensity().name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cost</span>
                  <span className="font-bold">{formatCurrency(calculateCost())}</span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                  onClick={handleConfirmTraining}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm & Pay'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Results Modal */}
      {result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b bg-gradient-to-r from-green-600 to-green-500">
              <h2 className="font-bold text-white">Training Complete</h2>
            </div>
            <div className="p-6">
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg mb-6 flex items-start">
                <Check className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-800">
                    Training program successfully completed!
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    {selectedPlayer.name}'s {selectedAttribute} attribute has improved significantly.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Training Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{result.attribute}</span>
                    <div className="flex items-center">
                      <span className="text-gray-500 line-through mr-2">{result.oldValue}</span>
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="font-bold">{result.newValue}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fitness Impact</span>
                    <span className="font-medium text-yellow-600">-{result.fitnessLoss}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cost</span>
                    <span className="font-medium">{formatCurrency(result.cost)}</span>
                  </div>
                </div>
              </div>
              
              {result.injury && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-lg mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-800">
                        Minor Injury Occurred
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {selectedPlayer.name} suffered a minor strain during training and will need 1-2 weeks to fully recover.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleCompleteTraining}
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

export default TrainingDevelopment;