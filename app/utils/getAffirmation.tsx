export async function getAffirmation() {
  const response = await fetch('/api/affirmation');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}