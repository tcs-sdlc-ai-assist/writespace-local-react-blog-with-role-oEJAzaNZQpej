import PropTypes from 'prop-types'
import { useState } from 'react'
import { isAdmin, getSession } from '../utils/auth'
import Avatar from './Avatar'

/**
 * Format date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Get role badge color based on role
 * @param {boolean} role - User role (true for admin, false for user)
 * @returns {string} Background color class
 */
function getRoleBadgeColor(role) {
  return role ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
}

/**
 * Get role label based on role
 * @param {boolean} role - User role
 * @returns {string} Role label
 */
function getRoleLabel(role) {
  return role ? 'Admin' : 'User'
}

/**
 * UserRow component for displaying user information in a table row or card
 * @param {Object} props - Component props
 * @param {string} props.id - User ID
 * @param {string} props.username - User username
 * @param {string} props.displayName - User display name
 * @param {boolean} props.isAdmin - Whether user is admin
 * @param {string} props.createdAt - Creation timestamp
 * @param {Function} [props.onDelete] - Delete handler
 * @param {boolean} [props.isMobile=false] - Whether to render mobile layout
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} User row component
 */
function UserRow({ id, username, displayName, isAdmin: userIsAdmin, createdAt, onDelete, isMobile = false, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)
  const session = getSession()
  const currentUserIsAdmin = isAdmin()
  const isCurrentUser = session?.userId === id
  const canDelete = currentUserIsAdmin && !isCurrentUser

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id)
    }
  }

  if (isMobile) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 border border-gray-200 ${className}`}>
        <div className="flex items-start space-x-3">
          <Avatar userId={userIsAdmin ? 'admin' : id} className="flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-800">{displayName}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(userIsAdmin)}`}>
                {getRoleLabel(userIsAdmin)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">@{username}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
              {canDelete && (
                <button
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 transition-colors"
                  aria-label="Delete user"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <tr
      className={`transition-colors duration-150 ${isHovered ? 'bg-gray-50' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <Avatar userId={userIsAdmin ? 'admin' : id} />
          <div>
            <div className="text-sm font-medium text-gray-900">{displayName}</div>
            <div className="text-sm text-gray-500">@{username}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(userIsAdmin)}`}>
          {getRoleLabel(userIsAdmin)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        {canDelete && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 transition-colors"
            aria-label="Delete user"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </td>
    </tr>
  )
}

UserRow.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  isMobile: PropTypes.bool,
  className: PropTypes.string
}

UserRow.defaultProps = {
  isAdmin: false,
  isMobile: false
}

export default UserRow