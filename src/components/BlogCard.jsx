import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, getSession } from '../utils/auth'
import Avatar from './Avatar'

/**
 * Get colorful border class based on index
 * @param {number} index - Card index
 * @returns {string} Border color class
 */
function getBorderColor(index) {
  const colors = [
    'border-red-500',
    'border-blue-500',
    'border-green-500',
    'border-yellow-500',
    'border-purple-500',
    'border-pink-500'
  ]
  return colors[index % colors.length]
}

/**
 * Format date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * BlogCard component for displaying post previews
 * @param {Object} props - Component props
 * @param {string} props.id - Post ID
 * @param {string} props.title - Post title
 * @param {string} props.content - Post content
 * @param {string} props.authorId - Author user ID
 * @param {string} props.createdAt - Creation timestamp
 * @param {number} [props.index=0] - Card index for border color
 * @param {boolean} [props.showEdit=false] - Whether to show edit icon
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Blog card component
 */
function BlogCard({ id, title, content, authorId, createdAt, index = 0, showEdit = false, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)
  const session = getSession()
  const isAuth = isAuthenticated()
  const isOwner = isAuth && session?.userId === authorId
  const excerpt = content.length > 150 ? `${content.substring(0, 150)}...` : content
  const borderColor = getBorderColor(index)

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-200 hover:shadow-lg border-t-4 ${borderColor} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Link
            to={`/posts/${id}`}
            className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors"
          >
            {title}
          </Link>
          {showEdit && isOwner && (
            <Link
              to={`/posts/${id}/edit`}
              className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
              aria-label="Edit post"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Link>
          )}
        </div>

        <p className="text-gray-600 mb-4">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar userId={authorId} />
            <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

BlogCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  index: PropTypes.number,
  showEdit: PropTypes.bool,
  className: PropTypes.string
}

export default BlogCard