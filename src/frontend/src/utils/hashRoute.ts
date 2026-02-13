/**
 * Hash-based routing utilities for TWA compatibility
 */

export function getHashRoute(): string {
  const hash = window.location.hash;
  return hash.startsWith('#/') ? hash.substring(2) : '';
}

export function navigateToHash(route: string) {
  window.location.hash = `#/${route}`;
}

export function navigateToHome() {
  window.location.hash = '';
}
