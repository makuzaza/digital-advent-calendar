# Firebase Token Expiration Fix

## Problem
The application was failing with a **401 (Unauthorized)** error when trying to delete calendars or files:

```
Error verifying token: FirebaseAuthError: Firebase ID token has expired
auth/id-token-expired
```

This occurred because Firebase ID tokens have a short lifespan (typically 1 hour), and the application was using stale tokens stored in Redux state without refreshing them.

## Root Cause
1. Tokens are obtained once during login and stored in Redux
2. Firebase ID tokens expire after ~1 hour
3. No mechanism existed to refresh the token before making authenticated API calls
4. When the backend tried to verify an expired token, it returned a 401 error

## Solution
The fix involves two main components:

### 1. Token Utility Function (`tokenUtils.ts`)
Created a new utility file with functions to:
- **`refreshFirebaseToken()`**: Forces a refresh of the Firebase ID token and updates Redux store
- **`getValidToken()`**: Gets the current token, refreshing if necessary

**Location**: `frontend/src/utils/tokenUtils.ts`

```typescript
export const refreshFirebaseToken = async (): Promise<string | null> => {
  // Gets fresh token from Firebase and updates Redux
}
```

### 2. Updated Components
Updated the following components to use token refresh before making authenticated API calls:

#### `Favourite.tsx`
- Updated `deleteCalendar()` to refresh the token before deletion
- Added error handling for 401 responses
- Updates Redux store if token was refreshed

#### `UserInfo.tsx`
- Updated `deleteCalendar()` with token refresh
- Updated `deleteImageFile()` with token refresh
- Updated `deleteMusicFile()` with token refresh
- Updated `deleteSoundFxFile()` with token refresh
- All functions now handle expired token errors gracefully

## How It Works

When an authenticated API call is made:

1. **Before the request**: Call `refreshFirebaseToken()` to get a fresh token
2. **Use the fresh token**: Use the new token for the API call instead of the stale one
3. **Update Redux**: If the token was refreshed, update Redux store for future calls
4. **Error handling**: If a 401 error occurs, show a user-friendly message asking them to log in again

## Example Usage

```typescript
// Before making an authenticated API call
const deleteCalendar = async (calendarId: string) => {
  try {
    // Get fresh token in case it expired
    const freshToken = await refreshFirebaseToken();
    const tokenToUse = freshToken || token;

    if (!tokenToUse) {
      Swal.fire("Error", "Authentication token is missing. Please log in again.", "error");
      return;
    }

    // Use freshToken for the API call
    axios.delete(`/api/calendars/${calendarId}`, {
      params: { token: tokenToUse, uid: uid }
    });
  } catch (error) {
    if (error.response?.status === 401) {
      Swal.fire("Error", "Your session has expired. Please log in again.", "error");
    }
  }
};
```

## Testing the Fix

To verify the fix works:

1. Log in to the application
2. Wait for ~1 hour (or manually check if you can access the token's expiration time)
3. Try to delete a calendar or file
4. The operation should succeed because the token was automatically refreshed

Alternatively, you can test immediately after login by examining the behavior with fresh vs. expired tokens in your browser's network tab.

## Future Improvements

Consider implementing:
1. **Global Axios Interceptor**: Automatically refresh tokens before every request
2. **Token Expiration Checking**: Check token expiration time before making requests
3. **Refresh Token Flow**: Use refresh tokens for a more robust authentication system
4. **Automatic Token Refresh**: Refresh token periodically in the background

## Files Modified
- [src/routes/Favourite.tsx](../routes/Favourite.tsx) - Added token refresh logic
- [src/routes/UserInfo.tsx](../routes/UserInfo.tsx) - Added token refresh logic to multiple delete functions
- [src/utils/tokenUtils.ts](../utils/tokenUtils.ts) - New file with token refresh utilities
