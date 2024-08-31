export async function getAffirmation() {
  const response = await fetch(`/api/affirmation?timestamp=${new Date().getTime()}`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'If-None-Match': '', 
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
