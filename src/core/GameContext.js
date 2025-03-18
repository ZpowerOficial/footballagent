// src/core/GameContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import { saveGame, loadCurrentGame, loadSavedGame } from './storage';
import gameEngine from './GameEngine';

// Create the context
export const GameContext = createContext();

// Initial state
const initialState = {
  gameInitialized: false,
  gameState: {
    agent: {
      name: '',
      balance: 0,
      reputation: 0,
      clients: [],
      offeredPlayers: []
    },
    currentWeek: 1,
    currentSeason: 1,
    transferWindow: false,
    clubs: [],
    players: [],
    leagues: {},
    notifications: [],
    lastUpdate: '',
    settings: {
      difficulty: 'normal',
      autoSave: true,
      simulationSpeed: 'normal'
    },
    awards: {},
    statistics: {
      transfers: [],
      topScorers: []
    }
  },
  loading: false,
  notification: null,
  modalData: null,
  currentView: 'dashboard'
};

// Reducer function
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return {
        ...state,
        gameInitialized: true,
        gameState: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        modalData: action.payload
      };
    case 'HIDE_MODAL':
      return {
        ...state,
        modalData: null
      };
    case 'SET_CURRENT_VIEW':
      return {
        ...state,
        currentView: action.payload
      };
    default:
      return state;
  }
};

// Create provider component
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load saved game on initial mount
  useEffect(() => {
    const savedGame = loadCurrentGame();
    if (savedGame) {
      dispatch({ type: 'SET_GAME_STATE', payload: savedGame });
    }
  }, []);

  // Start a new game
  const startNewGame = (agentName, difficulty = 'normal') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Initialize new game with the game engine
    const newGameState = gameEngine.initializeNewGame(agentName, difficulty);
    
    dispatch({ type: 'SET_GAME_STATE', payload: newGameState });
    dispatch({ type: 'SET_LOADING', payload: false });
    
    // Show welcome notification
    showNotification({
      type: 'success',
      message: `Welcome, Agent ${agentName}! Your career has begun.`
    });
  };

  // Load a saved game
  const loadSavedGame = (saveData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    const loadedGame = typeof saveData === 'string' 
      ? loadSavedGame(saveData)        // Load by ID
      : saveData.gameState || saveData; // Direct game state object
    
    if (loadedGame) {
      dispatch({ type: 'SET_GAME_STATE', payload: loadedGame });
      showNotification({
        type: 'success',
        message: 'Game loaded successfully!'
      });
    } else {
      showNotification({
        type: 'error',
        message: 'Failed to load game. The save file may be corrupted.'
      });
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  // Save current game state
  const saveCurrentGame = (saveName = '') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    const saveResult = saveGame(state.gameState, saveName);
    
    if (saveResult) {
      showNotification({
        type: 'success',
        message: 'Game saved successfully!'
      });
    } else {
      showNotification({
        type: 'error',
        message: 'Failed to save game. Please try again.'
      });
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  // Simulate week
  const simulateWeek = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    const simulationResult = gameEngine.simulateWeek(state.gameState);
    
    // Update game state after simulation
    dispatch({ type: 'SET_GAME_STATE', payload: { ...state.gameState } });
    
    dispatch({ type: 'SET_LOADING', payload: false });
    
    return simulationResult;
  };

  // Handle player transfer
  const transferPlayer = (player, targetClub, fee) => {
    const result = gameEngine.transferPlayer(state.gameState, player, targetClub, fee);
    
    if (result.success) {
      // Update game state after transfer
      dispatch({ type: 'SET_GAME_STATE', payload: { ...state.gameState } });
      
      showNotification({
        type: 'success',
        message: result.message
      });
    } else {
      showNotification({
        type: 'error',
        message: result.message
      });
    }
    
    return result;
  };

  // Train player
  const trainPlayer = (playerId, attribute, intensity) => {
    const result = gameEngine.trainPlayer(state.gameState, playerId, attribute, intensity);
    
    if (result.success) {
      // Update game state after training
      dispatch({ type: 'SET_GAME_STATE', payload: { ...state.gameState } });
      
      showNotification({
        type: 'success',
        message: result.message
      });
    } else {
      showNotification({
        type: 'error',
        message: result.message
      });
    }
    
    return result;
  };

  // Recruit player as client
  const recruitPlayer = (playerId) => {
    const result = gameEngine.recruitPlayer(state.gameState, playerId);
    
    if (result.success) {
      // Update game state after recruitment
      dispatch({ type: 'SET_GAME_STATE', payload: { ...state.gameState } });
      
      showNotification({
        type: 'success',
        message: result.message
      });
    } else {
      showNotification({
        type: 'error',
        message: result.message
      });
    }
    
    return result;
  };

  // Show notification
  const showNotification = (notification) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: notification });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', payload: null });
    }, 3000);
  };

  // Show modal
  const showModal = (modalData) => {
    dispatch({ type: 'SHOW_MODAL', payload: modalData });
  };

  // Hide modal
  const hideModal = () => {
    dispatch({ type: 'HIDE_MODAL' });
  };

  // Set current view
  const setCurrentView = (view) => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: view });
  };

  // Context value
  const contextValue = {
    state,
    startNewGame,
    loadSavedGame,
    saveCurrentGame,
    simulateWeek,
    transferPlayer,
    trainPlayer,
    recruitPlayer,
    showNotification,
    setNotification: (notification) => dispatch({ type: 'SET_NOTIFICATION', payload: notification }),
    showModal,
    hideModal,
    setCurrentView
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};