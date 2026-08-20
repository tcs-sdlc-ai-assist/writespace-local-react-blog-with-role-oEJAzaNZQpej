import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated, isAdmin } from '../utils/auth'

/**
 * ProtectedRoute component that guards routes based on authentication and role
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {boolean} [props.requireAdmin=false] - Whether admin role is required
 * @param {string} [props.redirectTo='/login'] - Path to redirect to if not authorized
 * @returns {JSX.Element} Either children or redirect
 */
function ProtectedRoute({ children, requireAdmin = false, redirectTo = '/login' }) {
  const location = useLocation()
  const isAuth = isAuthenticated()

  if (!isAuth) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requireAdmin: PropTypes.bool,
  redirectTo: PropTypes.string
}

export default ProtectedRoute