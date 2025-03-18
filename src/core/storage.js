// src/core/storage.js

// Save game data to localStorage
export const saveToLocalStorage = (key, data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };
  
  // Load game data from localStorage
  export const loadFromLocalStorage = (key) => {
    try {
      const serializedData = localStorage.getItem(key);
      if (!serializedData) return null;
      return JSON.parse(serializedData);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  };
  
  // Save a game to the saves list
  export const saveGame = (gameState, saveName = '') => {
    try {
      // Generate save data
      const saveData = {
        id: Date.now().toString(),
        name: saveName || `Save - Season ${gameState.currentSeason}, Week ${gameState.currentWeek}`,
        date: new Date().toISOString(),
        details: {
          agent: gameState.agent.name,
          balance: gameState.agent.balance,
          reputation: gameState.agent.reputation,
          season: gameState.currentSeason,
          week: gameState.currentWeek,
          clients: gameState.agent.clients.length
        },
        gameState // Store the full game state
      };
      
      // Get existing saves
      const existingSaves = loadFromLocalStorage('footballAgentSaves') || [];
      
      // Add new save to the list
      const updatedSaves = [...existingSaves, saveData];
      
      // Save the updated list
      saveToLocalStorage('footballAgentSaves', updatedSaves);
      
      // Also save as current game
      saveToLocalStorage('footballAgentCurrentGame', gameState);
      
      return saveData;
    } catch (error) {
      console.error('Error saving game:', error);
      return null;
    }
  };
  
  // Load the most recent game state
  export const loadCurrentGame = () => {
    return loadFromLocalStorage('footballAgentCurrentGame');
  };
  
  // Load a specific saved game
  export const loadSavedGame = (saveId) => {
    try {
      // Get existing saves
      const existingSaves = loadFromLocalStorage('footballAgentSaves') || [];
      
      // Find the requested save
      const saveData = existingSaves.find(save => save.id === saveId);
      
      if (!saveData) {
        return null;
      }
      
      // Save as current game
      saveToLocalStorage('footballAgentCurrentGame', saveData.gameState);
      
      return saveData.gameState;
    } catch (error) {
      console.error('Error loading saved game:', error);
      return null;
    }
  };
  
  // Delete a saved game
  export const deleteSavedGame = (saveId) => {
    try {
      // Get existing saves
      const existingSaves = loadFromLocalStorage('footballAgentSaves') || [];
      
      // Filter out the save to delete
      const updatedSaves = existingSaves.filter(save => save.id !== saveId);
      
      // Save the updated list
      saveToLocalStorage('footballAgentSaves', updatedSaves);
      
      return true;
    } catch (error) {
      console.error('Error deleting saved game:', error);
      return false;
    }
  };
  
  // Export a save to JSON
  export const exportSaveToJSON = (saveId) => {
    try {
      // Get existing saves
      const existingSaves = loadFromLocalStorage('footballAgentSaves') || [];
      
      // Find the requested save
      const saveData = existingSaves.find(save => save.id === saveId);
      
      if (!saveData) {
        return null;
      }
      
      // Return the save data as JSON string
      return JSON.stringify(saveData);
    } catch (error) {
      console.error('Error exporting save:', error);
      return null;
    }
  };
  
  // Import a save from JSON
  export const importSaveFromJSON = (jsonString) => {
    try {
      // Parse the JSON string
      const saveData = JSON.parse(jsonString);
      
      // Validate the save data structure
      if (!saveData.id || !saveData.name || !saveData.date || !saveData.gameState) {
        throw new Error('Invalid save file format');
      }
      
      // Generate a new ID to prevent duplicates
      saveData.id = Date.now().toString();
      
      // Get existing saves
      const existingSaves = loadFromLocalStorage('footballAgentSaves') || [];
      
      // Add imported save to the list
      const updatedSaves = [...existingSaves, saveData];
      
      // Save the updated list
      saveToLocalStorage('footballAgentSaves', updatedSaves);
      
      return saveData;
    } catch (error) {
      console.error('Error importing save:', error);
      return null;
    }
  };
  
  // Get all saved games
  export const getAllSavedGames = () => {
    return loadFromLocalStorage('footballAgentSaves') || [];
  };
  
  // Set auto-save interval
  export const setAutoSave = (gameState, intervalMinutes = 15) => {
    // Clear any existing auto-save interval
    if (window._autoSaveInterval) {
      clearInterval(window._autoSaveInterval);
    }
    
    // Set up new auto-save interval
    window._autoSaveInterval = setInterval(() => {
      saveGame(gameState, 'Auto-save');
      console.log('Game auto-saved');
    }, intervalMinutes * 60 * 1000);
    
    return true;
  };
  
  // Clear auto-save interval
  export const clearAutoSave = () => {
    if (window._autoSaveInterval) {
      clearInterval(window._autoSaveInterval);
      window._autoSaveInterval = null;
    }
  };