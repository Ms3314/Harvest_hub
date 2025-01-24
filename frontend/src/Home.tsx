import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Only show sidebar on non-marketplace pages

  
  return (
    <div className="min-h-screen bg-gray-50">
      <main
        className={`transition-all duration-300 `}
      >
        <Sidebar  onToggle={toggleSidebar} isOpen={isSidebarOpen}  />
      </main> 
    </div>
  );
};

export default Home; 