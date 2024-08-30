import { NextResponse } from 'next/server';

const API_URL = 'https://www.affirmations.dev';

export async function GET() {
  console.log("Fetching a new affirmation from the external API...");
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    console.log("Received data from external API:", data);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching affirmation:', error);
    return NextResponse.json({ error: 'Failed to fetch affirmation' }, { status: 500 });
  }
}
