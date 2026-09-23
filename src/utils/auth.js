// TEMPORARY DEV/DEMO BYPASS — set back to false to restore normal login.
// When true, ProtectedRoute skips the login check and "/" goes straight
// to the dashboard instead of the Login page.
export const DEV_BYPASS_AUTH = true;

export function getLoggedInUser() {
  const localUser = localStorage.getItem("loggedInUser");
  const sessionUser = sessionStorage.getItem("loggedInUser");

  if (localUser) {
    return JSON.parse(localUser);
  }

  if (sessionUser) {
    return JSON.parse(sessionUser);
  }

  return null;
}

export function logout() {
  localStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("loggedInUser");
}