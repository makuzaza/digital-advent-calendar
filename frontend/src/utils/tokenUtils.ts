import { getAuth } from "firebase/auth";
import { store } from "../store/store";
import { setToken } from "../store/tokenSlice";

/**
 * Refreshes the Firebase ID token and updates the Redux store
 * This should be called when the current token has expired or is about to expire
 */
export const refreshFirebaseToken = async (): Promise<string | null> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user found");
      return null;
    }

    // Force refresh the ID token
    const freshToken = await user.getIdToken(true);
    
    // Update Redux store with new token
    store.dispatch(setToken(freshToken));
    
    console.log("Token refreshed successfully");
    return freshToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

/**
 * Get the current token, refreshing if necessary when a 401 error occurs
 * This is useful for use in axios interceptors or before making authenticated requests
 */
export const getValidToken = async (): Promise<string> => {
  const currentToken = store.getState().token.token;
  
  if (!currentToken) {
    const newToken = await refreshFirebaseToken();
    return newToken || "";
  }
  
  return currentToken;
};
