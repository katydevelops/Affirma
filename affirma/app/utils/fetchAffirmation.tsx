const API_ROUTE = '/api/affirmation';

export async function getAffirmation() {
  try {
    const response = await fetch(API_ROUTE);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Network or fetch error:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw new Error('Unable to fetch affirmation');
  }
}