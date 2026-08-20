import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getPosts, deletePost } from '../utils/storage'
import { isAuthenticated, getSession, isAdmin } from '../utils/auth'
import Navbar from '../components/Navbar'
import Avatar from '../components/Avatar'

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
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * ReadBlog component - Full post reader page
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Read blog page component
 */
function ReadBlog({ className = '' }) {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()
  const session = getSession()
  const isAuth = isAuthenticated()
  const currentUserIsAdmin = isAdmin()
  const isOwner = post && session?.userId === post.authorId
  const canEdit = isAuth && (currentUserIsAdmin || isOwner)
  const canDelete = isAuth && (currentUserIsAdmin || isOwner)

  useEffect(() => {
    const fetchPost = () => {
      try {
        setIsLoading(true)
        const posts = getPosts()
        const foundPost = posts.find(p => p.id === id)

        if (!foundPost) {
          setError('Post not found')
        } else {
          setPost(foundPost)
        }
      } catch (err) {
        setError('Failed to load post')
        console.error('Error loading post:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleDelete = async () => {
    if (!post || !canDelete) return

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        setIsDeleting(true)
        deletePost(post.id)
        navigate('/posts')
      } catch (err) {
        setError('Failed to delete post')
        console.error('Error deleting post:', err)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  if (!isAuth) {
    return null
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/posts"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Back to all posts
            </Link>
          </div>
        </main>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Avatar userId={post.authorId} />
                    <span className="font-medium text-gray-700">@{post.authorId}</span>
                  </div>
                  <span>•</span>
                  <span>{formatDate(post.createdAt)}</span>
                  {post.updatedAt && post.updatedAt !== post.createdAt && (
                    <>
                      <span>•</span>
                      <span>Updated {formatDate(post.updatedAt)}</span>
                    </>
                  )}
                </div>
              </div>

              {canEdit && (
                <div className="flex space-x-2 ml-4">
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 font-medium rounded-md hover:bg-indigo-200 transition-colors flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Edit</span>
                  </Link>
                  {canDelete && (
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="px-3 py-1 bg-red-100 text-red-700 font-medium rounded-md hover:bg-red-200 transition-colors flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? (
                        <svg className="animate-spin h-4 w-4 text-red-700" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      )}
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="prose max-w-none text-gray-700">
              <p className="whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>
        </article>

        <div className="mt-8">
          <Link
            to="/posts"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to all posts</span>
          </Link>
        </div>
      </main>
    </div>
  )
}

ReadBlog.propTypes = {
  className: PropTypes.string
}

export default ReadBlog