import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getPosts } from '../utils/storage'
import { isAuthenticated } from '../utils/auth'
import PublicNavbar from '../components/PublicNavbar'
import BlogCard from '../components/BlogCard'

/**
 * Get latest posts for preview on landing page
 * @param {number} limit - Maximum number of posts to return
 * @returns {Array} Array of latest posts
 */
function getLatestPosts(limit = 3) {
  const posts = getPosts()
  return posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit)
}

/**
 * FeatureCard component for displaying feature information
 * @param {Object} props - Component props
 * @param {string} props.title - Feature title
 * @param {string} props.description - Feature description
 * @param {string} props.icon - Icon SVG element
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Feature card component
 */
function FeatureCard({ title, description, icon, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-shadow duration-200 hover:shadow-lg ${className}`}>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  className: PropTypes.string
}

/**
 * LandingPage component - Public landing page with hero, features, and latest posts
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Landing page component
 */
function LandingPage({ className = '' }) {
  const isAuth = isAuthenticated()
  const latestPosts = getLatestPosts(3)

  const features = [
    {
      title: 'Easy Writing',
      description: 'Create and edit your blog posts with our intuitive editor. Focus on your content without distractions.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
        </svg>
      )
    },
    {
      title: 'Organize Content',
      description: 'Manage your posts efficiently with our dashboard. Keep track of all your writings in one place.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'Share Your Voice',
      description: 'Publish your thoughts and ideas to the world. Connect with readers through your unique perspective.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      )
    }
  ]

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <PublicNavbar />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to WriteSpace
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                A simple and elegant platform for creating, managing, and sharing your blog posts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isAuth ? (
                  <Link
                    to="/dashboard"
                    className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-indigo-600 transition-colors"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to create and manage your blog content
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Latest Posts
              </h2>
              <p className="text-lg text-gray-600">
                Discover what our community has been writing
              </p>
            </div>

            {latestPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    authorId={post.authorId}
                    createdAt={post.createdAt}
                    index={index}
                    showEdit={false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500 mb-4">No posts yet</p>
                {isAuth ? (
                  <Link
                    to="/posts/new"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Create your first post
                  </Link>
                ) : (
                  <p className="text-gray-500">
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      Sign up
                    </Link>
                    {' to start writing'}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Writing?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of writers and share your stories with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuth ? (
                <Link
                  to="/posts/new"
                  className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Create New Post
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-indigo-600 transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-400 mb-4">WriteSpace</div>
            <p className="text-gray-400 mb-4">
              A simple blogging platform for everyone
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-400">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              © {new Date().getFullYear()} WriteSpace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

LandingPage.propTypes = {
  className: PropTypes.string
}

export default LandingPage