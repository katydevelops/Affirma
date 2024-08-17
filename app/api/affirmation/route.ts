import { NextResponse } from 'next/server';

const API_URL = 'https://www.affirmations.dev';

export async function GET() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch affirmation' }, { status: 500 });
  }
}
