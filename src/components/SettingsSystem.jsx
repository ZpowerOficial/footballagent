import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Upload, 
  Download, 
  Settings, 
  Volume2, 
  VolumeX, 
  Clock, 
  AlertCircle, 
  Check, 
  Trash2, 
  ChevronDown,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

const SettingsSystem = () => {
  // State for all game settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoPauseEnabled, setAutoPauseEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState('normal');
  const [saveSlots, setSaveSlots] = useState([]);
  const [selectedSaveSlot, setSelectedSaveSlot] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [saveName, setSaveName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Example game state (in a real app, this would come from context/state)
  const gameState = {
    agent: {
      name: "John Mendes",
      balance: 2500000,
      reputation: 65,
      clients: 2
    },
    currentWeek: 12,
    currentSeason: 1,
    autoSaveEnabled: true
  };
  
  // Load saved games on component mount
  useEffect(() => {
    loadSaveSlots();
  }, []);
  
  // Example function to load saved games from localStorage
  const loadSaveSlots = () => {
    try {
      const savedGames = localStorage.getItem('footballAgentSaves');
      if (savedGames) {
        setSaveSlots(JSON.parse(savedGames));
      } else {
        setSaveSlots([]);
      }
    } catch (error) {
      console.error('Failed to load save slots:', error);
      setSaveSlots([]);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  };
  
  // Format currency for display
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `€${(amount / 1000).toFixed(1)}K`;
    } else {
      return `€${amount.toFixed(0)}`;
    }
  };
  
  // Handle save game
  const handleSaveGame = () => {
    // In a real app, this would save the current game state
    
    const newSave = {
      id: Date.now().toString(),
      name: saveName || `Save - Season ${gameState.currentSeason}, Week ${gameState.currentWeek}`,
      date: new Date().toISOString(),
      screenshot: null, // Would be a base64 encoded image in a real game
      details: {
        agent: gameState.agent.name,
        balance: gameState.agent.balance,
        reputation: gameState.agent.reputation,
        season: gameState.currentSeason,
        week: gameState.currentWeek,
        clients: gameState.agent.clients
      }
    };
    
    const updatedSlots = [...saveSlots, newSave];
    setSaveSlots(updatedSlots);
    
    // Save to localStorage
    try {
      localStorage.setItem('footballAgentSaves', JSON.stringify(updatedSlots));
      
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Game saved successfully!'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Failed to save game:', error);
      
      // Show error notification
      setNotification({
        type: 'error',
        message: 'Failed to save game. Please try again.'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
    
    // Close save modal
    setShowSaveModal(false);
    setSaveName('');
  };
  
  // Handle load game
  const handleLoadGame = () => {
    if (!selectedSaveSlot) return;
    
    // In a real app, this would load the game state from the selected save
    
    // Show success notification
    setNotification({
      type: 'success',
      message: 'Game loaded successfully!'
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
    
    // Close load modal
    setShowLoadModal(false);
    setSelectedSaveSlot(null);
  };
  
  // Handle delete save
  const handleDeleteSave = () => {
    if (!selectedSaveSlot) return;
    
    // Confirm deletion
    setConfirmAction(() => () => {
      const updatedSlots = saveSlots.filter(save => save.id !== selectedSaveSlot.id);
      setSaveSlots(updatedSlots);
      
      // Save to localStorage
      try {
        localStorage.setItem('footballAgentSaves', JSON.stringify(updatedSlots));
        
        // Show success notification
        setNotification({
          type: 'success',
          message: 'Save deleted successfully!'
        });
        
        // Clear notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
      } catch (error) {
        console.error('Failed to delete save:', error);
        
        // Show error notification
        setNotification({
          type: 'error',
          message: 'Failed to delete save. Please try again.'
        });
        
        // Clear notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
      }
      
      setSelectedSaveSlot(null);
      setShowConfirmDialog(false);
    });
    
    setShowConfirmDialog(true);
  };
  
  // Export save data
  const handleExportSave = () => {
    if (!selectedSaveSlot) return;
    
    // Convert save data to a downloadable file
    const saveData = JSON.stringify(selectedSaveSlot);
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and click it to download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSaveSlot.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success notification
    setNotification({
      type: 'success',
      message: 'Save exported successfully!'
    });
    
    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };
  
  // Import save data
  const handleImportSave = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSave = JSON.parse(e.target.result);
        
        // Validate imported save
        if (!importedSave.id || !importedSave.name || !importedSave.date || !importedSave.details) {
          throw new Error('Invalid save file format');
        }
        
        // Generate a new ID to prevent duplicates
        importedSave.id = Date.now().toString();
        
        const updatedSlots = [...saveSlots, importedSave];
        setSaveSlots(updatedSlots);
        
        // Save to localStorage
        localStorage.setItem('footballAgentSaves', JSON.stringify(updatedSlots));
        
        // Show success notification
        setNotification({
          type: 'success',
          message: 'Save imported successfully!'
        });
      } catch (error) {
        console.error('Failed to import save:', error);
        
        // Show error notification
        setNotification({
          type: 'error',
          message: 'Failed to import save. Invalid file format.'
        });
      }
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    };
    
    reader.readAsText(file);
    
    // Reset the file input
    event.target.value = null;
  };
  
  // Save settings
  const saveSettings = () => {
    // In a real app, this would save all settings to localStorage or server
    
    const settings = {
      sound: soundEnabled,
      music: musicEnabled,
      notifications: notificationsEnabled,
      autoSave: autoSaveEnabled,
      autoPause: autoPauseEnabled,
      darkMode: darkModeEnabled,
      simulationSpeed
    };
    
    try {
      localStorage.setItem('footballAgentSettings', JSON.stringify(settings));
      
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Settings saved successfully!'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      
      // Show error notification
      setNotification({
        type: 'error',
        message: 'Failed to save settings. Please try again.'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };
  
  // Reset settings to defaults
  const resetSettings = () => {
    // Confirm reset
    setConfirmAction(() => () => {
      setSoundEnabled(true);
      setMusicEnabled(true);
      setNotificationsEnabled(true);
      setAutoSaveEnabled(true);
      setAutoPauseEnabled(true);
      setDarkModeEnabled(false);
      setSimulationSpeed('normal');
      
      // Save defaults to localStorage
      const defaultSettings = {
        sound: true,
        music: true,
        notifications: true,
        autoSave: true,
        autoPause: true,
        darkMode: false,
        simulationSpeed: 'normal'
      };
      
      localStorage.setItem('footballAgentSettings', JSON.stringify(defaultSettings));
      
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Settings reset to defaults!'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
      
      setShowConfirmDialog(false);
    });
    
    setShowConfirmDialog(true);
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings & Save Game</h1>
        <div className="flex space-x-3">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            onClick={() => setShowSaveModal(true)}
          >
            <Save className="w-5 h-5 mr-2" />
            Save Game
          </button>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            onClick={() => setShowLoadModal(true)}
          >
            <Upload className="w-5 h-5 mr-2" />
            Load Game
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-medium flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-500" />
              Game Settings
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Audio Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Audio</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Volume2 className="w-5 h-5 text-gray-500 mr-2" />
                      <span>Sound Effects</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={soundEnabled}
                        onChange={() => setSoundEnabled(!soundEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Volume2 className="w-5 h-5 text-gray-500 mr-2" />
                      <span>Background Music</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={musicEnabled}
                        onChange={() => setMusicEnabled(!musicEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Game Preferences */}
              <div>
                <h3 className="text-lg font-medium mb-4">Game Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-gray-500 mr-2" />
                      <span>Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Save className="w-5 h-5 text-gray-500 mr-2" />
                      <span>Auto-Save</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={autoSaveEnabled}
                        onChange={() => setAutoSaveEnabled(!autoSaveEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-500 mr-2" />
                      <span>Auto-Pause on Important Events</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={autoPauseEnabled}
                        onChange={() => setAutoPauseEnabled(!autoPauseEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Display Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Display</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>Dark Mode</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={darkModeEnabled}
                        onChange={() => setDarkModeEnabled(!darkModeEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Simulation Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Simulation</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Simulation Speed
                  </label>
                  <select
                    value={simulationSpeed}
                    onChange={(e) => setSimulationSpeed(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="very-slow">Very Slow</option>
                    <option value="slow">Slow</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                    <option value="very-fast">Very Fast</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 flex items-center"
                  onClick={resetSettings}
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Reset to Defaults
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={saveSettings}
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Game and Recent Saves */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-medium flex items-center">
              <Save className="w-5 h-5 mr-2 text-gray-500" />
              Recent Saves
            </h2>
          </div>
          <div className="p-6">
            {saveSlots.length > 0 ? (
              <div className="space-y-4 mb-6">
                {saveSlots
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(save => (
                    <div 
                      key={save.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedSaveSlot?.id === save.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSaveSlot(save)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{save.name}</h3>
                        <span className="text-sm text-gray-500">{formatDate(save.date)}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Agent:</span> {save.details.agent}
                        </div>
                        <div>
                          <span className="text-gray-500">Balance:</span> {formatCurrency(save.details.balance)}
                        </div>
                        <div>
                          <span className="text-gray-500">Season:</span> {save.details.season}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-8">
                <Save className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No saved games found.</p>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setShowSaveModal(true)}
                >
                  Create New Save
                </button>
              </div>
            )}
            
            {selectedSaveSlot && (
              <div className="flex flex-wrap gap-2 mt-4">
                <button 
                  className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center text-sm"
                  onClick={() => {
                    setSelectedSaveSlot(null);
                    setShowLoadModal(true);
                  }}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Load
                </button>
                <button 
                  className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 flex items-center text-sm"
                  onClick={handleDeleteSave}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
                <button 
                  className="px-3 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 flex items-center text-sm"
                  onClick={handleExportSave}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-medium mb-1">Import Save</h3>
                  <p className="text-sm text-gray-500">Import a previously exported save file.</p>
                </div>
                
                <div>
                  <label className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer">
                    <input 
                      type="file" 
                      accept=".json" 
                      className="sr-only" 
                      onChange={handleImportSave} 
                    />
                    <Upload className="w-5 h-5 inline-block mr-1" />
                    Import Save
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Game Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b">
              <h2 className="font-medium">Save Game</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Save Name
                </label>
                <input
                  type="text"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder={`Save - Season ${gameState.currentSeason}, Week ${gameState.currentWeek}`}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                <div className="flex">
                  <HelpCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    Your game will be saved with all current progress, including agent status, finances, and player details.
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => {
                    setShowSaveModal(false);
                    setSaveName('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                  onClick={handleSaveGame}
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Load Game Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b">
              <h2 className="font-medium">Load Game</h2>
            </div>
            <div className="p-6">
              {saveSlots.length > 0 ? (
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {saveSlots
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(save => (
                      <div 
                        key={save.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedSaveSlot?.id === save.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedSaveSlot(save)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{save.name}</h3>
                          <span className="text-sm text-gray-500">{formatDate(save.date)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Agent:</span> {save.details.agent}
                          </div>
                          <div>
                            <span className="text-gray-500">Season:</span> {save.details.season}
                          </div>
                          <div>
                            <span className="text-gray-500">Balance:</span> {formatCurrency(save.details.balance)}
                          </div>
                          <div>
                            <span className="text-gray-500">Week:</span> {save.details.week}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-8">
                  <Save className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No saved games found.</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => {
                    setShowLoadModal(false);
                    setSelectedSaveSlot(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                  onClick={handleLoadGame}
                  disabled={!selectedSaveSlot}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Load Game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b">
              <h2 className="font-medium">Confirm Action</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-center text-gray-700">
                  Are you sure you want to proceed? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => setShowConfirmDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => {
                    if (confirmAction) confirmAction();
                    else setShowConfirmDialog(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`rounded-lg shadow-lg p-4 flex items-center ${
            notification.type === 'success' ? 'bg-green-100 border border-green-200' :
            notification.type === 'error' ? 'bg-red-100 border border-red-200' :
            'bg-blue-100 border border-blue-200'
          }`}>
            {notification.type === 'success' ? (
              <Check className="w-5 h-5 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            )}
            <span className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {notification.message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSystem;