import PropTypes from 'prop-types'
import { isAdmin } from '../utils/auth'

/**
 * Get avatar emoji based on user role
 * @param {boolean} role - User role (true for admin, false for user)
 * @returns {string} Emoji representing the role
 */
export function getAvatar(role) {
  return role ? '👑' : '📖'
}

/**
 * Avatar component that displays role-based emoji
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.userId] - User ID to check admin status
 * @returns {JSX.Element} Avatar component
 */
function Avatar({ className = '', userId }) {
  const role = userId ? isAdmin() : false

  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 ${className}`}>
      <span className="text-lg">{getAvatar(role)}</span>
    </div>
  )
}

Avatar.propTypes = {
  className: PropTypes.string,
  userId: PropTypes.string
}

export default Avatar