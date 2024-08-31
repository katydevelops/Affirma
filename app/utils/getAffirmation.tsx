export async function getAffirmation() {
  const response = await fetch(`/api/affirmation?timestamp=${new Date().getTime()}`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache', // Fallback for older HTTP/1.0 caches
      'Expires': '0',       // Another fallback
    },
    cache: 'no-store',       // Ensure fetch itself doesn't cache the response
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
