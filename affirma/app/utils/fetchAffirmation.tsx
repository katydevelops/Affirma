const API_URL = 'https://www.affirmations.dev';

export async function getAffirmation() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
    console.error('Fetch failed:', response);
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      // Type assertion to check if error is of type Error
      console.error('Network or fetch error:', error.message);
      console.error('Error stack trace:', error.stack);
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw new Error('Unable to fetch affirmation');
  }
}