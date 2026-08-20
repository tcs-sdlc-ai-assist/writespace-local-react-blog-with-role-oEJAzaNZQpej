/**
 * @typedef {Object} Session
 * @property {string} userId
 * @property {string} username
 * @property {boolean} isAdmin
 * @property {string} createdAt
 */

/**
 * Hard-coded admin user ID for writespace
 * @constant {string}
 */
const ADMIN_USER_ID = 'admin_user_123'

/**
 * Get current session from localStorage
 * @returns {Session|null} Session object or null
 */
export function getSession() {
  try {
    const session = localStorage.getItem('writespace_session')
    return session ? JSON.parse(session) : null
  } catch (error) {
    console.error('Error reading session from localStorage:', error)
    return null
  }
}

/**
 * Save session to localStorage
 * @param {Session} session
 */
export function saveSession(session) {
  try {
    localStorage.setItem('writespace_session', JSON.stringify(session))
  } catch (error) {
    console.error('Error saving session to localStorage:', error)
  }
}

/**
 * Remove session from localStorage
 */
export function removeSession() {
  try {
    localStorage.removeItem('writespace_session')
  } catch (error) {
    console.error('Error removing session from localStorage:', error)
  }
}

/**
 * Check if current user is admin
 * @returns {boolean} True if user is admin
 */
export function isAdmin() {
  const session = getSession()
  return session?.isAdmin || false
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if session exists
 */
export function isAuthenticated() {
  return getSession() !== null
}

/**
 * Create a new session for a user
 * @param {string} userId
 * @param {string} username
 * @param {boolean} [isAdmin=false]
 * @returns {Session} Created session
 */
export function createSession(userId, username, isAdmin = false) {
  const session = {
    userId,
    username,
    isAdmin: isAdmin || userId === ADMIN_USER_ID,
    createdAt: new Date().toISOString()
  }
  saveSession(session)
  return session
}

/**
 * Clear all session data
 */
export function clearSession() {
  removeSession()
}