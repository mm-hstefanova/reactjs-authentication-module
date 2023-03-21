import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedTokenDuration = localStorage.getItem('expiration');
  const expirationDate = new Date(storedTokenDuration);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

// the way we guard the routes if we are not authenticated
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}
