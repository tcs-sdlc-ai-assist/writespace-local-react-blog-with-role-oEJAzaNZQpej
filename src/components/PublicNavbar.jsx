import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'
import Avatar from './Avatar'

/**
 * PublicNavbar component for guest and authenticated users
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Navbar component
 */
function PublicNavbar({ className = '' }) {
  const isAuth = isAuthenticated()

  return (
    <nav className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600">WriteSpace</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuth ? (
              <>
                <Avatar userId="current" />
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                >
                  Go to Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

PublicNavbar.propTypes = {
  className: PropTypes.string
}

export default PublicNavbar