import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPosts, addPost, updatePost } from '../utils/storage'
import { isAuthenticated, getSession } from '../utils/auth'
import Navbar from '../components/Navbar'

/**
 * WriteBlog component - Form for creating and editing blog posts
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Write blog page component
 */
function WriteBlog({ className = '' }) {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const session = getSession()
  const isAuth = isAuthenticated()
  const isEditMode = Boolean(id)

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = () => {
        try {
          setIsLoading(true)
          const posts = getPosts()
          const post = posts.find(p => p.id === id)

          if (post) {
            setTitle(post.title)
            setContent(post.content)
          } else {
            setError('Post not found')
          }
        } catch (err) {
          setError('Failed to load post')
          console.error('Error loading post:', err)
        } finally {
          setIsLoading(false)
        }
      }

      fetchPost()
    }
  }, [id, isEditMode])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!isAuth) {
        navigate('/login')
        return
      }

      if (!title.trim()) {
        setError('Title is required')
        setIsSubmitting(false)
        return
      }

      if (!content.trim()) {
        setError('Content is required')
        setIsSubmitting(false)
        return
      }

      const postData = {
        title: title.trim(),
        content: content.trim(),
        authorId: session.userId,
        createdAt: new Date().toISOString()
      }

      if (isEditMode) {
        const posts = getPosts()
        const post = posts.find(p => p.id === id)

        if (!post) {
          setError('Post not found')
          setIsSubmitting(false)
          return
        }

        if (post.authorId !== session.userId) {
          setError('You are not authorized to edit this post')
          setIsSubmitting(false)
          return
        }

        updatePost(id, {
          title: postData.title,
          content: postData.content,
          updatedAt: new Date().toISOString()
        })
      } else {
        addPost({
          ...postData,
          id: `post_${Date.now()}`
        })
      }

      navigate('/posts')
    } catch (err) {
      setError('An error occurred while saving the post')
      console.error('Error saving post:', err)
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate('/posts')
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

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {isEditMode ? 'Edit Post' : 'Create New Post'}
            </h1>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                maxLength={100}
              />
              <div className="text-sm text-gray-500 mt-1 text-right">
                {title.length}/100 characters
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post content here..."
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                maxLength={5000}
              />
              <div className="text-sm text-gray-500 mt-1 text-right">
                {content.length}/5000 characters
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

WriteBlog.propTypes = {
  className: PropTypes.string
}

export default WriteBlog