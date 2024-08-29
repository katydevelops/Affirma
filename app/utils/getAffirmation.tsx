export async function getAffirmation() {
  const response = await fetch(`/api/affirmation?time=${new Date().getTime()}`, {
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
