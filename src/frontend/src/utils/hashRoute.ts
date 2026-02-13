/**
 * Hash-based routing utilities for TWA compatibility
 * Supports both '#/route' and '#route' formats
 */

export function getHashRoute(): string {
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') {
    return '';
  }
  // Remove leading '#' and optional '/'
  return hash.replace(/^#\/?/, '');
}

export function navigateToHash(route: string): void {
  // Normalize route to use '#/' format for consistency
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
  window.location.hash = normalizedRoute;
}

export function navigateHome(): void {
  window.location.hash = '';
}
