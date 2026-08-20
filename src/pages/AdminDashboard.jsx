import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, isAdmin, getSession } from '../utils/auth'
import { getPosts, getCurrentUser } from '../utils/storage'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import BlogCard from '../components/BlogCard'

/**
 * AdminDashboard component - Admin-only overview page with statistics and quick actions
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Admin dashboard page component
 */
function AdminDashboard({ className = '' }) {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const isAuth = isAuthenticated()
  const currentUserIsAdmin = isAdmin()

  useEffect(() => {
    const fetchData = () => {
      try {
        setIsLoading(true)
        const allPosts = getPosts()
        const currentUser = getCurrentUser()

        setPosts(allPosts)

        // For demo purposes, we'll use the current user as the only user
        // In a real app, you'd fetch all users from storage
        if (currentUser) {
          setUsers([currentUser])
        }
      } catch (err) {
        setError('Failed to load dashboard data')
        console.error('Error loading dashboard data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (!isAuth || !currentUserIsAdmin) {
    return null
  }

  const totalPosts = posts.length
  const totalUsers = users.length
  const totalAdmins = users.filter(user => user.id === 'admin_user_123').length
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-purple-100">
                Welcome back, <span className="font-semibold">{getSession()?.username}</span>! Here's what's happening with your WriteSpace.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/posts/new"
                className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Create Post
              </Link>
              <Link
                to="/admin/users"
                className="px-4 py-2 border border-white text-white font-medium rounded-md hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Manage Users
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
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
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Posts"
                value={totalPosts}
                icon="posts"
                className="shadow-lg"
              />
              <StatCard
                title="Total Users"
                value={totalUsers}
                icon="users"
                className="shadow-lg"
              />
              <StatCard
                title="Total Admins"
                value={totalAdmins}
                icon="users"
                className="shadow-lg"
              />
              <StatCard
                title="Total Views"
                value={totalPosts * 10} // Demo value
                icon="views"
                className="shadow-lg"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/posts/new"
                  className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white group-hover:bg-indigo-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Create New Post</div>
                    <div className="text-sm text-gray-500">Add a new blog post</div>
                  </div>
                </Link>
                <Link
                  to="/admin/users"
                  className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white group-hover:bg-purple-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Manage Users</div>
                    <div className="text-sm text-gray-500">View and manage users</div>
                  </div>
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 text-white group-hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Settings</div>
                    <div className="text-sm text-gray-500">Configure your site</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Recent Posts</h2>
                <Link
                  to="/posts"
                  className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                >
                  View All Posts
                </Link>
              </div>

              {recentPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentPosts.map((post, index) => (
                    <BlogCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      content={post.content}
                      authorId={post.authorId}
                      createdAt={post.createdAt}
                      index={index}
                      showEdit={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h3>
                  <p className="text-gray-500">There are no posts to display</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

AdminDashboard.propTypes = {
  className: PropTypes.string
}

export default AdminDashboard