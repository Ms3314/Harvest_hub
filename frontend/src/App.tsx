import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import MarketplacePage from './components/marketplace/MarketplacePage';
import InventoryPage from './components/inventory/InventoryPage';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import MarketplaceOutlet from './components/layout/MarketplaceOutlet';
import ChatRoom from './components/marketplace/Chat/ChatRoom';
import SellComp from './components/marketplace/SellComp';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/marketplace" element={<MarketplaceOutlet />}>
          <Route index element={<MarketplacePage />} />
          <Route path="sell" element={<SellComp/>} />
          <Route path="purchases" element={<div className="p-8">Purchases page coming soon...</div>} />
          <Route path={`chat/orgid/roomid`} element={<ChatRoom />} />
        </Route>

        {/* Inventory Page */}
        <Route path="/inventory" element={<InventoryPage />} />

        {/* Profile Page */}
        <Route path="/profile" element={<div className="p-8">Profile page coming soon...</div>} />

        {/* Catch-all Route (404) */}
        <Route path="*" element={<div className="p-8">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
