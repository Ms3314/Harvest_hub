import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <span className="mr-2">←</span>
                Home
              </Link>
              <Link to="/marketplace" className="text-gray-600 hover:text-gray-900">
                Marketplace
              </Link>
              <Link to="/marketplace/sell" className="text-gray-600 hover:text-gray-900">
                Sell
              </Link>
              <Link to="/marketplace/purchases" className="text-gray-600 hover:text-gray-900">
                Purchases
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
