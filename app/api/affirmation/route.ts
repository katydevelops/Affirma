import { NextResponse } from 'next/server';

const API_URL = 'https://www.affirmations.dev';

export async function GET() {
  console.log("Fetching a new affirmation from the external API...");
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return the response with strict Cache-Control headers
    return new NextResponse(JSON.stringify(data), {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching affirmation:', error);
    return NextResponse.json({ error: 'Failed to fetch affirmation' }, { status: 500 });
  }
}
