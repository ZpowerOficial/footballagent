// game-engine.js - Core simulation logic for Football Agent Simulator

import _ from 'lodash';

// Constants for player attributes and positions
const POSITIONS = ['Goleiro', 'Defensor', 'Meio-Campo', 'Atacante'];
const PERSONALITIES = ['Ambicioso', 'Profissional', 'Carismático', 'Polêmico', 'Disciplinado', 'Líder', 'Introvertido', 'Extrovertido'];
const PLAY_STYLES = ['Posse de Bola', 'Contra-Ataque', 'Pressão Alta', 'Defensivo', 'Equilíbrio'];
const NATIONALITIES = ['Brasil', 'Espanha', 'Inglaterra', 'França', 'Alemanha', 'Itália', 'Argentina', 'Portugal'];
const FIRST_NAMES = {
  'Brasil': ['João', 'Carlos', 'Eduardo', 'Luis', 'Gabriel', 'Matheus', 'Rafael', 'Bernardo', 'Pedro', 'Thiago', 'Bruno', 'Lucas'],
  'Espanha': ['Javier', 'Miguel', 'David', 'Carlos', 'José', 'Antonio', 'Sergio', 'Fernando', 'Pablo', 'Diego', 'Alvaro', 'Iker'],
  'Inglaterra': ['John', 'James', 'David', 'Harry', 'Jack', 'Thomas', 'William', 'George', 'Mason', 'Oliver', 'Jacob', 'Charlie'],
  'França': ['Hugo', 'Antoine', 'Paul', 'Kylian', 'Olivier', 'Raphael', 'Lucas', 'Benjamin', 'Theo', 'Jules', 'Adrien', 'Ousmane'],
  'Alemanha': ['Thomas', 'Manuel', 'Joshua', 'Leon', 'Toni', 'Ilkay', 'Lukas', 'Niklas', 'Julian', 'Kai', 'Serge', 'Marco'],
  'Itália': ['Gianluigi', 'Leonardo', 'Francesco', 'Lorenzo', 'Andrea', 'Giorgio', 'Federico', 'Nicolo', 'Domenico', 'Ciro', 'Marco', 'Matteo'],
  'Argentina': ['Lionel', 'Sergio', 'Ángel', 'Paulo', 'Rodrigo', 'Nicolás', 'Lautaro', 'Emiliano', 'Gonzalo', 'Javier', 'Leandro', 'Giovani'],
  'Portugal': ['Cristiano', 'Bernardo', 'Bruno', 'João', 'Diogo', 'Ruben', 'André', 'Pepe', 'Rui', 'Rafael', 'Nuno', 'Pedro']
};
const LAST_NAMES = {
  'Brasil': ['Silva', 'Santos', 'Oliveira', 'Souza', 'Costa', 'Pereira', 'Almeida', 'Ferreira', 'Rodrigues', 'Gomes', 'Martins', 'Alves'],
  'Espanha': ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martin', 'Jiménez', 'Ruiz'],
  'Inglaterra': ['Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Johnson', 'White', 'Walker', 'Robinson', 'Thompson', 'Harris', 'Clark'],
  'França': ['Dubois', 'Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Leroy', 'Moreau', 'Simon', 'Laurent'],
  'Alemanha': ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Hoffmann', 'Schulz', 'Koch', 'Bauer'],
  'Itália': ['Rossi', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti'],
  'Argentina': ['Martínez', 'González', 'Rodríguez', 'Fernández', 'López', 'Díaz', 'Pérez', 'Sánchez', 'Romero', 'Suárez', 'Gómez', 'Vargas'],
  'Portugal': ['Silva', 'Santos', 'Ferreira', 'Pereira', 'Oliveira', 'Costa', 'Rodrigues', 'Martins', 'Jesus', 'Sousa', 'Fernandes', 'Gonçalves']
};

// Position-specific attribute weights
const ATTRIBUTE_WEIGHTS = {
  'Goleiro': {
    'Goleiro_Atributo': 0.4,
    'Defesa': 0.2,
    'Passe': 0.1,
    'Velocidade': 0.1,
    'Fisico': 0.1,
    'Tecnica': 0.1
  },
  'Defensor': {
    'Defesa': 0.35,
    'Fisico': 0.2,
    'Velocidade': 0.15,
    'Passe': 0.15,
    'Tecnica': 0.1,
    'Finalizacao': 0.05,
    'Drible': 0.05
  },
  'Meio-Campo': {
    'Passe': 0.3,
    'Tecnica': 0.2,
    'Drible': 0.2,
    'Velocidade': 0.1,
    'Defesa': 0.1,
    'Fisico': 0.05,
    'Finalizacao': 0.05
  },
  'Atacante': {
    'Finalizacao': 0.4,
    'Drible': 0.2,
    'Velocidade': 0.2,
    'Tecnica': 0.1,
    'Passe': 0.05,
    'Fisico': 0.05
  }
};

// Save game to localStorage
export const saveGame = (gameState) => {
  try {
    localStorage.setItem('footballAgentSimulator', JSON.stringify(gameState));
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
};

// Load game from localStorage
export const loadGame = () => {
  try {
    const savedGame = localStorage.getItem('footballAgentSimulator');
    return savedGame ? JSON.parse(savedGame) : null;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
};

// Initialize new game
export const initializeNewGame = (agentName, difficulty = 'normal') => {
  // Set initial funds based on difficulty
  let initialFunds = 100000; // Default - Normal
  if (difficulty === 'easy') initialFunds = 250000;
  if (difficulty === 'hard') initialFunds = 50000;

  // Create game state
  const gameState = {
    agent: {
      name: agentName,
      balance: initialFunds,
      reputation: 15, // On a scale of 1-100
      clients: [], // Will be populated with starting players
      offeredPlayers: [] // Players currently offering to be represented
    },
    currentWeek: 1,
    currentSeason: 1,
    transferWindow: false, // True during transfer windows
    clubs: [],
    players: [],
    leagues: {},
    notifications: [
      {
        id: 1,
        type: 'welcome',
        message: `Welcome to your new career as a football agent, ${agentName}! Start by recruiting your first clients.`,
        read: false
      }
    ],
    lastUpdate: new Date().toISOString(),
    settings: {
      difficulty,
      autoSave: true,
      simulationSpeed: 'normal'
    },
    awards: {
      goldenBall: null,
      goldenBoot: null,
      goldenGlove: null,
      bestYoungPlayer: null,
      mostAssists: null,
      bestDefender: null
    },
    statistics: {
      transfers: [],
      topScorers: []
    }
  };

  // Generate clubs, players, and leagues
  gameState.clubs = generateClubs();
  gameState.players = generatePlayers(gameState.clubs);
  
  // Distribute players to clubs
  distributePlayersToClubs(gameState.players, gameState.clubs);
  
  // Calculate club strengths
  calculateClubStrengths(gameState.players, gameState.clubs);
  
  // Generate league tables
  gameState.leagues = generateLeagueTables(gameState.clubs);
  
  // Assign starting players to the agent
  assignStartingPlayersToAgent(gameState);
  
  // Save the new game
  saveGame(gameState);
  
  return gameState;
};

// Generate clubs for the game
const generateClubs = () => {
  const clubs = [];
  
  // Club data for each country
  const clubsByCountry = {
    'Brasil': [
      'Flamengo', 'Vasco da Gama', 'São Paulo', 'Palmeiras', 'Santos',
      'Corinthians', 'Fluminense', 'Grêmio', 'Cruzeiro', 'Botafogo',
      'Internacional', 'Atlético Mineiro', 'Bahia', 'Vitória', 'Sport Recife',
      'Chapecoense', 'Atlético Paranaense', 'Coritiba', 'Goiás', 'Ponte Preta'
    ],
    'Espanha': [
      'Real Madrid', 'Barcelona', 'Atlético Madrid', 'Sevilla', 'Valência',
      'Villarreal', 'Real Sociedad', 'Athletic Bilbao', 'Getafe', 'Betis',
      'Espanyol', 'Celta de Vigo', 'Levante', 'Granada', 'Osasuna',
      'Mallorca', 'Leganés', 'Alavés', 'Eibar', 'Cádiz'
    ],
    'Inglaterra': [
      'Manchester United', 'Liverpool', 'Chelsea', 'Arsenal', 'Manchester City',
      'Tottenham Hotspur', 'Leicester City', 'Everton', 'Wolverhampton', 'Newcastle United',
      'Aston Villa', 'West Ham United', 'Leeds United', 'Southampton', 'Crystal Palace',
      'Brighton', 'Burnley', 'Watford', 'Norwich City', 'Sheffield United'
    ]
  };
  
  // Generate clubs for each country
  Object.entries(clubsByCountry).forEach(([country, clubNames]) => {
    clubNames.forEach((clubName, index) => {
      // Determine league/division
      let league;
      if (index < 10) {
        league = `${country} 1ª Divisão`;
      } else if (index < 20) {
        league = `${country} 2ª Divisão`;
      } else {
        league = `${country} 3ª Divisão`;
      }
      
      // Budget tiers by division
      let budgetRange;
      if (index < 10) {
        budgetRange = { min: 50, max: 500 }; // 1st division, €50M - €500M
      } else if (index < 20) {
        budgetRange = { min: 10, max: 100 }; // 2nd division, €10M - €100M
      } else {
        budgetRange = { min: 1, max: 20 }; // 3rd division, €1M - €20M
      }
      
      // Calculate random budget in millions, weighted by index within division
      const divIndex = index % 10; // Position within division
      const factor = 1 - (divIndex / 10); // Better position = higher factor
      const budgetBase = budgetRange.min + (budgetRange.max - budgetRange.min) * factor;
      const budget = budgetBase * (0.8 + Math.random() * 0.4) * 1000000; // Randomize within ±20%
      
      // Calculate fame (1-10 scale)
      const fame = Math.min(10, Math.max(1, 10 - Math.floor(index / 4)));
      
      clubs.push({
        id: clubs.length + 1,
        name: clubName,
        country,
        league,
        budget: budget,
        originalBudget: budget, // For resetting each season
        fame,
        strength: 0, // Will be calculated later
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        staff: {
          coach: _.sample(['Experiente', 'Iniciante', 'Veterano']),
          assistantCoach: _.sample(['Bom', 'Regular', 'Iniciante']),
          manager: _.sample(['Eficiente', 'Burocrático', 'Carismático']),
          scouts: Math.floor(Math.random() * 5) + 1,
          physios: Math.floor(Math.random() * 3) + 1,
          psychologists: Math.floor(Math.random() * 3),
          fitnessCoaches: Math.floor(Math.random() * 3) + 1,
          marketingManager: _.sample(['Expert', 'Regular', 'Iniciante'])
        },
        facilities: {
          stadium: Math.floor(Math.random() * 5) + 1,
          trainingCenter: Math.floor(Math.random() * 5) + 1,
          medicalCenter: Math.floor(Math.random() * 5) + 1,
          youthAcademy: Math.floor(Math.random() * 5) + 1,
        },
        playStyle: _.sample(PLAY_STYLES),
        formation: _.sample(['4-3-3', '4-4-2', '3-5-2', '4-2-3-1']),
        popularity: Math.floor(Math.random() * 100) + 1,
      });
    });
  });
  
  return clubs;
};

// Generate players for the game
const generatePlayers = (clubs, numPlayers = 2000) => {
  const players = [];
  
  for (let i = 0; i < numPlayers; i++) {
    // Select nationality randomly
    const nationality = _.sample(NATIONALITIES);
    
    // Select names based on nationality
    const firstName = _.sample(FIRST_NAMES[nationality] || FIRST_NAMES['Brasil']);
    const lastName = _.sample(LAST_NAMES[nationality] || LAST_NAMES['Brasil']);
    const name = `${firstName} ${lastName}`;
    
    // Select position
    const position = _.sample(POSITIONS);
    
    // Generate age with distribution favoring 22-28 year olds
    let age;
    const ageRoll = Math.random();
    if (ageRoll < 0.1) {
      // Young talents (17-19)
      age = 17 + Math.floor(Math.random() * 3);
    } else if (ageRoll < 0.7) {
      // Prime age (20-29)
      age = 20 + Math.floor(Math.random() * 10);
    } else if (ageRoll < 0.95) {
      // Veterans (30-34)
      age = 30 + Math.floor(Math.random() * 5);
    } else {
      // End of career (35-37)
      age = 35 + Math.floor(Math.random() * 3);
    }
    
    // Generate personality and play style
    const personality = _.sample(PERSONALITIES);
    const playStyle = _.sample(PLAY_STYLES);
    
    // Generate base attributes with normal distribution
    // Better players are rarer, and attribute quality depends on age
    const ageFactor = age < 30 ? (age - 17) / 13 : 1 - (age - 30) / 15; // Peaks at 30
    const baseAdjustment = ageFactor * 30; // 0-30 adjustment based on age
    
    const baseAttributes = {};
    const generateAttribute = () => {
      // Generate base value (normal distribution around 50)
      const baseValue = Math.floor(Math.random() * 40) + 30;
      
      // Quality factor makes exceptional attributes rare (normal distribution)
      const qualityFactor = Math.min(40, Math.max(0, 
        Math.floor((Math.random() + Math.random() + Math.random()) * 20)));
      
      return Math.min(99, Math.max(1, Math.floor(baseValue + qualityFactor + baseAdjustment)));
    };
    
    // Generate all attributes
    baseAttributes.finalizacao = generateAttribute();
    baseAttributes.passe = generateAttribute();
    baseAttributes.drible = generateAttribute();
    baseAttributes.defesa = generateAttribute();
    baseAttributes.velocidade = generateAttribute();
    baseAttributes.fisico = generateAttribute();
    baseAttributes.tecnica = generateAttribute();
    baseAttributes.goleiro_atributo = position === 'Goleiro' ? generateAttribute() : Math.floor(Math.random() * 20) + 1;
    baseAttributes.decisao = generateAttribute();
    baseAttributes.compostura = generateAttribute();
    
    // Apply position-specific adjustments
    if (position === 'Goleiro') {
      baseAttributes.goleiro_atributo += 20;
      baseAttributes.defesa += 10;
      baseAttributes.finalizacao -= 15;
      baseAttributes.drible -= 15;
    } else if (position === 'Defensor') {
      baseAttributes.defesa += 15;
      baseAttributes.fisico += 10;
      baseAttributes.finalizacao -= 10;
    } else if (position === 'Meio-Campo') {
      baseAttributes.passe += 15;
      baseAttributes.tecnica += 10;
      baseAttributes.defesa += 5;
    } else if (position === 'Atacante') {
      baseAttributes.finalizacao += 15;
      baseAttributes.drible += 10;
      baseAttributes.velocidade += 5;
      baseAttributes.defesa -= 15;
    }
    
    // Ensure attributes stay within 1-99 range
    Object.keys(baseAttributes).forEach(key => {
      baseAttributes[key] = Math.min(99, Math.max(1, baseAttributes[key]));
    });
    
    // Calculate overall rating based on position-specific weights
    const weights = ATTRIBUTE_WEIGHTS[position];
    let overallRating = 0;
    let totalWeight = 0;
    
    Object.entries(weights).forEach(([attribute, weight]) => {
      const attrName = attribute.toLowerCase();
      if (baseAttributes[attrName]) {
        overallRating += baseAttributes[attrName] * weight;
        totalWeight += weight;
      }
    });
    
    overallRating = Math.floor(overallRating / totalWeight);
    
    // Calculate potential (higher for younger players)
    const potentialBoost = Math.max(0, 30 - age); // Younger players have more room to grow
    const potentialRoll = Math.random(); // Randomization factor
    let potential;
    
    if (potentialRoll < 0.1) {
      // Exceptional talent
      potential = Math.min(99, overallRating + potentialBoost + Math.floor(Math.random() * 10) + 5);
    } else if (potentialRoll < 0.3) {
      // Good talent
      potential = Math.min(99, overallRating + potentialBoost / 1.5 + Math.floor(Math.random() * 7) + 3);
    } else {
      // Average potential
      potential = Math.min(99, overallRating + potentialBoost / 2 + Math.floor(Math.random() * 5));
    }
    
    // Generate hidden potential (sometimes higher or lower than visible)
    const hiddenPotential = Math.min(99, Math.max(overallRating, 
      potential + Math.floor((Math.random() * 10) - 5)));
    
    // Calculate market value based on overall, potential, age, and position
    const positionValueMultiplier = {
      'Goleiro': 0.9,
      'Defensor': 1.0,
      'Meio-Campo': 1.2,
      'Atacante': 1.5
    }[position];
    
    const valueBase = Math.pow(overallRating, 3) / age;
    const potentialValue = (potential - overallRating) * 100000;
    const marketValue = (valueBase + potentialValue) * positionValueMultiplier;
    
    // Add player to the array
    players.push({
      id: players.length + 1,
      name,
      nationality,
      position,
      age,
      overall: overallRating,
      potential,
      hiddenPotential,
      value: marketValue,
      salary: marketValue * 0.05, // 5% of value as annual salary
      weeklySalary: (marketValue * 0.05) / 52, // Weekly salary
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      club: null, // Will be assigned later
      agent: null,
      personality,
      playStyle,
      injury: 0,
      suspension: 0,
      respect: 50, // Initial respect for agents
      matchesPlayed: 0,
      yellowCards: 0,
      redCards: 0,
      rivalClubs: _.sampleSize(clubs.map(c => c.name), 2),
      dreamClub: _.sample(clubs.map(c => c.name)),
      originClub: _.sample(clubs.map(c => c.name)),
      popularity: Math.floor(Math.random() * 100) + 1,
      loyalty: Math.floor(Math.random() * 100) + 1,
      performances: [],
      averagePerformance: 0,
      morale: 50 + Math.floor(Math.random() * 50), // 50-100
      form: 0, // 0-100, builds during season
      // Individual attributes
      attributes: baseAttributes,
      // Contract details
      contract: {
        yearsRemaining: Math.floor(Math.random() * 5) + 1,
        releaseClause: marketValue * (1.5 + Math.random()),
      },
      developmentPlan: null
    });
  }
  
  return players;
};

// Distribute players to clubs
const distributePlayersToClubs = (players, clubs) => {
  // Group clubs by league level for easier matching
  const clubsByLevel = {};
  
  clubs.forEach(club => {
    const divisionLevel = club.league.includes('1ª') ? 1 : 
                         club.league.includes('2ª') ? 2 : 3;
    
    if (!clubsByLevel[divisionLevel]) {
      clubsByLevel[divisionLevel] = [];
    }
    
    clubsByLevel[divisionLevel].push(club);
  });
  
  // Sort players by overall rating descending
  const sortedPlayers = _.sortBy(players, p => -p.overall);
  
  // First, distribute top players to first division teams
  // Ensure each position is filled appropriately
  clubs.forEach(club => {
    const divisionLevel = club.league.includes('1ª') ? 1 : 
                         club.league.includes('2ª') ? 2 : 3;
    
    // Determine squad size based on division
    const squadSize = divisionLevel === 1 ? 25 : divisionLevel === 2 ? 22 : 20;
    
    // Define position quotas
    const positionQuotas = {
      'Goleiro': Math.ceil(squadSize * 0.12), // ~3 goalkeepers
      'Defensor': Math.ceil(squadSize * 0.32), // ~8 defenders
      'Meio-Campo': Math.ceil(squadSize * 0.36), // ~9 midfielders
      'Atacante': Math.ceil(squadSize * 0.20), // ~5 attackers
    };
    
    const clubQuality = club.fame; // 1-10 scale
    
    // Rating range based on division and club fame
    let minRating, maxRating;
    if (divisionLevel === 1) {
      minRating = 60 + (clubQuality * 1.5);
      maxRating = 75 + (clubQuality * 2);
    } else if (divisionLevel === 2) {
      minRating = 55 + (clubQuality * 1);
      maxRating = 65 + (clubQuality * 1.5);
    } else {
      minRating = 45 + (clubQuality * 0.5);
      maxRating = 60 + (clubQuality * 1);
    }
    
    // Allow some randomness in ratings
    minRating = Math.max(45, minRating - 5);
    maxRating = Math.min(94, maxRating + 5);
  });
  
  // Faster approach: assign players to clubs based on quality matching
  sortedPlayers.forEach(player => {
    // Skip already assigned players
    if (player.club) return;
    
    // Determine suitable club fame based on player quality
    // Better players go to better clubs (higher fame)
    const suitableFame = Math.floor(player.overall / 10);
    
    // Find clubs with matching fame
    const suitableClubs = clubs.filter(club => 
      Math.abs(club.fame - suitableFame) <= 2 && 
      // Count players already at this club
      players.filter(p => p.club === club.name).length < 
        (club.league.includes('1ª') ? 25 : 
         club.league.includes('2ª') ? 22 : 20)
    );
    
    if (suitableClubs.length) {
      // Assign to random suitable club
      player.club = _.sample(suitableClubs).name;
    } else {
      // Fallback: assign to any club that needs players
      const fallbackClubs = clubs.filter(club => 
        players.filter(p => p.club === club.name).length < 
          (club.league.includes('1ª') ? 25 : 
           club.league.includes('2ª') ? 22 : 20)
      );
      
      if (fallbackClubs.length) {
        player.club = _.sample(fallbackClubs).name;
      }
    }
  });
  
  // Ensure every club has minimum number of players per position
  clubs.forEach(club => {
    const minPlayers = {
      'Goleiro': 2,
      'Defensor': 6,
      'Meio-Campo': 6,
      'Atacante': 4
    };
    
    // Count current players by position
    const currentPlayers = {};
    POSITIONS.forEach(pos => {
      currentPlayers[pos] = players.filter(p => p.club === club.name && p.position === pos).length;
    });
    
    // Fill missing positions
    POSITIONS.forEach(pos => {
      const needed = Math.max(0, minPlayers[pos] - currentPlayers[pos]);
      if (needed > 0) {
        // Find unassigned players of this position
        const availablePlayers = players.filter(p => !p.club && p.position === pos);
        
        // Take the needed number of players
        const playersToAssign = availablePlayers.slice(0, needed);
        playersToAssign.forEach(player => {
          player.club = club.name;
        });
      }
    });
  });
  
  // Assign any remaining unassigned players randomly
  players.filter(p => !p.club).forEach(player => {
    const randomClub = _.sample(clubs);
    player.club = randomClub.name;
  });
};

// Calculate club strengths based on their players
const calculateClubStrengths = (players, clubs) => {
  clubs.forEach(club => {
    const clubPlayers = players.filter(p => p.club === club.name);
    
    if (clubPlayers.length > 0) {
      // Calculate average player rating
      const avgRating = _.meanBy(clubPlayers, 'overall');
      
      // Calculate positional balance (bonus if club has balanced squad)
      const positionCounts = {
        'Goleiro': clubPlayers.filter(p => p.position === 'Goleiro').length,
        'Defensor': clubPlayers.filter(p => p.position === 'Defensor').length,
        'Meio-Campo': clubPlayers.filter(p => p.position === 'Meio-Campo').length,
        'Atacante': clubPlayers.filter(p => p.position === 'Atacante').length,
      };
      
      const balanceScore = (
        positionCounts.Goleiro >= 2 && 
        positionCounts.Defensor >= 6 && 
        positionCounts.MeioCampo >= 6 && 
        positionCounts.Atacante >= 4
      ) ? 2 : 0;
      
      // Calculate best XI strength
      const bestXI = {};
      bestXI.Goleiro = _.take(_.sortBy(clubPlayers.filter(p => p.position === 'Goleiro'), p => -p.overall), 1);
      bestXI.Defensor = _.take(_.sortBy(clubPlayers.filter(p => p.position === 'Defensor'), p => -p.overall), 4);
      bestXI.MeioCampo = _.take(_.sortBy(clubPlayers.filter(p => p.position === 'Meio-Campo'), p => -p.overall), 4);
      bestXI.Atacante = _.take(_.sortBy(clubPlayers.filter(p => p.position === 'Atacante'), p => -p.overall), 2);
      
      const bestXIplayers = [
        ...bestXI.Goleiro, 
        ...bestXI.Defensor, 
        ...bestXI.MeioCampo, 
        ...bestXI.Atacante
      ];
      
      const bestXIStrength = bestXIplayers.length > 0 ? 
        _.meanBy(bestXIplayers, 'overall') : 0;
      
      // Calculate depth factor
      const depth = Math.min(1, clubPlayers.length / 25);
      
      // Final club strength
      const rawStrength = (bestXIStrength * 0.7) + (avgRating * 0.2) + balanceScore + (depth * 2);
      
      // Normalize to 50-99 range with division adjustments
      if (club.league.includes('1ª')) {
        club.strength = Math.min(99, Math.max(70, rawStrength));
      } else if (club.league.includes('2ª')) {
        club.strength = Math.min(85, Math.max(60, rawStrength));
      } else {
        club.strength = Math.min(75, Math.max(50, rawStrength));
      }
    } else {
      // Fallback if no players found
      club.strength = club.league.includes('1ª') ? 75 : 
                      club.league.includes('2ª') ? 65 : 55;
    }
  });
};

// Generate league tables based on clubs
const generateLeagueTables = (clubs) => {
  const leagues = {};
  
  // Group clubs by league
  const clubsByLeague = _.groupBy(clubs, 'league');
  
  // Create initial league tables
  Object.keys(clubsByLeague).forEach(leagueName => {
    leagues[leagueName] = clubsByLeague[leagueName].map(club => ({
      name: club.name,
      matches: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0
    }));
  });
  
  return leagues;
};

// Assign starting players to the agent
const assignStartingPlayersToAgent = (gameState) => {
  // Find weakest players to assign to the agent
  const weakestPlayers = _.sortBy(gameState.players, 'overall')
    .filter(p => !p.agent)
    .slice(0, 2);
  
  weakestPlayers.forEach(player => {
    player.agent = gameState.agent.name;
    gameState.agent.clients.push(player.id);
    
    // Add notification about getting the player
    gameState.notifications.push({
      id: gameState.notifications.length + 1,
      type: 'newClient',
      message: `${player.name} (${player.position}, ${player.overall} OVR) has become your first client! Help develop and transfer this player to boost your agency.`,
      read: false,
      timestamp: new Date().toISOString()
    });
  });
};

// Simulate match between two clubs
export const simulateMatch = (homeClub, awayClub, players) => {
  // Calculate attack and defense ratings with randomness
  const homeAttack = homeClub.strength * (0.85 + Math.random() * 0.3);
  const homeDefense = homeClub.strength * (0.85 + Math.random() * 0.3);
  const awayAttack = awayClub.strength * (0.8 + Math.random() * 0.3); // Away teams slightly penalized
  const awayDefense = awayClub.strength * (0.8 + Math.random() * 0.3);
  
  // Calculate expected goals
  const baseGoalsPerMatch = 2.7; // Average goals per match
  const homeLambda = Math.max((homeAttack / (homeAttack + awayDefense)) * (baseGoalsPerMatch * 1.2), 0.1);
  const awayLambda = Math.max((awayAttack / (awayAttack + homeDefense)) * (baseGoalsPerMatch * 0.8), 0.1);
  
  // Simulate goals using Poisson approximation
  let homeGoals = 0;
  let awayGoals = 0;
  
  // Approximating Poisson with sufficient randomness
  const simulatePoisson = (lambda) => {
    let L = Math.exp(-lambda);
    let p = 1.0;
    let k = 0;
    
    do {
      k += 1;
      p *= Math.random();
    } while (p > L);
    
    return k - 1;
  };
  
  homeGoals = simulatePoisson(homeLambda);
  awayGoals = simulatePoisson(awayLambda);
  
  // Small chance of upset with many goals
  if (Math.random() < 0.05) {
    const extraGoals = Math.floor(Math.random() * 4) + 2;
    if (Math.random() < 0.5) {
      homeGoals += extraGoals;
    } else {
      awayGoals += extraGoals;
    }
  }
  
  // Simulate match events
  const events = simulateMatchEvents(homeClub, awayClub, homeGoals, awayGoals, players);
  
  return {
    homeGoals,
    awayGoals,
    events
  };
};

// Simulate match events (goals, cards, injuries)
const simulateMatchEvents = (homeClub, awayClub, homeGoals, awayGoals, allPlayers) => {
  const events = [];
  
  // Get players from both clubs
  const homePlayers = allPlayers.filter(p => p.club === homeClub.name && p.injury === 0 && p.suspension === 0);
  const awayPlayers = allPlayers.filter(p => p.club === awayClub.name && p.injury === 0 && p.suspension === 0);
  
  // Update matches played
  homePlayers.forEach(player => {
    player.matchesPlayed += 1;
    
    // Generate performance rating (1-10 scale)
    const basePerformance = player.overall / 10; // Base from overall
    const randomFactor = (Math.random() * 2) - 1; // -1 to +1
    const moraleFactor = (player.morale - 50) / 100; // -0.5 to +0.5
    
    const performance = Math.min(10, Math.max(1, basePerformance + randomFactor + moraleFactor));
    
    player.performances.push(performance);
    player.averagePerformance = player.performances.reduce((a, b) => a + b, 0) / player.performances.length;
  });
  
  awayPlayers.forEach(player => {
    player.matchesPlayed += 1;
    
    // Generate performance rating (1-10 scale)
    const basePerformance = player.overall / 10; // Base from overall
    const randomFactor = (Math.random() * 2) - 1; // -1 to +1
    const moraleFactor = (player.morale - 50) / 100; // -0.5 to +0.5
    
    const performance = Math.min(10, Math.max(1, basePerformance + randomFactor + moraleFactor));
    
    player.performances.push(performance);
    player.averagePerformance = player.performances.reduce((a, b) => a + b, 0) / player.performances.length;
  });
  
  // Simulate goal scorers
  for (let i = 0; i < homeGoals; i++) {
    simulateGoal(homePlayers, homeClub, events);
  }
  
  for (let i = 0; i < awayGoals; i++) {
    simulateGoal(awayPlayers, awayClub, events);
  }
  
  // Simulate cards
  simulateCards(homePlayers, homeClub, events);
  simulateCards(awayPlayers, awayClub, events);
  
  // Simulate injuries
  simulateInjuries(homePlayers, homeClub, events);
  simulateInjuries(awayPlayers, awayClub, events);
  
  // Clean sheets for goalkeepers
  if (awayGoals === 0) {
    const homeGoalkeepers = homePlayers.filter(p => p.position === 'Goleiro');
    homeGoalkeepers.forEach(gk => {
      gk.cleanSheets += 1;
    });
  }
  
  if (homeGoals === 0) {
    const awayGoalkeepers = awayPlayers.filter(p => p.position === 'Goleiro');
    awayGoalkeepers.forEach(gk => {
      gk.cleanSheets += 1;
    });
  }
  
  return events;
};

// Simulate a goal
const simulateGoal = (players, club, events) => {
  // Weight players by position and attributes for goal probability
  const weightedPlayers = players.map(player => {
    let weight = 0;
    
    if (player.position === 'Atacante') {
      weight = player.attributes.finalizacao * 1.5 + player.attributes.drible * 0.5;
    } else if (player.position === 'Meio-Campo') {
      weight = player.attributes.finalizacao * 0.8 + player.attributes.drible * 0.3 + player.attributes.passe * 0.2;
    } else if (player.position === 'Defensor') {
      weight = player.attributes.finalizacao * 0.3 + player.attributes.defesa * 0.1;
    } else {
      weight = 1; // Very small chance for goalkeepers
    }
    
    return {
      player,
      weight
    };
  });
  
  // Select goal scorer
  const goalScorer = weightedSelection(weightedPlayers);
  if (goalScorer) {
    goalScorer.goals += 1;
    
    // Select assister (excluding goal scorer)
    const potentialAssisters = weightedPlayers
      .filter(wp => wp.player.id !== goalScorer.id)
      .map(wp => {
        let weight = 0;
        
        if (wp.player.position === 'Meio-Campo') {
          weight = wp.player.attributes.passe * 1.5;
        } else if (wp.player.position === 'Atacante') {
          weight = wp.player.attributes.passe * 0.8;
        } else if (wp.player.position === 'Defensor') {
          weight = wp.player.attributes.passe * 0.4;
        }
        
        return {
          player: wp.player,
          weight
        };
      });
    
    let assister = null;
    if (Math.random() < 0.7) { // 70% of goals have assists
      assister = weightedSelection(potentialAssisters);
      if (assister) {
        assister.assists += 1;
      }
    }
    
    // Add goal event
    events.push({
      type: 'goal',
      club: club.name,
      scorer: {
        id: goalScorer.id,
        name: goalScorer.name,
        position: goalScorer.position
      },
      assist: assister ? {
        id: assister.id,
        name: assister.name,
        position: assister.position
      } : null
    });
  }
};

// Weighted random selection
const weightedSelection = (weightedItems) => {
  const totalWeight = weightedItems.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight <= 0) return null;
  
  let random = Math.random() * totalWeight;
  for (const item of weightedItems) {
    random -= item.weight;
    if (random <= 0) {
      return item.player;
    }
  }
  
  return weightedItems[0]?.player || null;
};

// Simulate cards
const simulateCards = (players, club, events) => {
  players.forEach(player => {
    // Yellow cards - higher chance for defenders and aggressive players
    let yellowCardChance = 0.08; // Base chance
    
    if (player.position === 'Defensor') yellowCardChance += 0.04;
    if (player.personality === 'Polêmico') yellowCardChance += 0.03;
    
    if (Math.random() < yellowCardChance) {
      player.yellowCards += 1;
      
      // Suspend for accumulated yellows (every 3 cards)
      if (player.yellowCards % 3 === 0) {
        player.suspension += 1;
      }
      
      events.push({
        type: 'yellowCard',
        club: club.name,
        player: {
          id: player.id,
          name: player.name,
          position: player.position
        }
      });
    }
    
    // Red cards
    let redCardChance = 0.01; // Base chance
    
    if (player.position === 'Defensor') redCardChance += 0.005;
    if (player.personality === 'Polêmico') redCardChance += 0.01;
    
    if (Math.random() < redCardChance) {
      player.redCards += 1;
      player.suspension += 2; // 2 match suspension for reds
      
      events.push({
        type: 'redCard',
        club: club.name,
        player: {
          id: player.id,
          name: player.name,
          position: player.position
        }
      });
    }
  });
};

// Simulate injuries
const simulateInjuries = (players, club, events) => {
  players.forEach(player => {
    // Base injury chance
    let injuryChance = 0.02;
    
    // Age factor (older players get injured more)
    if (player.age > 30) injuryChance += (player.age - 30) * 0.002;
    
    // Low fitness increases injury risk
    if (player.form < 50) injuryChance += (50 - player.form) * 0.0004;
    
    if (Math.random() < injuryChance) {
      // Determine injury duration
      let duration;
      const severityRoll = Math.random();
      
      if (severityRoll < 0.6) {
        // Minor injury (1-2 weeks)
        duration = Math.floor(Math.random() * 2) + 1;
      } else if (severityRoll < 0.9) {
        // Medium injury (3-6 weeks)
        duration = Math.floor(Math.random() * 4) + 3;
      } else {
        // Severe injury (7-12 weeks)
        duration = Math.floor(Math.random() * 6) + 7;
      }
      
      player.injury = duration;
      
      events.push({
        type: 'injury',
        club: club.name,
        player: {
          id: player.id,
          name: player.name,
          position: player.position
        },
        duration
      });
    }
  });
};

// Simulate a week of matches
export const simulateWeek = (gameState) => {
  // Get all clubs
  const clubs = gameState.clubs;
  const players = gameState.players;
  
  // Update week counter
  gameState.currentWeek += 1;
  
  // If end of season (week 38)
  if (gameState.currentWeek > 38) {
    gameState.currentWeek = 1;
    gameState.currentSeason += 1;
    
    // End of season processing
    processEndOfSeason(gameState);
  }
  
  // Check if transfer window should open/close
  updateTransferWindowStatus(gameState);
  
  // Create fixtures for the week
  const fixtures = generateFixtures(gameState);
  
  // Simulate each match
  fixtures.forEach(fixture => {
    const homeClub = clubs.find(c => c.name === fixture.home);
    const awayClub = clubs.find(c => c.name === fixture.away);
    
    if (homeClub && awayClub) {
      const result = simulateMatch(homeClub, awayClub, players);
      
      // Update league tables
      updateLeagueTable(gameState, homeClub, awayClub, result.homeGoals, result.awayGoals);
      
      // Store match result
      fixture.result = {
        homeGoals: result.homeGoals,
        awayGoals: result.awayGoals,
        events: result.events
      };
    }
  });
  
  // Update player status (injuries, suspensions)
  updatePlayerStatus(gameState);
  
  // Update player morale and form
  updatePlayerMoraleAndForm(gameState);
  
  // Generate new offers for agents
  generateAgentOffers(gameState);
  
  // Check contract renewals and expirations
  processContractStatus(gameState);
  
  // Auto-save game
  if (gameState.settings.autoSave) {
    saveGame(gameState);
  }
  
  return {
    week: gameState.currentWeek,
    fixtures,
    transferWindow: gameState.transferWindow
  };
};

// Generate fixtures for a given week
const generateFixtures = (gameState) => {
  const fixtures = [];
  
  // Group clubs by league
  const clubsByLeague = _.groupBy(gameState.clubs, 'league');
  
  // For each league, generate fixtures
  Object.entries(clubsByLeague).forEach(([league, clubs]) => {
    // Simple fixture algorithm
    // In a real implementation, this would use a proper fixture generation algorithm
    // For simplicity, we'll just randomize matches
    const shuffledClubs = _.shuffle([...clubs]);
    
    // Make pairs of clubs for fixtures
    for (let i = 0; i < shuffledClubs.length - 1; i += 2) {
      fixtures.push({
        league,
        home: shuffledClubs[i].name,
        away: shuffledClubs[i + 1].name,
        week: gameState.currentWeek
      });
    }
  });
  
  return fixtures;
};

// Update league table with match result
const updateLeagueTable = (gameState, homeClub, awayClub, homeGoals, awayGoals) => {
  const league = homeClub.league;
  
  // Update home team
  const homeEntry = gameState.leagues[league].find(entry => entry.name === homeClub.name);
  if (homeEntry) {
    homeEntry.matches += 1;
    homeEntry.goalsFor += homeGoals;
    homeEntry.goalsAgainst += awayGoals;
    
    if (homeGoals > awayGoals) {
      homeEntry.wins += 1;
      homeEntry.points += 3;
    } else if (homeGoals === awayGoals) {
      homeEntry.draws += 1;
      homeEntry.points += 1;
    } else {
      homeEntry.losses += 1;
    }
  }
  
  // Update away team
  const awayEntry = gameState.leagues[league].find(entry => entry.name === awayClub.name);
  if (awayEntry) {
    awayEntry.matches += 1;
    awayEntry.goalsFor += awayGoals;
    awayEntry.goalsAgainst += homeGoals;
    
    if (awayGoals > homeGoals) {
      awayEntry.wins += 1;
      awayEntry.points += 3;
    } else if (awayGoals === homeGoals) {
      awayEntry.draws += 1;
      awayEntry.points += 1;
    } else {
      awayEntry.losses += 1;
    }
  }
};

// Update player status (injuries, suspensions)
const updatePlayerStatus = (gameState) => {
  gameState.players.forEach(player => {
    // Reduce injury duration
    if (player.injury > 0) {
      player.injury -= 1;
    }
    
    // Reduce suspension duration
    if (player.suspension > 0) {
      player.suspension -= 1;
    }
  });
};

// Update player morale and form
const updatePlayerMoraleAndForm = (gameState) => {
  gameState.players.forEach(player => {
    // Form updates based on playing time and performance
    if (player.injury === 0 && player.suspension === 0) {
      // Form improves if player is playing matches
      if (player.performances.length > 0) {
        const recentPerformance = player.performances[player.performances.length - 1];
        
        // Form improvement based on recent performance
        if (recentPerformance > 7) {
          player.form = Math.min(100, player.form + 5);
        } else if (recentPerformance > 5) {
          player.form = Math.min(100, player.form + 2);
        } else {
          player.form = Math.max(0, player.form - 1);
        }
      } else {
        // Not playing decreases form
        player.form = Math.max(0, player.form - 2);
      }
    } else {
      // Injured/suspended players lose form
      player.form = Math.max(0, player.form - 3);
    }
    
    // Morale updates
    // Factors: playing time, team performance, recent form, injuries
    
    // Playing time factor
    if (player.matchesPlayed < gameState.currentWeek * 0.3) {
      // Not getting enough playing time
      player.morale = Math.max(10, player.morale - 2);
    }
    
    // Form factor
    if (player.form > 80) {
      player.morale = Math.min(100, player.morale + 1);
    } else if (player.form < 40) {
      player.morale = Math.max(10, player.morale - 1);
    }
    
    // Random fluctuation
    player.morale += Math.floor(Math.random() * 3) - 1;
    player.morale = Math.max(10, Math.min(100, player.morale));
  });
};

// Process end of season: awards, promotions/relegations, etc.
const processEndOfSeason = (gameState) => {
  // Calculate season awards
  calculateAwards(gameState);
  
  // Process promotions and relegations
  processPromotionsRelegations(gameState);
  
  // Update player progression
  updatePlayerProgression(gameState);
  
  // Reset season stats
  resetSeasonStats(gameState);
  
  // Add season summary notification
  gameState.notifications.push({
    id: gameState.notifications.length + 1,
    type: 'endOfSeason',
    message: `Season ${gameState.currentSeason - 1} has ended! New season starting with updated teams and player progressions.`,
    read: false,
    timestamp: new Date().toISOString()
  });
};

// Calculate season awards
const calculateAwards = (gameState) => {
  const players = gameState.players;
  
  // Golden Ball (Best Player)
  const goldenBallCandidates = players.filter(p => 
    p.matchesPlayed >= 20 && 
    p.averagePerformance >= 7
  );
  
  if (goldenBallCandidates.length > 0) {
    const goldenBallWinner = _.sortBy(goldenBallCandidates, [
      p => -p.averagePerformance, 
      p => -(p.goals + p.assists * 0.7)
    ])[0];
    
    gameState.awards.goldenBall = {
      season: gameState.currentSeason - 1,
      player: goldenBallWinner.id
    };
  }
  
  // Golden Boot (Top Scorer)
  const goldenBootCandidates = _.sortBy(players, p => -p.goals);
  if (goldenBootCandidates.length > 0) {
    gameState.awards.goldenBoot = {
      season: gameState.currentSeason - 1,
      player: goldenBootCandidates[0].id,
      goals: goldenBootCandidates[0].goals
    };
  }
  
  // Golden Glove (Best Goalkeeper)
  const goldenGloveCandidates = _.sortBy(
    players.filter(p => p.position === 'Goleiro' && p.matchesPlayed >= 15),
    p => -p.cleanSheets
  );
  
  if (goldenGloveCandidates.length > 0) {
    gameState.awards.goldenGlove = {
      season: gameState.currentSeason - 1,
      player: goldenGloveCandidates[0].id,
      cleanSheets: goldenGloveCandidates[0].cleanSheets
    };
  }
  
  // Best Young Player (Under 23)
  const bestYoungCandidates = _.sortBy(
    players.filter(p => p.age <= 23 && p.matchesPlayed >= 15), 
    [p => -p.averagePerformance, p => -(p.goals + p.assists * 0.7)]
  );
  
  if (bestYoungCandidates.length > 0) {
    gameState.awards.bestYoungPlayer = {
      season: gameState.currentSeason - 1,
      player: bestYoungCandidates[0].id
    };
  }
  
  // Most Assists
  const assistLeaders = _.sortBy(players, p => -p.assists);
  if (assistLeaders.length > 0) {
    gameState.awards.mostAssists = {
      season: gameState.currentSeason - 1,
      player: assistLeaders[0].id,
      assists: assistLeaders[0].assists
    };
  }
  
  // Best Defender
  const defenderCandidates = _.sortBy(
    players.filter(p => p.position === 'Defensor' && p.matchesPlayed >= 20),
    p => -p.averagePerformance
  );
  
  if (defenderCandidates.length > 0) {
    gameState.awards.bestDefender = {
      season: gameState.currentSeason - 1,
      player: defenderCandidates[0].id
    };
  }
  
  // Top Scorers for statistics
  gameState.statistics.topScorers = players
    .filter(p => p.goals > 0)
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 20)
    .map(p => ({
      season: gameState.currentSeason - 1,
      id: p.id,
      name: p.name,
      club: p.club,
      goals: p.goals,
      matches: p.matchesPlayed
    }));
};

// Process promotions and relegations
const processPromotionsRelegations = (gameState) => {
  // Group clubs by country for promotion/relegation
  const leaguesByCountry = {};
  
  // Group leagues by country
  Object.keys(gameState.leagues).forEach(leagueName => {
    const country = leagueName.split(' ')[0];
    
    if (!leaguesByCountry[country]) {
      leaguesByCountry[country] = {};
    }
    
    if (leagueName.includes('1ª')) {
      leaguesByCountry[country]['1ª'] = leagueName;
    } else if (leagueName.includes('2ª')) {
      leaguesByCountry[country]['2ª'] = leagueName;
    } else if (leagueName.includes('3ª')) {
      leaguesByCountry[country]['3ª'] = leagueName;
    }
  });
  
  // Process each country
  Object.keys(leaguesByCountry).forEach(country => {
    const divisions = leaguesByCountry[country];
    
    // Relegate from 1st to 2nd division
    if (divisions['1ª'] && divisions['2ª']) {
      const firstDivTable = _.sortBy(gameState.leagues[divisions['1ª']], 'points');
      const relegationCandidates = firstDivTable.slice(0, 3); // Bottom 3 teams
      
      relegationCandidates.forEach(team => {
        const club = gameState.clubs.find(c => c.name === team.name);
        if (club) {
          club.league = `${country} 2ª Divisão`;
        }
      });
    }
    
    // Promote from 2nd to 1st division
    if (divisions['2ª'] && divisions['1ª']) {
      const secondDivTable = _.sortBy(gameState.leagues[divisions['2ª']], team => -team.points);
      const promotionCandidates = secondDivTable.slice(0, 3); // Top 3 teams
      
      promotionCandidates.forEach(team => {
        const club = gameState.clubs.find(c => c.name === team.name);
        if (club) {
          club.league = `${country} 1ª Divisão`;
        }
      });
    }
    
    // Relegate from 2nd to 3rd division
    if (divisions['2ª'] && divisions['3ª']) {
      const secondDivTable = _.sortBy(gameState.leagues[divisions['2ª']], 'points');
      const relegationCandidates = secondDivTable.slice(0, 3); // Bottom 3 teams
      
      relegationCandidates.forEach(team => {
        const club = gameState.clubs.find(c => c.name === team.name);
        if (club) {
          club.league = `${country} 3ª Divisão`;
        }
      });
    }
    
    // Promote from 3rd to 2nd division
    if (divisions['3ª'] && divisions['2ª']) {
      const thirdDivTable = _.sortBy(gameState.leagues[divisions['3ª']], team => -team.points);
      const promotionCandidates = thirdDivTable.slice(0, 3); // Top 3 teams
      
      promotionCandidates.forEach(team => {
        const club = gameState.clubs.find(c => c.name === team.name);
        if (club) {
          club.league = `${country} 2ª Divisão`;
        }
      });
    }
  });
  
  // Regenerate league tables based on updated club leagues
  gameState.leagues = generateLeagueTables(gameState.clubs);
};

// Update player progression at the end of season
const updatePlayerProgression = (gameState) => {
  gameState.players.forEach(player => {
    // Age
    player.age += 1;
    
    // Calculate development factor
    let developmentFactor = 0;
    
    // Age-based development
    if (player.age < 23) {
      // Young players develop faster
      developmentFactor += 3;
    } else if (player.age < 28) {
      // Prime age still develops
      developmentFactor += 1;
    } else if (player.age < 32) {
      // Late prime - minimal development
      developmentFactor += 0.5;
    } else {
      // Decline phase
      developmentFactor -= (player.age - 31) * 0.5;
    }
    
    // Performance-based development
    if (player.averagePerformance > 7.5) {
      developmentFactor += 2;
    } else if (player.averagePerformance > 6.5) {
      developmentFactor += 1;
    }
    
    // Playing time factor
    if (player.matchesPlayed > 30) {
      developmentFactor += 1;
    } else if (player.matchesPlayed > 20) {
      developmentFactor += 0.5;
    } else if (player.matchesPlayed < 10) {
      developmentFactor -= 1;
    }
    
    // Special development for players with development plans
    if (player.developmentPlan) {
      // Additional boost to focused attributes
      const attribute = player.developmentPlan.toLowerCase();
      if (player.attributes[attribute]) {
        player.attributes[attribute] = Math.min(99, player.attributes[attribute] + Math.floor(Math.random() * 3) + 1);
      }
    }
    
    // Apply development to overall rating
    if (player.overall < player.hiddenPotential) {
      player.overall = Math.min(player.hiddenPotential, player.overall + developmentFactor);
    } else if (player.age > 31) {
      // Decline for older players
      player.overall = Math.max(50, player.overall + developmentFactor);
    }
    
    // Update attributes based on development
    Object.keys(player.attributes).forEach(attr => {
      if (developmentFactor > 0 && player.attributes[attr] < 99) {
        // Improvement
        player.attributes[attr] = Math.min(99, player.attributes[attr] + (developmentFactor * 0.7 * Math.random()));
      } else if (developmentFactor < 0) {
        // Decline
        player.attributes[attr] = Math.max(1, player.attributes[attr] + (developmentFactor * 0.7 * Math.random()));
      }
    });
    
    // Update market value
    const positionValueMultiplier = {
      'Goleiro': 0.9,
      'Defensor': 1.0,
      'Meio-Campo': 1.2,
      'Atacante': 1.5
    }[player.position];
    
    const valueBase = Math.pow(player.overall, 3) / player.age;
    const potentialValue = (player.potential - player.overall) * 100000;
    player.value = (valueBase + potentialValue) * positionValueMultiplier;
    
    // Update salary (5% of value as annual salary)
    player.salary = player.value * 0.05;
    player.weeklySalary = player.salary / 52;
  });
};

// Reset season statistics
const resetSeasonStats = (gameState) => {
  // Reset club stats
  gameState.clubs.forEach(club => {
    club.points = 0;
    club.goalsFor = 0;
    club.goalsAgainst = 0;
    club.budget = club.originalBudget; // Reset budget
  });
  
  // Reset player stats
  gameState.players.forEach(player => {
    player.goals = 0;
    player.assists = 0;
    player.cleanSheets = 0;
    player.matchesPlayed = 0;
    player.yellowCards = 0;
    player.redCards = 0;
    player.performances = [];
    player.averagePerformance = 0;
    // Don't reset form/morale/injuries - carry these over
  });
  
  // Create new league tables
  gameState.leagues = generateLeagueTables(gameState.clubs);
};

// Update transfer window status
const updateTransferWindowStatus = (gameState) => {
  const week = gameState.currentWeek;
  
  // Summer transfer window: weeks 1-4
  // Winter transfer window: weeks 20-24
  if ((week >= 1 && week <= 4) || (week >= 20 && week <= 24)) {
    if (!gameState.transferWindow) {
      // Transfer window opening
      gameState.transferWindow = true;
      
      // Add notification
      gameState.notifications.push({
        id: gameState.notifications.length + 1,
        type: 'transferWindow',
        message: `The transfer window is now open! Time to make deals for ${week < 10 ? 'the new season' : 'the second half of the season'}.`,
        read: false,
        timestamp: new Date().toISOString()
      });
    }
  } else if (gameState.transferWindow) {
    // Transfer window closing
    gameState.transferWindow = false;
    
    // Add notification
    gameState.notifications.push({
      id: gameState.notifications.length + 1,
      type: 'transferWindow',
      message: 'The transfer window has closed. You\'ll need to wait until the next window to make transfers.',
      read: false,
      timestamp: new Date().toISOString()
    });
  }
};

// Generate offers for the agent
const generateAgentOffers = (gameState) => {
  // Chance of new offers depends on agent reputation
  const reputation = gameState.agent.reputation;
  const chanceOfOffer = 0.1 + (reputation / 200); // 0.1 to 0.6 based on reputation
  
  if (Math.random() < chanceOfOffer) {
    // Find potential players who might approach the agent
    const potentialClients = gameState.players.filter(p => 
      !p.agent && // Not already represented
      p.overall < reputation * 1.5 && // Within agent's reputation range
      p.overall > Math.max(50, reputation * 0.7) && // Not too low quality
      Math.random() < 0.3 // Random factor
    );
    
    if (potentialClients.length > 0) {
      // Select a random player
      const player = _.sample(potentialClients);
      
      // Add to offered players
      gameState.agent.offeredPlayers.push(player.id);
      
      // Add notification
      gameState.notifications.push({
        id: gameState.notifications.length + 1,
        type: 'playerOffer',
        message: `${player.name} (${player.position}, ${player.overall} OVR) is looking for an agent and is interested in your services.`,
        read: false,
        playerId: player.id,
        timestamp: new Date().toISOString()
      });
    }
  }
};

// Process player contract status
const processContractStatus = (gameState) => {
  gameState.players.forEach(player => {
    // Decrease years remaining
    if (player.contract.yearsRemaining > 0) {
      player.contract.yearsRemaining -= 1;
    }
    
    // If contract is expiring
    if (player.contract.yearsRemaining === 0) {
      // Club offers renewal based on player quality and club finances
      const club = gameState.clubs.find(c => c.name === player.club);
      
      if (club && player.overall > 70) {
        // High-quality player - club tries to renew
        const renewalChance = 0.7 + (player.morale / 200) - (player.age > 30 ? (player.age - 30) * 0.05 : 0);
        
        if (Math.random() < renewalChance) {
          // Club offers renewal
          const newDuration = Math.floor(Math.random() * 3) + 1; // 1-3 years
          player.contract.yearsRemaining = newDuration;
          
          // Adjust salary
          player.salary = player.value * 0.05 * (1 + Math.random() * 0.2); // 5-6% of value
          player.weeklySalary = player.salary / 52;
          
          // Add notification if agent's client
          if (player.agent === gameState.agent.name) {
            gameState.notifications.push({
              id: gameState.notifications.length + 1,
              type: 'contractRenewal',
              message: `${player.name} has renewed their contract with ${player.club} for ${newDuration} more years at €${(player.weeklySalary/1000).toFixed(1)}K per week.`,
              read: false,
              playerId: player.id,
              timestamp: new Date().toISOString()
            });
          }
        } else {
          // Contract expired - player becomes free agent
          makePlayerFreeAgent(gameState, player);
        }
      } else {
        // Lower quality or older player - more likely to be released
        makePlayerFreeAgent(gameState, player);
      }
    }
  });
};

// Make player a free agent
const makePlayerFreeAgent = (gameState, player) => {
  // Store old club for reference
  const oldClub = player.club;
  
  // Make player a free agent
  player.club = 'Free Agent';
  
  // Add notification if agent's client
  if (player.agent === gameState.agent.name) {
    gameState.notifications.push({
      id: gameState.notifications.length + 1,
      type: 'contractExpiry',
      message: `${player.name}'s contract with ${oldClub} has expired. They are now a free agent.`,
      read: false,
      playerId: player.id,
      timestamp: new Date().toISOString()
    });
  }
};

// Transfer a player between clubs
export const transferPlayer = (gameState, player, targetClub, fee) => {
  // Verify player and clubs exist
  const sourceClub = gameState.clubs.find(c => c.name === player.club);
  const destClub = gameState.clubs.find(c => c.name === targetClub);
  
  if (!player || !sourceClub || !destClub) {
    return {
      success: false,
      message: 'Could not complete transfer: Invalid player or club'
    };
  }
  
  // Check if transfer window is open
  if (!gameState.transferWindow) {
    return {
      success: false,
      message: 'Could not complete transfer: Transfer window is closed'
    };
  }
  
  // Check if target club can afford the transfer
  if (destClub.budget < fee) {
    return {
      success: false,
      message: `${targetClub} cannot afford the transfer fee of €${(fee/1000000).toFixed(1)}M`
    };
  }
  
  // Execute the transfer
  // Update source club budget
  sourceClub.budget += fee * 0.95; // 5% goes to fees
  
  // Update target club budget
  destClub.budget -= fee;
  
  // Update player's club
  player.club = targetClub;
  
  // New contract details
  player.contract.yearsRemaining = Math.floor(Math.random() * 3) + 2; // 2-4 years
  player.salary = player.value * 0.05 * (1 + Math.random() * 0.3); // 5-6.5% of value
  player.weeklySalary = player.salary / 52;
  
  // Add to transfer history
  gameState.statistics.transfers.push({
    season: gameState.currentSeason,
    player: player.id,
    playerName: player.name,
    fromClub: sourceClub.name,
    toClub: targetClub,
    fee,
    date: `Season ${gameState.currentSeason}, Week ${gameState.currentWeek}`
  });
  
  // If player is agent's client, calculate commission
  if (player.agent === gameState.agent.name) {
    const commissionRate = 0.08; // 8% standard commission
    const commission = fee * commissionRate;
    
    // Add commission to agent's balance
    gameState.agent.balance += commission;
    
    // Increase agent reputation based on transfer size
    const reputationBoost = Math.log10(fee) - 3; // Logarithmic scaling
    gameState.agent.reputation += Math.max(1, Math.min(5, reputationBoost));
    
    // Cap reputation at 100
    gameState.agent.reputation = Math.min(100, gameState.agent.reputation);
    
    // Add notification
    gameState.notifications.push({
      id: gameState.notifications.length + 1,
      type: 'transferComplete',
      message: `Transfer complete! ${player.name} has moved to ${targetClub} for €${(fee/1000000).toFixed(1)}M. Your commission: €${(commission/1000000).toFixed(1)}M`,
      read: false,
      playerId: player.id,
      timestamp: new Date().toISOString()
    });
  } else {
    // Add notification for non-client transfers
    gameState.notifications.push({
      id: gameState.notifications.length + 1,
      type: 'transferNews',
      message: `Transfer news: ${player.name} has moved from ${sourceClub.name} to ${targetClub} for €${(fee/1000000).toFixed(1)}M.`,
      read: false,
      timestamp: new Date().toISOString()
    });
  }
  
  return {
    success: true,
    message: `Transfer complete! ${player.name} has moved to ${targetClub} for €${(fee/1000000).toFixed(1)}M.`,
    commission: player.agent === gameState.agent.name ? fee * 0.08 : 0
  };
};

// Get team of the season
export const getTeamOfSeason = (gameState) => {
  const players = gameState.players;
  
  // Find best player in each position based on performances
  const goalkeeper = _.sortBy(
    players.filter(p => p.position === 'Goleiro' && p.matchesPlayed >= 20),
    p => -p.averagePerformance
  )[0];
  
  const defenders = _.sortBy(
    players.filter(p => p.position === 'Defensor' && p.matchesPlayed >= 20),
    p => -p.averagePerformance
  ).slice(0, 4);
  
  const midfielders = _.sortBy(
    players.filter(p => p.position === 'Meio-Campo' && p.matchesPlayed >= 20),
    p => -p.averagePerformance
  ).slice(0, 4);
  
  const forwards = _.sortBy(
    players.filter(p => p.position === 'Atacante' && p.matchesPlayed >= 20),
    p => -p.averagePerformance
  ).slice(0, 2);
  
  return {
    goalkeeper,
    defenders,
    midfielders,
    forwards
  };
};

// Arrange training for a player
export const trainPlayer = (gameState, playerId, attribute, intensity = 'normal') => {
  const player = gameState.players.find(p => p.id === playerId);
  
  if (!player) {
    return {
      success: false,
      message: 'Player not found'
    };
  }
  
  // Check if player is agent's client
  if (player.agent !== gameState.agent.name) {
    return {
      success: false,
      message: 'You can only arrange training for your own clients'
    };
  }
  
  // Set development plan
  player.developmentPlan = attribute;
  
  // Training has immediate small effect
  const attr = attribute.toLowerCase();
  if (player.attributes[attr]) {
    // Training intensity affects cost and effectiveness
    let effectiveness = 0;
    let cost = 0;
    
    if (intensity === 'light') {
      effectiveness = 1;
      cost = 5000;
    } else if (intensity === 'normal') {
      effectiveness = 2;
      cost = 10000;
    } else if (intensity === 'intense') {
      effectiveness = 3;
      cost = 20000;
    }
    
    // Check if agent can afford it
    if (gameState.agent.balance < cost) {
      return {
        success: false,
        message: `Not enough funds. Training costs €${cost.toFixed(0)}`
      };
    }
    
    // Apply training
    player.attributes[attr] = Math.min(99, player.attributes[attr] + effectiveness);
    
    // Recalculate overall based on updated attribute
    recalculatePlayerOverall(player);
    
    // Deduct cost
    gameState.agent.balance -= cost;
    
    return {
      success: true,
      message: `${player.name} has started training to improve ${attribute}. Their ${attribute} rating increased to ${player.attributes[attr]}.`,
      newRating: player.attributes[attr],
      cost
    };
  }
  
  return {
    success: false,
    message: `Cannot train ${attribute} for this player`
  };
};

// Recalculate player overall rating based on attributes
const recalculatePlayerOverall = (player) => {
  const weights = ATTRIBUTE_WEIGHTS[player.position];
  let overallRating = 0;
  let totalWeight = 0;
  
  Object.entries(weights).forEach(([attribute, weight]) => {
    const attrName = attribute.toLowerCase();
    if (player.attributes[attrName]) {
      overallRating += player.attributes[attrName] * weight;
      totalWeight += weight;
    }
  });
  
  player.overall = Math.floor(overallRating / totalWeight);
};

// Recruit a player to become agent's client
export const recruitPlayer = (gameState, playerId) => {
  const player = gameState.players.find(p => p.id === playerId);
  
  if (!player) {
    return {
      success: false,
      message: 'Player not found'
    };
  }
  
  // Check if player already has an agent
  if (player.agent && player.agent !== gameState.agent.name) {
    return {
      success: false,
      message: `${player.name} already has an agent: ${player.agent}`
    };
  }
  
  // Check if player is in offered players list
  if (!gameState.agent.offeredPlayers.includes(playerId) && !player.agent) {
    // Chance based on reputation difference
    const reputationDifference = gameState.agent.reputation - (player.overall / 1.5);
    const recruitChance = 0.1 + (reputationDifference / 100);
    
    if (Math.random() > recruitChance) {
      return {
        success: false,
        message: `${player.name} is not interested in your services at this time.`
      };
    }
  }
  
  // Assign player to agent
  player.agent = gameState.agent.name;
  
  // Add to agent's clients
  if (!gameState.agent.clients.includes(playerId)) {
    gameState.agent.clients.push(playerId);
  }
  
  // Remove from offered players if present
  gameState.agent.offeredPlayers = gameState.agent.offeredPlayers.filter(id => id !== playerId);
  
  return {
    success: true,
    message: `${player.name} is now your client!`
  };
};

export default {
  saveGame,
  loadGame,
  initializeNewGame,
  simulateWeek,
  transferPlayer,
  trainPlayer,
  recruitPlayer,
  getTeamOfSeason
};