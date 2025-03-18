// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Core components
import { GameProvider, useGameContext } from './core/GameContext';

// UI Components
import Dashboard from './components/Dashboard';
import PlayerManagement from './components/PlayerManagement';
import TransferMarket from './components/TransferMarket';
import AwardsStatistics from './components/AwardsStatistics';
import ClubView from './components/ClubView';
import SimulationScreen from './components/SimulationScreen';
import NegotiationSystem from './components/NegotiationSystem';
import TrainingDevelopment from './components/TrainingDevelopment';
import SettingsSystem from './components/SettingsSystem';

// Navigation and layout components
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import LoadingOverlay from './components/common/LoadingOverlay';
import NotificationToast from './components/common/NotificationToast';
import Modal from './components/common/Modal';

function MainApp() {
  const { state, setCurrentView } = useGameContext();
  const { gameInitialized, gameState, loading, notification, modalData, currentView } = state;

  // Handle route changes to update current view
  const handleRouteChange = (view) => {
    setCurrentView(view);
  };

  // If game is not initialized, show welcome screen
  if (!gameInitialized) {
    return <WelcomeScreen />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top navbar */}
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation */}
        <Sidebar currentView={currentView} onNavigate={handleRouteChange} />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route 
              path="/dashboard" 
              element={<Dashboard />} 
            />
            <Route 
              path="/players" 
              element={<PlayerManagement />} 
            />
            <Route 
              path="/transfer-market" 
              element={<TransferMarket />} 
            />
            <Route 
              path="/awards-statistics" 
              element={<AwardsStatistics />} 
            />
            <Route 
              path="/club/:id" 
              element={<ClubView />} 
            />
            <Route 
              path="/simulation" 
              element={<SimulationScreen />} 
            />
            <Route 
              path="/negotiation/:playerId/:clubId" 
              element={<NegotiationSystem />} 
            />
            <Route 
              path="/training" 
              element={<TrainingDevelopment />} 
            />
            <Route 
              path="/settings" 
              element={<SettingsSystem />} 
            />
          </Routes>
        </main>
      </div>
      
      {/* Loading overlay */}
      {loading && <LoadingOverlay />}
      
      {/* Notification toast */}
      {notification && <NotificationToast notification={notification} />}
      
      {/* Modal system */}
      {modalData && <Modal {...modalData} />}
    </div>
  );
}

// Note the change from BrowserRouter to HashRouter for GitHub Pages compatibility
function App() {
  return (
    <Router>
      <GameProvider>
        <MainApp />
      </GameProvider>
    </Router>
  );
}

export default App;