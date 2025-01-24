import { Outlet } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const MarketplaceOutlet = () => {
  return (
    <div>
        {/* the navbar  */}
        <Navbar />
        {/* the data that is nested */}
        <Outlet /> 
    </div>
  );
};

export default MarketplaceOutlet;
