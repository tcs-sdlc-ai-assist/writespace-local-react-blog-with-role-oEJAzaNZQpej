import PropTypes from 'prop-types'

/**
 * Get colorful background class based on icon name
 * @param {string} iconName - Icon identifier
 * @returns {string} Background color class
 */
function getIconBgColor(iconName) {
  const colors = {
    users: 'bg-blue-100',
    posts: 'bg-green-100',
    comments: 'bg-yellow-100',
    views: 'bg-purple-100',
    default: 'bg-gray-100'
  }
  return colors[iconName] || colors.default
}

/**
 * Get icon color class based on icon name
 * @param {string} iconName - Icon identifier
 * @returns {string} Text color class
 */
function getIconColor(iconName) {
  const colors = {
    users: 'text-blue-600',
    posts: 'text-green-600',
    comments: 'text-yellow-600',
    views: 'text-purple-600',
    default: 'text-gray-600'
  }
  return colors[iconName] || colors.default
}

/**
 * Get icon SVG element based on icon name
 * @param {string} iconName - Icon identifier
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} SVG icon
 */
function getIcon(iconName, className) {
  const baseClasses = 'w-6 h-6'

  switch (iconName) {
    case 'users':
      return (
        <svg className={`${baseClasses} ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    case 'posts':
      return (
        <svg className={`${baseClasses} ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    case 'comments':
      return (
        <svg className={`${baseClasses} ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    case 'views':
      return (
        <svg className={`${baseClasses} ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    default:
      return (
        <svg className={`${baseClasses} ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
  }
}

/**
 * StatCard component for displaying statistics in admin dashboard
 * @param {Object} props - Component props
 * @param {string} props.title - Statistic title/label
 * @param {number} props.value - Numeric value to display
 * @param {string} [props.icon='default'] - Icon identifier
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Stat card component
 */
function StatCard({ title, value, icon = 'default', className = '' }) {
  const bgColor = getIconBgColor(icon)
  const iconColor = getIconColor(icon)

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 ${className}`}>
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${bgColor}`}>
        {getIcon(icon, iconColor)}
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-500 uppercase tracking-wide">{title}</div>
      </div>
    </div>
  )
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string
}

export default StatCard