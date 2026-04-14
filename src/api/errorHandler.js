/**
 * Centralized error handler for API calls.
 * Processes errors and throws appropriate custom errors based on context.
 * @param {Error} error - The error object from axios or other sources
 * @param {string} context - The context or operation name (e.g., 'login', 'fetchFriends')
 */
export function handleApiError(error, context) {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    const message = data?.message || 'Unknown error';

    switch (status) {
      case 400:
        throw new Error(`Bad request for ${context}: ${message}`);
      case 401:
        throw new Error(`Authentication failed for ${context}: ${message}`);
      case 403:
        throw new Error(`Forbidden access for ${context}: ${message}`);
      case 404:
        throw new Error(`Resource not found for ${context}: ${message}`);
      case 409:
        throw new Error(`Conflict for ${context}: ${message}`);
      case 422:
        throw new Error(`Validation error for ${context}: ${message}`);
      case 500:
        throw new Error(`Server error for ${context}: ${message}`);
      default:
        throw new Error(`API error for ${context}: ${message}`);
    }
  } else if (error.request) {
    // Network error
    throw new Error(`Network error for ${context}: No response from server`);
  } else {
    // Other error
    throw new Error(`Unexpected error for ${context}: ${error.message}`);
  }
}