import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MarketplacePage from './components/marketplace/MarketplacePage';
import InventoryPage from './components/inventory/InventoryPage';
import Home from './Home';
import MarketplaceOutlet from './components/layout/MarketplaceOutlet';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/signin" element={<div className="p-8">Sign In Page</div>} />
        <Route path="/signup" element={<div className="p-8">Sign Up Page</div>} />

        {/* Marketplace with Nested Routes */}
        <Route path="/marketplace" element={<MarketplaceOutlet />}>
          <Route index   element={<MarketplacePage/>}/> 
          <Route path="sell" element={<div className="p-8">Sell page coming soon...</div>} />
          <Route path="purchases" element={<div className="p-8">Purchases page coming soon...</div>} />
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
