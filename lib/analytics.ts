export function analyticsEvent(event: string, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  void fetch('/api/analytics', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, properties, path: window.location.pathname }),
    keepalive: true
  }).catch(() => undefined);
}
