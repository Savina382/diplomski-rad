import { ACCESS_TOKEN_KEY } from "../constants/authentication";

/**
 * This function is used to get the access token from the local storage.
 * @returns {string} - Returns the access token.
 */
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * This function is used to check if the user is authenticated.
 * @returns {boolean} - Returns true if the user is authenticated, false otherwise.
 */
export const isAuthenticated = () => {
  const accessToken = getAccessToken();
  return !!accessToken;
}
