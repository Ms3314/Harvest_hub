import { Outlet } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const MarketplaceOutlet = () => {
  return (
    <>
    <Navbar />
    <div className='flex flex-col justify-center items-center'>
        {/* the navbar  */}
        
        {/* the data that is nested */}
        <Outlet /> 
    </div>
    </>
  );
};

export default MarketplaceOutlet;
