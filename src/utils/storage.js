/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} authorId
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {string} createdAt
 */

/**
 * Get item from localStorage with error handling
 * @param {string} key
 * @returns {any} Parsed value or null
 */
function getStorageItem(key) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return null
  }
}

/**
 * Set item in localStorage with error handling
 * @param {string} key
 * @param {any} value
 */
function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
  }
}

/**
 * Remove item from localStorage with error handling
 * @param {string} key
 */
function removeStorageItem(key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
  }
}

/**
 * Get all posts from localStorage
 * @returns {Post[]} Array of posts
 */
export function getPosts() {
  return getStorageItem('writespace_posts') || []
}

/**
 * Save all posts to localStorage
 * @param {Post[]} posts
 */
export function savePosts(posts) {
  setStorageItem('writespace_posts', posts)
}

/**
 * Add a new post to localStorage
 * @param {Post} post
 * @returns {Post[]} Updated array of posts
 */
export function addPost(post) {
  const posts = getPosts()
  const updatedPosts = [...posts, post]
  savePosts(updatedPosts)
  return updatedPosts
}

/**
 * Update an existing post in localStorage
 * @param {string} postId
 * @param {Partial<Post>} updates
 * @returns {Post[]} Updated array of posts
 */
export function updatePost(postId, updates) {
  const posts = getPosts()
  const updatedPosts = posts.map(post =>
    post.id === postId ? { ...post, ...updates, updatedAt: new Date().toISOString() } : post
  )
  savePosts(updatedPosts)
  return updatedPosts
}

/**
 * Delete a post from localStorage
 * @param {string} postId
 * @returns {Post[]} Updated array of posts
 */
export function deletePost(postId) {
  const posts = getPosts()
  const updatedPosts = posts.filter(post => post.id !== postId)
  savePosts(updatedPosts)
  return updatedPosts
}

/**
 * Get current user from localStorage
 * @returns {User|null} User object or null
 */
export function getCurrentUser() {
  return getStorageItem('writespace_user')
}

/**
 * Save current user to localStorage
 * @param {User} user
 */
export function saveCurrentUser(user) {
  setStorageItem('writespace_user', user)
}

/**
 * Remove current user from localStorage
 */
export function removeCurrentUser() {
  removeStorageItem('writespace_user')
}

/**
 * Clear all writespace data from localStorage
 */
export function clearWritespaceData() {
  removeStorageItem('writespace_posts')
  removeStorageItem('writespace_user')
}