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